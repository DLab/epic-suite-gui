import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import {
    Flex,
    IconButton,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
} from "@chakra-ui/react";
import { setDate } from "date-fns";
import { id } from "date-fns/locale";
import { useState } from "react";

import { NameFunction } from "types/VariableDependentTime";

interface Props {
    value: number;
    setValue: (val: unknown) => void;
    nameParams: string;
    description: string;
    step?: number;
    max?: number;
    min?: number;
    isDisabled?: boolean;
    name?: string;
    index?: number;
    isStateLocal?: boolean;
    duration?: number;
    isSupplementary?: boolean;
    supplementaryParam?: string;
}

const NumberInputVariableDependent = ({
    value,
    setValue,
    nameParams,
    step,
    max = Infinity,
    min = 0,
    isDisabled,
    index,
    isStateLocal = false,
    name,
    description,
    duration,
    isSupplementary = false,
    supplementaryParam,
}: Props) => {
    const [localValue, setLocalValue] = useState<string>(`${value}`);
    const [isEditingLocalValue, setIsEditingLocalValue] =
        useState<boolean>(false);
    const handleChange = (val: string | number) => {
        if (isStateLocal) {
            setIsEditingLocalValue(true);
            setLocalValue(`${val}`);
        } else {
            setValue({
                type: "setVariableDependent",
                payloadVariableDependent: {
                    rangeDays: [[0, duration]],
                    type: [
                        {
                            name: NameFunction.static,
                            value: +val,
                        },
                    ],
                    name: nameParams,
                    default: 7,
                    isEnabled: false,
                    val,
                },
                positionVariableDependentTime: index ?? -1,
                target: nameParams,
            });
        }
    };
    return (
        <Flex>
            <NumberInput
                maxW="80px"
                mx="0.2rem"
                fontSize="14px"
                // defaultValue={value}
                value={!isStateLocal ? value : localValue}
                onChange={handleChange}
                size="xs"
                min={min}
                max={max}
                step={step}
                variant="outline"
                isDisabled={isDisabled}
            >
                <NumberInputField />
                <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>
            {isStateLocal && isEditingLocalValue && (
                <>
                    <IconButton
                        bg="white"
                        border="thin"
                        color="teal.500"
                        aria-label="Check date range button"
                        size="xs"
                        cursor="pointer"
                        icon={<CheckIcon />}
                        onClick={() => {
                            setValue({
                                type: "setVariableDependent",
                                payloadVariableDependent: {
                                    rangeDays: [[0, duration]],
                                    type: [
                                        {
                                            name: NameFunction.static,
                                            value: +localValue,
                                        },
                                    ],
                                    name: nameParams,
                                    default: 7,
                                    isEnabled: false,
                                    val: +localValue,
                                },
                                positionVariableDependentTime: index ?? -1,
                                target: nameParams,
                            });
                            if (isSupplementary) {
                                const param = localValue;
                                const supplementaryValueFromParam = Number(
                                    1 - parseFloat(param)
                                ).toFixed(2);
                                setValue({
                                    type: "setVariableDependent",
                                    payloadVariableDependent: {
                                        rangeDays: [[0, duration]],
                                        type: [
                                            {
                                                name: NameFunction.static,
                                                value: +supplementaryValueFromParam,
                                            },
                                        ],
                                        name: supplementaryParam,
                                        default: 7,
                                        isEnabled: false,
                                        val: +supplementaryValueFromParam,
                                    },
                                    positionVariableDependentTime: index ?? -1,
                                    target: supplementaryParam,
                                });
                            }
                            setIsEditingLocalValue(false);
                        }}
                    />
                    <IconButton
                        bg="white"
                        color="red.500"
                        aria-label="Cancel date range button"
                        size="xs"
                        cursor="pointer"
                        icon={<CloseIcon />}
                        onClick={() => {
                            setIsEditingLocalValue(false);
                            setLocalValue(`${value}`);
                        }}
                    />
                </>
            )}
        </Flex>
    );
};

export default NumberInputVariableDependent;
