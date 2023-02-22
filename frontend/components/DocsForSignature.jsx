import { Box, Table, Thead, Tr, Th, Tbody, Td, Button, useToast } from '@chakra-ui/react'
import { FiDownloadCloud, FiEdit3 } from 'react-icons/fi'
import { Storage, API } from 'aws-amplify'
import { downloadBlob, s3Client, replacer } from '@/src/utils'
import { useState, useEffect } from 'react'
import { createDocument, updateDocument } from '@/src/graphql/mutations'
import ConfirmSignatureDialog from '@/components/ConfirmSignatureDialog'

const DocsForSignature = ({
  company,
  documents = [],
  setDocuments,
  isEmployee,
  profileID,
  hasSignature,
  position,
  fullName
}) => {
  const toast = useToast()
  const [isOpenConfirmDlg, setIsOpenConfirmDlg] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [signing, setSigning] = useState(false)
  const [handbook, setHandBook] = useState()
  const downloadHandler = async ({ url, fileName }) => {
    setDownloading(true)
    try {
      const file = await Storage.get(url, { download: true })
      downloadBlob(file.Body, fileName || 'EHB')
    } catch (error) {
      toast({
        title: 'Ooops',
        description: 'An error occurred while downloading the EHB',
        status: 'error'
      })
    } finally {
      setDownloading(false)
    }
  }

  useEffect(() => {
    setHandBook(documents.find((doc) => doc?.fileName.includes('EHB')))
  }, [documents])


  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
    script.type = 'application/javascript';
    document.head.appendChild(script);
  }, [])

  const signHandler = async () => {
    if (!company) return

    if (!hasSignature) {
      toast({
        title: 'Oopss',
        description: 'You do not have a signature set up',
        status: 'warning'
      })

      return
    }
    setSigning(true)
    try {
      const urlFile = `${isEmployee ? 'employees' : 'contractors'}/${profileID}/signed_EHB`

      const handbookURL = `private/handbooks-for-signing/${company.id}/markup.html`

      const [blobSignature, htmlToParse] = await Promise.all([
        await s3Client
          .getObject({ Key: `public/${isEmployee ? 'employees' : 'contractors'}/${profileID}/signature` })
          .promise(),
        await s3Client.getObject({ Key: handbookURL }).promise()
      ])

      const signatureBase64 = `data:${blobSignature.ContentType};base64,${blobSignature.Body.toString('base64')}`

      const propsToReplace = {
        signature_url: signatureBase64,
        signature_date: new Date().toLocaleDateString('en-US'),
        person_name: fullName,
        position
      }

      const html = replacer(htmlToParse.Body.toString(), propsToReplace)

      const parser = new DOMParser()
      const doc = parser.parseFromString(html, 'text/html')

      const result = await window.html2pdf()
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

      const pdfBlobData = new Blob([result], { type: 'application/pdf' })
      await s3Client
        .putObject({
          Key: `public/${isEmployee ? 'employees' : 'contractors'}/${profileID}/signed_EHB`,
          Body: Buffer.from(result, 'base64'),
          ContentType: 'application/pdf'
        })
        .promise()

      let docSaved

      if (!handbook) {
        docSaved = await API.graphql({
          query: createDocument,
          variables: {
            input: {
              [isEmployee ? 'employeeID' : 'contractorID']: profileID,
              url: urlFile,
              isSigned: true,
              fileName: 'Signed EHB'
            }
          }
        })

        setDocuments([...documents, docSaved.data.createDocument])
      } else {
        docSaved = await API.graphql({
          query: updateDocument,
          variables: {
            input: {
              id: handbook.id,
              [isEmployee ? 'employeeID' : 'contractorID']: profileID,
              url: urlFile,
              isSigned: true,
              _version: handbook._version
            }
          }
        })

        setDocuments(documents.map((doc) => (doc.id === handbook.id ? docSaved.data.updateDocument : doc)))
      }

      downloadBlob(pdfBlobData, 'signed_EHB')
      setIsOpenConfirmDlg(false)
    } catch (error) {
      toast({
        title: 'Ooops',
        description: 'An error occurred while downloading the EHB',
        status: 'error'
      })
    } finally {
      setSigning(false)
    }
  }

  const confirmHandler = () => {
    setIsOpenConfirmDlg(true)
  }

  return (
    <Box boxShadow="md" p="4" rounded="md" bgColor="white">
      <Table size="sm" colorScheme="facebook" mb={4}>
        <Thead>
          <Tr>
            <Th>Document</Th>
            <Th>Is Signed</Th>
            <Th textAlign="center">Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td fontWeight="medium">Employee Handbook</Td>
            <Td fontWeight="medium">{handbook?.isSigned ? <>Yes</> : <>No</>}</Td>
            <Td textAlign="center">
              <Button
                isLoading={downloading}
                size="sm"
                variant="outline"
                onClick={() => downloadHandler({ url: company?.employee_handbook })}
                colorScheme="facebook">
                <FiDownloadCloud />
              </Button>
              <Button ml={2} size="sm" variant="outline" onClick={() => confirmHandler()} colorScheme="facebook">
                <FiEdit3 />
              </Button>
            </Td>
          </Tr>
        </Tbody>
      </Table>
      <ConfirmSignatureDialog
        isOpen={isOpenConfirmDlg}
        isSigning={signing}
        handleCLose={() => setIsOpenConfirmDlg(false)}
        handleMainAction={signHandler}
      />
    </Box>
  )
}

export default DocsForSignature
