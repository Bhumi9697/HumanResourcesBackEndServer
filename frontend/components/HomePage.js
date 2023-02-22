import { useState } from 'react'
import NextLink from 'next/link'
import Card from '@/components/Card'
import {
  ChakraProvider,
  Select,
  Grid,
  Flex,
  Link,
  Text,
  Button,
  Image,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  UnorderedList,
  ListItem
} from '@chakra-ui/react'
import { InfoIcon, EmailIcon, BellIcon } from '@chakra-ui/icons'

const plans = [
  {
    plan: '1-10 People',
    hr: 'with Responsive HR',
    price: 200,
    img: 'https://i.ibb.co/KWZmv9K/realjust-HR-Blue.png'
  },
  {
    plan: '11-19 People',
    hr: 'with Responsive HR',
    price: 300,
    img: 'https://i.ibb.co/KWZmv9K/realjust-HR-Blue.png'
  },
  {
    plan: '20-34 People',
    hr: 'with Responsive HR',
    price: 400,
    img: 'https://i.ibb.co/KWZmv9K/realjust-HR-Blue.png'
  },
  {
    plan: '35-49 People',
    hr: 'with Responsive HR',
    price: 500,
    img: 'https://i.ibb.co/KWZmv9K/realjust-HR-Blue.png'
  }
]

