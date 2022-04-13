import { DeleteIcon } from "@chakra-ui/icons";
import {
    Box,
    Flex,
    Spinner,
    Text,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import React, { useContext } from "react";
import { MapContainer, TileLayer } from "react-leaflet";

import { GraphicsData } from "context/GraphicsContext";
import { TabIndex } from "context/TabContext";
import createIdComponent from "utils/createIdcomponent";

import DoubleYAxis from "./DoubleYAxis";
import Exports from "./Exports";
import Graphic from "./Graphic";
import MapResults from "./MapResults";
import SeeGraphic from "./SeeGraphic";

// import StatesResultsMap from "./StatesResultsMap";

interface Props {
    // idGeo: number;
    onOpen: (val: boolean) => void;
}

const GraphicAndMapResults = ({ onOpen }: Props) => {
    const { allGraphicData, setAllGraphicData, dataToShowInMap } =
        useContext(GraphicsData);
    return (
        <Flex w="100%" h="87vh" id={createIdComponent()} textAlign="center">
            <Flex
                w="100%"
                id={createIdComponent()}
                direction="column"
                justify="space-between"
                textAlign="center"
            >
                {allGraphicData.length > 0 || dataToShowInMap.length > 0 ? (
                    <Flex
                        id={createIdComponent()}
                        flexWrap="wrap"
                        h="100%"
                        maxH="80vh"
                        overflowY="auto"
                        justify="space-evenly"
                    >
                        <Flex width="50%" direction="column">
                            {allGraphicData.map((graphicData, index) => {
                                return (
                                    <Box
                                        key={`${graphicData[0]?.leftAxis[0]?.name}`}
                                    >
                                        <Flex
                                            justify="end"
                                            w="90%"
                                            mt="2%"
                                            id={createIdComponent()}
                                        >
                                            <Flex h="1.5rem">
                                                <DoubleYAxis
                                                    savedKeys={graphicData}
                                                    index={index}
                                                />
                                                <SeeGraphic
                                                    savedKeys={graphicData}
                                                    index={index}
                                                />
                                                <DeleteIcon
                                                    id={createIdComponent()}
                                                    color="#16609E"
                                                    ml="2%"
                                                    cursor="pointer"
                                                    onClick={() => {
                                                        const aux =
                                                            allGraphicData.filter(
                                                                (x, i) => {
                                                                    return (
                                                                        i !==
                                                                        index
                                                                    );
                                                                }
                                                            );
                                                        setAllGraphicData(aux);
                                                    }}
                                                >
                                                    Delete
                                                </DeleteIcon>
                                            </Flex>
                                        </Flex>
                                        <Flex
                                            direction="column"
                                            bg="#FFFFFF"
                                            borderRadius="10px"
                                            alignItems="center"
                                            justify="center"
                                            w="90%"
                                            h="71vh"
                                        >
                                            <Graphic
                                                savedSimulationKeys={
                                                    graphicData
                                                }
                                                index={index}
                                                width="500"
                                                height="340"
                                                disabledName={false}
                                            />
                                        </Flex>
                                    </Box>
                                );
                            })}
                        </Flex>
                        <Flex width="50%" direction="column">
                            {dataToShowInMap.map((map) => {
                                return <MapResults map={map} />;
                            })}
                        </Flex>
                    </Flex>
                ) : (
                    <Flex
                        id={createIdComponent()}
                        h="100%"
                        justify="center"
                        align="center"
                        flexDirection="column"
                    >
                        {" "}
                        <Text color="gray.600" fontSize="xl">
                            There are no Results to show.
                        </Text>
                        <Text
                            color="#16609E"
                            textDecoration="underline"
                            cursor="pointer"
                            fontSize="lg"
                            onClick={() => {
                                onOpen(true);
                            }}
                        >
                            Add Results
                        </Text>
                    </Flex>
                )}
                {/* <Exports data={responseSim} /> */}
            </Flex>
        </Flex>
    );
};

export default GraphicAndMapResults;
