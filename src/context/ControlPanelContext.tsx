import { createContext, useReducer, ReactNode } from "react";

interface ActionsEpidemicData {
  type: string;
  payload: string | number;
  target: string;
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
  r_R_S: number;
  alfa: number;
  tE_I: number;
  tI_R: number;
  population: number;
  R: number;
  I: number;
  I_d: number;
  I_ac: number;
  E: number;
}
interface EpidemicAttributes {
  parameters?: EpidemicsData;
  setParameters: (values: ActionsEpidemicData) => void;
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
  mu: 1,
  r_R_S: 0.001,
  alfa: 0,
  tE_I: 0,
  tI_R: 0,
  population: 0,
  R: 0,
  I: 0,
  I_d: 0,
  I_ac: 0,
  E: 0,
};
export const ControlPanel = createContext<EpidemicAttributes>({
  parameters: initialState,
  setParameters: () => {},
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
    return state;
  };
  const [params, setParameters] = useReducer(reducer, initialStateRed);
  return (
    <ControlPanel.Provider value={{ parameters: params, setParameters }}>
      {children}
    </ControlPanel.Provider>
  );
};

export default ControlPanelContext;
