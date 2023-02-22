import NextLink from 'next/link'
import {
  ChakraProvider,
  Grid,
  Flex,
  Link,
  Button,
  Image,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  UnorderedList,
  ListItem
} from '@chakra-ui/react'
import { InfoIcon, EmailIcon, BellIcon } from '@chakra-ui/icons'

const ServicesPage = () => {
  return (
    <ChakraProvider resetCSS>
      <Grid templateColumns="1fr" templateRows="8rem 30rem 60rem 40rem" p={0} height="100vh" overflow="scroll">
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
        <Flex backgroundColor="#0072B9">
          <Flex width="100%" ml="10%" mr="10%" justifyContent="space-between" alignItems="center">
            <Flex
              width="50%"
              height="80%"
              p={0}
              flexDirection="column"
              justifyContent="center"
              alignItems="stretch"
              overflow="scroll">
              <Text fontWeight="bold" fontSize="3xl" color="white" mb="5%">
                What we do for small businesses
              </Text>
              <Accordion allowToggle>
                <AccordionItem>
                  <AccordionButton pl={0} pt={5}>
                    <AccordionIcon color="white" />
                    <Text color="white" fontWeight="bold" fontStyle="italic" pl={1} fontSize="xl">
                      Responsive HR
                    </Text>
                  </AccordionButton>
                  <AccordionPanel>
                    <UnorderedList>
                      <ListItem color="white" fontWeight="bold">
                        Have your HR questions answered in a responsive manner.
                      </ListItem>
                      <ListItem color="white" fontWeight="bold">
                        Communicate with your HR business partner.
                      </ListItem>
                      <ListItem color="white" fontWeight="bold">
                        Be confident in your HR decisions.
                      </ListItem>
                    </UnorderedList>
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                  <AccordionButton pl={0} pt={5}>
                    <AccordionIcon color="white" />
                    <Text pl={1} fontWeight="bold" fontSize="xl" fontStyle="italic" color="white">
                      Compliance
                    </Text>
                  </AccordionButton>
                  <AccordionPanel>
                    <UnorderedList>
                      <ListItem color="white" fontWeight="bold">
                        CavnessHR assists you in meeting your HR compliance requirements.
                      </ListItem>
                      <ListItem color="white" fontWeight="bold">
                        By providing HR products/services based on the location and industry of your company.
                      </ListItem>
                    </UnorderedList>
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                  <AccordionButton pl={0} pt={5}>
                    <AccordionIcon color="white" />
                    <Text pl={1} fontWeight="bold" fontStyle="italic" fontSize="xl" color="white">
                      Onboarding
                    </Text>
                  </AccordionButton>
                  <AccordionPanel>
                    <UnorderedList>
                      <ListItem color="white" fontWeight="bold">
                        CavnessHR provides a structured onboarding process to ensure all your employees are authorized
                        to work in the U.S.
                      </ListItem>
                      <ListItem color="white" fontWeight="bold">
                        CavnessHR handles your onboarding process for you.
                      </ListItem>
                    </UnorderedList>
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                  <AccordionButton pl={0} pt={5}>
                    <AccordionIcon color="white" />
                    <Text pl={1} color="white" fontWeight="bold" fontStyle="italic" fontSize="xl">
                      Company Management Tools
                    </Text>
                  </AccordionButton>
                  <AccordionPanel>
                    <UnorderedList>
                      <ListItem color="white" fontWeight="bold">
                        Use our online platform to manage your company.
                      </ListItem>
                      <ListItem color="white" fontWeight="bold">
                        CavnessHR provides responsive HR advice to assist you with your HR challenges.
                      </ListItem>
                    </UnorderedList>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Flex>
            <Image height="75%" width="25%" mr="10%" src="https://i.ibb.co/TkLG7bZ/Girl-on-Phone-v-2.png" />
          </Flex>
        </Flex>
        <Flex backgroundColor="white" p={0}>
          <Grid templateColumns="1fr" width="100%" templateRows="1fr 1fr" p={0} backgroundColor="#EEF8FF">
            <Flex justifyContent="center">
              <Flex ml="10%" mr="10%" width="100%" justifyContent="center" alignItems="center">
                <Flex
                  mr="2.5%"
                  width="25%"
                  height="80%"
                  boxShadow="0 6px 12px grey"
                  flexDirection="column"
                  justifyContent="space-around"
                  alignItems="center"
                  backgroundColor="white">
                  <Text fontWeight="bold" fontSize="xl">
                    1-10 People
                  </Text>
                  <Text fontSize="sm">with Responsive HR Advice</Text>
                  <Flex alignItems="center" flexDirection="column">
                    <Text mt={-4} fontWeight="bold" fontSize="6xl">
                      $200
                    </Text>
                    <Text mt={-4} fontSize="xs">
                      per month
                    </Text>
                  </Flex>
                  <Image width="25%" src="https://cavnesshr.com/wp-content/uploads/2020/04/4-Ppl-1.png" />
                  <NextLink href="/waitlist">
                    <Button variant="solid" size="md" backgroundColor="#F18E26" color="white">
                      Select Plan
                    </Button>
                  </NextLink>
                </Flex>
                <Flex
                  ml="2.5%"
                  width="25%"
                  height="80%"
                  boxShadow="0 6px 12px grey"
                  flexDirection="column"
                  justifyContent="space-around"
                  alignItems="center"
                  backgroundColor="white">
                  <Text fontWeight="bold" fontSize="xl">
                    11-19 People
                  </Text>
                  <Text fontSize="sm">with Responsive HR Advice</Text>
                  <Flex flexDirection="column" alignItems="center">
                    <Text mt={-4} fontWeight="bold" fontSize="6xl">
                      $300
                    </Text>
                    <Text mt={-4} fontSize="xs">
                      per month
                    </Text>
                  </Flex>
                  <Image
                    width="25%"
                    src="https://cavnesshr.com/wp-content/uploads/2020/04/7-Ppl-1-e1586518138558.png"
                  />
                  <NextLink href="/waitlist">
                    <Button variant="solid" size="md" backgroundColor="#F18E26" color="white">
                      Select Plan
                    </Button>
                  </NextLink>
                </Flex>
              </Flex>
            </Flex>
            <Flex justifyContent="center">
              <Flex ml="10%" mr="10%" width="100%" justifyContent="center" alignItems="center">
                <Flex
                  mr="2.5%"
                  width="25%"
                  height="80%"
                  boxShadow="0 6px 12px grey"
                  flexDirection="column"
                  justifyContent="space-around"
                  alignItems="center"
                  backgroundColor="white">
                  <Text fontWeight="bold" fontSize="xl">
                    20-34 People
                  </Text>
                  <Text fontSize="sm">with Responsive HR Advice</Text>
                  <Flex alignItems="center" flexDirection="column">
                    <Text mt={-4} fontWeight="bold" fontSize="6xl">
                      $400
                    </Text>
                    <Text mt={-4} fontSize="xs">
                      per month
                    </Text>
                  </Flex>
                  <Image width="25%" src="https://cavnesshr.com/wp-content/uploads/2020/04/4-Ppl-1.png" />
                  <NextLink href="/waitlist">
                    <Button variant="solid" size="md" backgroundColor="#F18E26" color="white">
                      Select Plan
                    </Button>
                  </NextLink>
                </Flex>
                <Flex
                  ml="2.5%"
                  width="25%"
                  height="80%"
                  boxShadow="0 6px 12px grey"
                  flexDirection="column"
                  justifyContent="space-around"
                  alignItems="center"
                  backgroundColor="white">
                  <Text fontWeight="bold" fontSize="xl">
                    35-49 People
                  </Text>
                  <Text fontSize="sm">with Responsive HR Advice</Text>
                  <Flex flexDirection="column" alignItems="center">
                    <Text mt={-4} fontWeight="bold" fontSize="6xl">
                      $500
                    </Text>
                    <Text mt={-4} fontSize="xs">
                      per month
                    </Text>
                  </Flex>
                  <Image
                    width="25%"
                    src="https://cavnesshr.com/wp-content/uploads/2020/04/7-Ppl-1-e1586518138558.png"
                  />
                  <NextLink href="/waitlist">
                    <Button variant="solid" size="md" backgroundColor="#F18E26" color="white">
                      Select Plan
                    </Button>
                  </NextLink>
                </Flex>
              </Flex>
            </Flex>
          </Grid>
        </Flex>
        <Flex backgroundColor="#2E7BB4" justifyContent="center">
          <Flex ml="10%" mr="10%" width="100%" flexDirection="column" justifyContent="flex-start" alignItems="center">
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

export default ServicesPage
