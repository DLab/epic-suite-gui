import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";
import React, { useState, useContext, useEffect } from "react";

import SelectedFeaturesPanel from "components/side-selector-feature/SelectedFeaturesPanel";
import SelectFeatureContext from "context/SelectFeaturesContext";

import SelectorMap from "./SelectorMap";

const SelectorMapAccordion = () => {
  const { mode } = useContext(SelectFeatureContext);
  const [maxWidthFeaturesPanel, setmaxWidthFeaturesPanel] = useState("");

  useEffect(() => {
    if (mode === "States") {
      setmaxWidthFeaturesPanel("27vh");
    } else if (mode === "Counties") {
      setmaxWidthFeaturesPanel("14vh");
    }
  }, [mode]);

  useEffect(() => {
    const localStorageObject = window.localStorage.getItem("geoSelection");
    if (!localStorageObject) {
      window.localStorage.setItem("geoSelection", JSON.stringify([]));
    }
  }, []);

  return (
    <Accordion
      defaultIndex={[0, 1]}
      allowMultiple
      onChange={(e) => {
        const toArray = Object.values(e);

        if (toArray.length === 1) {
          setmaxWidthFeaturesPanel("56vh");
        } else if (mode === "States") {
          setmaxWidthFeaturesPanel("27vh");
        } else if (mode === "Counties") {
          setmaxWidthFeaturesPanel("14vh");
        }
      }}
    >
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box
              color="#16609E"
              fontSize="14px"
              flex="1"
              textAlign="left"
              h="16px"
            >
              Select scale for simulation
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
