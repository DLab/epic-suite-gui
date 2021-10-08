import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Menu,
  useDisclosure,
  Stack,
} from "@chakra-ui/react";
import Link from "next/link";

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box color="white" px={4} bg="#16609E">
        <Flex h="11vh" alignItems="center" justifyContent="space-between">
          <IconButton
            size="md"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label="Open Menu"
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <Menu>
            <HStack spacing={8} alignItems="center">
              <Link href="/">Logo</Link>
            </HStack>
            <HStack as="nav" spacing={4} display={{ base: "none", md: "flex" }}>
              <Link href="/404">Documentation</Link>
              <Link href="/404">About</Link>
              <Link href="/404">Logo 1</Link>
              <Link href="/404">Logo 2</Link>
            </HStack>
          </Menu>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as="nav" spacing={4}>
              <Link href="/Documentation">Documentation</Link>
              <Link href="/About">About</Link>
              <Link href="/404">Logo 1</Link>
              <Link href="/404">Logo 2</Link>
            </Stack>
          </Box>
        ) : null}
      </Box>

      {/* <Box p={4}>Main Content Here</Box> */}
    </>
  );
}
