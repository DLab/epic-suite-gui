import { ViewIcon, EditIcon, DeleteIcon, CloseIcon } from "@chakra-ui/icons";
import { Flex, Text, Box, Heading } from "@chakra-ui/react";
import { useContext } from "react";

import { ModelsSaved } from "context/ModelsContext";

import Pills from "./ModelsPills";

const ModelsTab = () => {
  const { parameters } = useContext(ModelsSaved);
  return (
    <>
      <Heading as="h2" size="lg" color="#16609E" w="100%">
        Models
      </Heading>

      <Flex direction="column">
        <Pills />
      </Flex>
    </>
  );
};

export default ModelsTab;
