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
            Sv: 0,
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

export const getPreviusInitialConditions = (model, initCond) => {
    if (model === "seirhvd") {
        return {
            I: initCond.I,
            I_d: initCond.I_d,
            I_ac: initCond.I_ac,
            population: initCond.population,
            R: initCond.R,
            E: initCond.E,
            H_d: initCond.H_d,
            H: initCond.H,
            Iv_d: initCond.Iv_d,
            Iv_ac: initCond.Iv_ac,
            D_d: initCond.D_d,
            D: initCond.D,
            Iv: initCond.Iv,
            H_cap: initCond.H_cap,
            Sv: initCond.Sv,
        };
    }
    return {
        I: initCond.I,
        I_d: initCond.I_d,
        I_ac: initCond.I_ac,
        population: initCond.population,
        R: initCond.R,
    };
};

export const postInitialConditionsByModel = (result) => {
    const {
        Compartment,
        D_d,
        D_ac,
        E,
        H_d,
        H_ac,
        I,
        I_ac,
        I_d,
        R,
        P,
        V_d,
        V_ac,
        H_cap,
        Sv,
        Iv,
    } = result;

    let payload;
    if (Compartment === "SIR" || Compartment === "SEIR") {
        payload = {
            I: +I,
            I_d: +I_d,
            I_ac: +I_ac,
            population: +P,
            R: +R,
        };
    }
    // if (Compartment === "SEIR") {
    //     payload = {
    //         I: +I_active,
    //         I_d: +I,
    //         I_ac: +I_acum,
    //         population: +S,
    //         R: +R,
    //         E: +E,
    //     };
    // }
    if (Compartment === "SEIRHVD") {
        payload = {
            I: +I,
            I_d: +I_d,
            I_ac: +I_ac,
            population: +P,
            R: +R,
            // E: +E,
            H_d: +H_d,
            H: +H_ac,
            Iv_d: +V_d,
            Iv_ac: +V_ac,
            D_d: +D_d,
            D: +D_ac,
            H_cap: +H_cap,
            Iv: +Iv,
            Sv: +Sv,
        };
    }
    return payload;
};

export default getInitialConditionsByModel;
