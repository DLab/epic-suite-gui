import { Box, Container, Stack, Text } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box bg="#16609E" color="white" w="100%">
      <Container
        as={Stack}
        w="100%"
        py={4}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        <Text>© 2020 Chakra Templates. All rights reserved</Text>
      </Container>
    </Box>
  );
}
