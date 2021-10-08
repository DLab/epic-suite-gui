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
import Results from "./Results";
import SelectorMap from "./SelectorMap";

const Map = dynamic(() => import("./Map"), {
  loading: () => (
    <Flex h="80vh" justifyContent="center" alignItems="center">
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
    <Tabs>
      <TabList>
        <Tab>Map</Tab>
        <Tab>Results</Tab>
        <Tab>Exports</Tab>
      </TabList>
      <TabPanels>
        <TabPanel h="50%" css={{ position: "relative" }}>
          <Map />
          <SelectorMap
            w="40%"
            p="1rem"
            borderRadius="1rem"
            bgColor="white"
            css={{ position: "absolute", top: 20, right: 20 }}
          />
        </TabPanel>
        <TabPanel h="80vh">
          <Flex h="100%">
            <Center w="100%" bg="red.500">
              <Results />
            </Center>
          </Flex>
        </TabPanel>
        <TabPanel h="80vh">
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
