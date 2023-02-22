import { useState, useEffect } from 'react'
import { API, graphqlOperation, Storage } from 'aws-amplify'
import cookie from 'js-cookie'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Flex,
  Heading,
  UnorderedList,
  ListItem,
  Box,
  AlertIcon,
  Button,
  Progress,
  useToast,
  Alert,
  Tabs,
  TabList,
  TabPanels,
  TabPanel
} from '@chakra-ui/react'
import { FiDownloadCloud } from 'react-icons/fi'
import { listDocuments, getEmployee, getContractor } from '@/src/graphql/queries'
import ImageDropzone from '@/components/ImageDropzone'
import { useUser } from '@/src/context/AuthContext'
import { downloadBlob } from '@/src/utils'
import TabStyled from '@/components/TabStyled'
import DocsForSignature from './DocsForSignature'

const EmployeeDocuments = () => {
  const [isEmployee, setIsEmployee] = useState(true)
  const { user } = useUser()
  const toast = useToast()
  const [profileID, setProfileID] = useState()
  const [currentProfile, setCurrentProfile] = useState()
  const [documents, setDocuments] = useState([])
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    const isEmployee = user?.attributes['custom:role'] === 'employee'
    setIsEmployee(isEmployee)
    const profileID = isEmployee ? cookie.get('employee-id') : cookie.get('contractor-id')
    setProfileID(profileID)
    fetchDocuments(profileID, isEmployee)

    return () => setStatus('idle')
  }, [])

  async function fetchDocuments(profileID, isEmployee) {
    setStatus('fetching')
    try {
      const [resDocs, resProfile] = await Promise.all([
        API.graphql(
          graphqlOperation(listDocuments, {
            filter: {
              [isEmployee ? 'employeeID' : 'contractorID']: {
                contains: profileID
              }
            }
          })
        ),
        API.graphql(graphqlOperation(isEmployee ? getEmployee : getContractor, { id: profileID }))
      ])

      setDocuments([...resDocs.data.listDocuments.items])
      setCurrentProfile(resProfile?.data?.getEmployee || resProfile?.data?.getContractor)
      setStatus('idle')
    } catch (err) {
      toast({
        title: 'Oops!',
        description: 'There was an error retrieving your data, please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true
      })
    } finally {
      setStatus('idle')
    }
  }

  const downloadHandler = async ({ url, fileName }) => {
    const file = await Storage.get(url, { download: true })
    downloadBlob(file.Body, fileName || 'cavnessHRdoc')
  }

  const verifyUniqueURL = (url) => !documents.some((doc) => doc.url === url)
  const addDoc = (doc) => setDocuments((prev) => [...prev, doc])
  if (status === 'fetching' || !currentProfile) return <Progress size="md" isIndeterminate />

  return (
    <div>
      <Heading color="gray.600" fontWeight="semibold" mb={3}>
        Documents
      </Heading>
      <Tabs variant="solid-rounded" colorScheme="facebook" size="sm">
        <TabList>
          <TabStyled title="All Documents" />
          <TabStyled title="I9 Documents" />
          <TabStyled title="Signature required" />
        </TabList>
        <TabPanels>
          <TabPanel>
            <Flex flexDirection="column" minW={{ md: '500' }} position="sticky">
              {documents.length > 0 && (
                <Box boxShadow="md" p="4" rounded="md" bgColor="white">
                  <Table size="sm" colorScheme="facebook" mb={4}>
                    <Thead>
                      <Tr>
                        <Th>Document</Th>
                        <Th>Status</Th>
                        <Th textAlign="center">Actions</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {documents
                        .filter((e) => !e._deleted)
                        .map(({ id, isSigned, url, fileName }) => (
                          <Tr key={id}>
                            <Td fontWeight="medium">{fileName || 'No name'}</Td>
                            <Td fontWeight="medium">
                              <Text textTransform="capitalize" color={!isSigned ? 'red.400' : 'blue.600'}>
                                {!isSigned ? 'Not Complete' : 'Complete'}
                              </Text>
                            </Td>
                            <Td textAlign="center">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => downloadHandler({ url, fileName })}
                                colorScheme="facebook">
                                <FiDownloadCloud />
                              </Button>
                            </Td>
                          </Tr>
                        ))}
                    </Tbody>
                  </Table>
                </Box>
              )}
              {documents.length === 0 && (
                <Alert status="info" rounded="md" boxShadow="md">
                  <AlertIcon />
                  No documents added yet.
                </Alert>
              )}
            </Flex>
          </TabPanel>
          <TabPanel>
            <Flex flexDirection="column">
              <Flex flexDirection="column">
                <Text>Choose which unexpired document(s) to upload from the Lists of Acceptable Documents.</Text>
                <Text mt={2} mb={2}>
                  You may upload either ONE SELECTION from List A or a COMBINATION of ONE SELECTION from List B and ONE
                  SELECTION from List C.
                </Text>
                <Box p={4} bgColor="white" boxShadow="md" rounded="md">
                  <Text fontWeight="bold" fontSize="md">
                    List A Documents
                  </Text>
                  <UnorderedList mb={2}>
                    <ListItem>U.S. Passport</ListItem>
                    <ListItem>U.S. Passport Card</ListItem>
                    <ListItem>Permanent Resident Card</ListItem>
                    <ListItem>Alien Registration Receipt Card</ListItem>
                    <ListItem>Foreign pasport containg a temoporary I-551 stamp</ListItem>
                    <ListItem>
                      Foreign passport containing a temporary I-551 printed notation on a machine-readable immigrant
                      visa
                    </ListItem>
                    <ListItem>Employment Authorization Document</ListItem>
                  </UnorderedList>
                  <ImageDropzone
                    isEmployee={isEmployee}
                    listName="A"
                    employeeId={profileID}
                    employeeVersion={currentProfile._version}
                    name={`${currentProfile.first_name} ${currentProfile.last_name}`}
                    uniqUrlHandler={(url) => verifyUniqueURL(url)}
                    addDocHandler={addDoc}
                  />
                </Box>
                <Box p={4} mt={4} bgColor="white" boxShadow="md" rounded="md">
                  <Text fontWeight="bold" fontSize="md">
                    List B Documents
                  </Text>
                  <UnorderedList mb={2}>
                    <ListItem>
                      Driver&apos;s license issued by a State or outlying possession of the United States
                    </ListItem>
                    <ListItem>ID Card issued by a State or outlying possession of the United States</ListItem>
                    <ListItem>ID Card issued by federal, state, or local government agencies or entities</ListItem>
                    <ListItem>School ID card with photograph</ListItem>
                    <ListItem>Voter&apos;s registration card</ListItem>
                    <ListItem>U.S. Military Card</ListItem>
                    <ListItem>U.S. Military draft record</ListItem>
                    <ListItem>Military dependent&apos;s ID card</ListItem>
                    <ListItem>U.S. Coast Guard Merchant Mariner Card</ListItem>
                    <ListItem>Native American Tribal Document</ListItem>
                    <ListItem>Driver&apos;s license issued by a Canadian government authority</ListItem>
                  </UnorderedList>
                  <ImageDropzone
                    isEmployee={isEmployee}
                    listName="B"
                    employeeId={profileID}
                    employeeVersion={currentProfile._version}
                    name={`${currentProfile.first_name} ${currentProfile.last_name}`}
                    uniqUrlHandler={(url) => verifyUniqueURL(url)}
                    addDocHandler={addDoc}
                  />
                </Box>

                <Box p={4} mt={4} bgColor="white" boxShadow="md" rounded="md">
                  <Text fontWeight="bold" fontSize="md">
                    List C Documents
                  </Text>
                  <UnorderedList mb={2}>
                    <ListItem>Social Security Account Number card without restrictions</ListItem>
                    <ListItem>Certification of Birth Abroad</ListItem>
                    <ListItem>Certification of Report of Birth</ListItem>
                    <ListItem>Consular Report of Birth Abroad</ListItem>
                    <ListItem>Original or certified copy of a U.S. birth certificate bearing an official seal</ListItem>
                    <ListItem>Native American tribal document</ListItem>
                    <ListItem>U.S. Citizen I.D. Card</ListItem>
                    <ListItem>Identification Card for use of Resident Citizen in the United States</ListItem>
                    <ListItem>Employment authorization document issued by DHS</ListItem>
                  </UnorderedList>
                  <ImageDropzone
                    isEmployee={isEmployee}
                    listName="C"
                    employeeId={profileID}
                    employeeVersion={currentProfile._version}
                    name={`${currentProfile.first_name} ${currentProfile.last_name}`}
                    uniqUrlHandler={(url) => verifyUniqueURL(url)}
                    addDocHandler={addDoc}
                  />
                </Box>
              </Flex>
            </Flex>
          </TabPanel>
          <TabPanel>
            <DocsForSignature
              hasSignature={currentProfile?.hasSignature}
              position={currentProfile?.position}
              fullName={`${currentProfile?.first_name} ${currentProfile?.last_name}`}
              isEmployee={isEmployee}
              profileID={profileID}
              documents={documents}
              setDocuments={setDocuments}
              company={currentProfile?.CompanyOfContractor || currentProfile?.CompanyOfEmployee}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  )
}

export default EmployeeDocuments
