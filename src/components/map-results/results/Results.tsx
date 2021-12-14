import { DeleteIcon } from "@chakra-ui/icons";
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
  Link,
} from "@chakra-ui/react";
// import FileSaver from "file-saver";
import dynamic from "next/dynamic";
import { useState, useEffect, useContext } from "react";

import { TabIndex } from "context/TabContext";

import Exports from "./Exports";
import SeeGraphic from "./SeeGraphic";

interface Ref {
  name: string;
  keys: string[];
}

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
  // para ver mostar las keys de los parametros en los checkbox
  const [simulationKeys, setSimulationKeys] = useState([]);
  // para ver las keys que se repiten segun key+nombre de la simulación
  const [savedSimulationKeys, setSavedSimulationKeys] = useState<string[]>([]);
  const [savedSimulation, setSavedSimulation] = useState<Ref[]>([]);
  // va juntando todas las simulaciones para poder ver más de un gráfico
  const [allGraphicData, setAllGraphicData] = useState([]);
  const { aux: responseSim } = useContext(TabIndex);
  const model = ["S", "E", "I", "R"];

  // const setInitialParameters = (data) => {
  //   let initialParameters = [];
  //   let initialId = [];
  //   data.map((simulation) => {
  //     return Object.keys(simulation).forEach((key) => {
  //       const id = `${key + simulation.name}`;
  //       if (model.includes(key) && key !== "name") {
  //         const isSimulationSaved = initialParameters.filter((sim) => {
  //           return simulation.name === sim.name;
  //         });

  //         if (isSimulationSaved.length === 0) {
  //           initialParameters = [
  //             ...initialParameters,
  //             { name: simulation.name, keys: [key] },
  //           ];
  //         } else {
  //           initialParameters = initialParameters.map((sim) => {
  //             let simulationAux = sim;
  //             if (sim.name === isSimulationSaved[0].name) {
  //               simulationAux = {
  //                 name: sim.name,
  //                 keys: [...sim.keys, key],
  //               };
  //             }

  //             return simulationAux;
  //           });
  //         }
  //         initialId = [...initialId, id];
  //       }
  //       setSavedSimulationKeys(initialId);
  //       return setSavedSimulation(initialParameters);
  //     });
  //   });
  // };

  useEffect(() => {
    const graphicData = responseSim ? JSON.parse(responseSim) : "";
    if (graphicData) {
      setSimulationKeys(graphicData);
      // setInitialParameters(graphicData);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseSim]);

  const saveKeys = (ischecked, id, value, name) => {
    const isInclude = savedSimulationKeys.includes(id);
    const isSimulationSaved = savedSimulation.filter((simulation) => {
      return simulation.name === name;
    });

    if (ischecked && !isInclude) {
      if (isSimulationSaved.length === 0) {
        setSavedSimulation([...savedSimulation, { name, keys: [value] }]);
      } else {
        setSavedSimulation(
          savedSimulation.map((simulation) => {
            let simulationAux = simulation;
            if (simulation.name === isSimulationSaved[0].name) {
              simulationAux = {
                name: simulation.name,
                keys: [...simulation.keys, value],
              };
            }

            return simulationAux;
          })
        );
      }

      return setSavedSimulationKeys([...savedSimulationKeys, id]);
    }
    if (!ischecked && isInclude) {
      let modifiedSimulations = savedSimulation.map((simulation) => {
        let simulationAux = simulation;
        if (simulation.name === isSimulationSaved[0].name) {
          const simulationAuxFiltered = simulationAux.keys.filter(
            (simulationValue) => simulationValue !== value
          );
          simulationAux = {
            name: simulation.name,
            keys: simulationAuxFiltered,
          };
        }
        return simulationAux;
      });
      modifiedSimulations = modifiedSimulations.filter((simulation) => {
        return simulation.keys.length > 0;
      });
      setSavedSimulation(modifiedSimulations);
      return setSavedSimulationKeys(
        savedSimulationKeys.filter((key) => key !== id)
      );
    }
    return savedSimulationKeys;
  };

  return (
    <Flex w="100%" p="5px" mt="15px" h="100%" textAlign="center">
      {responseSim ? (
        <>
          <Flex
            minWidth="25%"
            maxWidth="25%"
            w="25%"
            direction="column"
            justify="space-between"
          >
            <Accordion allowMultiple h="85%" overflowY="auto">
              {simulationKeys.map((simulation) => {
                return (
                  <AccordionItem bg="#16609E" mb="30px">
                    <h2>
                      <AccordionButton
                        color="white"
                        _focus={{ boxShadow: "none" }}
                      >
                        <Box flex="1" textAlign="left">
                          {simulation.name}
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
                              {Object.keys(simulation).map((key) => {
                                if (model.includes(key)) {
                                  return (
                                    <Checkbox
                                      size="sm"
                                      m="2% 5%"
                                      id={`${key + simulation.name}`}
                                      value={key}
                                      onChange={(e) => {
                                        saveKeys(
                                          e.target.checked,
                                          e.target.id,
                                          e.target.value,
                                          simulation.name
                                        );
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
                                Other Data
                              </Box>
                              <AccordionIcon />
                            </AccordionButton>
                          </h2>
                          <AccordionPanel pb={4}>
                            <Flex flexWrap="wrap">
                              {Object.keys(simulation).map((key) => {
                                if (!model.includes(key) && key !== "name") {
                                  return (
                                    <Checkbox
                                      size="sm"
                                      m="2% 5%"
                                      id={`${key + simulation.name}`}
                                      value={key}
                                      // eslint-disable-next-line sonarjs/no-identical-functions
                                      onChange={(e) => {
                                        saveKeys(
                                          e.target.checked,
                                          e.target.id,
                                          e.target.value,
                                          simulation.name
                                        );
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
                );
              })}
            </Accordion>
            <Box h="15%">
              <Button
                colorScheme="teal"
                size="md"
                mt="20px"
                minH="30px"
                onClick={() => {
                  setAllGraphicData([...allGraphicData, savedSimulation]);
                }}
              >
                Chart
              </Button>
            </Box>
          </Flex>
          <Flex w="75%" direction="column" justify="space-between">
            {allGraphicData.length > 0 ? (
              <Flex
                flexWrap="wrap"
                h="100%"
                overflowY="auto"
                justify="space-evenly"
              >
                {allGraphicData.map((graphicData, index) => {
                  return (
                    <Box>
                      <Flex justify="end">
                        {" "}
                        <SeeGraphic savedKeys={graphicData} index={index} />
                        <DeleteIcon
                          color="#16609E"
                          ml="2%"
                          cursor="pointer"
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
                        </DeleteIcon>
                      </Flex>
                      <Graphic
                        savedSimulationKeys={graphicData}
                        index={index}
                        width="470"
                        height="340"
                      />
                    </Box>
                  );
                })}
              </Flex>
            ) : (
              <Flex h="100%" justify="center" align="center">
                <Text> There are no graphics to show.</Text>
              </Flex>
            )}
            <Exports data={responseSim} />
          </Flex>
        </>
      ) : (
        <Flex h="100%" w="100%" justify="center" align="center">
          <Text> Nothing here.</Text>
        </Flex>
      )}
    </Flex>
  );
};

export default Results;
