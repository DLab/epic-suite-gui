import { useEffect, useContext } from "react";

import MainContentTab from "../mainContent/index";
import { MobilityMatrix } from "context/MobilityMatrixContext";
import { NewModelSetted } from "context/NewModelsContext";
import { SelectFeature } from "context/SelectFeaturesContext";
import TabContext from "context/TabContext";
import { NewModelsAllParams, NewModelsParams } from "types/SimulationTypes";

const Simulator = () => {
    // set initial models, geoSelections end matrixlist from localstorage.
    const { setGeoSelections } = useContext(SelectFeature);
    const { setCompleteModel, setNewModel } = useContext(NewModelSetted);
    const { setMobilityMatrixList } = useContext(MobilityMatrix);

    useEffect(() => {
        if (typeof window !== "undefined") {
            if (window.localStorage.getItem("geoSelection")) {
                const dataLocalStorageGeo =
                    window.localStorage.getItem("geoSelection");
                setGeoSelections({
                    type: "setInitialSelection",
                    initial: JSON.parse(dataLocalStorageGeo),
                });
            }
            if (window.localStorage.getItem("newModels")) {
                const dataLocalStorageNewModels =
                    window.localStorage.getItem("newModels");
                setCompleteModel({
                    type: "setInitial",
                    localState: JSON.parse(dataLocalStorageNewModels),
                });
                const utilArray = JSON.parse(dataLocalStorageNewModels);
                const fromLocalStorageToNewModelContext = utilArray.map(
                    (elem: NewModelsAllParams): NewModelsParams => {
                        const { parameters, ...rest } = elem;
                        return { ...rest };
                    }
                ) as NewModelsParams[];
                setNewModel({
                    type: "setInitial",
                    localState:
                        fromLocalStorageToNewModelContext as unknown as NewModelsParams[],
                });
            }
            if (window.localStorage.getItem("mobilityMatrixList")) {
                const dataLocalStorageMatrix =
                    window.localStorage.getItem("mobilityMatrixList");
                setMobilityMatrixList({
                    type: "setInitial",
                    localState: JSON.parse(dataLocalStorageMatrix),
                });
            }
        }
    }, [
        setGeoSelections,
        setCompleteModel,
        setNewModel,
        setMobilityMatrixList,
    ]);

    return (
        <TabContext>
            <MainContentTab />
        </TabContext>
    );
};

export default Simulator;
