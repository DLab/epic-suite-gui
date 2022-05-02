import { Text, Flex, Button, Heading } from "@chakra-ui/react";
import { useContext } from "react";

import { TabIndex } from "context/TabContext";

const HomePage = () => {
    const { setIndex } = useContext(TabIndex);
    return (
        <Flex w="100%" h="100%">
            <Flex
                direction="column"
                maxW="52%"
                alignItems="start"
                justifyContent="center"
                p="2% 3% 0% 3%"
            >
                <Text color="#FFFFFF" fontWeight="bold" fontSize="1.3rem">
                    The EPIc Suite is a web-based platform designed as an
                    enabling tool for epidemiological modeling and simulation.
                    The suite allows the creation of pipelines for scientific
                    research on epidemics, offering capabilities for working
                    with data, embedding it in models, running simulations and
                    performing analysis and projections. It is designed with a
                    mix of simplicity of use, offering a variety of tools, such
                    as data extraction, data fitting heuristics, dynamic
                    parameters for modeling tendency changes like
                    non-pharmaceutical interventions or new variant appearance,
                    integrated function builder, integrated parameter
                    sensitivity analysis, among others.
                </Text>
                <Button
                    bg="#16609E"
                    color="#FFFFFF"
                    size="lg"
                    mt="6%"
                    onClick={() => {
                        setIndex(1);
                    }}
                >
                    Get Started
                </Button>
            </Flex>
            <Flex
                w="50%"
                direction="column"
                justifyContent="center"
                p="0 0 10% 3%"
            >
                <Flex>
                    <Heading fontSize="9rem" color="#7FA6C7">
                        EPI
                    </Heading>
                    <Heading fontSize="9rem" color="#7FA6C7">
                        c
                    </Heading>
                </Flex>
                <Heading fontSize="7rem" color="#FFFFFF" pl="15%">
                    SUITE
                </Heading>
            </Flex>
        </Flex>
    );
};

export default HomePage;
