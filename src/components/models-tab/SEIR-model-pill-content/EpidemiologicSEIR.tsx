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

const EpidemiologicSEIR = ({
    ParametersModels,
    setDataViewVariable,
    setShowViewVariable,
}: Props) => {
    return (
        <>
            <Text>pI_det: {ParametersModels.pI_det}</Text>
            <Text>
                rR_S:{" "}
                {ParametersModels.rR_S.isEnabled ? (
                    <IconButton
                        color="#16609E"
                        aria-label="Call Segun"
                        size="sm"
                        cursor="pointer"
                        icon={<ViewIcon />}
                        onClick={() => {
                            setDataViewVariable(ParametersModels.rR_S);
                            setShowViewVariable(true);
                        }}
                    />
                ) : (
                    ParametersModels.rR_S.val
                )}
            </Text>
            <Text>
                tE_I:{" "}
                {ParametersModels.tE_I.isEnabled ? (
                    <IconButton
                        color="#16609E"
                        aria-label="Call Segun"
                        size="sm"
                        cursor="pointer"
                        icon={<ViewIcon />}
                        onClick={() => {
                            setDataViewVariable(ParametersModels.tE_I);
                            setShowViewVariable(true);
                        }}
                    />
                ) : (
                    ParametersModels.tE_I.val
                )}
            </Text>
            <Text>
                tI_R:{" "}
                {ParametersModels.tI_R.isEnabled ? (
                    <IconButton
                        color="#16609E"
                        aria-label="Call Segun"
                        size="sm"
                        cursor="pointer"
                        icon={<ViewIcon />}
                        onClick={() => {
                            setDataViewVariable(ParametersModels.tI_R);
                            setShowViewVariable(true);
                        }}
                    />
                ) : (
                    ParametersModels.tI_R.val
                )}
            </Text>
        </>
    );
};

export default EpidemiologicSEIR;
