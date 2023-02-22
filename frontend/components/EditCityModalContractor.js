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
import { updateContractor } from '@/src/graphql/mutations'

const EditCityModalContractor = ({ currentContractor, onContractorChange, info }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = useRef()
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm()
  const toast = useToast()

  async function editCity({ City }) {
    try {
      const ContractorDetails = {
        id: info.id,
        _version: info._version,
        city: City
      }

      const updatedContractor = await API.graphql({
        query: updateContractor,
        variables: { input: ContractorDetails }
      })

      const query = updatedContractor.data.updateContractor
      onContractorChange({ ...currentContractor, query })

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
        <ModalContent as="form" onSubmit={handleSubmit(editCity)} backgroundColor="#020202">
          <ModalHeader color="#F5F5F5" fontSize="2xl" fontWeight="normal" textAlign="center">
            Edit City
          </ModalHeader>
          <ModalCloseButton color="#F5F5F5" />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel color="#F5F5F5" ref={initialRef}>
                City
              </FormLabel>
              <Input
                placeholder={info.city}
                {...register('City', { required: true })}
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

export default EditCityModalContractor
