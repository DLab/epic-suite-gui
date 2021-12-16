import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Tr,
  Td,
  Icon,
  Select,
  Button,
  Spinner,
  useToast,
  Input,
} from "@chakra-ui/react";
import _ from "lodash";
import { useState, useEffect, useContext, useCallback } from "react";

import SelectDate from "components/simulator/controllers/SelectDate";
import { ControlPanel } from "context/ControlPanelContext";
import { DataParameters, ModelsSaved } from "context/ModelsContext";
import { SelectFeature } from "context/SelectFeaturesContext";
import {
  OptionFeature,
  SimulationSetted,
  SimulatorParams,
} from "context/SimulationContext";
import { postData } from "utils/fetchData";
import reducerValuesObjects from "utils/reducerValuesObject";

interface Props {
  idSimulation: number;
}
const RealConditions = "real-conditions";

// eslint-disable-next-line complexity
const SimulationItem = ({ idSimulation }: Props) => {
  const toast = useToast();
  const { parameters } = useContext(ModelsSaved);
  const { geoSelections } = useContext(SelectFeature);
  const { setInitialConditions: setInitialConditionsContext } =
    useContext(ControlPanel);
  const { simulation, setIdSimulationUpdating, setSimulation } =
    useContext(SimulationSetted);
  // set state into components for optionfeature -> Graph - Geographic - ""
  const [optionFeature, setOptionFeature] = useState<OptionFeature>(
    OptionFeature.None
  );
  const [idGeoSelection, setIdGeoSelection] = useState<number>(0);
  const [idGraph, setIdGraph] = useState<number>(0);
  // const [modelsCopy, setModelsCopy] = useState({});
  // const [geoSelectionCopy, setGeoSelectionCopy] = useState([]);
  const [initialConditions, setInitialConditions] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // get data from Localstorage and set models & geoSelection

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
      return simulation.find(
        ({ idSim }: SimulatorParams) => idSim === idSimulation
      )[field];
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
  const valueOptionFeature = useCallback(
    (e: string) => {
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
    },
    [idSimulation, setSimulation]
  );
  // update any property in simulationContext
  const selectSimulation = useCallback(
    (e, target) => {
      setSimulation({
        type: "update",
        element: e,
        target,
        id: idSimulation,
      });
    },
    [idSimulation, setSimulation]
  );
  const handleFetch = async (url, method, body) => {
    try {
      setIsLoading(true);
      if (!body) {
        throw new Error("There's no geographics areas selected");
      }
      const { featureSelected: spatialSelection, scale } = geoSelections.find(
        (element) => element.id === body
      );
      if (!spatialSelection) {
        throw new Error(
          "Spatial selection hasn't states or counties selected. \n Check it before set initial conditions"
        );
      }

      const { idModel, t_init: timeInit } = simulation.find(
        (s) => s.idSim === idSimulation
      );
      if (idModel === 0) {
        throw new Error("Choose a model please");
      }
      const { name } = parameters.find(
        (m: DataParameters) => m.id === idModel
      ).parameters;
      const configCalcInitialConditions = {
        compartments: name,
        timeInit,
        scale,
        spatialSelection,
      };
      if (method === "POST") {
        const {
          E,
          I,
          I_new: daily,
          I_acum: acum,
          R,
          population,
        } = await postData(url, configCalcInitialConditions);
        if (name !== "SEIR") {
          setInitialConditions({
            I,
            I_d: daily,
            I_ac: acum,
            population,
            R,
            E: 0,
          });
          selectSimulation(
            {
              I,
              I_d: daily,
              I_ac: acum,
              population,
              R,
              E: 0,
            },
            "initialConditions"
          );
        } else {
          setInitialConditions({
            I,
            I_d: daily,
            I_ac: acum,
            population,
            R,
            E,
          });
          selectSimulation(
            {
              I,
              I_d: daily,
              I_ac: acum,
              population,
              R,
              E,
            },
            "initialConditions"
          );
        }
      }
    } catch (error) {
      setIsLoading(false);
      setIdGeoSelection(0);
      setIdSimulationUpdating({ type: "set", payload: 0 });
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
      toast({
        position: "bottom-left",
        title: "Error",
        description: `${error.message}`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  useEffect(() => {
    // usar lodash para comparar objetos
    // console.log(parameters,geoSelections);
    valueOptionFeature(OptionFeature.None);
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
  }, [
    parameters,
    geoSelections,
    valueOptionFeature,
    setIdSimulationUpdating,
    selectSimulation,
  ]);
  return (
    <Tr>
      <Td>
        <Input
          placeholder="Add simulation name"
          size="sm"
          onChange={(e) => {
            selectSimulation(e.target.value, "name");
          }}
        />
      </Td>
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
          {parameters.length > 0 &&
            parameters.map((param: DataParameters) => {
              return (
                <option key={param.id} value={param.id}>
                  {param.parameters.name_model}
                </option>
              );
            })}
        </Select>
      </Td>
      <Td>
        {optionFeature !== OptionFeature.Graph && (
          <SelectDate idSimulation={idSimulation} />
        )}
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
              handleFetch(
                "http://192.168.2.216:5000/initCond",
                "POST",
                +e.target.value
              );
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
            geoSelections.length > 0 &&
            geoSelections.map((e) => {
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
            w="100%"
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
            <Icon color="#16609E" as={EditIcon} cursor="pointer" />
          </Button>
        )}
        {optionFeature === OptionFeature.Geographic && idGeoSelection !== 0 && (
          <Button
            w="100%"
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
            {reducerValuesObjects(initialConditions) > 0 && (
              <Icon color="#16609E" as={EditIcon} cursor="pointer" />
            )}
            {isLoading ? (
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="md"
              />
            ) : (
              ""
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
