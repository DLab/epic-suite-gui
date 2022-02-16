import { ViewIcon } from "@chakra-ui/icons";
import { IconButton, Text } from "@chakra-ui/react";
import React from "react";

import { EpidemicsData } from "types/ControlPanelTypes";
import VariableDependentTime from "types/VariableDependentTime";

interface Props {
    ParametersModels: EpidemicsData;
    setDataViewVariable: (val: VariableDependentTime) => void;
    setShowViewVariable: (val: boolean) => void;
}

const EpidemiologicSEIRHVD = ({
    ParametersModels,
    setDataViewVariable,
    setShowViewVariable,
}: Props) => {
    return (
        <>
            <Text>
                Beta_v:{" "}
                {ParametersModels.Beta_v?.isEnabled ? (
                    <IconButton
                        color="#16609E"
                        aria-label="Call Segun"
                        size="sm"
                        cursor="pointer"
                        icon={<ViewIcon />}
                        onClick={() => {
                            setDataViewVariable(ParametersModels.Beta_v);
                            setShowViewVariable(true);
                        }}
                    />
                ) : (
                    ParametersModels.Beta_v?.val
                )}
            </Text>
            <Text>
                populationfraction: {ParametersModels?.populationfraction}
            </Text>
            <Text>population: {ParametersModels.population}</Text>
        </>
    );
};

export default EpidemiologicSEIRHVD;
