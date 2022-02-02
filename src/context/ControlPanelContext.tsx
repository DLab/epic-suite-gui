import { createContext, useReducer, useState } from "react";

import {
    ActionsEpidemicData,
    Model,
    EpidemicsData,
    ActionsInitialConditions,
    InitialConditions,
    EpidemicAttributes,
} from "types/ControlPanelTypes";
import { NameFunction } from "types/VariableDependentTime";

export const initialState: EpidemicsData = {
    name_model: "Model 1",
    name: "SEIR",
    compartments: ["S", "E", "I", "R"],
    t_init: "",
    t_end: 500,
    pI_det: 1,
    beta: {
        rangeDays: [[0, 500]],
        type: [
            {
                name: NameFunction.static,
                value: 0.3,
            },
        ],
        name: "beta",
        default: 0.3,
        isEnabled: false,
        val: 0.3,
    },
    mu: 1.5,
    rR_S: {
        rangeDays: [[0, 500]],
        type: [
            {
                name: NameFunction.static,
                value: 0,
            },
        ],
        name: "rR_S",
        default: 0,
        isEnabled: false,
        val: 0,
    },
    alpha: {
        rangeDays: [[0, 500]],
        type: [
            {
                name: NameFunction.static,
                value: 1,
            },
        ],
        name: "alpha",
        default: 1,
        isEnabled: false,
        val: 1,
    },
    tE_I: {
        rangeDays: [[0, 500]],
        type: [
            {
                name: NameFunction.static,
                value: 4,
            },
        ],
        name: "tE_I",
        default: 4,
        isEnabled: false,
        val: 0.3,
    },
    tI_R: {
        rangeDays: [[0, 500]],
        type: [
            {
                name: NameFunction.static,
                value: 7,
            },
        ],
        name: "tI_R",
        default: 7,
        isEnabled: false,
        val: 7,
    },
};
const initialConditions: InitialConditions = {
    S: 0,
    R: 0,
    I: 0,
    I_d: 0,
    I_ac: 0,
    E: 0,
    H: 0,
    H_acum: 0,
    V: 0,
    V_acum: 0,
    D: 0,
    D_acum: 0,
};
export const ControlPanel = createContext<EpidemicAttributes>({
    mode: Model.Add,
    setMode: () => {},
    parameters: initialState,
    setParameters: () => {},
    idModelUpdate: 0,
    setIdModelUpdate: () => {},
    initialConditions,
    setInitialConditions: () => {},
    idSimulation: 0,
    setIdSimulation: () => {},
});

// eslint-disable-next-line react/prop-types
const ControlPanelContext: React.FC = ({ children }) => {
    const initialStateRed: EpidemicsData = initialState;

    const reducer = (state: EpidemicsData, action: ActionsEpidemicData) => {
        if (action.type === "set") {
            return {
                ...state,
                [action.target]: action.payload,
            };
        }
        if (action.type === "setVariableDependent") {
            return {
                ...state,
                [action.target]: action.payloadVariableDependent,
            };
        }
        if (action.type === "update") {
            return action.updateData;
        }
        if (action.type === "switch") {
            return {
                ...state,
                [action.target]: {
                    ...state[action.target],
                    isEnabled: action.switch,
                },
            };
        }
        return state;
    };

    const reducerInitCond = (
        state: InitialConditions,
        actions: ActionsInitialConditions
    ) => {
        switch (actions.type) {
            case "set":
                return {
                    ...state,
                    [actions.target]: actions.payload,
                };
            case "real-conditions":
                return actions.real;
            default:
                return state;
        }
    };

    const [initCond, setInitCond] = useReducer(
        reducerInitCond,
        initialConditions
    );
    const [params, setParameters] = useReducer(reducer, initialStateRed);
    const [mode, setMode] = useState<Model>(Model.Add);
    const [idModelUpdate, setIdModelUpdate] = useState(0);
    const [idSimulation, setIdSimulation] = useState(0);
    return (
        <ControlPanel.Provider
            value={{
                parameters: params,
                setParameters,
                mode,
                setMode,
                idModelUpdate,
                setIdModelUpdate,
                initialConditions: initCond,
                setInitialConditions: setInitCond,
                idSimulation,
                setIdSimulation,
            }}
        >
            {children}
        </ControlPanel.Provider>
    );
};

export default ControlPanelContext;
