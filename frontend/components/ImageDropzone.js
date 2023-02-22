import { useEffect, useState, useMemo } from 'react'
import { Storage, API } from 'aws-amplify'
import { useDropzone } from 'react-dropzone'
import { Button, Flex, useToast } from '@chakra-ui/react'
import Image from 'next/image'
import { createDocument } from '@/src/graphql/mutations'

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
}

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 200,
  height: 200,
  padding: 4,
  boxSizing: 'border-box'
}

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
}

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#020202',
  borderStyle: 'dashed',
  backgroundColor: '#EEF8FF',
  color: '#020202',
  outline: 'none',
  transition: 'border .24s ease-in-out'
}

const activeStyle = {
  borderColor: '#2196f3'
}

const acceptStyle = {
  borderColor: '#00e676'
}

const rejectStyle = {
  borderColor: '#ff1744'
}

export default function ImageDropzone({
  employeeId,
  employeeVersion,
  uniqUrlHandler,
  addDocHandler,
  listName = 'A',
  isEmployee
}) {
  const toast = useToast()
  const [files, setFiles] = useState([])
  const [status, setStatus] = useState(false)
  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      )
    }
  })

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }),
    [isDragActive, isDragReject, isDragAccept]
  )

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <Image src={file.preview} width="100%" height="100%" />
      </div>
    </div>
  ))

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview))
    },
    [files]
  )

  async function uploadImage() {
    try {
      const fileName = `List ${listName} Doc`
      const fileURL = `${isEmployee ? 'employees' : 'contractors'}/${employeeId}/${fileName}`
      if (!files[0]) return

      if (!uniqUrlHandler(fileURL)) {
        toast({
          title: 'Oops!',
          description: 'The file already exists',
          status: 'warning',
          duration: 3000
        })
        return
      }

      setStatus('uploading')

      const fileUpladed = await Storage.put(fileURL, files[0], {
        contentType: files[0]?.type || ''
      })

      if (!fileUpladed) return
      const employeeDetails = {
        id: employeeId,
        ListA_image: fileUpladed.key,
        _version: employeeVersion
      }

      const {
        data: { createDocument: document }
      } = await API.graphql({
        query: createDocument,
        variables: {
          input: {
            [isEmployee ? 'employeeID' : 'contractorID']: employeeDetails.id,
            url: fileURL,
            isSigned: false,
            fileName
          }
        }
      })

      addDocHandler(document)
      toast({
        title: `Successfully uploaded List ${listName} Document`,
        status: 'success',
        duration: 2000,
        isClosable: true
      })

      setStatus('idle')
    } catch (err) {
      toast({
        title: 'Oops!',
        description: 'There was an error uploading your image, please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true
      })

      setStatus('idle')
    }
  }

  return (
    <>
      <section className="container">
        <div {...getRootProps({ className: 'dropzone', style })}>
          <input {...getInputProps()} />
          <p>Drag and drop List {listName} file here, or click to select file. Format MUST be .PNG, .JPG, or .JPEG</p>
        </div>
        <aside style={thumbsContainer}>{thumbs}</aside>
      </section>
      <Flex justifyContent="flex-end">
        <Button
          isLoading={status === 'uploading'}
          loadingText="Uploading"
          onClick={() => uploadImage()}
          size="md"
          p={5}
          colorScheme="facebook"
          disabled={!files.length || status === 'uploading'}>
          Upload
        </Button>
      </Flex>
    </>
  )
}
