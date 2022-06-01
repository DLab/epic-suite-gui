import {
    Button,
    Center,
    Checkbox,
    Flex,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";

import { NewModelSetted } from "context/NewModelsContext";
import { NewModelsParams } from "types/SimulationTypes";
import createIdComponent from "utils/createIdcomponent";

type ReducedIdForPermissions = Record<number, boolean>;

const TableSimulations = () => {
    const { newModel } = useContext(NewModelSetted);
    const [permission, setPermission] = useState<ReducedIdForPermissions>({});
    useEffect(() => {
        if (newModel.length > 0) {
            setPermission(
                newModel
                    .map((elem: NewModelsParams) => {
                        return {
                            [elem.idNewModel]: false,
                        };
                    })
                    .reduce<ReducedIdForPermissions>(
                        (acc, current) => ({
                            ...acc,
                            ...current,
                        }),
                        {}
                    )
            );
        }
    }, [newModel]);

    return newModel.length > 0 ? (
        <>
            <TableContainer bg="white" maxH="60vh">
                <Table size="lg" variant="striped" colorScheme="linkedin">
                    <TableCaption>Models display</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Selected</Th>
                            <Th>Model</Th>
                            <Th>Compartments</Th>
                            <Th>Nodes</Th>
                            <Th>Data source</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {newModel.map((elem) => (
                            <Tr key={createIdComponent()}>
                                <Td>
                                    <Checkbox
                                        isDisabled={
                                            elem.populationType ===
                                            "Metapopulation"
                                        }
                                        isChecked={permission[elem.idNewModel]}
                                        onChange={(e) => {
                                            setPermission({
                                                ...permission,
                                                [elem.idNewModel]:
                                                    e.target.checked,
                                            });
                                        }}
                                    />
                                </Td>
                                <Td>{elem.name ?? "asdf"}</Td>
                                <Td>{elem.modelType ?? "asdf"}</Td>
                                <Td>{elem.populationType ?? "asdf"}</Td>
                                <Td>{elem.typeSelection ?? "asdf"}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
            <Center mt="1rem">
                <Button>Run</Button>
            </Center>
        </>
    ) : (
        <Flex>There's not models to simulate</Flex>
    );
};

export default TableSimulations;
