import { Button, Spinner, Text, useToast } from "@chakra-ui/react";
import TOML from "@iarna/toml";
import { useContext, useState, useEffect } from "react";

import { ModelsSaved } from "context/ModelsContext";
import { SimulationSetted, SimulatorParams } from "context/SimulationContext";

const RunSimulatorButton = () => {
  const toast = useToast();
  const { simulation } = useContext(SimulationSetted);
  const { parameters } = useContext(ModelsSaved);
  const [models, setModels] = useState([]);
  const [geoSelection, setGeoSelection] = useState([]);
  const [isSimulating, setisSimulating] = useState(false);
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.localStorage.getItem("models")
    ) {
      const dataLocalStorageModel = window.localStorage.getItem("models");
      setModels(JSON.parse(dataLocalStorageModel));
    }
    if (
      typeof window !== "undefined" &&
      window.localStorage.getItem("geoSelection")
    ) {
      const dataLocalStorageGeo = window.localStorage.getItem("geoSelection");
      setGeoSelection(JSON.parse(dataLocalStorageGeo));
    }
  }, [parameters]);

  const verifyNotEmptySimulations = (sim: SimulatorParams[] | []) => {
    return sim.every(
      (e: SimulatorParams) =>
        (e.idGeo !== 0 || e.idGraph !== 0) && e.idModel !== 0
    );
  };
  const handleJsonToToml = () => {
    if (!verifyNotEmptySimulations(simulation)) {
      toast({
        position: "bottom-left",
        title: "Simulation failed",
        description:
          "There is a simulation model with incomplete parameters. \n Check your simulations!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    if (simulation.length < 1) {
      toast({
        position: "bottom-left",
        title: "Simulation failed",
        description: "You must add a simulation at least",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    if (simulation.length > 0 && verifyNotEmptySimulations(simulation)) {
      // build object simulation template for toml
      const simulationsSelected = simulation.map((e) => {
        const { parameters: modelParameters } = models.find(
          (m) => m.id === e.idModel
        );
        const geoselectionItems =
          geoSelection.find((g) => g.id === e.idGeo) || {};
        const { mode, featureSelected } =
          (typeof geoselectionItems !== "undefined" && geoselectionItems) || {};
        return {
          idGraph: e.idGraph,
          model: {
            name: modelParameters.name,
            compartments: modelParameters.compartments,
          },
          data: {
            datafile: false,
            importdata: false,
            initdate: "",
            country: "USA",
            state: mode === "State" ? featureSelected : "",
            county: mode === "County" ? featureSelected : "",
            healthservice: "",
            loc_name: "",
          },
          mode,
          parameters: {
            static: {
              t_init: modelParameters.t_init,
              t_end: modelParameters.t_end,
              timestep: modelParameters.timestep,
              mu: modelParameters.mu,
              pI_det: modelParameters.pI_det,
            },
            dynamic: {
              beta: modelParameters.beta,
              alpha: modelParameters.alpha,
              tE_I: modelParameters.tE_I,
              tI_R: modelParameters.tI_R,
              rR_S: modelParameters.r_R_s,
            },
          },
          initialconditions: e.initialConditions,
        };
      });
      // simulations obj
      const obj = {
        title: "Example of a SEIR Configuration File",
        date: "2021-04-20",
        user: "Samuel",
        simulation: simulationsSelected,
      };
      const toml = TOML.stringify(obj);
      if (simulationsSelected.length > 0) {
        setisSimulating(true);
        setTimeout(() => {
          setisSimulating(false);
        }, 6000);
      }
    }
  };
  return (
    <>
      <Button
        onClick={() => handleJsonToToml()}
        colorScheme="blue"
        color="white"
      >
        {isSimulating ? (
          <>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
            />
            <Text pl="1rem">Simulating...</Text>
          </>
        ) : (
          `Run`
        )}
      </Button>
    </>
  );
};

export default RunSimulatorButton;
