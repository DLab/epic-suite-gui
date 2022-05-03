/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable complexity */
/* eslint-disable @typescript-eslint/dot-notation */
import { Button, Spinner, Text, useToast } from "@chakra-ui/react";
import { format, add } from "date-fns";
import { useContext, useState } from "react";

import { GraphicsData } from "context/GraphicsContext";
import { ModelsSaved } from "context/ModelsContext";
import { SelectFeature } from "context/SelectFeaturesContext";
import { SimulationSetted } from "context/SimulationContext";
import { TabIndex } from "context/TabContext";
import { DataParameters } from "types/ModelsTypes";
import { SimulatorParams } from "types/SimulationTypes";
import createIdComponent from "utils/createIdcomponent";
import postData from "utils/fetchData";

import getSEIRHVDObj from "./getSEIRHVDObj";
import getSEIRObj from "./getSEIRObj";
import getSIRObj from "./getSIRObj";

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
    const { setAllGraphicData, setAllResults, dataToShowInMap } =
        useContext(GraphicsData);
    const [isSimulating, setisSimulating] = useState(false);

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
                timeInit: format(new Date(e.t_init), "yyyy-MM-dd"),
                timeEnd: format(timeEnd, "yyyy-MM-dd"),
                scale: geoSetted?.scale,
                spatialSelection: geoSetted?.featureSelected,
            };
        });

        const geoSimulationsOnly = simulationsSelected.filter((sim) => {
            return sim.scale !== undefined;
        });

        return geoSimulationsOnly.reduce((acc, it) => {
            return {
                ...acc,
                [`${it.name}`]: it,
            };
        }, {});
    };

    const getGraphicRealData = async () => {
        const objectConfig = getObjectConfig();
        if (Object.keys(objectConfig).length > 0) {
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
        }
        return false;
    };

    const getSimulationSelectedObj = () => {
        return simulation.map((e) => {
            const { parameters: modelParameters } = parameters.find(
                (m: DataParameters) => m.id === e.idModel
            );
            const geoselectionItems =
                geoSelectionsElementsContext.find((g) => g.id === e.idGeo) ||
                {};
            const {
                scale,
                featureSelected,
            }: { scale?: string; featureSelected?: string[] } =
                (typeof geoselectionItems !== "undefined" &&
                    geoselectionItems) ||
                {};
            if (modelParameters.name === "SEIRHVD") {
                return getSEIRHVDObj(
                    e,
                    modelParameters,
                    scale,
                    featureSelected
                );
            }
            if (modelParameters.name === "SIR") {
                return getSIRObj(e, modelParameters, scale, featureSelected);
            }
            return getSEIRObj(e, modelParameters, scale, featureSelected);
        });
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
            const simulationsSelected = getSimulationSelectedObj();
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
                postData("http://192.168.2.131:5003/simulate", objConfig).then(
                    (response) => {
                        const val = Object.values(response.results);
                        const keys = Object.keys(response.results);
                        const data = val
                            .map((simString: string) => JSON.parse(simString))
                            .map((sim, i) => ({
                                name: keys[i],
                                ...sim,
                            }));
                        setAux(JSON.stringify(data));
                        getGraphicRealData();
                        setIndex(5);
                        setAllGraphicData([]);
                        setAllResults([].concat(dataToShowInMap, []));
                        setRealDataSimulationKeys([]);
                    }
                );
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
