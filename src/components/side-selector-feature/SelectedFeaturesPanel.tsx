import {
  Box,
  Accordion,
  AccordionIcon,
  AccordionPanel,
  AccordionButton,
  AccordionItem,
  Text,
} from "@chakra-ui/react";
import { useContext } from "react";

import SelectFeatureContext from "context/SelectFeaturesContext";

import StatesSelectedCheckbox from "./StatesSelectedCheckbox";

const SelectedFeaturesPanel = () => {
  const { mode, counties, states } = useContext(SelectFeatureContext);
  return (
    <Accordion defaultIndex={[0]} allowMultiple bg="white">
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Selected areas
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel>
          {mode === "State" && states.length > 0 && (
            <StatesSelectedCheckbox stateSelected={states} />
          )}
          {mode === "State" && states.length <= 0 && <p> no states</p>}

          {mode === "County" && counties.length > 0 && (
            <StatesSelectedCheckbox countiesSelected={counties} />
          )}
          {mode === "County" && counties.length <= 0 && <p> no counties</p>}
          {mode === "National" && <p>national</p>}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default SelectedFeaturesPanel;
