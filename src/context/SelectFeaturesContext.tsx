import { createContext } from "react";
// hasta acá
export interface Action {
  type: string;
  payload: string[];
}

interface StatesProps {
  mode: string;
  setMode: (value: string) => void;
  states: string[] | null | undefined;
  setStates: (value: string[]) => void;
  counties?: string[] | null | undefined;
  setCounties: (value: Action) => void;
}

const SelectFeatureContext = createContext<StatesProps | undefined>(undefined);

export default SelectFeatureContext;
