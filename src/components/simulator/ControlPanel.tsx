// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Button, Box, Flex, Accordion } from "@chakra-ui/react";

import AcordionContent from "components/AcordionContent";

const ControlPanel = () => {
  return (
    <>
      <h2 style={{ textAlign: "center", color: "#16609E" }}>Control Panel</h2>
      <Box p="5px" mt="15px" textAlign="center">
        <Accordion allowMultiple>
          <AcordionContent title="Controller 1" />
          <AcordionContent title="Controller 2" />
          <AcordionContent title="Controller 3" />
        </Accordion>
        <Button colorScheme="teal" size="md" mt="20px">
          Start
        </Button>
      </Box>
    </>
  );
};

export default ControlPanel;
