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
      setmaxWidthFeaturesPanel("26vh");
    } else if (mode === "Counties") {
      setmaxWidthFeaturesPanel("6vh");
    }
  }, [mode]);

  return (
    <Accordion
      defaultIndex={[0, 1]}
      allowMultiple
      onChange={(e) => {
        const toArray = Object.values(e);

        if (toArray.length === 1) {
          setmaxWidthFeaturesPanel("56vh");
        } else if (mode === "States") {
          setmaxWidthFeaturesPanel("26vh");
        } else if (mode === "Counties") {
          setmaxWidthFeaturesPanel("6vh");
        }
      }}
    >
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box color="#16609E" flex="1" textAlign="left" h="16px">
              Select an interest area
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={0}>
          <SelectorMap />
        </AccordionPanel>
      </AccordionItem>
      {(mode === "States" || mode === "Counties") && (
        <SelectedFeaturesPanel maxWidthFeaturesPanel={maxWidthFeaturesPanel} />
      )}
    </Accordion>
  );
};

export default SelectorMapAccordion;
