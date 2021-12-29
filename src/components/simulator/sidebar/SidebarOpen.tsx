import { SettingsIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  BoxProps,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Icon,
  Accordion,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useContext } from "react";

import SelectorMapAccordion from "../../map-tab/selectorMap/SelectorMapAccordion";
import InitialConditions from "../controllers/InitialConditions";
import GraphBuilder from "../GraphBuilder";
import ModelBuilder from "../ModelBuilder";
import AcordionContent from "components/AcordionContent";
import GraphIcon from "components/icons/GraphIcon";
import PlanetIcon from "components/icons/PlanetIcon";
import SimulationIcon from "components/icons/SimulationIcon";
import { SimulationSetted } from "context/SimulationContext";
import { TabIndex } from "context/TabContext";
import createIdComponent from "utils/createIdcomponent";

export const MotionBox = motion<BoxProps>(Box);
// animation for entire component
const container = {
  hidden: {
    minWidth: "5%",
    width: "5%",
    transition: { delayChildren: 0.5, staggerDirection: -1, duration: 0.5 },
  },
  show: {
    minWidth: "25%",
    width: "25%",
    transition: {
      delayChildren: 0.5,
      staggerDirection: -1,
      duration: 0.5,
    },
  },
};
// animation for tablist and tabpanels
const tabListContainer = {
  hidden: {
    minWidth: "5%",
    width: "5%",
    opacity: 0,
    transition: { delayChildren: 0.5, staggerDirection: -1, duration: 0.5 },
  },
  show: {
    minWidth: "25%",
    display: "block",
    width: "100%",
    opacity: 1,
    transition: {
      delayChildren: 0.5,
      staggerDirection: -1,
      duration: 0.5,
    },
  },
};

// eslint-disable-next-line complexity
const SidebarOpen = () => {
  const { simulation, idSimulationUpdating } = useContext(SimulationSetted);

  const { index: tabIndex, setIndex } = useContext(TabIndex);
  return (
    <Tabs
      id="sidebar-tabs"
      h="90vh"
      maxHeight="90vh"
      index={tabIndex}
      onChange={(index) => setIndex(index)}
    >
      <Box display="flex" justifyContent="space-between" maxHeight="7vh">
        <TabList>
          <Tab>
            <Icon w={6} h={6} as={SettingsIcon} />
          </Tab>
          <Tab>
            <Icon w={6} h={6} as={PlanetIcon} />
          </Tab>
          <Tab>
            <Icon w={6} h={6} as={GraphIcon} />
          </Tab>
          <Tab>
            <SimulationIcon w={6} h={6} id="a" />
          </Tab>
        </TabList>
      </Box>
      <TabPanels h="83vh" maxHeight="83vh" overflowY="auto">
        <TabPanel>
          <ModelBuilder />
        </TabPanel>
        <TabPanel p="5% 0">
          <SelectorMapAccordion />
        </TabPanel>
        <TabPanel p="5% 0">
          <GraphBuilder />
        </TabPanel>
        <TabPanel p="5% 0">
          <h2 style={{ textAlign: "center", color: "#16609E" }}>
            Initial Conditions
          </h2>
          <Box p="5px" mt="15px" textAlign="center">
            {idSimulationUpdating !== 0 && simulation.length > 0 && (
              <Accordion allowMultiple>
                <AcordionContent title="Initial Conditions">
                  <InitialConditions />
                </AcordionContent>
              </Accordion>
            )}
          </Box>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default SidebarOpen;
