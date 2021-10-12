import { ChevronLeftIcon } from "@chakra-ui/icons";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Button, Box, Flex, Accordion, BoxProps } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";

import AcordionContent from "components/AcordionContent";

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
        w="25%"
        p="10px"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <Flex justify="end">
          <Flex
            justify="center"
            align="center"
            bg="#16609E"
            w="35px"
            h="35px"
            borderRadius="5px"
            color="white"
          >
            <ChevronLeftIcon
              w={8}
              h={8}
              cursor="pointer"
              onClick={toggleSidebar}
            />
          </Flex>
        </Flex>
        <h2 style={{ textAlign: "center", color: "#16609E" }}>Control Panel</h2>
        <Box p="5px" mt="15px" textAlign="center">
          <Accordion allowMultiple>
            <AcordionContent title="Controller 1" />
            <AcordionContent title="Controller 2" />
            <AcordionContent title="Controller 3" />
          </Accordion>
          <Button colorScheme="teal" size="md" mt="20px">
            Start
          </Button>
        </Box>
      </MotionBox>
    </AnimatePresence>
  );
};

export default SidebarOpen;
