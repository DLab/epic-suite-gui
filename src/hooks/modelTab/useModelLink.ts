import { format } from "date-fns";
import { useState, useContext, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";

import { NewModelSetted } from "context/NewModelsContext";
import { update } from "store/ControlPanel";
import { initialState } from "store/reducer";
import type { NewModelsParams } from "types/SimulationTypes";

export default function useModelLink() {
    const {
        newModel,
        setNewModel,
        completeModel,
        mode: modelMode,
        setMode: setModelMode,
        idModelUpdate: modelId,
        setIdModelUpdate: setModelId,
    } = useContext(NewModelSetted);
    const [secondModelLink, setSecondModelLink] = useState(undefined);
    const [actualModelName, setActualModelName] = useState("");
    const [matrixId, setMatrixId] = useState(undefined);
    const dispatch = useDispatch();
    const addNewModel = useCallback(() => {
        const id = Date.now();
        setModelId(id);
        setNewModel({
            type: "add",
            payload: {
                idNewModel: id,
                name: "",
                modelType: undefined,
                populationType: undefined,
                typeSelection: undefined,
                idGeo: undefined,
                idMobilityMatrix: undefined,
                idGraph: undefined,
                numberNodes: undefined,
                t_init: format(new Date(2022, 4, 31), "yyyy/MM/dd"),
                initialConditions: [],
            },
        });
        setModelMode("add");
    }, [setModelId, setModelMode, setNewModel]);

    useEffect(() => {
        if (modelMode === "initial") {
            setActualModelName("");
        }
        if (modelMode === "update") {
            const { name, idMobilityMatrix } = completeModel.find(
                (model: NewModelsParams) =>
                    model.idNewModel.toString() === modelId.toString()
            );
            setActualModelName(name);
            setMatrixId(idMobilityMatrix);
        }
        if (modelMode === "add") {
            dispatch(update({ type: "update", updateData: initialState }));
            setActualModelName("");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modelMode, modelId]);
    return {
        secondModelLink,
        setSecondModelLink,
        actualModelName,
        setActualModelName,
        matrixId,
        setMatrixId,
        newModel,
        setNewModel,
        completeModel,
        modelMode,
        setModelMode,
        modelId,
        setModelId,
        addNewModel,
    };
}
