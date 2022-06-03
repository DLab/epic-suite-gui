import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
} from "@chakra-ui/react";
import React from "react";

const FitParameterTable = () => {
    return (
        <TableContainer>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>Interval [days]</Th>
                        <Th>Values</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td>0 - 10</Td>
                        <Td>0.5</Td>
                    </Tr>
                    <Tr>
                        <Td>0 - 15</Td>
                        <Td>0.6</Td>
                    </Tr>
                    <Tr>
                        <Td>15 - 20</Td>
                        <Td>0.3</Td>
                    </Tr>
                </Tbody>
            </Table>
        </TableContainer>
    );
};

export default FitParameterTable;
