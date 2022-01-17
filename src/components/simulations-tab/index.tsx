import { AddIcon } from "@chakra-ui/icons";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Tooltip,
  Text,
  IconButton,
  Box,
  HStack,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import moment from "moment";
import dynamic from "next/dynamic";
import React, { useContext, useState, useEffect } from "react";

import { SimulationSetted } from "context/SimulationContext";
import { OptionFeature } from "types/SimulationTypes";
import createIdComponent from "utils/createIdcomponent";

const SimulationTabPannel = dynamic(() => import("./SimulationTabPannel"), {
  loading: () => (
    <Flex justifyContent="center" alignItems="center" w="100%">
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

const SimulationTab = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const { simulation, setSimulation } = useContext(SimulationSetted);

  const addSimulation = () => {
    setSimulation({
      type: "add",
      payload: {
        name: "",
        idSim: Date.now(),
        idModel: 0,
        idGeo: 0,
        idGraph: 0,
        t_init: moment().format("YYYY-MM-D"),
        typeSelection: OptionFeature.None,
        initialConditions: {
          population: 0,
          R: 0,
          I: 0,
          I_d: 0,
          I_ac: 0,
          E: 0,
        },
      },
    });
  };
  useEffect(() => {
    if (simulation.length > 0) {
      setTabIndex(simulation.length - 1);
    } else {
      setTabIndex(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [simulation.length]);

  return (
    <>
      <Box h="5vh" mh="5vh">
        <Text color="#16609E" fontSize="18px" fontWeight="bold">
          Simulation
        </Text>
      </Box>
      {simulation.length > 0 ? (
        <>
          <Tabs
            display="flex"
            mt="1%"
            h="88vh"
            mh="88vh"
            index={tabIndex}
            isLazy
            onChange={(e) => {
              setTabIndex(e);
            }}
          >
            <Box>
              <Flex maxH="82vh" overflowY="auto">
                <TabList display="flex" flexDirection="column">
                  {simulation.map((sim, index) => {
                    if (sim.name !== "") {
                      return (
                        <Tab
                          key={createIdComponent()}
                          _selected={{ color: "white", bg: "blue.500" }}
                        >
                          {sim.name}
                        </Tab>
                      );
                    }
                    return (
                      <Tab
                        key={createIdComponent()}
                        _selected={{ color: "white", bg: "blue.500" }}
                      >
                        Sim {index + 1}
                      </Tab>
                    );
                  })}
                </TabList>
              </Flex>
              <Tooltip label="Create Model">
                <IconButton
                  bg="#16609E"
                  w="100%"
                  mt="4%"
                  color="#FFFFFF"
                  aria-label="Call Segun"
                  size="sm"
                  cursor="pointer"
                  _hover={{ bg: "blue.500" }}
                  icon={<AddIcon />}
                  onClick={() => addSimulation()}
                />
              </Tooltip>
            </Box>
            <TabPanels>
              {simulation.map((sim, index) => {
                return (
                  <TabPanel
                    display="flex"
                    ml="2%"
                    overflowY="auto"
                    p="0"
                    h="100%"
                    key={createIdComponent()}
                  >
                    <SimulationTabPannel
                      idModel={sim.idModel}
                      intialConditionsSim={sim.initialConditions}
                      idSimulation={sim.idSim}
                      idGeo={sim.idGeo}
                      typeSelection={sim.typeSelection}
                      index={index}
                    />
                  </TabPanel>
                );
              })}
            </TabPanels>
          </Tabs>
        </>
      ) : (
        <Tabs
          key="simulation-empty-tab"
          display="flex"
          mt="1%"
          h="80vh"
          mh="80vh"
        >
          <Tooltip label="Create Model">
            <IconButton
              bg="#16609E"
              color="#FFFFFF"
              aria-label="Call Segun"
              size="sm"
              cursor="pointer"
              _hover={{ bg: "blue.500" }}
              icon={<AddIcon />}
              onClick={() => addSimulation()}
            />
          </Tooltip>
          <HStack h="100%" w="100%" justify="center" alignItems="center">
            <Text color="gray.600" fontSize="4xl">
              Nothing Here
            </Text>
          </HStack>
        </Tabs>
      )}
    </>
  );
};
export default SimulationTab;
