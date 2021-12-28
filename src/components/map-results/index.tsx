import {
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Flex,
  Center,
  Spinner,
  Box,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useContext } from "react";

import { TabIndex } from "context/TabContext";
import createIdComponent from "utils/createIdcomponent";

import GraphTab from "./GraphTab";
import ModelsTab from "./ModelsTab";
import Results from "./results/Results";
import RunSimulatorButton from "./RunSimulatorButton";
import SimulationTab from "./SimulationTab";

const Map = dynamic(() => import("./Map"), {
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

const MapResult = () => {
  const { index: tabIndex, setIndex } = useContext(TabIndex);
  return (
    <Tabs
      id="tab-content"
      isLazy
      maxHeight="84vh"
      index={tabIndex}
      onChange={(index) => setIndex(index)}
    >
      <TabList maxHeight="7vh">
        <Tab>Models</Tab>
        <Tab>Map</Tab>
        <Tab>Graph</Tab>
        <Tab>Simulation</Tab>
        <Tab>Results</Tab>
      </TabList>
      <TabPanels>
        <TabPanel maxHeight="77vh" height="77vh" bg="#FAFAFA" overflowY="auto">
          <ModelsTab />
        </TabPanel>
        <TabPanel
          maxHeight="77vh"
          height="77vh"
          css={{ position: "relative" }}
          bg="#FAFAFA"
          overflowY="auto"
        >
          <Map />
        </TabPanel>
        <TabPanel maxHeight="77vh" height="77vh">
          <Flex h="100%">
            <Center w="100%">
              <GraphTab />
            </Center>
          </Flex>
        </TabPanel>
        <TabPanel maxHeight="77vh" height="77vh">
          <SimulationTab />
          <Box h="8%">
            <Center>
              <RunSimulatorButton />
            </Center>
          </Box>
        </TabPanel>
        <TabPanel maxHeight="77vh" height="77vh" bg="#FAFAFA">
          <Flex h="100%">
            <Center w="100%">
              <Results />
            </Center>
          </Flex>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default MapResult;
