import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import React from "react";
import Plot from "react-plotly.js";

const data = [
    {
        z: [
            [1, 20, 30],
            [20, 1, 60],
            [30, 60, 1],
        ],

        type: "heatmap",
    },
];
const histogram = [
    {
        y: Array(10)
            .fill(0)
            .map(() => Math.random()),
        type: "bar",
    },
];
histogram[0].y.length = 500;
histogram[0].y.fill(1, 1, 500);
histogram[0].y = histogram[0].y.map((e, i) => {
    return Math.random();
});

const MobiltyOutputContainer = () => {
    return (
        <Flex
            direction="column"
            w="60%"
            m="0 2%"
            borderRadius="8px"
            boxShadow="sm"
            overflowY="auto"
            border="1px solid #DDDDDD"
            p="2%"
            h="75vh"
        >
            <Box>
                <Text textAlign="center">Initial conectivity matrix</Text>
                <Plot
                    layout={{
                        width: 640,
                        height: 520,
                    }}
                    data={data}
                />
            </Box>
            <Box>
                <Text>Destination/Arrival</Text>
                <HStack border="1px" w="90%" justify="space-between">
                    <Plot
                        layout={{
                            title: "Origin",
                            width: 480,
                            height: 360,
                            xaxis: { autorange: true },
                            yaxis: { autorange: true },
                        }}
                        data={histogram}
                        config={{
                            responsive: true,
                            modeBarButtonsToRemove: ["toImage"],
                        }}
                    />

                    <Plot
                        layout={{
                            title: "Destiny",
                            width: 480,
                            height: 360,
                            xaxis: { autorange: true },
                            yaxis: { autorange: true },
                        }}
                        data={histogram}
                    />
                </HStack>
            </Box>
        </Flex>
    );
};

export default MobiltyOutputContainer;
