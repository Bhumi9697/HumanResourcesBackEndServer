import { useEffect, useState } from 'react'
import NextLink from 'next/link'
import { API, graphqlOperation, Storage } from 'aws-amplify'
import cookie from 'js-cookie'
import { useRouter } from 'next/router'
import { Flex, Text, Button, Heading, Link, useToast, Progress } from '@chakra-ui/react'
import { getCompany } from '@/src/graphql/queries'

global.self = global
const DocumentsPage = () => {
  const toast = useToast()
  const router = useRouter()
  const [currentCompany, setCurrentCompany] = useState()
  const [downloadingEHB, setDownloadingEHB] = useState(false)
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    fetchCompany()

    return () => setStatus('idle')
  }, [])

  async function fetchCompany() {
    setStatus('fetching')
    try {
      const company = await API.graphql(graphqlOperation(getCompany, { id: cookie.get('company-id') }))
      const query = company.data.getCompany
      setCurrentCompany({ ...currentCompany, query })
    } catch (err) {
      toast({
        title: 'Oops!',
        description: 'There was an error getting the information, please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true
      })
    } finally {
      setStatus('idle')
    }
  }

  const handleView = async () => {
    ;(async () => {
      if (!currentCompany.query.employee_handbook) return

      try {
        setDownloadingEHB(true)
        const ehb = await Storage.get(currentCompany.query.employee_handbook, { download: true })
        const url = URL.createObjectURL(ehb.Body)
        window.open(url, '_blank')
      } catch (error) {
        toast({
          title: 'Oops!',
          description: 'There was an error getting the EHB, please try again.',
          status: 'error',
          duration: 3000,
          isClosable: true
        })
      } finally {
        setDownloadingEHB(false)
      }
    })()
  }

  if (status === 'fetching') return <Progress size="md" isIndeterminate />

  return (
    <Flex flexDirection="column" p={2} boxShadow="md" rounded="md" bgColor="#FFF">
      <Flex justifyContent="space-between" alignItems="center" mb={6}>
        <Heading fontWeight="normal" letterSpacing="tight">
          Employee Handbook
        </Heading>
        <Flex>
          <Button
            variant="outline"
            size="md"
            p={5}
            colorScheme="facebook"
            onClick={() => router.push('/app/handbook-questions')}>
            Create Custom Handbook
          </Button>
        </Flex>
      </Flex>
      <Flex>
        <Button size="sm" onClick={handleView} colorScheme="facebook" isLoading={downloadingEHB} loadingText="Getting">
          View
        </Button>
      </Flex>

      <Flex justifyContent="space-between" alignItems="center" mb={6} mt={12}>
        <Heading fontWeight="normal" letterSpacing="tight">
          HR Policies
        </Heading>
        <Flex>
          <NextLink href="/app/questions">
            <Button variant="outline" size="md" p={5} colorScheme="facebook">
              Create Custom Policies
            </Button>
          </NextLink>
        </Flex>
      </Flex>
      <Flex>
        <Button size="sm" disabled colorScheme="facebook">
          View
        </Button>
      </Flex>
      <Flex justifyContent="space-between" alignItems="center" mt={12} mb={6}>
        <Heading fontWeight="normal" letterSpacing="tight">
          Laws
        </Heading>
      </Flex>
      {currentCompany?.query.laws ? (
        <Link
          href={currentCompany?.query.laws}
          ml={2}
          isExternal
          textDecoration="underline"
          _hover={{ cursor: 'pointer', color: 'blue.600' }}>
          view laws*
        </Link>
      ) : (
        <Text ml={2} fontSize="md" as="i">
          You haven&apos;t added any laws yet.
        </Text>
      )}
      <Flex justifyContent="space-between" alignItems="center" mt={12} mb={6}>
        <Heading fontWeight="normal" letterSpacing="tight">
          Labor Posters
        </Heading>
      </Flex>
      {currentCompany?.query.labor_posters ? (
        <Link
          href={currentCompany?.query.labor_posters}
          ml={2}
          isExternal
          textDecoration="underline"
          _hover={{ cursor: 'pointer', color: 'blue.600' }}>
          view labor posters*
        </Link>
      ) : (
        <Text ml={2} fontSize="md" as="i">
          You haven&apos;t added any labor posters yet.
        </Text>
      )}
    </Flex>
  )
}

export default DocumentsPage
