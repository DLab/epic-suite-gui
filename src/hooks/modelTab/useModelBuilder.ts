import _ from "lodash";
import { useContext, useEffect, useState } from "react";

import getArrayParametersByNode from "components/models-tab/GetParametersByNodes";
import { NewModelSetted } from "context/NewModelsContext";
import { SelectFeature } from "context/SelectFeaturesContext";
import countiesData from "data/counties.json";
import stateData from "data/states.json";
import type { NewModelsAllParams } from "types/SimulationTypes";

import useUpdateControlPanel from "./useUpdateControlPanel";

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
function getGraphsNamesArray(numberNodes) {
    return Array.from(
        { length: numberNodes },
        (_element, i) => `Node ${i + 1}`
    );
}
export default function useModelBuilder({
    dataSourceValue,
    idGeo,
    populationValue,
    modelName,
    modelCompartment,
    startDate,
    numberNodes,
}) {
    const { geoSelections: allGeoSelections } = useContext(SelectFeature);

    const [nodes, setNodes] = useState([]);
    // const { setParameters, parameters } = useContext(ControlPanel);
    const updateControlPanel = useUpdateControlPanel();
    const { completeModel, idModelUpdate: id } = useContext(NewModelSetted);
    const sortStrings = (a, b) => {
        if (a > b) {
            return 1;
        }
        if (a < b) {
            return -1;
        }
        return 0;
    };
    /**
     * Returns a list with the name of the nodes of the geographical selection.
     * @param scale spatial scale of geographic selection.
     * @param featureSelected list of the fips of the states or counties of the geographic selection.
     * @returns {string[]}
     */

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
                    geoSelected.featureSelected.sort(sortStrings)
                );
                const allParametersByNodes = getArrayParametersByNode(
                    modelName,
                    modelCompartment,
                    startDate,
                    geoNames
                );
                updateControlPanel({
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
                updateControlPanel({
                    type: "update",
                    updateData: allParametersByNodes,
                });

                setNodes([geoSelected.name]);
            }
        }
        if (dataSourceValue === "graph") {
            const graphsNamesArray = getGraphsNamesArray(numberNodes);
            const allParametersByNodes = getArrayParametersByNode(
                modelName,
                modelCompartment,
                startDate,
                graphsNamesArray
            );
            updateControlPanel({
                type: "update",
                updateData: allParametersByNodes,
            });
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
            (complete: NewModelsAllParams) => complete.idNewModel === id
        );
        if (!_.isEmpty(findedParameters)) {
            updateControlPanel({
                type: "update",
                updateData: findedParameters.parameters,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [completeModel, id]);
    // }, [completeModel, id, updateControlPanel]);
    return {
        nodes,
    };
}
