import { Select } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";

import { MobilityMatrix } from "context/MobilityMatrixContext";
import { NewModelSetted } from "context/NewModelsContext";
import { MobilityModes } from "types/MobilityMatrixTypes";
import { NewModelsAllParams } from "types/SimulationTypes";

interface Props {
    setMatrixType: (value: string) => void;
    setIsDynamical: (value: boolean) => void;
}

const ModelsMobilityMatrixSelect = ({
    setMatrixType,
    setIsDynamical,
}: Props) => {
    const { completeModel, mode } = useContext(NewModelSetted);
    const { setIdMatrixModel, matrixMode, idMatrixModel } =
        useContext(MobilityMatrix);
    const [metaModelsList, setMetaModelsList] = useState([]);
    const [isSelectDisabeld, setIsSelectDisabeld] = useState(false);

    useEffect(() => {
        setMetaModelsList(
            completeModel.filter(
                (model: NewModelsAllParams) =>
                    model.populationType === "metapopulation"
            )
        );
    }, [completeModel]);

    useEffect(() => {
        if (mode !== "initial" || matrixMode === MobilityModes.Update) {
            setIsSelectDisabeld(true);
        }
    }, [matrixMode, mode]);

    return (
        <Select
            mb="17px"
            w="50%"
            size="sm"
            mr="15px"
            placeholder="Select model"
            bg="#F4F4F4"
            borderColor="#F4F4F4"
            borderRadius="8px"
            value={idMatrixModel}
            isDisabled={isSelectDisabeld}
            onChange={(e) => {
                if (!e.target.value) {
                    setIdMatrixModel(0);
                } else {
                    setIdMatrixModel(+e.target.value);
                }
                setMatrixType("");
                setIsDynamical(false);
            }}
        >
            {metaModelsList.map((model: NewModelsAllParams) => {
                return (
                    <option key={model.idNewModel} value={model.idNewModel}>
                        {model.name}
                    </option>
                );
            })}
        </Select>
    );
};

export default ModelsMobilityMatrixSelect;
