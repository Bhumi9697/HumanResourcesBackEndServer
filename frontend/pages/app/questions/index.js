import { useUser } from '@/src/context/AuthContext'
import QuestionsPage from '@/components/QuestionsPage'
import Layout from '@/src/layouts/Layout'

const Questions = () => {
  const { user } = useUser()
  if (!user) return null

  return <QuestionsPage />
}

Questions.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export default Questions
