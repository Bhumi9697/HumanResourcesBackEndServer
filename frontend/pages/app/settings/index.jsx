import Layout from '@/src/layouts/Layout'
import { Tabs, TabPanel, TabPanels, TabList, Heading } from '@chakra-ui/react'
import TabStyled from '@/components/TabStyled'
import Signature from '@/components/Signature'
import { useUser } from '@/src/context/AuthContext'

const Settings = () => {
  const { user } = useUser()
  const hasAccessSignature =
    user?.attributes['custom:role'] === 'employee' || user?.attributes['custom:role'] === 'contractor'
  const hasAccessCompanySettings = user?.attributes['custom:role'] === 'company_rep'

  return (
    <div>
      <Heading color="gray.600" fontWeight="semibold" mb={3}>
        Settings
      </Heading>
      <Tabs variant="solid-rounded" colorScheme="facebook" size="sm">
        <TabList>
          <TabStyled title="Profile" />
          {hasAccessSignature && <TabStyled title="Signature" />}
          {hasAccessCompanySettings && <TabStyled title="Company Settings" />}
        </TabList>
        <TabPanels>
          <TabPanel>
            <p>Module not implemented yet.</p>
          </TabPanel>
          {hasAccessSignature && (
            <TabPanel>
              <Signature />
            </TabPanel>
          )}
          {hasAccessCompanySettings && <TabPanel>Company Settings</TabPanel>}
        </TabPanels>
      </Tabs>
    </div>
  )
}

Settings.getLayout = (page) => <Layout>{page}</Layout>
export default Settings
