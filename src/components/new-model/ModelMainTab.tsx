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

import InitialConditionsModels from "./InitialConditionsModel";
import ModelAccordion from "./ModelAccordion";

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
    return (
        <Flex ml="2%" p="0" h="100%">
            <Flex
                direction="column"
                w="35%"
                bg="#FAFAFA"
                borderRadius="6px"
                boxShadow="sm"
                justify="space-between"
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
                />
            </Flex>
            {numberOfNodes !== 0 &&
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
        </Flex>
    );
};

export default ModelMainTab;
