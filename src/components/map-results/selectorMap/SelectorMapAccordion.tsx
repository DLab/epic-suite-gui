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
import { SelectFeature } from "context/SelectFeaturesContext";
import createIdComponent from "utils/createIdcomponent";

import SelectorMap from "./SelectorMap";

const SelectorMapAccordion = () => {
  const { scale } = useContext(SelectFeature);
  const [maxWidthFeaturesPanel, setmaxWidthFeaturesPanel] = useState("");

  useEffect(() => {
    if (scale === "States") {
      setmaxWidthFeaturesPanel("27vh");
    } else if (scale === "Counties") {
      setmaxWidthFeaturesPanel("14vh");
    }
  }, [scale]);

  useEffect(() => {
    const localStorageObject = window.localStorage.getItem("geoSelection");
    if (!localStorageObject) {
      window.localStorage.setItem("geoSelection", JSON.stringify([]));
    }
  }, []);

  return (
    <Accordion
      id={createIdComponent()}
      defaultIndex={[0, 1]}
      allowMultiple
      onChange={(e) => {
        const toArray = Object.values(e);

        if (toArray.length === 1) {
          setmaxWidthFeaturesPanel("56vh");
        } else if (scale === "States") {
          setmaxWidthFeaturesPanel("27vh");
        } else if (scale === "Counties") {
          setmaxWidthFeaturesPanel("14vh");
        }
      }}
    >
      <AccordionItem id={createIdComponent()}>
        <h2 id={createIdComponent()}>
          <AccordionButton id={createIdComponent()}>
            <Box
              id={createIdComponent()}
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
        <AccordionPanel id={createIdComponent()} pb={0}>
          <SelectorMap />
        </AccordionPanel>
      </AccordionItem>
      {(scale === "States" || scale === "Counties") && (
        <SelectedFeaturesPanel maxWidthFeaturesPanel={maxWidthFeaturesPanel} />
      )}
    </Accordion>
  );
};

export default SelectorMapAccordion;
