import { ChakraProvider } from '@chakra-ui/react'
import { Global, css } from '@emotion/react'
import Head from 'next/head'
import { AuthContext } from '@/src/context/AuthContext'
import '@/utils/configureAmplify'

const GlobalStyle = ({ children }) => {
  return (
    <>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <script type="text/javascript" dangerouslySetInnerHTML={{ __html: process.env.rawJsFromFile }}></script>
        <title>CavnessHR</title>
      </Head>
      <Global
        styles={css`
          #__next {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }
          html,
          body {
            padding: 0;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans,
              Droid Sans, Helvetica Neue, sans-serif;
          }

          a {
            color: inherit;
            text-decoration: none;
          }

          * {
            box-sizing: border-box;
          }

          .sidebar-items:not(:last-child) {
            margin-bottom: 1.5em;
          }

          @media only screen and (max-width: 767px) {
            .sidebar-items {
              margin-bottom: 0 !important;
            }
          }

          .sidebar-items {
            font-size: large;
          }

          .sidebar-items p {
            margin-left: 1em;
          }

          .sidebar-items:hover svg {
            color: #2b6cb0;
          }

          .sidebar-items:hover p {
            color: #fff;
          }

          .active {
            color: #fff;
          }

          .active-icon {
            color: #2b6cb0 !important;
          }
        `}
      />
      {children}
    </>
  )
}

function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)
  return (
    <AuthContext>
      <ChakraProvider>
        <GlobalStyle />
        {getLayout(<Component {...pageProps} />)}
      </ChakraProvider>
    </AuthContext>
  )
}

export default App
