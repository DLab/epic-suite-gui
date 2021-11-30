import { Box, Accordion } from "@chakra-ui/react";
import { useEffect } from "react";

import AcordionContent from "components/AcordionContent";
import InitialConditions from "components/simulator/controllers/InitialConditions";
import ModelController from "components/simulator/controllers/ModelController";
import ToastMessage from "components/simulator/controllers/ToastMessage";

import InterventionsParameters from "./controllers/InterventionsParameters";

const ModelBuilder = () => {
  useEffect(() => {
    const localStorageObject = window.localStorage.getItem("models");
    if (!localStorageObject) {
      window.localStorage.setItem("models", JSON.stringify([]));
    }
  }, []);

  return (
    <>
      <h2 style={{ textAlign: "center", color: "#16609E" }}>Model Builder</h2>
      <Box p="5px" mt="15px" textAlign="center">
        <Accordion allowMultiple>
          <AcordionContent title="Model">
            <ModelController />
          </AcordionContent>
          <AcordionContent title="Interventions">
            <InterventionsParameters />
          </AcordionContent>
        </Accordion>
        <ToastMessage />
      </Box>
    </>
  );
};

export default ModelBuilder;
