import { Box, Accordion } from "@chakra-ui/react";
import { useEffect } from "react";

import AcordionContent from "components/AcordionContent";
import InitialConditions from "components/simulator/controllers/InitialConditions";
import ModelController from "components/simulator/controllers/ModelController";
import ToastMessage from "components/ToastMessage";
import { EpidemicsData } from "context/ControlPanelContext";

import InterventionsParameters from "./controllers/InterventionsParameters";

interface Models {
  spatialSelection: string[] | [];
  parameters: EpidemicsData;
}
const ModelBuilder = () => {
  useEffect(() => {
    const sessionStorageObject = window.sessionStorage.getItem("models");
    if (!sessionStorageObject) {
      window.sessionStorage.setItem("models", JSON.stringify({ data: [] }));
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
          <AcordionContent title="Initial Conditions">
            <InitialConditions />
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
