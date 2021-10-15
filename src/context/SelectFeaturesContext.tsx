import { createContext } from "react";

interface StatesProps {
  mode: string;
  setMode: (value: string) => void;
  states: string[];
  setStates: (value: string[]) => void;
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
