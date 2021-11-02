// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Button, Box, Accordion } from "@chakra-ui/react";

import AcordionContent from "components/AcordionContent";
import InitialConditions from "components/simulator/controllers/InitialConditions";
import SimulationController from "components/simulator/controllers/SimulationController";

import EpidemiologicParameters from "./controllers/EpidemiologicParameters";
import InterventionsParameters from "./controllers/InterventionsParameters";

const ControlPanel = () => {
  return (
    <>
      <h2 style={{ textAlign: "center", color: "#16609E" }}>Control Panel</h2>
      <Box p="5px" mt="15px" textAlign="center">
        <Accordion allowMultiple>
          <AcordionContent title="Initial Conditions">
            <InitialConditions />
          </AcordionContent>
          <AcordionContent title="Simulation">
            <SimulationController />
          </AcordionContent>
          <AcordionContent title="Epidemiologic">
            <EpidemiologicParameters />
          </AcordionContent>
          <AcordionContent title="Intervention">
            <InterventionsParameters />
          </AcordionContent>
        </Accordion>
        <Button colorScheme="teal" size="md" mt="20px">
          Start
        </Button>
      </Box>
    </>
  );
};

export default ControlPanel;
