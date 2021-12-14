import { Flex } from "@chakra-ui/react";

import MapResult from "../map-results/index";
import Footer from "components/layout/Footer";
import TabContext from "context/TabContext";

import SidebarOpen from "./sidebar/SidebarOpen";

const Simulator = () => {
  return (
    <TabContext>
      <Flex maxHeight="92vh">
        <SidebarOpen />
        <Flex w="100%" direction="column" justify="space-between">
          <MapResult />
          <Footer />
        </Flex>
      </Flex>
    </TabContext>
  );
};

export default Simulator;
