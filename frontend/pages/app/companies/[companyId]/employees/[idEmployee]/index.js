import Layout from '@/src/layouts/Layout'
import EmployeeProfile from '@/components/EmployeeProfile'
import { useEffect, useState } from 'react'
import router from 'next/router'

function EmployeeById({ idEmployee }) {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const start = () => setLoading(true)
    const end = () => setLoading(false)
    router.events.on('routeChangeStart', start)
    router.events.on('routeChangeComplete', end)
    router.events.on('routeChangeError', end)

    return () => {
      router.events.off('routeChangeStart', start)
      router.events.off('routeChangeComplete', end)
      router.events.off('routeChangeError', end)
    }
  }, [])

  return <EmployeeProfile idEmployee={idEmployee} isLoading={loading} />
}

EmployeeById.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export async function getServerSideProps(context) {
  return {
    props: { idEmployee: context.params.idEmployee }
  }
}

export default EmployeeById
