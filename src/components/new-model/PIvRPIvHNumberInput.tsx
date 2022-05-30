/* eslint-disable @typescript-eslint/naming-convention */
import { FormControl, Flex, Switch, IconButton } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";

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

const PIvRPIvHNumberInput = ({
    showSectionVariable,
    setDataView,
    isEnableIconButton,
    setIsEnableIconButton,
}: Props) => {
    const {
        setParameters,
        parameters: { pIv_R, pIv_H },
    } = useContext(ControlPanel);

    useEffect(() => {
        const pIvR = pIv_R.val.toString();
        const pIvRRound = Number(1 - parseFloat(pIvR)).toFixed(2);
        setParameters({
            type: "setVariableDependent",
            payloadVariableDependent: {
                rangeDays: [[0, 500]],
                type: [
                    {
                        name: NameFunction.static,
                        value: Number(pIvRRound),
                    },
                ],
                name: "pIv_H",
                default: 7,
                isEnabled: false,
                val: Number(pIvRRound),
            },
            target: "pIv_H",
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pIv_R.val]);

    useEffect(() => {
        const pIvH = pIv_H.val.toString();
        const pIvHRound = Number(1 - parseFloat(pIvH)).toFixed(2);
        setParameters({
            type: "setVariableDependent",
            payloadVariableDependent: {
                rangeDays: [[0, 500]],
                type: [
                    {
                        name: NameFunction.static,
                        value: Number(pIvHRound),
                    },
                ],
                name: "pIv_R",
                default: 7,
                isEnabled: false,
                val: Number(pIvHRound),
            },
            target: "pIv_R",
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pIv_H.val]);

    return (
        <>
            <FormControl display="flex" alignItems="center">
                <Flex w="50%" justifyContent="space-between">
                    <span>pIv_R</span>
                    <NumberInputVariableDependent
                        value={pIv_R.val}
                        setValue={setParameters}
                        nameParams="pIv_R"
                        name="pIv_R"
                        description="Fraction of Iv that turn into R"
                        step={0.01}
                        min={0}
                        max={1}
                        isDisabled={isEnableIconButton[16]}
                    />
                </Flex>
                <Flex alignItems="center" w="50%" justifyContent="flex-end">
                    <span>Set function</span>
                    <Switch
                        ml="0.5rem"
                        isChecked={isEnableIconButton[16]}
                        onChange={(e) => {
                            setIsEnableIconButton([
                                ...isEnableIconButton.slice(0, 16),
                                e.target.checked,
                                ...isEnableIconButton.slice(17),
                            ]);
                            if (!e.target.checked) {
                                showSectionVariable(false);
                            }
                            setParameters({
                                type: "switch",
                                target: "pIv_R",
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
                        isDisabled={!isEnableIconButton[16]}
                        cursor="pointer"
                        icon={<FunctionIcon />}
                        ml="1rem"
                        onClick={() => {
                            showSectionVariable(true);
                            setDataView(pIv_R);
                        }}
                    />
                </Flex>
            </FormControl>
            <FormControl display="flex" alignItems="center">
                <Flex w="50%" justifyContent="space-between">
                    <span>pIv_H</span>
                    <NumberInputVariableDependent
                        value={pIv_H.val}
                        setValue={setParameters}
                        nameParams="pIv_H"
                        name="pIv_H"
                        description="Fraction of Iv that turn into H"
                        step={0.01}
                        min={0}
                        max={1}
                        isDisabled={isEnableIconButton[18]}
                    />
                </Flex>
                <Flex alignItems="center" w="50%" justifyContent="flex-end">
                    <span>Set function</span>
                    <Switch
                        ml="0.5rem"
                        isChecked={isEnableIconButton[18]}
                        onChange={(e) => {
                            setIsEnableIconButton([
                                ...isEnableIconButton.slice(0, 18),
                                e.target.checked,
                                ...isEnableIconButton.slice(19),
                            ]);
                            if (!e.target.checked) {
                                showSectionVariable(false);
                            }
                            setParameters({
                                type: "switch",
                                target: "pIv_H",
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
                        isDisabled={!isEnableIconButton[18]}
                        cursor="pointer"
                        icon={<FunctionIcon />}
                        ml="1rem"
                        onClick={() => {
                            showSectionVariable(true);
                            setDataView(pIv_H);
                        }}
                    />
                </Flex>
            </FormControl>
        </>
    );
};

export default PIvRPIvHNumberInput;
