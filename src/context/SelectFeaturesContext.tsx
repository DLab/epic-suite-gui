import { createContext } from "react";
// hasta acá
export interface Action {
  type: string;
  payload: string[];
}

interface StatesProps {
  mode: string;
  setMode: (value: string) => void;
  states: string[];
  setStates: (value: Action) => void;
  counties?: string[] | null | undefined;
  setCounties: (value: Action) => void;
}

const SelectFeatureContext = createContext<StatesProps>({
  mode: "National",
  setMode: () => {},
  states: [],
  setStates: () => {},
  counties: [],
  setCounties: () => {},
});

export default SelectFeatureContext;
