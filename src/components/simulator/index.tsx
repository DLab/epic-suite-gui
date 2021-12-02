import { Flex } from "@chakra-ui/react";

import MapResult from "../map-results/index";
import Footer from "components/layout/Footer";
import TabContext from "context/TabContext";

import SidebarLeft from "./sidebar/SidebarLeft";

const Simulator = () => {
  return (
    <TabContext>
      <Flex maxHeight="92vh">
        <SidebarLeft />
        <Flex w="100%" direction="column" justify="space-between">
          <MapResult />
          <Footer />
        </Flex>
      </Flex>
    </TabContext>
  );
};

export default Simulator;
