import { useState, useEffect } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import cookie from 'js-cookie'
import { Text, Flex, Heading, useToast } from '@chakra-ui/react'
import { getEmployee } from '@/src/graphql/queries'
import EditEmConPhoneModal from '@/components/EditEmConPhoneModal'
import EditEmConEmailModal from '@/components/EditEmConEmailModal'
import EditEmConRelationModal from '@/components/EditEmConRelationModal'
import EditEmConNameModal from '@/components/EditEmConNameModal'
import EditDobModal from '@/components/EditDobModal'
import EditZipModal from '@/components/EditZipModal'
import EditStateModal from '@/components/EditStateModal'
import EditCityModal from '@/components/EditCityModal'
import EditAddressModal from '@/components/EditAddressModal'
import EditPhoneModal from '@/components/EditPhoneModal'

const EmployeeProfile = ({ idEmployee, isLoading }) => {
  const toast = useToast()
  const [currentEmployee, setCurrentEmployee] = useState()

  useEffect(() => {
    fetchEmployee()
  }, [])

  async function fetchEmployee() {
    try {
      const employee = await API.graphql(graphqlOperation(getEmployee, { id: idEmployee ?? cookie.get('employee-id') }))
      const query = employee.data.getEmployee
      setCurrentEmployee({ ...currentEmployee, query })
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
      {(!currentEmployee || isLoading) && <h1>Loading....</h1>}
      {currentEmployee && (
        <Flex flexDirection="column" color="gray.700">
          <Heading fontWeight="normal" mb={4} letterSpacing="tight">
            Welcome, &nbsp;
            <Flex display="inline-flex" fontWeight="bold">
              {currentEmployee.query.first_name}
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
                    {currentEmployee.query.first_name} {currentEmployee.query.last_name}
                  </Text>
                </Flex>
                <Flex mb={4}>
                  <Text fontWeight="bold" fontSize="md">
                    Email:&nbsp;
                  </Text>
                  <Text fontSize="md">{currentEmployee.query.email}</Text>
                </Flex>
                <Flex mb={4}>
                  <Text fontWeight="bold" fontSize="md">
                    Phone:&nbsp;
                  </Text>
                  <Text fontSize="md">{currentEmployee.query.phone}</Text>
                  <EditPhoneModal
                    currentEmployee={currentEmployee}
                    onEmployeeChange={setCurrentEmployee}
                    info={currentEmployee.query}
                  />
                </Flex>
                <Flex mb={4}>
                  <Text fontWeight="bold" fontSize="md">
                    Company:&nbsp;
                  </Text>
                  <Text fontSize="md">{currentEmployee.query.CompanyOfEmployee.name}</Text>
                </Flex>
                <Flex mb={4}>
                  <Text fontWeight="bold" fontSize="md">
                    Company Location:&nbsp;
                  </Text>
                  <Text fontSize="md">{currentEmployee.query.CompanyOfEmployee.location}</Text>
                </Flex>
                <Flex mb={4}>
                  <Text fontWeight="bold" fontSize="md">
                    Job Title:&nbsp;
                  </Text>
                  <Text fontSize="md">{currentEmployee.query.position}</Text>
                </Flex>
                <Flex mb={4}>
                  <Text fontWeight="bold" fontSize="md">
                    Address:&nbsp;
                  </Text>
                  <Text fontSize="md">{currentEmployee.query.address}</Text>
                  <EditAddressModal
                    currentEmployee={currentEmployee}
                    onEmployeeChange={setCurrentEmployee}
                    info={currentEmployee.query}
                  />
                </Flex>
                <Flex mb={4}>
                  <Text fontWeight="bold" fontSize="md">
                    City:&nbsp;
                  </Text>
                  <Text fontSize="md">{currentEmployee.query.city}</Text>
                  <EditCityModal
                    currentEmployee={currentEmployee}
                    onEmployeeChange={setCurrentEmployee}
                    info={currentEmployee.query}
                  />
                </Flex>
                <Flex mb={4}>
                  <Text fontWeight="bold" fontSize="md">
                    State:&nbsp;
                  </Text>
                  <Text fontSize="md">{currentEmployee.query.state}</Text>
                  <EditStateModal
                    currentEmployee={currentEmployee}
                    onEmployeeChange={setCurrentEmployee}
                    info={currentEmployee.query}
                  />
                </Flex>
                <Flex mb={4}>
                  <Text fontWeight="bold" fontSize="md">
                    Zip:&nbsp;
                  </Text>
                  <Text fontSize="md">{currentEmployee.query.zip}</Text>
                  <EditZipModal
                    currentEmployee={currentEmployee}
                    onEmployeeChange={setCurrentEmployee}
                    info={currentEmployee.query}
                  />
                </Flex>
                <Flex mb={4}>
                  <Text fontWeight="bold" fontSize="md">
                    Date of Birth:&nbsp;
                  </Text>
                  <Text fontSize="md">{currentEmployee.query.birthdate}</Text>
                  <EditDobModal
                    currentEmployee={currentEmployee}
                    onEmployeeChange={setCurrentEmployee}
                    info={currentEmployee.query}
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
                  <Text fontSize="md">{currentEmployee.query.emergency_contact_name}</Text>
                  <EditEmConNameModal
                    currentEmployee={currentEmployee}
                    onEmployeeChange={setCurrentEmployee}
                    info={currentEmployee.query}
                  />
                </Flex>
                <Flex mb={4}>
                  <Text fontWeight="bold" fontSize="md">
                    Relation:&nbsp;
                  </Text>
                  <Text fontSize="md">{currentEmployee.query.emergency_contact_relation}</Text>
                  <EditEmConRelationModal
                    currentEmployee={currentEmployee}
                    onEmployeeChange={setCurrentEmployee}
                    info={currentEmployee.query}
                  />
                </Flex>
                <Flex mb={4}>
                  <Text fontWeight="bold" fontSize="md">
                    Email:&nbsp;
                  </Text>
                  <Text fontSize="md">{currentEmployee.query.emergency_contact_email}</Text>
                  <EditEmConEmailModal
                    currentEmployee={currentEmployee}
                    onEmployeeChange={setCurrentEmployee}
                    info={currentEmployee.query}
                  />
                </Flex>
                <Flex mb={4}>
                  <Text fontWeight="bold" fontSize="md">
                    Phone:&nbsp;
                  </Text>
                  <Text fontSize="md">{currentEmployee.query.emergency_contact_phone}</Text>
                  <EditEmConPhoneModal
                    currentEmployee={currentEmployee}
                    onEmployeeChange={setCurrentEmployee}
                    info={currentEmployee.query}
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

export default EmployeeProfile
