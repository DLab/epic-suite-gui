import { Text } from "@chakra-ui/react";
import React, { useContext } from "react";

import { TabIndex } from "context/TabContext";

const MobilityMatrixModel = () => {
    const { setIndex } = useContext(TabIndex);

    return (
        <>
            <Text fontSize="16px" fontWeight={700} mb="5%" mt="5%">
                Mobility Data
            </Text>
            <Text
                color="#016FB9"
                fontSize="14px"
                textDecorationLine="underline"
                cursor="pointer"
                ml="4%"
                onClick={() => {
                    setIndex(5);
                }}
            >
                + Add mobility matrix
            </Text>
            {/* <Flex></Flex> */}
        </>
    );
};

export default MobilityMatrixModel;
