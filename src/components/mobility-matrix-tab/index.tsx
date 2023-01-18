import { Flex, Button, Icon, Box } from "@chakra-ui/react";
import React, { useState, useContext, useEffect } from "react";

import { MobilityMatrix as MobilityMatrixContext } from "../../context/MobilityMatrixContext";
import BreadCrumb from "components/BreadCrumb";
import { InterventionsTypes, MobilityModes } from "types/MobilityMatrixTypes";

import MobilityConstructorContainer from "./MobilityConstructorContainer";
import MobiltyOutputContainer from "./MobiltyOutputContainer";
import ModelSelectAndButtons from "./ModelSelectAndButtons";

const MobilityMatrix = () => {
    const { matrixMode, idMobilityMatrixUpdate, mobilityMatrixList } =
        useContext(MobilityMatrixContext);
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

    useEffect(() => {
        if (matrixMode === MobilityModes.Initial) {
            setGraphTypeLocal("");
            setPopPercentage(0);
            setIsDynamical(false);
            setModulationLocalValue("");
            setInterventionList([]);
            setDaysCicleLocalValue(0);
        }
        if (matrixMode === MobilityModes.Update) {
            const {
                populationPercentage,
                dynamical,
                modulationOption,
                interventions,
                graphTypes,
                cicleDays,
            } = mobilityMatrixList.find(
                (matrix) => matrix.id === idMobilityMatrixUpdate
            );
            setGraphTypeLocal(graphTypes);
            setPopPercentage(populationPercentage);
            setIsDynamical(dynamical);
            setModulationLocalValue(modulationOption);
            setInterventionList(interventions);
            setDaysCicleLocalValue(cicleDays);
        }
    }, [idMobilityMatrixUpdate, matrixMode, mobilityMatrixList]);

    return (
        <Flex direction="column">
            <BreadCrumb firstLink="Mobility" />
            <Flex direction="column">
                <ModelSelectAndButtons
                    nodesLocalValue={nodesLocalValue}
                    graphTypeLocal={graphTypeLocal}
                    popPercentage={popPercentage}
                    isDynamical={isDynamical}
                    modulationLocalValue={modulationLocalValue}
                    daysCicleLocalValue={daysCicleLocalValue}
                    interventionList={interventionList}
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
