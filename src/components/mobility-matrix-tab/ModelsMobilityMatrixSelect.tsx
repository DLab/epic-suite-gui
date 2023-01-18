import { Select } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";

import { MobilityMatrix } from "context/MobilityMatrixContext";
import { NewModelSetted } from "context/NewModelsContext";
import { MobilityModes } from "types/MobilityMatrixTypes";
import { NewModelsAllParams } from "types/SimulationTypes";

const ModelsMobilityMatrixSelect = () => {
    const { completeModel } = useContext(NewModelSetted);
    const { setIdMatrixModel, setMatrixMode, idMatrixModel } =
        useContext(MobilityMatrix);
    const [metaModelsList, setMetaModelsList] = useState([]);

    useEffect(() => {
        setMetaModelsList(
            completeModel.filter(
                (model: NewModelsAllParams) =>
                    model.populationType === "metapopulation"
            )
        );
    }, [completeModel]);

    return (
        <Select
            w="50%"
            size="sm"
            mr="15px"
            placeholder="Select model"
            bg="#F4F4F4"
            borderColor="#F4F4F4"
            borderRadius="8px"
            value={idMatrixModel}
            onChange={(e) => {
                if (!e.target.value) {
                    setIdMatrixModel(0);
                    setMatrixMode(MobilityModes.Initial);
                } else {
                    setIdMatrixModel(+e.target.value);
                    setMatrixMode(MobilityModes.Add);
                    // setModelMode("update");
                }
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
