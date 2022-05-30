import { Box, Flex, Portal } from "@chakra-ui/react";
// import SectionVariableDependentTime from "components/map-results/SectionVariableDependentTime";
import { useState } from "react";

import ToastMessage from "../simulator/controllers/ToastMessage";
import ModelController from "components/new-model/ModelController";
import SectionVariableDependentTime from "components/new-model/SectionVariableDependentTime";
import VariableDependentTime, {
    NameFunction,
} from "types/VariableDependentTime";

interface Props {
    isEditing: boolean;
    setIsEditing: (val: boolean) => void;
    showSectionVariable: boolean;
    setShowSectionVariable: (values: boolean) => void;
    setShowSectionInitialConditions: (value: boolean) => void;
    setDataViewVariable: (values: VariableDependentTime) => void;
    setPositionVDT: (value: number) => void;
}

const ModelBuilder = ({
    isEditing,
    setIsEditing,
    showSectionVariable,
    setShowSectionInitialConditions,
    setShowSectionVariable,
    setPositionVDT,
    setDataViewVariable,
}: Props) => {
    // const [showSectionVariable, setShowSectionVariable] =
    //     useState<boolean>(false);
    // const [positionVDT, setPositionVDT] = useState<number>(-1);
    // const [dataViewVariable, setDataViewVariable] =
    //     useState<VariableDependentTime>({
    //         rangeDays: [[0, 500]],
    //         type: [{ name: NameFunction.static, value: 0 }],
    //         name: "nothing",
    //         default: 0.3,
    //         isEnabled: false,
    //         val: 0.3,
    //     });
    return (
        <>
            <ModelController
                showSectionVariable={setShowSectionVariable}
                setDataView={setDataViewVariable}
                modelCompartment="SEIRHVD"
                nodes={["california"]}
                setPositionVDT={setPositionVDT}
                setShowSectionInitialConditions={
                    setShowSectionInitialConditions
                }
            />

            {/* <Flex w="5%" direction="column">
                <ToastMessage
                    isEditing={isEditing}
                    closeUpdatingModel={setIsEditing}
                />
            </Flex> */}
        </>
    );
};

export default ModelBuilder;
