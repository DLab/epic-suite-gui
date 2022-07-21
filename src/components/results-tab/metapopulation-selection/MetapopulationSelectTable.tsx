import {
    Checkbox,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    Button,
    useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";

import metaData from "../../../data/metapopulationData.json";
import { GraphicsData } from "context/GraphicsContext";
import createIdComponent from "utils/createIdcomponent";

type ReducerForMetapopulationSelections = Record<number, boolean>;
type ReducerForAllLists = Record<number, boolean>;

const MetapopulationSelectTable = () => {
    const toast = useToast();
    const [checkList, setCheckList] =
        useState<ReducerForMetapopulationSelections>({});
    const [checkAllList, setCheckAllList] = useState<ReducerForAllLists>({});
    const {
        allGraphicData,
        setAllGraphicData,
        setAllResults,
        dataToShowInMap,
    } = useContext(GraphicsData);

    useEffect(() => {
        let checkListAux = checkList;
        Object.keys(checkAllList).forEach((elem) => {
            if (checkAllList[elem]) {
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checkAllList]);

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
                throw new Error("Elegir al menos un parámetro");
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
                title: `${error.message}`,
                description: `${error.message}`,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <>
            <TableContainer variant="simple" bg="white" overflowY="auto">
                <Table size="sm">
                    <Thead>
                        <Tr>
                            <Th>Node</Th>
                            {Object.keys(metaData[0]).map((parameter) => {
                                return (
                                    <Th>
                                        <Checkbox
                                            onChange={(e) => {
                                                setCheckAllList({
                                                    ...checkAllList,
                                                    [`${parameter}`]:
                                                        e.target.checked,
                                                });
                                            }}
                                        >
                                            {parameter}
                                        </Checkbox>
                                    </Th>
                                );
                            })}
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>General results</Td>
                            {Object.keys(metaData[0]).map((parameter) => {
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
                        </Tr>
                        {Object.keys(metaData).map((elem) => {
                            return (
                                <Tr key={elem}>
                                    <Td>{elem}</Td>
                                    {Object.keys(metaData[0]).map(
                                        (parameter) => {
                                            return (
                                                <Td>
                                                    <Checkbox
                                                        // bg="white"
                                                        isChecked={
                                                            checkList[
                                                                `${parameter}-${elem}`
                                                            ]
                                                        }
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
                                        }
                                    )}
                                </Tr>
                            );
                        })}
                    </Tbody>
                </Table>
            </TableContainer>
            <Button
                onClick={() => {
                    getGraphicValues();
                }}
            >
                Run
            </Button>
        </>
    );
};

export default MetapopulationSelectTable;
