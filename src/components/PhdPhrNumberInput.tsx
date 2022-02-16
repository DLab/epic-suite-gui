/* eslint-disable @typescript-eslint/naming-convention */
import { FormControl, Flex, Switch, IconButton } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";

import { ControlPanel } from "context/ControlPanelContext";
import VariableDependentTime, {
    NameFunction,
} from "types/VariableDependentTime";

import FunctionIcon from "./icons/FunctionIcon";
import NumberInputVariableDependent from "./NumberInputVariableDependent";

interface Props {
    showSectionVariable: (values: boolean) => void;
    setDataView: (values: VariableDependentTime) => void;
    isEnableIconButton: boolean[];
    setIsEnableIconButton: (values: boolean[]) => void;
}

const PhdPhrNumberInput = ({
    showSectionVariable,
    setDataView,
    isEnableIconButton,
    setIsEnableIconButton,
}: Props) => {
    const {
        setParameters,
        parameters: { pIv_R, pIv_H, pH_R, pH_D },
    } = useContext(ControlPanel);

    useEffect(() => {
        const pHR = pH_R.val.toString();
        const pHRRound = Number(1 - parseFloat(pHR)).toFixed(2);
        setParameters({
            type: "setVariableDependent",
            payloadVariableDependent: {
                rangeDays: [[0, 500]],
                type: [
                    {
                        name: NameFunction.static,
                        value: Number(pHRRound),
                    },
                ],
                name: "pH_D",
                default: 7,
                isEnabled: false,
                val: Number(pHRRound),
            },
            target: "pH_D",
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pH_R.val]);

    useEffect(() => {
        const pHD = pH_D.val.toString();
        const pHDRound = Number(1 - parseFloat(pHD)).toFixed(2);
        setParameters({
            type: "setVariableDependent",
            payloadVariableDependent: {
                rangeDays: [[0, 500]],
                type: [
                    {
                        name: NameFunction.static,
                        value: Number(pHDRound),
                    },
                ],
                name: "pH_R",
                default: 7,
                isEnabled: false,
                val: Number(pHDRound),
            },
            target: "pH_R",
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pH_D.val]);

    return (
        <>
            <FormControl display="flex" alignItems="center">
                <Flex w="50%" justifyContent="space-between">
                    <span>pH_R</span>
                    <NumberInputVariableDependent
                        value={pH_R.val}
                        setValue={setParameters}
                        nameParams="pH_R"
                        name="pH_R"
                        description="Fraction of H that turn into R"
                        step={0.01}
                        min={0}
                        max={1}
                        isDisabled={isEnableIconButton[20]}
                    />
                </Flex>
                <Flex alignItems="center" w="50%" justifyContent="flex-end">
                    <span>Set function</span>
                    <Switch
                        ml="0.5rem"
                        isChecked={isEnableIconButton[20]}
                        onChange={(e) => {
                            setIsEnableIconButton([
                                ...isEnableIconButton.slice(0, 20),
                                e.target.checked,
                                ...isEnableIconButton.slice(21),
                            ]);
                            if (!e.target.checked) {
                                showSectionVariable(false);
                            }
                            setParameters({
                                type: "switch",
                                target: "pH_R",
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
                        isDisabled={!isEnableIconButton[20]}
                        cursor="pointer"
                        icon={<FunctionIcon />}
                        ml="1rem"
                        onClick={() => {
                            showSectionVariable(true);
                            setDataView(pH_R);
                        }}
                    />
                </Flex>
            </FormControl>
            <FormControl display="flex" alignItems="center">
                <Flex w="50%" justifyContent="space-between">
                    <span>pH_D</span>
                    <NumberInputVariableDependent
                        value={pH_D.val}
                        setValue={setParameters}
                        nameParams="pH_D"
                        name="pH_D"
                        description="Fraction of H that turn into D"
                        step={0.01}
                        min={0}
                        max={1}
                        isDisabled={isEnableIconButton[22]}
                    />
                </Flex>
                <Flex alignItems="center" w="50%" justifyContent="flex-end">
                    <span>Set function</span>
                    <Switch
                        ml="0.5rem"
                        isChecked={isEnableIconButton[22]}
                        onChange={(e) => {
                            setIsEnableIconButton([
                                ...isEnableIconButton.slice(0, 22),
                                e.target.checked,
                            ]);
                            if (!e.target.checked) {
                                showSectionVariable(false);
                            }
                            setParameters({
                                type: "switch",
                                target: "pH_D",
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
                        isDisabled={!isEnableIconButton[22]}
                        cursor="pointer"
                        icon={<FunctionIcon />}
                        ml="1rem"
                        onClick={() => {
                            showSectionVariable(true);
                            setDataView(pH_D);
                        }}
                    />
                </Flex>
            </FormControl>
        </>
    );
};

export default PhdPhrNumberInput;
