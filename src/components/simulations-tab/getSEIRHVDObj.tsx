/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable complexity */

import VariableDependentTime, {
    NameFunction,
    Sine,
    Square,
    StaticValue,
    Transition,
} from "types/VariableDependentTime";

const createObjectVariableDependent = (params: VariableDependentTime) => {
    const variableDependent = {
        function: "events",
        values: [],
        days: [],
        default: params.default,
    };
    params.type.forEach((p: Sine | Square | Transition | StaticValue, i) => {
        variableDependent.days.push(params.rangeDays[i]);
        switch (p.name) {
            case NameFunction.sinusoidal:
                variableDependent.values.push({
                    function: "sine",
                    min_val: p.min,
                    max_val: p.max,
                    period: p["period"],
                    initphase: p["initPhase"],
                });
                break;
            case NameFunction.square:
                variableDependent.values.push({
                    function: "square",
                    min_val: p.min,
                    max_val: p.max,
                    period: p["period"],
                    initphase: p["initPhase"],
                    duty: p["duty"],
                    t_init: params.rangeDays[i][0],
                    t_end: params.rangeDays[i][1],
                });
                break;
            default:
                variableDependent.values.push(p["value"]);
                break;
        }
    });
    return variableDependent;
};

const getSEIRHVDObj = (e, modelParameters, scale, featureSelected) => {
    return {
        idSim: e.idSim,
        model: {
            name: modelParameters.name,
            compartments: modelParameters.compartments,
        },
        data: {
            datafile: false,
            importdata: false,
            initdate: "2020-03-22",
            country: "USA",
            state: scale === "States" ? featureSelected : "",
            county: scale === "Counties" ? featureSelected : "",
            healthservice: "",
            loc_name: "",
        },
        parameters: {
            static: {
                t_init: 0,
                t_end: modelParameters.t_end,
                mu: modelParameters.mu,
                pI_det: modelParameters.pI_det,
                population: modelParameters.population,
                populationfraction: modelParameters.populationfraction,
                pIcr_det: modelParameters.pIcr_det,
                pIm_det: modelParameters.pIm_det,
                pIv_det: modelParameters.pIv_det,
            },
            dynamic: {
                beta: !modelParameters.beta.isEnabled
                    ? modelParameters.beta.val
                    : createObjectVariableDependent(modelParameters.beta),
                alpha: !modelParameters.alpha.isEnabled
                    ? modelParameters.alpha.val
                    : createObjectVariableDependent(modelParameters.alpha),
                tE_I: !modelParameters.tE_I.isEnabled
                    ? modelParameters.tE_I.val
                    : createObjectVariableDependent(modelParameters.tE_I),
                tI_R: !modelParameters.tI_R.isEnabled
                    ? modelParameters.tI_R.val
                    : createObjectVariableDependent(modelParameters.tI_R),
                rR_S: !modelParameters.rR_S.isEnabled
                    ? modelParameters.rR_S.val
                    : createObjectVariableDependent(modelParameters.rR_S),
                Beta_v: !modelParameters.Beta_v.isEnabled
                    ? modelParameters.Beta_v.val
                    : createObjectVariableDependent(modelParameters.Beta_v),
                vac_d: !modelParameters.vac_d.isEnabled
                    ? modelParameters.vac_d.val
                    : createObjectVariableDependent(modelParameters.vac_d),
                vac_eff: !modelParameters.vac_eff.isEnabled
                    ? modelParameters.vac_eff.val
                    : createObjectVariableDependent(modelParameters.vac_eff),
                pE_Im: !modelParameters.pE_Im.isEnabled
                    ? modelParameters.pE_Im.val
                    : createObjectVariableDependent(modelParameters.pE_Im),
                tE_Im: !modelParameters.tE_Im.isEnabled
                    ? modelParameters.tE_Im.val
                    : createObjectVariableDependent(modelParameters.tE_Im),
                pE_Icr: !modelParameters.pE_Icr.isEnabled
                    ? modelParameters.pE_Icr.val
                    : createObjectVariableDependent(modelParameters.pE_Icr),
                tE_Icr: !modelParameters.tE_Icr.isEnabled
                    ? modelParameters.tE_Icr.val
                    : createObjectVariableDependent(modelParameters.tE_Icr),
                tEv_Iv: !modelParameters.tEv_Iv.isEnabled
                    ? modelParameters.tEv_Iv.val
                    : createObjectVariableDependent(modelParameters.tEv_Iv),
                tIm_R: !modelParameters.tIm_R.isEnabled
                    ? modelParameters.tIm_R.val
                    : createObjectVariableDependent(modelParameters.tIm_R),
                tIcr_H: !modelParameters.tIcr_H.isEnabled
                    ? modelParameters.tIcr_H.val
                    : createObjectVariableDependent(modelParameters.tIcr_H),
                pIv_R: !modelParameters.pIv_R.isEnabled
                    ? modelParameters.pIv_R.val
                    : createObjectVariableDependent(modelParameters.pIv_R),
                tIv_R: !modelParameters.tIv_R.isEnabled
                    ? modelParameters.tIv_R.val
                    : createObjectVariableDependent(modelParameters.tIv_R),
                pIv_H: !modelParameters.pIv_H.isEnabled
                    ? modelParameters.pIv_H.val
                    : createObjectVariableDependent(modelParameters.pIv_H),
                tIv_H: !modelParameters.tIv_H.isEnabled
                    ? modelParameters.tIv_H.val
                    : createObjectVariableDependent(modelParameters.tIv_H),
                pH_R: !modelParameters.pH_R.isEnabled
                    ? modelParameters.pH_R.val
                    : createObjectVariableDependent(modelParameters.pH_R),
                tH_R: !modelParameters.tH_R.isEnabled
                    ? modelParameters.tH_R.val
                    : createObjectVariableDependent(modelParameters.tH_R),
                pH_D: !modelParameters.pH_D.isEnabled
                    ? modelParameters.pH_D.val
                    : createObjectVariableDependent(modelParameters.pH_D),
                tH_D: !modelParameters.tH_D.isEnabled
                    ? modelParameters.tH_D.val
                    : createObjectVariableDependent(modelParameters.tH_D),
                pR_S: !modelParameters.pR_S.isEnabled
                    ? modelParameters.pR_S.val
                    : createObjectVariableDependent(modelParameters.pR_S),
                tR_S: !modelParameters.tR_S.isEnabled
                    ? modelParameters.tR_S.val
                    : createObjectVariableDependent(modelParameters.tR_S),
            },
        },
        initialconditions: {
            I: +e.initialConditions.I,
            I_d: +e.initialConditions.I_d,
            I_ac: +e.initialConditions.I_ac,
            population: +e.initialConditions.S,
            R: +e.initialConditions.R,
            E: +e.initialConditions.E,
            Iv: +e.initialConditions.Iv,
            Iv_d: +e.initialConditions.V,
            Iv_ac: +e.initialConditions.V_acum,
            H_cap: +e.initialConditions.H_cap,
            H: +e.initialConditions.H_acum,
            H_d: +e.initialConditions.H,
            D: +e.initialConditions.D_acum,
            D_d: +e.initialConditions.D,
        },
    };
};

export default getSEIRHVDObj;
