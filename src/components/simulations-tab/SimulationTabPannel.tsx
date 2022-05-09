/* eslint-disable sonarjs/no-duplicate-string */
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
    Button,
} from "@chakra-ui/react";
import format from "date-fns/format";
import React, {
    useState,
    useEffect,
    useCallback,
    useContext,
    useReducer,
} from "react";

import "leaflet/dist/leaflet.css";
import { ExportModels } from "components/models-tab/ImportExportModels";
import InitialConditions from "components/simulator/controllers/InitialConditions";
import SelectDate from "components/simulator/controllers/SelectDate";
import { ControlPanel } from "context/ControlPanelContext";
import { GraphicsData } from "context/GraphicsContext";
import { ModelsSaved } from "context/ModelsContext";
import { SelectFeature } from "context/SelectFeaturesContext";
import { SimulationSetted } from "context/SimulationContext";
import { InitialConditions as InitialConditionsContext } from "types/ControlPanelTypes";
import { DataParameters } from "types/ModelsTypes";
import { OptionFeature, SimulatorParams } from "types/SimulationTypes";
import postData from "utils/fetchData";

import AreaSelectedBox from "./AreaSelectedBox";
import RunSimulatorButton from "./RunSimulatorButton";

interface Props {
    idModel: number;
    idSimulation: number;
    idGeo: number;
    idGraph: number;
    intialConditionsSim: InitialConditionsContext;
    typeSelection: string;
    index: number;
    setTabIndex: (value: number) => void;
}
type Nullable<T> = T | null;
// eslint-disable-next-line complexity
const SimulationTabPannel = ({
    idModel: idModelSelected,
    idSimulation,
    idGeo,
    idGraph: idGraphSelected,
    intialConditionsSim,
    typeSelection,
    index,
    setTabIndex,
}: // eslint-disable-next-line sonarjs/cognitive-complexity
Props) => {
    const toast = useToast();

    const { simulation, setIdSimulationUpdating, setSimulation } =
        useContext(SimulationSetted);
    const [runDisabled, setRunDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [nameSim, setNameSim] = useState("");
    const [idGeoSelection, setIdGeoSelection] = useState<number>(0);
    const reducerInitialConditions = (state, action) => {
        if (action.type === "set") return action.payload;
        return state;
    };

    const [initialConditions, setInitialConditions] = useReducer(
        reducerInitialConditions,
        {}
    );
    const [idGraph, setIdGraph] = useState<number>(0);
    const [initialConditionsMode, setInitialConditionsMode] = useState(false);
    const [idModel2, setIdModel2] = useState<number>();
    const [startDate, setStartDate] = useState(
        new Date(
            simulation.find((s: SimulatorParams) => s.idSim === idSimulation)
                .t_init ?? new Date(2022, 0, 1)
        )
    );
    const [optionFeature, setOptionFeature] = useState<OptionFeature>(
        OptionFeature.None
    );

    const [modelType, setModelType] = useState("SEIR");
    const [geoSelectionNoCounties, setGeoSelectionNoCounties] = useState([]);
    const { geoSelections } = useContext(SelectFeature);
    const { setInitialConditions: setInitialConditionsContext } =
        useContext(ControlPanel);
    const {
        setAllGraphicData,
        setRealDataSimulationKeys,
        setDataToShowInMap,
        setAllResults,
    } = useContext(GraphicsData);
    const { parameters } = useContext(ModelsSaved);
    const RealConditions = "real-conditions";

    useEffect(() => {
        if (
            idModelSelected !== 0 &&
            typeSelection !== "" &&
            (idGeo !== 0 ||
                (idGraphSelected !== 0 &&
                    intialConditionsSim.population !== 0 &&
                    +intialConditionsSim.population !== 0))
        ) {
            setRunDisabled(false);
        }
    }, [
        idGeo,
        idGraphSelected,
        idModelSelected,
        intialConditionsSim.population,
        typeSelection,
    ]);

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

    const valueOptionFeature = useCallback((e: string) => {
        switch (e) {
            case OptionFeature.Geographic:
                setOptionFeature(OptionFeature.Geographic);
                break;
            case OptionFeature.Graph:
                setOptionFeature(OptionFeature.Graph);
                break;
            default:
                setOptionFeature(OptionFeature.None);
                break;
        }
    }, []);

    const getModelById = (id) => {
        return parameters.find((m: DataParameters) => m.id === id)?.parameters;
    };

    const updateAllSimulationData = (body, initialConditionsValues) => {
        let getGeoId = 0;
        let getGraphId = 0;
        if (optionFeature === "Geographic") {
            getGeoId = body;
        } else if (optionFeature === "Graph") {
            getGraphId = body;
        }
        setSimulation({
            type: "update-all",
            id: idSimulation,
            payload: {
                name: nameSim,
                idSim: idSimulation,
                idModel: idModel2,
                idGeo: getGeoId,
                idGraph: getGraphId,
                t_init: format(new Date(startDate), "yyyy/MM/dd"),
                typeSelection: optionFeature,
                initialConditions: initialConditionsValues,
            },
        });
        const simulationAux = simulation;
        // eslint-disable-next-line array-callback-return
        simulation.map((e, i) => {
            if (e.idSim === idSimulation) {
                simulationAux[i] = {
                    name: nameSim,
                    idSim: idSimulation,
                    idModel: idModel2,
                    idGeo: getGeoId,
                    idGraph: getGraphId,
                    t_init: format(new Date(startDate), "yyyy/MM/dd"),
                    typeSelection: optionFeature,
                    initialConditions: initialConditionsValues,
                };
            }
        });

        localStorage.setItem("simulations", JSON.stringify(simulationAux));
        setInitialConditionsContext({
            type: RealConditions,
            real: initialConditionsValues,
        });
    };

    const postInitialConditionsByModel = (
        Compartment,
        E,
        I,
        I_acum,
        I_active,
        R,
        population,
        H,
        H_acum,
        V,
        V_acum,
        D,
        D_acum,
        Iv,
        H_cap,
        body
    ) => {
        if (Compartment === "SEIR") {
            setInitialConditions({
                type: "set",
                payload: {
                    I: I_active,
                    I_d: I,
                    I_ac: I_acum,
                    population,
                    R,
                    E,
                },
            });
            updateAllSimulationData(body, {
                I: I_active,
                I_d: I,
                I_ac: I_acum,
                population,
                R,
                E,
            });
        }
        if (Compartment === "SIR") {
            setInitialConditions({
                type: "set",
                payload: {
                    I: I_active,
                    I_d: I,
                    I_ac: I_acum,
                    population,
                    R,
                },
            });
            updateAllSimulationData(body, {
                I: I_active,
                I_d: I,
                I_ac: I_acum,
                population,
                R,
            });
        }
        if (Compartment === "SEIRHVD") {
            setInitialConditions({
                type: "set",
                payload: {
                    I: I_active,
                    I_d: I,
                    I_ac: I_acum,
                    population,
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
            });
            updateAllSimulationData(body, {
                I: I_active,
                I_d: I,
                I_ac: I_acum,
                population,
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
            if (idModel2 === 0) {
                throw new Error("Choose a model please");
            }
            const dateFormat = format(new Date(startDate), "yyyy/MM/dd");
            const configCalcInitialConditions = {
                compartments: modelType,
                timeInit: dateFormat.split("/").join("-"),
                scale,
                spatialSelection,
            };
            if (method === "POST") {
                const { result } = await postData(url, {
                    [nameSim]: configCalcInitialConditions,
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
                } = result[nameSim];

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
                    H_cap,
                    body
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

        setInitialConditions({ type: "set", payload: null });
        const simInitialConditions = simulation.find(
            (e: SimulatorParams) => e.idSim === idSimulation
        ).initialConditions;
        if (simInitialConditions) {
            setInitialConditions({
                type: "set",
                payload: simInitialConditions,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [idSimulation, simulation, idModelSelected]);

    useEffect(() => {
        const getName = getDefaultValueParameters("name");
        if (getName === "") {
            // selectSimulation(`Sim ${index + 1}`, "name");
            const x = `Sim ${index + 1}`;
            setNameSim(x);
        } else {
            setNameSim(getName);
        }
        return () => {
            setNameSim("");
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getDefaultValueParameters, index, selectSimulation]);

    useEffect(() => {
        if (typeSelection !== "") {
            setIdGeoSelection(idGeo);
            setInitialConditions({ type: "set", payload: initialConditions });
            setIdModel2(idModelSelected);
        }
    }, [idGeo, idModelSelected, initialConditions, typeSelection]);

    const editInitialConditions = () => {
        setInitialConditionsMode(true);
        const initialConditionsFromSimulation = simulation.find(
            (sim: SimulatorParams) => sim.idSim === idSimulation
        ).initialConditions;
        if (initialConditions || initialConditionsFromSimulation) {
            setInitialConditionsContext({
                type: RealConditions,
                real:
                    Object.values(initialConditions).length > 0
                        ? initialConditions
                        : initialConditionsFromSimulation,
            });
        }
    };

    const deleteFromLocalStorage = (idSim) => {
        const simulationsFilter = simulation.filter(
            (sim: SimulatorParams) => sim.idSim !== +idSim
        );
        localStorage.setItem("simulations", JSON.stringify(simulationsFilter));
    };

    const resetInitialConditions = (val) => {
        setSimulation({
            type: "update-all",
            id: idSimulation,
            payload: {
                name: nameSim,
                idSim: idSimulation,
                idModel: idModel2,
                idGeo: 0,
                idGraph: 0,
                t_init: format(new Date(startDate), "yyyy/MM/dd"),
                typeSelection: val,
                initialConditions: {
                    I: 0,
                    I_d: 0,
                    I_ac: 0,
                    population: 0,
                    R: 0,
                    E: 0,
                    H_d: 0,
                    H: 0,
                    Iv_d: 0,
                    Iv_ac: 0,
                    D_d: 0,
                    D: 0,
                    Iv: 0,
                    H_cap: 0,
                },
            },
        });
    };

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
                                setIdModel2(+e.target.value);
                                setModelType(
                                    getModelById(+e.target.value)?.name
                                );
                                setIdGeoSelection(0);
                                setIdGraph(0);
                                valueOptionFeature(OptionFeature.None);
                            }}
                            value={idModel2}
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
                            Type Area
                        </Text>
                        <RadioGroup
                            size="sm"
                            value={optionFeature}
                            onChange={(e) => {
                                valueOptionFeature(e);
                                setIdGeoSelection(0);
                                setIdGraph(0);
                                setIdSimulationUpdating({
                                    type: "set",
                                    payload: 0,
                                });
                                setInitialConditionsContext({
                                    type: RealConditions,
                                    real: {
                                        I: 0,
                                        I_d: 0,
                                        I_ac: 0,
                                        population: 0,
                                        R: 0,
                                        E: 0,
                                        H_d: 0,
                                        H: 0,
                                        Iv_d: 0,
                                        Iv_ac: 0,
                                        D_d: 0,
                                        D: 0,
                                        Iv: 0,
                                        H_cap: 0,
                                    },
                                });
                                resetInitialConditions(e);
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
                        {optionFeature !== OptionFeature.Graph && (
                            <>
                                <Text fontSize="14px" fontWeight={500}>
                                    Date
                                </Text>
                                <SelectDate
                                    nameSim={nameSim}
                                    optionFeature={optionFeature}
                                    idModel={idModel2}
                                    idSimulation={idSimulation}
                                    startDate={startDate}
                                    setStartDate={setStartDate}
                                    setIdGeo={setIdGeoSelection}
                                    setIdGraph={setIdGraph}
                                    setIdSim={setIdSimulationUpdating}
                                />
                            </>
                        )}
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
                            value={idGeoSelection || idGraph}
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
                                } else {
                                    updateAllSimulationData(+e.target.value, {
                                        I: 0,
                                        I_d: 0,
                                        I_ac: 0,
                                        population: 0,
                                        R: 0,
                                        E: 0,
                                        H_d: 0,
                                        H: 0,
                                        Iv_d: 0,
                                        Iv_ac: 0,
                                        D_d: 0,
                                        D: 0,
                                        Iv: 0,
                                        H_cap: 0,
                                    });
                                }
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
                        {runDisabled ? (
                            <Button colorScheme="blue" color="white" isDisabled>
                                Run
                            </Button>
                        ) : (
                            <RunSimulatorButton />
                        )}
                    </Center>
                </Box>
            </Flex>
            <Flex direction="column" w="65%" m="0 2%">
                <AreaSelectedBox idGeo={idGeo} typeSelection={typeSelection} />
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
                        {(optionFeature === OptionFeature.Graph ||
                            optionFeature === OptionFeature.Geographic) &&
                            (idGraph !== 0 || idGeoSelection !== 0) &&
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
                                        editInitialConditions();
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
            <Flex direction="column">
                <Icon
                    color="#16609E"
                    as={DeleteIcon}
                    cursor="pointer"
                    mb="0.3rem"
                    onClick={() => {
                        setSimulation({
                            type: "remove",
                            element: idSimulation,
                        });
                        deleteFromLocalStorage(idSimulation);
                        setAllGraphicData([]);
                        setRealDataSimulationKeys([]);
                        setDataToShowInMap([]);
                        setAllResults([].concat([], []));
                        setTabIndex(simulation.length - 2);
                    }}
                />
                <ExportModels
                    idGeo={idGraph !== 0 ? idGraph : idGeo}
                    idSim={idSimulation}
                    idModel={idModel2}
                />
            </Flex>
        </>
    );
};

export default SimulationTabPannel;
