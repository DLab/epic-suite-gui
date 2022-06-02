import { useEffect, useContext } from "react";

import MainContentTab from "../mainContent/index";
import { ModelsSaved } from "context/ModelsContext";
import { NewModelSetted } from "context/NewModelsContext";
import { SelectFeature } from "context/SelectFeaturesContext";
import { SimulationSetted } from "context/SimulationContext";
import TabContext from "context/TabContext";

const Simulator = () => {
    // set initial models and geoSelections from localstorage.
    const { setParameters, setInitialParameters } = useContext(ModelsSaved);
    const { setGeoSelections } = useContext(SelectFeature);
    const { setSimulation } = useContext(SimulationSetted);
    const { setCompleteModel, setNewModel } = useContext(NewModelSetted);
    useEffect(() => {
        if (
            typeof window !== "undefined" &&
            window.localStorage.getItem("models")
        ) {
            const dataLocalStorageModel = window.localStorage.getItem("models");
            setParameters({
                type: "set",
                initial: JSON.parse(dataLocalStorageModel),
            });
            setInitialParameters({
                type: "reset",
                initial: JSON.parse(dataLocalStorageModel),
            });
        }
        if (
            typeof window !== "undefined" &&
            window.localStorage.getItem("geoSelection")
        ) {
            const dataLocalStorageGeo =
                window.localStorage.getItem("geoSelection");
            setGeoSelections({
                type: "setInitialSelection",
                initial: JSON.parse(dataLocalStorageGeo),
            });
        }
        if (
            typeof window !== "undefined" &&
            window.localStorage.getItem("simulations")
        ) {
            const dataLocalStorageSimulation =
                window.localStorage.getItem("simulations");
            setSimulation({
                type: "setInitial",
                localState: JSON.parse(dataLocalStorageSimulation),
            });
        }
        if (
            typeof window !== "undefined" &&
            window.localStorage.getItem("newModels")
        ) {
            const dataLocalStorageNewModels =
                window.localStorage.getItem("newModels");
            setCompleteModel({
                type: "setInitial",
                localState: JSON.parse(dataLocalStorageNewModels),
            });
            setNewModel({
                type: "setInitial",
                localState: JSON.parse(dataLocalStorageNewModels),
            });
        }
    }, [
        setGeoSelections,
        setParameters,
        setInitialParameters,
        setSimulation,
        setCompleteModel,
        setNewModel,
    ]);

    return (
        <TabContext>
            <MainContentTab />
        </TabContext>
    );
};

export default Simulator;
