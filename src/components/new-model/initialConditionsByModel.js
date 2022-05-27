/* eslint-disable @typescript-eslint/naming-convention */
const getInitialConditionsByModel = (model) => {
    if (model === "seirhvd") {
        return {
            I: 0,
            I_d: 0,
            I_ac: 0,
            population: 0,
            R: 0,
            E: 0,
            H_d: 0,
            H: 0,
            Iv_d: 0,
            Iv_ac: 0,
            D_d: 0,
            D: 0,
            Iv: 0,
            H_cap: 0,
        };
    }
    return {
        I: 0,
        I_d: 0,
        I_ac: 0,
        population: 0,
        R: 0,
    };
};

export const postInitialConditionsByModel = (result) => {
    const {
        Compartment,
        D,
        D_acum,
        E,
        H,
        H_acum,
        I,
        I_active,
        I_acum,
        R,
        S,
        V,
        V_acum,
    } = result;

    let payload;
    if (Compartment === "SIR") {
        payload = {
            I: +I_active,
            I_d: +I,
            I_ac: +I_acum,
            population: +S,
            R: +R,
        };
    }
    if (Compartment === "SEIR") {
        payload = {
            I: +I_active,
            I_d: +I,
            I_ac: +I_acum,
            population: +S,
            R: +R,
            E: +E,
        };
    }
    if (Compartment === "SEIRHVD") {
        payload = {
            I: +I_active,
            I_d: +I,
            I_ac: +I_acum,
            population: +S,
            R: +R,
            E: +E,
            H_d: +H,
            H: +H_acum,
            Iv_d: +V,
            Iv_ac: +V_acum,
            D_d: +D,
            D: +D_acum,
        };
    }
    return payload;
};

export default getInitialConditionsByModel;
