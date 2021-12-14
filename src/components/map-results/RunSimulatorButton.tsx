import { Button, Spinner, Text, useToast } from "@chakra-ui/react";
import { useContext, useState, useEffect } from "react";

import { ModelsSaved } from "context/ModelsContext";
import { SelectFeature } from "context/SelectFeaturesContext";
import { SimulationSetted, SimulatorParams } from "context/SimulationContext";
import { TabIndex } from "context/TabContext";
import { postData } from "utils/fetchData";

const bottonLeft = "bottom-left";

const RunSimulatorButton = () => {
  const toast = useToast();
  const { setAux, setIndex } = useContext(TabIndex);
  const { simulation } = useContext(SimulationSetted);
  const { parameters } = useContext(ModelsSaved);
  const { geoSelections: geoSelectionsElementsContext } =
    useContext(SelectFeature);
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
  }, [parameters, geoSelectionsElementsContext]);

  const verifyNotEmptySimulations = (sim: SimulatorParams[] | []) => {
    return sim.every(
      (e: SimulatorParams) =>
        (e.idGeo !== 0 || e.idGraph !== 0) && e.idModel !== 0
    );
  };
  const handleJsonToToml = async () => {
    setisSimulating(true);
    try {
      if (!verifyNotEmptySimulations(simulation)) {
        throw new Error(
          "There is a simulation model with incomplete parameters. \n Check your simulations!"
        );
      }
      if (simulation.length < 1) {
        throw new Error("You must add a simulation at least");
      }
      // build object simulation template for toml
      const simulationsSelected = simulation.map((e, i) => {
        const { parameters: modelParameters } = models.find(
          (m) => m.id === e.idModel
        );
        const geoselectionItems =
          geoSelection.find((g) => g.id === e.idGeo) || {};
        const { scale, featureSelected } =
          (typeof geoselectionItems !== "undefined" && geoselectionItems) || {};
        return {
          idSim: e.idSim,
          model: {
            name: modelParameters.name,
            compartments: modelParameters.compartments,
          },
          data: {
            datafile: false,
            importdata: false,
            initdate: "2020-03-22",
            country: "USA",
            state: scale === "States" ? featureSelected : "",
            county: scale === "Counties" ? featureSelected : "",
            healthservice: "",
            loc_name: "",
          },
          parameters: {
            static: {
              t_init: 0,
              t_end: modelParameters.t_end,
              mu: modelParameters.mu,
              pI_det: modelParameters.pI_det,
            },
            dynamic: {
              beta: modelParameters.beta,
              alpha: modelParameters.alpha,
              tE_I: modelParameters.tE_I,
              tI_R: modelParameters.tI_R,
              rR_S: modelParameters.rR_S,
            },
          },
          initialconditions: {
            I: +e.initialConditions.I,
            I_d: +e.initialConditions.I_d,
            I_ac: +e.initialConditions.I_ac,
            population: +e.initialConditions.population,
            R: +e.initialConditions.R,
            E: +e.initialConditions.E,
          },
        };
      });
      const objConfig = simulationsSelected.reduce((acc, it, i) => {
        return {
          ...acc,
          [`Sim ${i + 1}`]: it,
        };
      }, {});
      if (simulationsSelected.length > 0) {
        const datas = await postData(
          "http://192.168.2.131:5003/simulate",
          objConfig
        );
        const val = Object.values(datas.results);
        const keys = Object.keys(datas.results);
        const data = val
          .map((simString: string) => JSON.parse(simString))
          .map((sim, i) => ({
            name: keys[i],
            ...sim,
          }));
        setAux(JSON.stringify(data));
        setIndex(4);
      }
      toast({
        position: bottonLeft,
        title: "Simulation success",
        description: "Your simulation was completed successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      if (error.response.status === 400) {
        toast({
          position: bottonLeft,
          title: "Simulation failed",
          description: "Parameters are invalid. Check your models!",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          position: bottonLeft,
          title: "Simulation failed",
          description: `${error.message}`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } finally {
      setisSimulating(false);
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
