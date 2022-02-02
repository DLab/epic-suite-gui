import VariableDependentTime from "./VariableDependentTime";

// Updated into ActionsEpidemicData payload: add string[] type
export interface ActionsEpidemicData {
    type: string;
    payload?: string | number | EpidemicsData | string[];
    payloadVariableDependent?: VariableDependentTime;
    target?: string;
    updateData?: EpidemicsData;
    switch?: boolean;
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
    beta: VariableDependentTime;
    mu: number;
    rR_S: VariableDependentTime;
    alpha: VariableDependentTime;
    tE_I: VariableDependentTime;
    tI_R: VariableDependentTime;
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
    S: number;
    R: number;
    I: number;
    I_d: number;
    I_ac: number;
    E?: number;
    H?: number;
    H_acum?: number;
    V?: number;
    V_acum?: number;
    D?: number;
    D_acum?: number;
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
