import { Box, Flex, Portal } from "@chakra-ui/react";
// import SectionVariableDependentTime from "components/map-results/SectionVariableDependentTime";
import { useState } from "react";

import SectionVariableDependentTime from "components/models-tab/SectionVariableDependentTime";
import ModelController from "components/models-tab/ModelController";
import VariableDependentTime, {
    NameFunction,
} from "types/VariableDependentTime";

import ToastMessage from "../simulator/controllers/ToastMessage";

interface Props {
    isEditing: boolean;
    setIsEditing: (val: boolean) => void;
}

const ModelBuilder = ({ isEditing, setIsEditing }: Props) => {
    const [showSectionVariable, setShowSectionVariable] =
        useState<boolean>(false);
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
                    />
                </Flex>
            )}
        </Flex>
    );
};

export default ModelBuilder;
