import { useRef, useState, useEffect } from 'react'
import Layout from '@/src/layouts/Layout'
import {
  Tabs,
  TabPanel,
  TabPanels,
  TabList,
  Heading,
  Button,
  Flex,
  Text,
  useToast,
  Image,
  Progress
} from '@chakra-ui/react'
import TabStyled from '@/components/TabStyled'
import { useUser } from '@/src/context/AuthContext'
import { Storage, API, graphqlOperation } from 'aws-amplify'
import cookie from 'js-cookie'
import { updateCompany } from '@/src/graphql/mutations'
import { getCompany } from '@/src/graphql/queries'

const CompanySettingsPage = () => {
  const inputImage = useRef()
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [hasLogo, setHasLogo] = useState(false)
  const [image, setImage] = useState({ src: null, image: null })
  const toast = useToast()
  const { user } = useUser()
  const hasAccessCompanySettings =
    user?.attributes['custom:role'] === 'company_rep' || user?.attributes['custom:role'] === 'admin'

  const handleLoadLogo = () => inputImage.current.click()

  const handleOnImageLoaded = (event) => {
    setImage({ src: URL.createObjectURL(event.target.files[0]), image: event.target.files[0] })
  }

  useEffect(() => {
    const companyID = cookie.get('company-id')
    if (!companyID) return
    ;(async () => {
      setLoading(true)
      try {
        const company = await API.graphql(graphqlOperation(getCompany, { id: companyID }))
        const logoURL = company.data.getCompany.companyLogoURL
        setHasLogo(!!company.data.getCompany.companyLogoURL)
        const logoFile = await Storage.get(logoURL, { download: true })
        const fileObjectLogo = new File([logoFile.Body], 'company-logo')
        setImage({
          image: fileObjectLogo,
          src: URL.createObjectURL(fileObjectLogo)
        })
      } catch (error) {
        toast({
          title: 'An error occurred while getting the company info',
          status: 'error',
          duration: 3000,
          isClosable: true
        })
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const handleUploadLogo = async () => {
    if (!image.image) return
    try {
      setUploading(true)
      const extension =
        image.image.name.substring(image.image.name.lastIndexOf('.') + 1, image.image.name.length) || image.image.name
      const logoStored = await Storage.put(
        `companies/${cookie.get('company-id')}/company-logo.${extension}`,
        image.image,
        {
          contentType: image.image.type || ''
        }
      )

      await API.graphql({
        query: updateCompany,
        variables: {
          input: {
            id: cookie.get('company-id'),
            companyLogoURL: logoStored.key,
            _version: 1
          }
        }
      })

      toast({
        title: 'Company Logo uploaded successfully',
        status: 'success',
        duration: 3000,
        isClosable: true
      })
    } catch (error) {
      toast({
        title: 'An error occurred while uploading the company logo',
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    } finally {
      setUploading(false)
    }
  }

  if (loading) {
    return <Progress size="md" isIndeterminate />
  }

  return (
    <div>
      <Heading color="gray.600" fontWeight="semibold" mb={3}>
        Company Settings
      </Heading>
      <Tabs variant="solid-rounded" colorScheme="facebook" size="sm">
        <TabList>{hasAccessCompanySettings && <TabStyled title="Logo" />}</TabList>
        <TabPanels>
          {hasAccessCompanySettings && (
            <TabPanel>
              <Flex justifyContent="center" alignItems="center" flexDirection="column">
                <input
                  type="file"
                  ref={inputImage}
                  accept="image/png, image/jpeg"
                  onChange={handleOnImageLoaded}
                  style={{ display: 'none' }}
                />
                {!hasLogo && <Text mb={3}>*There&apos;s no any logo added to this company yet</Text>}
                <Flex maxWidth={300}>
                  {image?.src && (
                    <Image src={image.src} width="100%" height="100%" className="logo" alt="Company Logo" />
                  )}
                </Flex>
                <Flex style={{ gap: '10px' }}>
                  <Button
                    onClick={handleLoadLogo}
                    variant="outline"
                    colorScheme="facebook"
                    style={{ marginTop: image?.src && '15px' }}>
                    Select Logo
                  </Button>
                  {image?.src && (
                    <Button
                      onClick={handleUploadLogo}
                      colorScheme="facebook"
                      style={{ marginTop: image?.src && '15px' }}
                      isLoading={uploading}
                      loadingText="Uploading">
                      Upload
                    </Button>
                  )}
                </Flex>
              </Flex>
            </TabPanel>
          )}
        </TabPanels>
      </Tabs>
    </div>
  )
}

CompanySettingsPage.getLayout = (page) => <Layout>{page}</Layout>
export default CompanySettingsPage
