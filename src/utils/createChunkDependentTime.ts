/* eslint-disable no-nested-ternary */
import _ from "lodash";

import SeirhbdChunkImport from "components/new-model/SeirhvdChunkImport";
import { EpidemicsData } from "types/ControlPanelTypes";
import { InitialConditions } from "types/SimulationTypes";

export {};

/* eslint-disable @typescript-eslint/dot-notation */
interface OptionsChunk {
    t_init: number;
    t_end: number;
    val: number;
}
export interface TomlInitialConditions {
    population: number | number[];
    R: number | number[];
    I: number | number[];
    I_det?: number | number[];
    I_d: number | number[];
    I_d_det?: number | number[];
    I_ac: number | number[];
    I_ac_det?: number | number[];
    E: number | number[] | boolean;
    E_d: number | number[] | boolean;
    H?: number | number[];
    H_acum?: number | number[];
    V?: number | number[];
    V_acum?: number | number[];
    D?: number | number[];
    D_acum?: number | number[];
    Iv?: number | number[];
    H_cap?: number | number[];
}
export const variableDependentTimeParams = [
    "beta",
    "Beta_v",
    "rR_S",
    "alpha",
    "tE_I",
    "tI_R",
    "vac_d",
    "vac_eff",
    "pE_Im",
    "tE_Im",
    "pE_Icr",
    "tE_Icr",
    "tEv_Iv",
    "tIm_R",
    "tIcr_H",
    "pIv_R",
    "tIv_R",
    "pIv_H",
    "tIv_H",
    "pH_R",
    "tH_R",
    "pH_D",
    "tH_D",
    "pR_S",
    "tR_S",
];
const exceptionVDT = ["tI_R", "tE_I", "rR_S"];
const modifyChunkByTypeFunction = (
    data: unknown,
    key: string,
    end: number,
    init: number
    // eslint-disable-next-line sonarjs/cognitive-complexity
) => {
    if (data["function"] === "sine") {
        return {
            [key]: {
                rangeDays: [[init ?? 0, end ?? 1]],
                type: [
                    {
                        name: "sinusoidal",
                        min: data["min_val"],
                        max: data["max_val"],
                        period: data["period"],
                        initPhase: data["initPhase"] === "min" ? 0 : 1,
                    },
                ],
                name: key,
                default: 1,
                isEnabled: true,
                val: 1,
            },
        };
    }
    const modifiedValues = data["values"].map((val) => {
        const value = _.isString(val) ? JSON.parse(val) : val;
        if (value["function"] === "sine") {
            const utilValue = {
                ...value,
                min: value["min_val"],
                max: value["max_val"],
                name: "sinusoidal",
                initPhase: value["initPhase"] === "min" ? 0 : 1,
            };
            delete utilValue["function"];
            delete utilValue["min_val"];
            delete utilValue["max_val"];
            return utilValue;
        }
        if (value["function"] === "square") {
            const utilValue = {
                ...value,
                min: value["min_val"],
                max: value["max_val"],
                name: "square",
                initPhase: value["initPhase"] === "min" ? 0 : 1,
            };
            delete utilValue["function"];
            delete utilValue["min_val"];
            delete utilValue["max_val"];
            return utilValue;
        }
        if (value["function"] === "transition") {
            const utilValue = {
                ...value,
                initvalue: value["min_val"],
                endvalue: value["max_val"],
                name: "transition",
                ftype:
                    value["type"] === "linear"
                        ? 0
                        : value["type"] === "quadratic"
                        ? 1
                        : 2,
                t_init: data["days"][0][0],
                t_end: data["days"][data["days"].length - 1][1],
            };
            delete utilValue["type"];
            delete utilValue["function"];
            delete utilValue["min_val"];
            delete utilValue["max_val"];
            return utilValue;
        }
        if (!value["function"]) {
            return {
                name: "static",
                value,
            };
        }
        const generalUtilValue = value;
        delete generalUtilValue["function"];
        return generalUtilValue;
    });
    return {
        [key]: {
            rangeDays: data["days"],
            type: modifiedValues,
            name: key,
            default: 1,
            isEnabled: true,
            val: 1,
        },
    };
};
const createChunkDependentTime = (
    key: string,
    val: unknown,
    duration: number,
    init: number
) => {
    // if key is in variableDependentTimeParams, then do anything
    if (variableDependentTimeParams.includes(key)) {
        // if params is string, it means params is a variable dependent time
        if (typeof val === "string") {
            return modifyChunkByTypeFunction(
                JSON.parse(val),
                key,
                duration,
                init
            );
        }

        return {
            [key]: {
                rangeDays: [
                    [val["t_init"] ?? 0, val["t_end"] ?? duration ?? 1],
                ],
                type: [
                    {
                        name: "static",
                        value: val,
                    },
                ],
                name: key,
                default: val,
                isEnabled: false,
                val,
            },
        };
    }
    if (key === "title") {
        return { name_model: val ?? "Imported Model" };
    }
    // else, only format data for model context
    return { [key]: val };
};

export const prepareChunk = (data: unknown): EpidemicsData => {
    const duration = data["t_end"];
    const init = data["t_init"];
    // for each [key,value] format if key is in list (variableDependentTimeParams)
    const utilData = Object.entries(data).map(([key, value]) => {
        return createChunkDependentTime(key, value, duration, init);
    });
    return utilData.reduce((prev, current) => {
        const [key, value] = Object.entries(current)[0];
        const isVDT =
            variableDependentTimeParams.includes(key) &&
            !exceptionVDT.includes(key);
        return { ...prev, [key]: isVDT ? [value] : value };
    }, SeirhbdChunkImport) as unknown as EpidemicsData;
    // return utilData.reduce(
    //     (prev, current) => ({ ...prev, ...current }),
    //     SeirhbdChunkImport
    // ) as unknown as EpidemicsData;
};
export const cleanInitialConditions = (
    data: TomlInitialConditions
): InitialConditions => {
    const keysNotUsedFromToml = ["I_det", "I_d_det", "I_ac_det"];
    return Object.entries(data)
        .filter(([key, value]) => {
            return (
                ((key === "E" || key === "E_d") && value) ||
                !keysNotUsedFromToml.includes(key)
            );
        })
        .reduce((acc, [key, value]) => {
            return {
                ...acc,
                [key]: value,
            };
        }, {}) as InitialConditions;
};
// export default createChunkDependentTime;
