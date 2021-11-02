/* eslint-disable @typescript-eslint/naming-convention */
import { Box } from "@chakra-ui/react";
import React, { useContext } from "react";

import NumberInputEpi from "../../NumberInputEpi";
import { ControlPanel } from "context/ControlPanelContext";

const InitialConditions = () => {
  const { setParameters, parameters } = useContext(ControlPanel);
  const { R, I, I_d, I_ac, E } = parameters;
  return (
    <>
      <Box>
        <NumberInputEpi
          value={R}
          setValue={setParameters}
          min={0}
          max={Infinity}
          nameParams="Recovered"
          type="number"
        />
      </Box>
      <Box>
        <NumberInputEpi
          value={I}
          setValue={setParameters}
          min={0}
          max={Infinity}
          nameParams="Active Infected"
          type="number"
        />
      </Box>
      <Box>
        <NumberInputEpi
          value={I_d}
          setValue={setParameters}
          min={0}
          max={Infinity}
          nameParams="New daily Infected"
          type="number"
        />
      </Box>
      <Box>
        <NumberInputEpi
          value={E}
          setValue={setParameters}
          min={0}
          max={Infinity}
          nameParams="Exposed"
          type="number"
        />
      </Box>
      <Box>
        <NumberInputEpi
          value={I_ac}
          setValue={setParameters}
          min={0}
          max={Infinity}
          nameParams="Accumulate Infected"
          type="number"
        />
      </Box>
    </>
  );
};

export default InitialConditions;
