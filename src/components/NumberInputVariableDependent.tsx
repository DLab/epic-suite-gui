import {
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
} from "@chakra-ui/react";

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
}

const NumberInputVariableDependent = ({
    value,
    setValue,
    nameParams,
    step,
    max = Infinity,
    min = 0,
    isDisabled,
    name,
    description,
}: Props) => {
    const handleChange = (val: string | number) => {
        // if (+val <= max && +val >= min) {
        setValue({
            type: "setVariableDependent",
            payloadVariableDependent: {
                rangeDays: [[0, 500]],
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
            target: nameParams,
        });
        // }
    };
    return (
        <>
            <NumberInput
                maxW="60px"
                mr="1rem"
                // defaultValue={value}
                value={value}
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
        </>
    );
};

export default NumberInputVariableDependent;
