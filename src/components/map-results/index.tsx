import {
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Flex,
  Center,
  Spinner,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";

import Exports from "./Exports";
import ModelsTab from "./ModelsTab";
import Results from "./results/Results";

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
  return (
    <Tabs isLazy maxHeight="80vh">
      <TabList maxHeight="7vh">
        <Tab id="map">Models</Tab>
        <Tab id="map">Map</Tab>
        <Tab id="results">Results</Tab>
        <Tab id="exports">Exports</Tab>
      </TabList>
      <TabPanels>
        <TabPanel maxHeight="73vh" height="73vh" bg="#FAFAFA" overflowY="auto">
          <ModelsTab />
        </TabPanel>
        <TabPanel maxHeight="73vh" css={{ position: "relative" }}>
          <Map />
        </TabPanel>
        <TabPanel maxHeight="73vh" height="73vh" bg="#FAFAFA" overflowY="auto">
          <Flex h="100%">
            <Center w="100%">
              <Results />
            </Center>
          </Flex>
        </TabPanel>
        <TabPanel maxHeight="73vh" height="73vh">
          <Flex h="100%">
            <Center w="100%" bg="blue.500">
              <Exports />
            </Center>
          </Flex>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default MapResult;
