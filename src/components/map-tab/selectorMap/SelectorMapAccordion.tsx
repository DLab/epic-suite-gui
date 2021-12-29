import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Text,
  Flex,
} from "@chakra-ui/react";
import React, { useState, useContext, useEffect } from "react";

import SelectedFeaturesPanel from "components/side-selector-feature/SelectedFeaturesPanel";
import { SelectFeature } from "context/SelectFeaturesContext";

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
    <Flex direction="column" w="28%" p="0 2%">
      <SelectorMap />
      {(scale === "States" || scale === "Counties") && (
        <SelectedFeaturesPanel />
      )}
    </Flex>
  );
};

export default SelectorMapAccordion;
