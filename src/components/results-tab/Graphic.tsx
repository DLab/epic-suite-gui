/* eslint-disable sonarjs/no-duplicate-string */
import { Input } from "@chakra-ui/react";
import React, { useState, useEffect, useContext } from "react";
import Plot from "react-plotly.js";

import { GraphicsData } from "context/GraphicsContext";
import { TabIndex } from "context/TabContext";
import { DoubleYAxisData } from "types/GraphicsTypes";

interface Props {
    savedSimulationKeys?: DoubleYAxisData[];
    width: string;
    height: string;
    index: number;
    disabledName: boolean;
}

const Graphic = ({
    savedSimulationKeys,
    width,
    height,
    index,
    disabledName,
}: Props) => {
    const {
        realDataSimulationKeys,
        allGraphicData,
        setAllGraphicData,
        dataToShowInMap,
        setAllResults,
    } = useContext(GraphicsData);
    const [axios, setAxios] = useState([]);
    const [graphicName, setGraphicName] = useState("");
    const { aux } = useContext(TabIndex);
    const data = JSON.parse(aux);

    const graphSimulation = (axisKeys, axis) => {
        return axisKeys.map((simKey) => {
            // para obtener toda la data de una simulación
            const simKeyFilter = data.filter((sim) => {
                return sim.name === simKey.name;
            });
            // para obtener toda la data REAL de una simulación
            const simRealDataKeyFilter = realDataSimulationKeys.filter(
                (sim) => {
                    return sim.name === simKey.name;
                }
            );
            // para obtener las keys seleccionadas de la simulación
            const savedKeys = simKey.keys;
            return savedKeys.map((key) => {
                if (key.includes("Real")) {
                    // para encontrar la data según la key guardada
                    const filterKey = key.slice(0, -5);
                    const simulationKeys = simRealDataKeyFilter[0][filterKey];
                    if (axis === "rightAxis") {
                        return {
                            x: Object.keys(simulationKeys),
                            y: Object.values(simulationKeys),
                            mode: "lines+markers",
                            line: {
                                dash: "dot",
                                width: 2,
                            },
                            name: `${key}-${simRealDataKeyFilter[0].name} <span style="font-weight: bold">Right</span>`,
                            yaxis: "y2",
                        };
                    }
                    return {
                        x: Object.keys(simulationKeys),
                        y: Object.values(simulationKeys),
                        mode: "lines+markers",
                        name: `${key}-${simRealDataKeyFilter[0].name} <span style="font-weight: bold">Left</span>`,
                    };
                }
                const simulationKeys = simKeyFilter[0][key];
                if (axis === "rightAxis") {
                    return {
                        x: Object.keys(simulationKeys),
                        y: Object.values(simulationKeys),
                        mode: "lines",
                        line: {
                            dash: "dot",
                            width: 3,
                        },
                        name: `${key}-${simKeyFilter[0].name} <span style="font-weight: bold">Right</span>`,
                        yaxis: "y2",
                    };
                }
                return {
                    x: Object.keys(simulationKeys),
                    y: Object.values(simulationKeys),
                    mode: "lines",
                    name: `${key}-${simKeyFilter[0].name} <span style="font-weight: bold">Left</span>`,
                };
            });
        });
    };

    useEffect(() => {
        const leftAxisKeys = savedSimulationKeys[0].leftAxis;
        const rightAxisKeys = savedSimulationKeys[0].rightAxis;
        const axiosLeftData = graphSimulation(leftAxisKeys, "leftAxis");
        const axiosRightData = graphSimulation(rightAxisKeys, "rightAxis");
        let leftDataToGraph = [];
        let rightDataToGraph = [];
        axiosLeftData.forEach((simulation) => {
            simulation.forEach((parameter) => {
                leftDataToGraph = [...leftDataToGraph, parameter];
                return leftDataToGraph;
            });
        });
        axiosRightData.forEach((simulation) => {
            simulation.forEach((parameter) => {
                rightDataToGraph = [...rightDataToGraph, parameter];
                return rightDataToGraph;
            });
        });

        const allDataToGraph = leftDataToGraph.concat(rightDataToGraph);

        setAxios(allDataToGraph);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [savedSimulationKeys, allGraphicData]);

    const setNewGraphicName = (name) => {
        const allDataAux = allGraphicData;
        const auxAllGraphicData = allDataAux[index];
        auxAllGraphicData[0].graphicName = name;
        setAllGraphicData([...allDataAux]);
        setAllResults([].concat(dataToShowInMap, allDataAux));
    };

    useEffect(() => {
        if (savedSimulationKeys[0].graphicName === "") {
            setGraphicName(`Graphic ${index + 1}`);
            setNewGraphicName(`Graphic ${index + 1}`);
        } else {
            setGraphicName(savedSimulationKeys[0].graphicName);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allGraphicData]);

    return (
        <>
            {disabledName ? (
                <Input
                    border="none"
                    bg="#FFFFFF"
                    textAlign="center"
                    fontSize="20px"
                    w="60%"
                    value={graphicName}
                    isDisabled
                />
            ) : (
                <Input
                    border="none"
                    bg="#FFFFFF"
                    textAlign="center"
                    fontSize="20px"
                    value={graphicName}
                    focusBorderColor="none"
                    onChange={(e) => {
                        setGraphicName(e.target.value);
                    }}
                    onBlur={() => {
                        setNewGraphicName(graphicName);
                    }}
                />
            )}
            <Plot
                data={axios}
                layout={{
                    autosize: false,
                    width: +width,
                    height: +height,
                    margin: {
                        l: 55,
                        b: 60,
                        t: 0,
                    },
                    title: `<span style="display: none">""</span>`,
                    legend: { xanchor: "end", x: 25, y: 1 },
                    showlegend: true,
                    xaxis: {
                        title: {
                            text: "Time",
                        },
                        autorange: true,
                    },
                    yaxis: {
                        title: {
                            text: "Population",
                        },
                        autorange: true,
                    },
                    yaxis2: {
                        title: "Population",
                        titlefont: { color: "#5991c1" },
                        tickfont: { color: "#5991c1" },
                        overlaying: "y",
                        side: "right",
                    },
                }}
                config={{
                    editable: true,
                }}
            />
        </>
    );
};

export default Graphic;
