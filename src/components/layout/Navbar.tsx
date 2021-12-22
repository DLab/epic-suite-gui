import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Button,
  HStack,
  Image,
  IconButton,
  Icon,
  Menu,
  useDisclosure,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

import EpicSuiteIcon from "../icons/EpicSuiteIcon";
import createIdComponent from "utils/createIdcomponent";

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { pathname } = useRouter();
  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure();

  return (
    <>
      <Box id={createIdComponent()} color="white" px={4} bg="#16609E">
        <Flex
          id={createIdComponent()}
          h="8vh"
          alignItems="center"
          justifyContent="space-between"
        >
          <IconButton
            id={createIdComponent()}
            size="md"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label="Open Menu"
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <Menu id={createIdComponent()}>
            <HStack id={createIdComponent()} spacing={8} alignItems="center">
              <Link href="/" passHref>
                <Icon
                  id={createIdComponent()}
                  as={EpicSuiteIcon}
                  w={50}
                  h={50}
                  cursor="pointer"
                  aria-label="EPIc Suite Logo"
                  fill="none"
                />
              </Link>
            </HStack>
            {pathname === "/" && (
              <HStack
                id={createIdComponent()}
                as="nav"
                spacing={2}
                display={{ base: "none", md: "flex" }}
              >
                <Button
                  id={createIdComponent()}
                  colorScheme="white"
                  variant="link"
                >
                  <Link href="/404">Documentation</Link>
                </Button>
                <Button
                  id={createIdComponent()}
                  onClick={onOpenModal}
                  colorScheme="white"
                  variant="link"
                >
                  About
                </Button>
              </HStack>
            )}
          </Menu>
        </Flex>
        <Box id={createIdComponent()} pb={4} display={{ md: "none" }}>
          <Stack id={createIdComponent()} as="nav" spacing={2}>
            <Button id={createIdComponent()} colorScheme="white" variant="link">
              <Link href="/404">Documentation</Link>
            </Button>
            <Button
              id={createIdComponent()}
              onClick={onOpenModal}
              colorScheme="white"
              variant="link"
            >
              About
            </Button>
          </Stack>
        </Box>
      </Box>
      <Modal
        id={createIdComponent()}
        isOpen={isOpenModal}
        onClose={onCloseModal}
      >
        <ModalOverlay id={createIdComponent()} />
        <ModalContent id={createIdComponent()}>
          <ModalHeader id={createIdComponent()}>About</ModalHeader>
          <ModalCloseButton id={createIdComponent()} />
          <ModalBody id={createIdComponent()}>
            <Text id={createIdComponent()} as="i" color="gray.600">
              EPIc Suite is an open source application developed by the
              Computational Biology Laboratory of Fundación Ciencia & Vida,
              which is funded by the AFOSR project N° FA9550-20-1-0196.
            </Text>
            <Flex
              id={createIdComponent()}
              mt="8"
              justify="space-between"
              maxW="100%"
            >
              <Image
                id={createIdComponent()}
                src="/dlab.png"
                alt="Logo dlab"
                w="32%"
                h="fit-content"
              />
              <Image
                id={createIdComponent()}
                src="/fundacion.png"
                alt="Logo Fundación Ciencia y Vida"
                w="32%"
                h="fit-content"
              />
              <Image
                id={createIdComponent()}
                src="/afosr.png"
                alt="Logo dlab"
                w="25%"
                h="fit-content"
              />
            </Flex>
          </ModalBody>
          <ModalFooter id={createIdComponent()}>
            <Button
              id={createIdComponent()}
              colorScheme="blue"
              mr={3}
              onClick={onCloseModal}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
