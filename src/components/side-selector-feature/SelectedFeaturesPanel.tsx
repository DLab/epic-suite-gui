import {
  Box,
  AccordionIcon,
  AccordionPanel,
  AccordionButton,
  AccordionItem,
  Text,
} from "@chakra-ui/react";
import { useContext } from "react";

import SelectFeatureContext from "context/SelectFeaturesContext";

import StatesSelectedCheckbox from "./StatesSelectedCheckbox";

interface Props {
  maxWidthFeaturesPanel: string;
}

const SelectedFeaturesPanel = ({ maxWidthFeaturesPanel }: Props) => {
  const { mode, counties, states } = useContext(SelectFeatureContext);
  return (
    // <Accordion defaultIndex={[0]} allowMultiple bg="white">
    <AccordionItem>
      <h2>
        <AccordionButton _focus={{ boxShadow: "none" }}>
          <Box color="#16609E" flex="1" textAlign="left">
            Selected areas
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel bg="white" p="1% 4%">
        {mode === "States" && states.length > 0 && (
          <StatesSelectedCheckbox
            stateSelected={states}
            maxWidthFeaturesPanel={maxWidthFeaturesPanel}
          />
        )}
        {mode === "States" && states.length <= 0 && <p> No states</p>}

        {mode === "Counties" && counties.length > 0 && (
          <StatesSelectedCheckbox
            countiesSelected={counties}
            maxWidthFeaturesPanel={maxWidthFeaturesPanel}
          />
        )}
        {mode === "Counties" && counties.length <= 0 && <p> No counties</p>}
      </AccordionPanel>
    </AccordionItem>
    // </Accordion>
  );
};

export default SelectedFeaturesPanel;
