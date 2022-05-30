import ModelBuilder from "components/new-model/ModelBuilder";
import VariableDependentTime from "types/VariableDependentTime";

interface Props {
    showSectionVariable: boolean;
    setShowSectionVariable: (values: boolean) => void;
    setShowSectionInitialConditions: (value: boolean) => void;
    setDataViewVariable: (values: VariableDependentTime) => void;
    setPositionVDT: (value: number) => void;
}

const ParametersAccordion = ({
    showSectionVariable,
    setShowSectionVariable,
    setShowSectionInitialConditions,
    setPositionVDT,
    setDataViewVariable,
}: Props) => {
    return (
        <>
            <ModelBuilder
                isEditing
                setIsEditing={() => {}}
                showSectionVariable={showSectionVariable}
                setShowSectionVariable={setShowSectionVariable}
                setDataViewVariable={setDataViewVariable}
                setPositionVDT={setPositionVDT}
                setShowSectionInitialConditions={
                    setShowSectionInitialConditions
                }
            />
        </>
    );
};

export default ParametersAccordion;
