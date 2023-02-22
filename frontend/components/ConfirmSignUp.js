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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody
} from '@chakra-ui/react'

const ConfirmSignUp = ({ setUiState, onChange, confirmSignUp }) => (
  <Flex w="100%" p="3%" flexDir="column" overflow="auto" minH="100vh" bgColor="#F5F5F5">
    <Modal isOpen={true}>
      <ModalOverlay />
      <ModalContent backgroundColor="#020202">
        <ModalHeader color="#F5F5F5" fontSize="3xl" fontWeight="normal" textAlign="center">
          Confirm Sign Up
        </ModalHeader>
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel color="white" fontWeight="bold">
              Confirmation Code
            </FormLabel>
            <Input backgroundColor="white" onChange={onChange} name="authCode" />
            <FormErrorMessage>Error message</FormErrorMessage>
            <FormHelperText color="white">Enter the code sent to your email address</FormHelperText>
          </FormControl>
        </ModalBody>

        <ModalFooter mt={6}>
          <Flex justifyContent="space-between" alignItems="center">
            <Image width="30%" src="https://i.ibb.co/ZL2Y202/realjust-HR-white.png" />
            <Flex justifyContent="flex-end" alignItems="center">
              <Text color="white" mr={6} onClick={() => setUiState('signIn')}>
                Cancel
              </Text>
              <Button variant="outline" size="md" p={5} colorScheme="blue" onClick={() => confirmSignUp()}>
                Sign up
              </Button>
            </Flex>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </Flex>
)

export default ConfirmSignUp
