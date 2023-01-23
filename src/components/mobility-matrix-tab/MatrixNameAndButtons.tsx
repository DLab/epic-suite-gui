import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { Button, Flex, Input, Stack, useToast } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";

import { MobilityMatrix } from "../../context/MobilityMatrixContext";
import { NewModelSetted } from "context/NewModelsContext";
import { TabIndex } from "context/TabContext";
import { InterventionsTypes, MobilityModes } from "types/MobilityMatrixTypes";
import { NewModelsParams } from "types/SimulationTypes";

import DeleteMatrixAlert from "./DeleteMatrixAlert";
import UpdateMatrixButton from "./UpdateMatrixButton";

interface Props {
    nodesLocalValue: number | undefined;
    graphTypeLocal: string;
    popPercentage: number;
    isDynamical: boolean;
    modulationLocalValue: string;
    daysCicleLocalValue: number;
    interventionList: InterventionsTypes[];
    matrixNameLocal: string;
    setMatrixNameLocal: (value: string) => void;
}

const MatrixNameAndButtons = ({
    nodesLocalValue,
    graphTypeLocal,
    popPercentage,
    isDynamical,
    modulationLocalValue,
    daysCicleLocalValue,
    interventionList,
    matrixNameLocal,
    setMatrixNameLocal,
}: Props) => {
    const toast = useToast();
    const {
        setMobilityMatrixList,
        idMatrixModel,
        setIdMatrixModel,
        setMatrixMode,
        matrixMode,
        idMobilityMatrixUpdate,
        setIdMobilityMatrixUpdate,
        mobilityMatrixList,
        originOfMatrixCreation,
    } = useContext(MobilityMatrix);
    const { newModel } = useContext(NewModelSetted);
    const { setIndex } = useContext(TabIndex);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const position = "bottom-left";
    const saveMobilityMatrix = () => {
        try {
            const localStorageExist =
                window.localStorage.getItem("mobilityMatrixList");
            if (!localStorageExist) {
                window.localStorage.setItem(
                    "mobilityMatrixList",
                    JSON.stringify([])
                );
            }

            const { idGeo, typeSelection } = newModel.find(
                (model: NewModelsParams) => {
                    return model.idNewModel === idMatrixModel;
                }
            );

            const dataMatrix = {
                id: Date.now(),
                populationData: typeSelection,
                geoId: +idGeo,
                modelId: idMatrixModel,
                nodes: nodesLocalValue,
                populationPercentage: popPercentage,
                graphTypes: graphTypeLocal,
                dynamical: isDynamical,
                cicleDays: daysCicleLocalValue,
                modulationOption: modulationLocalValue,
                interventions: interventionList,
                nameMobilityMatrix: matrixNameLocal,
            };

            const dataMatrixCreated = JSON.parse(
                localStorage.getItem("mobilityMatrixList")
            );

            if (matrixMode === MobilityModes.Update) {
                const updateDataMatrix = {
                    id: idMobilityMatrixUpdate,
                    populationData: typeSelection,
                    geoId: +idGeo,
                    modelId: idMatrixModel,
                    nodes: nodesLocalValue,
                    populationPercentage: popPercentage,
                    graphTypes: graphTypeLocal,
                    dynamical: isDynamical,
                    cicleDays: daysCicleLocalValue,
                    modulationOption: modulationLocalValue,
                    interventions: interventionList,
                    nameMobilityMatrix: matrixNameLocal,
                };

                const indexDataToUpdate = mobilityMatrixList.findIndex(
                    (e: { id: number }) => e.id === idMobilityMatrixUpdate
                );
                dataMatrixCreated[indexDataToUpdate] = updateDataMatrix;
                localStorage.setItem(
                    "mobilityMatrixList",
                    JSON.stringify(dataMatrixCreated)
                );
                setMobilityMatrixList({
                    type: "update-all",
                    id: idMobilityMatrixUpdate,
                    payload: updateDataMatrix,
                });
                setIdMobilityMatrixUpdate(0);
                toast({
                    position,
                    title: "Matrix Edited",
                    description:
                        "Your mobility matrix was updated successfully",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                });
                setMatrixMode(MobilityModes.Initial);
                if (originOfMatrixCreation === "modelsTab") {
                    setIndex(1);
                } else {
                    setIndex(0);
                }
            } else {
                localStorage.setItem(
                    "mobilityMatrixList",
                    JSON.stringify([...dataMatrixCreated, dataMatrix])
                );

                setMobilityMatrixList({
                    type: "add",
                    payload: dataMatrix,
                });
                toast({
                    position,
                    title: "Mobility Matrix Created",
                    description:
                        "Your mobility matrix was created successfully",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                });
                setMatrixMode(MobilityModes.Initial);
                if (originOfMatrixCreation === "modelsTab") {
                    setIndex(1);
                } else {
                    setIndex(0);
                }
            }
        } catch (error) {
            toast({
                position,
                title: "Error",
                description: "Something failed. Try again later!",
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        }
    };

    const handleCancel = () => {
        setMatrixMode(MobilityModes.Initial);
        setIdMobilityMatrixUpdate(0);
        setIdMatrixModel(0);
    };

    useEffect(() => {
        if (
            !nodesLocalValue ||
            graphTypeLocal === "" ||
            modulationLocalValue === "" ||
            matrixNameLocal === ""
        ) {
            setIsButtonDisabled(true);
        } else {
            setIsButtonDisabled(false);
        }
    }, [
        graphTypeLocal,
        matrixNameLocal,
        modulationLocalValue,
        nodesLocalValue,
    ]);

    return (
        <Flex w="100%" p="0 2%" mt="20px">
            <Input
                size="sm"
                mr="2%"
                w="350px"
                bg="#ffffff"
                fontSize="14px"
                placeholder="Name"
                value={matrixNameLocal}
                onChange={(e) => {
                    setMatrixNameLocal(e.target.value);
                }}
            />
            <Stack spacing={4} direction="row" align="center">
                {matrixMode === MobilityModes.Add && (
                    <>
                        <Button
                            size="sm"
                            fontSize="10px"
                            bg="#016FB9"
                            color="#FFFFFF"
                            leftIcon={<CheckIcon />}
                            onClick={() => saveMobilityMatrix()}
                            isDisabled={isButtonDisabled}
                        >
                            SAVE MATRIX
                        </Button>
                        <Button
                            leftIcon={<CloseIcon />}
                            onClick={() => {
                                handleCancel();
                            }}
                            bg="#B9B9C9"
                            color="#FFFFFF"
                            borderRadius="4px"
                            fontSize="10px"
                            size="sm"
                        >
                            CANCEL
                        </Button>
                    </>
                )}
                {matrixMode === MobilityModes.Update && (
                    <>
                        <UpdateMatrixButton
                            nodesLocalValue={nodesLocalValue}
                            graphTypeLocal={graphTypeLocal}
                            popPercentage={popPercentage}
                            isDynamical={isDynamical}
                            modulationLocalValue={modulationLocalValue}
                            daysCicleLocalValue={daysCicleLocalValue}
                            interventionList={interventionList}
                            matrixNameLocal={matrixNameLocal}
                            saveMobilityMatrix={saveMobilityMatrix}
                        />
                        <Button
                            leftIcon={<CloseIcon />}
                            onClick={() => {
                                handleCancel();
                            }}
                            bg="#B9B9C9"
                            color="#FFFFFF"
                            borderRadius="4px"
                            fontSize="10px"
                            size="sm"
                        >
                            CANCEL
                        </Button>
                        <DeleteMatrixAlert />
                    </>
                )}
            </Stack>
        </Flex>
    );
};

export default MatrixNameAndButtons;
