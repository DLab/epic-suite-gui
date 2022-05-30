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
}

const ModelBuilder = ({ isEditing, setIsEditing }: Props) => {
    const [showSectionVariable, setShowSectionVariable] =
        useState<boolean>(false);
    const [positionVDT, setPositionVDT] = useState<number>(-1);
    const [dataViewVariable, setDataViewVariable] =
        useState<VariableDependentTime>({
            rangeDays: [[0, 500]],
            type: [{ name: NameFunction.static, value: 0 }],
            name: "nothing",
            default: 0.3,
            isEnabled: false,
            val: 0.3,
        });
    return (
        <Flex justifyContent="space-between" ml="2%">
            <Flex w={showSectionVariable ? "50%" : "100%"}>
                <Flex>
                    <Box
                        p="1rem"
                        textAlign="center"
                        w="100%"
                        borderRadius="6px"
                        boxShadow="sm"
                        bg="#FAFAFA"
                        overflowY="auto"
                    >
                        <ModelController
                            showSectionVariable={setShowSectionVariable}
                            setDataView={setDataViewVariable}
                            modelCompartment="SEIRHVD"
                            nodes={["california"]}
                            setPositionVDT={setPositionVDT}
                        />
                    </Box>
                </Flex>
                <Flex w="5%" direction="column">
                    <ToastMessage
                        isEditing={isEditing}
                        closeUpdatingModel={setIsEditing}
                    />
                </Flex>
            </Flex>
            {showSectionVariable && (
                <Flex
                    p="1rem"
                    borderRadius="6px"
                    boxShadow="sm"
                    bg="#FAFAFA"
                    textAlign="center"
                    w="100%"
                >
                    <SectionVariableDependentTime
                        valuesVariablesDependent={dataViewVariable}
                        showSectionVariable={setShowSectionVariable}
                        positionVariableDependentTime={positionVDT}
                    />
                </Flex>
            )}
        </Flex>
    );
};

export default ModelBuilder;
