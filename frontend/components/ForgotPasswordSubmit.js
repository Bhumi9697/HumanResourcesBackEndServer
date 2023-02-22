import {
  ChakraProvider,
  Flex,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Text,
  Image,
  Button,
  FormHelperText
} from '@chakra-ui/react'

const ForgotPasswordSubmit = ({ setUiState, onChange, forgotPasswordSubmit }) => (
  <ChakraProvider resetCSS>
    <Flex flexDirection="column" backgroundColor="#0072B9" borderRadius="12px" pl={20} pr={20} pb={14} pt={14}>
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Text fontWeight="bold" fontSize="4xl" color="white">
          Reset Password
        </Text>
        <Image width="30%" src="https://i.ibb.co/ZL2Y202/realjust-HR-white.png" />
      </Flex>
      <FormControl mb={4}>
        <FormLabel color="white" fontWeight="bold">
          Confirmation Code
        </FormLabel>
        <Input backgroundColor="white" onChange={onChange} name="authCode" />
        <FormErrorMessage>Error message</FormErrorMessage>
        <FormHelperText color="white">Enter the code sent to your email address</FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel color="white" fontWeight="bold">
          New Password
        </FormLabel>
        <Input backgroundColor="white" type="password" name="password" onChange={onChange} />
        <FormErrorMessage>Error message</FormErrorMessage>
      </FormControl>
      <Flex justifyContent="flex-end" alignItems="center" mt={6}>
        <Text color="white" mr={6} onClick={() => setUiState('signIn')}>
          Cancel
        </Text>
        <Button
          variant="solid"
          size="md"
          backgroundColor="#F18E26"
          color="white"
          fontWeight="bold"
          p={5}
          onClick={() => forgotPasswordSubmit()}>
          Reset
        </Button>
      </Flex>
    </Flex>
  </ChakraProvider>
)

export default ForgotPasswordSubmit
