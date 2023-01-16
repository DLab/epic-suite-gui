import { Flex, Button, Icon, Box } from "@chakra-ui/react";
import React, { useState } from "react";

import BreadCrumb from "components/BreadCrumb";
import { InterventionsTypes } from "types/MobilityMatrixTypes";

import MobilityConstructorContainer from "./MobilityConstructorContainer";
import MobiltyOutputContainer from "./MobiltyOutputContainer";
import ModelSelectAndButtons from "./ModelSelectAndButtons";

const MobilityMatrix = () => {
    const [nodesLocalValue, setNodesLocalValue] = useState<
        number | undefined
    >();
    const [graphTypeLocal, setGraphTypeLocal] = useState<string>();
    const [popPercentage, setPopPercentage] = useState<number>(0);
    const [isDynamical, setIsDynamical] = useState(false);
    const [modulationLocalValue, setModulationLocalValue] = useState<string>();
    const [daysCicleLocalValue, setDaysCicleLocalValue] = useState<number>(0);
    const [interventionList, setInterventionList] = useState<
        InterventionsTypes[]
    >([]);

    return (
        <Flex direction="column">
            <BreadCrumb firstLink="Mobility" />
            <Flex direction="column">
                <ModelSelectAndButtons
                    nodesLocalValue={nodesLocalValue}
                    setNodesLocalValue={setNodesLocalValue}
                    graphTypeLocal={graphTypeLocal}
                    setGraphTypeLocal={setGraphTypeLocal}
                    popPercentage={popPercentage}
                    setPopPercentage={setPopPercentage}
                    isDynamical={isDynamical}
                    setIsDynamical={setIsDynamical}
                    modulationLocalValue={modulationLocalValue}
                    setModulationLocalValue={setModulationLocalValue}
                    daysCicleLocalValue={daysCicleLocalValue}
                    setDaysCicleLocalValue={setDaysCicleLocalValue}
                />
                <Flex ml="2%" p="0" h="100%" w="100%" mt="20px">
                    <MobilityConstructorContainer
                        nodesLocalValue={nodesLocalValue}
                        setNodesLocalValue={setNodesLocalValue}
                        graphTypeLocal={graphTypeLocal}
                        setGraphTypeLocal={setGraphTypeLocal}
                        popPercentage={popPercentage}
                        setPopPercentage={setPopPercentage}
                        isDynamical={isDynamical}
                        setIsDynamical={setIsDynamical}
                        modulationLocalValue={modulationLocalValue}
                        setModulationLocalValue={setModulationLocalValue}
                        daysCicleLocalValue={daysCicleLocalValue}
                        setDaysCicleLocalValue={setDaysCicleLocalValue}
                        interventionList={interventionList}
                        setInterventionList={setInterventionList}
                    />
                    <MobiltyOutputContainer />
                </Flex>
            </Flex>
        </Flex>
    );
};

export default MobilityMatrix;
