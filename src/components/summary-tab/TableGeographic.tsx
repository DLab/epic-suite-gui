import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Flex,
    Text,
    Icon,
    Button,
} from "@chakra-ui/react";
import { ArrowRightCircleIcon, PlusIcon } from "@heroicons/react/24/outline";
import React from "react";

const TableGeographic = () => {
    return (
        <Flex direction="column" gridColumn="4/6">
            <Text fontSize="24px" fontWeight={600} mb="5px">
                Geographic selection
            </Text>
            <TableContainer border="1px solid #DDDDDD" borderRadius="8px">
                <Table>
                    <Thead>
                        <Tr>
                            <Th
                                textAlign="center"
                                color="#016FB9"
                                textTransform="capitalize"
                                fontSize="16px"
                            >
                                Selection
                            </Th>
                            <Th
                                textAlign="center"
                                color="#016FB9"
                                textTransform="capitalize"
                                fontSize="16px"
                            >
                                Scale
                            </Th>
                            <Th />
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td textAlign="center">West coast</Td>
                            <Td textAlign="center">States</Td>
                            <Td>
                                <Icon
                                    w="20px"
                                    h="20px"
                                    as={ArrowRightCircleIcon}
                                    color="#1B1B3A"
                                />
                            </Td>
                        </Tr>
                        <Tr>
                            <Td textAlign="center">East coast</Td>
                            <Td textAlign="center">States</Td>
                            <Td>
                                <Icon
                                    w="20px"
                                    h="20px"
                                    as={ArrowRightCircleIcon}
                                    color="#1B1B3A"
                                />
                            </Td>
                        </Tr>
                    </Tbody>
                    <TableCaption textAlign="start" m="5px 0">
                        <Button
                            size="sm"
                            fontSize="10px"
                            bg="#016FB9"
                            color="#FFFFFF"
                        >
                            <Icon w="14px" h="14px" as={PlusIcon} mr="5px" />
                            ADD NEW
                        </Button>
                    </TableCaption>
                </Table>
            </TableContainer>
        </Flex>
    );
};

export default TableGeographic;
