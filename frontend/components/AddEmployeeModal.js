import { useRef } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { API, graphqlOperation } from 'aws-amplify'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Button,
  Input,
  useDisclosure,
  useToast
} from '@chakra-ui/react'
import { createEmployee } from '@/src/graphql/mutations'

const CreateEmployeeModal = () => {
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = useRef()
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm()
  const toast = useToast()

  async function createNewEmployee({ firstName, lastName, email, phone, location }) {
    try {
      const employeeDetails = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phone,
        location: location,
        companyID: router.query.companyId
      }

      await API.graphql(graphqlOperation(createEmployee, { input: employeeDetails }))

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
    }
  }

  return (
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
              <Input placeholder="employee phone" {...register('phone')} backgroundColor="#F5F5F5" color="#020202" />
              {errors.phone && errors.phone.message}
            </FormControl>

            <FormControl mt={4}>
              <FormLabel color="#F5F5F5">Location</FormLabel>
              <Input
                placeholder="employee location"
                {...register('location')}
                backgroundColor="#F5F5F5"
                color="#020202"
              />
              {errors.location && errors.location.message}
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
  )
}

export default CreateEmployeeModal
