import Layout from '@/src/layouts/Layout'
import cookie from 'js-cookie'
import CompanyDocuments from '@/components/CompanyDocuments'

const FileExplorer = () => {
  return <CompanyDocuments companyID={cookie.get('company-id')} />
}

FileExplorer.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
export default FileExplorer
