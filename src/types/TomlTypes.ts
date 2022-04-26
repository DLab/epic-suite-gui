import { number } from "prop-types";

import { InitialConditions } from "./SimulationTypes";

export interface EpicConfigToml {
    title?: string;
    date?: string;
    user?: string;
    model?: Model;
    data?: DataModel;
    parameters: ParametersConfig;
    initialconditions: InitialConditions;
}

interface Model {
    name: string;
    compartments: string[];
}
interface DataModel {
    initdate: string;
    country: string;
    state: string | string[];
    county: string | string[];
    healthservice: string;
    loc_name: string;
}
interface ParametersConfig {
    static: StaticParameters;
    dynamic: DynamicParameters;
}

interface StaticParameters {
    t_init: number;
    t_end: number;
    timestep: number;
    k_I: number;
    k_R: number;
    seroprevfactor: number;
    expinfection: number;
    mu: number;
    pI_det: number;
}
export interface DynamicParameters {
    beta: string | number;
    alpha: string | number;
    S_f?: string | number;
    E_f?: string | number;
    I_f?: string | number;
    R_f?: string | number;
    Beta_v?: string | number;
    rR_S: number;
    tE_I: number;
    tI_R: number;
    vac_d?: string | number;
    vac_eff?: string | number;
    pE_Im?: string | number;
    tE_Im?: string | number;
    pE_Icr?: string | number;
    tE_Icr?: string | number;
    tEv_Iv?: string | number;
    tIm_R?: string | number;
    tIcr_H?: string | number;
    pIv_R?: string | number;
    tIv_R?: string | number;
    pIv_H?: string | number;
    tIv_H?: string | number;
    pH_R?: string | number;
    tH_R?: string | number;
    pH_D?: string | number;
    tH_D?: string | number;
    pR_S?: string | number;
    tR_S?: string | number;
}
