/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    MAINKEYS,
    MODELKEYS,
    INITIALCONDITIONSKEYS,
    DATAKEYS,
    DYNAMICKEYS,
    STATICKEYS,
    TYPEMODEL,
} from "constants/verifyAttrTomlConstants";
import { Fields } from "types/importTypes";

export const verifyMainKeys = (lenght: number, fields: string[]) => {
    const countFields = {
        count: 0,
    };
    return (key) => {
        if (fields.includes(key)) {
            countFields.count += 1;
        }
        return lenght === countFields.count;
    };
};

const returnErrorByWrongAttribute = (data: unknown, mainKeys = "Epic TOML") => {
    const attr = mainKeys !== "Epic TOML" ? `in ${mainKeys}` : "";
    throw new Error(
        `Your config file hasn't required attributes ${attr}, got: ${Object.keys(
            data
        )}`
    );
};
const keysByCompartments = (typeCompartment: string, fields: Fields) => {
    const regex = /(sir|seir|seirhvd)/gi;
    const typeModel = typeCompartment.match(regex)[0];
    switch (typeModel) {
        case "seir":
            return [...fields.must, ...fields.seir];
        case "sir":
            return fields.must;
        case "seirhvd":
            return [...fields.must, ...fields.seir, ...fields.seirhvd];
        default:
            throw new Error("Type model is wrong");
    }
};
const verifyAttrTomlRight = (obj: any) => {
    // try {
    const statusFieldsVerified = verifyMainKeys(
        MAINKEYS.must.length,
        MAINKEYS.must
    );
    const mainKeysInToml = Object.keys(obj)
        .map((key) => statusFieldsVerified(key))
        .some((verified) => verified);
    if (!mainKeysInToml) {
        returnErrorByWrongAttribute(obj);
    }
    const {
        model,
        parameters: { static: staticAttr, dynamic },
        initialconditions,
        data,
    } = obj;
    const statusModelKeysVerified = verifyMainKeys(
        MODELKEYS.must.length,
        MODELKEYS.must
    );
    const statusDataKeysVerified = verifyMainKeys(
        DATAKEYS.must.length,
        DATAKEYS.must
    );
    const compartments = keysByCompartments(model.model, INITIALCONDITIONSKEYS);
    const statusInitialConditionsVerified = verifyMainKeys(
        compartments.length,
        compartments
    );
    const staticStatus = keysByCompartments(model.model, STATICKEYS);
    const statusStaticKeys = verifyMainKeys(staticStatus.length, staticStatus);
    const dynamicStatus = keysByCompartments(model.model, DYNAMICKEYS);
    const statusDynamicKeys = verifyMainKeys(
        dynamicStatus.length,
        dynamicStatus
    );
    const areModelKeysRight = Object.keys(model)
        .map((mod) => statusModelKeysVerified(mod))
        .some((isInObj) => isInObj);
    const areDataModelKeysRight = Object.keys(data)
        .map((mod) => statusDataKeysVerified(mod))
        .some((isInObj) => isInObj);
    const areInitialConditiosnKeysRight = Object.keys(initialconditions)
        .map((mod) => statusInitialConditionsVerified(mod))
        .some((isInObj) => isInObj);
    const areStaticKeysRight = Object.keys(staticAttr)
        .map((mod) => statusStaticKeys(mod))
        .some((isInObj) => isInObj);
    const areDynamicKeysRight = Object.keys(dynamic)
        .map((mod) => statusDynamicKeys(mod))
        .some((isInObj) => isInObj);

    if (!areDataModelKeysRight) {
        returnErrorByWrongAttribute(data, "Data");
    }
    if (!areStaticKeysRight) {
        returnErrorByWrongAttribute(staticAttr, "Static Parameters");
    }
    if (!areDynamicKeysRight) {
        returnErrorByWrongAttribute(dynamic, "Dynamic Parameters");
    }
    if (!areModelKeysRight) {
        returnErrorByWrongAttribute(model, "Model");
    }
    if (!areInitialConditiosnKeysRight) {
        returnErrorByWrongAttribute(initialconditions, "Initial Conditions");
    }
    return true;
};

export default verifyAttrTomlRight;
