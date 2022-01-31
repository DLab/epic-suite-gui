import { Button, Spinner, Text, useToast } from "@chakra-ui/react";
import add from "date-fns/add";
import { useContext, useState, useEffect } from "react";

import { GraphicsData } from "context/GraphicsContext";
import { ModelsSaved } from "context/ModelsContext";
import { SelectFeature } from "context/SelectFeaturesContext";
import { SimulationSetted } from "context/SimulationContext";
import { TabIndex } from "context/TabContext";
import { DataParameters } from "types/ModelsTypes";
import { SimulatorParams } from "types/SimulationTypes";
import createIdComponent from "utils/createIdcomponent";
import { postData } from "utils/fetchData";

const bottonLeft = "bottom-left";

const RunSimulatorButton = () => {
    const { simulation: simSetted } = useContext(SimulationSetted);
    const { geoSelections } = useContext(SelectFeature);

    // Real Data Context
    const { setRealDataSimulationKeys } = useContext(GraphicsData);
    //
    const toast = useToast();
    const { setAux, setIndex } = useContext(TabIndex);
    const { simulation } = useContext(SimulationSetted);
    const { parameters } = useContext(ModelsSaved);
    const { geoSelections: geoSelectionsElementsContext } =
        useContext(SelectFeature);
    const { setAllGraphicData } = useContext(GraphicsData);
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
            const dataLocalStorageGeo =
                window.localStorage.getItem("geoSelection");
            setGeoSelection(JSON.parse(dataLocalStorageGeo));
        }
    }, [parameters, geoSelectionsElementsContext]);

    const verifyNotEmptySimulations = (sim: SimulatorParams[] | []) => {
        return sim.every(
            (e: SimulatorParams) =>
                (e.idGeo !== 0 || e.idGraph !== 0) && e.idModel !== 0
        );
    };

    const getObjectConfig = () => {
        const simulationsSelected = simSetted.map((e, i) => {
            const { parameters: modelParameters } = parameters.find(
                (m: DataParameters) => m.id === e.idModel
            );
            const geoSetted = geoSelections.find((geo) => geo.id === e.idGeo);
            const timeEnd = add(new Date(e.t_init), {
                days: modelParameters.t_end,
            });
            return {
                name: e.name,
                compartments: modelParameters.name,
                timeInit: e.t_init,
                timeEnd,
                scale: geoSetted.scale,
                spatialSelection: geoSetted.featureSelected,
            };
        });

        return simulationsSelected.reduce((acc, it) => {
            return {
                ...acc,
                [`${it.name}`]: it,
            };
        }, {});
    };

    const getGraphicRealData = async () => {
        const objectConfig = getObjectConfig();
        const res = await postData(
            "http://192.168.2.131:5001/realData",
            objectConfig
        );
        const val = Object.values(res.result);
        const keys = Object.keys(res.result);
        const realDataKeys = val
            .map((simString: string) => simString)
            .map((sim, i) => ({
                name: keys[i],
                // eslint-disable-next-line @typescript-eslint/ban-types
                ...(sim as {}),
            }));

        return setRealDataSimulationKeys(realDataKeys);
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
                    (typeof geoselectionItems !== "undefined" &&
                        geoselectionItems) ||
                    {};
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
                            alpha: 1,
                            beta: 0.3,
                            rR_S: 0,
                            tE_I: 4,
                            tI_R: 7,
                            // beta: modelParameters.beta,
                            // alpha: modelParameters.alpha,
                            // tE_I: modelParameters.tE_I,
                            // tI_R: modelParameters.tI_R,
                            // rR_S: modelParameters.rR_S,
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
                const simName = simulation.find((sim: SimulatorParams) => {
                    return sim.idSim === it.idSim;
                });
                return {
                    ...acc,
                    [`${simName.name}`]: it,
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
                getGraphicRealData();
                setIndex(4);
                setAllGraphicData([]);
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
            if (error.response?.status === 400) {
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
                id={createIdComponent()}
                onClick={() => handleJsonToToml()}
                colorScheme="blue"
                color="white"
            >
                {isSimulating ? (
                    <>
                        <Spinner
                            id={createIdComponent()}
                            thickness="4px"
                            speed="0.65s"
                            emptyColor="gray.200"
                            color="blue.500"
                        />
                        <Text id={createIdComponent()} pl="1rem">
                            Simulating...
                        </Text>
                    </>
                ) : (
                    `Run`
                )}
            </Button>
        </>
    );
};

export default RunSimulatorButton;
