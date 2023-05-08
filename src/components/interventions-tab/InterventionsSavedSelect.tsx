import { Select } from "@chakra-ui/react";
import { useContext } from "react";

import { InterventionColection } from "context/InterventionsContext";
import { InterventionsModes } from "types/InterventionsTypes";

const InterventionsSavedSelect = () => {
    const {
        setInterventionMode,
        interventionsCreated,
        setOriginOfInterventionCreation,
        setIdInterventionModel,
        setIdInterventionToUpdate,
    } = useContext(InterventionColection);

    // const updateModelId = (intervId) => {
    //     const { modelId } = interventionsCreated.find(
    //         (interv) => interv.id === intervId
    //     );
    //     setIdInterventionModel(modelId);
    // };

    return (
        <Select
            w="50%"
            size="sm"
            mr="15px"
            placeholder="Select an intervention strategy"
            bg="#F4F4F4"
            borderColor="#F4F4F4"
            borderRadius="8px"
            onChange={(e) => {
                setInterventionMode(InterventionsModes.Update);
                setOriginOfInterventionCreation("interventionsTab");
                setIdInterventionToUpdate(+e.target.value);
                setIdInterventionModel(+e.target.value);
                // updateModelId(+e.target.value);
            }}
        >
            {interventionsCreated.map((interv) => {
                return (
                    <option key={interv.id} value={interv.id}>
                        {interv.name}
                    </option>
                );
            })}
        </Select>
    );
};

export default InterventionsSavedSelect;
