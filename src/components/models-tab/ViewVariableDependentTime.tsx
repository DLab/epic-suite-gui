import { CloseIcon } from "@chakra-ui/icons";
import {
    Box,
    Flex,
    Heading,
    IconButton,
    Input,
    Select,
    Stat,
    StatGroup,
    StatLabel,
    StatNumber,
    Text,
} from "@chakra-ui/react";

import VariableDependentTime, {
    NameFunction,
} from "types/VariableDependentTime";
import createIdComponent from "utils/createIdcomponent";

type EmptyObject = Record<string, never>;

interface Props {
    data: VariableDependentTime | Record<string, never>;
    close: (value: boolean) => void;
}

const ViewVariableDependentTime = ({ data, close }: Props) => {
    return (
        <Box px="10" py="1rem" borderRadius="6px" boxShadow="sm" bg="#FAFAFA">
            <Heading textAlign="justify">
                <Flex justifyContent="space-between" alignItems="center">
                    {data.name.toLocaleUpperCase()}{" "}
                    <IconButton
                        aria-label="Close Panel"
                        as={CloseIcon}
                        onClick={() => close(false)}
                        size="xs"
                    />
                </Flex>
            </Heading>
            {data.rangeDays.map((range, i) => (
                <StatGroup w="35rem">
                    <Stat>
                        <StatLabel>Range: </StatLabel>
                        <StatNumber>{i + 1}</StatNumber>
                    </Stat>
                    <Stat>
                        <StatLabel>Init: </StatLabel>
                        <StatNumber>{range[0]}</StatNumber>
                    </Stat>
                    <Stat>
                        <StatLabel>End: </StatLabel>
                        <StatNumber>{range[1]}</StatNumber>
                    </Stat>
                    <Stat>
                        <StatLabel>Type Function: </StatLabel>
                        <StatNumber>{data.type[i].name}</StatNumber>
                    </Stat>
                    <Stat>
                        <StatLabel>Default: </StatLabel>
                        <StatNumber>{data.default}</StatNumber>
                    </Stat>
                </StatGroup>
            ))}
        </Box>
    );
};

export default ViewVariableDependentTime;
