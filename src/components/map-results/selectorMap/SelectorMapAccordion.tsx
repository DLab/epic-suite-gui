import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";
import React, { useState, useContext, useEffect } from "react";

// import SelectedFeaturesPanel from "../side-selector-feature/";
import SelectedFeaturesPanel from "components/side-selector-feature/SelectedFeaturesPanel";
import SelectFeatureContext from "context/SelectFeaturesContext";

import SelectorMap from "./SelectorMap";

const SelectorMapAccordion = () => {
  const { mode } = useContext(SelectFeatureContext);
  const [maxWidthFeaturesPanel, setmaxWidthFeaturesPanel] = useState("");

  useEffect(() => {
    if (mode === "States") {
      setmaxWidthFeaturesPanel("35vh");
    } else if (mode === "Counties") {
      setmaxWidthFeaturesPanel("16vh");
    }
  }, [mode]);

  return (
    <Accordion
      defaultIndex={[0, 1]}
      allowMultiple
      onChange={(e) => {
        const toArray = Object.values(e);

        if (toArray.length === 1) {
          setmaxWidthFeaturesPanel("68vh");
        } else if (mode === "States") {
          setmaxWidthFeaturesPanel("35vh");
        } else if (mode === "Counties") {
          setmaxWidthFeaturesPanel("16vh");
        }
      }}
    >
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
      <SelectedFeaturesPanel maxWidthFeaturesPanel={maxWidthFeaturesPanel} />
    </Accordion>
  );
};

export default SelectorMapAccordion;
