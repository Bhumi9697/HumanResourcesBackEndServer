import { useEffect, useState, useMemo } from 'react'
import { Storage, API } from 'aws-amplify'
import { useDropzone } from 'react-dropzone'
import { Button, Flex, useToast } from '@chakra-ui/react'
import Image from 'next/image'
import { updateContractor } from '@/src/graphql/mutations'

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

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
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

export default function ImageDropzoneListAContractor({ employeeId, employeeVersion, name }) {
  const toast = useToast()
  const [files, setFiles] = useState([])
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
        <Image src={file.preview} style={img} />
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
      const fileName = 'listA-image' + ' ' + name
      await Storage.put(fileName, files[0])
      const employeeDetails = {
        id: employeeId,
        ListA_Image: fileName,
        _version: employeeVersion
      }

      await API.graphql({
        query: updateContractor,
        variables: { input: employeeDetails }
      })

      toast({
        title: 'Successfully uploaded List A Document',
        status: 'success',
        duration: 2000,
        isClosable: true
      })
    } catch (err) {
      toast({
        title: 'Oops!',
        description: 'There was an error uploading your image, please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    }
  }

  return (
    <>
      <section className="container">
        <div {...getRootProps({ className: 'dropzone', style })}>
          <input {...getInputProps()} />
          <p>Drag and drop List A file here, or click to select file. Format MUST be .PNG, .JPG, or .JPEG</p>
        </div>
        <aside style={thumbsContainer}>{thumbs}</aside>
      </section>
      <Flex justifyContent="flex-end">
        <Button onClick={() => uploadImage()} variant="outline" size="md" p={5} colorScheme="facebook" width="14%">
          Upload
        </Button>
      </Flex>
    </>
  )
}
