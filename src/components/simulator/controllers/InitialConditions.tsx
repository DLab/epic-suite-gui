/* eslint-disable @typescript-eslint/naming-convention */
import { Box, Button, useToast } from "@chakra-ui/react";
import React, { useContext, useState, useEffect } from "react";

import NumberInputEpi from "../../NumberInputEpi";
import { ControlPanel } from "context/ControlPanelContext";
import { SimulationSetted, SimulatorParams } from "context/SimulationContext";

const InitialConditions = () => {
  const toast = useToast();
  const { initialConditions, setInitialConditions } = useContext(ControlPanel);
  const {
    simulation,
    setSimulation,
    idSimulationUpdating,
    setIdSimulationUpdating,
  } = useContext(SimulationSetted);
  const [models, setModels] = useState(false);
  const { population, R, I, I_d, I_ac, E } = initialConditions;
  const { idModel } =
    simulation.find(
      ({ idSim }: SimulatorParams) => idSim === idSimulationUpdating
    ) ?? {};
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.localStorage.getItem("models") &&
      idModel
    ) {
      const dataLocalStorageModel = JSON.parse(
        window.localStorage.getItem("models")
      );
      const {
        parameters: { name },
      } = dataLocalStorageModel.find((dl) => dl.id === idModel);
      if (name === "SEIR") setModels(true);
    }
  }, [idModel]);

  // const {
  //   parameters: { name },
  // } = paramsModel.find(({ id }: DataParameters) => id === idModel);
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
          value={models ? E : 0}
          setValue={setInitialConditions}
          min={0}
          max={Infinity}
          nameParams="E"
          type="number"
          isInitialParameters={!!models}
          isDisabled={!models}
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
          toast({
            position: "bottom-left",
            title: "Updated success",
            description: "Updating Initial conditions was success",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
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
