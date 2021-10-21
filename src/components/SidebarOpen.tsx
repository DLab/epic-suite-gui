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

import SelectorMap from "components/map-results/SelectorMap";

import ControlPanel from "./simulator/ControlPanel";

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
        w="30%"
        p="10px"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <Tabs>
          <Box display="flex" justifyContent="space-between">
            <TabList>
              <Tab>
                <Icon w={6} h={6} as={EditIcon} />
              </Tab>
              <Tab>
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
          <TabPanels>
            <TabPanel>
              <SelectorMap />
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
