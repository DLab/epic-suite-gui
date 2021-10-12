import { createContext } from "react";

interface StatesProps {
  mode: string;
  setMode: (value: string) => void;
  states: string[] | null | undefined;
  setStates: (value: string[]) => void;
  counties: string[] | null | undefined;
  setCounties: (value: string[]) => void;
}

const SelectFeatureContext = createContext<StatesProps | undefined>(undefined);

export default SelectFeatureContext;
