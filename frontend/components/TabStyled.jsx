import { Tab } from '@chakra-ui/react'
const TabStyled = ({ title }) => {
  return (
    <Tab
      _selected={{
        borderRadius: 'md',
        backgroundColor: 'hsl(220deg 47% 36% / 15%)',
        color: 'hsl(220deg 47% 36%)'
      }}
      _focus={{ border: 'none' }}>
      {title}
    </Tab>
  )
}

export default TabStyled
