/* eslint-disable @typescript-eslint/dot-notation */
import { Button, Spinner, Text, useToast } from "@chakra-ui/react";
import { useContext, useState } from "react";

import { GraphicsData } from "context/GraphicsContext";
import { ModelsSaved } from "context/ModelsContext";
import { SelectFeature } from "context/SelectFeaturesContext";
import { SimulationSetted } from "context/SimulationContext";
import { TabIndex } from "context/TabContext";
import { DataParameters } from "types/ModelsTypes";
import { DataGeoSelections } from "types/SelectFeaturesTypes";
import { SimulatorParams } from "types/SimulationTypes";
import VariableDependentTime, {
    NameFunction,
    Sine,
    Square,
    StaticValue,
    Transition,
} from "types/VariableDependentTime";
import createIdComponent from "utils/createIdcomponent";
import { postData } from "utils/fetchData";

const bottonLeft = "bottom-left";

const RunSimulatorButton = () => {
    const toast = useToast();
    const { setAux, setIndex } = useContext(TabIndex);
    const { simulation } = useContext(SimulationSetted);
    const { parameters } = useContext(ModelsSaved);
    const { geoSelections: geoSelectionsElementsContext } =
        useContext(SelectFeature);
    const { setAllGraphicData } = useContext(GraphicsData);
    const [isSimulating, setisSimulating] = useState(false);
    const createObjectVariableDependent = (params: VariableDependentTime) => {
        const variableDependent = {
            function: "events",
            values: [],
            days: [],
            default: params.default,
        };
        params.type.forEach(
            (p: Sine | Square | Transition | StaticValue, i) => {
                variableDependent.days.push(params.rangeDays[i]);
                switch (p.name) {
                    case NameFunction.sinusoidal:
                        variableDependent.values.push({
                            function: "sine",
                            min_val: p.min,
                            max_val: p.max,
                            period: p["period"],
                            initphase: p["initPhase"],
                        });
                        break;
                    case NameFunction.square:
                        variableDependent.values.push({
                            function: "square",
                            min_val: p.min,
                            max_val: p.max,
                            period: p["period"],
                            initphase: p["initPhase"],
                            duty: p["duty"],
                            t_init: params.rangeDays[i][0],
                            t_end: params.rangeDays[i][1],
                        });
                        break;
                    default:
                        variableDependent.values.push(p["value"]);
                        break;
                }
            }
        );
        return variableDependent;
    };
    const verifyNotEmptySimulations = (sim: SimulatorParams[] | []) => {
        return sim.every(
            (e: SimulatorParams) =>
                (e.idGeo !== 0 || e.idGraph !== 0) && e.idModel !== 0
        );
    };

    // eslint-disable-next-line sonarjs/cognitive-complexity
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
                const { parameters: modelParameters } = parameters.find(
                    (m: DataParameters) => m.id === e.idModel
                );
                const geoselectionItems =
                    geoSelectionsElementsContext.find(
                        (g) => g.id === e.idGeo
                    ) || {};
                const {
                    scale,
                    featureSelected,
                }: { scale?: string; featureSelected?: string[] } =
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
                            beta: !modelParameters.beta.isEnabled
                                ? modelParameters.beta.val
                                : createObjectVariableDependent(
                                      modelParameters.beta
                                  ),
                            alpha: !modelParameters.alpha.isEnabled
                                ? modelParameters.alpha.val
                                : createObjectVariableDependent(
                                      modelParameters.alpha
                                  ),
                            tE_I: !modelParameters.tE_I.isEnabled
                                ? modelParameters.tE_I.val
                                : createObjectVariableDependent(
                                      modelParameters.tE_I
                                  ),
                            tI_R: !modelParameters.tI_R.isEnabled
                                ? modelParameters.tI_R.val
                                : createObjectVariableDependent(
                                      modelParameters.tI_R
                                  ),
                            rR_S: !modelParameters.rR_S.isEnabled
                                ? modelParameters.rR_S.val
                                : createObjectVariableDependent(
                                      modelParameters.rR_S
                                  ),
                        },
                    },
                    initialconditions: {
                        I: +e.initialConditions.I,
                        I_d: +e.initialConditions.I_d,
                        I_ac: +e.initialConditions.I_ac,
                        population: +e.initialConditions.S,
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
