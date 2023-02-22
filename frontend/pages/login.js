import { useEffect, useState } from 'react'
import { Auth, API } from 'aws-amplify'
import Router, { useRouter } from 'next/router'
import cookie from 'js-cookie'
import SignIn from '@/components/SignIn'
import ForgotPassword from '@/components/ForgotPassword'
import ForgotPasswordSubmit from '@/components/ForgotPasswordSubmit'
import { listCompanies, listEmployees, listContractors } from '@/src/graphql/queries'
import { useToast } from '@chakra-ui/react'
import { UIStates } from '@/src/constants'
import { useUser } from '@/src/context/AuthContext'

function AuthApp() {
  const { setUser } = useUser()
  const router = useRouter()
  const [uiState, setUiState] = useState({
    type: UIStates.SIGNIN,
    message: ''
  })
  const [formState, setFormState] = useState({
    email: '',
    password: '',
    newPassword: '',
    authCode: ''
  })

  const toast = useToast()
  const { email, password, newPassword, authCode } = formState

  useEffect(() => {
    router.prefetch(`/app/${cookie.get('company-id')}`)
    router.prefetch(`/app/employee/${cookie.get('employee-id')}/profile`)
    router.prefetch(`/app/contractor/${cookie.get('contractor-id')}/profile`)
  }, [])

  function onChange(e) {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }

  const signIn = async () => {
    setUiState({ type: UIStates.SIGNINGIN, message: '' })
    try {
      const user = await Auth.signIn(email, password)
      if (user?.challengeName !== 'NEW_PASSWORD_REQUIRED') {
        setUser(user)
        await setRoute(user)
        return
      }

      setUiState({ type: UIStates.SHOULD_COMPLETE_PW, message: '' })
    } catch (err) {
      setUiState({ type: UIStates.SIGNIN, message: err?.message })
      toast({
        title: 'Sign in error',
        description: err?.message || 'An error occurred while trying to sign in',
        status: 'error',
        duration: 6000
      })
    }
  }

  const completePasswordHandler = async () => {
    try {
      const user = await Auth.signIn(email, password)
      await Auth.completeNewPassword(user, newPassword)
      setUiState({ type: UIStates.SIGNEDIN, message: '' })
    } catch (error) {
      toast({
        title: 'Oops',
        description: error?.message || 'Something went wrong, please try again',
        status: 'error',
        duration: 5000
      })
    }
  }

  async function forgotPassword() {
    try {
      await Auth.forgotPassword(email)
      setUiState({ type: UIStates.FORGOT_PASSWORD_SUBMIT, message: '' })
    } catch (err) {
      toast({
        title: 'Oops',
        description: err?.message || 'Something went wrong, please try again',
        status: 'error',
        duration: 5000
      })
    }
  }

  async function forgotPasswordSubmit() {
    await Auth.forgotPasswordSubmit(email, authCode, password)
    setUiState({ type: UIStates.SIGNIN, message: '' })
  }

  async function setRoute(user) {
    if (!user) return

    if (user.signInUserSession?.idToken?.payload['cognito:groups']?.includes('Admins')) {
      cookie.set('company', 'Admin', {
        expires: 90
      })
      Router.push({
        pathname: '/app/companies'
      })
      setUiState({ type: UIStates.SIGNEDIN, message: '' })
      return
    }

    if (user.attributes['custom:role'] === 'company_rep') {
      const company = await API.graphql({
        query: listCompanies,
        variables: {
          filter: {
            id: {
              contains: user.attributes['custom:company_name'].trim()
            }
          }
        }
      })

      if (!company.data.listCompanies.items[0]) {
        toast({
          title: 'Oops',
          description: 'The company you are looking for does not exist',
          status: 'error',
          duration: 5000
        })
        setUiState({ type: UIStates.SIGNIN, message: '' })
        return
      }

      cookie.set('company-id', company.data.listCompanies.items[0].id.trim(), {
        expires: 90
      })
      cookie.set('company', company.data.listCompanies.items[0].name, {
        expires: 90
      })
      Router.push({
        pathname: '/app'
      })
      setUiState({ type: UIStates.SIGNEDIN, message: '' })
      return
    }

    if (user.attributes['custom:role'] === 'employee') {
      const responseEmp = await API.graphql({
        query: listEmployees,
        variables: {
          filter: {
            email: { contains: user.attributes.email }
          }
        }
      })

      const employee = responseEmp.data.listEmployees.items.find((emp) => !emp._deleted)

      if (!employee) {
        toast({
          title: 'Oops',
          description: 'The employee you are looking for does not exist',
          status: 'error',
          duration: 5000
        })
        setUiState({ type: UIStates.SIGNIN, message: '' })
        return
      }

      cookie.set('employee-id', employee.id, {
        expires: 90
      })
      cookie.set('company', employee.CompanyOfEmployee.name, {
        expires: 90
      })
      setUiState({ type: UIStates.SIGNEDIN, message: '' })
      Router.push({
        pathname: `/app`
      })
      return
    }

    // Contractor layout
    const response = await API.graphql({
      query: listContractors,
      variables: {
        filter: {
          email: { contains: user.attributes.email }
        }
      }
    })
    const contractor = response.data.listContractors.items.find((con) => !con._deleted)
    if (!contractor || contractor._deleted) {
      toast({
        title: 'Oops',
        description: 'The contractor you are looking for does not exist',
        status: 'error',
        duration: 5000
      })
      setUiState({ type: UIStates.SIGNIN, message: '' })
      return
    }

    cookie.set('contractor-id', contractor.id, {
      expires: 90
    })
    cookie.set('company', contractor.CompanyOfContractor.name, {
      expires: 90
    })
    setUiState({ type: UIStates.SIGNEDIN, message: '' })
    Router.push({
      pathname: `/app`
    })
  }

  return (
    <>
      {(uiState.type === UIStates.SIGNIN ||
        uiState.type === UIStates.SHOULD_COMPLETE_PW ||
        uiState.type === UIStates.SIGNINGIN) && (
        <SignIn
          setUiState={setUiState}
          onChange={onChange}
          signIn={uiState.type === UIStates.SIGNIN ? signIn : completePasswordHandler}
          signingIn={uiState.type === UIStates.SIGNINGIN}
          shouldChangePW={uiState.type === UIStates.SHOULD_COMPLETE_PW}
        />
      )}
      {uiState.type === UIStates.FORGOT_PASSWORD && (
        <ForgotPassword setUiState={setUiState} onChange={onChange} forgotPassword={forgotPassword} />
      )}
      {uiState.type === UIStates.FORGOT_PASSWORD_SUBMIT && (
        <ForgotPasswordSubmit setUiState={setUiState} onChange={onChange} forgotPasswordSubmit={forgotPasswordSubmit} />
      )}
    </>
  )
}

export default AuthApp
