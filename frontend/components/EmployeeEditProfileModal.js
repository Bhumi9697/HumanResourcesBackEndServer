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

const CreateEmployeeModal = ({ currentInfo }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm()
  const toast = useToast()

  async function createNewEmployee({ position, phone, address, city, state, zip }) {
    try {
      const employeeDetails = {
        position: position,
        phone: phone,
        address: address,
        city: city,
        state: state,
        zip: zip
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
        Edit
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(createNewEmployee)} backgroundColor="#020202">
          <ModalHeader color="#F5F5F5" fontSize="2xl" fontWeight="normal" textAlign="center">
            Edit Profile
          </ModalHeader>
          <ModalCloseButton color="#F5F5F5" />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel color="#F5F5F5">Position</FormLabel>
              <Input
                placeholder="position"
                {...register('position', { required: true })}
                backgroundColor="#F5F5F5"
                color="#020202"
                value={currentInfo.position}
              />
              {errors.firstName && <p style={{ color: 'red' }}>position is required</p>}
            </FormControl>

            <FormControl mt={4}>
              <FormLabel color="#F5F5F5">Phone</FormLabel>
              <Input
                placeholder="phone"
                {...register('phone')}
                backgroundColor="#F5F5F5"
                color="#020202"
                value={currentInfo.phone}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel color="#F5F5F5">Address</FormLabel>
              <Input
                placeholder="address"
                {...register('email')}
                backgroundColor="#F5F5F5"
                color="#020202"
                value={currentInfo.address}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel color="#F5F5F5">City</FormLabel>
              <Input
                placeholder="city"
                {...register('city')}
                backgroundColor="#F5F5F5"
                color="#020202"
                value={currentInfo.city}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel color="#F5F5F5">State</FormLabel>
              <Input
                placeholder="state"
                {...register('state')}
                backgroundColor="#F5F5F5"
                color="#020202"
                value={currentInfo.state}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel color="#F5F5F5">Zip</FormLabel>
              <Input
                placeholder="zip code"
                {...register('zip')}
                backgroundColor="#F5F5F5"
                color="#020202"
                value={currentInfo.zip}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3}>
              Cancel
            </Button>
            <Button type="submit" variant="outline" size="md" p={5} colorScheme="blue">
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreateEmployeeModal
