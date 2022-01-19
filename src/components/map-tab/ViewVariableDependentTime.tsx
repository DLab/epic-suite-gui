import { CloseIcon } from "@chakra-ui/icons";
import {
    Box,
    Flex,
    Heading,
    IconButton,
    Input,
    Select,
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
        <Box
            px="10"
            py="1rem"
            border="2px"
            borderRadius={10}
            borderColor="gray.200"
        >
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
                <Text key={createIdComponent()}>
                    range: {i + 1} init: {range[0]} end: {range[1]} type
                    Function: {data.type[i].name} Default: {data.default}
                </Text>
            ))}
        </Box>
    );
};

export default ViewVariableDependentTime;
