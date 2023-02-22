import { useState, useEffect } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import cookie from 'js-cookie'
import { Text, Flex, Heading, useToast } from '@chakra-ui/react'
import { getContractor } from '@/src/graphql/queries'
import EditEmConPhoneModalContractor from '@/components/EditEmConPhoneModalContractor'
import EditEmConEmailModalContractor from '@/components/EditEmConEmailModalContractor'
import EditEmConRelationModalContractor from '@/components/EditEmConRelationModalContractor'
import EditEmConNameModalContractor from '@/components/EditEmConNameModalContractor'
import EditDobModalContractor from '@/components/EditDobModalContractor'
import EditZipModalContractor from '@/components/EditZipModalContractor'
import EditStateModalContractor from '@/components/EditStateModalContractor'
import EditCityModalContractor from '@/components/EditCityModalContractor'
import EditAddressModalContractor from '@/components/EditAddressModalContractor'
import EditPhoneModalContractor from '@/components/EditPhoneModalContractor'

const ContractorProfile = ({ idContractor, isLoading }) => {
  const toast = useToast()
  const [currentContractor, setCurrentContractor] = useState()

  useEffect(() => {
    fetchContractor()
  }, [])

  async function fetchContractor() {
    try {
      const contractor = await API.graphql(
        graphqlOperation(getContractor, { id: idContractor ?? cookie.get('contractor-id') })
      )
      const query = contractor.data.getContractor
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
      {(!currentContractor || isLoading) && <h1>Loading....</h1>}
      {currentContractor && (
        <Flex flexDirection="column" color="gray.700">
          <Heading fontWeight="normal" mb={4} letterSpacing="tight">
            Welcome, &nbsp;
            <Flex display="inline-flex" fontWeight="bold">
              {currentContractor.query.first_name}
            </Flex>
          </Heading>
          <Text>
            Please make sure your profile is up to date and that you have signed and uploaded all required documents.
          </Text>
          <Text>
            If you have any questions please reach out through the chat icon on the bottom right and we will get back to
            you shortly.
          </Text>
          <Flex
            flexDirection={{ base: 'column', md: 'row' }}
            mt={4}
            justifyContent="space-between"
            style={{ gap: '20px' }}>
            <Flex flexDirection="column" width={{ base: 'auto', md: '50%' }}>
              <Flex justifyContent="space-between" alignItems="center" mt={4} mb={4}>
                <Heading size="lg" as="h3" fontWeight="normal" mb={2} letterSpacing="tight">
                  My Profile
                </Heading>
                {/* <EmployeeEditProfileModal currentInfo={currentEmployee.query} /> */}
              </Flex>
              <Flex flexDirection="column" p={4} boxShadow="md" bgColor="white" rounded="md">
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
                </Flex>
                <Flex mb={4}>
                  <Text fontWeight="bold" fontSize="md">
                    Phone:&nbsp;
                  </Text>
                  <Text fontSize="md">{currentContractor.query.phone}</Text>
                  <EditPhoneModalContractor
                    currentContractor={currentContractor}
                    onContractorChange={setCurrentContractor}
                    info={currentContractor.query}
                  />
                </Flex>
                <Flex mb={4}>
                  <Text fontWeight="bold" fontSize="md">
                    Company:&nbsp;
                  </Text>
                  <Text fontSize="md">{currentContractor.query.CompanyOfContractor.name}</Text>
                </Flex>
                <Flex mb={4}>
                  <Text fontWeight="bold" fontSize="md">
                    Company Location:&nbsp;
                  </Text>
                  <Text fontSize="md">{currentContractor.query.CompanyOfContractor.location}</Text>
                </Flex>
                <Flex mb={4}>
                  <Text fontWeight="bold" fontSize="md">
                    Job Title:&nbsp;
                  </Text>
                  <Text fontSize="md">{currentContractor.query.position}</Text>
                </Flex>
                <Flex mb={4}>
                  <Text fontWeight="bold" fontSize="md">
                    Address:&nbsp;
                  </Text>
                  <Text fontSize="md">{currentContractor.query.address}</Text>
                  <EditAddressModalContractor
                    currentContractor={currentContractor}
                    onContractorChange={setCurrentContractor}
                    info={currentContractor.query}
                  />
                </Flex>
                <Flex mb={4}>
                  <Text fontWeight="bold" fontSize="md">
                    City:&nbsp;
                  </Text>
                  <Text fontSize="md">{currentContractor.query.city}</Text>
                  <EditCityModalContractor
                    currentContractor={currentContractor}
                    onContractorChange={setCurrentContractor}
                    info={currentContractor.query}
                  />
                </Flex>
                <Flex mb={4}>
                  <Text fontWeight="bold" fontSize="md">
                    State:&nbsp;
                  </Text>
                  <Text fontSize="md">{currentContractor.query.state}</Text>
                  <EditStateModalContractor
                    currentContractor={currentContractor}
                    onContractorChange={setCurrentContractor}
                    info={currentContractor.query}
                  />
                </Flex>
                <Flex mb={4}>
                  <Text fontWeight="bold" fontSize="md">
                    Zip:&nbsp;
                  </Text>
                  <Text fontSize="md">{currentContractor.query.zip}</Text>
                  <EditZipModalContractor
                    currentContractor={currentContractor}
                    onContractorChange={setCurrentContractor}
                    info={currentContractor.query}
                  />
                </Flex>
                <Flex mb={4}>
                  <Text fontWeight="bold" fontSize="md">
                    Date of Birth:&nbsp;
                  </Text>
                  <Text fontSize="md">{currentContractor.query.birthdate}</Text>
                  <EditDobModalContractor
                    currentContractor={currentContractor}
                    onContractorChange={setCurrentContractor}
                    info={currentContractor.query}
                  />
                </Flex>
              </Flex>
            </Flex>
            <Flex flexDirection="column" width={{ base: 'auto', md: '50%' }}>
              <Flex justifyContent="space-between" alignItems="center" mt={4} mb={4}>
                <Heading size="lg" as="h3" fontWeight="normal" mb={2} letterSpacing="tight">
                  Emergency Contact
                </Heading>
              </Flex>
              <Flex flexDirection="column" p={4} boxShadow="md" bgColor="white" rounded="md">
                <Flex mb={4}>
                  <Text fontWeight="bold" fontSize="md">
                    Name:&nbsp;
                  </Text>
                  <Text fontSize="md">{currentContractor.query.emergency_contact_name}</Text>
                  <EditEmConNameModalContractor
                    currentContractor={currentContractor}
                    onContractorChange={setCurrentContractor}
                    info={currentContractor.query}
                  />
                </Flex>
                <Flex mb={4}>
                  <Text fontWeight="bold" fontSize="md">
                    Relation:&nbsp;
                  </Text>
                  <Text fontSize="md">{currentContractor.query.emergency_contact_relation}</Text>
                  <EditEmConRelationModalContractor
                    currentContractor={currentContractor}
                    onContractorChange={setCurrentContractor}
                    info={currentContractor.query}
                  />
                </Flex>
                <Flex mb={4}>
                  <Text fontWeight="bold" fontSize="md">
                    Email:&nbsp;
                  </Text>
                  <Text fontSize="md">{currentContractor.query.emergency_contact_email}</Text>
                  <EditEmConEmailModalContractor
                    currentContractor={currentContractor}
                    onContractorChange={setCurrentContractor}
                    info={currentContractor.query}
                  />
                </Flex>
                <Flex mb={4}>
                  <Text fontWeight="bold" fontSize="md">
                    Phone:&nbsp;
                  </Text>
                  <Text fontSize="md">{currentContractor.query.emergency_contact_phone}</Text>
                  <EditEmConPhoneModalContractor
                    currentContractor={currentContractor}
                    onContractorChange={setCurrentContractor}
                    info={currentContractor.query}
                  />
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      )}
    </>
  )
}

export default ContractorProfile
