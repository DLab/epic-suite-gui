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
  Icon,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useContext } from "react";

import GraphTab from "../graphTab/GraphTab";
import EpicSuiteIcon from "../icons/EpicSuiteIcon";
import Results from "../map-results/results/Results";
import ModelsTab from "../models-tab/ModelsTab";
import SimulationTab from "../simulations-tab";
import RunSimulatorButton from "../simulations-tab/RunSimulatorButton";
import GraphIcon from "components/icons/GraphIcon";
import InfoIcon from "components/icons/InfoIcon";
import ModelsIcon from "components/icons/ModelsIcon";
import PlanetIcon from "components/icons/PlanetIcon";
import ResultsIcon from "components/icons/ResultsIcon";
import SimulationIcon from "components/icons/SimulationIcon";
import { TabIndex } from "context/TabContext";

const Map = dynamic(() => import("../map-tab"), {
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

const MainContentTab = () => {
  const { index: tabIndex, setIndex } = useContext(TabIndex);
  return (
    <Tabs
      id="tab-content"
      h="100vh"
      isLazy
      index={tabIndex}
      onChange={(index) => setIndex(index)}
      display="flex"
    >
      <TabList
        display="flex"
        flexDirection="column"
        h="100vh"
        bg="#16609E"
        border="none"
      >
        <Box textAlign="center" m="10% 0">
          <Icon
            as={EpicSuiteIcon}
            w={50}
            h={50}
            aria-label="EPIc Suite Logo"
            fill="none"
          />
        </Box>
        <Flex direction="column" h="100%" justify="space-between" mt="15%">
          <Box>
            <Tab _focus={{ background: "#2F8BD8", border: "none" }}>
              <Icon w={6} h={6} as={ModelsIcon} color="#FFFFFF" m="20% 0" />
            </Tab>
            <Tab _focus={{ background: "#2F8BD8", border: "none" }}>
              <Icon w={6} h={6} as={PlanetIcon} color="#FFFFFF" m="20% 0" />
            </Tab>
            <Tab _focus={{ background: "#2F8BD8", border: "none" }}>
              <Icon w={6} h={6} as={GraphIcon} color="#FFFFFF" m="20% 0" />
            </Tab>
            <Tab _focus={{ background: "#2F8BD8", border: "none" }}>
              <SimulationIcon w={6} h={6} color="#FFFFFF" id="a" m="20% 0" />
            </Tab>
            <Tab _focus={{ background: "#2F8BD8", border: "none" }}>
              <Icon w={6} h={6} as={ResultsIcon} color="#FFFFFF" m="20% 0" />
            </Tab>
          </Box>
          <Box textAlign="center" m="10% 0">
            <Icon w={7} h={7} as={InfoIcon} color="#FFFFFF" mb="15%" />
          </Box>
        </Flex>
      </TabList>
      <TabPanels h="100vh" bg="#F2F2F0">
        <TabPanel overflowY="auto">
          <ModelsTab />
        </TabPanel>
        <TabPanel h="100vh" overflowY="auto" bg="#F2F2F0">
          <Map />
        </TabPanel>
        <TabPanel h="100%">
          <Flex h="100%">
            <GraphTab />
          </Flex>
        </TabPanel>
        <TabPanel maxH="100vh" h="100%">
          <SimulationTab />
          {/* <Box mt="2%">
            <Center>
              {" "}
              <RunSimulatorButton />{" "}
            </Center>
          </Box> */}
        </TabPanel>
        <TabPanel>
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

export default MainContentTab;
