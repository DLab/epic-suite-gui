import {
    Box,
    Accordion,
    AccordionIcon,
    AccordionPanel,
    AccordionButton,
    AccordionItem,
    Text,
    Input,
    Flex,
} from "@chakra-ui/react";
import { useContext } from "react";

import GeoToastMessage from "components/map-tab/selectorMap/GeoToastMessage";
import { SelectFeature } from "context/SelectFeaturesContext";
import createIdComponent from "utils/createIdcomponent";

import StatesSelectedCheckbox from "./StatesSelectedCheckbox";

/**
 * Component that shows the selection of areas for geographic spaces.
 * @component
 */
const SelectedFeaturesPanel = () => {
    const { scale, counties, states, nameGeoSelection, setNameGeoSelection } =
        useContext(SelectFeature);
    return (
        <>
            <Flex direction="column" p="2% 0">
                <Text
                    flex="1"
                    textAlign="left"
                    mb="2%"
                    color="#16609E"
                    fontSize="14px"
                    h="16px"
                >
                    Set Name
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
            <Box
                bg="#FAFAFA"
                borderRadius="1px"
                mt="5%"
                p="3%"
                overflowY="auto"
                maxH="22vh"
            >
                <Text fontSize="14px" color="#16609E" flex="1" textAlign="left">
                    Selected areas
                </Text>
                {scale === "States" && states.length > 0 && (
                    <StatesSelectedCheckbox stateSelected={states} />
                )}
                {scale === "States" && states.length <= 0 && (
                    <Text fontSize="14px"> No states selected</Text>
                )}
                {scale === "Counties" && counties.length > 0 && (
                    <StatesSelectedCheckbox countiesSelected={counties} />
                )}
                {scale === "Counties" && counties.length <= 0 && (
                    <Text id={createIdComponent()} fontSize="14px">
                        {" "}
                        No counties
                    </Text>
                )}
            </Box>
            <Box id={createIdComponent()} textAlign="center">
                <GeoToastMessage />
            </Box>
        </>
    );
};

export default SelectedFeaturesPanel;
