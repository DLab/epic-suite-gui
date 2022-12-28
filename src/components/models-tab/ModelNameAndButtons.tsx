import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { Flex, Input, Box, Button, Stack, useToast } from "@chakra-ui/react";
import React, { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";

import { NewModelSetted } from "context/NewModelsContext";
import { RootState } from "store/store";
import { NewModelsAllParams, NewModelsParams } from "types/SimulationTypes";

// import GeoToastMessage1 from "./selectorMap/GeoToastMessage1";

interface Props {
    // extentionOption: string;
    // setExtentionOption: (value: string) => void;
    id: number;
    actualModelName: string;
    setActualModelName: (value: string) => void;
    setModelMode: (value: string) => void;
}
const ModelNameAndButtons = ({
    id,
    actualModelName,
    setActualModelName,
    setModelMode,
}: Props) => {
    const { newModel, setNewModel, completeModel, setCompleteModel } =
        useContext(NewModelSetted);
    const toast = useToast();
    const parameters = useSelector((state: RootState) => state.controlPanel);

    const getModelCompleteObj = () => {
        const modelInfo = newModel.find(
            (model: NewModelsParams) => model.idNewModel === id
        );
        const allModelInfo = {
            ...modelInfo,
            parameters,
        };
        const modelExist = completeModel.find(
            (model: NewModelsAllParams) => +model.idNewModel === id
        );
        if (modelExist !== undefined) {
            setCompleteModel({
                type: "update-all",
                id,
                payload: allModelInfo,
            });
            const modelsAux = [...completeModel].map(
                (e: NewModelsAllParams, i) => {
                    if (e.idNewModel === id) {
                        return allModelInfo;
                    }
                    return e;
                }
            );
            localStorage.setItem("newModels", JSON.stringify(modelsAux));
        } else {
            setCompleteModel({
                type: "add",
                payload: allModelInfo,
            });

            localStorage.setItem(
                "newModels",
                JSON.stringify([...completeModel, allModelInfo])
            );
        }
    };

    return (
        <Flex p="0 2%" mt="20px">
            {/* {mode !== "Initial" && ( */}
            <>
                <Input
                    size="sm"
                    mr="2%"
                    w="350px"
                    bg="#ffffff"
                    fontSize="14px"
                    placeholder="Name"
                    value={actualModelName}
                    onChange={(e) => {
                        setActualModelName(e.target.value);
                    }}
                    onBlur={(e) => {
                        setNewModel({
                            type: "update",
                            target: "name",
                            element: e.target.value,
                            id,
                        });
                    }}
                />
                <Stack spacing={4} direction="row" align="center">
                    {/* {mode === Model.Add && ( */}
                    <>
                        <Button
                            leftIcon={<CheckIcon />}
                            onClick={() => {
                                const modelForSim = newModel.findIndex(
                                    (mod: NewModelsParams) =>
                                        mod.idNewModel === id
                                );
                                const isInitialConditionsVoid = newModel[
                                    modelForSim
                                ].initialConditions.some((init) => {
                                    if (
                                        Object.values(
                                            init.conditionsValues
                                        ).every((values) => values === 0)
                                    ) {
                                        return true;
                                    }
                                    return false;
                                });
                                if (isInitialConditionsVoid) {
                                    toast({
                                        position: "bottom-left",
                                        title: "Updated failed",
                                        description:
                                            "There is one or more nodes with all initial conditions values as zero ",
                                        status: "error",
                                        duration: 3000,
                                        isClosable: true,
                                    });
                                } else {
                                    getModelCompleteObj();
                                    setModelMode("initial");
                                    toast({
                                        position: "bottom-left",
                                        title: "Model is ready",
                                        description:
                                            "Model is enabled to simulate",
                                        status: "success",
                                        duration: 3000,
                                        isClosable: true,
                                    });
                                }
                            }}
                            //  verifyGeoselection()
                            bg="#016FB9"
                            color="#FFFFFF"
                            size="sm"
                            // mt="20px"
                            borderRadius="4px"
                            fontSize="10px"
                        >
                            SAVE MODEL
                        </Button>
                        <Button
                            leftIcon={<CloseIcon />}
                            onClick={() => {
                                setNewModel({
                                    type: "remove",
                                    element: id,
                                });
                                setModelMode("initial");
                                // setMode(Model.Initial);
                                // setIdGeoSelectionUpdate(0);
                            }}
                            bg="#B9B9C9"
                            color="#FFFFFF"
                            size="sm"
                            // mt="20px"
                            borderRadius="4px"
                            fontSize="10px"
                        >
                            CANCEL
                        </Button>
                    </>

                    {/* {mode === Model.Update && (
                            <>
                                <Button
                                    leftIcon={<CheckIcon />}
                                    onClick={() => verifyGeoselection()}
                                    isDisabled={disabledButton}
                                    bg="#016FB9"
                                    color="#FFFFFF"
                                    size="sm"
                                    // mt="20px"
                                    borderRadius="4px"
                                    fontSize="10px"
                                >
                                    SAVE CHANGUES
                                </Button>
                                <Button
                                    leftIcon={<CloseIcon />}
                                    bg="#B9B9C9"
                                    color="#FFFFFF"
                                    size="sm"
                                    borderRadius="4px"
                                    fontSize="10px"
                                    // eslint-disable-next-line sonarjs/no-identical-functions
                                    onClick={() => {
                                        setScale("National");
                                        setMode(Model.Initial);
                                        setIdGeoSelectionUpdate(0);
                                    }}
                                >
                                    CANCEL
                                </Button>
                            </>
                        )} */}
                </Stack>

                {/* <Box textAlign="center">
                        <GeoToastMessage1
                            scale={extentionOption}
                            setScale={setExtentionOption}
                            actualModelName={actualModelName}
                        />
                    </Box> */}
            </>
        </Flex>
    );
};

export default ModelNameAndButtons;
