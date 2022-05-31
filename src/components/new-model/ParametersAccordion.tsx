import ModelBuilder from "components/new-model/ModelBuilder";
import VariableDependentTime from "types/VariableDependentTime";

interface Props {
    showSectionVariable: boolean;
    setShowSectionVariable: (values: boolean) => void;
    setShowSectionInitialConditions: (value: boolean) => void;
    setDataViewVariable: (values: VariableDependentTime) => void;
    setPositionVDT: (value: number) => void;
    idGeo: number;
    modelCompartment: string;
    numberNodes: number;
    populationValue: string;
    dataSourceValue: string;
}

const ParametersAccordion = ({
    showSectionVariable,
    setShowSectionVariable,
    setShowSectionInitialConditions,
    setPositionVDT,
    setDataViewVariable,
    idGeo,
    modelCompartment,
    numberNodes,
    populationValue,
    dataSourceValue,
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
                idGeo={idGeo}
                modelCompartment={modelCompartment}
                numberNodes={numberNodes}
                populationValue={populationValue}
                dataSourceValue={dataSourceValue}
            />
        </>
    );
};

export default ParametersAccordion;
