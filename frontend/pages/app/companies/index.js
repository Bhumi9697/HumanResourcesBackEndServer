import { useUser } from '@/src/context/AuthContext'
import AdminCompanyTable from '@/components/AdminCompanyTable'
import Layout from '@/src/layouts/Layout'

const Companies = () => {
  const { user } = useUser()

  if (!user) return null
  if (user?.signInUserSession?.idToken?.payload['cognito:groups']?.includes('Admins')) {
    return <AdminCompanyTable />
  }

  return <h1>You are not authorized to view this page</h1>
}

Companies.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export default Companies
