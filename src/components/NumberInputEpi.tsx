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
    Box,
} from "@chakra-ui/react";
import { useContext, useState } from "react";

import { ControlPanel } from "context/ControlPanelContext";
import { NameFunction } from "types/VariableDependentTime";

interface Props {
    value: number;
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
    const { setParameters } = useContext(ControlPanel);
    const handleChange = (val: string | number) => {
        if (isStateLocal) {
            setIsEditingLocalValue(true);
            setLocalValue(`${val}`);
        } else {
            setParameters({ type: "set", payload: val, target: nameParams });
        }
    };

    return (
        <>
            <Box minW="30%">
                <Text
                    align="left"
                    fontSize="11px"
                    color={isDisabled && "gray.200"}
                >
                    {name ?? nameParams}
                </Text>
            </Box>
            <Tooltip label={description}>
                <Icon as={InfoIcon} color="teal" />
            </Tooltip>

            {/* {type === "slider" && (
                <>
                    <NumberInput
                        fontSize="11px"
                        maxW="70px"
                        mr="1rem"
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
            )} */}
            {type === "number" && !isInitialParameters && (
                <NumberInput
                    maxH="20px"
                    maxW="75px"
                    mx="0.2rem"
                    fontSize="11px"
                    // defaultValue={value}
                    onChange={handleChange}
                    size="xs"
                    min={0}
                    max={max}
                    step={step}
                    variant="outline"
                    isDisabled
                >
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            )}
            {isInitialParameters && !isStateLocal && (
                <NumberInput
                    maxH="20px"
                    maxW="75px"
                    mx="0.2rem"
                    fontSize="11px"
                    value={value}
                    onChange={handleChange}
                    size="xs"
                    min={min}
                    max={max}
                    step={step}
                    variant="outline"
                >
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            )}
            {isInitialParameters && isStateLocal && (
                <NumberInput
                    maxH="20px"
                    maxW="75px"
                    mx="0.2rem"
                    fontSize="11px"
                    value={localValue}
                    onChange={handleChange}
                    size="xs"
                    min={min}
                    max={max}
                    step={step}
                    variant="outline"
                >
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            )}

            {isStateLocal && isEditingLocalValue && (
                <Flex mt="0.5rem" justifyContent="end">
                    <IconButton
                        bg="white"
                        border="thin"
                        color="teal.500"
                        aria-label="Check date range button"
                        size="xs"
                        cursor="pointer"
                        icon={<CheckIcon />}
                        onClick={() => {
                            setParameters({
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
                </Flex>
            )}
        </>
    );
};

export default NumberInputEpi;
