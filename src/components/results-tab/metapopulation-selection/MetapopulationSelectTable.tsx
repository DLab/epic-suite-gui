import {
    Checkbox,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import React, { useState } from "react";

type ReducerForMetapopulationSelections = Record<number, boolean>;

const MetapopulationSelectTable = () => {
    const [checkList, setCheckList] =
        useState<ReducerForMetapopulationSelections>({});
    // const paramsSelected = {
    //     geo1: [
    //         {
    //             id: "I_d-geo1",
    //             paramName: "I_d",
    //             selected: false,
    //         },
    //         {
    //             id: "Iac-geo1",
    //             paramName: "I_ac",
    //             selected: false,
    //         },
    //     ],
    //     geo2: [
    //         {
    //             id: "I_d-geo2",
    //             paramName: "I_d",
    //             selected: false,
    //         },
    //         {
    //             id: "Iac-geo2",
    //             paramName: "I_ac",
    //             selected: false,
    //         },
    //     ],
    // };
    const paramsSelected = {
        "I_d-Geo1": false,
    };
    const parameters = ["I", "I_d"];

    return (
        <TableContainer bg="white" maxH="60vh" overflowY="auto">
            <Table size="lg" variant="striped">
                <TableCaption>Models display</TableCaption>
                <Thead>
                    <Tr>
                        <Th>I</Th>
                        <Th>I_d</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {["geo1", "geo2"].map((elem) => {
                        return (
                            <Tr key={elem}>
                                {parameters.map((parameter) => {
                                    return (
                                        <Td>
                                            <Checkbox
                                                // isDisabled={
                                                //     elem.populationType ===
                                                //     "metapopulation"
                                                // }
                                                // bg="white"
                                                // isChecked={checkList[elem.idNewModel]}
                                                onChange={(e) => {
                                                    setCheckList({
                                                        ...checkList,
                                                        [`${parameter}-${elem}`]:
                                                            e.target.checked,
                                                    });
                                                }}
                                            />
                                        </Td>
                                    );
                                })}
                            </Tr>
                        );
                    })}
                </Tbody>
            </Table>
        </TableContainer>
    );
};

export default MetapopulationSelectTable;
