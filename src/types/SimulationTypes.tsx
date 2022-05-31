import { InitialConditionsNewModel } from "./ControlPanelTypes";

export enum OptionFeature {
    None = "",
    Graph = "Graph",
    Geographic = "Geographic",
}

export interface InitialConditions {
    population: number;
    R: number;
    I: number;
    I_d: number;
    I_ac: number;
    E?: number;
    H?: number;
    H_d?: number;
    H_acum?: number;
    Iv_d?: number;
    Iv_ac?: number;
    V?: number;
    V_acum?: number;
    D?: number;
    D_d?: number;
    D_acum?: number;
    Iv?: number;
    H_cap?: number;
}

export interface SimulatorParams {
    name: string;
    idSim: number;
    idModel: number;
    idGeo: number;
    idGraph: number;
    typeSelection: OptionFeature;
    initialConditions: InitialConditions;
    t_init: string;
}

export interface NewModelsParams {
    idNewModel: undefined | number | string;
    name: string;
    modelType: string;
    populationType: string;
    typeSelection: string;
    idGeo: undefined | number | string;
    idGraph: undefined | number;
    initialConditions: InitialConditionsNewModel[];
    numberNodes: number;
    t_init: string;
}

export interface ActionsSimulationData {
    type: string;
    payload?: SimulatorParams;
    payloadInitialConditions?: SimulatorParams["initialConditions"];
    element?: string | boolean | number;
    target?: string;
    id?;
    localState?: SimulatorParams[];
}

export interface ActionsNewModelData {
    type: string;
    payload?: NewModelsParams;
    payloadInitialConditions?: InitialConditionsNewModel[];
    element?: string | boolean | number;
    target?: string;
    id?;
    localState?: NewModelsParams[];
}

export interface ActionsIdSimulation {
    type: string;
    payload: number;
}

export interface SimulationType {
    idSimulationUpdating: number;
    // setIdSimulationUpdating: (value: number) => void;
    setIdSimulationUpdating: (value: ActionsIdSimulation) => void;
    simulation: SimulatorParams[] | [];
    setSimulation: (values: ActionsSimulationData) => void;
}

export interface NewModelType {
    mode: string;
    setMode: (value: string) => void;
    idNewModelUpdating: number;
    setIdNewModelUpdating: (value: ActionsIdSimulation) => void;
    newModel: NewModelsParams[] | [];
    setNewModel: (values: ActionsNewModelData) => void;
}
