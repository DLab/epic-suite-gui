/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable complexity */
import { ViewIcon } from "@chakra-ui/icons";
import { IconButton, Text, Heading } from "@chakra-ui/react";
import React from "react";

import { EpidemicsData } from "types/ControlPanelTypes";
import VariableDependentTime from "types/VariableDependentTime";

interface Props {
    ParametersModels: EpidemicsData;
    setDataViewVariable: (val: VariableDependentTime) => void;
    setShowViewVariable: (val: boolean) => void;
}

const SubreportSEIRHVD = ({
    ParametersModels,
    setDataViewVariable,
    setShowViewVariable,
}: Props) => {
    return (
        <>
            <Heading pt="1rem" fontSize={24} as="h3">
                Subreport
            </Heading>
            <Text>pIcr_det: {ParametersModels.pIcr_det}</Text>
            <Text>pIm_det: {ParametersModels.pIm_det}</Text>
            <Text>pIv_det: {ParametersModels.pIv_det}</Text>
        </>
    );
};

export default SubreportSEIRHVD;
