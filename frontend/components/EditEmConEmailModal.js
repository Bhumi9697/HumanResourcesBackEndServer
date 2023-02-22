import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { API } from 'aws-amplify'
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

import { updateEmployee } from '@/src/graphql/mutations'

const EditEmConEmailModal = ({ currentEmployee, onEmployeeChange, info }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = useRef()
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm()
  const toast = useToast()

  async function editEmConEmail({ emConEmail }) {
    try {
      const employeeDetails = {
        id: info.id,
        _version: info._version,
        emergency_contact_email: emConEmail
      }

      const updatedEmployee = await API.graphql({
        query: updateEmployee,
        variables: { input: employeeDetails }
      })

      const query = updatedEmployee.data.updateEmployee
      onEmployeeChange({ ...currentEmployee, query })

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
        description: 'There was an error, please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    }
  }

  return (
    <>
      <Button ml={2} colorScheme="blue" size="xs" onClick={onOpen}>
        Edit
      </Button>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(editEmConEmail)} backgroundColor="#020202">
          <ModalHeader color="#F5F5F5" fontSize="2xl" fontWeight="normal" textAlign="center">
            Edit Emergency Contact Email
          </ModalHeader>
          <ModalCloseButton color="#F5F5F5" />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel color="#F5F5F5" ref={initialRef}>
                Email
              </FormLabel>
              <Input
                placeholder={info.emergency_contact_email}
                {...register('emConEmail', { required: true })}
                backgroundColor="#F5F5F5"
                color="#020202"
              />
              {errors.firstName && <p style={{ color: 'red' }}>input required</p>}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3}>
              Cancel
            </Button>
            <Button type="submit" variant="outline" size="md" p={5} colorScheme="blue">
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default EditEmConEmailModal
