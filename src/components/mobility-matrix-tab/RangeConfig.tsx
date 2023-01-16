import { Flex, Select, Input } from "@chakra-ui/react";
import React, { useState } from "react";

import { InterventionsTypes } from "types/MobilityMatrixTypes";

interface Props {
    interventionData: InterventionsTypes;
}

const RangeConfig = ({ interventionData }: Props) => {
    const { id, startRange, endRange, intervention, value } = interventionData;
    const [interventionType, setInterventionType] = useState(intervention);
    const [startValue, setStartValue] = useState(startRange);
    const [endValue, setEndValue] = useState(endRange);
    const [decreaseValue, setDecreaseValue] = useState(value);
    return (
        <Flex
            display="grid"
            gridTemplateColumns="auto auto auto auto"
            gridGap="15px"
            alignItems="center"
            mb="15px"
        >
            <Input
                size="sm"
                borderRadius="6px"
                value={startValue}
                onChange={(e) => {
                    setStartValue(+e.target.value);
                }}
            />
            <Input
                size="sm"
                borderRadius="6px"
                value={endValue}
                onChange={(e) => {
                    setEndValue(+e.target.value);
                }}
            />
            <Select
                size="sm"
                mr="15px"
                placeholder="Intervention"
                borderRadius="8px"
                value={interventionType}
                onChange={(e) => {
                    setInterventionType(e.target.value);
                }}
            >
                <option key="decrease" value="decrease">
                    Decrease mobility
                </option>
                <option key="quarantine" value="quarantine">
                    Quarantine
                </option>
            </Select>{" "}
            {interventionType === "decrease" && (
                <Input
                    size="sm"
                    value={decreaseValue}
                    onChange={(e) => {
                        setDecreaseValue(+e.target.value);
                    }}
                />
            )}
        </Flex>
    );
};

export default RangeConfig;
