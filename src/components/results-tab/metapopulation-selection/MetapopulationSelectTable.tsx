import { InfoIcon } from "@chakra-ui/icons";
import {
    Checkbox,
    Text,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    Button,
    useToast,
    Select,
    Icon,
    Flex,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";

import metaData from "../../../data/metapopulationData.json";
import { GraphicsData } from "context/GraphicsContext";
import { NewModelSetted } from "context/NewModelsContext";
import { NewModelsAllParams } from "types/SimulationTypes";
import createIdComponent from "utils/createIdcomponent";

type ReducerForMetapopulationSelections = Record<number, boolean>;
type ReducerForAllLists = Record<number, boolean>;

const MetapopulationSelectTable = () => {
    const toast = useToast();
    const [checkList, setCheckList] =
        useState<ReducerForMetapopulationSelections>({});
    const [checkAllList, setCheckAllList] = useState<ReducerForAllLists>({});
    const [displayedParameters, setDisplayedParameters] = useState([]);
    const [parametersNotDisplayed, setParametersNotDisplayed] = useState([]);
    const { selectedModelsToSimulate } = useContext(NewModelSetted);
    const {
        allGraphicData,
        setAllGraphicData,
        setAllResults,
        dataToShowInMap,
    } = useContext(GraphicsData);

    useEffect(() => {
        const { parameters } = selectedModelsToSimulate.filter(
            (sim: NewModelsAllParams) => {
                return sim.populationType === "metapopulation";
            }
        )[0];

        setDisplayedParameters(parameters.compartments);
    }, [selectedModelsToSimulate]);

    useEffect(() => {
        const notDisplayedPametersList = Object.keys(metaData[0]).filter(
            (parameter) => {
                return !displayedParameters.includes(parameter);
            }
        );
        setParametersNotDisplayed(notDisplayedPametersList);
    }, [displayedParameters]);

    const checkAllParameters = (isCheckedListUpdate, value) => {
        let checkListAux = checkList;
        const allCheckListFiltered = Object.keys(isCheckedListUpdate).filter(
            (param) => {
                return param === value;
            }
        );
        allCheckListFiltered.forEach((elem) => {
            if (isCheckedListUpdate[elem]) {
                Object.keys(metaData).forEach((node) => {
                    const newCheckList = {
                        ...checkListAux,
                        [`${elem}-${node}`]: true,
                    };
                    checkListAux = newCheckList;
                    setCheckList(newCheckList);
                });
            } else {
                Object.keys(metaData).forEach((node) => {
                    const newCheckList2 = {
                        ...checkListAux,
                        [`${elem}-${node}`]: false,
                    };
                    checkListAux = newCheckList2;
                    setCheckList(newCheckList2);
                });
            }
        });
    };
    const getLeftAxis = (checkedList) => {
        let savedMetaSimulation = [];
        checkedList.map((parameterSaved) => {
            const hyphenIndex = parameterSaved.indexOf("-");
            const parameterName = parameterSaved.slice(0, hyphenIndex);
            const nodeName = parameterSaved.slice(
                hyphenIndex + 1,
                parameterSaved.length
            );

            const isSimulationSaved = savedMetaSimulation.filter(
                (simulation) => {
                    return simulation.name === nodeName;
                }
            );

            if (isSimulationSaved.length === 0) {
                savedMetaSimulation = [
                    ...savedMetaSimulation,
                    { name: nodeName, keys: [parameterName] },
                ];
            } else {
                savedMetaSimulation = savedMetaSimulation.map((simulation) => {
                    let simulationAux = simulation;
                    if (simulation.name === isSimulationSaved[0].name) {
                        simulationAux = {
                            name: simulation.name,
                            keys: [...simulation.keys, parameterName],
                        };
                    }
                    return simulationAux;
                });
            }
            return savedMetaSimulation;
        });

        return savedMetaSimulation;
    };

    const getGraphicMetaSelections = () => {
        let checkedList = [];
        Object.keys(checkList).forEach((parameter) => {
            if (checkList[parameter]) {
                checkedList = [...checkedList, parameter];
            }
        });
        return checkedList;
    };

    const getGraphicValues = () => {
        try {
            const selectedParametersArray = getGraphicMetaSelections();
            if (selectedParametersArray.length < 1) {
                throw new Error("Choose at least one parameter");
            }
            const graphicDataAux = [
                ...allGraphicData,
                [
                    {
                        graphicName: "",
                        graphicId: createIdComponent(),
                        leftAxis: getLeftAxis(selectedParametersArray),
                        rightAxis: [],
                    },
                ],
            ];
            setAllGraphicData(graphicDataAux);
            setAllResults([].concat(dataToShowInMap, graphicDataAux));
        } catch (error) {
            toast({
                position: "bottom-left",
                title: "Error when graphing",
                description: `${error.message}`,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <>
            <Flex align="center">
                <Icon as={InfoIcon} color="teal" />
                <Text ml="2%">
                    Select parameters of the metapopulation simulation to graph.
                </Text>
            </Flex>
            <TableContainer
                variant="simple"
                bg="white"
                overflowY="auto"
                m="2% 0"
                maxH="70vh"
            >
                <Table size="sm" m="1% 0">
                    <Thead>
                        <Tr>
                            <Th>Node</Th>
                            {displayedParameters.map((parameter) => {
                                return (
                                    <Th>
                                        <Checkbox
                                            onChange={(e) => {
                                                setCheckAllList({
                                                    ...checkAllList,
                                                    [`${parameter}`]:
                                                        e.target.checked,
                                                });
                                                checkAllParameters(
                                                    {
                                                        ...checkAllList,
                                                        [`${parameter}`]:
                                                            e.target.checked,
                                                    },
                                                    parameter
                                                );
                                            }}
                                        >
                                            {parameter}
                                        </Checkbox>
                                    </Th>
                                );
                            })}
                            <Th className="metapopulation-select">
                                <Select
                                    placeholder="+"
                                    bg="#16609e"
                                    borderColor="#16609e"
                                    color="white"
                                    textAlign="center"
                                    p="0"
                                    onChange={(e) => {
                                        setDisplayedParameters([
                                            ...displayedParameters,
                                            e.target.value,
                                        ]);
                                    }}
                                >
                                    {parametersNotDisplayed.map((parameter) => {
                                        return (
                                            <option
                                                style={{
                                                    color: "black",
                                                    fontSize: "16px",
                                                }}
                                                value={parameter}
                                                key={parameter}
                                            >
                                                {parameter}
                                            </option>
                                        );
                                    })}
                                </Select>
                            </Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {/* <Tr>
                            <Td>General results</Td>
                            {displayedParameters.map((parameter) => {
                                return (
                                    <Td>
                                        <Checkbox
                                        // bg="white"
                                        // isChecked={checkList[elem.idNewModel]}
                                        // onChange={(e) => {
                                        //     setCheckList({
                                        //         ...checkList,
                                        //         [`${parameter}-${elem}`]:
                                        //             e.target.checked,
                                        //     });
                                        // }}
                                        />
                                    </Td>
                                );
                            })}
                        </Tr> */}
                        {Object.keys(metaData).map((elem) => {
                            return (
                                <Tr key={elem}>
                                    <Td>{elem}</Td>
                                    {displayedParameters.map((parameter) => {
                                        return (
                                            <Td>
                                                <Checkbox
                                                    isChecked={
                                                        checkList[
                                                            `${parameter}-${elem}`
                                                        ]
                                                    }
                                                    value={parameter}
                                                    onChange={(e) => {
                                                        setCheckList({
                                                            ...checkList,
                                                            [`${parameter}-${elem}`]:
                                                                e.target
                                                                    .checked,
                                                        });
                                                    }}
                                                />
                                            </Td>
                                        );
                                    })}
                                </Tr>
                            );
                        })}
                    </Tbody>
                </Table>
            </TableContainer>
            <Button
                colorScheme="teal"
                onClick={() => {
                    getGraphicValues();
                }}
            >
                Chart
            </Button>
        </>
    );
};

export default MetapopulationSelectTable;
