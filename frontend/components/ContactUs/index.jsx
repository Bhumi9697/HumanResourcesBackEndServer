import { useState } from 'react'
import {
  Box,
  Flex,
  Image,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Text,
  FormErrorMessage,
  Divider,
  Button,
  Textarea,
  useToast
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { contactUsSchema } from './validator'
import { sendEmail } from '@/src/utils'

const ContactUs = () => {
  const toast = useToast()
  const [submitting, setSubmitting] = useState()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(contactUsSchema),
    defaultValues: {
      email: ''
    }
  })

  const onSubmit = async ({
    email,
    first_name,
    last_name,
    role,
    headquarters,
    location,
    company_name,
    contractors,
    employees,
    comments
  }) => {
    try {
      setSubmitting(true)

      await sendEmail({
        emails: ['jasoncavness@cavnesshr.com'],
        subject: 'Information Request',
        html: `
        <h1>The company: ${company_name} requests your attention</h1>

        I'm <strong>${first_name} ${last_name},</strong> <br />
        My current role is <strong>${role}.</strong> <br /> <br />

        <strong>This is my information:</strong>
        <br/>
        <br/>

        1. What is the headquarters of your company? <br />
        ${headquarters} 
        <br />
        <br />

        2. How many employees are in your company? <br />
        ${employees} 
        <br />
        <br />

        3. How many contractors are in your company? <br />
        ${contractors} 
        <br />
        <br />

        4. Does your company of employees/contractors located in other places besides your company headquarters? <br />
        ${location} 
        <br />
        <br />

        Additional Comments: <br />
        ${comments}
        <br />
        <br />

        Email: ${email}
      `
      })

      toast({
        title: 'Great!',
        description: 'Your information was sent successfully, we will contact you shortly.',
        status: 'success',
        duration: 3000,
        isClosable: true
      })
    } catch (error) {
      toast({
        title: 'Oops!',
        description: 'There was an error sending the email, please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Flex justifyContent="center" alignItems="center" minH="100vh" w="100%" bg="gray.100">
      <Box minW={350} maxW={600} w="100%" boxShadow="lg" rounded="md" overflow="hidden" mx={3} my={5}>
        <Flex flexDirection="column" alignItems="center" bg="blue.500" p={4}>
          <Image width="30%" src="https://i.ibb.co/ZL2Y202/realjust-HR-white.png" />
          <Heading color="white" textAlign="center">
            Contact Us
          </Heading>
        </Flex>
        <Box as="form" onSubmit={onSubmit} p={3} bgColor="white">
          <FormControl mb={4} isInvalid={errors.first_name} isRequired>
            <FormLabel>First Name</FormLabel>
            <Input borderColor="gray.500" {...register('first_name')} />
            <FormErrorMessage>{errors.first_name && errors.first_name.message}</FormErrorMessage>
          </FormControl>
          <FormControl mb={4} isInvalid={errors.last_name} isRequired>
            <FormLabel>Last Name</FormLabel>
            <Input borderColor="gray.500" {...register('last_name')} />
            <FormErrorMessage>{errors.last_name && errors.last_name.message}</FormErrorMessage>
          </FormControl>
          <FormControl mb={4} isInvalid={errors.company_name} isRequired>
            <FormLabel>Company Name</FormLabel>
            <Input borderColor="gray.500" {...register('company_name')} />
            <FormErrorMessage>{errors.company_name && errors.company_name.message}</FormErrorMessage>
          </FormControl>
          <FormControl mb={4} isInvalid={errors.role} isRequired>
            <FormLabel>Role</FormLabel>
            <Input borderColor="gray.500" {...register('role')} />
            <FormErrorMessage>{errors.role && errors.role.message}</FormErrorMessage>
          </FormControl>
          <FormControl mb={4} isInvalid={errors.email} isRequired>
            <FormLabel>Email</FormLabel>
            <Input borderColor="gray.500" {...register('email')} />
            <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
          </FormControl>
          <Divider />
          <Text fontSize="sm" textAlign="center" color="gray.600">
            QUESTIONS
          </Text>
          <Divider />
          <FormControl mb={4} mt={4} isInvalid={errors.headquarters} isRequired>
            <FormLabel>What is the headquarters of your company?</FormLabel>
            <Textarea borderColor="gray.500" {...register('headquarters')} placeholder="Type your answer..." />
            <FormErrorMessage>{errors.headquarters && errors.headquarters.message}</FormErrorMessage>
          </FormControl>
          <FormControl mb={4} isInvalid={errors.employees} isRequired>
            <FormLabel>How many employees are in your company?</FormLabel>
            <Textarea borderColor="gray.500" {...register('employees')} placeholder="Type your answer..." />
            <FormErrorMessage>{errors.employees && errors.employees.message}</FormErrorMessage>
          </FormControl>
          <FormControl mb={4} isInvalid={errors.contractors} isRequired>
            <FormLabel>How many contractors are in your company?</FormLabel>
            <Textarea borderColor="gray.500" {...register('contractors')} placeholder="Type your answer..." />
            <FormErrorMessage>{errors.contractors && errors.contractors.message}</FormErrorMessage>
          </FormControl>
          <FormControl mb={4} isInvalid={errors.location} isRequired>
            <FormLabel>
              Does your company of employees/contractors located in other places besides your company headquarters?
            </FormLabel>
            <Textarea borderColor="gray.500" {...register('location')} placeholder="Type your answer..." />
            <FormErrorMessage>{errors.location && errors.location.message}</FormErrorMessage>
          </FormControl>

          <Divider />
          <Divider />
          <Divider />
          <Divider />

          <FormControl mb={4} mt={4} isInvalid={errors.comments}>
            <FormLabel>Additional Comments</FormLabel>
            <Textarea borderColor="gray.500" {...register('comments')} placeholder="Type your comments..." />
            <FormErrorMessage>{errors.comments && errors.comments.message}</FormErrorMessage>
          </FormControl>
          <Flex justifyContent="flex-end" mt={3}>
            <Button
              w="100%"
              size="md"
              p={5}
              colorScheme="blue"
              onClick={handleSubmit(onSubmit)}
              isLoading={submitting}
              loadingText="Submitting">
              Submit
            </Button>
          </Flex>
        </Box>
      </Box>
    </Flex>
  )
}

export default ContactUs
