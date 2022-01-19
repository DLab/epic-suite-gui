interface VariableDependentTime {
    rangeDays: number[][];
    type: (Sine | Square | Transition | StaticValue)[];
    name: string;
    default: number;
    isEnabled: boolean;
    val: number;
}

export interface StaticValue {
    name: NameFunction.static;
    value: number;
}

export interface Sine {
    name: NameFunction;
    min: number;
    max: number;
    period: number;
    initPhase: TypePhase;
}
export enum NameFunction {
    sinusoidal = "sinusoidal",
    square = "square",
    static = "static",
    transition = "transition",
}
export enum TypePhase {
    min = "min",
    max = "max",
}
export interface Square extends Sine {
    duty: number;
}

export enum TransitionFunction {
    linear = "linear",
    quadratic = "quadratic",
    sigmoidal = "sigmoidal",
}

export interface Transition {
    name: NameFunction;
    transition: TransitionFunction;
    min: number;
    max: number;
    concavity: number;
    gw?: number;
}

export default VariableDependentTime;
