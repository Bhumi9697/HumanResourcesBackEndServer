import { useEffect, useState, useRef } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { useForm } from 'react-hook-form'
import cookie from 'js-cookie'
import {
  Button,
  Text,
  Flex,
  Heading,
  Icon,
  Tooltip,
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
  useToast
} from '@chakra-ui/react'
import { FiInfo } from 'react-icons/fi'
import { getCompany } from '@/src/graphql/queries'
import { updateCompany } from '@/src/graphql/mutations'

const CompanyProfile = ({ currentUser }) => {
  const [currentCompany, setCurrentCompany] = useState()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = useRef()
  const {
    handleSubmit,
    register,
    // formState: { errors },
    reset
  } = useForm()
  const toast = useToast()

  async function editCompanyLocation({ newLocation }) {
    try {
      const companyDetails = {
        id: cookie.get('company-id'),
        location: newLocation,
        _version: currentCompany.query._version
      }

      const updatedCompany = await API.graphql({
        query: updateCompany,
        variables: { input: companyDetails }
      })

      const query = updatedCompany.data.updateCompany
      setCurrentCompany({ ...currentCompany, query })

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
        description: 'There was an error updating the company, please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    }
  }

  useEffect(() => {
    fetchCompany()
  }, [])

  async function fetchCompany() {
    try {
      const company = await API.graphql(graphqlOperation(getCompany, { id: cookie.get('company-id') }))
      const query = company.data.getCompany
      setCurrentCompany({ ...currentCompany, query })
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
      {!currentCompany ? (
        <h1>Loading....</h1>
      ) : (
        <Flex flexDirection="column">
          <Heading fontWeight="normal" mb={4} letterSpacing="tight">
            Welcome,{' '}
            <Flex display="inline-flex" fontWeight="bold">
              {currentUser}
            </Flex>
          </Heading>
          <Text ml={4}>Please make sure your company information is up to date.</Text>
          <Text ml={4} mt={2}>
            You can add employees/contractors from the tabs on the left.
          </Text>
          <Text ml={4} mt={2}>
            If you need anything please reach out through the chat icon on the bottom right and we&apos;ll get back to
            you shortly.
          </Text>
          <Flex justifyContent="space-between" alignItems="center" mt={8} mb={4}>
            <Heading fontWeight="normal" letterSpacing="tight">
              My Company
            </Heading>
            <>
              <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent as="form" onSubmit={handleSubmit(editCompanyLocation)} backgroundColor="#020202">
                  <ModalHeader color="#F5F5F5" fontSize="2xl" fontWeight="normal" textAlign="center">
                    Edit Company Location
                  </ModalHeader>
                  <ModalCloseButton color="#F5F5F5" />
                  <ModalBody pb={6}>
                    <FormControl mt={4}>
                      <FormLabel color="#F5F5F5">Location</FormLabel>
                      <Input
                        placeholder="city, state"
                        {...register('newLocation')}
                        backgroundColor="#F5F5F5"
                        color="#020202"
                      />
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
          </Flex>
          <Flex ml={4} flexDirection="column">
            <Flex mb={4}>
              <Text fontWeight="bold" fontSize="md">
                Name:&nbsp;
              </Text>
              <Text fontSize="md">{currentCompany.query.name}</Text>
            </Flex>
            <Flex mb={4}>
              <Text fontWeight="bold" fontSize="md">
                Code:&nbsp;
              </Text>
              <Flex alignItems="center">
                <Text fontSize="md" mr={2}>
                  {currentCompany.query.id}
                </Text>
                <Tooltip label="This unique code is needed for new employees/contractors to sign up for an account.">
                  <span>
                    <Icon as={FiInfo} />
                  </span>
                </Tooltip>
              </Flex>
            </Flex>
            <Flex mb={4}>
              <Text fontWeight="bold" fontSize="md">
                Location:&nbsp;
              </Text>
              <Text fontSize="md">{currentCompany.query.location}</Text>
              <Text ml={4} textDecoration="underline" _hover={{ cursor: 'pointer' }} color="blue.600" onClick={onOpen}>
                edit
              </Text>
            </Flex>
            <Flex mb={4}>
              <Text fontWeight="bold" fontSize="md">
                Employee Count:&nbsp;
              </Text>
              <Text fontSize="md">{currentCompany.query.Employees.items.filter((e) => !e._deleted).length}</Text>
            </Flex>
            <Flex mb={4}>
              <Text fontWeight="bold" fontSize="md">
                Contractor Count:&nbsp;
              </Text>
              <Text fontSize="md">{currentCompany.query.Contractors.items.length}</Text>
            </Flex>
          </Flex>
        </Flex>
      )}
    </>
  )
}

export default CompanyProfile
