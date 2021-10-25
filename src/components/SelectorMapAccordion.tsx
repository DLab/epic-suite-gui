import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";
import React from "react";

import SelectorMap from "./map-results/SelectorMap";

const SelectorMapAccordion = () => {
  return (
    <Accordion defaultIndex={[0]} allowMultiple>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box color="#16609E" flex="1" textAlign="left">
              Select an interest area
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <SelectorMap />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default SelectorMapAccordion;
