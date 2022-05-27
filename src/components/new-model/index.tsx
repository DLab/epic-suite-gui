import { AddIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import { format } from "date-fns";
import React, { useContext } from "react";

import { NewModelSetted } from "context/NewModelsContext";

import ModelMainTab from "./ModelMainTab";

const NewModel = () => {
    const { newModel, setNewModel } = useContext(NewModelSetted);
    return (
        <>
            <IconButton
                bg="#16609E"
                color="#FFFFFF"
                aria-label="Call Segun"
                size="sm"
                cursor="pointer"
                _hover={{ bg: "blue.500" }}
                icon={<AddIcon />}
                onClick={() =>
                    setNewModel({
                        type: "add",
                        payload: {
                            idNewModel: Date.now(),
                            name: "",
                            modelType: undefined,
                            populationType: undefined,
                            typeSelection: undefined,
                            idGeo: undefined,
                            idGraph: undefined,
                            numberNodes: undefined,
                            t_init: format(
                                new Date(2021, 11, 31),
                                "yyyy/MM/dd"
                            ),
                            initialConditions: [],
                        },
                    })
                }
            />
            {newModel.map((model) => {
                return (
                    <ModelMainTab
                        id={model.idNewModel}
                        initialConditions={model.initialConditions}
                    />
                );
            })}
        </>
    );
};

export default NewModel;
