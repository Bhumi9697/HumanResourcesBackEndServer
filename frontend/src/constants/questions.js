export const questions = {
  washington: [
    { number: '', question: 'Provide a Welcome Message', isMulti: false },
    {
      number: '1-1',
      question: 'Provide the title of the person in charge of __________ i.e. CEO, Executive Director, President etc….',
      isMulti: false
    },
    { number: '2-3', question: 'What are your normal working hours/days?', isMulti: false },
    {
      number: '2-4',
      question:
        'What day of the week and what time of day does the company define as the start of the 168-hour workweek for payroll purposes?',
      isMulti: false
    },
    { number: '2-6', question: 'How often will you pay?', isMulti: false },
    {
      number: '3-2',
      question: 'What paid/unpaid holidays will you provide?',
      isMulti: true,
      options: [
        'New Year’s Day (January 1)',
        'Martin Luther King, Jr. Day (Third Monday in January)',
        'President’s Day (Third Monday in February)',
        'Memorial Day (Last Monday in May)',
        'Juneteenth (June 19)',
        'Independence Day (July 4)',
        'Labor Day (First Monday in September)',
        'Columbus Day (Second Monday in October)',
        'Veterans Day (November 11)',
        'Thanksgiving Day (Fourth Thursday in November)',
        'Christmas Day (December 25)'
      ]
    },
    { number: '3-3', question: 'How much paid vacation/sick time will you provide?', isMulti: false },
    { number: '3-3', question: 'Will you provide paid/unpaid time off by the day or by the hour?', isMulti: false },
    { number: '3-3', question: 'Will you separate vacation/sick time or combine PTO/UPTO?', isMulti: false },
    {
      number: '3-3',
      question: 'What procedures will you use for the approval/disapproval of vacation/sick time/PTO/UPTO?',
      isMulti: false
    },
    {
      number: '3-3',
      question:
        'Will you allow vacation/PTO/UPTO carry over or will you require your employees to use their vacation/sick time PTO/UPTO each year?',
      isMulti: false
    },
    { number: '3-5', question: 'For Washington State Sick Leave will you require a waiting period?', isMulti: false },
    {
      number: '3-5',
      question: 'If you do require a waiting period, how many days will you require for the waiting period?',
      isMulti: false
    },
    {
      number: '3-5',
      question: 'How many hours of Washington State Sick Leave will you allow employees to carry over?',
      isMulti: false
    },
    {
      number: '3-5',
      question: 'How will you notify employees of Washington State Sick Leave Law (Initiative 1433)?',
      isMulti: false
    },
    {
      number: '3-6',
      question: 'Will you provide paternity and/or maternity leave to include adoption?',
      isMulti: false
    },
    {
      number: '3-6',
      question:
        'If you provide paternity and/or maternity leave to include adoption, how much time off will you provide (weeks)?',
      isMulti: false
    },
    {
      number: '3-6',
      question: 'How much will you pay for paternity and/or maternity leave to include adoption?',
      isMulti: false
    },
    { number: '3-8', question: 'Does your company need to provide Workers’ Compensation?', isMulti: false },
    { number: '3-10', question: 'How many days will you provide for Bereavement Leave?', isMulti: false },
    { number: '3-10', question: 'Who does your company regard as family for Bereavement Leave?', isMulti: false },
    { number: '', question: 'A few closing words', isMulti: false }
  ]
}
