import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { questions } from '@/src/constants/questions'
import {
  Flex,
  Textarea,
  Button,
  Heading,
  Select,
  FormLabel,
  FormControl,
  FormErrorMessage,
  useToast,
  Progress,
  Checkbox,
  ButtonGroup,
  IconButton,
  Input,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogFooter,
  useDisclosure
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { Select as MultiSelect } from 'chakra-react-select'
import cookie from 'js-cookie'
import Layout from '@/src/layouts/Layout'
import { useForm, useFieldArray } from 'react-hook-form'
import { downloadBlob } from '@/src/utils'
import { API, graphqlOperation } from 'aws-amplify'
import { updateCompany } from '@/src/graphql/mutations'
import { getCompany } from '@/src/graphql/queries'
import { s3Client, replacer } from '@/src/utils'

const HandbookQuestions = () => {
  const companyID = useRef()
  const customDay = useRef('')
  const inputRef = useRef()
  const formData = useRef()
  const [customDays, setCustomDays] = useState([])
  const [multiFieldsValues, setMultiFieldsValues] = useState([])
  const [loading, setLoading] = useState(false)
  const logoURLRef = useRef()
  const toast = useToast()
  const [generating, setGenerating] = useState(false)

  const { isOpen, onClose, onOpen } = useDisclosure()
  const cancelRef = useRef()
  const router = useRouter()

  useEffect(() => {
    companyID.current = cookie.get('company-id')
    ;(async () => {
      setLoading(true)
      try {
        const company = await API.graphql(graphqlOperation(getCompany, { id: companyID.current }))
        logoURLRef.current = company.data.getCompany.companyLogoURL
      } catch (error) {
        toast({
          title: 'An error occurred while getting the company info',
          status: 'error',
          duration: 3000,
          isClosable: true
        })
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js'
    script.type = 'application/javascript'
    document.head.appendChild(script)
  }, [])

  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      company_name: '',
      questions: questions['washington'].map((ques) => ({ ...ques, answer: '' }))
    }
  })

  const { fields } = useFieldArray({
    control,
    name: 'questions'
  })

  const onGeneratePDF = async (data) => {
    formData.current = data
    if (logoURLRef.current) {
      onSubmit()
      return
    }

    onOpen()
  }

  const onSubmit = async () => {
    if (!formData.current) return
    let data = formData.current
    const questions = data.questions.map((quest, idx) => {
      if (quest.isMulti) {
        return {
          ...quest,
          answer: multiFieldsValues[idx]?.map(({ value }) => value).join('\n') ?? ''
        }
      }

      return quest
    })

    data = { ...data, questions }

    setGenerating(true)

    try {
      // Use Fetch API to create the pdf file
      const answers = data.questions.map(({ answer }) => answer.replaceAll('\n', '<br />'))
      const content = {
        company_name: data.company_name,
        role: answers[1],
        logo_url: logoURLRef.current,
        answers: [...answers.slice(0, 1), ...answers.slice(2)]
      }

      // eslint-disable-next-line no-unused-vars
      const { answers: _, ...rest } = content

      const finalAnswers = {}
      answers.forEach((ans, idx) => {
        finalAnswers[`answers[${idx}]`] = ans
      })

      const bodyFormatted = { ...finalAnswers, ...rest }
      const companyLogoURL = bodyFormatted.logo_url

      const htmlFile = await s3Client.getObject({ Key: 'private/handbook-models/washington.html' }).promise()

      if (companyLogoURL) {
        const logo = await s3Client
          .getObject({
            Key: `public/${companyLogoURL}`
          })
          .promise()

        if (!logo) {
          bodyFormatted.logo_url = ''
          return
        }

        // create image base64 url image
        bodyFormatted.logo_url = `data:${logo.ContentType};base64,${logo.Body.toString('base64')}`
      }
      const html = replacer(htmlFile.Body.toString(), bodyFormatted)

      const parser = new DOMParser()
      const doc = parser.parseFromString(html, 'text/html')

      const result = await window
        .html2pdf()
        .set({
          margin: [15, 30],
          filename: 'myfile.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'pt', format: 'letter', orientation: 'portrait' },
          pagebreak: { mode: ['css', 'legacy', 'avoid-all'] }
        })
        .from(doc.body)
        .outputPdf('arraybuffer')

      const params = {
        Key: `public/companies/${companyID.current}/EHB/washington-handbook.pdf`,
        Body: Buffer.from(result, 'base64'),
        ContentType: 'application/pdf'
      }

      let finalHTML = html.replace(
        /Employee's Printed Name: __________________________________ Position: _________________________/g,
        "Employee's Printed Name: <u>{{person_name}}</u> Position: <u>{{position}}</u>"
      )

      finalHTML = finalHTML.replace(
        /Employee's Signature: _____________________________________________ Date: ______________________/g,
        'Employee\'s Signature: <img src="{{signature_url}}" alt="" width="120" style="border-bottom: 1px solid #000000; padding-bottom: 3px;" /> Date: <u>{{signature_date}}</u>'
      )
      const params2 = {
        Key: `private/handbooks-for-signing/${companyID.current}/markup.html`,
        Body: finalHTML,
        ContentType: 'text/html'
      }
      await s3Client.putObject(params).promise()
      await s3Client.putObject(params2).promise()

      const pdfBlobData = new Blob([result], { type: 'application/pdf' })

      await API.graphql({
        query: updateCompany,
        variables: {
          input: {
            id: companyID.current,
            employee_handbook: `companies/${companyID.current}/EHB/washington-handbook.pdf`,
            _version: 1
          }
        }
      })

      downloadBlob(pdfBlobData, `handbook-${cookie.get('company').toLowerCase()}.pdf`)
      onClose()
    } catch (error) {
      toast({
        title: 'An error occurred while generating the PDF',
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    } finally {
      setGenerating(false)
    }
  }

  const handleSelectAll = (options) => setMultiFieldsValues(options)
  if (loading) {
    return <Progress size="md" isIndeterminate />
  }

  const handleClose = () => {
    formData.current = undefined
    onClose()
  }

  const handleRedirect = () => {
    onClose()
    router.push('/app/company-settings')
  }

  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={handleClose}
        isOpen={isOpen}
        isCentered>
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Generate Employee Handbook?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            It looks like you haven&apos;t set up a logo for this company yet, do you want to continue?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={handleRedirect}>
              No, set it up
            </Button>
            <Button
              colorScheme="red"
              ml={3}
              onClick={(e) => {
                e.preventDefault()
                onSubmit()
              }}
              isLoading={generating}
              loadingText="Generating">
              Yes, generate
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <form onSubmit={handleSubmit(onGeneratePDF)}>
        <Flex flexDirection={{ base: 'column', md: 'row' }} justifyContent="space-between">
          <Heading color="gray.600" letterSpacing="tight" mb="3" textAlign={{ base: 'center', md: 'left' }}>
            Employee Handbook Questions
          </Heading>
          <Flex alignItems="center" justifyContent={{ base: 'center', md: 'flex-start' }}>
            <FormLabel htmlFor="state" margin="0">
              State
            </FormLabel>
            <Select
              id="state"
              placeholder="Select state"
              width="auto"
              size="md"
              bgColor="white"
              boxShadow="sm"
              value="washington"
              disabled
              ml={2}>
              <option value="washington">WA</option>
              <option value="seattle" disabled>
                Seattle
              </option>
              <option value="tacoma" disabled>
                Tacoma
              </option>
            </Select>
          </Flex>
        </Flex>

        <Flex
          mt={{ base: 3, md: 0 }}
          p={4}
          flexDirection="column"
          boxShadow="md"
          rounded="md"
          bgColor="white"
          style={{ gap: '1rem' }}>
          <FormControl mb={4} isInvalid={errors.company_name} isRequired>
            <FormLabel>What is the Full Business Name of your company?</FormLabel>
            <Textarea
              {...register('company_name', {
                pattern: /^$|(?!\s*$).+/
              })}
              placeholder="answer"
              size="sm"
              width="100%"
            />
            <FormErrorMessage>{errors.company_name && errors.company_name.message}</FormErrorMessage>
          </FormControl>

          {fields.map(({ number, question, isMulti, options }, index) => (
            <FormControl key={index}>
              <FormLabel>
                <strong>{number}</strong> {question}
              </FormLabel>
              {!isMulti && (
                <Textarea {...register(`questions.${index}.answer`)} placeholder="answer" size="sm" width="100%" />
              )}
              {isMulti && (
                <Flex justifyContent="space-between" mb={4}>
                  <Checkbox
                    onChange={(e) =>
                      handleSelectAll({
                        [index]: e.target.checked
                          ? [...options.map((opt) => ({ value: opt, label: opt })), ...customDays]
                          : []
                      })
                    }>
                    Select all
                  </Checkbox>
                  <ButtonGroup size="sm" isAttached variant="outline">
                    <Input
                      mr="-px"
                      ref={inputRef}
                      size="sm"
                      placeholder="Add custom day"
                      onChange={(e) => {
                        const value = e.target.value
                        if (value.length === 0) return
                        customDay.current = e.target.value
                      }}
                    />
                    <IconButton
                      aria-label="Add"
                      icon={<AddIcon />}
                      onClick={() => {
                        if (customDay.current.length === 0) return
                        setCustomDays((prev) => [...prev, { value: customDay.current, label: customDay.current }])
                        customDay.current = ''
                        inputRef.current.value = customDay.current
                      }}
                    />
                  </ButtonGroup>
                </Flex>
              )}
              {isMulti && (
                <MultiSelect
                  isMulti
                  name={`questions.${index}.answer`}
                  options={[...options.map((opt) => ({ value: opt, label: opt })), ...customDays]}
                  placeholder="Select some holidays..."
                  closeMenuOnSelect={false}
                  selectedOptionStyle="check"
                  hideSelectedOptions={false}
                  value={multiFieldsValues[index]}
                  onChange={(val) => {
                    setMultiFieldsValues((prev) => ({ ...prev, [index]: val }))
                  }}
                />
              )}
            </FormControl>
          ))}
          <Flex justifyContent="flex-start">
            <Button
              colorScheme="facebook"
              type="submit"
              isLoading={logoURLRef.current && generating && !isOpen}
              loadingText="Generating">
              Generate
            </Button>
          </Flex>
        </Flex>
      </form>
    </>
  )
}

HandbookQuestions.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export default HandbookQuestions
