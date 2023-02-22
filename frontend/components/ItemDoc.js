import { GridItem, Text } from '@chakra-ui/react'
import { FiFolder, FiFile } from 'react-icons/fi'

const ItemDoc = ({ file, isSelected, dblClickHandler, onSelectFile, onContextMenu }) => {
  return (
    <GridItem
      rounded="md"
      borderWidth="1px"
      borderColor="gray.400"
      p={2}
      color="blue.500"
      display="flex"
      alignItems="center"
      bgColor={isSelected ? 'gray.200' : 'inherit'}
      _hover={{ bgColor: 'gray.200' }}
      onClick={() => onSelectFile(file)}
      onContextMenu={onContextMenu}
      onDoubleClick={() => dblClickHandler(file)}>
      {!file.itemName.includes('.') && <FiFolder style={{ width: '60px', height: '60px' }} />}
      {file.itemName.includes('.') && <FiFile style={{ width: '60px', height: '60px' }} />}
      <Text isTruncated ml={2} userSelect="none" maxW="20ch">
        {file.itemName}
      </Text>
    </GridItem>
  )
}

export default ItemDoc
