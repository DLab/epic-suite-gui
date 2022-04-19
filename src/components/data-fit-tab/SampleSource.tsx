import { Radio, RadioGroup, Stack } from "@chakra-ui/react";
import React from "react";

interface Props {
    value: string;
    setValue: (value: string) => void;
}

const SampleSource = ({ value, setValue }: Props) => {
    return (
        <RadioGroup
            size="sm"
            value={value}
            onChange={(e) => {
                setValue(e);
            }}
        >
            <Stack direction="column">
                <Radio value="1">Real Data example 1</Radio>
                <Radio value="2">Real Data example 2</Radio>
                <Radio value="3">Synthetic Data example 1</Radio>
                <Radio value="4">Synthetic Data example 2</Radio>
            </Stack>
        </RadioGroup>
    );
};

export default SampleSource;
