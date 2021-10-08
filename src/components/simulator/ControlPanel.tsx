import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Button, Box, Flex, Accordion, BoxProps } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

import AcordionContent from "components/AcordionContent";

export const MotionBox = motion<BoxProps>(Box);

const ControlPanel = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar: () => void = () => {
    setSidebarOpen(!isSidebarOpen);
  };

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

  return isSidebarOpen ? (
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
  ) : (
    <Flex bg="#EEEEEE" p="10px" color="white" justifyContent="center">
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
          <ChevronRightIcon
            w={8}
            h={8}
            cursor="pointer"
            onClick={toggleSidebar}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ControlPanel;
