import { Button, Box, Accordion } from "@chakra-ui/react";

import AcordionContent from "components/AcordionContent";
import InitialConditions from "components/simulator/controllers/InitialConditions";
import ModelController from "components/simulator/controllers/ModelController";

import InterventionsParameters from "./controllers/InterventionsParameters";

const ModelBuilder = () => {
  return (
    <>
      <h2 style={{ textAlign: "center", color: "#16609E" }}>Model Builder</h2>
      <Box p="5px" mt="15px" textAlign="center">
        <Accordion allowMultiple>
          <AcordionContent title="Model">
            <ModelController />
          </AcordionContent>
          <AcordionContent title="Initial Conditions">
            <InitialConditions />
          </AcordionContent>
          <AcordionContent title="Interventions">
            <InterventionsParameters />
          </AcordionContent>
        </Accordion>
        <Button colorScheme="teal" size="md" mt="20px">
          Add Model
        </Button>
      </Box>
    </>
  );
};

export default ModelBuilder;
