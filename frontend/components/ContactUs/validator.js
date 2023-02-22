import * as yup from 'yup'

export const contactUsSchema = yup.object().shape({
  first_name: yup
    .string()
    .matches(/^$|(?!\s*$).+/, 'First Name is required')
    .required('First Name is required'),
  last_name: yup
    .string()
    .matches(/^$|(?!\s*$).+/, 'Last Name is required')
    .required('Last Name is required'),
  company_name: yup
    .string()
    .matches(/^$|(?!\s*$).+/, 'Company Name is required')
    .required('Company Name is required'),
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
  headquarters: yup
    .string()
    .matches(/^$|(?!\s*$).+/, 'Question is required')
    .required('Question is required'),
  employees: yup
    .string()
    .matches(/^$|(?!\s*$).+/, 'Question is required')
    .required('Question is required'),
  contractors: yup
    .string()
    .matches(/^$|(?!\s*$).+/, 'Question is required')
    .required('Question is required'),
  location: yup
    .string()
    .matches(/^$|(?!\s*$).+/, 'Question is required')
    .required('Question is required'),
  comments: yup.string()
})

export default contactUsSchema
