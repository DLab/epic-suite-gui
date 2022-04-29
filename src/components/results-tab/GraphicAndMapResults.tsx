import { DeleteIcon } from "@chakra-ui/icons";
import { Box, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import React, { useState, useContext, useEffect, useRef } from "react";

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
    const containerGraphElement = useRef(null);

    let index = -1;
    return (
        <GridItem colSpan={5} id={createIdComponent()} textAlign="center">
            {/* <Flex
                w="100%"
                id={createIdComponent()}
                direction="column"
                justify="space-between"
                textAlign="center"
                h="87vh"
            > */}
            {allResults.length > 0 ? (
                <Flex
                    colSpan={1}
                    id={createIdComponent()}
                    flexWrap="wrap"
                    h="100%"
                    maxH="80vh"
                    overflowY="auto"
                    justify="space-between"
                >
                    {allResults.map((result) => {
                        if (Array.isArray(result)) {
                            index += 1;
                            return (
                                <Flex
                                    w="48%"
                                    direction="column"
                                    mb="2rem"
                                    key={`${result[0].graphicId}`}
                                >
                                    <Flex
                                        alignSelf="end"
                                        justify="end"
                                        w="10%"
                                        mt="2%"
                                        mr="0.2rem"
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
                                        w="100%"
                                        h="70vh"
                                        maxH="70vh"
                                        ref={containerGraphElement}
                                    >
                                        <Graphic
                                            savedSimulationKeys={result}
                                            index={index}
                                            width={`${
                                                containerGraphElement.current
                                                    ? containerGraphElement
                                                          .current
                                                          .clientWidth ?? 0
                                                    : 0
                                            }`}
                                            height={`${
                                                containerGraphElement.current
                                                    ? containerGraphElement
                                                          .current
                                                          .clientHeight ?? 0
                                                    : 0
                                            }`}
                                            disabledName={false}
                                        />
                                    </Flex>
                                </Flex>
                            );
                        }
                        return <MapResults map={result} />;
                    })}
                </Flex>
            ) : (
                <Flex
                    id={createIdComponent()}
                    justify="center"
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
        </GridItem>
    );
};

export default GraphicAndMapResults;
