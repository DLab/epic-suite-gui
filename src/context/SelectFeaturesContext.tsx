import { createContext } from "react";

export interface DataGeoSelections {
  id: number;
  name?: string;
  mode: string;
  featureSelected: string[];
}

export interface Action {
  type: string;
  payload?: string[];
  geoPayload?: DataGeoSelections;
  element?: string;
}

interface StatesProps {
  mode: string;
  setMode: (value: string) => void;
  states: string[];
  setStates: (value: Action) => void;
  counties?: string[] | null | undefined;
  setCounties: (value: Action) => void;
  geoSelections: DataGeoSelections[] | [];
  setGeoSelections: (values: Action) => void;
}

const SelectFeatureContext = createContext<StatesProps>({
  mode: "National",
  setMode: () => {},
  states: [],
  setStates: () => {},
  counties: [],
  setCounties: () => {},
  geoSelections: [],
  setGeoSelections: () => {},
});

export default SelectFeatureContext;
