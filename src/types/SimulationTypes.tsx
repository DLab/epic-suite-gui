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
    E: number;
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

export interface ActionsSimulationData {
    type: string;
    payload?: SimulatorParams;
    payloadInitialConditions?: SimulatorParams["initialConditions"];
    element?: string | boolean | number;
    target?: string;
    id?;
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
