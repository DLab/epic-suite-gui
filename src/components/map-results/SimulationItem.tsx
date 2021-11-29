import { DeleteIcon } from "@chakra-ui/icons";
import { Tr, Td, Icon, Select, Button, Spinner } from "@chakra-ui/react";
import { useState, useEffect, useContext, useCallback } from "react";

import { ControlPanel } from "context/ControlPanelContext";
import { ModelsSaved } from "context/ModelsContext";
import {
  OptionFeature,
  SimulationSetted,
  SimulatorParams,
} from "context/SimulationContext";
import { postData } from "utils/fetchData";

interface Props {
  idSimulation: number;
}
const RealConditions = "real-conditions";

// eslint-disable-next-line complexity
const SimulationItem = ({ idSimulation }: Props) => {
  const { parameters } = useContext(ModelsSaved);
  const { setInitialConditions: setInitialConditionsContext } =
    useContext(ControlPanel);
  const { simulation, setIdSimulationUpdating, setSimulation } =
    useContext(SimulationSetted);
  // set state into components for optionfeature -> Graph - Geographic - ""
  const [optionFeature, setOptionFeature] = useState<OptionFeature>(
    OptionFeature.None
  );
  const [idGeoSelection, setIdGeoSelection] = useState(0);
  const [idGraph, setIdGraph] = useState(0);
  const [models, setModels] = useState([]);
  const [geoSelection, setGeoSelection] = useState([]);
  const [initialConditions, setInitialConditions] = useState(null);
  // get data from Localstorage and set models & geoSelection
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

  useEffect(() => {
    setInitialConditions(null);
    const simInitialConditions = simulation.find(
      (e: SimulatorParams) => e.idSim === idSimulation
    ).initialConditions;
    if (simInitialConditions) {
      setInitialConditions(simInitialConditions);
    }
  }, [idSimulation, simulation]);
  const getDefaultValueParameters = useCallback(
    (field) => {
      return simulation.find((sim) => sim.idSim === idSimulation)[field];
    },
    [simulation, idSimulation]
  );
  useEffect(() => {
    setOptionFeature(getDefaultValueParameters("typeSelection"));
    setIdGeoSelection(getDefaultValueParameters("idGeo"));
    setIdGraph(getDefaultValueParameters("idGraph"));
  }, [getDefaultValueParameters]);
  /* dispatch to simulationContext data about type selection 
  when select value is changed. Besides, modify other contexts values */
  const valueOptionFeature = (e: string) => {
    switch (e) {
      case OptionFeature.Geographic:
        setOptionFeature(OptionFeature.Geographic);
        setSimulation({
          type: "update",
          element: OptionFeature.Geographic,
          target: "typeSelection",
          id: idSimulation,
        });
        setSimulation({
          type: "update",
          element: 0,
          target: "idGraph",
          id: idSimulation,
        });
        break;
      case OptionFeature.Graph:
        setOptionFeature(OptionFeature.Graph);
        setSimulation({
          type: "update",
          element: OptionFeature.Graph,
          target: "typeSelection",
          id: idSimulation,
        });
        setSimulation({
          type: "update",
          element: 0,
          target: "idGeo",
          id: idSimulation,
        });
        break;
      default:
        setOptionFeature(OptionFeature.None);
        setSimulation({
          type: "update",
          element: OptionFeature.None,
          target: "typeSelection",
          id: idSimulation,
        });
        setSimulation({
          type: "update",
          element: 0,
          target: "idGeo",
          id: idSimulation,
        });
        setSimulation({
          type: "update",
          element: 0,
          target: "idGraph",
          id: idSimulation,
        });
        break;
    }
  };
  // update any property in simulationContext
  const selectSimulation = (e, target) => {
    setSimulation({
      type: "update",
      element: e,
      target,
      id: idSimulation,
    });
  };
  const handleFetch = (url, method, body) => {
    if (!body) {
      return false;
    }
    const spatialSelection = geoSelection.find(
      (element) => element.id === body
    ).featureSelected;
    if (!spatialSelection) {
      return false;
    }
    if (method === "POST")
      postData(url, spatialSelection).then((e) => {
        setInitialConditions(e);
        selectSimulation(e, "initialConditions");
      });
    return false;
  };
  return (
    <Tr>
      <Td>
        <Select
          placeholder="select a model"
          onChange={(e) => {
            selectSimulation(+e.target.value, "idModel");
            setIdGeoSelection(0);
            setIdGraph(0);
            valueOptionFeature(OptionFeature.None);
            setIdSimulationUpdating({ type: "set", payload: 0 });
            selectSimulation(
              {
                population: 0,
                R: 0,
                I: 0,
                I_d: 0,
                I_ac: 0,
                E: 0,
              },
              "initialConditions"
            );
          }}
          value={getDefaultValueParameters("idModel") ?? 0}
        >
          {models.length > 0 &&
            models.map((param) => {
              return (
                <option key={param.id} value={param.id}>
                  {param.parameters.name_model}
                </option>
              );
            })}
        </Select>
      </Td>
      <Td>
        <Select
          value={
            getDefaultValueParameters("typeSelection") || OptionFeature.None
          }
          placeholder="Choose feature selection"
          onChange={(e) => {
            valueOptionFeature(e.target.value);
            setIdGeoSelection(0);
            setIdGraph(0);
            setIdSimulationUpdating({ type: "set", payload: 0 });
            selectSimulation(
              {
                population: 0,
                R: 0,
                I: 0,
                I_d: 0,
                I_ac: 0,
                E: 0,
              },
              "initialConditions"
            );
          }}
        >
          <option value={OptionFeature.Graph}>Graph</option>
          <option value={OptionFeature.Geographic}>Geographic</option>
        </Select>
      </Td>
      <Td>
        <Select
          disabled={optionFeature === OptionFeature.None}
          placeholder="Name Selection"
          value={
            // eslint-disable-next-line no-nested-ternary
            optionFeature === OptionFeature.Geographic
              ? getDefaultValueParameters("idGeo")
              : optionFeature === OptionFeature.Graph
              ? getDefaultValueParameters("idGraph")
              : 0
          }
          onChange={(e) => {
            setIdGeoSelection(+e.target.value);
            setIdGraph(+e.target.value);
            if (optionFeature === OptionFeature.Geographic) {
              handleFetch("/api/parameters", "POST", +e.target.value);
            }
            selectSimulation(
              +e.target.value,
              // eslint-disable-next-line no-nested-ternary
              optionFeature === OptionFeature.Geographic
                ? "idGeo"
                : optionFeature === OptionFeature.Graph
                ? "idGraph"
                : ""
            );
            setIdSimulationUpdating({ type: "set", payload: 0 });
          }}
        >
          {optionFeature === OptionFeature.Geographic &&
            geoSelection.length > 0 &&
            geoSelection.map((e) => {
              return (
                <option key={e.id} value={e.id}>
                  {e.name}
                </option>
              );
            })}
          {optionFeature === OptionFeature.Graph && (
            <option value={1}>one Node</option>
          )}
        </Select>
      </Td>
      <Td>
        {optionFeature === OptionFeature.Graph && idGraph !== 0 && (
          <Button
            colorScheme="teal"
            variant="link"
            onClick={() => {
              setIdSimulationUpdating({ type: "set", payload: idSimulation });
              if (!initialConditions) {
                setInitialConditionsContext({
                  type: RealConditions,
                  real: {
                    population: 0,
                    R: 0,
                    I: 0,
                    I_d: 0,
                    I_ac: 0,
                    E: 0,
                  },
                });
              } else {
                setInitialConditionsContext({
                  type: RealConditions,
                  real: initialConditions,
                });
              }
            }}
          >
            Set Conditions
          </Button>
        )}
        {optionFeature === OptionFeature.Geographic && idGeoSelection !== 0 && (
          <Button
            colorScheme="teal"
            variant="link"
            onClick={() => {
              if (initialConditions) {
                setIdSimulationUpdating({ type: "set", payload: idSimulation });
                setInitialConditionsContext({
                  type: RealConditions,
                  real: initialConditions,
                });
              }
            }}
          >
            {initialConditions ? (
              "Update Conditions"
            ) : (
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            )}
          </Button>
        )}
      </Td>
      <Td>
        {/* delete component from table */}
        <Icon
          color="#16609E"
          as={DeleteIcon}
          cursor="pointer"
          onClick={() =>
            setSimulation({ type: "remove", element: idSimulation })
          }
        />
      </Td>
    </Tr>
  );
};

export default SimulationItem;
