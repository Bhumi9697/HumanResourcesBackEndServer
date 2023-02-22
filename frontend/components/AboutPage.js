import NextLink from 'next/link'
import { ChakraProvider, Grid, Flex, Link, Button, Text, Image } from '@chakra-ui/react'
import { InfoIcon, EmailIcon, BellIcon } from '@chakra-ui/icons'

const AboutPage = () => {
  return (
    <ChakraProvider resetCSS>
      <Grid
        templateColumns="1fr"
        templateRows="8rem 12rem 15rem 15rem 15rem 15rem 40rem"
        p={0}
        height="100vh"
        overflow="scroll">
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
        <Flex backgroundColor="#0072B9" justifyContent="center" alignItems="center">
          <Text ml="20%" mr="20%" fontWeight="bold" color="white" fontSize="2xl">
            CavnessHR is a remote, diverse and transparent company that delivers HR to companies with 49 or fewer
            people. Through a voice enabled AI platform along with access to a dedicated HR Business Partner
          </Text>
        </Flex>
        <Flex backgroundColor="white" justifyContent="center">
          <Flex width="100%" ml="10%" mr="10%" justifyContent="center" alignItems="center">
            <Image width="18%" src="/Jasonc.png" mr={6} />
            <Flex width="60%" flexDirection="column" p={0}>
              <Text color="#064D7F" fontWeight="bold" fontSize="3xl">
                Jason Cavness
              </Text>
              <Text fontWeight="bold" fontStyle="italic" color="#064D7F" fontSize="2xl">
                Founder & CEO
              </Text>
              <Text fontSize="sm" color="#064D7F">
                Retired U.S. Army Officer who is an INFJ HR Professional who is transforming how HR is delivered to
                companies with 49 or fewer people. Host of the Jason Cavness Experience. Where he talks to small
                business owners, founders, and other interesting people. City Leader at Bunker Labs Seattle, where he
                helps to mentor other Military Veterans and Military spouse entrepreneurs.{' '}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex backgroundColor="#EEF8FF" justifyContent="center">
          <Flex justifyContent="center" alignItems="center" ml="10%" mr="10%" width="100%">
            <Image width="15%" src="/Anthony.png" mr={10} ml={6} />
            <Flex flexDirection="column" width="60%">
              <Text color="#064D7F" fontSize="3xl" fontWeight="bold">
                {' '}
                Dr. Anthony Miles
              </Text>
              <Text color="#064D7F" fontWeight="bold" fontSize="2xl" fontStyle="italic">
                Board of Advisors
              </Text>
              <Text color="#064D7F" fontSize="sm">
                Dr. Miles is an entrepreneur, award-winning researcher, award-winning professor, statistician, legal
                expert witness, and, best-selling author.
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex backgroundColor="white" justifyContent="center">
          <Flex width="100%" ml="10%" mr="10%" justifyContent="center" alignItems="center">
            <Image width="15%" src="/kevin.png" ml={6} mr={10} />
            <Flex flexDirection="column" width="60%">
              <Text color="#064D7F" fontWeight="bold" fontSize="3xl">
                Kevin Goldsmith
              </Text>
              <Text color="#064D7F" fontWeight="bold" fontStyle="italic" fontSize="2xl">
                Board of Advisors
              </Text>
              <Text color="#064D7F" fontSize="sm">
                Kevin Goldsmith has been a software engineer and software executive since acoustic coupler modems were
                the pinnacle of networking. He has worked for the big guys (Microsoft, Adobe, IBM), the cool kids
                (Spotify, Silicon Graphics), the up-and-comers (Onfido, Avvo), and several startups lost to time.
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex backgroundColor="#EEF8FF" justifyContent="center">
          <Flex width="100%" ml="10%" mr="10%" justifyContent="center" alignItems="center">
            <Image width="15%" src="/todd.png" ml={6} mr={10} />
            <Flex flexDirection="column" width="60%">
              <Text color="#064D7F" fontWeight="bold" fontSize="3xl">
                Todd Dean
              </Text>
              <Text color="#064D7F" fontWeight="bold" fontStyle="italic" fontSize="2xl">
                Board of Advisors
              </Text>
              <Text color="#064D7F" fontSize="sm">
                Todd is a proven visionary and leader in the entrepreneurial investment community. Created a
                collaborative environment for bringing together like-minded community leaders, business executives,
                angel investors, serial entrepreneurs and early-stage companies.
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex backgroundColor="#2E7BB4" justifyContent="center">
          <Flex ml="10%" mr="10%" width="100%" flexDirection="column" justifyContent="flex-start" alignItems="center">
            {/* <Flex
              width="90%"
              alignItems="stretch"
              backgroundColor="white"
              borderRadius="12px"
              flexDirection="column"
              p={4}
              justifyContent="flex-start"
              mt="4%"
            >
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
                  onClick={submitNewsletterData}
                >
                  Submit
                </Button>
              </Flex>
            </Flex> */}
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
                  Media
                </Link>
                <Link fontSize="sm" textAlign="center" fontWeight="bold" color="white">
                  Link text
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

export default AboutPage
