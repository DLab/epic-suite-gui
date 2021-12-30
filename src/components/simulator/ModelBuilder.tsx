import { Box, Accordion } from "@chakra-ui/react";
import { useEffect } from "react";

import AcordionContent from "components/AcordionContent";
import InitialConditions from "components/simulator/controllers/InitialConditions";
import ModelController from "components/simulator/controllers/ModelController";
import ToastMessage from "components/simulator/controllers/ToastMessage";
import createIdComponent from "utils/createIdcomponent";

import InterventionsParameters from "./controllers/InterventionsParameters";

const ModelBuilder = () => {
  return (
    <>
      <Box p="5px" mt="15px" textAlign="center">
        <ModelController />
        <InterventionsParameters />
      </Box>
    </>
  );
};

export default ModelBuilder;
