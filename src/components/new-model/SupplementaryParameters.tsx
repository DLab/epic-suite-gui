/* eslint-disable @typescript-eslint/naming-convention */
import { FormControl, Flex, Switch, IconButton, Text } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";

import FunctionIcon from "components/icons/FunctionIcon";
import NumberInputVariableDependent from "components/NumberInputVariableDependent";
import { ControlPanel } from "context/ControlPanelContext";
import VariableDependentTime, {
    NameFunction,
} from "types/VariableDependentTime";

interface Props {
    showSectionVariable: (values: boolean) => void;
    setDataView: (values: VariableDependentTime) => void;
    isEnableIconButton: Record<string, boolean[]>;
    data: VariableDependentTime[];
    nameParam: string;
    idNode: number;
    duration: number;
    supplementaryParam: string;
    setIsEnableIconButton: (obj: Record<string, boolean[]>) => void;
    setPositionVDT: (position: number) => void;
}

const SupplementaryParameters = ({
    showSectionVariable,
    setDataView,
    data,
    nameParam,
    supplementaryParam,
    idNode,
    duration,
    isEnableIconButton,
    setIsEnableIconButton,
    setPositionVDT,
}: Props) => {
    const { setParameters: setParamsControlPanel } = useContext(ControlPanel);
    return (
        <>
            <FormControl display="flex" alignItems="center">
                <Flex w="50%" justifyContent="space-between">
                    <NumberInputVariableDependent
                        value={data[idNode]?.val}
                        nameParams={nameParam}
                        name={nameParam}
                        description="Fraction of E that turn into Im"
                        step={0.01}
                        min={0}
                        max={1.0}
                        index={idNode}
                        duration={duration}
                        isStateLocal
                        isSupplementary
                        supplementaryParam={supplementaryParam}
                        isDisabled={isEnableIconButton[nameParam][idNode]}
                    />
                </Flex>
                <Flex alignItems="center" w="50%" justifyContent="flex-end">
                    <Text fontSize="11px">Set function</Text>
                    <Switch
                        ml="0.5rem"
                        isChecked={isEnableIconButton[nameParam][idNode]}
                        onChange={(e) => {
                            const subPermission: boolean[] =
                                isEnableIconButton[nameParam];
                            subPermission[idNode] = e.target.checked;
                            setIsEnableIconButton({
                                ...isEnableIconButton,
                                [nameParam]: subPermission,
                            });
                            if (!e.target.checked) {
                                showSectionVariable(false);
                            }
                            setParamsControlPanel({
                                type: "switch",
                                target: nameParam,
                                switch: e.target.checked,
                                positionVariableDependentTime: idNode,
                            });
                        }}
                    />

                    <IconButton
                        fill="white"
                        bg="#FFFFFF"
                        color="#16609E"
                        aria-label="Call Segun"
                        size="sm"
                        isDisabled={!isEnableIconButton[nameParam][idNode]}
                        cursor="pointer"
                        icon={<FunctionIcon />}
                        ml="1rem"
                        onClick={() => {
                            showSectionVariable(true);
                            setDataView(data[idNode]);
                            setPositionVDT(idNode);
                        }}
                    />
                </Flex>
            </FormControl>
        </>
    );
};

export default SupplementaryParameters;
