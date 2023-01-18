import { Box, Flex, Select, Switch, Text, Input } from "@chakra-ui/react";
import React, { useContext } from "react";

import { MobilityMatrix } from "../../context/MobilityMatrixContext";
import { InterventionsTypes } from "types/MobilityMatrixTypes";

import RangeConfig from "./RangeConfig";

interface Props {
    interventionList: InterventionsTypes[] | [];
    setInterventionList: (value: InterventionsTypes[] | []) => void;
}

const MobilityInterventions = ({
    interventionList,
    setInterventionList,
}: Props) => {
    const { idMatrixModel } = useContext(MobilityMatrix);

    const addIntervention = () => {
        const intervention = {
            id: Date.now(),
            startRange: 0,
            endRange: 500,
            intervention: "",
            value: 0,
        };

        setInterventionList([...interventionList, intervention]);
    };

    return (
        <Flex direction="column" mt="15px">
            <Flex direction="column" justifyContent="space-between" mb="10px">
                <Text fontSize="16px" fontWeight={700} mb="15px">
                    Intervention day
                </Text>
                <Flex justify="space-between">
                    <Text fontSize="14px">Range</Text>
                    <Text
                        color="#016FB9"
                        fontSize="14px"
                        textDecorationLine="underline"
                        cursor="pointer"
                        onClick={() => addIntervention()}
                    >
                        + Add new
                    </Text>
                </Flex>
            </Flex>
            {interventionList.map((intervention) => {
                return (
                    <RangeConfig
                        key={intervention.id}
                        interventionData={intervention}
                        interventionList={interventionList}
                        setInterventionList={setInterventionList}
                    />
                );
            })}
        </Flex>
    );
};

export default MobilityInterventions;
