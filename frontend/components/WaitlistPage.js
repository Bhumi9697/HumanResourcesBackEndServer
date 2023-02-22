import { useState } from 'react'
import NextLink from 'next/link'
import { ChakraProvider, Grid, Flex, Link, Button, Text, Input, Image, useToast } from '@chakra-ui/react'
import { InfoIcon, EmailIcon, BellIcon } from '@chakra-ui/icons'

const WaitlistPage = () => {
  const [email, setEmail] = useState('')
  const [waitlistName, setWaitlistName] = useState('')
  const [waitlistEmail, setWaitlistEmail] = useState('')
  const [waitlistPhone, setWaitlistPhone] = useState('')
  const toast = useToast()

  const submitWaitlistData = async (e) => {
    e.preventDefault()
    try {
      const body = {
        properties: [
          {
            property: 'name',
            value: waitlistName
          },
          {
            property: 'email',
            value: waitlistEmail
          },
          {
            property: 'phone',
            value: waitlistPhone
          },
          {
            property: 'notes',
            value: 'waitlist signup'
          }
        ]
      }
      const res = await fetch(
        `https://quiet-brushlands-05910.herokuapp.com/https://api.hubapi.com/contacts/v1/contact/?hapikey=2faffc77-79f9-4fa4-a342-5d5c00790973`,
        {
          headers: { 'Content-Type': 'application/json' },
          method: 'POST',
          body: JSON.stringify(body)
        }
      )
      await res.json()
      setWaitlistName('')
      setWaitlistPhone('')
      setWaitlistEmail('')
      toast({
        title: "You're on the waitlist!",
        description: 'We will be in touch soon.',
        status: 'success',
        duration: 9000,
        isClosable: true
      })
    } catch (error) {
      toast({
        title: 'Error found',
        description: 'An error occurred, please try again.',
        status: 'error',
        duration: 7000,
        isClosable: true
      })
    }
  }

  const submitData = async (e) => {
    e.preventDefault()
    try {
      const body = {
        properties: [
          {
            property: 'email',
            value: email
          },
          {
            property: 'notes',
            value: 'newsletter subscriber'
          }
        ]
      }
      const res = await fetch(
        `https://quiet-brushlands-05910.herokuapp.com/https://api.hubapi.com/contacts/v1/contact/?hapikey=2faffc77-79f9-4fa4-a342-5d5c00790973`,
        {
          headers: { 'Content-Type': 'application/json' },
          method: 'POST',
          body: JSON.stringify(body)
        }
      )
      await res.json()
      setEmail('')
      toast({
        title: 'Success!',
        description: 'You will now start receiving our newsletter',
        status: 'success',
        duration: 5000,
        isClosable: true
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong, please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true
      })
    }
  }

  return (
    <ChakraProvider resetCSS>
      <Grid templateColumns="1fr" templateRows="8rem 44rem 40rem" p={0} height="100vh" overflow="scroll">
        <Flex backgroundColor="white" justifyContent="center" alignItems="flex-start" mt={4}>
          <Flex width="100%" ml="10%" mr="10%" height="40%" justifyContent="space-between" alignItems="center" mt="1%">
            <NextLink href="/">
              <Image width="15%" src="https://i.ibb.co/KWZmv9K/realjust-HR-Blue.png" _hover={{ cursor: 'pointer' }} />
            </NextLink>
            <Flex width="60%" justifyContent="space-around" alignItems="center">
              <NextLink href="/services">
                <Text color="#0072B9" fontWeight="bold" fontSize="xl" _hover={{ cursor: 'pointer', color: '#F18E26' }}>
                  Services & Plans
                </Text>
              </NextLink>
              <NextLink href="/about">
                <Text color="#0072B9" fontWeight="bold" fontSize="xl" _hover={{ cursor: 'pointer', color: '#F18E26' }}>
                  About Us
                </Text>
              </NextLink>
              <NextLink href="/login">
                <Button variant="solid" size="md" backgroundColor="#F18E26" color="white" fontWeight="bold">
                  Sign In
                </Button>
              </NextLink>
            </Flex>
          </Flex>
        </Flex>
        <Flex backgroundColor="#EEF8FF" justifyContent="center" alignItems="stretch">
          <Flex ml="10%" mr="10%" width="100%" justifyContent="flex-start" alignItems="center" flexDirection="column">
            <Text color="#064D7F" fontSize="lg" mt={8} mb={4}>
              Each year it is estimated that small businesses and startups lose $27B or $10,000 per employee. It is also
              estimated that small business owners and startup founders spend 25% of their time on HR related items.
              Time better spent taking care of their people, customers and building their business.{' '}
            </Text>
            <Text color="#064D7F" fontSize="lg" mb={4}>
              CavnessHR is saving small businesses and startups time and money with our HR platform and by providing a
              dedicated HR Business Partner.
            </Text>
            <Text mb={4} fontSize="lg" color="#064D7F" fontWeight="bold">
              Sign up below to join the waitlist for our beta launch.
            </Text>
            <Text pb={4} color="#064D7F" fontSize="lg">
              Our current beta pricing is:
            </Text>
            <Text mb={2} fontWeight="bold" fontSize="md" color="#064D7F">
              1-10 people $200 per month
            </Text>
            <Text color="#064D7F" fontSize="md" fontWeight="bold" mb={2}>
              11-19 people $300 per month
            </Text>
            <Text color="#064D7F" fontSize="md" fontWeight="bold" pb={2}>
              20-34 people $400 per month
            </Text>
            <Text color="#064D7F" fontSize="md" fontWeight="bold" mb={6}>
              35-49 people $500 per month
            </Text>
            <Text fontSize="lg" color="#064D7F" mb={6}>
              REFERRAL BONUS - For each company you refer that signs up for the waitlist, you will receive one free
              month of HR services.
            </Text>
            <Input mb={4} placeholder="Name" onChange={(e) => setWaitlistName(e.target.value)} value={waitlistName} />
            <Input
              mb={4}
              placeholder="Email"
              onChange={(e) => setWaitlistEmail(e.target.value)}
              value={waitlistEmail}
            />
            <Input
              mb={4}
              placeholder="Phone Number"
              onChange={(e) => setWaitlistPhone(e.target.value)}
              value={waitlistPhone}
            />
            <Button
              variant="solid"
              size="md"
              width="20%"
              backgroundColor="#F18E26"
              color="white"
              onClick={submitWaitlistData}
              mb={6}>
              Join Now
            </Button>
          </Flex>
        </Flex>
        <Flex backgroundColor="#2E7BB4" justifyContent="center">
          <Flex ml="10%" mr="10%" width="100%" flexDirection="column" justifyContent="flex-start" alignItems="center">
            <Flex
              width="90%"
              alignItems="stretch"
              backgroundColor="white"
              borderRadius="12px"
              flexDirection="column"
              p={4}
              justifyContent="flex-start"
              mt="4%">
              <Text fontWeight="bold" fontSize="2xl" color="#064D7F" p={2}>
                Get the latest news:
              </Text>
              <Flex>
                <Input
                  placeholder="Email"
                  variant="outline"
                  width="70%"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                <Button
                  variant="solid"
                  size="md"
                  width="30%"
                  ml={2}
                  backgroundColor="#F18E26"
                  color="white"
                  onClick={submitData}>
                  Submit
                </Button>
              </Flex>
            </Flex>
            <Grid templateColumns="1fr 1fr 1fr" gap={6} width="100%" mt="4%" templateRows="1fr">
              <Flex flexDirection="column">
                <Text fontWeight="bold" color="white" mb={6}>
                  About Us
                </Text>
                <Text color="white" fontSize="sm">
                  CavnessHR delivers HR to companies with 49 or fewer people.
                </Text>
                <Text color="white" fontSize="sm">
                  While taking care of our employees & customers, maintaining transparency, utilizing active listening,
                  practicing empathy, and being valued members of our communities.
                </Text>
                <Image width="100%" src="https://i.ibb.co/ZL2Y202/realjust-HR-white.png" />
              </Flex>
              <Flex flexDirection="column">
                <Text mb={6} fontWeight="bold" color="white">
                  Important Links
                </Text>
                <Link color="white" textAlign="center" fontWeight="bold" fontSize="sm" mb={3}>
                  Services & Plans
                </Link>
                <Link mb={3} fontWeight="bold" fontSize="sm" color="white" textAlign="center">
                  About Us
                </Link>
                <Link mb={3} fontWeight="bold" fontSize="sm" color="white" textAlign="center">
                  Waitlist
                </Link>
              </Flex>
              <Flex flexDirection="column">
                <Text fontWeight="bold" color="white" mb={6}>
                  Get In Touch
                </Text>
                <Flex mb={3} alignItems="center">
                  <InfoIcon boxSize={4} color="#F18E26" mr={2} />
                  <Flex flexDirection="column">
                    <Text color="white" fontSize="sm">
                      1201 3rd Ave, Seattle, WA 98101 or 87 35th St
                    </Text>
                    <Text color="white" fontSize="sm">
                      Suite 2DS1 Brooklyn, NY 11232
                    </Text>
                  </Flex>
                </Flex>
                <Flex mb={3} alignItems="center">
                  <EmailIcon boxSize={4} color="#F18E26" mr={2} />
                  <Text color="white" fontSize="sm">
                    jasoncavness@cavnesshr.com
                  </Text>
                </Flex>
                <Flex alignItems="center">
                  <BellIcon boxSize={4} color="#F18E26" mr={2} />
                  <Text fontSize="sm" color="white">
                    803-360-8457
                  </Text>
                </Flex>
              </Flex>
            </Grid>
          </Flex>
        </Flex>
      </Grid>
    </ChakraProvider>
  )
}

export default WaitlistPage
