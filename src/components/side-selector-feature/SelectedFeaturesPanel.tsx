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
import createIdComponent from "utils/createIdcomponent";

import StatesSelectedCheckbox from "./StatesSelectedCheckbox";

interface Props {
  maxWidthFeaturesPanel: string;
}

const SelectedFeaturesPanel = ({ maxWidthFeaturesPanel }: Props) => {
  const { scale, counties, states, nameGeoSelection, setNameGeoSelection } =
    useContext(SelectFeature);
  return (
    <AccordionItem id={createIdComponent()}>
      <Flex id={createIdComponent()} direction="column" p="2% 5%">
        <Text
          id={createIdComponent()}
          flex="1"
          textAlign="left"
          color="#16609E"
          fontSize="14px"
          h="16px"
        >
          Selection Name
        </Text>
        <Input
          id={createIdComponent()}
          size="sm"
          bg="#ffffff"
          fontSize="14px"
          value={nameGeoSelection}
          onChange={(e) => {
            setNameGeoSelection(e.target.value);
          }}
        />
      </Flex>
      <h2 id={createIdComponent()}>
        <AccordionButton
          id={createIdComponent()}
          _focus={{ boxShadow: "none" }}
        >
          <Box
            id={createIdComponent()}
            fontSize="14px"
            color="#16609E"
            flex="1"
            textAlign="left"
          >
            Selected areas
          </Box>
          <AccordionIcon id={createIdComponent()} />
        </AccordionButton>
      </h2>
      <AccordionPanel id={createIdComponent()} p="1% 4%">
        {scale === "States" && states.length > 0 && (
          <StatesSelectedCheckbox
            stateSelected={states}
            maxWidthFeaturesPanel={maxWidthFeaturesPanel}
          />
        )}
        {scale === "States" && states.length <= 0 && (
          <Text id={createIdComponent()} fontSize="14px">
            {" "}
            No states
          </Text>
        )}

        {scale === "Counties" && counties.length > 0 && (
          <StatesSelectedCheckbox
            countiesSelected={counties}
            maxWidthFeaturesPanel={maxWidthFeaturesPanel}
          />
        )}
        {scale === "Counties" && counties.length <= 0 && (
          <Text id={createIdComponent()} fontSize="14px">
            {" "}
            No counties
          </Text>
        )}
      </AccordionPanel>
      <Box id={createIdComponent()} textAlign="center">
        <GeoToastMessage />
      </Box>
    </AccordionItem>
  );
};

export default SelectedFeaturesPanel;
