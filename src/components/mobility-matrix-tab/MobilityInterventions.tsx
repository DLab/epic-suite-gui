import { Box, Flex, Select, Switch, Text, Input } from "@chakra-ui/react";
import React from "react";

import RangeConfig from "./RangeConfig";

const MobilityInterventions = () => {
    return (
        <Flex direction="column" mt="15px">
            {/* <Select size="sm" mr="15px" placeholder="Modulation options">
                <option key="dd" value={0}>
                    Option 1
                </option>
            </Select> */}
            <Flex direction="column" justifyContent="space-between" mb="10px">
                <Text fontSize="16px" fontWeight={700} mb="15px">
                    Intervention day
                </Text>
                <Flex>
                    <Text fontSize="14px">Range</Text>
                    <Text fontSize="14px">+Add new</Text>
                </Flex>
            </Flex>
            <RangeConfig />
            <RangeConfig />
        </Flex>
    );
};

export default MobilityInterventions;
