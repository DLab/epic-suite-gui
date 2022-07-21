/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable complexity */
/* eslint-disable @typescript-eslint/dot-notation */
import { Button, Spinner, Text, useToast } from "@chakra-ui/react";
import { format, add } from "date-fns";
import { useContext, useState } from "react";

import { GraphicsData } from "context/GraphicsContext";
// import { ModelsSaved } from "context/ModelsContext";
import { NewModelSetted } from "context/NewModelsContext";
import { SelectFeature } from "context/SelectFeaturesContext";
import { SimulationSetted } from "context/SimulationContext";
import { TabIndex } from "context/TabContext";
import { DataParameters } from "types/ModelsTypes";
import { NewModelsAllParams, SimulatorParams } from "types/SimulationTypes";
import createIdComponent from "utils/createIdcomponent";
import postData from "utils/fetchData";

import getSEIRHVDObjMono from "./getSEIRHVDObjMono";
import getSEIRObjMono from "./getSEIRObjMono";
import getSIRObjMono from "./getSIRObjMono";

const bottonLeft = "bottom-left";
type ReducedIdForPermissions = Record<number, boolean>;

interface Props {
    permission: ReducedIdForPermissions;
}
const SIMULATIONFAILED = "Simulation failed";
const RunButton = ({ permission }: Props) => {
    // const { simulation: simSetted } = useContext(SimulationSetted);
    const { geoSelections } = useContext(SelectFeature);

    // Real Data Context
    const { setRealDataSimulationKeys } = useContext(GraphicsData);
    //
    const toast = useToast();
    const { setAux, setIndex } = useContext(TabIndex);
    const { setAllGraphicData, setAllResults, setDataToShowInMap } =
        useContext(GraphicsData);
    const [isSimulating, setisSimulating] = useState(false);
    const { completeModel, setSelectedModelsToSimulate } =
        useContext(NewModelSetted);

    const getObjectConfig = (selectedModels) => {
        const simulationsSelected = selectedModels.map((e, i) => {
            const geoSetted = geoSelections.find((geo) => geo.id === e.idGeo);
            const timeEnd = add(new Date(e.t_init), {
                days: e.parameters.t_end,
            });
            return {
                name: e.name,
                compartments: e.parameters.name,
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

    const getGraphicRealData = async (selectedModels) => {
        const objectConfig = getObjectConfig(selectedModels);
        try {
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
        } catch (error) {
            return toast({
                position: "bottom-left",
                title: "Error",
                description: `${error.message}`,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const getSimulationSelectedObj = (simulations) => {
        return simulations.map((e) => {
            const geoselectionItems =
                geoSelections.find((g) => g.id === e.idGeo) || {};
            const {
                scale,
                featureSelected,
            }: { scale?: string; featureSelected?: string[] } =
                (typeof geoselectionItems !== "undefined" &&
                    geoselectionItems) ||
                {};
            if (e.modelType === "seirhvd") {
                return getSEIRHVDObjMono(
                    e,
                    e.parameters,
                    scale,
                    featureSelected
                );
            }
            if (e.modelType === "sir") {
                return getSIRObjMono(e, e.parameters, scale, featureSelected);
            }
            return getSEIRObjMono(e, e.parameters, scale, featureSelected);
        });
    };

    const getSelectedModel = () => {
        let selectedModels = [];
        completeModel.map((model) => {
            if (permission[model.idNewModel]) {
                selectedModels = [...selectedModels, model];
                return selectedModels;
            }
            return false;
        });
        return selectedModels;
    };

    const setMonopopulationData = (response, selectedModels) => {
        const val = Object.values(response.results);
        const keys = Object.keys(response.results);
        const data = val
            .map((simString: string) => JSON.parse(simString))
            .map((sim, i) => ({
                name: keys[i],
                ...sim,
            }));
        setAllGraphicData([]);
        setAllResults([]);
        setDataToShowInMap([]);
        // setAllResults([].concat(dataToShowInMap, []));
        setRealDataSimulationKeys([]);
        setAux(JSON.stringify(data));
        setSelectedModelsToSimulate(selectedModels);
        getGraphicRealData(selectedModels);
        setIndex(5);
    };

    // eslint-disable-next-line sonarjs/cognitive-complexity
    const handleJsonToToml = async () => {
        setisSimulating(true);
        try {
            if (completeModel.length < 1) {
                throw new Error("You must add a simulation at least");
            }
            const selectedModels = getSelectedModel();
            // build object simulation template for toml
            const simulationsSelected =
                getSimulationSelectedObj(selectedModels);

            const objConfig = simulationsSelected.reduce((acc, it, i) => {
                const simName = completeModel.find(
                    (sim: NewModelsAllParams) => {
                        return sim.idNewModel === it.idSim;
                    }
                );
                return {
                    ...acc,
                    [`${simName.name}`]: it,
                };
            }, {});
            if (simulationsSelected.length > 0) {
                const { populationType } = completeModel.find(
                    (sim: NewModelsAllParams) => {
                        return sim.idNewModel === simulationsSelected[0].idSim;
                    }
                );
                let response;
                if (populationType === "metapopulation") {
                    response = await fetch(`/api/simulator`, {
                        method: "GET",
                    });
                    const jsonResponse = await response.json();
                    const listResponse = Object.keys(jsonResponse).map(
                        (key) => {
                            return { name: key, ...jsonResponse[key] };
                        }
                    );
                    setAllGraphicData([]);
                    setAllResults([]);
                    setDataToShowInMap([]);
                    // setAllResults([].concat(dataToShowInMap, []));
                    setRealDataSimulationKeys([]);
                    setAux(JSON.stringify(listResponse));
                    setSelectedModelsToSimulate(selectedModels);
                    getGraphicRealData(selectedModels);
                    setIndex(5);
                } else {
                    response = await postData(
                        "http://192.168.2.131:5003/simulate",
                        objConfig
                    );
                    setMonopopulationData(response, selectedModels);
                }
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
                    title: SIMULATIONFAILED,
                    description: "Parameters are invalid. Check your models!",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                toast({
                    position: bottonLeft,
                    title: SIMULATIONFAILED,
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
                onClick={() => {
                    const withPermission = Object.values(permission).some(
                        (perm) => perm
                    );
                    if (withPermission) {
                        handleJsonToToml();
                    } else {
                        toast({
                            position: bottonLeft,
                            title: SIMULATIONFAILED,
                            description: `You must select at least one model`,
                            status: "error",
                            duration: 3000,
                            isClosable: true,
                        });
                    }
                }}
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

export default RunButton;
