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
    Beta_v: VariableDependentTime;
    mu: number;
    rR_S: VariableDependentTime;
    alpha: VariableDependentTime;
    tE_I: VariableDependentTime;
    tI_R: VariableDependentTime;
    population: number;
    populationfraction: number;
    pIcr_det: number;
    pIm_det: number;
    pIv_det: number;
    vac_d: VariableDependentTime;
    vac_eff: VariableDependentTime;
    pE_Im: VariableDependentTime;
    tE_Im: VariableDependentTime;
    pE_Icr: VariableDependentTime;
    tE_Icr: VariableDependentTime;
    tEv_Iv: VariableDependentTime;
    tIm_R: VariableDependentTime;
    tIcr_H: VariableDependentTime;
    pIv_R: VariableDependentTime;
    tIv_R: VariableDependentTime;
    pIv_H: VariableDependentTime;
    tIv_H: VariableDependentTime;
    pH_R: VariableDependentTime;
    tH_R: VariableDependentTime;
    pH_D: VariableDependentTime;
    tH_D: VariableDependentTime;
    pR_S: VariableDependentTime;
    tR_S: VariableDependentTime;
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
    E: number;
    R: number;
    I: number;
    I_d: number;
    I_ac: number;
    H?: number;
    H_acum?: number;
    V?: number;
    V_acum?: number;
    D?: number;
    D_acum?: number;
    Iv?: number;
    Iv_d?: number;
    Iv_ac?: number;
    H_cap?: number;
    H_d?: number;
    D_d?: number;
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
