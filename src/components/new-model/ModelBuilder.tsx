import { Box, Flex, Portal } from "@chakra-ui/react";
// import SectionVariableDependentTime from "components/map-results/SectionVariableDependentTime";
import { useContext, useEffect, useState } from "react";

import ToastMessage from "../simulator/controllers/ToastMessage";
import ModelController from "components/new-model/ModelController";
import SectionVariableDependentTime from "components/new-model/SectionVariableDependentTime";
import { SelectFeature } from "context/SelectFeaturesContext";
import countiesData from "data/counties.json";
import stateData from "data/states.json";
import VariableDependentTime, {
    NameFunction,
} from "types/VariableDependentTime";

interface Props {
    isEditing: boolean;
    setIsEditing: (val: boolean) => void;
    showSectionVariable: boolean;
    setShowSectionVariable: (values: boolean) => void;
    setShowSectionInitialConditions: (value: boolean) => void;
    setDataViewVariable: (values: VariableDependentTime) => void;
    setPositionVDT: (value: number) => void;
    idGeo: number | string;
    modelCompartment: string;
    graphsSelectedValue: undefined | string[];
    populationValue: string;
    dataSourceValue: string;
}

const ModelBuilder = ({
    isEditing,
    setIsEditing,
    showSectionVariable,
    setShowSectionInitialConditions,
    setShowSectionVariable,
    setPositionVDT,
    setDataViewVariable,
    idGeo,
    modelCompartment,
    graphsSelectedValue,
    populationValue,
    dataSourceValue,
}: Props) => {
    const { geoSelections: allGeoSelections } = useContext(SelectFeature);
    const [nodes, setNodes] = useState([]);
    const getNamesGeo = (scale, featureSelected) => {
        let nodesNamesArray = [];
        featureSelected.forEach((feature) => {
            if (scale === "States") {
                nodesNamesArray = [
                    ...nodesNamesArray,
                    stateData.data.find((state) => state[0] === feature)[2],
                ];
            } else {
                nodesNamesArray = [
                    ...nodesNamesArray,
                    countiesData.data.find((state) => state[5] === feature)[7],
                ];
            }
        });
        return nodesNamesArray;
    };

    useEffect(() => {
        if (dataSourceValue === "geographic") {
            // if (idGeo !== undefined && idGeo !== "")
            const geoSelected = allGeoSelections.find((geoSelection) => {
                return geoSelection.id === idGeo;
            });
            if (populationValue === "metapopulation") {
                const geoNames = getNamesGeo(
                    geoSelected.scale,
                    geoSelected.featureSelected
                );
                setNodes(geoNames);
            }
            if (populationValue === "monopopulation") {
                setNodes([geoSelected.name]);
            }
        }
        if (dataSourceValue === "graph") {
            setNodes(graphsSelectedValue);
        }
    }, [
        allGeoSelections,
        dataSourceValue,
        graphsSelectedValue,
        idGeo,
        populationValue,
    ]);

    return (
        <>
            <ModelController
                showSectionVariable={setShowSectionVariable}
                setDataView={setDataViewVariable}
                modelCompartment={modelCompartment}
                nodes={["california"]}
                // nodes={nodes}
                setPositionVDT={setPositionVDT}
                setShowSectionInitialConditions={
                    setShowSectionInitialConditions
                }
            />

            {/* <Flex w="5%" direction="column">
                <ToastMessage
                    isEditing={isEditing}
                    closeUpdatingModel={setIsEditing}
                />
            </Flex> */}
        </>
    );
};

export default ModelBuilder;
