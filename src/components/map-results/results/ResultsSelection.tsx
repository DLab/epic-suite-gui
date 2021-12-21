import {
  Box,
  Flex,
  Button,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Checkbox,
} from "@chakra-ui/react";
import React, { useEffect, useContext } from "react";

import { GraphicsData } from "context/GraphicsContext";
import { TabIndex } from "context/TabContext";
import createIdComponent from "utils/createIdcomponent";

const ResultsSelection = () => {
  const { aux: responseSim } = useContext(TabIndex);
  const {
    simulationKeys,
    setSimulationKeys,
    savedSimulation,
    savedSimulationKeys,
    setSavedSimulationKeys,
    setSavedSimulation,
  } = useContext(GraphicsData);

  const model = ["S", "E", "I", "R"];

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

  useEffect(() => {
    const graphicData = responseSim ? JSON.parse(responseSim) : "";
    if (graphicData) {
      setSimulationKeys(graphicData);
      // setInitialParameters(graphicData);
    }
    setSavedSimulationKeys([]);
    setSavedSimulation([]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseSim]);

  return (
    <Accordion id={createIdComponent()} allowMultiple h="85%" overflowY="auto">
      {simulationKeys.map((simulation) => {
        return (
          <AccordionItem id={createIdComponent()} bg="#16609E" mb="30px">
            <h2 id={createIdComponent()}>
              <AccordionButton
                id={createIdComponent()}
                color="white"
                _focus={{ boxShadow: "none" }}
              >
                <Box id={createIdComponent()} flex="1" textAlign="left">
                  {simulation.name}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel id={createIdComponent()} pb={4} bg="#FFFFFF">
              <Accordion
                id={createIdComponent()}
                defaultIndex={[0]}
                allowMultiple
              >
                <AccordionItem id={createIdComponent()}>
                  <h2 id={createIdComponent()}>
                    <AccordionButton
                      id={createIdComponent()}
                      _focus={{ boxShadow: "none" }}
                      p="2% 0"
                    >
                      <Box id={createIdComponent()} flex="1" textAlign="left">
                        Results
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel id={createIdComponent()} pb={4}>
                    <Flex id={createIdComponent()} flexWrap="wrap">
                      {Object.keys(simulation).map((key, index) => {
                        if (model.includes(key)) {
                          return (
                            <Checkbox
                              id={createIdComponent()}
                              size="sm"
                              m="2% 5%"
                              // id={`${key + simulation.name}`}
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
                  <h2 id={createIdComponent()}>
                    <AccordionButton
                      id={createIdComponent()}
                      _focus={{ boxShadow: "none" }}
                    >
                      <Box id={createIdComponent()} flex="1" textAlign="left">
                        Other Data
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel id={createIdComponent()} pb={4}>
                    <Flex id={createIdComponent()} flexWrap="wrap">
                      {Object.keys(simulation).map((key) => {
                        if (!model.includes(key) && key !== "name") {
                          return (
                            <Checkbox
                              id={createIdComponent()}
                              size="sm"
                              m="2% 5%"
                              // id={`${key + simulation.name}`}
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
  );
};

export default ResultsSelection;
