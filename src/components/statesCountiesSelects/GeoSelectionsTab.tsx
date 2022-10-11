import { ViewIcon, DeleteIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Icon,
    Flex,
    Text,
    Box,
    Button,
    useToast,
} from "@chakra-ui/react";
import { useState, useEffect, useContext } from "react";

import GeoSelectionsDetails from "components/map-tab/selectorMap/GeoSelectionsDetails";
import { NewModelSetted } from "context/NewModelsContext";
import { SelectFeature } from "context/SelectFeaturesContext";
import { Model } from "types/ControlPanelTypes";
import { NewModelsAllParams, NewModelsParams } from "types/SimulationTypes";
import createIdComponent from "utils/createIdcomponent";

/**
 * Component to display saved geographic selections and their details.
 * @component
 */
const GeoSelectionsTab = () => {
    const {
        geoSelections,
        setGeoSelections,
        setMode,
        setIdGeoSelectionUpdate,
        setStates,
        setCounties,
        setScale,
        setNameGeoSelection,
    } = useContext(SelectFeature);
    const [viewDetails, setViewDetails] = useState(false);
    const [geoSelectionDetails, setGeoSelectionDetails] = useState([]);
    const { completeModel } = useContext(NewModelSetted);

    useEffect(() => {
        setViewDetails(false);
    }, [geoSelections]);

    /**
     * Delete a geographic selection.
     * @param {number} id of the geographic selection.
     */
    const deleteGeoSelection = (id: number) => {
        localStorage.removeItem("geoSelection");
        const geoSelectionFilter = geoSelections.filter(
            (geoSelection) => geoSelection.id !== +id
        );
        localStorage.setItem(
            "geoSelection",
            JSON.stringify(geoSelectionFilter)
        );
        setGeoSelections({ type: "removeGeoSelection", element: `${id}` });
    };

    /**
     * Lets you view the states or counties of a saved geographic selection.
     * @param id of the geographic selection.
     */
    const viewGeoSelectionsDetails = (id: number) => {
        const details = geoSelections.filter(
            (geoSelection) => geoSelection.id === id
        );
        setGeoSelectionDetails(details);
        setViewDetails(true);
    };

    /**
     * Allows you to update a geographic selection.
     * @param {number} id geoselect id.
     * @param {string []} dataForUpdate list with the FIPS of the new selection.
     * @param {string} name name of the geographic selection.
     * @param {string} scale spatial scale of geographic selection.
     */
    const updateGeoSelection = (id, dataForUpdate, name, scale) => {
        setMode(Model.Update);
        setIdGeoSelectionUpdate(id);
        setScale(scale);
        setNameGeoSelection(name);
        if (scale === "Counties") {
            setCounties({ type: "update", updateData: dataForUpdate });
        } else {
            setStates({ type: "update", updateData: dataForUpdate });
        }
    };
    const toast = useToast();
    return (
        <Flex
            direction="column"
            w="100%"
            h="100%"
            maxHeight="44vh"
            overflowY="auto"
        >
            <Text m="1% 0" color="#16609E" fontSize="16px">
                Your Selections
            </Text>
            {geoSelections.length > 0 ? (
                <Flex id={createIdComponent()}>
                    <Flex
                        id={createIdComponent()}
                        w="100%"
                        borderRadius="md"
                        border="1px solid"
                        borderColor="#b7b7b7"
                    >
                        <Table
                            id={createIdComponent()}
                            size="md"
                            bg="#FAFAFA"
                            borderRadius="md"
                        >
                            <Thead>
                                <Tr>
                                    <Th>Name</Th>
                                    <Th>Scale</Th>
                                    <Th> </Th>
                                    <Th> </Th>
                                    <Th> </Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {geoSelections.map((geoSelection) => {
                                    return (
                                        <Tr key={createIdComponent()}>
                                            <Td>{geoSelection.name}</Td>
                                            <Td>{geoSelection.scale}</Td>
                                            <Td>
                                                <Icon
                                                    id={createIdComponent()}
                                                    color="#16609E"
                                                    as={ViewIcon}
                                                    cursor="pointer"
                                                    onClick={() => {
                                                        viewGeoSelectionsDetails(
                                                            geoSelection.id
                                                        );
                                                    }}
                                                />
                                            </Td>
                                            <Td>
                                                <Icon
                                                    color="#16609E"
                                                    as={EditIcon}
                                                    cursor="pointer"
                                                    onClick={() => {
                                                        setScale(
                                                            geoSelection.scale
                                                        );
                                                        updateGeoSelection(
                                                            geoSelection.id,
                                                            geoSelection.featureSelected,
                                                            geoSelection.name,
                                                            geoSelection.scale
                                                        );
                                                    }}
                                                />
                                            </Td>
                                            <Td>
                                                <Icon
                                                    id={createIdComponent()}
                                                    color="#16609E"
                                                    as={DeleteIcon}
                                                    cursor="pointer"
                                                    onClick={() => {
                                                        const isGeoIdUsed =
                                                            completeModel.some(
                                                                (
                                                                    e: NewModelsAllParams
                                                                ) =>
                                                                    +e.idGeo ===
                                                                    geoSelection.id
                                                            );
                                                        if (isGeoIdUsed) {
                                                            toast({
                                                                title: "Error",
                                                                description:
                                                                    "This location is used by many models. It couldn´t delete",
                                                                status: "error",
                                                                duration: 3000,
                                                                isClosable:
                                                                    true,
                                                                position:
                                                                    "bottom-left",
                                                            });
                                                        } else {
                                                            deleteGeoSelection(
                                                                geoSelection.id
                                                            );
                                                        }
                                                    }}
                                                />
                                            </Td>
                                        </Tr>
                                    );
                                })}
                            </Tbody>
                        </Table>
                    </Flex>
                    {viewDetails && (
                        <Flex
                            bg="#FFFFFF"
                            w="40%"
                            m="0 5%"
                            p="2%"
                            direction="column"
                            borderRadius="md"
                            border="1px solid"
                            borderColor="#b7b7b7"
                        >
                            <Box textAlign="end">
                                <Icon
                                    id={createIdComponent()}
                                    as={CloseIcon}
                                    cursor="pointer"
                                    color="#16609E"
                                    w="13 px"
                                    onClick={() => {
                                        setViewDetails(false);
                                    }}
                                />
                            </Box>
                            <GeoSelectionsDetails
                                details={geoSelectionDetails}
                            />
                        </Flex>
                    )}
                </Flex>
            ) : (
                <Flex
                    id={createIdComponent()}
                    h="100%"
                    alignItems="center"
                    color="#858585"
                    justify="center"
                    fontSize="20px"
                >
                    <Text>There is not geographic selections added</Text>
                </Flex>
            )}
        </Flex>
    );
};

export default GeoSelectionsTab;
