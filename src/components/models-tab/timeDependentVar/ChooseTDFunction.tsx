import {
    Flex,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Radio,
    RadioGroup,
    Stack,
    Text,
} from "@chakra-ui/react";

import createIdComponent from "utils/createIdcomponent";

interface InputTDFunctionProps {
    label: string;
    value: string | number;
    onChange: (e: string | number) => void;
    precision?: number;
    isDisabled?: boolean;
    min?: number;
    max?: number;
    step?: number;
    isInvalid?: boolean;
}
interface LabelWithChildrenProps {
    label: string;
    children: React.ReactNode;
}

export function InputTDFunction({
    label,
    value,
    onChange,
    precision = 0,
    isDisabled = false,
    min = 0,
    max = Infinity,
    step = 0.01,
    isInvalid = false,
}: InputTDFunctionProps) {
    return (
        <>
            {label}
            <NumberInput
                size="xs"
                value={value}
                onChange={onChange}
                w="35%"
                min={min}
                max={max}
                step={step}
                isInvalid={isInvalid}
                precision={precision}
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
}

interface CustomInputProps
    extends Pick<InputTDFunctionProps, "value" | "onChange"> {
    label: string;
    defaultValue: string | number;
    radioValueOptions: Array<{ key: string; val: string | number }>;
}

export function RadioInputTDFunction({
    label,
    defaultValue,
    value,
    onChange,
    radioValueOptions,
}: CustomInputProps) {
    return (
        <>
            {label}
            <RadioGroup
                defaultValue={`${defaultValue}`}
                value={`${value}`}
                onChange={onChange}
            >
                <Stack direction="row">
                    {radioValueOptions.map(({ key, val }) => (
                        <Radio key={createIdComponent()} value={`${val}`}>
                            {key}
                        </Radio>
                    ))}
                </Stack>
            </RadioGroup>
        </>
    );
}

export function ChooseTDFunction({ label, children }: LabelWithChildrenProps) {
    return (
        <Flex direction="column">
            <Text>{label}</Text>
            {children}
        </Flex>
    );
}
