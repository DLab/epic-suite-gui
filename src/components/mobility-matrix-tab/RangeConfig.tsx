import { Box, Flex, Select, Switch, Text, Input } from "@chakra-ui/react";
import React from "react";

const RangeConfig = () => {
    return (
        <Flex
            display="grid"
            gridTemplateColumns="auto auto auto auto"
            gridGap="15px"
            alignItems="center"
            mb="15px"
        >
            <Input size="sm" borderRadius="6px" />
            <Input size="sm" borderRadius="6px" />
            <Select
                size="sm"
                mr="15px"
                placeholder="Intervention"
                borderRadius="8px"
            >
                <option key="dd" value={0}>
                    Option 1
                </option>
            </Select>{" "}
            <Input size="sm" />
        </Flex>
    );
};

export default RangeConfig;
