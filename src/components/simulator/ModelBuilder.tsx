import { Box, Flex, Portal } from "@chakra-ui/react";
import { useState } from "react";

import SectionVariableDependentTime from "components/map-results/SectionVariableDependentTime";
import ModelController from "components/simulator/controllers/ModelController";
import VariableDependentTime, {
    NameFunction,
} from "types/VariableDependentTime";

import ToastMessage from "./controllers/ToastMessage";

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
        <Flex justifyContent="space-between">
            <Flex w="100%">
                <Flex justifyContent="space-between">
                    <Box
                        p="1rem"
                        border="2px"
                        borderColor="gray.200"
                        textAlign="center"
                        w="100%"
                    >
                        <ModelController
                            showSectionVariable={setShowSectionVariable}
                            setDataView={setDataViewVariable}
                        />
                    </Box>
                </Flex>
                <Flex direction="column">
                    <ToastMessage
                        isEditing={isEditing}
                        closeUpdatingModel={setIsEditing}
                    />
                </Flex>
            </Flex>
            {showSectionVariable && (
                <Box
                    p="1rem"
                    border="2px"
                    borderColor="gray.200"
                    textAlign="center"
                    w="80%"
                >
                    <SectionVariableDependentTime
                        valuesVariablesDependent={dataViewVariable}
                        showSectionVariable={setShowSectionVariable}
                    />
                </Box>
            )}
        </Flex>
    );
};

export default ModelBuilder;
