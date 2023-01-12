import { Flex, Button, Icon, Box } from "@chakra-ui/react";
import React from "react";

import BreadCrumb from "components/BreadCrumb";

import MobilityConstructorContainer from "./MobilityConstructorContainer";
import MobiltyOutputContainer from "./MobiltyOutputContainer";
import ModelSelectAndButtons from "./ModelSelectAndButtons";

const MobilityMatrix = () => {
    return (
        <Flex direction="column">
            <BreadCrumb firstLink="Mobility" />
            <Flex direction="column">
                <ModelSelectAndButtons />
                <Flex ml="2%" p="0" h="100%" w="100%" mt="20px">
                    <MobilityConstructorContainer />
                    <MobiltyOutputContainer />
                </Flex>
            </Flex>
        </Flex>
    );
};

export default MobilityMatrix;
