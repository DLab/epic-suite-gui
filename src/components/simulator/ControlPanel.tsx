// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Button, Box, Flex, Accordion } from "@chakra-ui/react";
import { useContext } from "react";

import AcordionContent from "components/AcordionContent";
import NumberInputEpi from "components/NumberInputEpi";
import { ControlPanel as ControlPanelContext } from "context/ControlPanelContext";

const ControlPanel = () => {
  const { parameters, setParameters } = useContext(ControlPanelContext);
  return (
    <>
      <h2 style={{ textAlign: "center", color: "#16609E" }}>Control Panel</h2>
      <Box p="5px" mt="15px" textAlign="center">
        <Accordion allowMultiple>
          <AcordionContent title="Epidemiologic">
            <>
              <NumberInputEpi
                value={parameters.beta}
                setValue={setParameters}
                nameParams="beta"
                step={0.001}
                min={0.01}
                max={0.5}
                type="slider"
              />
              <NumberInputEpi
                value={parameters.r_R_S}
                setValue={setParameters}
                nameParams="r_R_S"
                type="number"
              />
              <NumberInputEpi
                value={parameters.mu}
                setValue={setParameters}
                nameParams="mu"
                step={0.01}
                min={0.01}
                max={20}
                type="slider"
              />
              <NumberInputEpi
                value={parameters.tI_R}
                setValue={setParameters}
                nameParams="tI_R"
                type="number"
              />
              <NumberInputEpi
                value={parameters.tE_I}
                setValue={setParameters}
                nameParams="tE_I"
                type="number"
              />
              <NumberInputEpi
                value={parameters.pI_det}
                setValue={setParameters}
                nameParams="pI_det"
                step={1}
                min={0.01}
                max={1}
                type="slider"
              />
            </>
          </AcordionContent>
          <AcordionContent title="Intervention">
            <NumberInputEpi
              value={parameters.alfa}
              setValue={setParameters}
              nameParams="alfa"
              step={0.01}
              min={0}
              max={1}
              type="slider"
            />
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