const HomePage = () => {
  const [select, setSelect] = useState('')

  const handleSelect = (e) => {
    setSelect({ value: e.target.value })
  }

  /* useEffect(() => {
    if (document.cookie.includes('viewed-newsletter-modal')) return

    setTimeout(onOpen, 10000)
    return () => onClose()
  }, []) */

  /*  const handleClose = () => {
    onClose()
    cookie.set('viewed-newsletter-modal', true, {
      expires: 1
    })
  } */

  /*  const submitData = async (e) => {
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
      handleClose()
      toast({
        title: 'Success!',
        description: 'You will now start receiving our newsletter',
        status: 'success',
        duration: 5000,
        isClosable: true
      })
    } catch (error) {
      toast({
        title: 'Error found',
        description: 'Something went wrong, please try again',
        status: 'error',
        duration: 5000,
        isClosable: true
      })
    }
  } */

  /*   const submitNewsletterData = async (e) => {
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
        title: 'Error found!',
        description: 'Something went wrong, please try again',
        status: 'error',
        duration: 5000,
        isClosable: true
      })
    }
  } */

  const selectedCard = (value) => {
    for (var i = 0; i < plans.length; i++) {
      if (Number(value) === plans[i].price) {
        return <Card type={plans[i]} />
      }
    }

    return
  }
  return (
    <ChakraProvider resetCSS>
      {/* <Modal isOpen={isOpen} onClose={handleClose} initialFocusRef={initialRef}>
        <ModalOverlay />
        <ModalContent backgroundColor="#EEF8FF" p={8}>
          <ModalHeader fontWeight="bold" fontSize="2xl" color="#064D7F">
            Welcome to CavnessHR!
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex
              width="100%"
              alignItems="stretch"
              backgroundColor="#064D7F"
              borderRadius="12px"
              flexDirection="column"
              p={4}
              justifyContent="flex-start"
            >
              <Text fontWeight="bold" fontSize="xl" color="#EEF8FF" p={2}>
                HR Advice sent to your inbox weekly:
              </Text>
              <Flex>
                <Input
                  placeholder="Email"
                  variant="outline"
                  width="100%"
                  mt={4}
                  mb={4}
                  color="white"
                  ref={initialRef}
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </Flex>
              <Button
                variant="solid"
                size="md"
                width="100%"
                backgroundColor="#F18E26"
                color="white"
                onClick={submitData}
              >
                I&apos;m in!
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal> */}

      <Grid templateColumns="1fr" templateRows="8rem 40rem 30rem 63rem 25rem" p={0} height="100vh" overflow="scroll">
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
              <NextLink href="/contact-us">
                <Text color="#0072B9" fontWeight="bold" fontSize="xl" _hover={{ cursor: 'pointer', color: '#F18E26' }}>
                  Contact Us
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
        <Flex backgroundColor="#EEF8FF" justifyContent="center" p={0}>
          <Flex width="100%" ml="10%" mr="10%" height="100%" alignItems="center" justifyContent="space-between">
            <Flex
              width="40%"
              height="80%"
              mb="5%"
              backgroundColor="white"
              borderRadius="12px"
              ml="4%"
              boxShadow="0 0 10px grey"
              flexDirection="column"
              justifyContent="center"
              alignItems="center">
              <Text
                color="#064D7F"
                fontWeight="bold"
                fontSize="3xl"
                textAlign="center"
                width="95%"
                letterSpacing="wide"
                mb="10%">
                Focus on your business, we&apos;ve got your HR
              </Text>
              <Text color="#2E70B6" fontWeight="bold" textAlign="left" width="75%" mt="-5%" mb="10%">
                At CavnessHR, our goal is to help small business owners save both time and money. We offer different
                solutions based on the number of workers. Get started now.
              </Text>
              <Text color="#2E70B6" fontWeight="bold" textAlign="left" width="75%" mt="-5%" mb="1%">
                Choose company size:
              </Text>
              <Select onChange={handleSelect} size="md" width="75%" bg="#F18E26" outline="#F18E26" color="white">
                {plans.map((e) => {
                  return (
                    <option style={{ background: '#F18E26' }} value={e.price} key={e.plan}>
                      {e.plan}
                    </option>
                  )
                })}
              </Select>
            </Flex>
            <Flex flexDirection="column">
              <Flex justifyContent="center" alignItems="flex-start">
                <Text fontWeight="bold" textAlign="center" fontSize="3xl" color="#064D7F" p={2} mt="2%">
                  Pricing
                </Text>
              </Flex>
              <Flex justifyContent="center" alignItems="flex-start" height="100%">
                <Flex width="100%" height="100%" ml="10%" mr="10%" justifyContent="center" alignItems="center">
                  {select ? selectedCard(select.value) : <Card type={plans[0]} />}
                </Flex>
              </Flex>
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
          <Grid templateColumns="1fr" width="100%" templateRows="0.4fr 2fr 3fr 3fr" p={0}>
            <Flex
              justifyContent="space-around"
              alignItems="center"
              backgroundColor="#EEF8FF"
              ml="10%"
              mr="10%"
              flexDirection="column">
              <Text color="#064D7F" fontWeight="bold" fontSize="3xl">
                Accomplishments
              </Text>
              <Flex width="100%" height="40%" justifyContent="space-around" alignItems="center">
                <Image
                  width="10%"
                  src="https://i0.wp.com/technewsrprt.com/wp-content/uploads/2017/11/01.11.17_technewsrprt_future-labs.png?w=584"
                  alt="future labs"
                />
                <Image
                  width="25%"
                  src="https://images.squarespace-cdn.com/content/v1/57178f12b654f9906ac99ec3/1507825906928-470YBH21NJXODPMT3RSN/PBC_LOGO_Long.png"
                  alt="patriot boot camp"
                />
                <Image
                  width="25%"
                  src="https://news.hofstra.edu/wp-content/uploads/2020/12/news-festured-veterans-venture-challenge.jpg"
                />
              </Flex>
              <Flex width="100%" height="40%" justifyContent="space-around" alignItems="flex-start">
                <Image
                  height="90%"
                  width="25%"
                  src="https://bluestarfam.org/wp-content/uploads/2019/06/bunker-labs-logo-final-white-trans-1024x450-1-1.png"
                />
                <Image
                  height="90%"
                  width="25%"
                  src="https://cobizrichmond.com/wp-content/uploads/2020/05/COBIZ-LOGO.jpg"
                />
                <Image
                  height="90%"
                  width="25%"
                  src="https://d24wuq6o951i2g.cloudfront.net/img/events/id/308/3083285/assets/b8e.201710-VIR_BunkerLabs_lockup_final.png"
                />
              </Flex>
            </Flex>
            <Flex
              p={2}
              ml="10%"
              mr="10%"
              border="8px solid #F18E26"
              flexDirection="column"
              alignItems="center"
              justifyContent="space-between">
              <Text color="#064D7F" fontWeight="bold" fontSize="3xl" pt={2}>
                Partners
              </Text>
              <Flex width="100%" height="40%" justifyContent="space-around" alignItems="center" mb={5}>
                <Image
                  width="18%"
                  src="https://res.cloudinary.com/softwarepundit/image/upload/c_limit,dpr_1.0,f_auto,h_1600,q_auto,w_1600/v1/software/tawkto-logo"
                />
                <Image
                  width="10%"
                  src="https://thegenesisgrindhome.files.wordpress.com/2022/03/cropped-thegenesishome-logo_05-1.png"
                />
                <Image
                  width="12%"
                  src="https://static.wixstatic.com/media/64e3d3_3c470afe8da64482860dd74d4ebf2c0e~mv2.png/v1/fill/w_1098,h_540,al_c,enc_auto/64e3d3_3c470afe8da64482860dd74d4ebf2c0e~mv2.png"
                />
              </Flex>
              <Flex width="100%" height="40%" justifyContent="space-around" alignItems="flex-start" mb={5}>
                <Image
                  width="14%"
                  src="https://i.pcmag.com/imagery/reviews/01o3DGbmyfdZyMT6npPUZsB-15..1569476424.jpg"
                />
                <Image width="12%" src="https://novapointcapital.com/wp-content/uploads/2018/08/nova-point-2.png" />
                <Image
                  width="11%"
                  src="https://images.squarespace-cdn.com/content/v1/612aaaa0160244785859f02a/fe460de9-4854-4954-9157-b73660b8dbd5/Zccounting+Logo.png?format=1500w"
                />
              </Flex>
              <Flex width="100%" height="40%" justifyContent="space-around" alignItems="flex-start">
                <Image
                  width="14%"
                  src="https://offers.everee.com/hs-fs/hubfs/EVEREE_logo_blue_logo_line_black.png?width=1033&name=EVEREE_logo_blue_logo_line_black.png"
                />
              </Flex>
            </Flex>
          </Grid>
        </Flex>
        <Flex backgroundColor="#2E7BB4" justifyContent="center">
          <Flex ml="10%" mr="10%" width="100%" flexDirection="column" justifyContent="flex-start" alignItems="center">
            {/*             <Flex
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

export default HomePage
