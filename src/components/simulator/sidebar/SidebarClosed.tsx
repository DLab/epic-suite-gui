import { ChevronRightIcon } from "@chakra-ui/icons";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Box, BoxProps, Flex } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";

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

const SidebarClosed = ({
  isSidebarOpen,
  setIsSidebarOpen,
}: SidebarOpenProps) => {
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <AnimatePresence>
      <MotionBox
        bg="#EEEEEE"
        p="1vh"
        color="white"
        justifyContent="center"
        h="92vh"
        maxHeight="92vh"
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
            <ChevronRightIcon
              w={8}
              h={8}
              cursor="pointer"
              onClick={toggleSidebar}
            />
          </Flex>
        </Flex>
      </MotionBox>
    </AnimatePresence>
  );
};

export default SidebarClosed;
