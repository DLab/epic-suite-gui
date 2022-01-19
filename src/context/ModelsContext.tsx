import { createContext, useReducer } from "react";

import {
    ActionsModelsData,
    DataParameters,
    ModelAttributes,
} from "types/ModelsTypes";

export const ModelsSaved = createContext<ModelAttributes>({
    parameters: [],
    initialParameters: [],
    setInitialParameters: () => {},
    setParameters: () => {},
});

// eslint-disable-next-line react/prop-types
const ModelsContext: React.FC = ({ children }) => {
    const initialStateRed: DataParameters | [] = [];

    const reducer = (
        state: ModelAttributes["parameters"],
        action: ActionsModelsData
    ) => {
        switch (action.type) {
            case "add":
                return [...state, action.payload];
            case "remove":
                return state.filter(
                    (e: DataParameters) => e.id !== +action.element
                );
            case "update":
                return state.map((e) => {
                    if (e.id === +action.element) {
                        e.parameters = action.payload.parameters;
                    }
                    return e;
                });
            case "set":
                return [...state, ...action.initial];
            case "reset":
                return [...action.initial];
            default:
                return state;
        }
    };
    const reducerInitialParameters = (
        state: ModelAttributes["parameters"],
        action: ActionsModelsData
    ) => {
        if (action.type === "reset") {
            return [...action.initial];
        }
        return state;
    };
    const initialStateParameters: DataParameters | [] = [];
    const [params, setParameters] = useReducer(reducer, initialStateRed);
    const [initialParames, setInitialParameters] = useReducer(
        reducerInitialParameters,
        initialStateParameters
    );
    return (
        <ModelsSaved.Provider
            value={{
                parameters: params,
                setParameters,
                initialParameters: initialParames,
                setInitialParameters,
            }}
        >
            {children}
        </ModelsSaved.Provider>
    );
};

export default ModelsContext;
