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
    modelName: string;
    startDate: Date;
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
    modelName,
    startDate,
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
                modelName={modelName}
                startDate={startDate}
            />
        </>
    );
};

export default ParametersAccordion;
