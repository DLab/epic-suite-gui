import { Flex } from "@chakra-ui/react";

import MapResult from "../map-results/index";
import Footer from "components/layout/Footer";

import ControlPanel from "./ControlPanel";

const Simulator = () => {
  return (
    <Flex h="100vh">
      <ControlPanel />
      <Flex w="100%" direction="column" justify="space-between">
        <MapResult />
        <Footer />
      </Flex>
    </Flex>
  );
};

export default Simulator;
