import { ChevronLeftIcon, SettingsIcon, EditIcon } from "@chakra-ui/icons";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";

import SelectorMapAccordion from "../../map-results/selectorMap/SelectorMapAccordion";
import ControlPanel from "../ControlPanel";

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
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <AnimatePresence>
      <MotionBox
        bg="#EEEEEE"
        minWidth="25%"
        maxWidth="25%"
        h="89vh"
        maxHeight="89vh"
        p="1vh"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <Tabs h="87vh" maxHeight="87vh">
          <Box display="flex" justifyContent="space-between" maxHeight="7vh">
            <TabList>
              <Tab id="selectmap">
                <Icon w={6} h={6} as={EditIcon} />
              </Tab>
              <Tab id="controlpanel">
                <Icon w={6} h={6} as={SettingsIcon} />
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
          <TabPanels h="80vh" maxHeight="80vh">
            <TabPanel p="5% 0">
              <SelectorMapAccordion />
            </TabPanel>
            <TabPanel>
              <ControlPanel />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </MotionBox>
    </AnimatePresence>
  );
};

export default SidebarOpen;
