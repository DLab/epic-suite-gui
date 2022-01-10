import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Text,
  Flex,
  Input,
  Select,
  useToast,
  IconButton,
  Icon,
  Center,
} from "@chakra-ui/react";
import React, { useState, useEffect, useCallback, useContext } from "react";

import "leaflet/dist/leaflet.css";
import InitialConditions from "components/simulator/controllers/InitialConditions";
import SelectDate from "components/simulator/controllers/SelectDate";
import { ControlPanel } from "context/ControlPanelContext";
import { GraphicsData } from "context/GraphicsContext";
import { ModelsSaved } from "context/ModelsContext";
import { SelectFeature } from "context/SelectFeaturesContext";
import { SimulationSetted } from "context/SimulationContext";
import { DataParameters } from "types/ModelsTypes";
import { DataGeoSelections } from "types/SelectFeaturesTypes";
import { OptionFeature, SimulatorParams } from "types/SimulationTypes";
import { postData } from "utils/fetchData";

import AreaSelectedBox from "./AreaSelectedBox";
import RunSimulatorButton from "./RunSimulatorButton";

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
  idGeo: number;
  intialConditionsSim: InitialConditionsContext;
  typeSelection: string;
}

// eslint-disable-next-line complexity
const SimulationTabPannel = ({
  idModel: idModelSelected,
  idSimulation,
  idGeo,
  intialConditionsSim,
  typeSelection,
}: // eslint-disable-next-line sonarjs/cognitive-complexity
Props) => {
  const toast = useToast();
  const [idGeoSelection, setIdGeoSelection] = useState<number>(0);
  const [idGraph, setIdGraph] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [geoAreaSelected] = useState<DataGeoSelections>({
    id: 0,
    name: "",
    scale: "",
    featureSelected: [],
  });
  const [initialConditions, setInitialConditions] = useState(null);
  const [initialConditionsMode, setInitialConditionsMode] = useState("view");
  const { simulation, setIdSimulationUpdating, setSimulation } =
    useContext(SimulationSetted);
  const { geoSelections } = useContext(SelectFeature);
  const { setInitialConditions: setInitialConditionsContext } =
    useContext(ControlPanel);
  const { setAllGraphicData } = useContext(GraphicsData);
  const [optionFeature, setOptionFeature] = useState<OptionFeature>(
    OptionFeature.None
  );
  const { parameters } = useContext(ModelsSaved);
  const RealConditions = "real-conditions";

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

  const getDefaultValueParameters = useCallback(
    (field) => {
      return simulation.find(
        ({ idSim }: SimulatorParams) => idSim === idSimulation
      )[field];
    },
    [simulation, idSimulation]
  );

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

  const getModelById = (id) => {
    return parameters.find((m: DataParameters) => m.id === id).parameters;
  };

  const postInitialConditionsByModel = (
    name,
    E,
    I,
    daily,
    acum,
    R,
    population,
    H,
    V,
    D
  ) => {
    if (name === "SEIR") {
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
    if (name === "SIR") {
      setInitialConditions({
        I,
        I_d: daily,
        I_ac: acum,
        population,
        R,
      });
      selectSimulation(
        {
          I,
          I_d: daily,
          I_ac: acum,
          population,
          R,
        },
        "initialConditions"
      );
    }
    if (name === "SEIRHVD") {
      setInitialConditions({
        I,
        I_d: daily,
        I_ac: acum,
        population,
        R,
        // H,
        // V,
        // D,
      });
      selectSimulation(
        {
          I,
          I_d: daily,
          I_ac: acum,
          population,
          // H,
          // V,
          // D,
        },
        "initialConditions"
      );
    }
  };

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
      const { name } = getModelById(idModel);
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
          H,
          V,
          D,
        } = await postData(url, configCalcInitialConditions);
        postInitialConditionsByModel(
          name,
          E,
          I,
          daily,
          acum,
          R,
          population,
          H,
          V,
          D
        );
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
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setOptionFeature(getDefaultValueParameters("typeSelection"));
    setIdGeoSelection(getDefaultValueParameters("idGeo"));
    setIdGraph(getDefaultValueParameters("idGraph"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getDefaultValueParameters]);
  /* dispatch to simulationContext data about type selection 
  when select value is changed. Besides, modify other contexts values */

  useEffect(() => {
    setInitialConditions(null);
    const simInitialConditions = simulation.find(
      (e: SimulatorParams) => e.idSim === idSimulation
    ).initialConditions;
    if (simInitialConditions) {
      setInitialConditions(simInitialConditions);
    }
  }, [idSimulation, simulation]);

  return (
    <>
      <Flex
        direction="column"
        w="35%"
        bg="#FAFAFA"
        borderRadius="6px"
        p="2%"
        boxShadow="sm"
        justify="space-between"
      >
        <Flex direction="column">
          <Box mb="3%">
            <Text fontSize="14px" fontWeight={500}>
              Name Simulation
            </Text>
            <Input
              w="13rem"
              placeholder="Add simulation name"
              size="sm"
              onChange={(e) => {
                selectSimulation(e.target.value, "name");
              }}
              value={getDefaultValueParameters("name")}
            />
          </Box>
          <Box mb="3%">
            <Text fontSize="14px" fontWeight={500}>
              Model
            </Text>
            <Select
              w="13rem"
              fontSize="14px"
              placeholder="select a model"
              size="sm"
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
          </Box>
          <Box mb="3%">
            <Text fontSize="14px" fontWeight={500}>
              Date
            </Text>
            {optionFeature !== OptionFeature.Graph && (
              <SelectDate idSimulation={idSimulation} />
            )}
          </Box>
          <Box mb="3%">
            <Text fontSize="14px" fontWeight={500}>
              Type Area
            </Text>
            <Select
              w="13rem"
              fontSize="14px"
              size="sm"
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
              <option key="graph" value={OptionFeature.Graph}>
                Graph
              </option>
              <option key="geographic" value={OptionFeature.Geographic}>
                Geographic
              </option>
            </Select>
          </Box>
          <Box mb="3%">
            <Text fontSize="14px" fontWeight={500}>
              Area Selected
            </Text>
            <Select
              w="13rem"
              fontSize="14px"
              size="sm"
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
                    "http://192.168.2.131:5000/initCond",
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
                <option key="one-node" value={1}>
                  one Node
                </option>
              )}
            </Select>
          </Box>
        </Flex>
        <Box mt="2%">
          <Center>
            {" "}
            <RunSimulatorButton />
          </Center>
        </Box>
      </Flex>
      <Flex direction="column" w="65%" m="0 2%">
        <AreaSelectedBox
          idGeo={idGeo}
          typeSelection={typeSelection}
          geoAreaSelected={geoAreaSelected.featureSelected}
          optionFeature={optionFeature}
        />
        <Box h="50%" bg="#FAFAFA" borderRadius="6px" p="2%" boxShadow="sm">
          <Flex justify="space-between">
            <Text fontSize="14px" fontWeight={500}>
              Initial Conditions
            </Text>
            {optionFeature === OptionFeature.Graph &&
              idGraph !== 0 &&
              initialConditionsMode === "view" && (
                <IconButton
                  bg="#16609E"
                  color="#FFFFFF"
                  aria-label="Call Segun"
                  size="sm"
                  cursor="pointer"
                  _hover={{ bg: "blue.500" }}
                  icon={<EditIcon />}
                  onClick={() => {
                    setInitialConditionsMode("edit");
                    setIdSimulationUpdating({
                      type: "set",
                      payload: idSimulation,
                    });
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
                />
              )}
            {optionFeature === OptionFeature.Geographic &&
              idGeoSelection !== 0 &&
              initialConditionsMode === "view" && (
                <IconButton
                  bg="#16609E"
                  color="#FFFFFF"
                  aria-label="Call Segun"
                  size="sm"
                  cursor="pointer"
                  _hover={{ bg: "blue.500" }}
                  icon={<EditIcon />}
                  onClick={() => {
                    setInitialConditionsMode("edit");
                    if (initialConditions) {
                      setIdSimulationUpdating({
                        type: "set",
                        payload: idSimulation,
                      });
                      setInitialConditionsContext({
                        type: RealConditions,
                        real: initialConditions,
                      });
                    }
                  }}
                />
              )}
          </Flex>
          <InitialConditions
            idModel={idModelSelected}
            idSimulation={idSimulation}
            intialConditionsSim={intialConditionsSim}
            initialConditionsMode={initialConditionsMode}
            setInitialConditionsMode={setInitialConditionsMode}
          />
        </Box>
      </Flex>
      <Icon
        color="#16609E"
        as={DeleteIcon}
        cursor="pointer"
        onClick={() => {
          setSimulation({ type: "remove", element: idSimulation });
          setAllGraphicData([]);
        }}
      />
    </>
  );
};

export default SimulationTabPannel;
