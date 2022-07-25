/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable @typescript-eslint/naming-convention */
import { useToast } from "@chakra-ui/react";
import { format } from "date-fns";
import React, { useContext, useEffect } from "react";
import DatePicker from "react-datepicker";

import { ControlPanel } from "context/ControlPanelContext";
import { NewModelSetted } from "context/NewModelsContext";
import { SelectFeature } from "context/SelectFeaturesContext";
// import { SimulationSetted } from "context/SimulationContext";
// import { ActionsIdSimulation, OptionFeature } from "types/SimulationTypes";
import "react-datepicker/dist/react-datepicker.css";
// eslint-disable-next-line import/order
import { InitialConditionsNewModel } from "types/ControlPanelTypes";
import postData from "utils/fetchData";

import { postInitialConditionsByModel } from "./initialConditionsByModel";

interface Props {
    modelName: string;
    modelValue: string;
    populationValue: string;
    // dataSourceValue: OptionFeature;
    id: number;
    idGeo: number;
    // idSimulation: number;
    startDate: Date;
    setStartDate: (value: Date) => void;
    initialConditionsGraph: InitialConditionsNewModel[];
    // setIdGeo: (value: number) => void;
    // setIdGraph: (value: number) => void;
    // setIdSim: (value: ActionsIdSimulation) => void;
}

const SelectDate = ({
    modelName,
    modelValue,
    populationValue,
    id,
    idGeo,
    startDate,
    setStartDate,
    initialConditionsGraph,
}: Props) => {
    const toast = useToast();
    // const { setInitialConditions } = useContext(ControlPanel);
    const { geoSelections } = useContext(SelectFeature);
    const { setNewModel } = useContext(NewModelSetted);

    const getAllInitialConditions = async (url, name, config) => {
        const result = await postData(url, {
            [name]: config,
        });

        const allInitialConditions = postInitialConditionsByModel(result[name]);
        return {
            name,
            conditionsValues: allInitialConditions,
        };
    };

    const handleFetch = async (url, method, body, date) => {
        try {
            // setIsLoading(true);
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
            const dateFormat = format(new Date(date), "yyyy/MM/dd");
            if (method === "POST") {
                if (populationValue === "monopopulation") {
                    // refactorizar cuando endpoint de init cond acepte modelo SIR
                    const modelCompartments =
                        modelValue !== "seirhvd" ? "seir" : "seirhvd";

                    const monoConfig = {
                        compartments: modelCompartments.toUpperCase(),
                        timeInit: dateFormat.split("/").join("-"),
                        scale,
                        spatialSelection,
                    };
                    const initialConditionsMono = await getAllInitialConditions(
                        url,
                        modelName,
                        monoConfig
                    );
                    setNewModel({
                        type: "update-initial-conditions",
                        payloadInitialConditions: [initialConditionsMono],
                        id,
                    });
                }
                if (populationValue === "metapopulation") {
                    // refactorizar cuando endpoint de init cond acepte modelo SIR
                    const modelCompartmentsMeta =
                        modelValue !== "seirhvd" ? "seir" : "seirhvd";
                    const getConfig = (index) => {
                        return {
                            compartments: modelCompartmentsMeta.toUpperCase(),
                            timeInit: dateFormat.split("/").join("-"),
                            scale,
                            spatialSelection: [spatialSelection[index]],
                        };
                    };
                    const results = await Promise.all(
                        initialConditionsGraph.map(async (node, index) => {
                            return getAllInitialConditions(
                                url,
                                node.name,
                                getConfig(index)
                            );
                        })
                    );
                    setNewModel({
                        type: "update-initial-conditions",
                        payloadInitialConditions: results,
                        id,
                    });
                }
            }
        } catch (error) {
            toast({
                position: "bottom-left",
                title: "Error",
                description: `${error.message}`,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } finally {
            // setIsLoading(false);
        }
    };

    useEffect(() => {
        if (
            idGeo !== undefined &&
            initialConditionsGraph[0].conditionsValues.population === 0
        ) {
            handleFetch(
                "http://192.168.2.131:5002/initCond",
                // "http://192.168.2.131:5001/initCond",
                "POST",
                idGeo,
                new Date(startDate)
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [idGeo, startDate]);

    return (
        <DatePicker
            dateFormat="yyyy/MM/dd"
            selected={startDate}
            onChange={(date) => {
                const selectDate = format(date, "yyyy/MM/dd");
                setStartDate(new Date(selectDate));
                setNewModel({
                    type: "update",
                    target: "t_init",
                    element: format(new Date(selectDate), "yyyy/MM/dd"),
                    id,
                });
                handleFetch(
                    // "http://192.168.2.131:5001/initCond",
                    "http://192.168.2.131:5002/initCond",
                    "POST",
                    idGeo,
                    new Date(selectDate)
                );
            }}
            // openToDate={new Date(2022, 4, 31)}
            maxDate={new Date()}
        />
    );
};
export default SelectDate;
