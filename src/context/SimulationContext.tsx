import { createContext, useReducer, useState } from "react";

export enum OptionFeature {
  None = "",
  Graph = "Graph",
  Geographic = "Geographic",
}
export interface InitialConditions {
  population: number;
  R: number;
  I: number;
  I_d: number;
  I_ac: number;
  E: number;
}

export interface SimulatorParams {
  idSim: number;
  idModel: number;
  idGeo: number;
  idGraph: number;
  typeSelection: OptionFeature;
  initialConditions: InitialConditions;
}

interface ActionsSimulationData {
  type: string;
  payload?: SimulatorParams;
  payloadInitialConditions?: SimulatorParams["initialConditions"];
  element?: string | boolean | number;
  target?: string;
  id?;
}
interface ActionsIdSimulation {
  type: string;
  payload: number;
}
export interface SimulationType {
  idSimulationUpdating: number;
  // setIdSimulationUpdating: (value: number) => void;
  setIdSimulationUpdating: (value: ActionsIdSimulation) => void;
  simulation: SimulatorParams[] | [];
  setSimulation: (values: ActionsSimulationData) => void;
}

export const SimulationSetted = createContext<SimulationType>({
  idSimulationUpdating: 0,
  setIdSimulationUpdating: () => {},
  simulation: [],
  setSimulation: () => {},
});

// eslint-disable-next-line react/prop-types
const SimulationContext: React.FC = ({ children }) => {
  const initialState: SimulatorParams | [] = [];

  const reducer = (
    state: SimulationType["simulation"],
    action: ActionsSimulationData
  ) => {
    switch (action.type) {
      case "add":
        return [...state, action.payload];
      case "update":
        return state.map((e) => {
          if (e.idSim === action.id) {
            e[action.target] = action.element;
          }
          return e;
        });
      case "update-initial-conditions":
        return state.map((e) => {
          if (e.idSim === action.id) {
            e.initialConditions = action.payloadInitialConditions;
          }
          return e;
        });
      case "remove":
        return state.filter(
          (e: SimulatorParams) => e.idSim !== +action.element
        );
      default:
        return state;
    }
  };
  const reducerIdSimulation = (state: number, action: ActionsIdSimulation) => {
    if (action.type === "set") {
      return action.payload;
    }
    return state;
  };
  const [simulatorElements, setSimulatorElements] = useReducer(
    reducer,
    initialState
  );
  const [idSimulationUpdating, setIdSimulationUpdating] = useReducer(
    reducerIdSimulation,
    0
  );
  return (
    <SimulationSetted.Provider
      value={{
        simulation: simulatorElements,
        setSimulation: setSimulatorElements,
        idSimulationUpdating,
        setIdSimulationUpdating,
      }}
    >
      {children}
    </SimulationSetted.Provider>
  );
};

export default SimulationContext;
