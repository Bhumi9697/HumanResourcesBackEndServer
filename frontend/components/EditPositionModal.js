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
  useToast,
  Text
} from '@chakra-ui/react'

import { updateEmployee } from '@/src/graphql/mutations'

const EditPositionModal = ({ currentEmployee, onEmployeeChange, info }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = useRef()
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm()
  const toast = useToast()

  async function editPosition({ Position }) {
    try {
      const employeeDetails = {
        id: info.id,
        _version: info._version,
        position: Position
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
      <Text ml={4} textDecoration="underline" _hover={{ cursor: 'pointer' }} color="blue.600" onClick={onOpen}>
        edit
      </Text>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(editPosition)} backgroundColor="#020202">
          <ModalHeader color="#F5F5F5" fontSize="2xl" fontWeight="normal" textAlign="center">
            Edit Position
          </ModalHeader>
          <ModalCloseButton color="#F5F5F5" />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel color="#F5F5F5" ref={initialRef}>
                Position
              </FormLabel>
              <Input
                placeholder={info.position}
                {...register('Position', { required: true })}
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

export default EditPositionModal
