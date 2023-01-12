import {
    Box,
    Flex,
    FormControl,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Text,
} from "@chakra-ui/react";
import React from "react";

interface Props {
    numberInputName: string;
    value?: number;
    setValue?: (value: number) => void;
}

const NumberInputMobilityMatrix = ({
    numberInputName,
    value,
    setValue,
}: Props) => {
    return (
        <Flex alignItems="center">
            {/* <FormControl display="flex" alignItems="center"> */}
            {/* <Flex w="50%" h="2rem" alignItems="center"> */}
            <Box>
                <Text
                    align="left"
                    fontSize="14px"
                    mr="7px"
                    // color={isDisabled && "gray.200"}
                >
                    {numberInputName}
                </Text>
            </Box>
            <NumberInput
                // maxH="20px"
                maxW="75px"
                value={value}
                // mx="0.2rem"
                // fontSize="11px"
                // defaultValue={value}
                onChange={(e) => {
                    setValue(+e);
                }}
                size="sm"
                min={0}
                // max={max}
                step={1}
                // isDisabled
            >
                <NumberInputField borderRadius="6px" />
                <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>
            {/* </Flex>
            </FormControl> */}
        </Flex>
    );
};

export default NumberInputMobilityMatrix;
