import { createContext, useReducer, useState } from "react";

import {
    SimulatorParams,
    ActionsSimulationData,
    ActionsIdSimulation,
    SimulationType,
    ActionsNewModelData,
    NewModelType,
    NewModelsParams,
    NewModelsAllParams,
} from "types/SimulationTypes";

export const NewModelSetted = createContext<NewModelType>({
    mode: "add",
    setMode: () => {},
    idNewModelUpdating: 0,
    setIdNewModelUpdating: () => {},
    completeModel: [],
    setCompleteModel: () => {},
    newModel: [],
    setNewModel: () => {},
});

// eslint-disable-next-line react/prop-types
const NewModelsContext: React.FC = ({ children }) => {
    const initialState: NewModelsParams | [] = [];
    const initialStateCompleteModel: NewModelsAllParams | [] = [];

    const reducer = (
        state: NewModelType["newModel"],
        action: ActionsNewModelData
    ) => {
        switch (action.type) {
            case "add":
                return [...state, action.payload];
            case "update":
                return state.map((e) => {
                    if (e.idNewModel === action.id) {
                        e[action.target] = action.element;
                    }
                    return e;
                });
            case "update-initial-conditions":
                return state.map((e) => {
                    if (e.idNewModel === action.id) {
                        e.initialConditions = action.payloadInitialConditions;
                    }
                    return e;
                });
            case "update-all":
                return state.map((e, index) => {
                    if (e.idNewModel === action.id) {
                        // eslint-disable-next-line no-param-reassign
                        state[index] = action.payload;
                    }
                    return e;
                });
            case "remove":
                return state.filter(
                    (e: NewModelsParams) => e.idNewModel !== +action.element
                );
            default:
                return state;
        }
    };
    const reducerIdSimulation = (
        state: number,
        action: ActionsIdSimulation
    ) => {
        if (action.type === "set") {
            return action.payload;
        }
        return state;
    };
    const [mode, setMode] = useState("add");
    const [newModel, setNewModel] = useReducer(reducer, initialState);
    const [completeModel, setCompleteModel] = useReducer(
        reducer,
        initialStateCompleteModel
    );
    const [idNewModelUpdating, setIdNewModelUpdating] = useReducer(
        reducerIdSimulation,
        0
    );
    return (
        <NewModelSetted.Provider
            value={{
                mode,
                setMode,
                completeModel,
                setCompleteModel,
                newModel,
                setNewModel,
                idNewModelUpdating,
                setIdNewModelUpdating,
            }}
        >
            {children}
        </NewModelSetted.Provider>
    );
};

export default NewModelsContext;
