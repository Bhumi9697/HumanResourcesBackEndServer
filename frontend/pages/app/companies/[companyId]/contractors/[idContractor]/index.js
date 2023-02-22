import Layout from '@/src/layouts/Layout'
import ContractorProfile from '@/components/ContractorProfile'
import { useEffect, useState } from 'react'
import router from 'next/router'

function ContractorById({ idContractor }) {
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

  return <ContractorProfile idContractor={idContractor} isLoading={loading} />
}

ContractorById.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export async function getServerSideProps(context) {
  return {
    props: { idContractor: context.params.idContractor }
  }
}

export default ContractorById
