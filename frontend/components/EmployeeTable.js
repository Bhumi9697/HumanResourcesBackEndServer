import { useState, useRef, useEffect } from 'react'
import NextLink from 'next/link'
import { API, graphqlOperation } from 'aws-amplify'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import cookie from 'js-cookie'
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
import { createEmployee } from '@/src/graphql/mutations'
import { deleteEmployee } from '@/src/graphql/mutations'
import ConfirmDelete from './ConfirmDelete'
import { sendEmail, deleteUser } from '@/src/utils'

const EmployeeTable = ({ shouldShowTitle = true, employees: empListing }) => {
  const employeeToDelete = useRef(null)
  const router = useRouter()
  const [status, setStatus] = useState('idle')
  const [openDelDlg, setOpenDelDlg] = useState(false)
  const [employees, setEmployees] = useState([])
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = useRef()
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm()
  const toast = useToast()

  useEffect(() => setEmployees(empListing), [empListing])

  async function createNewEmployee({ firstName, lastName, email, phone, position }) {
    setStatus('adding')
    const companyId = router.query.companyId || cookie.get('company-id')
    try {
      const employeeDetails = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phone,
        position: position,
        companyID: companyId
      }

      const newEmployee = await API.graphql(graphqlOperation(createEmployee, { input: employeeDetails }))

      await sendEmail({
        emails: [email],
        subject: 'Registration process - CavnessHR',
        html: `
        <h1>Welcome</h1>

        For continuing with the registration process you need to sign up on the plattform, use the next link below.
        <br />
        <a href="https://www.cavnesshr.com/signup?company=${companyId}&accountType=emp&email=${email}">Sign up</a>
      `
      })

      setEmployees((prev) => [...prev, newEmployee.data.createEmployee])
      toast({
        title: 'Employee successfully added',
        status: 'success',
        duration: 2000,
        isClosable: true
      })

      reset()
      onClose()
    } catch (err) {
      toast({
        title: 'Oops!',
        description: 'There was an error adding your employee, please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true
      })
      setStatus('idle')
    }

    setStatus('idle')
  }

  async function deleteEmp(e) {
    setStatus('deleting')
    try {
      const employeeDetails = {
        id: e.id,
        _version: e._version
      }

      await API.graphql({
        query: deleteEmployee,
        variables: { input: employeeDetails }
      })

      await deleteUser({ email: e.email.toLowerCase() })

      setEmployees((prev) => prev.filter((emp) => emp.id !== e.id))
      setOpenDelDlg(false)
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
        description: 'There was an error deleting the employee, please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true
      })
      setStatus('idle')
    }

    setStatus('idle')
  }

  const confirmDeleteEmp = (emp) => {
    employeeToDelete.current = emp
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

  const i9Signed = (document) => {
    let doc = document.filter((item) => item.Type == 'i9' && !item._deleted)
    return doc[0]?.isSigned
  }

  return (
    <>
      <ConfirmDelete
        isOpen={openDelDlg}
        onClose={() => setOpenDelDlg(false)}
        isLoading={status === 'deleting'}
        loadingText="Deleting"
        title="Delete Employee"
        mainAction={() => deleteEmp(employeeToDelete.current)}
      />
      <Flex alignItems="center" mb={4} justifyContent={shouldShowTitle ? 'space-between' : 'flex-end'}>
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
            Employees
          </Text>
        )}
        <>
          <Button onClick={onOpen} variant="outline" size="md" p={5} colorScheme="facebook">
            + New Employee
          </Button>
          <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent as="form" onSubmit={handleSubmit(createNewEmployee)} backgroundColor="#020202">
              <ModalHeader color="#F5F5F5" fontSize="2xl" fontWeight="normal" textAlign="center">
                New Employee
              </ModalHeader>
              <ModalCloseButton color="#F5F5F5" />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel color="#F5F5F5" ref={initialRef}>
                    First Name
                  </FormLabel>
                  <Input
                    placeholder="employee first name"
                    {...register('firstName', { required: true })}
                    backgroundColor="#F5F5F5"
                    color="#020202"
                  />
                  {errors.firstName && <p style={{ color: 'red' }}>First Name is required</p>}
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel color="#F5F5F5">Last Name</FormLabel>
                  <Input
                    placeholder="employee last name"
                    {...register('lastName', { required: true })}
                    backgroundColor="#F5F5F5"
                    color="#020202"
                  />
                  {errors.lastName && <p style={{ color: 'red' }}>Last Name is required</p>}
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel color="#F5F5F5">Email</FormLabel>
                  <Input
                    placeholder="employee email"
                    {...register('email', { required: true })}
                    backgroundColor="#F5F5F5"
                    color="#020202"
                  />
                  {errors.email && <p style={{ color: 'red' }}>Email is required</p>}
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel color="#F5F5F5">Phone</FormLabel>
                  <Input
                    placeholder="employee phone"
                    {...register('phone')}
                    backgroundColor="#F5F5F5"
                    color="#020202"
                  />
                  {errors.phone && errors.phone.message}
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel color="#F5F5F5">Position</FormLabel>
                  <Input
                    placeholder="employee job title"
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
      {status !== 'fetching' && employees.length > 0 && (
        <Flex boxShadow="md" p={2} bgColor="white" rounded="md" overflowX="auto">
          <Table colorScheme="facebook">
            <Thead>
              <Tr>
                <Th textAlign="center">Name</Th>
                <Th textAlign="center">Position</Th>
                <Th textAlign="center">Offer Letter</Th>
                <Th textAlign="center">Employee Handbook</Th>
                <Th textAlign="center">HR Policies</Th>
                <Th textAlign="center">I9</Th>
                <Th textAlign="center">Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {employees.map((e) => (
                <Tr key={e.id}>
                  <NextLink href={`/app/companies/${router.query.companyId || router.query.id}/employees/${e.id}`}>
                    <Td
                      fontWeight="medium"
                      textDecoration="underline"
                      _hover={{ cursor: 'pointer', color: 'blue.600' }}>
                      {e.first_name} {e.last_name}
                    </Td>
                  </NextLink>
                  <Td>{e.position ? e.position : 'no position specified'}</Td>
                  <Td>
                    <Checkbox size="lg" isDisabled isChecked={offerLetterSigned(e.DocumentsForEmployee.items)} />
                  </Td>
                  <Td>
                    <Checkbox size="lg" isDisabled isChecked={handbookSigned(e.DocumentsForEmployee.items)} />
                  </Td>
                  <Td>
                    <Checkbox size="lg" isDisabled isChecked={policiesSigned(e.DocumentsForEmployee.items)} />
                  </Td>
                  <Td>
                    <Flex justifyContent="space-between" alignItems="center">
                      <Checkbox size="lg" isDisabled isChecked={i9Signed(e.DocumentsForEmployee.items)} />
                    </Flex>
                  </Td>
                  <Td textAlign="center">
                    <Flex flexWrap="no-wrap">
                      <Button disabled size="sm" colorScheme="facebook" variant="outline" mr={2}>
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        color="red.500"
                        borderColor="red.500"
                        _hover={{ bg: 'red.100' }}
                        _focus={{ boxShadow: '0 0 0 3px rgba(209,30,30,0.5)' }}
                        onClick={() => confirmDeleteEmp(e)}>
                        Delete
                      </Button>
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Flex>
      )}

      {status === 'fetching' && (
        <Alert status="info" rounded="md" boxShadow="md">
          <AlertIcon />
          Loading Employees...
        </Alert>
      )}
      {status !== 'fetching' && employees.length === 0 && (
        <Alert status="warning" rounded="md" boxShadow="md">
          <AlertIcon />
          No Employees
        </Alert>
      )}
    </>
  )
}

export default EmployeeTable
