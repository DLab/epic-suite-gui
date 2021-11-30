import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Button,
  HStack,
  IconButton,
  Icon,
  Menu,
  useDisclosure,
  Stack,
} from "@chakra-ui/react";
import Link from "next/link";

import EpicSuiteIcon from "../icons/EpicSuiteIcon";

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box color="white" px={4} bg="#16609E">
        <Flex h="8vh" alignItems="center" justifyContent="space-between">
          <IconButton
            size="md"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label="Open Menu"
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <Menu>
            <HStack spacing={8} alignItems="center">
              <Link href="/" passHref>
                <Icon
                  as={EpicSuiteIcon}
                  w={50}
                  h={50}
                  cursor="pointer"
                  aria-label="EPIc Suite Logo"
                  fill="none"
                />
              </Link>
            </HStack>
            <HStack as="nav" spacing={2} display={{ base: "none", md: "flex" }}>
              <Button colorScheme="white" variant="link">
                <Link href="/404">Documentation</Link>
              </Button>
              <Button colorScheme="white" variant="link">
                About
              </Button>
            </HStack>
          </Menu>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as="nav" spacing={2}>
              <Link href="/Documentation">Documentation</Link>
              <Link href="/About">About</Link>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
