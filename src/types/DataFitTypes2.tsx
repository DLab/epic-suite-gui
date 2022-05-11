export interface LooseObject {
    [key: string]: unknown;
}

export interface FittedData {
    I?: LooseObject;
    I_ac?: LooseObject;
    name?: string;
    beta?: number;
    parameter?: number;
    prevState?: null;
}

export interface DataToFit {
    I?: LooseObject;
    I_ac?: LooseObject;
    name?: string;
}

export interface DataFitProps {
    realDataToFit: DataToFit[];
    setRealDataToFit: (value: DataToFit[]) => void;
    fittedData: FittedData[];
    setFittedData: (value: FittedData[]) => void;
}
