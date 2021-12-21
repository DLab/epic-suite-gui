import { createContext, useReducer } from "react";

import {
  SimulatorParams,
  ActionsSimulationData,
  ActionsIdSimulation,
  SimulationType,
} from "types/SimulationTypes";

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
