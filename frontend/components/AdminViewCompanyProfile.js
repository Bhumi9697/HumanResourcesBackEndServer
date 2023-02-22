import { useState, useEffect } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { ButtonGroup, Button, Text, Flex, Heading, Icon, Tooltip, Link, useToast } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { FiInfo } from 'react-icons/fi'
import { getCompany } from '@/src/graphql/queries'
import EmployeeTable from '@/components/EmployeeTable'
import NextLink from 'next/link'
import ContractorTable from './ContractorTable'

const CompanyProfile = ({ companyID }) => {
  const toast = useToast()
  const [currentCompany, setCurrentCompany] = useState()
  const [activeTab, setActiveTab] = useState('employees')

  useEffect(() => {
    fetchCompany()
  }, [])

  async function fetchCompany() {
    try {
      const company = await API.graphql(graphqlOperation(getCompany, { id: companyID }))
      setCurrentCompany(company.data.getCompany)
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
      {!currentCompany && <h1>Loading....</h1>}

      {currentCompany && (
        <Flex flexDirection="column">
          <Flex justifyContent="space-between" alignItems="center" mb={4}>
            <Heading fontWeight="normal" letterSpacing="tight" color="gray.700" size="lg">
              Company Information
            </Heading>
          </Flex>
          <Flex
            flexDirection={{ base: 'column', md: 'row' }}
            justifyContent="space-between"
            boxShadow="md"
            rounded="md"
            p={4}
            bgColor="white"
            style={{ gap: '20px' }}>
            <Flex flexDirection="column" width={['100%', '50%']}>
              <Flex mb={4}>
                <Text fontWeight="bold" fontSize="md">
                  Name:&nbsp;
                </Text>
                <Text fontSize="md">{currentCompany.name}</Text>
              </Flex>
              <Flex mb={4}>
                <Text fontWeight="bold" fontSize="md">
                  Code:&nbsp;
                </Text>
                <Flex alignItems="center">
                  <Text fontSize="md" mr={2}>
                    {currentCompany.id}
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
                <Text fontSize="md">{currentCompany.location}</Text>
              </Flex>
              <Flex mb={4}>
                <Text fontWeight="bold" fontSize="md">
                  Employee Count:&nbsp;
                </Text>
                <Text fontSize="md">{currentCompany.Employees.items.filter((e) => !e._deleted).length}</Text>
              </Flex>
              <Flex mb={4}>
                <Text fontWeight="bold" fontSize="md">
                  Contractor Count:&nbsp;
                </Text>
                <Text fontSize="md">{currentCompany.Contractors.items.filter((e) => !e._deleted).length}</Text>
              </Flex>
              <Flex>
                <Text fontWeight="bold" fontSize="md">
                  Google Drive:&nbsp;
                </Text>
                <Link href={currentCompany.google_drive} isExternal color="blue.600" _hover={{ cursor: 'pointer' }}>
                  View <ExternalLinkIcon mx="2px" />
                </Link>
              </Flex>
            </Flex>

            <Flex flexDirection="column" width={['100%', '50%']}>
              {/* <Flex mb={4}>
                <Text fontWeight="bold" fontSize="md">
                  Employee Handbook:&nbsp;
                </Text>
                <Link
                  href={currentCompany.employee_handbook}
                  isExternal
                  color="blue.600"
                  _hover={{ cursor: 'pointer' }}>
                  View <ExternalLinkIcon mx="2px" />
                </Link>
              </Flex>
              <Flex mb={4}>
                <Text fontWeight="bold" fontSize="md">
                  HR Policies:&nbsp;
                </Text>
                <Link href={currentCompany.hr_policies} isExternal color="blue.600" _hover={{ cursor: 'pointer' }}>
                  View <ExternalLinkIcon mx="2px" />
                </Link>
              </Flex>
              <Flex mb={4}>
                <Text fontWeight="bold" fontSize="md">
                  Employee Handbook/HR Policy Questions:&nbsp;
                </Text>
                <Link
                  href={currentCompany.employee_handbook_questions}
                  isExternal
                  color="blue.600"
                  _hover={{ cursor: 'pointer' }}>
                  View <ExternalLinkIcon mx="2px" />
                </Link>
              </Flex>
              <Flex mb={4}>
                <Text fontWeight="bold" fontSize="md">
                  HR Laws:&nbsp;
                </Text>
                <Link href={currentCompany.laws} isExternal color="blue.600" _hover={{ cursor: 'pointer' }}>
                  View <ExternalLinkIcon mx="2px" />
                </Link>
              </Flex>
              <Flex mb={4}>
                <Text fontWeight="bold" fontSize="md">
                  Labor Posters:&nbsp;
                </Text>
                <Link href={currentCompany.labor_posters} isExternal color="blue.600" _hover={{ cursor: 'pointer' }}>
                  View <ExternalLinkIcon mx="2px" />
                </Link>
              </Flex> */}
              <Flex>
                <Text fontWeight="bold" fontSize="md">
                  File Explorer:&nbsp;
                </Text>
                <NextLink href={`/app/companies/${companyID}/documents`}>
                  <Link color="blue.600" _hover={{ cursor: 'pointer' }}>
                    Go <ExternalLinkIcon mx="2px" />
                  </Link>
                </NextLink>
              </Flex>
            </Flex>
          </Flex>
          <Flex flexDirection="column" mt={3}>
            <ButtonGroup isAttached variant="outline" mb={4}>
              <Button
                mr="-px"
                bgColor={activeTab === 'employees' ? 'gray.700' : 'initial'}
                color={activeTab === 'employees' ? 'white' : 'initial'}
                _hover={{ bgColor: activeTab === 'employees' ? 'gray.600' : 'initial' }}
                _active={{ bgColor: activeTab === 'employees' ? 'gray.600' : 'initial' }}
                onClick={() => setActiveTab('employees')}>
                Employees
              </Button>
              <Button
                mr="-px"
                bgColor={activeTab === 'contractors' ? 'gray.700' : 'initial'}
                color={activeTab === 'contractors' ? 'white' : 'gray.700'}
                _hover={{ bgColor: activeTab === 'contractors' ? 'gray.600' : 'initial' }}
                _active={{ bgColor: activeTab === 'contractors' ? 'gray.600' : 'initial' }}
                onClick={() => setActiveTab('contractors')}>
                Contractors
              </Button>
            </ButtonGroup>
            {activeTab === 'employees' && (
              <EmployeeTable
                shouldShowTitle={false}
                employees={currentCompany?.Employees?.items.filter((e) => !e._deleted) || []}
              />
            )}
            {activeTab === 'contractors' && (
              <ContractorTable
                shouldShowTitle={false}
                contractors={currentCompany?.Contractors?.items.filter((c) => !c._deleted) || []}
              />
            )}
          </Flex>
        </Flex>
      )}
    </>
  )
}

export default CompanyProfile
