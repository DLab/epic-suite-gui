import { useState } from "react";

import { TransitionFunction, TypePhase } from "types/VariableDependentTime";

interface WaveForm {
    min?: number;
    max?: number;
    period?: number;
    initPhase?: TypePhase;
    duty?: number; // Agrega la propiedad "duty" aquí
    initvalue?: number;
    endvalue?: number;
    concavity?: number;
    ftype?: number;
    value?: number;
}

export const useWaveformInputs = ({
    min,
    max,
    period,
    initPhase,
    duty, // Agrega la propiedad "duty" aquí
    initvalue,
    endvalue,
    concavity,
    ftype,
    value,
}: WaveForm) => {
    const [state, setstate] = useState<string>(value ? `${value}` : "");
    const [minVal, setMinVal] = useState(min ? `${min}` : "0");
    const [maxVal, setMaxVal] = useState<string>(max ? `${max}` : "");
    const [periodVal, setPeriodVal] = useState(period || 1);
    const [initPhaseVal, setInitPhaseVal] = useState<number>(
        initPhase || TypePhase.min
    );
    const [dutyVal, setDutyVal] = useState(duty ? `${duty}` : "");
    const [transitionVal, setTransitionVal] = useState<TransitionFunction>(
        ftype || TransitionFunction.linear
    );
    const [initVal, setInitVal] = useState<string>(
        initvalue ? `${initvalue}` : ""
    );
    const [endVal, setEndVal] = useState<string>(endvalue ? `${endvalue}` : "");
    const [concavityVal, setConcavityVal] = useState<number>(concavity || 0);

    return {
        minVal,
        setMinVal: (e) => setMinVal(`${e}`),
        maxVal,
        setMaxVal: (e) => setMaxVal(`${e}`),
        periodVal,
        setPeriodVal: (e) => setPeriodVal(+e),
        initPhaseVal,
        setInitPhaseVal: (e) => {
            if (+e === TypePhase.min) {
                setInitPhaseVal(TypePhase.min);
            } else {
                setInitPhaseVal(TypePhase.max);
            }
        },
        dutyVal,
        setDutyVal: (e) => setDutyVal(`${e}`),
        state,
        setstate: (e) => setstate(`${e}`),
        transitionVal,
        setTransitionVal,
        initVal,
        setInitVal,
        endVal,
        setEndVal,
        concavityVal,
        setConcavityVal,
    };
};
