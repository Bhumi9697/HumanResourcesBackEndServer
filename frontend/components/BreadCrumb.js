import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Text } from '@chakra-ui/react'
import { FiChevronRight } from 'react-icons/fi'

const CustomBreadCrumb = ({ onNavigate, path }) => {
  return (
    <Breadcrumb mb="2" spacing="8px" color="gray.700" separator={<FiChevronRight color="gray.500" />}>
      {path.map((pathName, index) => {
        const finalPathName = pathName === '/' ? 'Home' : pathName
        return (
          <BreadcrumbItem key={pathName}>
            {index === path.length - 1 && <Text>{finalPathName}</Text>}
            {index !== path.length - 1 && (
              <BreadcrumbLink
                onClick={(e) => {
                  e.preventDefault()
                  onNavigate(path.slice(0, index + 1))
                }}
                _hover={{ color: 'blue.500' }}>
                {finalPathName}
              </BreadcrumbLink>
            )}
          </BreadcrumbItem>
        )
      })}
    </Breadcrumb>
  )
}

export default CustomBreadCrumb
