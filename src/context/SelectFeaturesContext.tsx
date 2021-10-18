import { createContext } from "react";

export interface Action {
  type: string;
  payload: string[];
}

interface StatesProps {
  mode: string;
  setMode: (value: string) => void;
  states: string[];
  setStates: (value: Action) => void;
  counties: string[];
  setCounties: (value: string[]) => void;
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
