import { useState } from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Heading,
  FormHelperText,
  Flex,
  Select,
  Text,
  Image,
  Button,
  Box,
  Tooltip,
  Grid,
  useToast
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { useForm } from 'react-hook-form'
import signUpSchema from './validator'
import { Auth } from 'aws-amplify'
import { useRouter } from 'next/router'
import { yupResolver } from '@hookform/resolvers/yup'

const SignUp = ({ companyId, role, email }) => {
  const [signingUp, setSigningUp] = useState(false)
  const router = useRouter()
  const toast = useToast()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      company_name: companyId,
      role: (() => {
        if (role === 'emp') return 'employee'
        if (role === 'con') return 'contractor'

        return 'company_rep'
      })(),
      email
    }
  })

  const onSubmit = async ({ email, password, given_name, family_name, company_name, role }) => {
    setSigningUp(true)
    try {
      await Auth.signUp({
        username: email,
        password,
        attributes: {
          email,
          given_name,
          family_name,
          'custom:company_name': company_name,
          'custom:role': role
        }
      })

      toast({
        title: 'Confirmation',
        description: 'A verification email was sent to your email',
        status: 'success',
        duration: 6000,
        isClosable: true
      })
    } catch (err) {
      toast({
        title: 'Sign Up Error',
        description: err?.message || 'An error occurred while signing up',
        status: 'warning',
        duration: 6000,
        isClosable: true
      })
    } finally {
      setSigningUp(false)
    }
  }

  return (
    <Grid placeContent="center" minH="100vh" w="100%" bg="gray.100">
      <Box minW={350} maxW={450} boxShadow="lg" rounded="md" overflow="hidden" mx={3} my={5}>
        <Flex flexDirection="column" alignItems="center" bg="blue.500" p={4}>
          <Image width="30%" src="https://i.ibb.co/ZL2Y202/realjust-HR-white.png" />
          <Heading color="white" textAlign="center">
            Create Account
          </Heading>
        </Flex>
        <Box as="form" onSubmit={onSubmit} p={3} bgColor="white">
          <FormControl mb={4} isInvalid={errors.given_name} isRequired>
            <FormLabel>First Name</FormLabel>
            <Input borderColor="gray.500" {...register('given_name')} />
            <FormErrorMessage>{errors.given_name && errors.given_name.message}</FormErrorMessage>
          </FormControl>
          <FormControl mb={4} isInvalid={errors.given_name} isRequired>
            <FormLabel>Last Name</FormLabel>
            <Input borderColor="gray.500" {...register('family_name')} />
            <FormErrorMessage>{errors.family_name && errors.family_name.message}</FormErrorMessage>
          </FormControl>
          <FormControl mb={4} isInvalid={errors.company_name} isRequired>
            <FormLabel>Company Code</FormLabel>
            <Input borderColor="gray.500" {...register('company_name')} disabled={!!companyId} />
            <FormErrorMessage>{errors.company_name && errors.company_name.message}</FormErrorMessage>
            <Tooltip
              label="Your company code is provided to you when you purchase a plan. If you are an employee/contractor, this should be given to you by your employer. Please contact jason@cavnesshr.com if you lost your code."
              aria-label="A tooltip">
              <FormHelperText _hover={{ cursor: 'pointer', color: 'blue.600' }}>What&apos;s this?</FormHelperText>
            </Tooltip>
          </FormControl>
          <FormControl mb={4} isInvalid={errors.role} isRequired>
            <FormLabel>Role</FormLabel>
            <FormErrorMessage>{errors.role && errors.role.message}</FormErrorMessage>
            <Select borderColor="gray.500" icon={<ChevronDownIcon />} {...register('role')} disabled={!!role} size="md">
              <option value="company_rep">company rep</option>
              <option value="employee">employee</option>
              <option value="contractor">contractor</option>
            </Select>
          </FormControl>
          <FormControl mb={4} isInvalid={errors.email} isRequired>
            <FormLabel>Email</FormLabel>
            <Input borderColor="gray.500" {...register('email')} disabled={!!email} />
            <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
          </FormControl>
          <FormControl mb={4} isInvalid={errors.password} isRequired>
            <FormLabel>Password</FormLabel>
            <Input borderColor="gray.500" type="password" {...register('password')} autoComplete="current-password" />
            <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
            <FormHelperText>
              Must contain at least 8 characters, 1 uppercase letter, 1 number, and 1 special character (@, $, etc.)
            </FormHelperText>
          </FormControl>
          <Text mt={5} textAlign="center">
            Already have an account? &nbsp;
            <span
              onClick={() => router.push('/login')}
              style={{
                textDecoration: 'underline',
                cursor: 'pointer'
              }}>
              Sign in here
            </span>
          </Text>
          <Flex justifyContent="flex-end" mt={3}>
            <Button
              w="100%"
              size="md"
              p={5}
              colorScheme="blue"
              onClick={handleSubmit(onSubmit)}
              isLoading={signingUp}
              loadingText="Signing Up">
              Sign Up
            </Button>
          </Flex>
        </Box>
      </Box>
    </Grid>
  )
}

export default SignUp
