import { Text, Center } from "@chakra-ui/react";

import ToolsIcon from "components/icons/ToolsIcon";
import createIdComponent from "utils/createIdcomponent";

const GraphBuilder = () => {
  return (
    <>
      <Text textAlign="center" id={createIdComponent()} color="#16609E">
        Graph Builder
      </Text>
    </>
  );
};

export default GraphBuilder;
