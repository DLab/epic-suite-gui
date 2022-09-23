import { Radio, RadioGroup, Stack } from "@chakra-ui/react";
import React, { useContext } from "react";

import { DataFit } from "context/DataFitContext";

import getExampleData from "./exampleData";

interface Props {
    value: string;
    setValue: (value: string) => void;
    setDataValues: (value: unknown[]) => void;
}

const SampleSource = ({ value, setValue, setDataValues }: Props) => {
    const { setRealDataToFit } = useContext(DataFit);

    /**
     * Returns the saved sample data.
     * @param {string} exampleValue indicates which data to use.
     */
    const getData = (exampleValue) => {
        const data = getExampleData(exampleValue);
        const jsObject = JSON.parse(data.I_d_data);

        const dataForAlgorithm = Object.values(jsObject);

        setDataValues(dataForAlgorithm);
        setRealDataToFit([
            {
                I_d_data: jsObject,
                name: "dataFit",
            },
        ]);
    };
    return (
        <RadioGroup
            size="sm"
            ml="5%"
            mb="3%"
            value={value}
            onChange={(e) => {
                setValue(e);
                getData(e);
            }}
        >
            <Stack direction="column">
                {/* <Radio value="1">Real Data example 1</Radio>
                <Radio value="2">Real Data example 2</Radio> */}
                <Radio value="example3">Synthetic Data example 1</Radio>
                {/* <Radio value="4">Synthetic Data example 2</Radio> */}
            </Stack>
        </RadioGroup>
    );
};

export default SampleSource;
