import Head from 'next/head'
import HomePage from '@/components/HomePage'
global.self = global;
export default function Home() {
  return (
    <>
      <Head>
        <title>CavnessHR</title>
      </Head>
      <HomePage />
    </>
  )
}
