/* eslint-disable @typescript-eslint/naming-convention */
import { Box, Button, useToast, Flex, Stack } from "@chakra-ui/react";
import React, { useContext, useState, useEffect } from "react";

import NumberInputEpi from "../../NumberInputEpi";
import { ControlPanel } from "context/ControlPanelContext";
import { ModelsSaved } from "context/ModelsContext";
import { SimulationSetted } from "context/SimulationContext";
import { DataParameters } from "types/ModelsTypes";
import { SimulatorParams } from "types/SimulationTypes";
import createIdComponent from "utils/createIdcomponent";

export interface InitialConditionsContext {
  population: number;
  R: number;
  I: number;
  I_d: number;
  I_ac: number;
  E: number;
}

interface Props {
  idModel: number;
  idSimulation: number;
  intialConditionsSim: InitialConditionsContext;
  initialConditionsMode: string;
  setInitialConditionsMode: (val: string) => void;
}

const InitialConditions = ({
  idModel: idModelSelected,
  idSimulation,
  intialConditionsSim,
  initialConditionsMode,
  setInitialConditionsMode,
}: Props) => {
  const RealConditions = "real-conditions";
  const toast = useToast();
  const { setInitialConditions, initialConditions } = useContext(ControlPanel);
  const {
    simulation,
    setSimulation,
    idSimulationUpdating,
    setIdSimulationUpdating,
  } = useContext(SimulationSetted);
  const { parameters } = useContext(ModelsSaved);
  const [models, setModels] = useState(false);
  const [modelName, setModelName] = useState("SEIR");
  const { population, R, I, I_d, I_ac, E } = initialConditions;
  const { idModel } =
    simulation.find(
      ({ idSim }: SimulatorParams) => idSim === idSimulationUpdating
    ) ?? {};

  useEffect(() => {
    if (idModelSelected !== 0) {
      const getIdModel = simulation.find(
        ({ idSim }: SimulatorParams) => idSim === idSimulation
      );

      const getModelById = parameters.find(
        (m: DataParameters) => m.id === getIdModel.idModel
      ).parameters;

      setModelName(getModelById.name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idModelSelected, idModel]);

  useEffect(() => {
    if (initialConditionsMode === "edit") {
      setInitialConditions({ type: RealConditions, real: intialConditionsSim });
    }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idModel, idSimulation, intialConditionsSim, modelName]);

  return (
    <Flex direction="column">
      <Flex m="2% 1%" flexWrap="wrap">
        {initialConditionsMode === "view" && (
          <>
            <Box mr="5%">
              <NumberInputEpi
                value={intialConditionsSim.population}
                setValue={setInitialConditions}
                nameParams="population"
                description="Total population"
                min={0}
                max={Infinity}
                isInitialParameters
                type="number"
              />
            </Box>
            <Box>
              <NumberInputEpi
                value={intialConditionsSim.R}
                setValue={setInitialConditions}
                nameParams="R"
                description="Recovered"
                min={0}
                max={Infinity}
                isInitialParameters
                type="number"
              />
            </Box>
            <Box id={createIdComponent()}>
              <NumberInputEpi
                value={intialConditionsSim.I}
                setValue={setInitialConditions}
                nameParams="I"
                description="Active infected"
                min={0}
                max={Infinity}
                isInitialParameters
                type="number"
              />
            </Box>
            <Box id={createIdComponent()}>
              <NumberInputEpi
                value={intialConditionsSim.I_d}
                setValue={setInitialConditions}
                nameParams="I_d"
                description="New daily infected"
                min={0}
                max={Infinity}
                isInitialParameters
                type="number"
              />
            </Box>
            {modelName === "SEIR" && (
              <Box id={createIdComponent()}>
                <NumberInputEpi
                  value={models ? intialConditionsSim.E : 0}
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
            )}

            <Box id={createIdComponent()}>
              <NumberInputEpi
                value={intialConditionsSim.I_ac}
                setValue={setInitialConditions}
                nameParams="I_ac"
                description="Accumulated infected"
                min={0}
                max={Infinity}
                isInitialParameters
                type="number"
              />
            </Box>
          </>
        )}
        {initialConditionsMode === "edit" && (
          <>
            <Box mr="5%">
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
            </Box>
            <Box>
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
            <Box id={createIdComponent()}>
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
            <Box id={createIdComponent()}>
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
            {modelName === "SEIR" && (
              <Box id={createIdComponent()}>
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
            )}

            <Box id={createIdComponent()}>
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
          </>
        )}
      </Flex>
      {initialConditionsMode === "edit" && (
        <Flex justify="center">
          <Button
            id={createIdComponent()}
            mr="10%"
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
              setInitialConditionsMode("view");
            }}
          >
            Update
          </Button>
          <Button
            id={createIdComponent()}
            ml="0.5rem"
            colorScheme="gray"
            onClick={() => {
              setIdSimulationUpdating({ type: "set", payload: 0 });
              setInitialConditionsMode("view");
            }}
          >
            Cancel
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

export default InitialConditions;
