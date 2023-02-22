import SignUp from '@/components/SignUp'

const Signup = ({ accountType, company: companyId, email: mail }) => (
  <SignUp companyId={companyId} role={accountType} email={mail} />
)

export async function getServerSideProps({ query }) {
  return { props: query }
}

export default Signup
