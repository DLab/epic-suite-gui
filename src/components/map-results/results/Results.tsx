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
  Spinner,
  Checkbox,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

// import data from "data/SEIRresults.json";

const Graphic = dynamic(() => import("./Graphic"), {
  loading: () => (
    <Flex justifyContent="center" alignItems="center">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Flex>
  ),
  ssr: false,
});
const Results = () => {
  const [simulationKeys, setSimulationKeys] = useState([]);
  const [savedSimulationKeys, setSavedSimulationKeys] = useState<string[]>([]);
  const [allGraphicData, setAllGraphicData] = useState([]);

  const model = ["S", "E", "I", "R"];

  async function getRandomPhoto() {
    const res = await fetch(`/api/simulator`, {
      method: "GET",
    });
    return res.json();
  }

  useEffect(() => {
    getRandomPhoto().then((e) => {
      const getData = e;
      setSimulationKeys(Object.keys(getData));
    });
  }, []);

  const saveKeys = (ischecked, id) => {
    const isInclude = savedSimulationKeys.includes(id);
    if (ischecked && !isInclude) {
      return setSavedSimulationKeys([...savedSimulationKeys, id]);
    }
    if (!ischecked && isInclude) {
      return setSavedSimulationKeys(
        savedSimulationKeys.filter((key) => key !== id)
      );
    }
    return savedSimulationKeys;
  };

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
              <AccordionButton color="white" _focus={{ boxShadow: "none" }}>
                <Box flex="1" textAlign="left">
                  Name 1
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} bg="#FFFFFF">
              <Accordion defaultIndex={[0]} allowMultiple>
                <AccordionItem>
                  <h2>
                    <AccordionButton _focus={{ boxShadow: "none" }}>
                      <Box flex="1" textAlign="left">
                        Results
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <Flex flexWrap="wrap">
                      {simulationKeys.map((key) => {
                        if (model.includes(key)) {
                          return (
                            <Checkbox
                              size="sm"
                              m="2% 5%"
                              id={key}
                              onChange={(e) => {
                                saveKeys(e.target.checked, e.target.id);
                              }}
                            >
                              {key}
                            </Checkbox>
                          );
                        }
                        return false;
                      })}
                    </Flex>
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                  <h2>
                    <AccordionButton _focus={{ boxShadow: "none" }}>
                      <Box flex="1" textAlign="left">
                        Parameters
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <Flex flexWrap="wrap">
                      {simulationKeys.map((key) => {
                        if (!model.includes(key)) {
                          return (
                            <Checkbox
                              size="sm"
                              m="2% 5%"
                              id={key}
                              onChange={(e) => {
                                saveKeys(e.target.checked, e.target.id);
                              }}
                            >
                              {key}
                            </Checkbox>
                          );
                        }
                        return false;
                      })}
                    </Flex>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        <Button
          colorScheme="teal"
          size="md"
          mt="20px"
          onClick={() => {
            setAllGraphicData([...allGraphicData, savedSimulationKeys]);
          }}
        >
          Chart
        </Button>
      </Flex>
      <Flex w="75%" direction="column" justify="space-between">
        <Flex flexWrap="wrap" h="100%">
          {allGraphicData.map((graphicData, index) => {
            return (
              <Box w="40%">
                <Graphic savedSimulationKeys={graphicData} />
                <Button
                  onClick={() => {
                    const aux = allGraphicData.filter((x, y) => {
                      if (y === index) {
                        return false;
                      }
                      return true;
                    });
                    setAllGraphicData(aux);
                  }}
                >
                  Delete
                </Button>
              </Box>
            );
          })}
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
