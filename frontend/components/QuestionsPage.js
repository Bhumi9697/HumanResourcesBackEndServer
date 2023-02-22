import { Flex, Text, Textarea, Heading, Button } from '@chakra-ui/react'

const QuestionsPage = () => {
  return (
    <Flex p={4} flexDirection="column" boxShadow="md" rounded="md" bgColor="white" style={{ gap: '1rem' }}>
      <Heading fontWeight="normal" mb={4} letterSpacing="tight" color="gray.700">
        Employee Handbook Questions
      </Heading>
      <Text ml={4}>
        Provide the title of the person in charge of __________ i.e. CEO, Executive Director, President etc…. Please
        include signing name and title as well.
      </Text>
      <Textarea ml={4} placeholder="answer" size="sm" width="auto" />
      <Text ml={4} mt={2}>
        1-1 Provide a Welcome Message - This will allow you to welcome your new employees and give them a glimpse of
        your company culture.
      </Text>
      <Textarea ml={4} placeholder="message" size="sm" width="auto" />
      <Text ml={4} mt={2}>
        1-8 To whom should employees report matters of EO, sexual harrassment and harassment? Within how many days
        should they expect a response?
      </Text>
      <Textarea ml={4} placeholder="answer" size="sm" width="auto" />
      <Text ml={4} mt={2}>
        1-11 Are you a federal contractor or grantee covered by the Drug Free Workplace Act
      </Text>
      <Textarea ml={4} mr={4} mt={2} placeholder="answer (yes or no)" size="sm" />
      <Text ml={4} mt={2}>
        2-3 What are your normal working hours/days? - This will let your employees know what are the expected hours of
        work and give them some predictability.
      </Text>
      <Textarea ml={4} placeholder="answer" size="sm" width="auto" />
      <Text ml={4} mt={2}>
        2-4 Do you allow remote work? Provide the details below.
      </Text>
      <Textarea ml={4} placeholder="answer" size="sm" width="auto" />
      <Text ml={4} mt={2}>
        2-8 How often will you pay? This will tell your employees when they can expect to be paid.
      </Text>
      <Textarea ml={4} placeholder="answer" size="sm" width="auto" />
      <Text ml={4} mt={2}>
        2-10 How often will performance reviews be conducted? (annually; bi-annually; other)
      </Text>
      <Textarea ml={4} placeholder="answer" size="sm" width="auto" />
      <Text ml={4} mt={2}>
        3-2 What paid/unpaid holidays will you provide? - This will tell your employees which holidays they will be off
        and paid/unpaid for every year.
      </Text>
      <Textarea
        ml={4}
        placeholder="answer i.e. New Years Day
            Martin Luther King, Jr. Day
            Presidents Day
            Good Friday
            Memorial Day
            Juneteenth National Independence Day
            Independence Day
            Labor Day
            Columbus Day
            Veterans Day
            Thanksgiving Day
            Day after Thanksgiving
            Christmas Eve
            Christmas Day
            New Years Eve
            "
        size="sm"
        width="auto"
      />
      <Text ml={4} mt={2}>
        3-3 How much paid vacation/sick time will you provide? - This will inform your employees how much time off they
        can expect for paid/unpaid vacation/sick time each year.
      </Text>
      <Textarea ml={4} placeholder="answer" size="sm" width="auto" />
      <Text ml={4} mt={2} as="i">
        For questions 3-2 to 3-5 we recommend offering unlimited PTO to your exempt employees. We can talk about how
        this actually benefits the employer if you are interested in learning more.
      </Text>
      <Text ml={4} mt={2}>
        3-3 Will you provide paid/unpaid time off by the day or by the hour? This would be used by your payroll when
        determining how to calculate days off.
      </Text>
      <Textarea ml={4} placeholder="answer" size="sm" width="auto" />
      <Text ml={4} mt={2}>
        3-3 Will you separate vacation/sick time or combine PTO/UPTO? - One benefit of combining them is that your
        employees have more privacy when it comes to when they need to take off for being sick. One benefit for the
        company is that it can be used as a recruiting tool.
      </Text>
      <Textarea ml={4} placeholder="answer" size="sm" width="auto" />
      <Text ml={4} mt={2}>
        3-3 What procedures will you use for the approval/disapproval of vacation/sick time/PTO/UPTO? This will inform
        your employees of how to submit for PTO/UPTO. I would make this as flexible as possible.
      </Text>
      <Textarea ml={4} placeholder="answer" size="sm" width="auto" />
      <Text ml={4} mt={2}>
        3-3 Will you allow vacation//PTO/UPTO carry over or will you require your employees to use their vacation/sick
        time PTO/UPTO each year?
      </Text>
      <Textarea ml={4} placeholder="answer" size="sm" width="auto" />
      <Text ml={4} mt={2}>
        3-5 Will you provide paternity and/or maternity leave to include adoption? - Providing this benefit could be
        used as a great way to retain and recruit great talent.
      </Text>
      <Textarea ml={4} placeholder="answer" size="sm" width="auto" />
      <Text ml={4} mt={2}>
        3-5 If you provide paternity and/or maternity leave to include adoption, how much time off will you provide?
      </Text>
      <Textarea ml={4} placeholder="answer" size="sm" width="auto" />
      <Text ml={4} mt={2}>
        3-5 How much will you pay for paternity and/or maternity leave to include adoption? - You could pay your
        employees 0% of their salary while on paternity and/or maternity leave to include adoption. Or you could pay
        them as much as 100% of their salary.
      </Text>
      <Textarea ml={4} placeholder="answer" size="sm" width="auto" />
      <Text ml={4} mt={2}>
        3-7 Does your company need to provide Workers’ Compensation? - If the answer is yes, this will inform your
        employees of this benefit that you provide for them. If the answer is no, then this will not be included in your
        Employee Handbook.
      </Text>
      <Textarea ml={4} placeholder="answer" size="sm" width="auto" />
      <Text ml={4} mt={2}>
        3-8 Will you pay for jury duty service?
      </Text>
      <Textarea ml={4} placeholder="answer" size="sm" width="auto" />
      <Text ml={4} mt={2}>
        3-9 Who does your company regard as family for Bereavement Leave? - In today’s world, there are many definitions
        of the term family. This will inform your employees of what your company&apos;s definition is of the term
        family.
      </Text>
      <Textarea ml={4} placeholder="answer" size="sm" width="auto" />
      <Text ml={4} mt={2}>
        3-9 How many days will you allow for Bereavement Leave?
      </Text>
      <Textarea ml={4} placeholder="answer" size="sm" width="auto" />
      <Text ml={4} mt={2}>
        3-10 Will you allow voting leave?
      </Text>
      <Textarea ml={4} placeholder="answer" size="sm" width="auto" />
      <Text ml={4} mt={2}>
        5-2 How many consecutive unexcused absences will be considered a resignation?
      </Text>
      <Textarea ml={4} placeholder="answer" size="sm" width="auto" />
      <Text ml={4} mt={2}>
        15-5 A few closing words - This will allow you to say a few final words to your new employees and continue to
        focus on the culture of your company.
      </Text>
      <Textarea ml={4} placeholder="closing words" size="sm" width="auto" />
      <Flex mt={2} justifyContent="flex-end">
        <Button variant="solid" size="md" p={5} colorScheme="facebook">
          Submit
        </Button>
      </Flex>
    </Flex>
  )
}

export default QuestionsPage
