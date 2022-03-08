import {
    Box,
    Flex,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Checkbox,
} from "@chakra-ui/react";
import React, { useEffect, useContext } from "react";

import { GraphicsData } from "context/GraphicsContext";
import { ModelsSaved } from "context/ModelsContext";
import { SimulationSetted } from "context/SimulationContext";
import { TabIndex } from "context/TabContext";
import { SimulationKeysData } from "types/GraphicsTypes";
import { DataParameters } from "types/ModelsTypes";
import { SimulatorParams } from "types/SimulationTypes";

import RealDataCheckBoxs from "./RealDataCheckBoxs";

const ResultsSelection = () => {
    const { aux: responseSim } = useContext(TabIndex);
    const { simulation: simulationSetted } = useContext(SimulationSetted);
    const { parameters } = useContext(ModelsSaved);
    const {
        simulationKeys,
        setSimulationKeys,
        savedSimulation,
        savedSimulationKeys,
        setSavedSimulationKeys,
        setSavedSimulation,
        checkedItems,
        setCheckedItems,
    } = useContext(GraphicsData);

    const model = ["S", "E", "I", "R"];

    const saveKeys = (ischecked, id, value, name) => {
        const isInclude = savedSimulationKeys.includes(id);
        const isSimulationSaved = savedSimulation.filter((simulation) => {
            return simulation.name === name;
        });

        if (ischecked && !isInclude) {
            if (isSimulationSaved.length === 0) {
                setSavedSimulation([
                    ...savedSimulation,
                    { name, keys: [value] },
                ]);
            } else {
                setSavedSimulation(
                    savedSimulation.map((simulation) => {
                        let simulationAux = simulation;
                        if (simulation.name === isSimulationSaved[0].name) {
                            simulationAux = {
                                name: simulation.name,
                                keys: [...simulation.keys, value],
                            };
                        }

                        return simulationAux;
                    })
                );
            }

            return setSavedSimulationKeys([...savedSimulationKeys, id]);
        }
        if (!ischecked && isInclude) {
            let modifiedSimulations = savedSimulation.map((simulation) => {
                let simulationAux = simulation;
                if (simulation.name === isSimulationSaved[0]?.name) {
                    const simulationAuxFiltered = simulationAux.keys.filter(
                        (simulationValue) => simulationValue !== value
                    );
                    simulationAux = {
                        name: simulation.name,
                        keys: simulationAuxFiltered,
                    };
                }
                return simulationAux;
            });
            modifiedSimulations = modifiedSimulations.filter((simulation) => {
                return simulation.keys.length > 0;
            });
            setSavedSimulation(modifiedSimulations);
            return setSavedSimulationKeys(
                savedSimulationKeys.filter((key) => key !== id)
            );
        }
        return savedSimulationKeys;
    };

    const setEmptyStateCheckedItems = (graphicData) => {
        const auxCheckedItems = {};
        graphicData.forEach((simulation) => {
            const keyList = {};
            Object.keys(simulation).forEach((key) => {
                if (model.includes(key)) {
                    keyList[key] = false;
                }
            });
            auxCheckedItems[simulation.name] = keyList;
        });

        return auxCheckedItems;
    };

    const deleteChildChecked = (oneSimulationKeysData: SimulationKeysData) => {
        /* delete for savedSimulationKeys */
        const savedSimulationKeysToDelete = model.map((key) => {
            return key + oneSimulationKeysData.name;
        });

        const newSavedSimulationKeys = savedSimulationKeys.filter(
            (savedSimulationKey) => {
                if (savedSimulationKeysToDelete.includes(savedSimulationKey)) {
                    return false;
                }
                return true;
            }
        );

        setSavedSimulationKeys(newSavedSimulationKeys);

        /* delete for savedSimulations */

        const oneSavedSimulation = savedSimulation.filter(
            (anotherSavedSimulation) => {
                return (
                    anotherSavedSimulation.name === oneSimulationKeysData.name
                );
            }
        )[0];

        const newOneSavedSimulation = {
            name: oneSavedSimulation?.name,
            keys: oneSavedSimulation?.keys.filter((key) => {
                if (model.includes(key)) {
                    return false;
                }
                return true;
            }),
        };

        let modifiedSimulations = savedSimulation.map(
            (anotherSavedSimulation) => {
                if (
                    anotherSavedSimulation.name === newOneSavedSimulation.name
                ) {
                    return newOneSavedSimulation;
                }
                return anotherSavedSimulation;
            }
        );

        modifiedSimulations = modifiedSimulations.filter(
            (anotherSavedSimulation) => {
                return anotherSavedSimulation.keys.length > 0;
            }
        );

        setSavedSimulation(modifiedSimulations);
    };

    let initialParameters = [];

    const setChildChecked = (oneSimulationKeysData: SimulationKeysData) => {
        /* save for savedSimulationKeys */
        const savedSimulationKeysSave = model.map((key) => {
            return key + oneSimulationKeysData.name;
        });

        const simulationKeyIsInclude = savedSimulationKeysSave.filter((key) => {
            if (savedSimulationKeys.includes(key)) {
                return false;
            }
            return true;
        });

        setSavedSimulationKeys([
            ...savedSimulationKeys,
            ...simulationKeyIsInclude,
        ]);

        /* save for savedSimulations */

        // para verificar si ya existe una simulación con ese nombre

        const isSimulationSaved = savedSimulation.filter((sim) => {
            return oneSimulationKeysData.name === sim.name;
        });

        /* save first parameter */
        if (isSimulationSaved.length === 0) {
            initialParameters = [
                ...initialParameters,
                { name: oneSimulationKeysData.name, keys: model },
            ];
            setSavedSimulation([...savedSimulation, ...initialParameters]);
        } else {
            const parametersToSet = model.filter((modelKey) => {
                if (isSimulationSaved[0].keys.includes(modelKey)) {
                    return false;
                }
                return true;
            });

            setSavedSimulation(
                savedSimulation.map((simulation) => {
                    let simulationAux = simulation;
                    if (simulation.name === isSimulationSaved[0].name) {
                        simulationAux = {
                            name: simulation.name,
                            keys: [...simulation.keys, ...parametersToSet],
                        };
                    }

                    return simulationAux;
                })
            );
        }
    };

    const checkParentChecked = (dataFilter: SimulationKeysData, ischecked) => {
        if (ischecked) {
            setChildChecked(dataFilter);
        } else {
            deleteChildChecked(dataFilter);
        }
    };

    useEffect(() => {
        const graphicData = responseSim ? JSON.parse(responseSim) : "";
        if (graphicData) {
            setSimulationKeys(graphicData);
            setCheckedItems(setEmptyStateCheckedItems(graphicData));
        }
        setSavedSimulationKeys([]);
        setSavedSimulation([]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [responseSim]);

    const getCompartments = (simulation) => {
        const simByName = simulationSetted.find(
            (sim: SimulatorParams) => sim.name === simulation.name
        );
        const paramById = parameters.find(
            (simParams: DataParameters) => simByName?.idModel === simParams.id
        );
        return paramById?.parameters.compartments;
    };

    return (
        <Accordion
            key="results-selection-accordion"
            allowMultiple
            h="85%"
            overflowY="auto"
            overflowX="hidden"
        >
            {simulationKeys.map((simulation) => {
                return (
                    <AccordionItem key={simulation.name} bg="#16609E" mb="30px">
                        <h2>
                            <AccordionButton
                                color="white"
                                _focus={{ boxShadow: "none" }}
                            >
                                <Box flex="1" textAlign="left">
                                    {simulation.name}
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4} bg="#FFFFFF">
                            <Accordion defaultIndex={[0]} allowMultiple>
                                <Checkbox
                                    w="100%"
                                    m="2% 0"
                                    fontWeight={500}
                                    onChange={(e) => {
                                        const keyList = {};
                                        Object.keys(simulation).forEach(
                                            (key) => {
                                                const simCompartments =
                                                    getCompartments(simulation);
                                                if (
                                                    simCompartments.includes(
                                                        key
                                                    )
                                                ) {
                                                    keyList[key] =
                                                        e.target.checked;
                                                }
                                            }
                                        );
                                        setCheckedItems({
                                            ...checkedItems,
                                            [simulation.name]: keyList,
                                        });
                                        checkParentChecked(
                                            simulation,
                                            e.target.checked
                                        );
                                    }}
                                >
                                    Results
                                </Checkbox>
                                <Flex flexWrap="wrap" ml="3%">
                                    {Object.keys(simulation).map((key) => {
                                        const simCompartments =
                                            getCompartments(simulation);
                                        if (simCompartments?.includes(key)) {
                                            return (
                                                <Checkbox
                                                    isChecked={
                                                        checkedItems[
                                                            simulation.name
                                                        ][key]
                                                    }
                                                    size="sm"
                                                    m="2% 5%"
                                                    key={`${
                                                        key + simulation.name
                                                    }`}
                                                    id={`${
                                                        key + simulation.name
                                                    }`}
                                                    value={key}
                                                    onChange={(e) => {
                                                        setCheckedItems({
                                                            ...checkedItems,
                                                            [simulation.name]: {
                                                                ...checkedItems[
                                                                    simulation
                                                                        .name
                                                                ],
                                                                [key]: e.target
                                                                    .checked,
                                                            },
                                                        });

                                                        saveKeys(
                                                            e.target.checked,
                                                            e.target.id,
                                                            e.target.value,
                                                            simulation.name
                                                        );
                                                    }}
                                                >
                                                    {key}
                                                </Checkbox>
                                            );
                                        }
                                        return false;
                                    })}
                                </Flex>
                                <Box
                                    w="100%"
                                    m="2% 7%"
                                    textAlign="start"
                                    fontWeight={500}
                                >
                                    Data
                                </Box>
                                <Flex flexWrap="wrap" ml="3%">
                                    <RealDataCheckBoxs
                                        simName={simulation.name}
                                        saveKeys={saveKeys}
                                    />
                                </Flex>
                                <AccordionItem>
                                    <h2>
                                        <AccordionButton
                                            _focus={{ boxShadow: "none" }}
                                        >
                                            <Box flex="1" textAlign="left">
                                                Other Data
                                            </Box>
                                            <AccordionIcon />
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel pb={4}>
                                        <Flex flexWrap="wrap">
                                            {Object.keys(simulation).map(
                                                (key) => {
                                                    const simCompartments =
                                                        getCompartments(
                                                            simulation
                                                        );
                                                    if (
                                                        !simCompartments?.includes(
                                                            key
                                                        ) &&
                                                        key !== "name"
                                                    ) {
                                                        return (
                                                            <Checkbox
                                                                size="sm"
                                                                m="2% 5%"
                                                                value={key}
                                                                key={key}
                                                                // eslint-disable-next-line sonarjs/no-identical-functions
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    saveKeys(
                                                                        e.target
                                                                            .checked,
                                                                        e.target
                                                                            .id,
                                                                        e.target
                                                                            .value,
                                                                        simulation.name
                                                                    );
                                                                }}
                                                            >
                                                                {key}
                                                            </Checkbox>
                                                        );
                                                    }
                                                    return false;
                                                }
                                            )}
                                        </Flex>
                                    </AccordionPanel>
                                </AccordionItem>
                            </Accordion>
                        </AccordionPanel>
                    </AccordionItem>
                );
            })}
        </Accordion>
    );
};

export default ResultsSelection;
