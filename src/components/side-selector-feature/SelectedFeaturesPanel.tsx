import {
  Box,
  AccordionIcon,
  AccordionPanel,
  AccordionButton,
  AccordionItem,
  Text,
} from "@chakra-ui/react";
import { useContext } from "react";

import GeoToastMessage from "components/map-results/selectorMap/GeoToastMessage";
import SelectFeatureContext from "context/SelectFeaturesContext";

import StatesSelectedCheckbox from "./StatesSelectedCheckbox";

interface Props {
  maxWidthFeaturesPanel: string;
}

const SelectedFeaturesPanel = ({ maxWidthFeaturesPanel }: Props) => {
  const { mode, counties, states } = useContext(SelectFeatureContext);
  return (
    <AccordionItem>
      <h2>
        <AccordionButton _focus={{ boxShadow: "none" }}>
          <Box fontSize="14px" color="#16609E" flex="1" textAlign="left">
            Selected areas
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel p="1% 4%">
        {mode === "States" && states.length > 0 && (
          <StatesSelectedCheckbox
            stateSelected={states}
            maxWidthFeaturesPanel={maxWidthFeaturesPanel}
          />
        )}
        {mode === "States" && states.length <= 0 && (
          <Text fontSize="14px"> No states</Text>
        )}

        {mode === "Counties" && counties.length > 0 && (
          <StatesSelectedCheckbox
            countiesSelected={counties}
            maxWidthFeaturesPanel={maxWidthFeaturesPanel}
          />
        )}
        {mode === "Counties" && counties.length <= 0 && (
          <Text fontSize="14px"> No counties</Text>
        )}
        <GeoToastMessage />
      </AccordionPanel>
    </AccordionItem>
  );
};

export default SelectedFeaturesPanel;
