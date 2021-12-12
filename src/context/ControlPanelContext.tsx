import { createContext, useReducer, useState } from "react";
// Updated into ActionsEpidemicData payload: add string[] type
interface ActionsEpidemicData {
  type: string;
  payload?: string | number | EpidemicsData | string[];
  target?: string;
  updateData?: EpidemicsData;
}
interface ActionModeModel {
  type: Model;
}
export enum Model {
  Update = "Update",
  Add = "Add",
}
export interface EpidemicsData {
  name_model: string;
  name: string;
  compartments?: string[];
  t_init: number;
  t_end: number;
  timestep: number;
  pI_det: number;
  beta: number;
  mu: number;
  rR_S: number;
  alfa: number;
  tE_I: number;
  tI_R: number;
}

// actions
interface ActionsInitialConditions {
  type: string;
  payload?: number;
  target?: string;
  real?: InitialConditions;
}
// initialConditions
interface InitialConditions {
  population: number;
  R: number;
  I: number;
  I_d: number;
  I_ac: number;
  E: number;
}

interface EpidemicAttributes {
  mode: Model;
  parameters?: EpidemicsData;
  setParameters: (values: ActionsEpidemicData) => void;
  setMode: (value: Model) => void;
  idModelUpdate: number;
  setIdModelUpdate: (value: number) => void;
  initialConditions: InitialConditions;
  setInitialConditions: (value: ActionsInitialConditions) => void;
  idSimulation: number;
  setIdSimulation: (value: number) => void;
}
const initialState: EpidemicsData = {
  name_model: "Model 1",
  name: "SEIR",
  compartments: ["S", "E", "I", "R"],
  t_init: 0,
  t_end: 1,
  timestep: 0.01,
  pI_det: 0.01,
  beta: 0.01,
  mu: 0.01,
  rR_S: 0.001,
  alfa: 0.01,
  tE_I: 0.01,
  tI_R: 0.01,
};
const initialConditions: InitialConditions = {
  population: 0,
  R: 0,
  I: 0,
  I_d: 0,
  I_ac: 0,
  E: 0,
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
    if (action.type === "update") {
      return action.updateData;
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
