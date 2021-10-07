import { Flex } from "@chakra-ui/react";

import Footer from "components/layout/Footer";

import ControlPanel from "./ControlPanel";

const Simulator = () => {
  return (
    <Flex h="89vh">
      <ControlPanel />
      <Flex w="100%" direction="column" justify="space-between">
        Hola
        <Footer />
      </Flex>
    </Flex>
  );
};

export default Simulator;
