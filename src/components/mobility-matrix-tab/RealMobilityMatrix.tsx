import { Button } from "@chakra-ui/react";
import React, { useContext, useState } from "react";

import { MobilityMatrix } from "context/MobilityMatrixContext";
import type { InterventionsTypes } from "types/MobilityMatrixTypes";

import MobilityInterventions from "./MobilityInterventions";

interface Props {
    interventionList: InterventionsTypes[] | [];
    setInterventionList: (value: InterventionsTypes[] | []) => void;
}
const getRealMatrix = (setter, loadAdviceFunction) => {
    loadAdviceFunction(true);
    fetch("http://localhost/covid19geomodeller/mobility/usa", {
        method: "POST",
        body: JSON.stringify({
            timeInit: "2019-01-01",
            timeEnd: "2019-01-04",
            scale: "States",
            spatialSelection: ["10", "11"],
        }),
    })
        .then((e) => e.json())
        .then((data) => {
            setter(data);
        })
        .catch(() => setter({}))
        .finally(() => loadAdviceFunction(false));
};
const RealMobilityMatrix = ({
    interventionList,
    setInterventionList,
}: Props) => {
    const { setMatrix } = useContext(MobilityMatrix);
    const [isLoading, setIsLoading] = useState(false);
    return (
        <>
            <Button
                isLoading={isLoading}
                loadingText="Submitting"
                size="sm"
                fontSize="10px"
                bg="#016FB9"
                color="#FFFFFF"
                w="100px"
                onClick={() => getRealMatrix(setMatrix, setIsLoading)}
            >
                GET MATRIX
            </Button>
            <MobilityInterventions
                interventionList={interventionList}
                setInterventionList={setInterventionList}
            />
        </>
    );
};

export default RealMobilityMatrix;
