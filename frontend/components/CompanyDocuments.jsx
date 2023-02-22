import { useEffect, useState, useRef } from 'react'
import { Storage } from 'aws-amplify'
import { useOutsideClick, useToast } from '@chakra-ui/react'
import { Spinner, Box, Heading, Grid, Text, Flex, Menu, MenuList, MenuItem } from '@chakra-ui/react'
import BreadCrumb from '@/components/BreadCrumb'
import ItemDoc from '@/components/ItemDoc'
import MotionBox from '@/components/MotionBox'

const motionVariants = {
  enter: {
    visibility: 'visible',
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.1,
      ease: [0.4, 0, 0.2, 1]
    }
  },
  exit: {
    transitionEnd: {
      visibility: 'hidden'
    },
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.1,
      easings: 'easeOut'
    }
  }
}

const sortFilesByType = (item) => {
  if (item.itemName.includes('.')) {
    return 1
  }

  if (!item.itemName.includes('.')) {
    return -1
  }

  return 0
}

const convertBytesToMegabytes = (sizeInBytes) => (sizeInBytes / (1024 * 1024)).toFixed(2)

const CompanyDocuments = ({ companyID }) => {
  const [isDownloading, setIsDownloading] = useState(false)
  const contextMenuItem = useRef(null)
  const mousePosition = useRef({ x: 0, y: 0 })
  const [path, setPath] = useState(['/'])
  const [selectedItem, setSelectedItem] = useState(null)
  const companyDocs = useRef(null)
  const [items, setItems] = useState([])
  const menuRef = useRef(null)
  const [menuData, setMenuData] = useState({
    position: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    },
    isMenuOpen: false
  })
  const toast = useToast()

  useEffect(() => {
    let left
    let right
    let top
    let bottom

    const x = mousePosition.current.x
    const y = mousePosition.current.y

    const menuHeight = menuRef?.current?.clientHeight
    const menuWidth = menuRef?.current?.clientWidth
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight
    if (!menuHeight || !menuWidth) {
      return
    }
    if (x + menuWidth > windowWidth) {
      right = windowWidth - x
    } else {
      left = x
    }
    if (y + menuHeight > windowHeight) {
      bottom = windowHeight - y
    } else {
      top = y
    }
    setMenuData((prev) => ({
      ...prev,
      position: {
        top: `${top}px`,
        bottom: `${bottom}px`,
        left: `${left}px`,
        right: `${right}px`
      }
    }))
  }, [menuRef, mousePosition.current.x, mousePosition.current.y])

  const processStorageList = (results) => {
    const filesystem = {}
    // https://stackoverflow.com/questions/44759750/how-can-i-create-a-nested-object-representation-of-a-folder-structure
    const add = (source, target, item) => {
      const elements = source.split('/')
      const element = elements.shift()
      if (!element) return // blank
      target[element] = target[element] || { __data: item } // element;
      if (elements.length) {
        target[element] = typeof target[element] === 'object' ? target[element] : {}
        add(elements.join('/'), target[element], item)
      }
    }
    results.forEach((item) => add(item.key, filesystem, item))
    return filesystem
  }

  const getItemsFromEntireObject = (path) => {
    let finalRes = []
    if (path.length === 1) {
      const keys = Object.keys(companyDocs.current.all).filter((item) => item !== '__data')
      finalRes = keys.map((key) => ({ ...companyDocs.current.all[key].__data, itemName: key }))
      return finalRes.sort(sortFilesByType)
    }

    const newPath = path.slice(1)
    companyDocs.current.currentFolder = { ...companyDocs.current.all }
    newPath.forEach((item) => {
      companyDocs.current.currentFolder = companyDocs.current.currentFolder[item]
    })

    const keys = Object.keys(companyDocs.current.currentFolder).filter((item) => item !== '__data')
    finalRes = keys.map((key) => ({ ...companyDocs.current.currentFolder[key].__data, itemName: key }))
    return finalRes.sort(sortFilesByType)
  }

  useOutsideClick({
    ref: menuRef,
    handler: () => {
      // close all menus
      setMenuData((prev) => ({
        ...prev,
        isMenuOpen: false
      }))
    }
  })

  useEffect(() => {
    // get folder from s3
    ;(async () => {
      const rootFolder = await Storage.list(`companies/${companyID}/`)
      if (rootFolder.length === 0) return
      const nestedFiles = processStorageList(rootFolder)

      companyDocs.current = {
        all: { ...nestedFiles['companies'][companyID] },
        currentFolder: { ...nestedFiles['companies'][companyID] }
      }
      const res = getItemsFromEntireObject(['/'])
      setItems(res)
    })()
  }, [])

  const dblClickHandler = (file) => {
    if (file.itemName.includes('.')) return
    setPath((prev) => [...prev, file.itemName])
    const result = getItemsFromEntireObject([...path, file.itemName])
    setItems(result)
    setSelectedItem(null)
  }

  const navigateToFolder = (path) => {
    setPath(path)
    const res = getItemsFromEntireObject(path)
    setItems(res)
    setSelectedItem(null)
  }

  const downloadBlob = (blob, filename) => {
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename || 'download'
    const clickHandler = () => {
      setTimeout(() => {
        URL.revokeObjectURL(url)
        a.removeEventListener('click', clickHandler)
      }, 150)
    }
    a.addEventListener('click', clickHandler, false)
    a.click()
    return a
  }

  const downloadHandler = async () => {
    const { key: url, itemName } = contextMenuItem.current

    try {
      setIsDownloading(true)
      const file = await Storage.get(url, { download: true })
      downloadBlob(file.Body, itemName || 'cavnessHRdoc')
    } catch (error) {
      toast({
        title: 'Oops!',
        description: 'There was an error downloading the file, please try again.',
        status: 'error',
        duration: 3000
      })
      setIsDownloading(false)
    } finally {
      setIsDownloading(false)
      setMenuData((prev) => ({
        ...prev,
        isMenuOpen: false
      }))
    }
  }

  return (
    <>
      <Box my={3}>
        <Heading mb="3" fontWeight="normal" letterSpacing="tight" color="gray.700" size="lg">
          File Explorer
        </Heading>
        <BreadCrumb onNavigate={navigateToFolder} path={path} />
        <Box boxShadow="md" rounded="md" bgColor="white" p="2">
          <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={6}>
            {items?.length === 0 && <Text>Empty Folder</Text>}
            {items?.map((file) => (
              <ItemDoc
                key={file.key}
                file={file}
                isSelected={file.key === selectedItem?.key}
                dblClickHandler={dblClickHandler}
                onSelectFile={setSelectedItem}
                onContextMenu={(event) => {
                  event.preventDefault()
                  if (!file.itemName.includes('.')) return

                  mousePosition.current = {
                    x: event.clientX,
                    y: event.clientY
                  }
                  contextMenuItem.current = file
                  setMenuData((prev) => ({
                    ...prev,
                    isMenuOpen: true
                  }))
                }}
              />
            ))}
          </Grid>
          {selectedItem && (
            <Flex mt={2}>
              <Text fontWeight="bold">Name: </Text>&nbsp;
              <Text display="inline">{selectedItem.itemName}</Text>&nbsp;&nbsp;
              {selectedItem.itemName.includes('.') && (
                <>
                  <Text fontWeight="bold">Size: </Text>&nbsp;
                  <Text display="inline">{convertBytesToMegabytes(selectedItem.size)}mb</Text>
                </>
              )}
            </Flex>
          )}

          <MotionBox
            variants={motionVariants}
            animate={menuData.isMenuOpen ? 'enter' : 'exit'}
            ref={menuRef}
            borderWidth={1}
            shadow="lg"
            position="fixed"
            bg="white"
            py={1}
            minW={40}
            w={52}
            // maxW={96}
            borderRadius="md"
            display="flex"
            flexDirection="column"
            zIndex="popover"
            {...menuData.position}>
            <Menu isOpen={menuData.isMenuOpen}>
              <MenuList>
                <MenuItem onClick={downloadHandler} isDisabled={isDownloading}>
                  {!isDownloading && <>Download</>}
                  {isDownloading && (
                    <>
                      <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="md" mr={2} />
                      Downloading
                    </>
                  )}
                </MenuItem>
              </MenuList>
            </Menu>
          </MotionBox>
        </Box>
      </Box>
    </>
  )
}

export default CompanyDocuments
