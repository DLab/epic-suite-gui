import {
  Box,
  Flex,
  Button,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

const Results = () => {
  return (
    <Flex w="100%" p="5px" mt="15px" h="100%" textAlign="center">
      <Flex
        minWidth="25%"
        maxWidth="25%"
        w="25%"
        direction="column"
        justify="space-between"
      >
        <Accordion allowMultiple>
          <AccordionItem bg="#16609E" mb="30px">
            <h2>
              <AccordionButton color="white">
                <Box flex="1" textAlign="left">
                  Name 1
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} bg="#FFFFFF">
              Contenido
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem bg="#16609E" mb="30px">
            <h2>
              <AccordionButton color="white">
                <Box flex="1" textAlign="left">
                  Name 2
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} bg="#FFFFFF">
              Contenido
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        <Button colorScheme="teal" size="md" mt="20px">
          Chart
        </Button>
      </Flex>
      <Flex w="75%" direction="column" justify="space-between">
        <Flex flexWrap="wrap" h="100%">
          <Box w="40%" h="40%">
            Gráfico 1
          </Box>
          <Box w="40%" h="40%">
            Gráfico 2
          </Box>
          <Box w="40%" h="40%">
            Gráfico 3
          </Box>
          <Box w="40%" h="40%">
            Gráfico 4
          </Box>
        </Flex>
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
      </Flex>
    </Flex>
  );
};

export default Results;
