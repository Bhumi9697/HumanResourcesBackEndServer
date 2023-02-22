import * as yup from 'yup'

export const signUpSchema = yup.object().shape({
  given_name: yup
    .string()
    .matches(/^$|(?!\s*$).+/, 'First Name is required')
    .required('First Name is required'),
  family_name: yup
    .string()
    .matches(/^$|(?!\s*$).+/, 'Last Name is required')
    .required('Last Name is required'),
  company_name: yup
    .string()
    .matches(/^$|(?!\s*$).+/, 'Company Code is required')
    .required('Company Code is required'),
  role: yup
    .string()
    .matches(/^$|(?!\s*$).+/, 'Role is required')
    .required('Role is required'),
  email: yup
    .string()
    .required('Email is required')
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Email is invalid'
    ),
  password: yup
    .string()
    .matches(/^$|(?!\s*$).+/, 'Password is required')
    .required('Password is required')
})

export default signUpSchema
