/* eslint-disable @typescript-eslint/naming-convention */
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
    Radio,
    RadioGroup,
    Stack,
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
import postData from "utils/fetchData";

import AreaSelectedBox from "./AreaSelectedBox";
import RunSimulatorButton from "./RunSimulatorButton";

export interface InitialConditionsContext {
    S: number;
    R: number;
    I: number;
    I_d: number;
    I_ac: number;
    E?: number;
    H?: number;
    H_acum?: number;
    V?: number;
    V_acum?: number;
    D?: number;
    D_acum?: number;
    Iv?: number;
    H_cap?: number;
}

interface Props {
    idModel: number;
    idSimulation: number;
    idGeo: number;
    intialConditionsSim: InitialConditionsContext;
    typeSelection: string;
    index: number;
}

// eslint-disable-next-line complexity
const SimulationTabPannel = ({
    idModel: idModelSelected,
    idSimulation,
    idGeo,
    intialConditionsSim,
    typeSelection,
    index,
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
    const [initialConditionsMode, setInitialConditionsMode] = useState(false);
    const [modelType, setModelType] = useState("SEIR");
    const [nameSim, setNameSim] = useState("");
    const [geoSelectionNoCounties, setGeoSelectionNoCounties] = useState([]);
    const { simulation, setIdSimulationUpdating, setSimulation } =
        useContext(SimulationSetted);
    const { geoSelections } = useContext(SelectFeature);
    const { setInitialConditions: setInitialConditionsContext } =
        useContext(ControlPanel);
    const { setAllGraphicData, setRealDataSimulationKeys } =
        useContext(GraphicsData);
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
        return parameters.find((m: DataParameters) => m.id === id)?.parameters;
    };

    const postInitialConditionsByModel = (
        Compartment,
        E,
        I,
        I_acum,
        I_active,
        R,
        S,
        H,
        H_acum,
        V,
        V_acum,
        D,
        D_acum,
        Iv,
        H_cap
    ) => {
        if (Compartment === "SEIR") {
            setInitialConditions({
                I: I_active,
                I_d: I,
                I_ac: I_acum,
                S,
                R,
                E,
            });
            selectSimulation(
                {
                    I: I_active,
                    I_d: I,
                    I_ac: I_acum,
                    S,
                    R,
                    E,
                },
                "initialConditions"
            );
        }
        if (Compartment === "SIR") {
            setInitialConditions({
                I: I_active,
                I_d: I,
                I_ac: I_acum,
                S,
                R,
            });
            selectSimulation(
                {
                    I: I_active,
                    I_d: I,
                    I_ac: I_acum,
                    S,
                    R,
                },
                "initialConditions"
            );
        }
        if (Compartment === "SEIRHVD") {
            setInitialConditions({
                I: I_active,
                I_d: I,
                I_ac: I_acum,
                S,
                R,
                E,
                H_d: H,
                H: H_acum,
                Iv_d: V,
                Iv_ac: V_acum,
                D_d: D,
                D: D_acum,
                Iv,
                H_cap,
            });
            selectSimulation(
                {
                    I: I_active,
                    I_d: I,
                    I_ac: I_acum,
                    S,
                    R,
                    E,
                    H_d: H,
                    H: H_acum,
                    Iv_d: V,
                    Iv_ac: V_acum,
                    D_d: D,
                    D: D_acum,
                    Iv,
                    H_cap,
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
            const { featureSelected: spatialSelection, scale } =
                geoSelections.find((element) => element.id === body);
            if (!spatialSelection) {
                throw new Error(
                    "Spatial selection hasn't states or counties selected. \n Check it before set initial conditions"
                );
            }

            const {
                idModel,
                t_init: timeInit,
                name: nameModel,
            } = simulation.find(
                (s: SimulatorParams) => s.idSim === idSimulation
            );
            if (idModel === 0) {
                throw new Error("Choose a model please");
            }
            const { name } = getModelById(idModel);
            const configCalcInitialConditions = {
                compartments: name,
                timeInit: timeInit.split("/").join("-"),
                scale,
                spatialSelection,
            };
            if (method === "POST") {
                const { result } = await postData(url, {
                    [nameModel]: configCalcInitialConditions,
                });
                const {
                    Compartment,
                    E,
                    I,
                    I_acum,
                    I_active,
                    R,
                    S,
                    H,
                    H_acum,
                    V,
                    V_acum,
                    D,
                    D_acum,
                    Iv,
                    H_cap,
                } = result[nameModel];
                postInitialConditionsByModel(
                    Compartment,
                    E,
                    I,
                    I_acum,
                    I_active,
                    R,
                    S,
                    H,
                    H_acum,
                    V,
                    V_acum,
                    D,
                    D_acum,
                    Iv,
                    H_cap
                );
            }
        } catch (error) {
            setIsLoading(false);
            setIdGeoSelection(0);
            setIdSimulationUpdating({ type: "set", payload: 0 });
            setInitialConditionsContext({
                type: RealConditions,
                real: {
                    S: 0,
                    R: 0,
                    I: 0,
                    I_d: 0,
                    I_ac: 0,
                    E: 0,
                    H: 0,
                    H_acum: 0,
                    V: 0,
                    V_acum: 0,
                    D: 0,
                    D_acum: 0,
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
        if (idModelSelected !== 0) {
            setModelType(getModelById(idModelSelected)?.name);
            const getGeoSelectionNoCounties = geoSelections.filter((e) => {
                return e.scale !== "Counties";
            });
            setGeoSelectionNoCounties(getGeoSelectionNoCounties);
        }

        setInitialConditions(null);
        const simInitialConditions = simulation.find(
            (e: SimulatorParams) => e.idSim === idSimulation
        ).initialConditions;
        if (simInitialConditions) {
            setInitialConditions(simInitialConditions);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [idSimulation, simulation, idModelSelected]);

    useEffect(() => {
        const getName = getDefaultValueParameters("name");
        if (getName === "") {
            selectSimulation(`Sim ${index + 1}`, "name");
        } else {
            setNameSim(getName);
        }
        return () => {
            setNameSim("");
        };
    }, [getDefaultValueParameters, index, selectSimulation]);

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
                                setNameSim(e.target.value);
                            }}
                            onBlur={() => {
                                selectSimulation(nameSim, "name");
                            }}
                            value={nameSim}
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
                                setIdSimulationUpdating({
                                    type: "set",
                                    payload: 0,
                                });
                                selectSimulation(
                                    {
                                        S: 0,
                                        R: 0,
                                        I: 0,
                                        I_d: 0,
                                        I_ac: 0,
                                        E: 0,
                                        H: 0,
                                        H_acum: 0,
                                        V: 0,
                                        V_acum: 0,
                                        D: 0,
                                        D_acum: 0,
                                        Iv: 0,
                                        H_cap: 0,
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
                            <SelectDate
                                idSimulation={idSimulation}
                                valueOptionFeature={valueOptionFeature}
                                setIdGeo={setIdGeoSelection}
                                setIdGraph={setIdGraph}
                                setIdSim={setIdSimulationUpdating}
                                selectSim={selectSimulation}
                            />
                        )}
                    </Box>
                    <Box mb="3%">
                        <Text fontSize="14px" fontWeight={500}>
                            Type Area
                        </Text>
                        <RadioGroup
                            size="sm"
                            value={
                                getDefaultValueParameters("typeSelection") ||
                                OptionFeature.None
                            }
                            onChange={(e) => {
                                valueOptionFeature(e);
                                setIdGeoSelection(0);
                                setIdGraph(0);
                                setIdSimulationUpdating({
                                    type: "set",
                                    payload: 0,
                                });
                                selectSimulation(
                                    {
                                        S: 0,
                                        R: 0,
                                        I: 0,
                                        I_d: 0,
                                        I_ac: 0,
                                        E: 0,
                                        H: 0,
                                        H_acum: 0,
                                        V: 0,
                                        V_acum: 0,
                                        D: 0,
                                        D_acum: 0,
                                        Iv: 0,
                                        H_cap: 0,
                                    },
                                    "initialConditions"
                                );
                            }}
                        >
                            <Stack direction="row">
                                <Radio value={OptionFeature.Graph}>Graph</Radio>
                                {/* <Radio value={OptionFeature.Geographic}>
                                    Geographic
                                </Radio> */}
                                {/* Borrar cuando se implementen las condiciones iniciales para SEIRHVD */}
                                {modelType === "SEIRHVD" ? (
                                    <Radio
                                        isDisabled
                                        value={OptionFeature.Geographic}
                                    >
                                        Geographic
                                    </Radio>
                                ) : (
                                    <Radio value={OptionFeature.Geographic}>
                                        Geographic
                                    </Radio>
                                )}
                            </Stack>
                        </RadioGroup>
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
                                if (
                                    optionFeature === OptionFeature.Geographic
                                ) {
                                    handleFetch(
                                        "http://192.168.2.131:5001/initCond",
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
                                setIdSimulationUpdating({
                                    type: "set",
                                    payload: 0,
                                });
                            }}
                        >
                            {optionFeature === OptionFeature.Geographic &&
                                geoSelections.length > 0 &&
                                modelType !== "SEIRHVD" &&
                                geoSelections.map((e) => {
                                    return (
                                        <option key={e.id} value={e.id}>
                                            {e.name}
                                        </option>
                                    );
                                })}
                            {optionFeature === OptionFeature.Geographic &&
                                geoSelections.length > 0 &&
                                modelType === "SEIRHVD" &&
                                // eslint-disable-next-line sonarjs/no-identical-functions
                                geoSelectionNoCounties.map((e) => {
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
                <Box
                    h="50%"
                    bg="#FAFAFA"
                    borderRadius="6px"
                    p="2%"
                    boxShadow="sm"
                    overflowY="auto"
                >
                    <Flex justify="space-between">
                        <Text fontSize="14px" fontWeight={500}>
                            Initial Conditions
                        </Text>
                        {optionFeature === OptionFeature.Graph &&
                            idGraph !== 0 &&
                            !initialConditionsMode && (
                                <IconButton
                                    bg="#16609E"
                                    color="#FFFFFF"
                                    aria-label="Call Segun"
                                    size="sm"
                                    cursor="pointer"
                                    _hover={{ bg: "blue.500" }}
                                    icon={<EditIcon />}
                                    onClick={() => {
                                        setInitialConditionsMode(true);
                                        if (!initialConditions) {
                                            setInitialConditionsContext({
                                                type: RealConditions,
                                                real: {
                                                    S: 0,
                                                    R: 0,
                                                    I: 0,
                                                    I_d: 0,
                                                    I_ac: 0,
                                                    E: 0,
                                                    D: 0,
                                                    D_acum: 0,
                                                    H: 0,
                                                    H_acum: 0,
                                                    V: 0,
                                                    V_acum: 0,
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
                            !initialConditionsMode && (
                                <IconButton
                                    bg="#16609E"
                                    color="#FFFFFF"
                                    aria-label="Call Segun"
                                    size="sm"
                                    cursor="pointer"
                                    _hover={{ bg: "blue.500" }}
                                    icon={<EditIcon />}
                                    onClick={() => {
                                        setInitialConditionsMode(true);
                                        if (initialConditions) {
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
                    setRealDataSimulationKeys([]);
                }}
            />
        </>
    );
};

export default SimulationTabPannel;
