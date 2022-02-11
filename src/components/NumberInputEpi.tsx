import { InfoIcon } from "@chakra-ui/icons";
import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Flex,
    Slider,
    SliderFilledTrack,
    SliderTrack,
    SliderThumb,
    Text,
    Tooltip,
    Icon,
} from "@chakra-ui/react";

import VariableTimeDepenentButton from "./simulator/controllers/VariableTimeDependentButton";

interface Props {
    value: number;
    setValue: (val: unknown) => void;
    nameParams: string;
    description: string;
    step?: number;
    max?: number;
    min?: number;
    type: string;
    isInitialParameters?: boolean;
    isDisabled?: boolean;
    name?: string;
}

const NumberInputEpi = ({
    value,
    setValue,
    nameParams,
    step,
    max = Infinity,
    min = 0,
    type,
    isInitialParameters,
    isDisabled,
    name,
    description,
}: Props) => {
    const handleChange = (val: string | number) => {
        // if (val <= max && val >= min) {
        //     setValue({ type: "set", payload: +val, target: nameParams });
        // }
        setValue({ type: "set", payload: val, target: nameParams });
    };

    return (
        <>
            <Flex align="center">
                <Text
                    align="left"
                    fontSize="14px"
                    color={isDisabled && "gray.200"}
                >
                    {name ?? nameParams}
                </Text>
                <Tooltip label={description}>
                    <Icon as={InfoIcon} ml="10%" w="14px " color="teal" />
                </Tooltip>
                {!isInitialParameters && (
                    <VariableTimeDepenentButton name={name ?? nameParams} />
                )}
            </Flex>
            <Flex mb="0.5rem">
                {type === "slider" && (
                    <>
                        <NumberInput
                            maxW="70px"
                            mr="1rem"
                            // defaultValue={+value}
                            onChange={handleChange}
                            size="sm"
                            min={+min}
                            max={+max}
                            step={step}
                            value={value}
                        >
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                        <Slider
                            flex="1"
                            focusThumbOnChange={false}
                            // defaultValue={+value}
                            id="slider-number-input"
                            value={+value}
                            step={step}
                            min={+min}
                            max={+max}
                            onChange={handleChange}
                        >
                            <SliderTrack>
                                <SliderFilledTrack />
                            </SliderTrack>
                            <SliderThumb fontSize="sm" boxSize="32px">
                                {value}
                            </SliderThumb>
                        </Slider>
                    </>
                )}
                {type === "number" && !isInitialParameters && (
                    <NumberInput
                        maxW="70px"
                        mr="1rem"
                        // defaultValue={value}
                        onChange={handleChange}
                        size="sm"
                        min={0}
                        max={max}
                        step={step}
                        variant="filled"
                        isDisabled
                    >
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                )}
                {isInitialParameters && (
                    <NumberInput
                        maxW="120px"
                        mr="1rem"
                        value={value}
                        onChange={handleChange}
                        size="sm"
                        min={min}
                        max={max}
                        step={step}
                    >
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                )}
            </Flex>
        </>
    );
};

export default NumberInputEpi;
