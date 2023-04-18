import { Box, Button, Center, Flex, HStack, Text } from "@chakra-ui/react";
import { parse, format } from "date-fns";
import React, { useContext, useEffect, useState } from "react";
import Plot from "react-plotly.js";

import countiesData from "../../data/counties.json";
import { MobilityMatrix } from "context/MobilityMatrixContext";
// const data = [
//     {
//         z: [
//             [1, 20, 30],
//             [20, 1, 60],
//             [30, 60, 1],
//         ],

//         type: "heatmap",
//         colorscale: "Viridis",
//     },
// ];

function sumarMatriz(matriz, axis = 0) {
    let resultado;
    try {
        const sumarColumnas = () =>
            matriz[0].map((_, col) =>
                matriz.reduce((sum, fila) => sum + fila[col], 0)
            );
        const sumarFilas = () =>
            matriz.map((fila) => fila.reduce((a, b) => a + b, 0));

        resultado = [sumarColumnas, sumarFilas][axis]();
    } catch (error) {
        throw new Error(
            "El parámetro 'axis' debe ser 0 (columnas) o 1 (filas)"
        );
    }

    return resultado;
}

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
function formatDate(dateString) {
    const date = parse(dateString, "yyyyMMdd", new Date());
    return format(date, "yyyy-MM-dd");
}
const MobiltyOutputContainer = () => {
    const { matrix } = useContext(MobilityMatrix);
    const [data, setData] = useState([]);
    const [colsSum, setColsSum] = useState([]);
    const [rowsSum, setRowsSum] = useState([]);
    const [selectedDay, setSelectedDay] = useState("20190101");
    const dayList = Object.keys(matrix).sort();

    useEffect(() => {
        if (Object.keys(matrix).length !== 0 && matrix.constructor === Object) {
            const tags = matrix[selectedDay].tags.map(
                (cod: string) =>
                    countiesData.data.find(
                        (countie) => countie[5] === cod
                    )[4] ?? undefined
            );
            setData([
                {
                    z: matrix[selectedDay].values,
                    x: tags,
                    y: tags,
                    type: "heatmap",
                    colorscale: "Viridis",
                },
            ]);
            setColsSum([
                {
                    y: sumarMatriz(matrix[selectedDay].values),
                    x: tags,
                    type: "bar",
                },
            ]);
            setRowsSum([
                {
                    y: sumarMatriz(matrix[selectedDay].values, 1),
                    x: tags,
                    type: "bar",
                },
            ]);
        }
    }, [matrix, selectedDay]);
    const handlePrevDay = () => {
        const currentIndex = dayList.indexOf(selectedDay);
        if (currentIndex > 0) {
            setSelectedDay(dayList[currentIndex - 1]);
        }
    };

    const handleNextDay = () => {
        const currentIndex = dayList.indexOf(selectedDay);
        if (currentIndex < dayList.length - 1) {
            setSelectedDay(dayList[currentIndex + 1]);
        }
    };
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
            {data && data.length !== 0 ? (
                <>
                    <Box>
                        <Plot
                            layout={{
                                width: 640,
                                height: 520,
                                title: `Initial conectivity matrix ${formatDate(
                                    selectedDay
                                )}`,
                                xaxis: {
                                    ticks: "",
                                    side: "top",
                                },
                            }}
                            data={data}
                        />
                    </Box>
                    <Center mb="2%">
                        <HStack w="30%" justify="space-between">
                            <Text
                                onClick={handlePrevDay}
                                color={
                                    dayList.indexOf(selectedDay) === 0
                                        ? "#B9B9C9"
                                        : "#016FB9"
                                }
                                cursor={
                                    dayList.indexOf(selectedDay) === 0
                                        ? "not-allowed"
                                        : "pointer"
                                }
                                as="u"
                                // disabled={dayList.indexOf(selectedDay) === 0}
                            >
                                Previous
                            </Text>
                            <Text
                                cursor={
                                    dayList.indexOf(selectedDay) ===
                                    dayList.length - 1
                                        ? "not-allowed"
                                        : "pointer"
                                }
                                onClick={handleNextDay}
                                // disabled={
                                //     dayList.indexOf(selectedDay) ===
                                //     dayList.length - 1
                                // }
                                color={
                                    dayList.indexOf(selectedDay) ===
                                    dayList.length - 1
                                        ? "#B9B9C9"
                                        : "#016FB9"
                                }
                                as="u"
                            >
                                Next
                            </Text>
                        </HStack>
                    </Center>
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
                                data={rowsSum}
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
                                data={colsSum}
                            />
                        </HStack>
                    </Box>
                </>
            ) : (
                <Center>There is not avalaibled view</Center>
            )}
        </Flex>
    );
};

export default MobiltyOutputContainer;
