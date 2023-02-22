import Router from 'next/router'
import { Auth } from 'aws-amplify'
import cookie from 'js-cookie'
import {
  Flex,
  Heading,
  Text,
  Icon,
  Image,
  Link,
  Box,
  Menu,
  Button,
  MenuList,
  MenuItem,
  Avatar,
  MenuButton
} from '@chakra-ui/react'
import { FiTool, FiHardDrive, FiUsers, FiLogOut, FiHome, FiFile } from 'react-icons/fi'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useUser } from '@/src/context/AuthContext'

const Layout = ({ children }) => {
  const { user } = useUser()
  const isCompany = user?.attributes['custom:role'] === 'company_rep'
  const isAdmin = user?.signInUserSession?.idToken?.payload['cognito:groups']?.includes('Admins')
  const router = useRouter()
  const userName = `${user?.attributes?.given_name} ${user?.attributes?.family_name}`
  const hasCompanyRights = user?.attributes['custom:role'] === 'company_rep'
  return (
    <Flex h={[null, null, '100vh']} maxW="2000px" flexDir={['column', 'column', 'row']} overflow="hidden">
      {/* Column 1 */}
      <Flex w={['100%', '100%', '300px']} flexDir="column" alignItems="center" backgroundColor="gray.800" color="#fff">
        <Flex flexDir="column" h={[null, null, '100vh']} justifyContent="space-between">
          <Flex flexDir="column" as="nav" alignItems="center">
            <Heading
              mt={50}
              mb={[25, 50, 100]}
              fontSize={['3xl', '3xl', 'large', 'xl', '3xl']}
              alignSelf="center"
              letterSpacing="tight">
              {isAdmin ? 'Admin' : 'Profile'}
            </Heading>
            <Flex
              flexDir={['row', 'row', 'column', 'column', 'column']}
              align={['center', 'center', 'center', 'flex-start', 'flex-start']}
              wrap={['wrap', 'wrap', 'nowrap', 'nowrap', 'nowrap']}
              justifyContent="center">
              <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]}>
                <NextLink href={'/app'} passHref>
                  <Link
                    _focus={{ outline: 'none' }}
                    _hover={{ textDecor: 'none' }}
                    display={['flex', 'flex', 'none', 'flex', 'flex']}>
                    <Icon as={FiHome} fontSize="2xl" color={router.pathname === '/app' ? 'blue.600' : 'gray'} />
                    <Text color={router.pathname === '/app' ? 'white' : 'gray'}>Home</Text>
                  </Link>
                </NextLink>
              </Flex>
              {isAdmin && (
                <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]}>
                  <NextLink href={'/app/companies'} passHref>
                    <Link
                      _focus={{ outline: 'none' }}
                      _hover={{ textDecor: 'none' }}
                      display={['flex', 'flex', 'none', 'flex', 'flex']}>
                      <Icon
                        as={FiUsers}
                        fontSize="2xl"
                        color={router.pathname === '/app/companies' ? 'blue.600' : 'gray'}
                      />
                      <Text color={router.pathname === '/app/companies' ? 'white' : 'gray'}>Companies</Text>
                    </Link>
                  </NextLink>
                </Flex>
              )}

              {!isAdmin && (
                <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]}>
                  <NextLink href={'/app/documents'} passHref>
                    <Link
                      _focus={{ outline: 'none' }}
                      _hover={{ textDecor: 'none' }}
                      display={['flex', 'flex', 'none', 'flex', 'flex']}>
                      <Icon
                        as={FiUsers}
                        fontSize="2xl"
                        color={router.pathname === '/app/documents' ? 'blue.600' : 'gray'}
                      />
                      <Text color={router.pathname === '/app/documents' ? 'white' : 'gray'}>Documents</Text>
                    </Link>
                  </NextLink>
                </Flex>
              )}

              {isCompany && (
                <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]}>
                  <NextLink href={'/app/file-explorer'} passHref>
                    <Link
                      _focus={{ outline: 'none' }}
                      _hover={{ textDecor: 'none' }}
                      display={['flex', 'flex', 'none', 'flex', 'flex']}>
                      <Icon
                        as={FiFile}
                        fontSize="2xl"
                        color={router.pathname === '/app/file-explorer' ? 'blue.600' : 'gray'}
                      />
                      <Text color={router.pathname === '/app/file-explorer' ? 'white' : 'gray'}>File Explorer</Text>
                    </Link>
                  </NextLink>
                </Flex>
              )}
              {isAdmin && (
                <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]}>
                  <Link
                    _focus={{ outline: 'none' }}
                    display={['none', 'none', 'flex', 'flex', 'flex']}
                    href="https://us-east-2.admin.amplifyapp.com/admin/d1qe25m4mtrzg8/staging/home"
                    isExternal>
                    <Icon as={FiTool} fontSize="2xl" color="gray" />
                  </Link>
                  <Link
                    _focus={{ outline: 'none' }}
                    _hover={{ textDecor: 'none' }}
                    display={['flex', 'flex', 'none', 'flex', 'flex']}
                    href="https://us-east-2.admin.amplifyapp.com/admin/d1qe25m4mtrzg8/staging/home"
                    isExternal>
                    <Text color="gray">Admin UI</Text>
                  </Link>
                </Flex>
              )}
              {isAdmin && (
                <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]}>
                  <Link
                    _focus={{ outline: 'none' }}
                    display={['none', 'none', 'flex', 'flex', 'flex']}
                    href="https://us-east-2.console.aws.amazon.com/amplify/home?region=us-east-2#/d1qe25m4mtrzg8"
                    isExternal>
                    <Icon as={FiHardDrive} fontSize="2xl" color="gray" />
                  </Link>
                  <Link
                    _focus={{ outline: 'none' }}
                    _hover={{ textDecor: 'none' }}
                    display={['flex', 'flex', 'none', 'flex', 'flex']}
                    href="https://us-east-2.console.aws.amazon.com/amplify/home?region=us-east-2#/d1qe25m4mtrzg8"
                    isExternal>
                    <Text color="gray">Amplify</Text>
                  </Link>
                </Flex>
              )}
              <Flex
                className="sidebar-items"
                mr={[2, 6, 0, 0, 0]}
                onClick={() => {
                  Auth.signOut()
                  Router.push({
                    pathname: `/`
                  })
                  cookie.remove('company-id')
                  cookie.remove('company')
                  cookie.remove('employee-id')
                }}>
                <Link _focus={{ outline: 'none' }} display={['none', 'none', 'flex', 'flex', 'flex']}>
                  <Icon as={FiLogOut} fontSize="2xl" color="gray" />
                </Link>
                <Link
                  _focus={{ outline: 'none' }}
                  _hover={{ textDecor: 'none' }}
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
      <Flex w="100%" flexDir="column" overflow="auto" minH="100vh" bgColor="gray.100">
        <Box bg="blue.100" px={4} py={2} boxShadow="md">
          <Flex alignItems={'center'} justifyContent="flex-end">
            <Menu>
              <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
                <Avatar size="sm" bgColor="hsl(220deg 47% 36%)" color="white" name={userName} />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => router.push('/app/settings')}>Settings</MenuItem>
                {hasCompanyRights && (
                  <MenuItem onClick={() => router.push('/app/company-settings')}>Company Settings</MenuItem>
                )}
              </MenuList>
            </Menu>
          </Flex>
        </Box>
        <Box p={7} pt={4}>
          {children}
        </Box>
      </Flex>
    </Flex>
  )
}

export default Layout
