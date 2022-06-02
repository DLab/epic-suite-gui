import { Box, Flex, Portal } from "@chakra-ui/react";
// import SectionVariableDependentTime from "components/map-results/SectionVariableDependentTime";
import _ from "lodash";
import { useContext, useEffect, useState } from "react";

import ToastMessage from "../simulator/controllers/ToastMessage";
import ModelController from "components/new-model/ModelController";
import SectionVariableDependentTime from "components/new-model/SectionVariableDependentTime";
import { ControlPanel } from "context/ControlPanelContext";
import { NewModelSetted } from "context/NewModelsContext";
import { SelectFeature } from "context/SelectFeaturesContext";
import countiesData from "data/counties.json";
import stateData from "data/states.json";
import VariableDependentTime from "types/VariableDependentTime";

import getArrayParametersByNode from "./GetParametersByNodes";

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
    numberNodes: number;
    populationValue: string;
    dataSourceValue: string;
    modelName: string;
    startDate: Date;
    id: number;
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
    numberNodes,
    populationValue,
    dataSourceValue,
    modelName,
    startDate,
    id,
}: Props) => {
    const { geoSelections: allGeoSelections } = useContext(SelectFeature);

    const [nodes, setNodes] = useState([]);
    const { setParameters } = useContext(ControlPanel);
    const { completeModel } = useContext(NewModelSetted);
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
        if (
            dataSourceValue === "geographic" &&
            idGeo !== undefined &&
            idGeo !== ""
        ) {
            const geoSelected = allGeoSelections.find((geoSelection) => {
                return geoSelection.id === idGeo;
            });
            if (populationValue === "metapopulation") {
                const geoNames = getNamesGeo(
                    geoSelected.scale,
                    geoSelected.featureSelected
                );
                const allParametersByNodes = getArrayParametersByNode(
                    modelName,
                    modelCompartment,
                    startDate,
                    geoNames
                );

                setParameters({
                    type: "update",
                    updateData: allParametersByNodes,
                });
                setNodes(geoNames);
            }
            if (populationValue === "monopopulation") {
                const allParametersByNodes = getArrayParametersByNode(
                    modelName,
                    modelCompartment,
                    startDate,
                    [geoSelected.name]
                );
                setParameters({
                    type: "update",
                    updateData: allParametersByNodes,
                });
                setNodes([geoSelected.name]);
            }
        }
        if (dataSourceValue === "graph") {
            let graphsArray = [];
            const getGraphsNamesArray = () => {
                for (let i = 0; i < numberNodes; i += 1) {
                    const graphName = `Graph${i + 1}`;
                    graphsArray = [...graphsArray, graphName];
                }
                return graphsArray;
            };

            const graphsNamesArray = getGraphsNamesArray();
            const allParametersByNodes = getArrayParametersByNode(
                modelName,
                modelCompartment,
                startDate,
                graphsNamesArray
            );
            setParameters({ type: "update", updateData: allParametersByNodes });
            setNodes(graphsNamesArray);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        allGeoSelections,
        dataSourceValue,
        idGeo,
        modelCompartment,
        numberNodes,
        populationValue,
    ]);
    useEffect(() => {
        const findedParameters = completeModel.find(
            (complete) => complete.idNewModel === id
        );
        if (!_.isEmpty(findedParameters)) {
            setParameters({
                type: "update",
                updateData: findedParameters.parameters,
            });
        }
    }, [completeModel, id, setParameters]);
    return (
        <>
            <ModelController
                showSectionVariable={setShowSectionVariable}
                setDataView={setDataViewVariable}
                modelCompartment={modelCompartment}
                // nodes={["california"]}
                nodes={nodes}
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
