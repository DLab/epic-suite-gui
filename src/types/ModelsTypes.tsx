import { EpidemicsData } from "types/ControlPanelTypes";

export interface ActionsModelsData {
  type: string;
  payload?: DataParameters;
  element?: string;
}

export interface DataParameters {
  parameters: EpidemicsData;
  id: number;
}
export interface ModelAttributes {
  parameters: DataParameters[] | [];
  setParameters: (values: ActionsModelsData) => void;
}
