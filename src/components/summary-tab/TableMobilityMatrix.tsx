import {
    Table,
    Thead,
    Tbody,
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
import React, { useContext } from "react";

import { MobilityMatrix } from "context/MobilityMatrixContext";
import { NewModelSetted } from "context/NewModelsContext";
import { TabIndex } from "context/TabContext";
import { MobilityModes } from "types/MobilityMatrixTypes";
import { NewModelsAllParams } from "types/SimulationTypes";

const TableMobilityMatrix = () => {
    const {
        setMatrixMode,
        mobilityMatrixList,
        setIdMatrixModel,
        setIdMobilityMatrixUpdate,
        setOriginOfMatrixCreation,
    } = useContext(MobilityMatrix);
    const { setIndex } = useContext(TabIndex);
    const { completeModel } = useContext(NewModelSetted);

    const getModelName = (id) => {
        const model = completeModel.find(
            (matrixModel: NewModelsAllParams) => matrixModel.idNewModel === id
        );
        if (model) {
            return model.name;
        }
        return "no name";
    };

    return (
        <Flex direction="column" gridColumn="4/6">
            <Text fontSize="24px" fontWeight={600} mb="5px">
                Mobility Matrix
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
                                Name
                            </Th>
                            <Th
                                textAlign="center"
                                color="#016FB9"
                                textTransform="capitalize"
                                fontSize="16px"
                            >
                                Model
                            </Th>
                            <Th />
                        </Tr>
                    </Thead>
                    <Tbody>
                        {mobilityMatrixList.map((matrix) => {
                            return (
                                <Tr key={matrix.id}>
                                    <Td>{matrix.nameMobilityMatrix}</Td>
                                    <Td>{getModelName(matrix.modelId)}</Td>
                                    <Td>
                                        <Icon
                                            w="20px"
                                            h="20px"
                                            as={ArrowRightCircleIcon}
                                            color="#1B1B3A"
                                            onClick={() => {
                                                setIdMatrixModel(
                                                    matrix.modelId
                                                );
                                                setIdMobilityMatrixUpdate(
                                                    matrix.id
                                                );
                                                setMatrixMode(
                                                    MobilityModes.Update
                                                );
                                                setOriginOfMatrixCreation(
                                                    "summaryTab"
                                                );
                                                setIndex(5);
                                            }}
                                        />
                                    </Td>
                                </Tr>
                            );
                        })}
                    </Tbody>
                    <TableCaption textAlign="start" m="5px 0">
                        <Button
                            size="sm"
                            fontSize="10px"
                            bg="#016FB9"
                            color="#FFFFFF"
                            onClick={() => {
                                setMatrixMode(MobilityModes.Add);
                                setIndex(5);
                            }}
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

export default TableMobilityMatrix;
