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

const InterventionsSEIRHVD = ({
    ParametersModels,
    setDataViewVariable,
    setShowViewVariable,
}: Props) => {
    return (
        <>
            <Text>
                vac_d:{" "}
                {ParametersModels.vac_d.isEnabled ? (
                    <IconButton
                        color="#16609E"
                        aria-label="Call Segun"
                        size="sm"
                        cursor="pointer"
                        icon={<ViewIcon />}
                        onClick={() => {
                            setDataViewVariable(ParametersModels.vac_d);
                            setShowViewVariable(true);
                        }}
                    />
                ) : (
                    ParametersModels.vac_d.val
                )}
            </Text>
            <Text>
                vac_eff:{" "}
                {ParametersModels.vac_eff.isEnabled ? (
                    <IconButton
                        color="#16609E"
                        aria-label="Call Segun"
                        size="sm"
                        cursor="pointer"
                        icon={<ViewIcon />}
                        onClick={() => {
                            setDataViewVariable(ParametersModels.vac_eff);
                            setShowViewVariable(true);
                        }}
                    />
                ) : (
                    ParametersModels.vac_eff.val
                )}
            </Text>
        </>
    );
};

export default InterventionsSEIRHVD;
