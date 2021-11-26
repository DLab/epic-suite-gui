/* eslint-disable @typescript-eslint/naming-convention */
import { Box, NumberInput, Button } from "@chakra-ui/react";
import React, { useContext, useState, useEffect } from "react";

import NumberInputEpi from "../../NumberInputEpi";
import { ControlPanel } from "context/ControlPanelContext";
import { SimulationSetted } from "context/SimulationContext";

const InitialConditions = () => {
  const { initialConditions, setInitialConditions } = useContext(ControlPanel);
  const { setSimulation, idSimulationUpdating, setIdSimulationUpdating } =
    useContext(SimulationSetted);
  const { population, R, I, I_d, I_ac, E } = initialConditions;
  return (
    <>
      <Box>
        <NumberInputEpi
          value={population}
          setValue={setInitialConditions}
          min={0}
          max={Infinity}
          nameParams="population"
          type="number"
          isInitialParameters
        />
        <NumberInputEpi
          value={R}
          setValue={setInitialConditions}
          min={0}
          max={Infinity}
          nameParams="R"
          type="number"
          isInitialParameters
        />
      </Box>
      <Box>
        <NumberInputEpi
          value={I}
          setValue={setInitialConditions}
          min={0}
          max={Infinity}
          nameParams="I"
          type="number"
          isInitialParameters
        />
      </Box>
      <Box>
        <NumberInputEpi
          value={I_d}
          setValue={setInitialConditions}
          min={0}
          max={Infinity}
          nameParams="I_d"
          type="number"
          isInitialParameters
        />
      </Box>
      <Box>
        <NumberInputEpi
          value={E}
          setValue={setInitialConditions}
          min={0}
          max={Infinity}
          nameParams="E"
          type="number"
          isInitialParameters
        />
      </Box>
      <Box>
        <NumberInputEpi
          value={I_ac}
          setValue={setInitialConditions}
          min={0}
          max={Infinity}
          nameParams="I_ac"
          type="number"
          isInitialParameters
        />
      </Box>
      <Button
        colorScheme="teal"
        onClick={() => {
          setSimulation({
            type: "update-initial-conditions",
            payloadInitialConditions: initialConditions,
            id: idSimulationUpdating,
          });
          setIdSimulationUpdating({ type: "set", payload: 0 });
        }}
      >
        Update
      </Button>
      <Button
        ml="0.5rem"
        colorScheme="gray"
        onClick={() => setIdSimulationUpdating({ type: "set", payload: 0 })}
      >
        Cancel
      </Button>
    </>
  );
};

export default InitialConditions;
