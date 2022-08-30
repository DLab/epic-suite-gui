/* eslint-disable sonarjs/no-duplicate-string */
import React, { useState, useEffect, useContext } from "react";
import Plot from "react-plotly.js";

import getColor from "../getColor";
import { GraphicsData } from "context/GraphicsContext";
import { TabIndex } from "context/TabContext";
import { DoubleYAxisData } from "types/GraphicsTypes";

interface Props {
    savedSimulationKeys?: DoubleYAxisData[];
    simDay: number;
    maxValue: number;
}

const BarGraphModal = ({ savedSimulationKeys, simDay, maxValue }: Props) => {
    const { realDataSimulationKeys, allGraphicData } = useContext(GraphicsData);
    const [axios, setAxios] = useState([]);
    const { aux } = useContext(TabIndex);
    const data = JSON.parse(aux);

    const graphSimulation = (axisKeys) => {
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
                    const simulationRealKeys =
                        simRealDataKeyFilter[0][filterKey];

                    return {
                        x: [key],
                        y: [Object.values(simulationRealKeys)[simDay]],
                        mode: "lines+markers",
                        name: `${key}`,
                    };
                }
                const simulationKeys = simKeyFilter[0][key];

                return {
                    x: [key],
                    y: [Object.values(simulationKeys)[simDay]],
                    type: "bar",
                    marker: {
                        color: getColor(
                            Object.values(simulationKeys)[simDay],
                            maxValue
                        ),
                    },
                    name: `${key} `,
                    width: 0.2,
                };
            });
        });
    };

    useEffect(() => {
        const axisKeys = savedSimulationKeys[0].leftAxis;
        const axiosData = graphSimulation(axisKeys);
        let dataToGraph = [];

        axiosData.forEach((simulation) => {
            simulation.forEach((parameter) => {
                dataToGraph = [...dataToGraph, parameter];
                return dataToGraph;
            });
        });

        setAxios(dataToGraph);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [savedSimulationKeys, allGraphicData, simDay]);

    return (
        <>
            <Plot
                data={axios}
                layout={{
                    autosize: false,
                    width: 320,
                    height: 260,
                    margin: {
                        l: 75,
                        b: 60,
                        t: 0,
                    },
                    color: "blue",
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
                        range: [0, maxValue],
                        autorange: false,
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

export default BarGraphModal;
