/* eslint-disable sonarjs/no-identical-functions */
/* eslint-disable @typescript-eslint/naming-convention */
import { Text, Flex, FormControl, Heading, Box } from "@chakra-ui/react";
import _ from "lodash";

import NumberInputEpi from "../NumberInputEpi";
import useModelBuilder from "hooks/modelTab/useModelBuilder";
import useParametersSection from "hooks/modelTab/useParametersSection";
import useUpdateControlPanel from "hooks/modelTab/useUpdateControlPanel";

import MobilityMatrixModel from "./mobility-matrix/MobilityMatrixModel";
import NodesParams from "./NodesParams";
import TimeDependentControl from "./timeDependentVar/TimeDependentControl";
// import ModelInterventions from "./interventions/ModelInterventions";

interface Props {
    showSectionVariable: (values: boolean) => void;
    setShowSectionInitialConditions: (value: boolean) => void;
    setPositionVDT: (value: number) => void;
    modelCompartment?: string;
    populationValue: string;
    matrixId: number;
    setMatrixId: (value: number) => void;
    idGeo: number | string;
    numberNodes: number;
    dataSourceValue: string;
    modelName: string;
    startDate: Date;
}

/**
 * Accordion with the parameter settings of a model.
 * @subcategory NewModel
 * @component
 */
const ModelParams = ({
    showSectionVariable,
    setShowSectionInitialConditions,
    setPositionVDT,
    modelCompartment,
    populationValue,
    matrixId,
    setMatrixId,
    idGeo,
    numberNodes,
    dataSourceValue,
    modelName,
    startDate,
}: Props) => {
    const { nodes } = useModelBuilder({
        dataSourceValue,
        idGeo,
        populationValue,
        modelName,
        modelCompartment,
        startDate,
        numberNodes,
    });
    const {
        name,
        description,
        isEnableIconButton,
        parameters,
        changePermissionsTimeDependentVar,
        setDataViewVariable,
        otherParameters,
    } = useParametersSection();
    const updateControlPanel = useUpdateControlPanel();
    const createTimeDependentControl = (paramKey) => (
        <TimeDependentControl
            value={parameters[paramKey].val}
            nameParams={paramKey}
            name={description[paramKey].alias}
            description={description[paramKey].description}
            step={description[paramKey].values.step}
            min={description[paramKey].values.min}
            max={description[paramKey].values.max}
            isDisabled={isEnableIconButton[paramKey][0]}
            duration={parameters.t_end}
            isStateLocal
            isChecked={isEnableIconButton[paramKey][0]}
            onChangeSwitch={(e) => {
                changePermissionsTimeDependentVar({
                    ...isEnableIconButton,
                    [paramKey]: [e.target.checked],
                });
                if (!e.target.checked) {
                    showSectionVariable(false);
                }
                updateControlPanel({
                    type: "switch",
                    target: paramKey,
                    switch: e.target.checked,
                });
            }}
            onClickIconButton={() => {
                setShowSectionInitialConditions(false);
                showSectionVariable(true);
                setDataViewVariable(parameters[paramKey]);
            }}
        />
    );

    return (
        // <></>
        <Box display={!name ? "none" : "block"}>
            {populationValue === "metapopulation" && (
                <MobilityMatrixModel
                    matrixId={matrixId}
                    setMatrixId={setMatrixId}
                />
            )}
            <Text fontSize="1rem" fontWeight={700} mb="5%" mt="5%">
                Common parameters
            </Text>
            <Flex justifyContent="space-between" wrap="wrap">
                <FormControl display="flex" alignItems="center">
                    <Flex w="50%" h="2rem" alignItems="center">
                        <NumberInputEpi
                            value={parameters.t_end}
                            nameParams="t_end"
                            name="Duration"
                            description="Duration days"
                            min={0}
                            step={1}
                            max={Infinity}
                            isInitialParameters
                            type="number"
                            isStateLocal
                        />
                    </Flex>
                </FormControl>
            </Flex>
            <Flex justifyContent="space-between" wrap="wrap">
                {modelCompartment !== "SEIRHVD" &&
                    createTimeDependentControl("tI_R")}
            </Flex>
            <Flex justifyContent="space-between" wrap="wrap">
                {modelCompartment === "SEIR" &&
                    createTimeDependentControl("tE_I")}
            </Flex>
            <Flex justifyContent="space-between" wrap="wrap">
                {modelCompartment !== "SEIRHVD" &&
                    createTimeDependentControl("rR_S")}
            </Flex>
            <Flex justifyContent="space-between" wrap="wrap">
                <FormControl display="flex" alignItems="center">
                    <Flex w="50%" h="2rem" alignItems="center">
                        {modelCompartment !== "SEIRHVD" && (
                            <NumberInputEpi
                                value={parameters.pI_det}
                                nameParams="pI_det"
                                name={description.pI_det.alias}
                                description={description.pI_det.description}
                                step={description.pI_det.values.step}
                                min={description.pI_det.values.min}
                                max={description.pI_det.values.max}
                                type="number"
                                isInitialParameters
                                isStateLocal
                            />
                        )}
                    </Flex>
                </FormControl>
            </Flex>
            {modelCompartment === "SEIRHVD" && (
                <Flex justifyContent="space-between" wrap="wrap">
                    <FormControl display="flex" alignItems="center">
                        <Flex w="50%" h="2rem" alignItems="center">
                            <NumberInputEpi
                                value={parameters.populationfraction}
                                nameParams="populationfraction"
                                name={description.populationfraction.alias}
                                description={
                                    description.populationfraction.description
                                }
                                step={
                                    description.populationfraction.values.step
                                }
                                min={description.populationfraction.values.min}
                                max={description.populationfraction.values.max}
                                type="number"
                                isInitialParameters
                                isStateLocal
                            />
                        </Flex>
                    </FormControl>
                </Flex>
            )}
            <Heading as="h3" fontSize="1rem" mt="5%">
                Parameters per Nodes
            </Heading>
            <NodesParams
                beta={parameters.beta}
                alpha={parameters.alpha}
                mu={parameters.mu}
                nodes={nodes}
                duration={parameters.t_end}
                showSectionVariable={showSectionVariable}
                setShowSectionInitialConditions={
                    setShowSectionInitialConditions
                }
                setIsEnableIconButton={changePermissionsTimeDependentVar}
                isEnableIconButton={isEnableIconButton}
                setPositionVDT={setPositionVDT}
                modelCompartment={modelCompartment}
                otherParameters={otherParameters}
            />
        </Box>
    );
};

export default ModelParams;
