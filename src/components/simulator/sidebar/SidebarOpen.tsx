import { ChevronLeftIcon, SettingsIcon } from "@chakra-ui/icons";
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
import { motion, AnimatePresence } from "framer-motion";
import { useContext, useState, useEffect } from "react";

import SelectorMapAccordion from "../../map-results/selectorMap/SelectorMapAccordion";
import InitialConditions from "../controllers/InitialConditions";
import ModelBuilder from "../ModelBuilder";
import AcordionContent from "components/AcordionContent";
import PlanetIcon from "components/icons/PlanetIcon";
import SimulationIcon from "components/icons/SimulationIcon";
import { SimulationSetted } from "context/SimulationContext";

export const MotionBox = motion<BoxProps>(Box);

interface SidebarOpenProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}
const container = {
  hidden: { opacity: 0, transition: { duration: 2 } },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.5,
      staggerDirection: -1,
      duration: 0.5,
    },
  },
};

const SidebarOpen = ({ isSidebarOpen, setIsSidebarOpen }: SidebarOpenProps) => {
  const { simulation, idSimulationUpdating } = useContext(SimulationSetted);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <AnimatePresence>
      <MotionBox
        bg="#EEEEEE"
        minWidth="25%"
        maxWidth="25%"
        h="92vh"
        maxHeight="92vh"
        p="1vh"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <Tabs h="90vh" maxHeight="90vh">
          <Box display="flex" justifyContent="space-between" maxHeight="7vh">
            <TabList>
              <Tab id="ModelBuilder">
                <Icon w={6} h={6} as={SettingsIcon} />
              </Tab>
              <Tab id="selectmap">
                <Icon w={6} h={6} as={PlanetIcon} />
              </Tab>
              <Tab id="simulationConfig">
                <SimulationIcon w={6} h={6} />
              </Tab>
            </TabList>
            <Flex
              justify="center"
              align="center"
              bg="#16609E"
              w="35px"
              h="35px"
              borderRadius="5px"
              color="white"
            >
              <Icon
                as={ChevronLeftIcon}
                w={8}
                h={8}
                cursor="pointer"
                onClick={toggleSidebar}
              />
            </Flex>
          </Box>
          <TabPanels h="83vh" maxHeight="83vh" overflowY="auto">
            <TabPanel>
              <ModelBuilder />
            </TabPanel>
            <TabPanel p="5% 0">
              <SelectorMapAccordion />
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
      </MotionBox>
    </AnimatePresence>
  );
};

export default SidebarOpen;
