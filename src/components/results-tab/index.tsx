import { DeleteIcon } from "@chakra-ui/icons";
import {
    Box,
    Flex,
    Text,
    Spinner,
    Button,
    HStack,
    useDisclosure,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useContext } from "react";

import { GraphicsData } from "context/GraphicsContext";
import { TabIndex } from "context/TabContext";
import createIdComponent from "utils/createIdcomponent";

import DoubleYAxis from "./DoubleYAxis";
import Exports from "./Exports";
import ResultsDrawer from "./ResultsDrawer";
import SeeGraphic from "./SeeGraphic";

const Graphic = dynamic(() => import("./Graphic"), {
    loading: () => (
        <Flex
            id={createIdComponent()}
            justifyContent="center"
            alignItems="center"
        >
            <Spinner
                id={createIdComponent()}
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
            />
        </Flex>
    ),
    ssr: false,
});
const Results = () => {
    const { aux: responseSim } = useContext(TabIndex);
    const { allGraphicData, setAllGraphicData } = useContext(GraphicsData);
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Flex w="100%" p="5px" h="100%" direction="column">
            <Flex h="5vh" mh="5vh" justifyContent="space-between">
                <Text color="#16609E" fontSize="18px" fontWeight="bold">
                    Results
                </Text>
                <ResultsDrawer
                    isOpen={isOpen}
                    onOpen={onOpen}
                    onClose={onClose}
                />
            </Flex>
            {responseSim ? (
                <Flex
                    w="100%"
                    h="87vh"
                    id={createIdComponent()}
                    textAlign="center"
                >
                    <Flex
                        w="100%"
                        id={createIdComponent()}
                        direction="column"
                        justify="space-between"
                    >
                        {allGraphicData.length > 0 ? (
                            <Flex
                                id={createIdComponent()}
                                flexWrap="wrap"
                                h="100%"
                                maxH="80vh"
                                overflowY="auto"
                                justify="space-evenly"
                            >
                                {allGraphicData.map((graphicData, index) => {
                                    return (
                                        <Box
                                            key={`${graphicData[0]?.leftAxis[0]?.name}`}
                                        >
                                            <Flex
                                                justify="end"
                                                id={createIdComponent()}
                                            >
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
                                                                (x, y) => {
                                                                    if (
                                                                        y ===
                                                                        index
                                                                    ) {
                                                                        return false;
                                                                    }
                                                                    return true;
                                                                }
                                                            );
                                                        setAllGraphicData(aux);
                                                    }}
                                                >
                                                    Delete
                                                </DeleteIcon>
                                            </Flex>
                                            <Graphic
                                                savedSimulationKeys={
                                                    graphicData
                                                }
                                                index={index}
                                                width="470"
                                                height="340"
                                                disabledName={false}
                                            />
                                        </Box>
                                    );
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
                                    There are no graphics to show.
                                </Text>
                                <Text
                                    color="#16609E"
                                    textDecoration="underline"
                                    cursor="pointer"
                                    fontSize="lg"
                                    onClick={onOpen}
                                >
                                    Add Results
                                </Text>
                            </Flex>
                        )}
                        <Exports data={responseSim} />
                    </Flex>
                </Flex>
            ) : (
                <Flex h="88vh" w="100%" justify="center" align="center">
                    <HStack
                        h="100%"
                        w="100%"
                        justify="center"
                        alignItems="center"
                    >
                        <Text color="gray.600" fontSize="4xl">
                            Nothing Here
                        </Text>
                    </HStack>
                </Flex>
            )}
        </Flex>
    );
};

export default Results;
