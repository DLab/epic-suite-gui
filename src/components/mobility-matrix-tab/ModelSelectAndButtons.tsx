import { Button, Flex, Icon, Select, Stack } from "@chakra-ui/react";
import { TrashIcon } from "@heroicons/react/24/outline";
import React, { useContext } from "react";

import { MobilityMatrix } from "../../context/MobilityMatrixContext";
import { NewModelSetted } from "context/NewModelsContext";
import { SelectFeature } from "context/SelectFeaturesContext";
import { NewModelsAllParams } from "types/SimulationTypes";

import ModelsMobilityMatrixSelect from "./ModelsMobilityMatrixSelect";

interface Props {
    nodesLocalValue: number | undefined;
    setNodesLocalValue: (value: number | undefined) => void;
    graphTypeLocal: string;
    setGraphTypeLocal;
    popPercentage: number;
    setPopPercentage: (value: number) => void;
    isDynamical: boolean;
    setIsDynamical: (value: boolean) => void;
    modulationLocalValue: string;
    setModulationLocalValue: (value: string) => void;
    daysCicleLocalValue: number;
    setDaysCicleLocalValue: (value: number) => void;
}

const ModelSelectAndButtons = ({
    nodesLocalValue,
    setNodesLocalValue,
    graphTypeLocal,
    setGraphTypeLocal,
    popPercentage,
    setPopPercentage,
    isDynamical,
    setIsDynamical,
    modulationLocalValue,
    setModulationLocalValue,
    daysCicleLocalValue,
    setDaysCicleLocalValue,
}: Props) => {
    const { geoSelections } = useContext(SelectFeature);
    const { setMobilityMatrixList, idMatrixModel } = useContext(MobilityMatrix);
    const { completeModel } = useContext(NewModelSetted);

    const saveMobilityMatrix = () => {
        const localStorageExist =
            window.localStorage.getItem("mobilityMatrixList");
        if (!localStorageExist) {
            window.localStorage.setItem(
                "mobilityMatrixList",
                JSON.stringify([])
            );
        }
        const { idGeo, typeSelection } = completeModel.find(
            (model: NewModelsAllParams) => {
                return model.idNewModel === idMatrixModel;
            }
        );

        const dataMatrix = {
            id: Date.now(),
            populationData: typeSelection,
            geoId: idGeo,
            modelId: idMatrixModel,
            nodes: nodesLocalValue,
            populationPercentage: popPercentage,
            graphTypes: graphTypeLocal,
            dynamical: isDynamical,
            cicleDays: daysCicleLocalValue,
            modulationOption: modulationLocalValue,
            // interventions: InterventionsTypes[];
        };

        const dataMatrixCreated = JSON.parse(
            localStorage.getItem("mobilityMatrixList")
        );
        localStorage.setItem(
            "mobilityMatrixList",
            JSON.stringify([...dataMatrixCreated, dataMatrix])
        );

        // setMobilityMatrixList({
        //     type: "add",
        //     payload: dataMatrix,
        // });
    };
    // const saveMobilityMatrix = () => {
    //     try {
    // const localStorageExist =
    //     window.localStorage.getItem("geoSelection");
    // if (!localStorageExist) {
    //     window.localStorage.setItem("geoSelection", JSON.stringify([]));
    // }
    // const dataGeoSelections = {
    //     id: Date.now(),
    //     name: geoSelectionName,
    //     scale,
    //     featureSelected:
    //         (scale === "States" && states) ||
    //         (scale === "Counties" && counties),
    // };

    // const dataGeoSelectionsCreated = JSON.parse(
    //     localStorage.getItem("geoSelection")
    // );

    // if (mode === Model.Update) {
    //     const updateDataParameters = {
    //         id: idGeoSelectionUpdate,
    //         name: geoSelectionName,
    //         scale,
    //         featureSelected:
    //             (scale === "States" && states) ||
    //             (scale === "Counties" && counties),
    //     };
    //     const indexDataToUpdate = dataGeoSelectionsCreated.findIndex(
    //         (e: { id: number }) => e.id === idGeoSelectionUpdate
    //     );
    //     dataGeoSelectionsCreated[indexDataToUpdate] =
    //         updateDataParameters;
    //     localStorage.setItem(
    //         "geoSelection",
    //         JSON.stringify(dataGeoSelectionsCreated)
    //     );
    //     setGeoSelections({
    //         type: "updateGeoSelection",
    //         element: `${idGeoSelectionUpdate}`,
    //         geoPayload: dataGeoSelections,
    //     });
    //     setIdGeoSelectionUpdate(0);
    //     toast({
    //         position: bottomLeft,
    //         title: "Selection Edited",
    //         description: "Your selection was updated successfully",
    //         status: "success",
    //         duration: 2000,
    //         isClosable: true,
    //     });
    //     setMode(Model.Initial);
    //     setIndex(0);
    // } else {
    // localStorage.setItem(
    //     "geoSelection",
    //     JSON.stringify([...dataGeoSelectionsCreated, dataGeoSelections])
    // );
    // setMobilityMatrixList({
    //     type: "addMobilityMatrix",
    //     payload: dataGeoSelections,
    // });
    //     toast({
    //         position: bottomLeft,
    //         title: "Mobility Matrix Created",
    //         description: "Your mobility matrix was created successfully",
    //         status: "success",
    //         duration: 2000,
    //         isClosable: true,
    //     });
    //     setMode(Model.Initial);
    //     if (originOfGeoCreation === "modelsTab") {
    //         setIndex(1);
    //     } else {
    //         setIndex(0);
    //     }
    //     // }
    // } catch (error) {
    //     toast({
    //         position: bottomLeft,
    //         title: "Error",
    //         description: "Something failed. Try again later!",
    //         status: "error",
    //         duration: 2000,
    //         isClosable: true,
    //     });
    // }
    // };

    return (
        <Flex w="40%" p="0 2%" mt="20px">
            <ModelsMobilityMatrixSelect />
            <Stack spacing={4} direction="row" align="center">
                <Button
                    size="sm"
                    fontSize="10px"
                    bg="#016FB9"
                    color="#FFFFFF"
                    onClick={() => saveMobilityMatrix()}
                >
                    SAVE MATRIX
                </Button>
                <Button
                    // onClick={onOpen}
                    bg="#016FB9"
                    color="#FFFFFF"
                    size="sm"
                    borderRadius="4px"
                    aria-label="Delete geographic selection"
                    p="0"
                >
                    <Icon w="20px" h="20px" as={TrashIcon} />
                </Button>
            </Stack>
        </Flex>
    );
};

export default ModelSelectAndButtons;
