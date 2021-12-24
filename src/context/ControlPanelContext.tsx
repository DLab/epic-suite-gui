import { createContext, useReducer, useState } from "react";

import {
  ActionsEpidemicData,
  Model,
  EpidemicsData,
  ActionsInitialConditions,
  InitialConditions,
  EpidemicAttributes,
} from "types/ControlPanelTypes";

const initialState: EpidemicsData = {
  name_model: "Model 1",
  name: "SEIR",
  compartments: ["S", "E", "I", "R"],
  t_init: "",
  t_end: 500,
  pI_det: 1,
  beta: 0.3,
  mu: 1.5,
  rR_S: 0,
  alpha: 1,
  tE_I: 4,
  tI_R: 7,
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
