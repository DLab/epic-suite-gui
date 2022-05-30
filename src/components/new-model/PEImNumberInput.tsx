/* eslint-disable @typescript-eslint/naming-convention */
import { FormControl, Flex, Switch, IconButton } from "@chakra-ui/react";
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
    isEnableIconButton: boolean[];
    setIsEnableIconButton: (values: boolean[]) => void;
}

const PEImNumberInput = ({
    showSectionVariable,
    setDataView,
    isEnableIconButton,
    setIsEnableIconButton,
}: Props) => {
    const {
        setParameters,
        parameters: { pE_Im, pE_Icr },
    } = useContext(ControlPanel);

    useEffect(() => {
        const pEImStr = pE_Icr.val.toString();
        const pEImStrRound = Number(1 - parseFloat(pEImStr)).toFixed(2);
        setParameters({
            type: "setVariableDependent",
            payloadVariableDependent: {
                rangeDays: [[0, 500]],
                type: [
                    {
                        name: NameFunction.static,
                        value: Number(pEImStrRound),
                    },
                ],
                name: "pE_Im",
                default: 7,
                isEnabled: false,
                val: Number(pEImStrRound),
            },
            target: "pE_Im",
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pE_Icr.val]);

    useEffect(() => {
        const pEIcrStr = pE_Im.val.toString();
        const pEIcrStrRound = Number(1 - parseFloat(pEIcrStr)).toFixed(2);
        setParameters({
            type: "setVariableDependent",
            payloadVariableDependent: {
                rangeDays: [[0, 500]],
                type: [
                    {
                        name: NameFunction.static,
                        value: Number(pEIcrStrRound),
                    },
                ],
                name: "pE_Icr",
                default: 7,
                isEnabled: false,
                val: Number(pEIcrStrRound),
            },
            target: "pE_Icr",
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pE_Im.val]);

    return (
        <>
            <FormControl display="flex" alignItems="center">
                <Flex w="50%" justifyContent="space-between">
                    <span>pE_Im</span>
                    <NumberInputVariableDependent
                        value={pE_Im.val}
                        setValue={setParameters}
                        nameParams="pE_Im"
                        name="pE_Im"
                        description="Fraction of E that turn into Im"
                        step={0.01}
                        min={0}
                        max={1.0}
                        isDisabled={isEnableIconButton[9]}
                    />
                </Flex>
                <Flex alignItems="center" w="50%" justifyContent="flex-end">
                    <span>Set function</span>
                    <Switch
                        ml="0.5rem"
                        isChecked={isEnableIconButton[9]}
                        onChange={(e) => {
                            setIsEnableIconButton([
                                ...isEnableIconButton.slice(0, 9),
                                e.target.checked,
                                ...isEnableIconButton.slice(10),
                            ]);
                            if (!e.target.checked) {
                                showSectionVariable(false);
                            }
                            setParameters({
                                type: "switch",
                                target: "pE_Im",
                                switch: e.target.checked,
                            });
                        }}
                    />

                    <IconButton
                        fill="white"
                        bg="#FFFFFF"
                        color="#16609E"
                        aria-label="Call Segun"
                        size="sm"
                        isDisabled={!isEnableIconButton[9]}
                        cursor="pointer"
                        icon={<FunctionIcon />}
                        ml="1rem"
                        onClick={() => {
                            showSectionVariable(true);
                            setDataView(pE_Im);
                        }}
                    />
                </Flex>
            </FormControl>
            <FormControl display="flex" alignItems="center">
                <Flex w="50%" justifyContent="space-between">
                    <span>pE_Icr</span>
                    <NumberInputVariableDependent
                        value={pE_Icr.val}
                        setValue={setParameters}
                        nameParams="pE_Icr"
                        name="pE_Icr"
                        description="Fraction of E that turn into Icr"
                        step={0.01}
                        min={0}
                        max={1}
                        isDisabled={isEnableIconButton[11]}
                    />
                </Flex>
                <Flex alignItems="center" w="50%" justifyContent="flex-end">
                    <span>Set function</span>
                    <Switch
                        ml="0.5rem"
                        isChecked={isEnableIconButton[11]}
                        onChange={(e) => {
                            setIsEnableIconButton([
                                ...isEnableIconButton.slice(0, 11),
                                e.target.checked,
                            ]);
                            if (!e.target.checked) {
                                showSectionVariable(false);
                            }
                            setParameters({
                                type: "switch",
                                target: "pE_Icr",
                                switch: e.target.checked,
                            });
                        }}
                    />

                    <IconButton
                        fill="white"
                        bg="#FFFFFF"
                        color="#16609E"
                        aria-label="Call Segun"
                        size="sm"
                        isDisabled={!isEnableIconButton[11]}
                        cursor="pointer"
                        icon={<FunctionIcon />}
                        ml="1rem"
                        onClick={() => {
                            showSectionVariable(true);
                            setDataView(pE_Icr);
                        }}
                    />
                </Flex>
            </FormControl>
        </>
    );
};

export default PEImNumberInput;
