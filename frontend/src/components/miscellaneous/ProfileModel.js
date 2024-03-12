import React from 'react'
import {useDisclosure} from "@chakra-ui/hooks";
import {Button,IconButton} from "@chakra-ui/button"
import {Image,Text} from "@chakra-ui/react"
import {ViewIcon} from"@chakra-ui/icons";import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

const ProfileModel = ({user,children}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
  
      <>
      {children?(
       <span onClick={onOpen}>{children}</span> 
      ):(
        <IconButton
        d={{base:"flex"}}
        icon={<ViewIcon/>}
        onClick={onOpen}
        />
      )}
      <Modal size="lg" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent h="410px">
          <ModalHeader
            fontSize="40px"
            fontFamily="Work sans"
            d="flex"
            justifyContent="center"
          >{user.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody
           d="flex"
           flexDir="column"
           alignItems="center"
           justifyContent="space-between"
          >
             <Image
              borderRadius="full"
              boxSize="150px"
              src={user.pic}
              alt={user.name}
             />
             <Text
              fontSize={{base:"28px",md:"30px"}}
              fontFamily="Work sans"
             />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
           
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
    );
};

export default ProfileModel
