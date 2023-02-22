import Layout from '@/src/layouts/Layout'
import CompanyDocuments from '@/components/CompanyDocuments'

const index = ({ companyId }) => {
  return <CompanyDocuments companyID={companyId} />
}

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export async function getServerSideProps(context) {
  return {
    props: { companyId: context.params.companyId }
  }
}

export default index
