import { useEffect, useState, useRef } from 'react'
import NextLink from 'next/link'
import { API, graphqlOperation, Auth, Storage } from 'aws-amplify'
import { useForm } from 'react-hook-form'
import cookie from 'js-cookie'
import {
  Heading,
  Link,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Progress,
  useDisclosure,
  useToast
} from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { listCompanies } from '@/src/graphql/queries'
import { createCompany } from '@/src/graphql/mutations'
import { deleteCompany } from '@/src/graphql/mutations'
import ConfirmDelete from './ConfirmDelete'
import { deleteCompanyReps } from '@/src/utils'

const folders = ['Labor Posters', 'HR Laws', 'HR Policies', 'Job Descriptions', 'Onboarding Info']

const CompanyTable = () => {
  const companyToDelete = useRef(null)
  const [status, setStatus] = useState('idle')
  const [companies, setCompanies] = useState([])
  const [openDelDlg, setOpenDelDlg] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = useRef()
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm()
  const toast = useToast()

  const createFolderCompany = async (companyId, folder) => await Storage.put(`companies/${companyId}/${folder}`)

  async function createNewCompany({ name, location, googleDrive, employeeHandbook, employeeHandbookQuestions }) {
    setStatus('adding')
    try {
      const companyDetails = {
        name: name,
        location: location,
        google_drive: googleDrive,
        employee_handbook: employeeHandbook,
        employee_handbook_questions: employeeHandbookQuestions
      }

      const result = await API.graphql(graphqlOperation(createCompany, { input: companyDetails }))
      const newCompanyCreated = result.data.createCompany
      const requests = folders.map((dir) => createFolderCompany(newCompanyCreated.id, dir))
      await Promise.all(requests)
      setCompanies((prev) => [...prev, newCompanyCreated])
      toast({
        title: 'Company successfully created',
        status: 'success',
        duration: 2000,
        isClosable: true
      })

      reset()
      onClose()
    } catch (err) {
      toast({
        title: 'Oops!',
        description: 'There was an error adding the company, please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true
      })
      setStatus('idle')
    }

    setStatus('idle')
  }

  useEffect(() => fetchCompanies(), [])

  async function deleteComp(company) {
    setStatus('deleting')
    try {
      const companyDetails = {
        id: company.id,
        _version: company._version
      }

      await deleteCompanyReps({ companyID: company.id })
      await API.graphql({
        query: deleteCompany,
        variables: { input: companyDetails }
      })
      fetchCompanies()

      toast({
        title: 'Successfully deleted',
        status: 'success',
        duration: 2000,
        isClosable: true
      })

      reset()
      onClose()
      setOpenDelDlg(false)
    } catch (err) {
      toast({
        title: 'Oops!',
        description: 'There was an error deleting the company, please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true
      })
      setStatus('idle')
    }

    setStatus('idle')
  }

  const confirmdDeleteComp = (comp) => {
    companyToDelete.current = comp
    setOpenDelDlg(true)
  }

  async function fetchCompanies() {
    setStatus('fetching')
    try {
      await Auth.currentAuthenticatedUser()
      const companys = await API.graphql(graphqlOperation(listCompanies))
      setCompanies(companys.data.listCompanies.items)
    } catch (err) {
      toast({
        title: 'Oops!',
        description: 'There was an error getting the information, please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true
      })
    } finally {
      setStatus('idle')
    }
  }

  if (status === 'fetching') {
    return <Progress size="md" isIndeterminate />
  }

  return (
    <>
      <ConfirmDelete
        isOpen={openDelDlg}
        onClose={() => setOpenDelDlg(false)}
        isLoading={status === 'deleting'}
        loadingText="Deleting"
        title="Delete Company"
        mainAction={() => deleteComp(companyToDelete.current)}
      />
      <Flex justifyContent="space-between" alignItems="center" mb={6}>
        <Heading fontWeight="normal" letterSpacing="tight" as="h3" size="lg" color="gray.600">
          Companies
        </Heading>
        <>
          <Button onClick={onOpen} variant="outline" size="md" p={5} colorScheme="facebook">
            + New Company
          </Button>
          <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent as="form" onSubmit={handleSubmit(createNewCompany)} backgroundColor="#020202">
              <ModalHeader color="#F5F5F5" fontSize="2xl" fontWeight="normal" textAlign="center">
                New Company
              </ModalHeader>
              <ModalCloseButton color="#F5F5F5" />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel color="#F5F5F5" ref={initialRef}>
                    Name
                  </FormLabel>
                  <Input
                    placeholder="company name"
                    {...register('name', { required: true })}
                    backgroundColor="#F5F5F5"
                    color="#020202"
                  />
                  {errors.firstName && <p style={{ color: 'red' }}>company name is required</p>}
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel color="#F5F5F5">Location</FormLabel>
                  <Input
                    placeholder="city, state"
                    {...register('location')}
                    backgroundColor="#F5F5F5"
                    color="#020202"
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel color="#F5F5F5">Google Drive</FormLabel>
                  <Input
                    placeholder="google drive link"
                    {...register('googleDrive')}
                    backgroundColor="#F5F5F5"
                    color="#020202"
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel color="#F5F5F5">Employee Handbook</FormLabel>
                  <Input
                    placeholder="employee handbook link"
                    {...register('employeeHandbook')}
                    backgroundColor="#F5F5F5"
                    color="#020202"
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel color="#F5F5F5">Employee Handbook Questions</FormLabel>
                  <Input
                    placeholder="employee handbook questions link"
                    {...register('employeeHandbookQuestions')}
                    backgroundColor="#F5F5F5"
                    color="#020202"
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button onClick={onClose} mr={3}>
                  Cancel
                </Button>
                <Button
                  isLoading={status === 'adding'}
                  loadingText="Adding"
                  type="submit"
                  variant="outline"
                  size="md"
                  p={5}
                  colorScheme="blue">
                  Add
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      </Flex>
      <Flex rounded="lg" boxShadow="lg" bg="white" p={2}>
        <Table colorScheme="facebook">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Code</Th>
              <Th>Google Drive</Th>
              <Th textAlign="center">Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {!companies ? (
              <p>Loading...</p>
            ) : (
              companies
                .filter((company) => !company._deleted)
                .map((company) => (
                  <Tr key={company.id}>
                    <NextLink
                      href={`/app/companies/${company.id}`}
                      onClick={() =>
                        cookie.set('company-id', company.id, {
                          expires: 90
                        })
                      }>
                      <Td
                        fontWeight="medium"
                        textDecoration="underline"
                        _hover={{ cursor: 'pointer', color: 'blue.600' }}>
                        {company.name}
                      </Td>
                    </NextLink>
                    <Td>{company.id}</Td>
                    <Td>
                      <Link
                        href={company.google_drive}
                        isExternal
                        textDecoration="underline"
                        _hover={{ cursor: 'pointer', color: 'blue.600' }}>
                        View on Google Drive <ExternalLinkIcon mx="2px" />
                      </Link>
                    </Td>
                    <Td textAlign="center">
                      <Button
                        size="sm"
                        variant="outline"
                        color="red.500"
                        borderColor="red.500"
                        _hover={{ bg: 'red.100' }}
                        _focus={{ boxShadow: '0 0 0 3px rgba(209,30,30,0.5)' }}
                        onClick={() => confirmdDeleteComp(company)}>
                        Delete
                      </Button>
                    </Td>
                  </Tr>
                ))
            )}
          </Tbody>
        </Table>
      </Flex>
    </>
  )
}

export default CompanyTable
