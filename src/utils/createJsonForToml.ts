const createJsonForToml = (simJson) => {
  return {
    model: {
      name: "SEIR",
      compartments: ["S", "E", "I", "R"],
    },
    data: {
      datafile: false,
      importdata: false,
      initdate: "",
      country: "USA",
      state: "",
      county: "",
      healthservice: "",
      loc_name: "",
    },
    parameters: {
      static: {
        t_init: 0,
        t_end: 500,
        timestep: 0.01,
        k_I: 0,
        k_R: 0,
        seroprevfactor: 1,
        expinfection: 0,
        mu: 0.5,
        pI_det: 1,
      },
      dynamic: {
        beta: 0.2,
        alpha: 1,
        S_f: 0,
        E_f: 0,
        I_f: 0,
        R_f: 0,
        tE_I: 5,
        tI_R: 10,
        rR_S: 0,
      },
    },
    initialconditions: {
      population: 1000000,
      R: 5000,
      I: 0,
      I_det: 6000,
      I_d: 0,
      I_d_det: 3000,
      I_ac: 0,
      I_ac_det: 15000,
      E: false,
      E_d: false,
    },
  };
};

export default createJsonForToml;
