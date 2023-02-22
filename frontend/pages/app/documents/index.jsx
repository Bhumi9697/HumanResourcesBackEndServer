import EmployeeDocuments from '@/components/EmployeeDocuments'
import Layout from '@/src/layouts/Layout'
import { useUser } from '@/src/context/AuthContext'
import DocumentsPage from '@/components/DocumentsPage'
import { Progress } from '@chakra-ui/react'
export default function Documents() {
  const { user } = useUser()

  if (user?.attributes['custom:role'] === 'employee' || user?.attributes['custom:role'] === 'contractor') {
    return <EmployeeDocuments />
  }

  if (user?.signInUserSession?.idToken?.payload['cognito:groups']?.includes('Admins')) {
    return <DocumentsPage />
  }

  if (user?.attributes['custom:role'] === 'company_rep') {
    return <DocumentsPage />
  }

  return <Progress size="md" isIndeterminate />
}

Documents.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
