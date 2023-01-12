import { Flex, Select, Switch, Text, Input, Box } from "@chakra-ui/react";
import React, { useState, useContext, useEffect } from "react";

import { MobilityMatrix } from "../../context/MobilityMatrixContext";
import { NewModelSetted } from "context/NewModelsContext";
import { SelectFeature } from "context/SelectFeaturesContext";
import { MobilityModes } from "types/MobilityMatrixTypes";

import MobilityInterventions from "./MobilityInterventions";
import NodesAndGraphTypes from "./NodesAndGraphTypes";
// import NumberInputMobilityMatrix from "./NumberInputMobilityMatrix";

const MobilityConstructorContainer = () => {
    const { matrixMode, idMatrixModel } = useContext(MobilityMatrix);
    const [nodesLocalValue, setNodesLocalValue] = useState<
        number | undefined
    >();
    const [graphTypeLocal, setGraphTypeLocal] = useState<string>();
    const [popPercentage, setPopPercentage] = useState<number>();
    const [isDynamical, setIsDynamical] = useState(false);
    const [modulationLocalValue, setModulationLocalValue] = useState<string>();
    const [daysCicleLocalValue, setDaysCicleLocalValue] = useState<number>();
    const { completeModel } = useContext(NewModelSetted);
    const { geoSelections } = useContext(SelectFeature);

    useEffect(() => {
        if (idMatrixModel !== 0) {
            const { idGeo } = completeModel.find((model) => {
                return model.idNewModel === idMatrixModel;
            });
            const { featureSelected } = geoSelections.find((geo) => {
                return geo.id === idGeo;
            });
            setNodesLocalValue(featureSelected.length);
        }
    }, [completeModel, geoSelections, idMatrixModel]);

    return (
        <Flex
            direction="column"
            w="38%"
            borderRadius="8px"
            boxShadow="sm"
            border="1px solid #DDDDDD"
            p="2%"
            h="75vh"
            overflowY="auto"
        >
            {matrixMode !== MobilityModes.Initial && (
                <>
                    <NodesAndGraphTypes
                        nodesLocalValue={nodesLocalValue}
                        setNodesLocalValue={setNodesLocalValue}
                        graphTypeLocal={graphTypeLocal}
                        setGraphTypeLocal={setGraphTypeLocal}
                        popPercentage={popPercentage}
                        setPopPercentage={setPopPercentage}
                    />
                    {graphTypeLocal && (
                        <Flex
                            mb="17px"
                            display="grid"
                            gridTemplateColumns="auto auto"
                            gridGap="15px"
                            alignItems="center"
                        >
                            <Flex>
                                <Switch
                                    mr="7px"
                                    // isChecked={isDynamical}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setIsDynamical(true);
                                        } else {
                                            setIsDynamical(false);
                                        }
                                    }}
                                />
                                <Text fontSize="14px">Dynamical</Text>
                            </Flex>
                            {isDynamical && (
                                <Select
                                    size="sm"
                                    mr="15px"
                                    borderRadius="8px"
                                    placeholder="Modulation options"
                                    value={modulationLocalValue}
                                    onChange={(e) => {
                                        setModulationLocalValue(e.target.value);
                                    }}
                                >
                                    <option key="Weekly" value="weekly">
                                        Weekly
                                    </option>
                                    <option key="Monthly" value="monthly">
                                        Monthly
                                    </option>
                                    <option key="Custom" value="custom">
                                        Custom
                                    </option>
                                </Select>
                            )}
                        </Flex>
                    )}
                    {modulationLocalValue === "custom" && (
                        <Flex mb="10px" alignItems="center">
                            <Box>
                                <Text align="left" fontSize="14px" mr="7px">
                                    Days of cicle
                                </Text>
                            </Box>
                            <Box>
                                <Input
                                    size="sm"
                                    borderRadius="6px"
                                    value={daysCicleLocalValue}
                                    onChange={(e) => {
                                        setDaysCicleLocalValue(+e.target.value);
                                    }}
                                />
                            </Box>
                        </Flex>
                    )}
                    <MobilityInterventions />
                </>
            )}
        </Flex>
    );
};

export default MobilityConstructorContainer;
