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
    <Flex id={createIdComponent()} justifyContent="center" alignItems="center">
      <Spinner
        id={createIdComponent()}
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
      id={createIdComponent()}
      isLazy
      maxHeight="84vh"
      index={tabIndex}
      onChange={(index) => setIndex(index)}
    >
      <TabList maxHeight="7vh" id={createIdComponent()}>
        <Tab id={createIdComponent()}>Models</Tab>
        <Tab id={createIdComponent()}>Map</Tab>
        <Tab id={createIdComponent()}>Graph</Tab>
        <Tab id={createIdComponent()}>Simulation</Tab>
        <Tab id={createIdComponent()}>Results</Tab>
      </TabList>
      <TabPanels id={createIdComponent()}>
        <TabPanel
          id={createIdComponent()}
          maxHeight="77vh"
          height="77vh"
          bg="#FAFAFA"
          overflowY="auto"
        >
          <ModelsTab />
        </TabPanel>
        <TabPanel
          id={createIdComponent()}
          maxHeight="77vh"
          height="77vh"
          css={{ position: "relative" }}
          bg="#FAFAFA"
          overflowY="auto"
        >
          <Map />
        </TabPanel>
        <TabPanel id={createIdComponent()} maxHeight="77vh" height="77vh">
          <Flex id={createIdComponent()} h="100%">
            <Center id={createIdComponent()} w="100%">
              <GraphTab />
            </Center>
          </Flex>
        </TabPanel>
        <TabPanel id={createIdComponent()} maxHeight="77vh" height="77vh">
          <SimulationTab />
          <Box id={createIdComponent()} h="8%">
            <Center id={createIdComponent()}>
              <RunSimulatorButton />
            </Center>
          </Box>
        </TabPanel>
        <TabPanel
          id={createIdComponent()}
          maxHeight="77vh"
          height="77vh"
          bg="#FAFAFA"
        >
          <Flex id={createIdComponent()} h="100%">
            <Center id={createIdComponent()} w="100%">
              <Results />
            </Center>
          </Flex>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default MapResult;
