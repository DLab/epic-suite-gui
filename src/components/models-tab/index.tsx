import { Flex } from "@chakra-ui/react";

import BreadCrumb from "components/BreadCrumb";
import useModelLink from "hooks/modelTab/useModelLink";

import ModelDashBoard from "./ModelDashboard";

const ModelTab = () => {
    const {
        secondModelLink,
        setSecondModelLink,
        actualModelName,
        setActualModelName,
        matrixId,
        setMatrixId,
        newModel,
        modelMode,
        setModelMode,
        modelId,
        addNewModel,
    } = useModelLink();

    return (
        <Flex direction="column">
            <BreadCrumb
                firstLink="Models"
                secondLink={secondModelLink}
                setSecondLink={setSecondModelLink}
            />
            <ModelDashBoard
                newModel={newModel}
                modelId={modelId}
                actualModelName={actualModelName}
                setActualModelName={setActualModelName}
                matrixId={matrixId}
                setMatrixId={setMatrixId}
                modelMode={modelMode}
                addNewModel={addNewModel}
                setModelMode={setModelMode}
            />
        </Flex>
    );
};

export default ModelTab;
