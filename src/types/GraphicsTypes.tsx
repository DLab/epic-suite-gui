export interface DoubleYAxisData {
    leftAxis: SavedSimulationData[];
    rightAxis: SavedSimulationData[] | unknown;
}

export interface SavedSimulationData {
    name: string;
    keys: string[];
}

export interface LooseObject {
    [key: string]: unknown;
}

export interface CheckedObject {
    [key: string]: boolean;
}

export interface CheckedItems {
    [key: string]: CheckedObject;
}

export interface SimulationKeysData {
    E: LooseObject;
    E_ac: LooseObject;
    E_d: LooseObject;
    Flux: LooseObject;
    I: LooseObject;
    I_ac: LooseObject;
    I_ac_det: LooseObject;
    I_d: LooseObject;
    I_d_det: LooseObject;
    I_det: LooseObject;
    R: LooseObject;
    R_ac: LooseObject;
    R_d: LooseObject;
    S: LooseObject;
    dates: LooseObject;
    name: "";
    prevalence_det: LooseObject;
    prevalence_susc: LooseObject;
    prevalence_total: LooseObject;
    t: LooseObject;
}

export interface KeysRealData {
    S?: LooseObject;
    I?: LooseObject;
    E?: LooseObject;
    R?: LooseObject;
    name?: string;
    prevState?: null;
}

export interface GraphicsProps {
    simulationKeys: SimulationKeysData[];
    setSimulationKeys: (value: SimulationKeysData[]) => void;
    realDataSimulationKeys: KeysRealData[];
    setRealDataSimulationKeys: (value: KeysRealData[]) => void;
    savedSimulationKeys: string[];
    setSavedSimulationKeys: (value: string[]) => void;
    savedSimulation: SavedSimulationData[];
    setSavedSimulation: (value: SavedSimulationData[]) => void;
    allGraphicData: DoubleYAxisData[][];
    setAllGraphicData?: (value: DoubleYAxisData[][]) => void;
    checkedItems: CheckedItems;
    setCheckedItems: (value: CheckedItems) => void;
}
