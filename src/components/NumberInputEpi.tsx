/* eslint-disable complexity */
import { CheckIcon, CloseIcon, InfoIcon } from "@chakra-ui/icons";
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
    IconButton,
} from "@chakra-ui/react";
import { duration } from "moment";
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
    type: string;
    isInitialParameters?: boolean;
    isDisabled?: boolean;
    name?: string;
    index?: number;
    isStateLocal?: boolean;
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
    index,
    isStateLocal = false,
}: Props) => {
    const [localValue, setLocalValue] = useState<string>(`${value}`);
    const [isEditingLocalValue, setIsEditingLocalValue] =
        useState<boolean>(false);
    const handleChange = (val: string | number) => {
        if (isStateLocal) {
            setIsEditingLocalValue(true);
            setLocalValue(`${val}`);
        } else {
            setValue({ type: "set", payload: val, target: nameParams });
        }
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
            </Flex>
            <Flex mb="0.5rem">
                {type === "slider" && (
                    <>
                        <NumberInput
                            maxW="70px"
                            mr="1rem"
                            // defaultValue={+value}
                            onChange={handleChange}
                            size="xs"
                            min={+min}
                            max={+max}
                            step={step}
                            value={!isStateLocal ? value : localValue}
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
                            value={!isStateLocal ? +value : +localValue}
                            step={step}
                            min={+min}
                            max={+max}
                            onChange={handleChange}
                        >
                            <SliderTrack>
                                <SliderFilledTrack />
                            </SliderTrack>
                            <SliderThumb fontSize="sm" boxSize="32px">
                                {!isStateLocal ? +value : +localValue}
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
                        size="xs"
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
                        size="xs"
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
                {isStateLocal && isEditingLocalValue && (
                    <>
                        <IconButton
                            ml="2rem"
                            bg="white"
                            border="thin"
                            color="teal.500"
                            aria-label="Check date range button"
                            size="xs"
                            cursor="pointer"
                            icon={<CheckIcon />}
                            onClick={() => {
                                setValue({
                                    type: "set",
                                    payload: +localValue,
                                    target: nameParams,
                                    positionVariableDependentTime: index,
                                });
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
        </>
    );
};

export default NumberInputEpi;
