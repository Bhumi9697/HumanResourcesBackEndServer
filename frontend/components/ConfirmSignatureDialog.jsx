import { useRef } from 'react'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogBody,
  AlertDialogOverlay,
  AlertDialogHeader,
  Button,
  AlertDialogFooter
} from '@chakra-ui/react'

const ConfirmSignatureDialog = ({ isOpen, handleCLose, handleMainAction, isSigning }) => {
  const cancelRef = useRef()

  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={handleCLose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Sign Document
          </AlertDialogHeader>
          <AlertDialogBody>
            By clicking this signature-button you are using your signature attached to your profile and signing all
            applicable parts of this document. Please ensure that you understand and agree with all signature portion of
            this document before signing.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={handleCLose}>
              Cancel
            </Button>
            <Button isLoading={isSigning} colorScheme="red" onClick={handleMainAction} ml={3}>
              Sign
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}

export default ConfirmSignatureDialog
