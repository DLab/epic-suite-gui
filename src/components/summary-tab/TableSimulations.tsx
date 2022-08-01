/* eslint-disable sonarjs/no-duplicate-string */
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

import RunButton from "./RunButton";

type ReducedIdForPermissions = Record<number, boolean>;

// eslint-disable-next-line sonarjs/cognitive-complexity
const TableSimulations = () => {
    const { completeModel } = useContext(NewModelSetted);
    const [permission, setPermission] = useState<ReducedIdForPermissions>({});
    const [codMetaModelSelected, setCodMetaModelSelected] = useState<number>(0);
    useEffect(() => {
        if (completeModel.length > 0) {
            setPermission(
                completeModel
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
    }, [completeModel]);

    return completeModel.length > 0 ? (
        <>
            <TableContainer bg="white" maxH="60vh" overflowY="auto">
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
                        {completeModel.map((elem) => {
                            return (
                                <Tr key={createIdComponent()}>
                                    <Td>
                                        <Checkbox
                                            isDisabled={
                                                codMetaModelSelected !== 0 &&
                                                elem.idNewModel !==
                                                    codMetaModelSelected
                                            }
                                            bg="white"
                                            isChecked={
                                                permission[elem.idNewModel]
                                            }
                                            onChange={(e) => {
                                                if (
                                                    elem.populationType ===
                                                        "metapopulation" &&
                                                    e.target.checked
                                                ) {
                                                    const allPermissionsUnenabled =
                                                        Object.keys(permission)
                                                            .map(
                                                                (
                                                                    idPermission
                                                                ) => ({
                                                                    [idPermission]:
                                                                        false,
                                                                })
                                                            )
                                                            .reduce(
                                                                (acc, curr) => {
                                                                    return {
                                                                        ...acc,
                                                                        ...curr,
                                                                    };
                                                                },
                                                                {}
                                                            );
                                                    setPermission({
                                                        ...allPermissionsUnenabled,
                                                        [elem.idNewModel]:
                                                            e.target.checked,
                                                    });
                                                    setCodMetaModelSelected(
                                                        elem.idNewModel
                                                    );
                                                } else {
                                                    if (
                                                        elem.populationType ===
                                                            "metapopulation" &&
                                                        !e.target.checked
                                                    ) {
                                                        setCodMetaModelSelected(
                                                            0
                                                        );
                                                    }
                                                    setPermission({
                                                        ...permission,
                                                        [elem.idNewModel]:
                                                            e.target.checked,
                                                    });
                                                }
                                            }}
                                        />
                                    </Td>
                                    <Td>{elem.name ?? "Not defined yet"}</Td>
                                    <Td>
                                        {elem.modelType.toUpperCase() ??
                                            "Not defined yet"}
                                    </Td>
                                    <Td>
                                        {elem.populationType ??
                                            "Not defined yet"}
                                    </Td>
                                    <Td>
                                        {elem.typeSelection ??
                                            "Not defined yet"}
                                    </Td>
                                </Tr>
                            );
                        })}
                    </Tbody>
                </Table>
            </TableContainer>
            <Center mt="1rem">
                <RunButton permission={permission} />
            </Center>
        </>
    ) : (
        <Flex>There's not models to simulate</Flex>
    );
};

export default TableSimulations;
