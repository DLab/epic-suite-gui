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

const StateTransitionSEIRHVD = ({
    ParametersModels,
    setDataViewVariable,
    setShowViewVariable,
}: Props) => {
    return (
        <>
            <Heading pt="1rem" fontSize={24} as="h3">
                State Transition
            </Heading>
            <Text>
                pE_Im:{" "}
                {ParametersModels.pE_Im?.isEnabled ? (
                    <IconButton
                        color="#16609E"
                        aria-label="Call Segun"
                        size="sm"
                        cursor="pointer"
                        icon={<ViewIcon />}
                        onClick={() => {
                            setDataViewVariable(ParametersModels.pE_Im);
                            setShowViewVariable(true);
                        }}
                    />
                ) : (
                    ParametersModels.pE_Im?.val
                )}
            </Text>
            <Text>
                pE_Icr:{" "}
                {ParametersModels.pE_Icr?.isEnabled ? (
                    <IconButton
                        color="#16609E"
                        aria-label="Call Segun"
                        size="sm"
                        cursor="pointer"
                        icon={<ViewIcon />}
                        onClick={() => {
                            setDataViewVariable(ParametersModels.pE_Icr);
                            setShowViewVariable(true);
                        }}
                    />
                ) : (
                    ParametersModels.pE_Icr?.val
                )}
            </Text>
            <Text>
                tE_Im:{" "}
                {ParametersModels.tE_Im?.isEnabled ? (
                    <IconButton
                        color="#16609E"
                        aria-label="Call Segun"
                        size="sm"
                        cursor="pointer"
                        icon={<ViewIcon />}
                        onClick={() => {
                            setDataViewVariable(ParametersModels.tE_Im);
                            setShowViewVariable(true);
                        }}
                    />
                ) : (
                    ParametersModels.tE_Im?.val
                )}
            </Text>
            <Text>
                tE_Icr:{" "}
                {ParametersModels.tE_Icr?.isEnabled ? (
                    <IconButton
                        color="#16609E"
                        aria-label="Call Segun"
                        size="sm"
                        cursor="pointer"
                        icon={<ViewIcon />}
                        onClick={() => {
                            setDataViewVariable(ParametersModels.tE_Icr);
                            setShowViewVariable(true);
                        }}
                    />
                ) : (
                    ParametersModels.tE_Icr?.val
                )}
            </Text>
            <Text>
                tEv_Iv:{" "}
                {ParametersModels.tEv_Iv?.isEnabled ? (
                    <IconButton
                        color="#16609E"
                        aria-label="Call Segun"
                        size="sm"
                        cursor="pointer"
                        icon={<ViewIcon />}
                        onClick={() => {
                            setDataViewVariable(ParametersModels.tEv_Iv);
                            setShowViewVariable(true);
                        }}
                    />
                ) : (
                    ParametersModels.tEv_Iv?.val
                )}
            </Text>
            <Text>
                tIm_R:{" "}
                {ParametersModels.tIm_R?.isEnabled ? (
                    <IconButton
                        color="#16609E"
                        aria-label="Call Segun"
                        size="sm"
                        cursor="pointer"
                        icon={<ViewIcon />}
                        onClick={() => {
                            setDataViewVariable(ParametersModels.tIm_R);
                            setShowViewVariable(true);
                        }}
                    />
                ) : (
                    ParametersModels.tIm_R?.val
                )}
            </Text>
            <Text>
                tIcr_H:{" "}
                {ParametersModels.tIcr_H?.isEnabled ? (
                    <IconButton
                        color="#16609E"
                        aria-label="Call Segun"
                        size="sm"
                        cursor="pointer"
                        icon={<ViewIcon />}
                        onClick={() => {
                            setDataViewVariable(ParametersModels.tIcr_H);
                            setShowViewVariable(true);
                        }}
                    />
                ) : (
                    ParametersModels.tIcr_H?.val
                )}
            </Text>
            <Text>
                pIv_R:{" "}
                {ParametersModels.pIv_R?.isEnabled ? (
                    <IconButton
                        color="#16609E"
                        aria-label="Call Segun"
                        size="sm"
                        cursor="pointer"
                        icon={<ViewIcon />}
                        onClick={() => {
                            setDataViewVariable(ParametersModels.pIv_R);
                            setShowViewVariable(true);
                        }}
                    />
                ) : (
                    ParametersModels.pIv_R?.val
                )}
            </Text>
            <Text>
                tIv_R:{" "}
                {ParametersModels.tIv_R?.isEnabled ? (
                    <IconButton
                        color="#16609E"
                        aria-label="Call Segun"
                        size="sm"
                        cursor="pointer"
                        icon={<ViewIcon />}
                        onClick={() => {
                            setDataViewVariable(ParametersModels.tIv_R);
                            setShowViewVariable(true);
                        }}
                    />
                ) : (
                    ParametersModels.tIv_R?.val
                )}
            </Text>
            <Text>
                pIv_H:{" "}
                {ParametersModels.pIv_H?.isEnabled ? (
                    <IconButton
                        color="#16609E"
                        aria-label="Call Segun"
                        size="sm"
                        cursor="pointer"
                        icon={<ViewIcon />}
                        onClick={() => {
                            setDataViewVariable(ParametersModels.pIv_H);
                            setShowViewVariable(true);
                        }}
                    />
                ) : (
                    ParametersModels.pIv_H?.val
                )}
            </Text>
            <Text>
                tIv_H:{" "}
                {ParametersModels.tIv_H?.isEnabled ? (
                    <IconButton
                        color="#16609E"
                        aria-label="Call Segun"
                        size="sm"
                        cursor="pointer"
                        icon={<ViewIcon />}
                        onClick={() => {
                            setDataViewVariable(ParametersModels.tIv_H);
                            setShowViewVariable(true);
                        }}
                    />
                ) : (
                    ParametersModels.tIv_H?.val
                )}
            </Text>
            <Text>
                pH_R:{" "}
                {ParametersModels.pH_R?.isEnabled ? (
                    <IconButton
                        color="#16609E"
                        aria-label="Call Segun"
                        size="sm"
                        cursor="pointer"
                        icon={<ViewIcon />}
                        onClick={() => {
                            setDataViewVariable(ParametersModels.pH_R);
                            setShowViewVariable(true);
                        }}
                    />
                ) : (
                    ParametersModels.pH_R?.val
                )}
            </Text>
            <Text>
                tH_R:{" "}
                {ParametersModels.tH_R?.isEnabled ? (
                    <IconButton
                        color="#16609E"
                        aria-label="Call Segun"
                        size="sm"
                        cursor="pointer"
                        icon={<ViewIcon />}
                        onClick={() => {
                            setDataViewVariable(ParametersModels.tH_R);
                            setShowViewVariable(true);
                        }}
                    />
                ) : (
                    ParametersModels.tH_R?.val
                )}
            </Text>
            <Text>
                pH_D:{" "}
                {ParametersModels.pH_D?.isEnabled ? (
                    <IconButton
                        color="#16609E"
                        aria-label="Call Segun"
                        size="sm"
                        cursor="pointer"
                        icon={<ViewIcon />}
                        onClick={() => {
                            setDataViewVariable(ParametersModels.pH_D);
                            setShowViewVariable(true);
                        }}
                    />
                ) : (
                    ParametersModels.pH_D?.val
                )}
            </Text>
            <Text>
                tH_D:{" "}
                {ParametersModels.tH_D?.isEnabled ? (
                    <IconButton
                        color="#16609E"
                        aria-label="Call Segun"
                        size="sm"
                        cursor="pointer"
                        icon={<ViewIcon />}
                        onClick={() => {
                            setDataViewVariable(ParametersModels.tH_D);
                            setShowViewVariable(true);
                        }}
                    />
                ) : (
                    ParametersModels.tH_D?.val
                )}
            </Text>
            <Text>
                pR_S:{" "}
                {ParametersModels.pR_S?.isEnabled ? (
                    <IconButton
                        color="#16609E"
                        aria-label="Call Segun"
                        size="sm"
                        cursor="pointer"
                        icon={<ViewIcon />}
                        onClick={() => {
                            setDataViewVariable(ParametersModels.pR_S);
                            setShowViewVariable(true);
                        }}
                    />
                ) : (
                    ParametersModels.pR_S?.val
                )}
            </Text>
            <Text>
                tR_S:{" "}
                {ParametersModels.tR_S?.isEnabled ? (
                    <IconButton
                        color="#16609E"
                        aria-label="Call Segun"
                        size="sm"
                        cursor="pointer"
                        icon={<ViewIcon />}
                        onClick={() => {
                            setDataViewVariable(ParametersModels.tR_S);
                            setShowViewVariable(true);
                        }}
                    />
                ) : (
                    ParametersModels.tR_S?.val
                )}
            </Text>
        </>
    );
};

export default StateTransitionSEIRHVD;
