import { DeleteIcon } from "@chakra-ui/icons";
import {
    Flex,
    Spinner,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Icon,
    Button,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import React, { useCallback, useContext, useEffect, useState } from "react";

import { ControlPanel } from "context/ControlPanelContext";
import { NewModelSetted } from "context/NewModelsContext";
import { SelectFeature } from "context/SelectFeaturesContext";
import { InitialConditionsNewModel } from "types/ControlPanelTypes";
import { NewModelsAllParams, NewModelsParams } from "types/SimulationTypes";
import VariableDependentTime, {
    NameFunction,
} from "types/VariableDependentTime";

import InitialConditionsModels from "./InitialConditionsModel";
import ModelAccordion from "./ModelAccordion";
import ParametersAccordion from "./ParametersAccordion";
import SectionVariableDependentTime from "./SectionVariableDependentTime";

interface Props {
    id: number;
    initialConditions: InitialConditionsNewModel[];
    setTabIndex: (value: number) => void;
    index: number;
}

const ModelsMap = dynamic(() => import("./ModelsMap"), {
    loading: () => (
        <Flex justifyContent="center" alignItems="center" w="100%">
            <Spinner
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

// eslint-disable-next-line complexity
const ModelMainTab = ({ id, initialConditions, setTabIndex, index }: Props) => {
    const [modelName, setModelName] = useState("");
    const [modelValue, setModelValue] = useState(undefined);
    const [numberOfNodes, setNumberOfNodes] = useState(0);
    const [dataSourceValue, setDataSourceValue] = useState(undefined);
    const [areaSelectedValue, setAreaSelectedValue] = useState(undefined);
    const [populationValue, setPopulationValue] = useState(undefined);
    const [graphId, setGraphId] = useState(undefined);
    const [graphsSelectedValue, setGraphsSelectedValue] = useState(undefined);
    const [showSectionInitialConditions, setShowSectionInitialConditions] =
        useState(false);
    const { newModel, setNewModel, completeModel, setCompleteModel } =
        useContext(NewModelSetted);
    const [startDate, setStartDate] = useState(
        new Date(
            newModel.find((model: NewModelsParams) => model.idNewModel === id)
                .t_init ?? new Date(2022, 0, 1)
        )
    );
    const [showSectionVariable, setShowSectionVariable] =
        useState<boolean>(false);
    const [positionVDT, setPositionVDT] = useState<number>(-1);
    const [dataViewVariable, setDataViewVariable] =
        useState<VariableDependentTime>({
            rangeDays: [[0, 500]],
            type: [{ name: NameFunction.static, value: 0 }],
            name: "nothing",
            default: 0.3,
            isEnabled: false,
            val: 0.3,
        });

    const { setParameters, parameters } = useContext(ControlPanel);

    const getDefaultValueParameters = useCallback(
        (field) => {
            return newModel.find(({ idNewModel }) => idNewModel === id)[field];
        },
        [newModel, id]
    );

    const getModelCompleteObj = () => {
        const modelInfo = newModel.find(
            (model: NewModelsParams) => model.idNewModel === id
        );
        const allModelInfo = { ...modelInfo, parameters };
        const modelExist = completeModel.find(
            (model: NewModelsAllParams) => model.idNewModel === id
        );
        if (modelExist !== undefined) {
            setCompleteModel({
                type: "update-all",
                id,
                payload: allModelInfo,
            });
        } else {
            setCompleteModel({
                type: "add",
                payload: allModelInfo,
            });
        }
    };

    useEffect(() => {
        // initialConditions: InitialConditionsNewModel[];
        // t_init: string;
        setModelValue(getDefaultValueParameters("modelType"));
        setDataSourceValue(getDefaultValueParameters("typeSelection"));
        setPopulationValue(getDefaultValueParameters("populationType"));
        setAreaSelectedValue(getDefaultValueParameters("idGeo"));
        setNumberOfNodes(getDefaultValueParameters("numberNodes"));
        setGraphId(getDefaultValueParameters("idGraph"));
        if (getDefaultValueParameters("numberNodes") !== 0) {
            setShowSectionInitialConditions(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getDefaultValueParameters]);
    /* dispatch to simulationContext data about type selection
  when select value is changed. Besides, modify other contexts values */

    useEffect(() => {
        const getName = getDefaultValueParameters("name");
        if (getName === "") {
            const name = `Model ${index + 1}`;
            setModelName(name);
        } else {
            setModelName(getName);
        }
        return () => {
            setModelName("");
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getDefaultValueParameters, index]);

    return (
        <Flex ml="2%" p="0" h="100%" w="100%">
            <Flex
                direction="column"
                w="30%"
                bg="#FAFAFA"
                borderRadius="6px"
                boxShadow="sm"
                alignItems="center"
            >
                <Accordion
                    key="new-models-accordion"
                    allowMultiple
                    w="100%"
                    overflowY="auto"
                    overflowX="hidden"
                    maxH="100%"
                    defaultIndex={[0]}
                >
                    <ModelAccordion
                        modelName={modelName}
                        setModelName={setModelName}
                        modelValue={modelValue}
                        setModelValue={setModelValue}
                        populationValue={populationValue}
                        setPopulationValue={setPopulationValue}
                        setNumberOfNodes={setNumberOfNodes}
                        dataSourceValue={dataSourceValue}
                        setDataSourceValue={setDataSourceValue}
                        areaSelectedValue={areaSelectedValue}
                        setAreaSelectedValue={setAreaSelectedValue}
                        graphId={graphId}
                        setGraphId={setGraphId}
                        id={id}
                        showSectionInitialConditions={
                            showSectionInitialConditions
                        }
                        setShowSectionInitialConditions={
                            setShowSectionInitialConditions
                        }
                        graphsSelectedValue={graphsSelectedValue}
                        setGraphsSelectedValue={setGraphsSelectedValue}
                    />
                    {numberOfNodes !== 0 && numberOfNodes !== undefined && (
                        <ParametersAccordion
                            showSectionVariable={showSectionVariable}
                            setShowSectionVariable={setShowSectionVariable}
                            setDataViewVariable={setDataViewVariable}
                            setPositionVDT={setPositionVDT}
                            setShowSectionInitialConditions={
                                setShowSectionInitialConditions
                            }
                            idGeo={areaSelectedValue}
                            modelCompartment={modelValue.toUpperCase()}
                            numberNodes={numberOfNodes}
                            populationValue={populationValue}
                            dataSourceValue={dataSourceValue}
                            modelName={modelName}
                            startDate={startDate}
                            id={id}
                        />
                    )}
                </Accordion>
                {numberOfNodes !== 0 && numberOfNodes !== undefined && (
                    <Button
                        size="sm"
                        colorScheme="teal"
                        m="2%"
                        onClick={() => getModelCompleteObj()}
                    >
                        Save Parameters
                    </Button>
                )}
            </Flex>
            {showSectionInitialConditions && (
                <Flex
                    direction="column"
                    w="64%"
                    m="0 2%"
                    bg="#FAFAFA"
                    borderRadius="6px"
                    boxShadow="sm"
                    overflowY="auto"
                >
                    {dataSourceValue === "geographic" &&
                        areaSelectedValue !== undefined &&
                        areaSelectedValue !== "" && (
                            <ModelsMap idGeo={areaSelectedValue} />
                        )}
                    {numberOfNodes !== 0 && (
                        <InitialConditionsModels
                            modelName={modelName}
                            modelValue={modelValue}
                            populationValue={populationValue}
                            id={id}
                            idGeo={areaSelectedValue}
                            idGraph={0}
                            dataSourceValue={dataSourceValue}
                            initialConditionsGraph={initialConditions}
                            startDate={startDate}
                            setStartDate={setStartDate}
                        />
                    )}
                </Flex>
            )}
            {showSectionVariable && (
                <Flex
                    p="1rem"
                    borderRadius="6px"
                    boxShadow="sm"
                    bg="#FAFAFA"
                    textAlign="center"
                    w="100%"
                >
                    <SectionVariableDependentTime
                        valuesVariablesDependent={dataViewVariable}
                        showSectionVariable={setShowSectionVariable}
                        positionVariableDependentTime={positionVDT}
                    />
                </Flex>
            )}
            <Flex direction="column">
                <Icon
                    color="#16609E"
                    as={DeleteIcon}
                    cursor="pointer"
                    mb="0.3rem"
                    onClick={() => {
                        setNewModel({
                            type: "remove",
                            element: id,
                        });
                        setCompleteModel({
                            type: "remove",
                            element: id,
                        });
                        // deleteFromLocalStorage(idSimulation);
                        // setAlGraphicData([]);
                        // setRealDataSimulationKeys([]);
                        // setDataToShowInMap([]);
                        // setAllResults([].concat([], []));
                        setTabIndex(newModel.length - 2);
                    }}
                />
            </Flex>
        </Flex>
    );
};

export default ModelMainTab;
