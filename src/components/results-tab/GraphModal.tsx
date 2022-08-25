/* eslint-disable sonarjs/no-duplicate-string */
import { Button } from "@chakra-ui/react";
import React, { useState, useEffect, useContext } from "react";
import Plot from "react-plotly.js";

import { GraphicsData } from "context/GraphicsContext";
import { TabIndex } from "context/TabContext";
import { DoubleYAxisData } from "types/GraphicsTypes";

interface Props {
    savedSimulationKeys?: DoubleYAxisData[];
    simDay: number;
    setSimDay: (val: number) => void;
    // width: string;
    // height: string;
}

const GraphModal = ({
    savedSimulationKeys,
    simDay,
    setSimDay,
}: // width,
// height,
Props) => {
    const { realDataSimulationKeys, allGraphicData } = useContext(GraphicsData);
    const [axios, setAxios] = useState([]);
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
                const valuesByRange = Object.values(simulationKeys).slice(
                    0,
                    simDay
                );
                return {
                    x: Object.keys(simulationKeys),
                    y: valuesByRange,
                    mode: "lines",
                    name: `${key}-${simKeyFilter[0].name} <span style="font-weight: bold">Left</span>`,
                };
            });
        });
    };

    useEffect(() => {
        const leftAxisKeys = savedSimulationKeys[0].leftAxis;
        const axiosLeftData = graphSimulation(leftAxisKeys, "leftAxis");
        let leftDataToGraph = [];

        axiosLeftData.forEach((simulation) => {
            simulation.forEach((parameter) => {
                leftDataToGraph = [...leftDataToGraph, parameter];
                return leftDataToGraph;
            });
        });

        setAxios(leftDataToGraph);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [savedSimulationKeys, allGraphicData, simDay]);

    return (
        <>
            <Button onClick={() => setSimDay(simDay + 1)}>+10</Button>
            <Plot
                data={axios}
                layout={{
                    autosize: false,
                    // width: +width,
                    // height: +height * 0.9,
                    margin: {
                        l: 55,
                        b: 60,
                        t: 0,
                    },
                    color: "blue",
                    title: savedSimulationKeys[0].graphicName,
                    legend: { xanchor: "end", x: 1.1, y: 1.1, yanchor: "top" },
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
                }}
                config={{
                    editable: false,
                    responsive: true,
                }}
            />
        </>
    );
};

export default GraphModal;
