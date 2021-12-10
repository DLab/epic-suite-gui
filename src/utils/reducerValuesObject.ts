import { InitialConditions } from "context/SimulationContext";

const reducerValuesObjects = (obj: InitialConditions) => {
  return Object.values(obj).reduce((acc, it) => acc + it, 0);
};

export default reducerValuesObjects;
