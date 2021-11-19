import { createContext } from "react";

export interface DataGeoSelections {
  id: number;
  name?: string;
  scale: string;
  featureSelected: string[];
}

export interface Action {
  type: string;
  payload?: string[];
  geoPayload?: DataGeoSelections;
  element?: string;
  target?: string;
  updateData?: string[];
}

export enum Model {
  Update = "Update",
  Add = "Add",
}

interface StatesProps {
  mode: Model;
  setMode: (value: Model) => void;
  nameGeoSelection: string;
  setNameGeoSelection: (value: string) => void;
  scale: string;
  setScale: (value: string) => void;
  states: string[];
  setStates: (value: Action) => void;
  counties?: string[] | null | undefined;
  setCounties: (value: Action) => void;
  geoSelections: DataGeoSelections[] | [];
  setGeoSelections: (values: Action) => void;
  idGeoSelectionUpdate: number;
  setIdGeoSelectionUpdate: (value: number) => void;
}

const SelectFeatureContext = createContext<StatesProps>({
  idGeoSelectionUpdate: 0,
  setIdGeoSelectionUpdate: () => {},
  mode: Model.Add,
  setMode: () => {},
  nameGeoSelection: "Geo Selection 1",
  setNameGeoSelection: () => {},
  scale: "National",
  setScale: () => {},
  states: [],
  setStates: () => {},
  counties: [],
  setCounties: () => {},
  geoSelections: [],
  setGeoSelections: () => {},
});

export default SelectFeatureContext;
