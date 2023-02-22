const formData = require('form-data')
const Mailgun = require('mailgun.js')

export const sendEmail = ({ emails, subject, text, html }) => {
  const mailgun = new Mailgun(formData).client({
    username: 'api',
    key: process.env.NEXT_PUBLIC_MAILGUN_API_KEY || '',
    public_key: process.env.NEXT_PUBLIC_MAILGUN_PUBLIC_KEY || ''
  })

  return mailgun.messages.create('mailgun2.cavnesshr.com', {
    from: 'jasoncavness@cavnesshr.com',
    to: emails,
    subject,
    text,
    html
  })
}
