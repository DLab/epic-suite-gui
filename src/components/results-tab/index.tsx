import {
    Box,
    Flex,
    Text,
    Spinner,
    Button,
    HStack,
    useDisclosure,
    Grid,
    GridItem,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useContext, useMemo } from "react";

import { TabIndex } from "context/TabContext";
import createIdComponent from "utils/createIdcomponent";

import ResultsDrawer from "./ResultsDrawer";

const GraphicAndMapResults = dynamic(() => import("./GraphicAndMapResults"), {
    loading: () => (
        <Flex
            id={createIdComponent()}
            justifyContent="center"
            alignItems="center"
            w="100%"
            h="100%"
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

    const { isOpen, onOpen, onClose } = useDisclosure();

    const GraphicAndMapResultsMemo = useMemo(
        () => <GraphicAndMapResults onOpen={onOpen} />,
        [onOpen]
    );

    return (
        <Grid
            w="100%"
            p="5px"
            h="100%"
            templateColumns="repeat(5, 1fr)"
            direction="column"
        >
            <GridItem
                colSpan={5}
                h="5vh"
                mh="5vh"
                justifyContent="space-between"
            >
                <Flex justifyContent="space-between">
                    <Text color="#16609E" fontSize="18px" fontWeight="bold">
                        Results
                    </Text>
                    <ResultsDrawer
                        isOpen={isOpen}
                        onOpen={onOpen}
                        onClose={onClose}
                    />
                </Flex>
            </GridItem>
            {responseSim ? (
                GraphicAndMapResultsMemo
            ) : (
                <GridItem
                    colSpan={5}
                    h="88vh"
                    w="100%"
                    justify="center"
                    align="center"
                >
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
                </GridItem>
            )}
        </Grid>
    );
};

export default Results;
