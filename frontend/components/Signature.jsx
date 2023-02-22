import { useRef, useState, useEffect } from 'react'
import { Grid, Box, Button, useToast, Text } from '@chakra-ui/react'
import SignaturePad from 'react-signature-pad-wrapper'
import { Storage, API, graphqlOperation } from 'aws-amplify'
import { createDocument, updateEmployee, updateContractor } from '@/src/graphql/mutations'
import { getEmployee, getContractor } from '@/src/graphql/queries'
import { useUser } from '@/src/context/AuthContext'
import cookie from 'js-cookie'

const Signature = () => {
  const [shouldCreateSignature, setShouldCreateSignature] = useState(false)
  const itemFetched = useRef()
  const toast = useToast()
  const [isSavingSignature, setIsSavingSignature] = useState(false)
  const signaturePadRef = useRef(null)
  const isEmployee = useRef(false)
  const profileID = useRef()
  const { user } = useUser()

  useEffect(() => {
    signaturePadRef.current.clear()
  }, [])

  useEffect(() => {
    if (!user) return
    ;(async () => {
      isEmployee.current = user.attributes['custom:role'] === 'employee'
      try {
        profileID.current = isEmployee.current ? cookie.get('employee-id') : cookie.get('contractor-id')
        const itemRetrieved = await API.graphql(
          graphqlOperation(isEmployee.current ? getEmployee : getContractor, { id: profileID.current })
        )

        itemFetched.current = itemRetrieved.data[isEmployee.current ? 'getEmployee' : 'getContractor']
        setShouldCreateSignature(!itemFetched.current.hasSignature)
      } catch (error) {
        toast({ title: 'Oops', description: 'An error occurred while retrieving the user data', status: 'error' })
      }
    })()
  }, [user])

  const handleSave = async () => {
    if (!user?.attributes['custom:company_name']) return

    if (signaturePadRef.current.isEmpty()) {
      toast({
        title: 'Oops!',
        description: "You don't have drawed your signature yet.",
        status: 'error',
        duration: 3000
      })
      return
    }

    try {
      setIsSavingSignature(true)
      const image = signaturePadRef.current.toDataURL()
      const blobFile = await fetch(image).then((it) => it.blob())
      const file = new File([blobFile], 'signature', { type: 'image/png' })
      const fileStoredOnS3 = await Storage.put(
        `${isEmployee.current ? 'employees' : 'contractors'}/${profileID.current}/signature`,
        file,
        {
          contentType: 'image/png'
        }
      )

      if (shouldCreateSignature) {
        await API.graphql({
          query: createDocument,
          variables: {
            input: {
              [isEmployee.current ? 'employeeID' : 'contractorID']: profileID.current,
              url: fileStoredOnS3.key,
              isSigned: false,
              fileName: 'signature'
            }
          }
        })
      }

      await API.graphql({
        query: isEmployee.current ? updateEmployee : updateContractor,
        variables: {
          input: {
            id: profileID.current,
            hasSignature: true,
            _version: itemFetched.current._version || 1
          }
        }
      })

      toast({
        title: 'Awesome!',
        description: `Signature ${shouldCreateSignature ? 'saved' : 'updated'} successfully`,
        status: 'success',
        duration: 3000
      })
    } catch (error) {
      toast({
        title: 'Oops!',
        description: 'There was an error while trying to save your signature, please try again.',
        status: 'error',
        duration: 3000
      })
    } finally {
      setIsSavingSignature(false)
    }
  }

  return (
    <>
      {!shouldCreateSignature && (
        <Text textAlign="center" mb={2} color="gray.600">
          You already created your signature, if you update the current signature the previous one will be replaced.
        </Text>
      )}
      <Grid placeContent="center">
        <Box>
          <SignaturePad
            redrawOnResize
            ref={signaturePadRef}
            options={{
              penColor: 'rgb(2, 21, 51)',
              backgroundColor: 'rgb(255, 255, 255)'
            }}
            canvasProps={{
              style: {
                border: '1px solid #000',
                boxShadow:
                  '0px 1px 0px rgba(17,17,26,0.1), 0px 8px 24px rgba(17,17,26,0.1), 0px 16px 48px rgba(17,17,26,0.1)'
              }
            }}
          />
          <Box mt={3}>
            <Button
              isLoading={isSavingSignature}
              loadingText={shouldCreateSignature ? 'Saving' : 'Updating'}
              colorScheme="facebook"
              onClick={handleSave}
              float="right">
              {shouldCreateSignature ? <>Save</> : <>Update</>}
            </Button>
          </Box>
        </Box>
      </Grid>
    </>
  )
}

export default Signature
