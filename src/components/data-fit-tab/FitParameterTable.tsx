import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
} from "@chakra-ui/react";
import React, { useContext } from "react";

import { DataFit } from "context/DataFitContext";

// interface Props {
//     param: string;
// }

const FitParameterTable = () => {
    const { fittedData } = useContext(DataFit);
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
                        <Td>0 - 50</Td>
                        <Td>0.2</Td>
                    </Tr>
                    <Tr>
                        <Td>50 - 65</Td>
                        <Td>0.3</Td>
                    </Tr>
                    <Tr>
                        <Td>65 - 80</Td>
                        <Td>0.1499</Td>
                    </Tr>
                    <Tr>
                        <Td>65 - 500</Td>
                        <Td>0.4001</Td>
                    </Tr>
                </Tbody>
            </Table>
        </TableContainer>
    );
};

export default FitParameterTable;
