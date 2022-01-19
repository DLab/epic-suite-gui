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
} from "@chakra-ui/react";
import { useState, useEffect, useContext } from "react";

import GeoSelectionsDetails from "components/map-tab/selectorMap/GeoSelectionsDetails";
import { SelectFeature } from "context/SelectFeaturesContext";
import { Model } from "types/ControlPanelTypes";
import createIdComponent from "utils/createIdcomponent";

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

    useEffect(() => {
        setViewDetails(false);
    }, [geoSelections]);

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

    const viewGeoSelectionsDetails = (id: number) => {
        const details = geoSelections.filter(
            (geoSelection) => geoSelection.id === id
        );
        setGeoSelectionDetails(details);
        setViewDetails(true);
    };

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
                                                    onClick={() =>
                                                        deleteGeoSelection(
                                                            geoSelection.id
                                                        )
                                                    }
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
