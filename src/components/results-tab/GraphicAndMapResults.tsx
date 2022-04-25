import { DeleteIcon } from "@chakra-ui/icons";
import { Box, Flex, Text } from "@chakra-ui/react";
import React, { useState, useContext, useEffect } from "react";

import { GraphicsData } from "context/GraphicsContext";
import createIdComponent from "utils/createIdcomponent";

import DoubleYAxis from "./DoubleYAxis";
import Exports from "./Exports";
import Graphic from "./Graphic";
import MapResults from "./MapResults";
import SeeGraphic from "./SeeGraphic";

interface Props {
    onOpen: (val: boolean) => void;
    // dataToShowInMap: Array;
    // allGraphicData: Array;
}

const GraphicAndMapResults = ({ onOpen }: Props) => {
    const {
        setAllGraphicData,
        dataToShowInMap,
        allGraphicData,
        setAllResults,
        allResults,
    } = useContext(GraphicsData);

    let index = -1;
    return (
        <Flex w="100%" h="87vh" id={createIdComponent()} textAlign="center">
            <Flex
                w="100%"
                id={createIdComponent()}
                direction="column"
                justify="space-between"
                textAlign="center"
            >
                {allResults.length > 0 ? (
                    <Flex
                        id={createIdComponent()}
                        flexWrap="wrap"
                        h="100%"
                        maxH="80vh"
                        overflowY="auto"
                        justify="space-evenly"
                    >
                        {allResults.map((result) => {
                            if (Array.isArray(result)) {
                                index += 1;
                                return (
                                    <Box w="45%" key={`${result[0].graphicId}`}>
                                        <Flex
                                            justify="end"
                                            w="90%"
                                            mt="2%"
                                            id={createIdComponent()}
                                        >
                                            <Flex h="1.5rem">
                                                <DoubleYAxis
                                                    savedKeys={result}
                                                    index={index}
                                                />
                                                <SeeGraphic
                                                    savedKeys={result}
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
                                                                        x[0]
                                                                            .graphicId !==
                                                                        result[0]
                                                                            .graphicId
                                                                    );
                                                                }
                                                            );
                                                        setAllGraphicData(aux);
                                                        setAllResults(
                                                            [].concat(
                                                                dataToShowInMap,
                                                                aux
                                                            )
                                                        );
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
                                                savedSimulationKeys={result}
                                                index={index}
                                                width="500"
                                                height="340"
                                                disabledName={false}
                                            />
                                        </Flex>
                                    </Box>
                                );
                            }
                            return <MapResults map={result} />;
                        })}
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
