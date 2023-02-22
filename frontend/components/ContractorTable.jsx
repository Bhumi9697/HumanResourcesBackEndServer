import { useEffect, useState, useRef } from 'react'
import NextLink from 'next/link'
import { API, graphqlOperation } from 'aws-amplify'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import {
  Checkbox,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Flex,
  Text,
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
  Alert,
  AlertIcon
} from '@chakra-ui/react'
import cookie from 'js-cookie'
import { createContractor } from '@/src/graphql/mutations'
import { deleteContractor as deleteCont } from '@/src/graphql/mutations'
import ConfirmDelete from './ConfirmDelete'
import { sendEmail, deleteUser } from '@/src/utils'

const ContractorTable = ({ shouldShowTitle = true, contractors: contractorsListing }) => {
  const router = useRouter()
  const contractorToDelete = useRef(null)
  const [openDelDlg, setOpenDelDlg] = useState(false)
  const [status, setStatus] = useState('idle')
  const [contractors, setContractors] = useState([])
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = useRef()
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm()
  const toast = useToast()

  useEffect(() => setContractors(contractorsListing), [contractorsListing])

  async function createNewContractor({ firstName, lastName, email, phone, position }) {
    setStatus('adding')
    const companyId = router.query.companyId || cookie.get('contractor-id')
    try {
      const contractorDetails = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phone,
        position: position,
        companyID: companyId
      }

      const newContractor = await API.graphql(graphqlOperation(createContractor, { input: contractorDetails }))
      await sendEmail({
        emails: [email],
        subject: 'Registration process - CavnessHR',
        html: `
        <h1>Welcome</h1>

        For continuing with the registration process you need to sign up on the plattform, use the next link below.
        <br />
        <a href="https://www.cavnesshr.com/signup?company=${companyId}&accountType=con&email=${email}">Sign up</a>
      `
      })
      setContractors((prev) => [...prev, newContractor.data.createContractor])

      toast({
        title: 'Contractor successfully added',
        status: 'success',
        duration: 2000,
        isClosable: true
      })

      reset()
      onClose()
    } catch (err) {
      toast({
        title: 'Oops!',
        description: 'There was an error adding your contractor, please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true
      })
      setStatus('idle')
    }

    setStatus('idle')
  }

  async function deleteContractor(contractor) {
    setStatus('deleting')
    try {
      const contractorDetails = {
        id: contractor.id,
        _version: contractor._version
      }

      await API.graphql({
        query: deleteCont,
        variables: { input: contractorDetails }
      })

      await deleteUser({ email: contractor.email.toLowerCase() })
      setContractors((prev) => prev.filter((con) => con.id !== contractor.id))
      toast({
        title: 'Successfully deleted',
        status: 'success',
        duration: 4000,
        isClosable: true
      })

      reset()
      onClose()
      setOpenDelDlg(false)
    } catch (err) {
      toast({
        title: 'Oops!',
        description: 'There was an error deleting the contractor, please try again.',
        status: 'error',
        duration: 4000,
        isClosable: true
      })
    } finally {
      setStatus('idle')
    }
  }

  const confirmDeleteCon = (con) => {
    contractorToDelete.current = con
    setOpenDelDlg(true)
  }

  const offerLetterSigned = (document) => {
    let doc = document.filter((item) => item.Type == 'offer_letter' && !item._deleted)
    return doc[0]?.isSigned
  }

  const handbookSigned = (document) => {
    let doc = document.filter((item) => item.Type == 'handbook' && !item._deleted)
    return doc[0]?.isSigned
  }

  const policiesSigned = (document) => {
    let doc = document.filter((item) => item.Type == 'policies' && !item._deleted)
    return doc[0]?.isSigned
  }

  const w2Signed = (document) => {
    let doc = document.filter((item) => item.Type == 'w2' && !item._deleted)
    return doc[0]?.isSigned
  }

  return (
    <>
      <ConfirmDelete
        isOpen={openDelDlg}
        onClose={() => setOpenDelDlg(false)}
        isLoading={status === 'deleting'}
        loadingText="Deleting"
        title="Delete Contractor"
        mainAction={() => deleteContractor(contractorToDelete.current)}
      />
      <Flex justifyContent={shouldShowTitle ? 'space-between' : 'flex-end'} alignItems="center" mb={4}>
        {shouldShowTitle && (
          <Text
            fontWeight="normal"
            size="lg"
            rounded="md"
            px={4}
            py={2}
            textTransform="uppercase"
            bg="blue.100"
            color="blue.500"
            boxShadow="base">
            Contractors
          </Text>
        )}
        <>
          <Button onClick={onOpen} variant="outline" size="md" p={5} colorScheme="facebook">
            + New Contractor
          </Button>
          <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent as="form" onSubmit={handleSubmit(createNewContractor)} backgroundColor="#020202">
              <ModalHeader color="#F5F5F5" fontSize="2xl" fontWeight="normal" textAlign="center">
                New Contractor
              </ModalHeader>
              <ModalCloseButton color="#F5F5F5" />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel color="#F5F5F5" ref={initialRef}>
                    First Name
                  </FormLabel>
                  <Input
                    placeholder="contractor first name"
                    {...register('firstName', { required: true })}
                    backgroundColor="#F5F5F5"
                    color="#020202"
                  />
                  {errors.firstName && <p style={{ color: 'red' }}>First Name is required</p>}
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel color="#F5F5F5">Last Name</FormLabel>
                  <Input
                    placeholder="contractor last name"
                    {...register('lastName', { required: true })}
                    backgroundColor="#F5F5F5"
                    color="#020202"
                  />
                  {errors.lastName && <p style={{ color: 'red' }}>Last Name is required</p>}
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel color="#F5F5F5">Email</FormLabel>
                  <Input
                    placeholder="contractor email"
                    {...register('email', { required: true })}
                    backgroundColor="#F5F5F5"
                    color="#020202"
                  />
                  {errors.email && <p style={{ color: 'red' }}>Email is required</p>}
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel color="#F5F5F5">Phone</FormLabel>
                  <Input
                    placeholder="contractor phone"
                    {...register('phone')}
                    backgroundColor="#F5F5F5"
                    color="#020202"
                  />
                  {errors.phone && errors.phone.message}
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel color="#F5F5F5">Position</FormLabel>
                  <Input
                    placeholder="contractor job title"
                    {...register('position')}
                    backgroundColor="#F5F5F5"
                    color="#020202"
                  />
                  {errors.position && errors.position.message}
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
      {status !== 'fetching' && contractors.length > 0 && (
        <Flex boxShadow="md" p={2} bgColor="white" rounded="md" overflowX="auto">
          <Table colorScheme="facebook">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Position</Th>
                <Th>Offer Letter</Th>
                <Th>Employee Handbook</Th>
                <Th>HR Policies</Th>
                <Th>W2</Th>
                <Th textAlign="center">Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {!contractors ? (
                <p>Loading...</p>
              ) : (
                contractors.map((contractor) => (
                  <Tr key={contractor.id}>
                    <NextLink href={`/app/companies/${router.query.companyId}/contractors/${contractor.id}`}>
                      <Td
                        fontWeight="medium"
                        textDecoration="underline"
                        _hover={{ cursor: 'pointer', color: 'blue.600' }}>
                        {contractor.first_name} {contractor.last_name}
                      </Td>
                    </NextLink>
                    <Td>{contractor.position ? contractor.position : 'no position specified'}</Td>
                    <Td>
                      <Checkbox
                        size="lg"
                        isDisabled
                        isChecked={offerLetterSigned(contractor.DocumentsForContractor.items)}
                      />
                    </Td>
                    <Td>
                      <Checkbox
                        size="lg"
                        isDisabled
                        isChecked={handbookSigned(contractor.DocumentsForContractor.items)}
                      />
                    </Td>
                    <Td>
                      <Checkbox
                        size="lg"
                        isDisabled
                        isChecked={policiesSigned(contractor.DocumentsForContractor.items)}
                      />
                    </Td>
                    <Td textAlign="center">
                      <Flex justifyContent="space-between" alignItems="center">
                        <Checkbox size="lg" isDisabled isChecked={w2Signed(contractor.DocumentsForContractor.items)} />
                      </Flex>
                    </Td>
                    <Td textAlign="center">
                      <Flex flexWrap="no-wrap">
                        <Button size="sm" colorScheme="facebook" variant="outline" mr={2}>
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          color="red.500"
                          borderColor="red.500"
                          _hover={{ bg: 'red.100' }}
                          _focus={{ boxShadow: '0 0 0 3px rgba(209,30,30,0.5)' }}
                          onClick={() => confirmDeleteCon(contractor)}>
                          Delete
                        </Button>
                      </Flex>
                    </Td>
                  </Tr>
                ))
              )}
            </Tbody>
          </Table>
        </Flex>
      )}

      {status === 'fetching' && (
        <Alert status="info" rounded="md" boxShadow="md">
          <AlertIcon />
          Loading Contractors...
        </Alert>
      )}
      {status !== 'fetching' && contractors.length === 0 && (
        <Alert status="warning" rounded="md" boxShadow="md">
          <AlertIcon />
          No contractors
        </Alert>
      )}
    </>
  )
}

export default ContractorTable
