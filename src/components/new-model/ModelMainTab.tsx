import {
    Flex,
    Spinner,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import React, { useState } from "react";

import { InitialConditionsNewModel } from "types/ControlPanelTypes";
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

const ModelMainTab = ({ id, initialConditions }: Props) => {
    const [modelName, setModelName] = useState("");
    const [modelValue, setModelValue] = useState(undefined);
    const [numberOfNodes, setNumberOfNodes] = useState(0);
    const [dataSourceValue, setDataSourceValue] = useState(undefined);
    const [areaSelectedValue, setAreaSelectedValue] = useState(undefined);
    const [populationValue, setPopulationValue] = useState(undefined);
    const [graphId, setGraphId] = useState(undefined);
    const [showSectionInitialConditions, setShowSectionInitialConditions] =
        useState(false);

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

    return (
        <Flex ml="2%" p="0" h="100%">
            <Flex
                direction="column"
                w="35%"
                bg="#FAFAFA"
                borderRadius="6px"
                boxShadow="sm"
            >
                <Accordion
                    key="new-models-accordion"
                    allowMultiple
                    // h="85%"
                    overflowY="auto"
                    overflowX="hidden"
                    maxH="100%"
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
                        setGraphId={setGraphId}
                        id={id}
                        showSectionInitialConditions={
                            showSectionInitialConditions
                        }
                        setShowSectionInitialConditions={
                            setShowSectionInitialConditions
                        }
                    />
                    <ParametersAccordion
                        showSectionVariable={showSectionVariable}
                        setShowSectionVariable={setShowSectionVariable}
                        setDataViewVariable={setDataViewVariable}
                        setPositionVDT={setPositionVDT}
                        setShowSectionInitialConditions={
                            setShowSectionInitialConditions
                        }
                    />
                </Accordion>
            </Flex>
            {numberOfNodes !== 0 &&
                showSectionInitialConditions &&
                !showSectionVariable &&
                ((areaSelectedValue !== undefined &&
                    areaSelectedValue !== "") ||
                    graphId !== undefined) && (
                    <Flex
                        direction="column"
                        w="65%"
                        m="0 2%"
                        bg="#FAFAFA"
                        borderRadius="6px"
                        boxShadow="sm"
                        overflowY="auto"
                    >
                        {dataSourceValue === "geographic" && (
                            <ModelsMap idGeo={areaSelectedValue} />
                        )}
                        <InitialConditionsModels
                            modelName={modelName}
                            modelValue={modelValue}
                            populationValue={populationValue}
                            id={id}
                            idGeo={areaSelectedValue}
                            idGraph={0}
                            dataSourceValue={dataSourceValue}
                            initialConditionsGraph={initialConditions}
                        />
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
        </Flex>
    );
};

export default ModelMainTab;
