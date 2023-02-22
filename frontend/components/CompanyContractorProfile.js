import { useState, useEffect, useRef } from 'react'
import { API, graphqlOperation, Storage } from 'aws-amplify'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Text,
  Flex,
  Heading,
  Link,
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
  useDisclosure,
  useToast,
  Image
} from '@chakra-ui/react'
import { getContractor } from '@/src/graphql/queries'
import { createDocument } from '@/src/graphql/mutations'
import { updateDocument } from '@/src/graphql/mutations'
import { deleteDocument } from '@/src/graphql/mutations'
import EditEmailModalContractor from '@/components/EditEmailModalContractor'
import EditPositionModalContractor from '@/components/EditPositionModalContractor'

const CompanyContractorProfile = () => {
  const router = useRouter()
  const [currentContractor, setCurrentContractor] = useState()

  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = useRef()
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm()
  const toast = useToast()

  async function createNewDocument({ type, googleUrl, signUrl }) {
    try {
      const documentDetails = {
        Type: type,
        google_drive_url: googleUrl,
        sign_url: signUrl,
        companyID: router.query.companyId,
        contractorID: router.query.contractorId
      }

      const newDocument = await API.graphql(graphqlOperation(createDocument, { input: documentDetails }))

      currentContractor.query.DocumentsForContractor.items.push(newDocument.data.createDocument)

      toast({
        title: 'Document successfully added',
        status: 'success',
        duration: 2000,
        isClosable: true
      })

      reset()

      onClose()
    } catch (err) {
      toast({
        title: 'Oops!',
        description: 'There was an error adding your document, please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    }
  }

  async function editSentStatus({ e }) {
    try {
      const sentStatus = {
        id: e.id,
        isSent: e.isSent ? false : true,
        _version: e._version
      }

      await API.graphql({
        query: updateDocument,
        variables: { input: sentStatus }
      })

      fetchContractor(router.query.contractorId)

      toast({
        title: 'Successfully updated',
        status: 'success',
        duration: 2000,
        isClosable: true
      })

      reset()

      onClose()
    } catch (err) {
      toast({
        title: 'Oops!',
        description: 'There was an error updating the status, please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    }
  }

  async function editSignedStatus({ e }) {
    try {
      const signedStatus = {
        id: e.id,
        isSigned: e.isSigned ? false : true,
        _version: e._version
      }

      await API.graphql({
        query: updateDocument,
        variables: { input: signedStatus }
      })

      fetchContractor(router.query.contractorId)

      toast({
        title: 'Successfully updated',
        status: 'success',
        duration: 2000,
        isClosable: true
      })

      reset()
      onClose()
    } catch (err) {
      toast({
        title: 'Oops!',
        description: 'There was an error updating the status, please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    }
  }

  async function deleteDoc({ e }) {
    try {
      const docDetails = {
        id: e.id,
        _version: e._version
      }

      await API.graphql({
        query: deleteDocument,
        variables: { input: docDetails }
      })

      fetchContractor(router.query.contractorId)

      toast({
        title: 'Successfully deleted',
        status: 'success',
        duration: 2000,
        isClosable: true
      })

      reset()
      onClose()
    } catch (err) {
      toast({
        title: 'Oops!',
        description: 'There was an error deleting the document, please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    }
  }

  useEffect(() => {
    fetchContractor(router.query.contractorId)
  }, [])

  useEffect(() => {
    if (router.isReady) {
      fetchContractor(router.query.contractorId)
    }
  }, [router.query])

  async function fetchContractor(id) {
    try {
      const contractor = await API.graphql(graphqlOperation(getContractor, { id: id }))
      const query = contractor.data.getContractor
      const s3ImageListA = await Storage.get(contractor.data.getContractor.ListA_Image)
      contractor.data.getContractor.s3ImageListA = s3ImageListA
      const s3ImageListB = await Storage.get(contractor.data.getContractor.ListB_image)
      contractor.data.getContractor.s3ImageListB = s3ImageListB
      const s3ImageListC = await Storage.get(contractor.data.getContractor.ListC_image)
      contractor.data.getContractor.s3ImageListC = s3ImageListC
      setCurrentContractor({ ...currentContractor, query })
    } catch (err) {
      toast({
        title: 'Oops!',
        description: 'There was an error getting the information, please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true
      })
    }
  }

  return (
    <>
      {!currentContractor ? (
        <h1>Loading....</h1>
      ) : (
        <Flex flexDirection="column">
          <Flex justifyContent="space-between" alignItems="center" mb={4}>
            <Heading fontWeight="normal" mb={4} letterSpacing="tight">
              {currentContractor.query.first_name} {currentContractor.query.last_name}
            </Heading>

            <>
              <Button onClick={onOpen} variant="outline" size="md" p={5} colorScheme="facebook">
                + New Document
              </Button>
              <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent as="form" onSubmit={handleSubmit(createNewDocument)} backgroundColor="#020202">
                  <ModalHeader color="#F5F5F5" fontSize="2xl" fontWeight="normal" textAlign="center">
                    New Document
                  </ModalHeader>
                  <ModalCloseButton color="#F5F5F5" />
                  <ModalBody pb={6}>
                    <FormControl>
                      <FormLabel color="#F5F5F5" ref={initialRef}>
                        Type
                      </FormLabel>
                      <Input
                        placeholder="document type"
                        {...register('type', { required: true })}
                        backgroundColor="#F5F5F5"
                        color="#020202"
                      />
                      {errors.type && <p style={{ color: 'red' }}>document tyoe is required</p>}
                    </FormControl>

                    <FormControl mt={4}>
                      <FormLabel color="#F5F5F5">Google Drive URL</FormLabel>
                      <Input
                        placeholder="Google Drive url"
                        {...register('googleUrl', { required: true })}
                        backgroundColor="#F5F5F5"
                        color="#020202"
                      />
                      {errors.googleUrl && <p style={{ color: 'red' }}>google drive url is required</p>}
                    </FormControl>

                    <FormControl mt={4}>
                      <FormLabel color="#F5F5F5">SignNow URL</FormLabel>
                      <Input
                        placeholder="SignNow url"
                        {...register('signUrl', { required: true })}
                        backgroundColor="#F5F5F5"
                        color="#020202"
                      />
                      {errors.signUrl && <p style={{ color: 'red' }}>SignNow URL is required</p>}
                    </FormControl>
                  </ModalBody>

                  <ModalFooter>
                    <Button onClick={onClose} mr={3}>
                      Cancel
                    </Button>
                    <Button type="submit" variant="outline" size="md" p={5} colorScheme="blue">
                      Add
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </>
          </Flex>
          <Table colorScheme="facebook">
            <Thead>
              <Tr>
                <Th fontSize="md">Document</Th>
                <Th fontSize="md">Sent Status</Th>
                <Th fontSize="md">Signed Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {currentContractor.query.DocumentsForContractor.items
                .filter((e) => !e._deleted)
                .map((e) => {
                  return (
                    <Tr key={e.id}>
                      <Td fontWeight="medium">
                        <Link
                          textTransform="capitalize"
                          fontWeight="medium"
                          textDecoration="underline"
                          _hover={{ cursor: 'pointer', color: 'blue.600' }}
                          href={`https://${e.google_drive_url}`}
                          isExternal>
                          {e.Type}
                        </Link>
                      </Td>
                      <Td>
                        <Flex>
                          <Text textTransform="capitalize" color={!e.isSent ? '#DC143C' : '#0072B9'} fontSize="md">
                            {!e.isSent ? 'Not Sent' : 'Sent'}
                          </Text>
                          <Text
                            ml={4}
                            fontSize={12}
                            textDecoration="underline"
                            _hover={{ cursor: 'pointer', color: 'blue.600' }}
                            onClick={() => editSentStatus({ e })}>
                            {e.isSent ? 'mark as not sent' : 'mark as sent'}
                          </Text>
                        </Flex>
                      </Td>
                      <Td>
                        <Flex justifyContent="space-between">
                          <Flex>
                            <Text textTransform="capitalize" color={!e.isSigned ? '#DC143C' : '#0072B9'} fontSize="md">
                              {!e.isSigned ? 'Not Signed' : 'Signed'}
                            </Text>
                            <Text
                              ml={4}
                              fontSize={12}
                              textDecoration="underline"
                              _hover={{ cursor: 'pointer', color: 'blue.600' }}
                              onClick={() => editSignedStatus({ e })}>
                              {e.isSigned ? 'mark as not signed' : 'mark as signed'}
                            </Text>
                          </Flex>
                          <Text
                            ml={4}
                            fontSize={12}
                            textDecoration="underline"
                            _hover={{ cursor: 'pointer', color: 'blue.600' }}
                            onClick={() => deleteDoc({ e })}>
                            delete document
                          </Text>
                        </Flex>
                      </Td>
                    </Tr>
                  )
                })}
            </Tbody>
          </Table>
          <Flex justifyContent="space-between" alignItems="center" mt={8} mb={4}>
            <Heading fontWeight="normal" mb={4} letterSpacing="tight">
              Info
            </Heading>
          </Flex>
          <Flex ml={4} flexDirection="column">
            <Flex mb={4}>
              <Text fontWeight="bold" fontSize="md">
                Full Name:&nbsp;
              </Text>
              <Text fontSize="md">
                {currentContractor.query.first_name} {currentContractor.query.last_name}
              </Text>
            </Flex>
            <Flex mb={4}>
              <Text fontWeight="bold" fontSize="md">
                Email:&nbsp;
              </Text>
              <Text fontSize="md">{currentContractor.query.email}</Text>
              <EditEmailModalContractor
                currentContractor={currentContractor}
                onContractorChange={setCurrentContractor}
                info={currentContractor.query}
              />
            </Flex>
            <Flex mb={4}>
              <Text fontWeight="bold" fontSize="md">
                Phone:&nbsp;
              </Text>
              <Text fontSize="md">{currentContractor.query.phone}</Text>
            </Flex>
            <Flex mb={4}>
              <Text fontWeight="bold" fontSize="md">
                Job Title:&nbsp;
              </Text>
              <Text fontSize="md">{currentContractor.query.position}</Text>
              <EditPositionModalContractor
                currentContractor={currentContractor}
                onContractorChange={setCurrentContractor}
                info={currentContractor.query}
                refresh={fetchContractor()}
              />
            </Flex>
            <Flex mb={4}>
              <Text fontWeight="bold" fontSize="md">
                Address:&nbsp;
              </Text>
              <Text fontSize="md">{currentContractor.query.address}</Text>
            </Flex>
            <Flex mb={4}>
              <Text fontWeight="bold" fontSize="md">
                City:&nbsp;
              </Text>
              <Text fontSize="md">{currentContractor.query.city}</Text>
            </Flex>
            <Flex mb={4}>
              <Text fontWeight="bold" fontSize="md">
                State:&nbsp;
              </Text>
              <Text fontSize="md">{currentContractor.query.state}</Text>
            </Flex>
            <Flex mb={4}>
              <Text fontWeight="bold" fontSize="md">
                Zip:&nbsp;
              </Text>
              <Text fontSize="md">{currentContractor.query.zip}</Text>
            </Flex>
            <Flex mb={4}>
              <Text fontWeight="bold" fontSize="md">
                Date of Birth:&nbsp;
              </Text>
              <Text fontSize="md">{currentContractor.query.birthdate}</Text>
            </Flex>
          </Flex>
          <Flex justifyContent="space-between" alignItems="center" mt={4} mb={4}>
            <Heading fontWeight="normal" mb={4} letterSpacing="tight">
              Emergency Contact
            </Heading>
          </Flex>
          <Flex ml={4} flexDirection="column">
            <Flex mb={4}>
              <Text fontWeight="bold" fontSize="md">
                Name:&nbsp;
              </Text>
              <Text fontSize="md">{currentContractor.query.emergency_contact_name}</Text>
            </Flex>
            <Flex mb={4}>
              <Text fontWeight="bold" fontSize="md">
                Relation:&nbsp;
              </Text>
              <Text fontSize="md">{currentContractor.query.emergency_contact_relation}</Text>
            </Flex>
            <Flex mb={4}>
              <Text fontWeight="bold" fontSize="md">
                Email:&nbsp;
              </Text>
              <Text fontSize="md">{currentContractor.query.emergency_contact_email}</Text>
            </Flex>
            <Flex mb={4}>
              <Text fontWeight="bold" fontSize="md">
                Phone:&nbsp;
              </Text>
              <Text fontSize="md">{currentContractor.query.emergency_contact_phone}</Text>
            </Flex>
          </Flex>
          <Flex justifyContent="space-between" alignItems="center" mt={4} mb={4}>
            <Heading fontWeight="normal" mb={4} letterSpacing="tight">
              Identification Documents
            </Heading>
          </Flex>
          <Flex ml={4} flexDirection="column">
            <Image src={currentContractor.query.s3ImageListA} mb={2}></Image>
            <Image src={currentContractor.query.s3ImageListB} mb={2}></Image>
            <Image src={currentContractor.query.s3ImageListC} mb={2}></Image>
          </Flex>
        </Flex>
      )}
    </>
  )
}

export default CompanyContractorProfile
