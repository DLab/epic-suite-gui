import { createContext, useReducer } from "react";

import {
  ActionsModelsData,
  DataParameters,
  ModelAttributes,
} from "types/ModelsTypes";

export const ModelsSaved = createContext<ModelAttributes>({
  parameters: [],
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
        return state.filter((e: DataParameters) => e.id !== +action.element);
      case "update":
        return state.map((e) => {
          if (e.id === +action.element) {
            e.parameters = action.payload.parameters;
          }
          return e;
        });
      default:
        return state;
    }
  };
  const [params, setParameters] = useReducer(reducer, initialStateRed);
  return (
    <ModelsSaved.Provider value={{ parameters: params, setParameters }}>
      {children}
    </ModelsSaved.Provider>
  );
};

export default ModelsContext;
