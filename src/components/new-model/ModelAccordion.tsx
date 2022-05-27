import { ViewIcon } from "@chakra-ui/icons";
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Text,
    Input,
    RadioGroup,
    Stack,
    Radio,
    Select,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    IconButton,
    Flex,
} from "@chakra-ui/react";
import { format } from "date-fns";
import React, { useContext, useEffect, useState } from "react";

import { NewModelSetted } from "context/NewModelsContext";
import { SelectFeature } from "context/SelectFeaturesContext";
import countiesData from "data/counties.json";
import stateData from "data/states.json";

import getInitialConditionsByModel from "./initialConditionsByModel";

interface Props {
    modelName: string;
    setModelName: (value: string) => void;
    modelValue: string;
    setModelValue: (value: string) => void;
    populationValue: string;
    setPopulationValue: (value: string) => void;
    setNumberOfNodes: (value: number) => void;
    dataSourceValue: undefined | string;
    setDataSourceValue: (value: string) => void;
    areaSelectedValue: undefined | string | number;
    setAreaSelectedValue: (value: number | string) => void;
    setGraphId: (value: number) => void;
    id: number;
}

const ModelAccordion = ({
    modelName,
    setModelName,
    modelValue,
    setModelValue,
    populationValue,
    setPopulationValue,
    setNumberOfNodes,
    dataSourceValue,
    setDataSourceValue,
    areaSelectedValue,
    setAreaSelectedValue,
    setGraphId,
    id,
}: Props) => {
    const [numberOfGraphs, setNumberOfGraphs] = useState(undefined);
    const [isDisabled, setIsDisabled] = useState(false);
    const [graphsSelectedValue, setGraphsSelectedValue] = useState(undefined);
    const [geoSelections, setGeoSelections] = useState([]);
    const [minGraphValue, setMinGraphValue] = useState(2);
    const { geoSelections: allGeoSelections } = useContext(SelectFeature);
    const { newModel, setNewModel } = useContext(NewModelSetted);

    useEffect(() => {
        if (populationValue === "monopopulation") {
            setIsDisabled(true);
            setNumberOfGraphs(1);
            setMinGraphValue(1);
        } else {
            setIsDisabled(false);
            setNumberOfGraphs(2);
            setMinGraphValue(2);
        }
    }, [populationValue]);

    useEffect(() => {
        if (modelValue === "seirhvd") {
            const getGeoSelectionNoCounties = allGeoSelections.filter((e) => {
                return e.scale !== "Counties";
            });
            setGeoSelections(getGeoSelectionNoCounties);
        } else {
            setGeoSelections(allGeoSelections);
        }
    }, [modelValue, allGeoSelections]);

    let graphsArray = [];
    const getGraphsNamesArray = (graphsNumber) => {
        for (let i = 0; i < graphsNumber; i += 1) {
            const graphName = `Graph${i + 1}`;
            graphsArray = [...graphsArray, graphName];
        }
        return graphsArray;
    };

    const getInitialConditionsGraphsArray = (graphsValuesArray) => {
        return graphsValuesArray.map((graph) => {
            return {
                name: graph,
                conditionsValues: getInitialConditionsByModel(modelValue),
            };
        });
    };

    const getInitialConditionsGeoArray = (scale, featureSelected) => {
        return featureSelected.map((feature) => {
            if (scale === "States") {
                return {
                    name: stateData.data.find(
                        (state) => state[0] === feature
                    )[2],
                    conditionsValues: getInitialConditionsByModel(modelValue),
                };
            }
            return {
                name: countiesData.data.find(
                    (state) => state[5] === feature
                )[7],
                conditionsValues: getInitialConditionsByModel(modelValue),
            };
        });
    };

    return (
        <Accordion
            key="new-models-accordion"
            allowMultiple
            h="85%"
            overflowY="auto"
            overflowX="hidden"
        >
            <AccordionItem>
                <h2>
                    <AccordionButton
                        color="#16609E"
                        border="none"
                        borderBottom="2px solid #16609E"
                        _focus={{ boxShadow: "none" }}
                    >
                        <Box flex="1" textAlign="left">
                            Model
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel pb={4} bg="#FFFFFF">
                    <Box mb="3%">
                        <Text fontSize="14px" fontWeight={500}>
                            Model Name
                        </Text>
                        <Input
                            w="13rem"
                            placeholder="Add model name"
                            size="sm"
                            onChange={(e) => {
                                setModelName(e.target.value);
                            }}
                            value={modelName}
                        />
                    </Box>
                    <Box mb="3%">
                        <Text fontSize="14px" fontWeight={500}>
                            Model
                        </Text>
                        <RadioGroup
                            size="sm"
                            mt="1%"
                            value={modelValue}
                            onChange={(e) => {
                                setModelValue(e);
                                setAreaSelectedValue("");
                                setGraphId(undefined);
                            }}
                        >
                            <Stack direction="row" spacing="24px">
                                <Radio value="sir">SIR</Radio>
                                <Radio value="seir">SEIR</Radio>
                                <Radio value="seirhvd">SEIRHVD</Radio>
                            </Stack>
                        </RadioGroup>
                    </Box>
                    <Box mb="3%">
                        <Text fontSize="14px" fontWeight={500}>
                            Type of population
                        </Text>
                        <RadioGroup
                            size="sm"
                            mt="1%"
                            value={populationValue}
                            onChange={(e) => {
                                setPopulationValue(e);
                                setAreaSelectedValue("");
                                setGraphId(undefined);
                            }}
                        >
                            <Stack direction="row" spacing="24px">
                                <Radio value="monopopulation">
                                    Monopopulation
                                </Radio>
                                <Radio value="metapopulation">
                                    Metapopulation
                                </Radio>
                            </Stack>
                        </RadioGroup>
                    </Box>
                    <Box mb="3%">
                        <Text fontSize="14px" fontWeight={500}>
                            Data Source
                        </Text>
                        <RadioGroup
                            size="sm"
                            mt="1%"
                            value={dataSourceValue}
                            onChange={(e) => {
                                setDataSourceValue(e);
                                setAreaSelectedValue("");
                                setGraphId(undefined);
                            }}
                        >
                            <Stack direction="row" spacing="24px">
                                <Radio value="graph">Graph</Radio>
                                <Radio value="geographic">Geographic</Radio>
                            </Stack>
                        </RadioGroup>
                    </Box>
                    {dataSourceValue === "graph" && (
                        <Flex mb="3%" alignItems="end">
                            <Box>
                                <Text fontSize="14px" fontWeight={500}>
                                    Number of nodes
                                </Text>
                                <NumberInput
                                    size="sm"
                                    defaultValue={2}
                                    min={minGraphValue}
                                    max={200}
                                    value={numberOfGraphs}
                                    onChange={(e) => {
                                        setNumberOfGraphs(+e);
                                    }}
                                    isDisabled={isDisabled}
                                >
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </Box>
                            <IconButton
                                aria-label="Search database"
                                bg="#16609E"
                                color="#FFFFFF"
                                size="sm"
                                ml="5%"
                                icon={<ViewIcon />}
                                onClick={() => {
                                    setNumberOfNodes(numberOfGraphs);
                                    const graphsValuesArray =
                                        getGraphsNamesArray(numberOfGraphs);
                                    setGraphsSelectedValue(graphsValuesArray);
                                    setGraphId(1);
                                    setNewModel({
                                        type: "update-all",
                                        id,
                                        payload: {
                                            idNewModel: id,
                                            name: modelName,
                                            modelType: modelValue,
                                            populationType: populationValue,
                                            typeSelection: dataSourceValue,
                                            idGeo: undefined,
                                            idGraph: 1,
                                            numberNodes: numberOfGraphs,
                                            t_init: format(
                                                new Date(2021, 11, 31),
                                                "yyyy/MM/dd"
                                            ),
                                            initialConditions:
                                                getInitialConditionsGraphsArray(
                                                    graphsValuesArray
                                                ),
                                        },
                                    });
                                }}
                            />
                        </Flex>
                    )}
                    {dataSourceValue === "geographic" && (
                        <Box mb="3%">
                            <Text fontSize="14px" fontWeight={500}>
                                Area Selected
                            </Text>
                            <Select
                                w="13rem"
                                fontSize="14px"
                                size="sm"
                                placeholder="Name Selection"
                                value={areaSelectedValue}
                                onChange={(e) => {
                                    setAreaSelectedValue(+e.target.value);
                                    const geoSelected = allGeoSelections.find(
                                        (geoSelection) => {
                                            return (
                                                geoSelection.id ===
                                                +e.target.value
                                            );
                                        }
                                    );
                                    const numberGeoNodes =
                                        populationValue === "monopopulation"
                                            ? 1
                                            : geoSelected.featureSelected
                                                  .length;
                                    setNumberOfNodes(
                                        geoSelected.featureSelected.length
                                    );
                                    setNewModel({
                                        type: "update-all",
                                        id,
                                        payload: {
                                            idNewModel: id,
                                            name: modelName,
                                            modelType: modelValue,
                                            populationType: populationValue,
                                            typeSelection: dataSourceValue,
                                            idGeo: areaSelectedValue,
                                            idGraph: undefined,
                                            numberNodes: numberGeoNodes,
                                            t_init: format(
                                                new Date(2021, 11, 31),
                                                "yyyy/MM/dd"
                                            ),
                                            initialConditions:
                                                numberGeoNodes === 1
                                                    ? [
                                                          {
                                                              name: geoSelected.name,
                                                              conditionsValues:
                                                                  getInitialConditionsByModel(
                                                                      modelValue
                                                                  ),
                                                          },
                                                      ]
                                                    : getInitialConditionsGeoArray(
                                                          geoSelected.scale,
                                                          geoSelected.featureSelected
                                                      ),
                                        },
                                    });
                                }}
                            >
                                {allGeoSelections.length > 0 &&
                                    geoSelections.map((e) => {
                                        return (
                                            <option key={e.id} value={e.id}>
                                                {e.name}
                                            </option>
                                        );
                                    })}
                            </Select>
                        </Box>
                    )}
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    );
};

export default ModelAccordion;
