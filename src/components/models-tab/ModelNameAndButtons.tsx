import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { Flex, Input, Button, Stack, useToast } from "@chakra-ui/react";
import React, { useContext } from "react";
import { useSelector } from "react-redux";

import { MobilityMatrix } from "context/MobilityMatrixContext";
import { NewModelSetted } from "context/NewModelsContext";
import { TabIndex } from "context/TabContext";
import { RootState } from "store/store";
import { NewModelsAllParams, NewModelsParams } from "types/SimulationTypes";

import DeleteModelAlert from "./DeleteModelAlert";
import UpdateButton from "./UpdateButton";

interface Props {
    actualModelName: string;
    setActualModelName: (value: string) => void;
    matrixId: number;
}
const ModelNameAndButtons = ({
    actualModelName,
    setActualModelName,
    matrixId,
}: Props) => {
    const {
        newModel,
        setNewModel,
        completeModel,
        setCompleteModel,
        mode: modelMode,
        setMode: setModelMode,
        idModelUpdate: id,
        setName,
        idMobility,
    } = useContext(NewModelSetted);
    const toast = useToast();
    const parameters = useSelector((state: RootState) => state.controlPanel);
    const { setIndex } = useContext(TabIndex);
    const { setMobilityMatrixList, mobilityMatrixList } =
        useContext(MobilityMatrix);

    const getModelCompleteObj = () => {
        const modelInfo = newModel.find(
            (model: NewModelsParams) => model.idNewModel === id
        );

        const newNameModel = { ...modelInfo };
        newNameModel.name = actualModelName;
        newNameModel.idMobilityMatrix = matrixId;

        const allModelInfo = {
            ...newNameModel,
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

    const saveModel = () => {
        const modelForSim = newModel.findIndex(
            (mod: NewModelsParams) => mod.idNewModel === id
        );
        const isInitialConditionsVoid = newModel[
            modelForSim
        ].initialConditions.some((init) => {
            if (
                Object.values(init.conditionsValues).every(
                    (values) => values === 0
                )
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
            setIndex(0);
            toast({
                position: "bottom-left",
                title: "Model is ready",
                description: "Model is enabled to simulate",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const getPreviusInitialConditions = () => {
        const { initialConditions } = completeModel.find(
            (model: NewModelsParams) =>
                model.idNewModel.toString() === id.toString()
        );

        setNewModel({
            type: "update-initial-conditions",
            payloadInitialConditions: initialConditions,
            id,
        });
    };

    const deleteMatrix = () => {
        localStorage.removeItem("mobilityMatrixList");
        const mobilityMatrixFiltered = mobilityMatrixList.filter(
            (matrix) => matrix.id !== +idMobility
        );
        localStorage.setItem(
            "mobilityMatrixList",
            JSON.stringify(mobilityMatrixFiltered)
        );
        setMobilityMatrixList({
            type: "remove",
            element: idMobility,
        });
    };

    return (
        <Flex p="0 2%" mt="20px">
            {modelMode !== "Initial" && (
                <Input
                    size="sm"
                    mr="2%"
                    w="350px"
                    bg="#ffffff"
                    fontSize="0.875rem"
                    placeholder="Name"
                    value={actualModelName}
                    onChange={(e) => {
                        setActualModelName(e.target.value);
                        setName(e.target.value);
                    }}
                />
            )}
            <>
                <Stack spacing={4} direction="row" align="center">
                    {modelMode === "add" && (
                        <>
                            <Button
                                leftIcon={<CheckIcon />}
                                onClick={() => {
                                    saveModel();
                                }}
                                bg="#016FB9"
                                color="#FFFFFF"
                                size="sm"
                                borderRadius="4px"
                                fontSize="0.625rem"
                            >
                                SAVE MODEL
                            </Button>
                            <Button
                                leftIcon={<CloseIcon />}
                                onClick={() => {
                                    deleteMatrix();
                                    setNewModel({
                                        type: "remove",
                                        element: id,
                                    });
                                    setModelMode("initial");
                                }}
                                bg="#B9B9C9"
                                color="#FFFFFF"
                                borderRadius="4px"
                                fontSize="0.625rem"
                                size="sm"
                            >
                                CANCEL
                            </Button>
                        </>
                    )}
                    {modelMode === "update" && (
                        <>
                            <UpdateButton
                                actualModelName={actualModelName}
                                saveModel={saveModel}
                                matrixId={matrixId}
                            />
                            <Button
                                leftIcon={<CloseIcon />}
                                bg="#B9B9C9"
                                color="#FFFFFF"
                                size="sm"
                                borderRadius="4px"
                                fontSize="0.625rem"
                                // eslint-disable-next-line sonarjs/no-identical-functions
                                onClick={() => {
                                    getPreviusInitialConditions();
                                    setModelMode("initial");
                                }}
                            >
                                CANCEL
                            </Button>
                            <DeleteModelAlert setModelMode={setModelMode} />
                        </>
                    )}
                </Stack>
            </>
        </Flex>
    );
};

export default ModelNameAndButtons;
