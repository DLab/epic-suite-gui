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

interface Props {
    scale: string;
}
/**
 * Component that shows the selection of areas for geographic spaces.
 * @component
 */
const SelectedFeaturesPanel1 = ({ scale }: Props) => {
    const { counties, states } = useContext(SelectFeature);
    return (
        <>
            <Box
                bg="#FAFAFA"
                borderRadius="1px"
                mt="7%"
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
            {/* <Box id={createIdComponent()} textAlign="center">
                <GeoToastMessage />
            </Box> */}
        </>
    );
};

export default SelectedFeaturesPanel1;
