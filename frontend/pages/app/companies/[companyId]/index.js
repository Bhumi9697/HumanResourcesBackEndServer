import { useUser } from '@/src/context/AuthContext'
import AdminViewCompanyProfile from '@/components/AdminViewCompanyProfile'
import Layout from '@/src/layouts/Layout'

const Company = ({ context }) => {
  const { user } = useUser()

  if (!user) return null
  return <AdminViewCompanyProfile companyID={context.companyId} />
}

export async function getServerSideProps(context) {
  return {
    props: { context: context.params } // will be passed to the page component as props
  }
}

Company.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export default Company
