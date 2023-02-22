import { UIStates } from '@/src/constants'
import { useRouter } from 'next/router'
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Text,
  Image,
  Button,
  FormHelperText,
  Grid,
  Box,
  Heading
} from '@chakra-ui/react'

const SignIn = ({ setUiState, onChange, signIn, shouldChangePW = false, signingIn }) => {
  const router = useRouter()

  return (
    <Grid placeContent="center" minH="100vh" w="100%" bg="gray.100">
      <Box minW={350} maxW={450} boxShadow="lg" rounded="md" overflow="hidden" mx={3} my={5}>
        <Flex flexDirection="column" alignItems="center" bg="blue.500" p={4}>
          <Image width="30%" src="https://i.ibb.co/ZL2Y202/realjust-HR-white.png" />
          <Heading color="white" textAlign="center">
            Sign In
          </Heading>
        </Flex>
        <Box p={3} bgColor="white">
          <FormControl mb={4}>
            <FormLabel>Email</FormLabel>
            <Input borderColor="gray.500" onChange={onChange} name="email" />
            <FormErrorMessage>Error message</FormErrorMessage>
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Password</FormLabel>
            <Input borderColor="gray.500" type="password" name="password" onChange={onChange} />
            <FormErrorMessage>Error message</FormErrorMessage>
            <FormHelperText
              onClick={() => setUiState({ type: UIStates.FORGOT_PASSWORD, message: '' })}
              _hover={{ cursor: 'pointer', color: 'blue.600' }}>
              Forgot your password?
            </FormHelperText>
          </FormControl>
          {shouldChangePW && (
            <FormControl mb={4}>
              <FormLabel>New Password</FormLabel>
              <Input borderColor="gray.500" type="password" name="newPassword" onChange={onChange} />
            </FormControl>
          )}

          <Text mt={5} textAlign="center">
            Don&apos;t have an account? &nbsp;
            <span
              onClick={() => router.push('/signup')}
              style={{
                textDecoration: 'underline',
                cursor: 'pointer'
              }}>
              Sign up here
            </span>
          </Text>
          <Flex justifyContent="flex-end" mt={3}>
            <Button
              w="100%"
              size="md"
              p={5}
              colorScheme="blue"
              onClick={signIn}
              isLoading={signingIn}
              loadingText="Signing In">
              Sign In
            </Button>
          </Flex>
        </Box>
      </Box>
    </Grid>
  )
}

export default SignIn
