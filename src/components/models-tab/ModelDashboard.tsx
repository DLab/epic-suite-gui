import { Flex, Button, Icon, Box } from "@chakra-ui/react";
import { PlusIcon } from "@heroicons/react/24/outline";

import ModelMainTab from "./ModelMainTab";
import ModelNameAndButtons from "./ModelNameAndButtons";
import ModelsSavedSelect from "./ModelsSavedSelect";

const AddButton = ({ children, title, addClickCallback }) => {
    return (
        <Flex w="40%" mt="15px">
            {children}
            {/* <ModelsSavedSelect setModelMode={setModelMode} /> */}
            <Button
                size="sm"
                fontSize="0.625rem"
                bg="#016FB9"
                color="#FFFFFF"
                // onClick={addClickCallback}
                onClick={() => {
                    addClickCallback();
                }}
            >
                <Icon w="0.875rem" h="0.875rem" as={PlusIcon} mr="5px" />
                {/* ADD NEW */}
                {title}
            </Button>
            {/* <ImportModels /> */}
        </Flex>
    );
};

export default function ModelDashBoard({
    newModel,
    modelId,
    actualModelName,
    setActualModelName,
    matrixId,
    setMatrixId,
    modelMode,
    addNewModel,
    setModelMode,
}) {
    if (modelMode === "initial") {
        return (
            <AddButton addClickCallback={addNewModel} title="ADD NEW">
                <ModelsSavedSelect setModelMode={setModelMode} />
            </AddButton>
        );
    }
    return newModel.map((model) => {
        if (model.idNewModel === modelId) {
            return (
                <Box key={model.idNewModel}>
                    <ModelNameAndButtons
                        actualModelName={actualModelName}
                        setActualModelName={setActualModelName}
                        matrixId={matrixId}
                    />
                    <ModelMainTab
                        id={modelId}
                        initialConditions={model.initialConditions}
                        actualModelName={actualModelName}
                        matrixId={matrixId}
                        setMatrixId={setMatrixId}
                    />
                </Box>
            );
        }
        return <Box />;
    });
}
