import Layout from '@/src/layouts/Layout'
import { Heading } from '@chakra-ui/react'
import { useUser } from '@/src/context/AuthContext'
import EmployeeProfile from '@/components/EmployeeProfile'
import ContractorProfile from '@/components/ContractorProfile'
import AdminViewCompanyProfile from '@/components/AdminViewCompanyProfile'

export const App = () => {
  const { user } = useUser()

  const isEmployee = user?.attributes['custom:role'] === 'employee'
  const isContractor = user?.attributes['custom:role'] === 'contractor'
  const isCompany = user?.attributes['custom:role'] === 'company_rep'
  const isAdmin = user?.signInUserSession?.idToken?.payload['cognito:groups']?.includes('Admins')

  return (
    <>
      {isEmployee && <EmployeeProfile />}
      {isContractor && <ContractorProfile />}
      {isCompany && <AdminViewCompanyProfile companyID={user.attributes['custom:company_name']} />}
      {isAdmin && (
        <Heading boxShadow="md" p="3" bgColor="white" color="gray.600" size="md" rounded="md">
          Home view is not implemented yet
        </Heading>
      )}
    </>
  )
}

App.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
export default App
