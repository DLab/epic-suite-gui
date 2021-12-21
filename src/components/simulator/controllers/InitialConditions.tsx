/* eslint-disable @typescript-eslint/naming-convention */
import { Box, Button, useToast } from "@chakra-ui/react";
import React, { useContext, useState, useEffect } from "react";

import NumberInputEpi from "../../NumberInputEpi";
import { ControlPanel } from "context/ControlPanelContext";
import { SimulationSetted } from "context/SimulationContext";
import { SimulatorParams } from "types/SimulationTypes";

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
          nameParams="population"
          description="Total population"
          min={0}
          max={Infinity}
          isInitialParameters
          type="number"
        />
        <NumberInputEpi
          value={R}
          setValue={setInitialConditions}
          nameParams="R"
          description="Recovered"
          min={0}
          max={Infinity}
          isInitialParameters
          type="number"
        />
      </Box>
      <Box>
        <NumberInputEpi
          value={I}
          setValue={setInitialConditions}
          nameParams="I"
          description="Active infected"
          min={0}
          max={Infinity}
          isInitialParameters
          type="number"
        />
      </Box>
      <Box>
        <NumberInputEpi
          value={I_d}
          setValue={setInitialConditions}
          nameParams="I_d"
          description="New daily infected"
          min={0}
          max={Infinity}
          isInitialParameters
          type="number"
        />
      </Box>

      <Box>
        <NumberInputEpi
          value={models ? E : 0}
          setValue={setInitialConditions}
          nameParams="E"
          description="Exposed"
          min={0}
          max={Infinity}
          isInitialParameters={!!models}
          isDisabled={!models}
          type="number"
        />
      </Box>

      <Box>
        <NumberInputEpi
          value={I_ac}
          setValue={setInitialConditions}
          nameParams="I_ac"
          description="Accumulated infected"
          min={0}
          max={Infinity}
          isInitialParameters
          type="number"
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
            title: "Updated successful",
            description: "Updating Initial conditions was successful",
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
