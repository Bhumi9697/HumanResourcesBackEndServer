import NextLink from 'next/link'
import { Flex, Text, Button, Image } from '@chakra-ui/react'
export const name = 'Norbert Soto'

export default function Card({ type }) {
  return (
    <Flex
      p={2}
      bg="white"
      boxShadow="0 6px 12px grey"
      flexDirection="column"
      justifyContent="space-around"
      alignItems="center">
      <Text fontWeight="bold" fontSize="xl">
        {type.plan}
      </Text>
      <Text fontSize="sm">{type.hr}</Text>
      <Flex flexDirection="column" alignItems="center" justifyContent="flex-start" p={0}>
        <Text textAlign="center" fontWeight="bold" fontSize="6xl" mt={-4}>
          ${type.price}
        </Text>
        <Text fontSize="xs" mt={-4}>
          per month
        </Text>
      </Flex>
      <Image width="25%" src={type.img} />
      <NextLink href="/waitlist">
        <Button variant="solid" size="md" backgroundColor="#F18E26" color="white">
          Select Plan
        </Button>
      </NextLink>
    </Flex>
  )
}
