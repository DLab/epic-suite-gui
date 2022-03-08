/* eslint-disable sonarjs/no-duplicate-string */
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
}

const Graphic = ({ savedSimulationKeys, width, height, index }: Props) => {
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
                            name: `${key}-${simRealDataKeyFilter[0].name} Right`,
                            yaxis: "y2",
                        };
                    }
                    return {
                        x: Object.keys(simulationKeys),
                        y: Object.values(simulationKeys),
                        mode: "lines+markers",
                        name: `${key}-${simRealDataKeyFilter[0].name} Left`,
                    };
                }
                const simulationKeys = simKeyFilter[0][key];
                if (axis === "rightAxis") {
                    return {
                        x: Object.keys(simulationKeys),
                        y: Object.values(simulationKeys),
                        type: "scatter",
                        name: `${key}-${simKeyFilter[0].name} Right`,
                    };
                }
                return {
                    x: Object.keys(simulationKeys),
                    y: Object.values(simulationKeys),
                    type: "scatter",
                    name: `${key}-${simKeyFilter[0].name} Left`,
                    yaxis: "y2",
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

    return (
        <Plot
            data={axios}
            layout={{
                width: +width,
                height: +height,
                margin: {
                    l: 70,
                    b: 70,
                    t: 70,
                },
                title: `Graphic ${index + 1}`,
                legend: { xanchor: "end", x: 20, y: 1 },
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
    );
};

export default Graphic;
