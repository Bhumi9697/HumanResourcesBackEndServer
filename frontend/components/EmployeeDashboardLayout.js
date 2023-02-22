import Router, { useRouter } from 'next/router'
import { Auth } from 'aws-amplify'
import cookie from 'js-cookie'
import { Flex, Heading, Text, Icon, Image, Link } from '@chakra-ui/react'
import { FiHome, FiFile, FiLogOut } from 'react-icons/fi'

const EmployeeDashboardLayout = ({ children }) => {
  const router = useRouter()

  return (
    <Flex h={[null, null, '100vh']} maxW="2000px" flexDir={['column', 'column', 'row']} overflow="hidden">
      {/* Column 1 */}
      <Flex
        w={['100%', '100%', '10%', '15%', '15%']}
        flexDir="column"
        alignItems="center"
        backgroundColor="#020202"
        color="#fff">
        <Flex flexDir="column" h={[null, null, '100vh']} justifyContent="space-between">
          <Flex flexDir="column" as="nav" alignItems="center">
            <Heading
              mt={50}
              mb={[25, 50, 100]}
              fontSize={['3xl', '3xl', 'large', 'xl', '3xl']}
              alignSelf="center"
              letterSpacing="tight">
              {cookie.get('company')}
            </Heading>
            <Flex
              flexDir={['row', 'row', 'column', 'column', 'column']}
              align={['center', 'center', 'center', 'flex-start', 'flex-start']}
              wrap={['wrap', 'wrap', 'nowrap', 'nowrap', 'nowrap']}
              justifyContent="center">
              <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]}>
                <Link
                  _focus={{ outline: 'none' }}
                  display={['none', 'none', 'flex', 'flex', 'flex']}
                  href={`/app/employee/${router.query.id}/profile`}>
                  <Icon
                    as={FiHome}
                    fontSize="2xl"
                    color={router.pathname == '/app/employee/[id]/profile' ? 'blue.600' : 'gray'}
                  />
                </Link>
                <Link
                  _hover={{ textDecor: 'none' }}
                  _focus={{ outline: 'none' }}
                  display={['flex', 'flex', 'none', 'flex', 'flex']}
                  href={`/app/employee/${router.query.id}/profile`}>
                  <Text color={router.pathname == '/app/employee/[id]/profile' ? '#fff' : 'gray'}>Home</Text>
                </Link>
              </Flex>
              <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]}>
                <Link
                  _focus={{ outline: 'none' }}
                  display={['none', 'none', 'flex', 'flex', 'flex']}
                  href={`/app/employee/${router.query.id}/documents`}>
                  <Icon
                    as={FiFile}
                    fontSize="2xl"
                    color={router.pathname == '/app/employee/[id]/documents' ? 'blue.600' : 'gray'}
                  />
                </Link>
                <Link
                  _hover={{ textDecor: 'none' }}
                  _focus={{ outline: 'none' }}
                  display={['flex', 'flex', 'none', 'flex', 'flex']}
                  href={`/app/employee/${router.query.id}/documents`}>
                  <Text color={router.pathname == '/app/app/employee/[id]/documents' ? '#fff' : 'gray'}>Documents</Text>
                </Link>
              </Flex>
              <Flex
                className="sidebar-items"
                mr={[2, 6, 0, 0, 0]}
                onClick={() => {
                  Auth.signOut()
                  Router.push({
                    pathname: `/`
                  })
                  cookie.remove('employee-id')
                  cookie.remove('company')
                }}>
                <Link _focus={{ outline: 'none' }} display={['none', 'none', 'flex', 'flex', 'flex']}>
                  <Icon as={FiLogOut} fontSize="2xl" color="gray" />
                </Link>
                <Link
                  _hover={{ textDecor: 'none' }}
                  _focus={{ outline: 'none' }}
                  display={['flex', 'flex', 'none', 'flex', 'flex']}>
                  <Text color="gray">Sign Out</Text>
                </Link>
              </Flex>
            </Flex>
          </Flex>
          <Flex flexDir="column" alignItems="center" mb={10} mt={5}>
            <Text ml="-20%" fontSize="8px" textAlign="center" color="gray">
              powered by
            </Text>
            <Flex mt="-2%" justifyContent="center">
              <Image width="50%" src="https://i.ibb.co/KWZmv9K/realjust-HR-Blue.png" />
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      {/* Column 2 */}
      <Flex w="100%" p="3%" flexDir="column" overflow="auto" minH="100vh" bgColor="gray.100">
        {children}
      </Flex>
    </Flex>
  )
}

export default EmployeeDashboardLayout
