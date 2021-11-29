import {
  Box,
  AccordionIcon,
  AccordionPanel,
  AccordionButton,
  AccordionItem,
  Text,
  Input,
  Flex,
} from "@chakra-ui/react";
import { useContext } from "react";

import GeoToastMessage from "components/map-results/selectorMap/GeoToastMessage";
import { SelectFeature } from "context/SelectFeaturesContext";

import StatesSelectedCheckbox from "./StatesSelectedCheckbox";

interface Props {
  maxWidthFeaturesPanel: string;
}

const SelectedFeaturesPanel = ({ maxWidthFeaturesPanel }: Props) => {
  const { scale, counties, states, nameGeoSelection, setNameGeoSelection } =
    useContext(SelectFeature);
  return (
    <AccordionItem>
      <Flex direction="column" p="2% 5%">
        <Text
          flex="1"
          textAlign="left"
          color="#16609E"
          fontSize="14px"
          h="16px"
        >
          Selection Name
        </Text>
        <Input
          size="sm"
          bg="#ffffff"
          fontSize="14px"
          value={nameGeoSelection}
          onChange={(e) => {
            setNameGeoSelection(e.target.value);
          }}
        />
      </Flex>
      <h2>
        <AccordionButton _focus={{ boxShadow: "none" }}>
          <Box fontSize="14px" color="#16609E" flex="1" textAlign="left">
            Selected areas
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel p="1% 4%">
        {scale === "States" && states.length > 0 && (
          <StatesSelectedCheckbox
            stateSelected={states}
            maxWidthFeaturesPanel={maxWidthFeaturesPanel}
          />
        )}
        {scale === "States" && states.length <= 0 && (
          <Text fontSize="14px"> No states</Text>
        )}

        {scale === "Counties" && counties.length > 0 && (
          <StatesSelectedCheckbox
            countiesSelected={counties}
            maxWidthFeaturesPanel={maxWidthFeaturesPanel}
          />
        )}
        {scale === "Counties" && counties.length <= 0 && (
          <Text fontSize="14px"> No counties</Text>
        )}
      </AccordionPanel>
      <Box textAlign="center">
        <GeoToastMessage />
      </Box>
    </AccordionItem>
  );
};

export default SelectedFeaturesPanel;
