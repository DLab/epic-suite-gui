import { Flex, Button, Icon } from "@chakra-ui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";
import React, { useState, useContext, useEffect } from "react";

import BreadCrumb from "components/BreadCrumb";
import { NewModelSetted } from "context/NewModelsContext";
import { NewModelsParams } from "types/SimulationTypes";

import ModelMainTab from "./ModelMainTab";
import ModelNameAndButtons from "./ModelNameAndButtons";
import ModelsSavedSelect from "./ModelsSavedSelect";

const ModelTab = () => {
    const { newModel, setNewModel } = useContext(NewModelSetted);
    const [modelId, setModelId] = useState(undefined);
    const [secondModelLink, setSecondModelLink] = useState(undefined);
    // const [initialConditionsModel, setInitialConditionsModel] = useState([]);
    const [modelMode, setModelMode] = useState("initial");
    const [actualModelName, setActualModelName] = useState("");

    useEffect(() => {
        if (modelMode === "initial") {
            setActualModelName("");
        }
        // if (modelMode === Model.Update) {
        //     const { name } = geoSelections.find(
        //         (selection) =>
        //             selection.id.toString() === idGeoSelectionUpdate.toString()
        //     );
        //     setActualModelName(name);
        // }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modelMode]);

    const addNewModel = () => {
        const id = Date.now();
        setModelId(id);
        setNewModel({
            type: "add",
            payload: {
                idNewModel: id,
                name: "",
                modelType: undefined,
                populationType: undefined,
                typeSelection: undefined,
                idGeo: undefined,
                idGraph: undefined,
                numberNodes: undefined,
                t_init: format(new Date(2022, 4, 31), "yyyy/MM/dd"),
                initialConditions: [],
            },
        });
        setModelMode("add");
    };

    return (
        <Flex direction="column">
            <BreadCrumb
                firstLink="Models"
                secondLink={secondModelLink}
                setSecondLink={setSecondModelLink}
                modelMode={modelMode}
                setModelMode={setModelMode}
            />
            {modelMode === "initial" && (
                <Flex w="40%" mt="15px">
                    <ModelsSavedSelect />
                    <Button
                        size="sm"
                        fontSize="10px"
                        bg="#016FB9"
                        color="#FFFFFF"
                        onClick={() => {
                            addNewModel();
                            // setSecondLink("New");
                            // setMode(Model.Add);
                        }}
                    >
                        <Icon w="14px" h="14px" as={PlusIcon} mr="5px" />
                        ADD NEW
                    </Button>
                </Flex>
            )}
            {modelMode === "add" && newModel.length > 0 && (
                <>
                    {newModel.map((model) => {
                        if (model.idNewModel === modelId) {
                            return (
                                <>
                                    <ModelNameAndButtons
                                        actualModelName={actualModelName}
                                        setActualModelName={setActualModelName}
                                        id={modelId}
                                        setModelMode={setModelMode}
                                    />
                                    <ModelMainTab
                                        key={model.idNewModel}
                                        id={modelId}
                                        initialConditions={
                                            model.initialConditions
                                        }
                                        actualModelName={actualModelName}
                                        setActualModelName={setActualModelName}
                                    />
                                </>
                            );
                        }
                        return false;
                    })}
                </>
            )}
        </Flex>
    );
};

export default ModelTab;

// <Flex direction="column">
//     <ModelMainTab
//         id={modelId}
//         initialConditions={initialConditionsModel}
//         setInitialConditionsModel={setInitialConditionsModel}
//     />
// </Flex>
