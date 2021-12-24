// Updated into ActionsEpidemicData payload: add string[] type
export interface ActionsEpidemicData {
  type: string;
  payload?: string | number | EpidemicsData | string[];
  target?: string;
  updateData?: EpidemicsData;
}

export enum Model {
  Update = "Update",
  Add = "Add",
}

export interface EpidemicsData {
  name_model: string;
  name: string;
  compartments?: string[];
  t_init: string;
  t_end: number;
  pI_det: number;
  beta: number;
  mu: number;
  rR_S: number;
  alpha: number;
  tE_I: number;
  tI_R: number;
}

// actions
export interface ActionsInitialConditions {
  type: string;
  payload?: number;
  target?: string;
  real?: InitialConditions;
}
// initialConditions
export interface InitialConditions {
  population: number;
  R: number;
  I: number;
  I_d: number;
  I_ac: number;
  E: number;
}

export interface EpidemicAttributes {
  mode: Model;
  parameters?: EpidemicsData;
  setParameters: (values: ActionsEpidemicData) => void;
  setMode: (value: Model) => void;
  idModelUpdate: number;
  setIdModelUpdate: (value: number) => void;
  initialConditions: InitialConditions;
  setInitialConditions: (value: ActionsInitialConditions) => void;
  idSimulation: number;
  setIdSimulation: (value: number) => void;
}
