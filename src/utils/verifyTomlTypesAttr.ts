/* eslint-disable complexity */
/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable @typescript-eslint/naming-convention */
import _ from "lodash";

import {
    TYPECOMPARTMENTS,
    STATECODES,
    COUNTYCODES,
    EVENTFUNCTION,
    TYPESEVENTFUNCTION,
    REGEXTRANSITIONFUNCTION,
    REGEXTYPEMODEL,
} from "constants/verifyAttrTomlConstants";
import { Fields } from "types/importTypes";
import { EpicConfigToml } from "types/TomlTypes";

import { verifyMainKeys } from "./verifyAttrTomlRight";

interface EventFunction {
    must: string[];
    values: ValuesEventFunction;
}
interface ValuesEventFunction {
    must: string[];
    sine: string[];
    square: string[];
    transition: Fields;
}
const keysByTypeFunction = (
    typeCompartment: string,
    fields: EventFunction,
    isQuadratic = false
) => {
    const typeModel = typeCompartment.match(REGEXTRANSITIONFUNCTION)[0];
    switch (typeModel) {
        // case "static":
        //     return [...fields.must, ...fields.seir];
        case "square":
            return [...fields.values.must, ...fields.values.square];
        case "sine":
            return [...fields.values.must, ...fields.values.sine];
        case "transition":
            return isQuadratic
                ? [
                      ...fields.values.must,
                      ...fields.values.transition.must,
                      ...fields.values.transition.quadratic,
                  ]
                : [...fields.values.must, ...fields.values.transition.must];
        default:
            throw new Error("Type model is wrong");
    }
};
const verifyInnertypesVDT = (innerValueVDT: unknown) => {
    if (_.isString(innerValueVDT)) {
        // esto debería estar en una función
        const valueParseToJson = JSON.parse(innerValueVDT);
        const AllParseToJson = {
            ...valueParseToJson,
            values: valueParseToJson.values.map((v) => JSON.parse(v)),
        };
        // verify is string contain EVENTFUNCTION.must properties
        const statusParseData = verifyMainKeys(
            EVENTFUNCTION.must.length,
            EVENTFUNCTION.must
        );

        const isRightMainKeysParseData = Object.keys(AllParseToJson)
            .map((key) => statusParseData(key))
            .some((verified) => verified);
        if (!isRightMainKeysParseData) {
            throw new Error(`It fault any main properties in event function`);
        }
        const { values, days } = AllParseToJson;
        const IsAllDaysArrayNumbers = days.every(
            ([init, end], i: number, arr: number[][]) => {
                if (init > end) {
                    throw new Error(
                        `Init day must to be lower than end day in range days`
                    );
                }
                return (
                    _.isNumber(init) &&
                    _.isNumber(end) &&
                    (i !== 0 ? arr[i - 1][1] < end : true)
                );
            }
        );
        if (!IsAllDaysArrayNumbers) {
            throw new Error(
                `Days into event function hasn't right type. It must to  be numbers array`
            );
        }
        values.forEach((element) => {
            if (!_.isNumber(element)) {
                const keysEventFunction = keysByTypeFunction(
                    element.function,
                    EVENTFUNCTION,
                    element.function === "transition" &&
                        element.type === "quadratic"
                );
                const statusEventFunction = verifyMainKeys(
                    keysEventFunction.length,
                    keysEventFunction
                );
                const isRightEventFunctionProps = Object.keys(element)
                    .map((key) => statusEventFunction(key))
                    .some((verified) => verified);
                if (!isRightEventFunctionProps) {
                    throw new Error(
                        `It fault any properties in event function`
                    );
                }
                // verify right values
                const functionKeys = ["transition", "sine", "square"];
                const typesKeys = ["sigmoidal", "quadratic", "linear"];
                Object.entries(element).forEach(([key, val]) => {
                    switch (TYPESEVENTFUNCTION[key]) {
                        case "number":
                            if (!_.isNumber(val) || val < 0) {
                                throw new Error(`define error not number`);
                            }
                            if (key === "min_val" && val > element.max_val) {
                                throw new Error(
                                    `min_val must to be lesser than max_val`
                                );
                            }
                            if (key === "max_val" && val < element.min_val) {
                                throw new Error(
                                    `max_val must to be greater than mmin_val error not number`
                                );
                            }
                            if (key === "t_end" && val < element.t_init) {
                                throw new Error(
                                    `t_end must to be greater than t_init`
                                );
                            }
                            if (key === "t_init" && val > element.t_end) {
                                throw new Error(
                                    `t_init must to be lesser than t_end`
                                );
                            }
                            break;
                        case "string":
                            if (
                                key === "function" &&
                                _.isString(val) &&
                                !functionKeys.includes(val)
                            ) {
                                throw new Error(`define error boolean`);
                            }
                            if (
                                key === "type" &&
                                _.isString(val) &&
                                !typesKeys.includes(val)
                            ) {
                                throw new Error(`define error boolean`);
                            }
                            break;
                        case "boolean":
                            if (!_.isNumber(val) && (val > 1 || val < 0)) {
                                throw new Error(`define error boolean`);
                            }
                            break;
                        default:
                            break;
                    }
                });
            }
        });
        return true;
    }
    if (_.isNumber(innerValueVDT) && innerValueVDT >= 0) {
        return true;
    }
    return false;
};
const isRightModelTypes = (mod: EpicConfigToml["model"]) => {
    const { model, compartments, name } = mod;
    if (!_.isString(name) && !_.isString(model)) {
        throw new Error("name and model must to be a string");
    }
    if (!_.isArray(compartments)) {
        throw new Error("compartments must to be a array");
    }
    const typeModel = _.isEmpty(
        _.difference(
            compartments.sort(),
            TYPECOMPARTMENTS[model.match(REGEXTYPEMODEL)[0]].sort()
        )
    );
    if (!typeModel) {
        throw new Error("Elements into compartment property are wrong");
    }
    return true;
};
const isRightDataType = (data: EpicConfigToml["data"]) => {
    const {
        initdate,
        country,
        state,
        county,
        healthservice,
        loc_name,
        geo_topology,
    } = data;
    const isStringType = Object.entries({
        initdate,
        country,
        state,
        county,
        healthservice,
        loc_name,
        geo_topology,
    }).every(([key, value]) => {
        if (key === "county" || key === "state") {
            if (_.isArray(value)) {
                if (!value.every((val) => _.isString(val))) {
                    //     return false;
                    // }
                    throw new Error("Geographical codes must to be a string");
                }
                if (
                    !_.isEqual(
                        _.intersection(
                            key === "county" ? COUNTYCODES : STATECODES,
                            value
                        ).sort(),
                        value.sort()
                    )
                ) {
                    throw new Error("Geographical codes are wrong");
                }
                return true;
            }
            // if (!value) return true;
            if (value) {
                if (
                    !_.includes(
                        key === "county" ? COUNTYCODES : STATECODES,
                        value
                    )
                ) {
                    throw new Error("Geographical codes are wrong");
                }
                return true;
            }
            return _.isString(value);
        }
        return _.isString(value);
    });
    if (!isStringType) {
        throw new Error("In data, there are elements with wrong type");
    }
    return true;
};
const isRightInitialConditionsType = (
    initialConditions: EpicConfigToml["initialconditions"]
) => {
    return Object.values(initialConditions).every((num) => {
        if (_.isArray(num)) {
            return num.every((n) => _.isNumber(n) && n >= 0);
        }
        return _.isNumber(num) && num >= 0;
    });
};
const isRightStaticTypes = (
    staticData: EpicConfigToml["parameters"]["static"],
    typeCompartment: string,
    isMeta = false
) => {
    const verifyStaticType = ([key, value]) => {
        if (key === "t_init") {
            return _.isString(value);
        }
        if (key === "mu") {
            if (_.isArray(value) && isMeta) {
                return value.every((val) => _.isNumber(val));
            }
            return _.isNumber(value);
        }
        return _.isNumber(value);
    };
    const { t_init, t_end, mu, ...rest } = staticData;
    if (typeCompartment === "seirhvd") {
        const { pIcr_det, pIm_det, pIv_det } = rest;
        return Object.entries({
            t_init,
            t_end,
            mu,
            pIcr_det,
            pIm_det,
            pIv_det,
        }).every(verifyStaticType);
    }
    return Object.entries({
        t_init,
        t_end,
        mu,
        pI_det: rest.pI_det,
    }).every(verifyStaticType);
};
const isRightDynamicTypes = (
    dynamicData: EpicConfigToml["parameters"]["dynamic"],
    typeCompartment: string,
    isMeta = false
) => {
    const { alpha, beta, ...rest } = dynamicData;
    if (typeCompartment === "seirhvd") {
        const { phi, rR_S, tE_I, tI_R, ...restSEIRHVD } = rest;
        return Object.entries({ alpha, beta, ...restSEIRHVD }).every(
            ([_key, value]) => {
                if (!value && !_.isNumber(value)) {
                    throw new Error("There are empty value in dynamic data");
                }
                if (_.isString(value) || _.isNumber(value)) {
                    return verifyInnertypesVDT(value);
                }
                if (_.isArray(value) && isMeta) {
                    return value.every((val) => verifyInnertypesVDT(val));
                }
                throw new Error(
                    `In metapopulations simulations, Dependent time Variables must to be an array`
                );
            }
        );
    }
    const { rR_S, tE_I, tI_R } = rest;
    const dynamicParametersForSirOrSeir =
        typeCompartment === "seir"
            ? {
                  alpha,
                  beta,
                  rR_S,
                  tE_I,
                  tI_R,
              }
            : { alpha, beta, rR_S, tI_R };
    return Object.entries(dynamicParametersForSirOrSeir).every(
        ([_key, value]) => {
            if (!value && !_.isNumber(value)) {
                throw new Error("There are empty value in dynamic data 2");
            }
            // create a function verify string type with function
            // sanity string
            if (
                (_key === "tI_R" || _key === "tE_I" || _key === "rR_S") &&
                _.isArray(value)
            ) {
                throw new Error(`${_key} can't be an array`);
            }
            if (_.isString(value) || _.isNumber(value)) {
                return verifyInnertypesVDT(value);
            }
            if (_.isArray(value) && isMeta) {
                return value.every((val) => verifyInnertypesVDT(val));
            }

            throw new Error(
                `In metapopulations simulations, Dependent time Variables must to be an array`
            );
        }
    );
};
const verifyTomlTypesAttr = (dataToml: EpicConfigToml) => {
    const {
        model,
        data,
        initialconditions,
        parameters: { static: staticAttr, dynamic },
    } = dataToml;
    const typeModel = model.model.match(REGEXTYPEMODEL)[0];
    if (!Object.keys(TYPECOMPARTMENTS).includes(typeModel)) {
        throw new Error("model type is wrong");
    }
    isRightModelTypes(model);
    isRightDataType(data);
    isRightInitialConditionsType(initialconditions);
    const isMeta = data.geo_topology === "meta";
    isRightStaticTypes(staticAttr, typeModel, isMeta);
    isRightDynamicTypes(dynamic, typeModel, isMeta);
    /* 
        Cosas pendientes por hacer:

        E T A P A  D E  V E R I F I C A C I Ó N  D E  T I P O S  Y  A T  R I B U T O S

        - Verificar tipos del innerVDT ya que sólo está verificando si existen
        las propiedades - ready sin verificar
        - Verificar que los datos entregados (p.e. código de estados) sean
        correctos, esto incluye las variables tiempodependientes que tienen
        muchos datos anidados. - ready sin verificar

        E T A P A  D E  C O N V E R S I Ó N  H A C I A  C O N T E X T

        - Sanitizar (en alguna parte se debe hacer)
        
    */
};

export default verifyTomlTypesAttr;
