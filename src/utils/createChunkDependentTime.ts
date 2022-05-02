import SeirhbdChunkImport from "../components/models-tab/SeirhvdChunkImport";
import { EpidemicsData } from "types/ControlPanelTypes";
import { InitialConditions } from "types/SimulationTypes";

/* eslint-disable @typescript-eslint/dot-notation */
interface OptionsChunk {
    t_init: number;
    t_end: number;
    val: number;
}
export interface TomlInitialConditions {
    population: number;
    R: number;
    I: number;
    I_det?: number;
    I_d: number;
    I_d_det?: number;
    I_ac: number;
    I_ac_det?: number;
    E: number | boolean;
    E_d: number | boolean;
    H?: number;
    H_acum?: number;
    V?: number;
    V_acum?: number;
    D?: number;
    D_acum?: number;
    Iv?: number;
    H_cap?: number;
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
    const modifiedValues = data["values"].map((value) => {
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
                initValue: value["t_init"],
                endValue: value["t_end"],
                name: "transition",
            };
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
    return utilData.reduce(
        (prev, current) => ({ ...prev, ...current }),
        SeirhbdChunkImport
    ) as EpidemicsData;
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
export default createChunkDependentTime;
