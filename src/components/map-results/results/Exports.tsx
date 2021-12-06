import { Flex, Button, Text } from "@chakra-ui/react";
import React from "react";

const Exports = () => {
  return (
    <Flex
      direction="column"
      alignItems="center"
      borderTop="1px solid #a7a1a1d6"
      m="0 5%"
    >
      <Text mt="1%">Exports</Text>
      <Flex w="100%" justify="space-around">
        <Button colorScheme="teal" size="md" mt="20px">
          CSV
        </Button>
        <Button colorScheme="teal" size="md" mt="20px">
          JSON
        </Button>
      </Flex>
    </Flex>
  );
};

export default Exports;
