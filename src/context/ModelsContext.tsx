import { createContext, useReducer } from "react";

import { EpidemicsData } from "context/ControlPanelContext";

export interface ActionsModelsData {
  type: string;
  payload?: DataParameters;
  element?: string;
}

export interface DataParameters {
  spatialSelection: string[] | [];
  parameters: EpidemicsData;
  id: number;
}
export interface ModelAttributes {
  parameters: DataParameters[] | [];
  setParameters: (values: ActionsModelsData) => void;
}

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
