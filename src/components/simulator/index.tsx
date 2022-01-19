import { useEffect, useContext } from "react";

import MainContentTab from "../mainContent/index";
import { ModelsSaved } from "context/ModelsContext";
import { SelectFeature } from "context/SelectFeaturesContext";
import TabContext from "context/TabContext";

const Simulator = () => {
    // set initial models and geoSelections from localstorage.
    const { setParameters, setInitialParameters } = useContext(ModelsSaved);
    const { setGeoSelections } = useContext(SelectFeature);
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
    }, [setGeoSelections, setParameters, setInitialParameters]);

    return (
        <TabContext>
            <MainContentTab />
        </TabContext>
    );
};

export default Simulator;
