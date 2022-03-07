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
    const { realDataSimulationKeys } = useContext(GraphicsData);
    const [axios, setAxios] = useState([]);
    const { aux } = useContext(TabIndex);
    const data = JSON.parse(aux);
    const graphSimulation = () => {
        return savedSimulationKeys[0].leftAxis.map((simKey) => {
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
                    return {
                        x: Object.keys(simulationKeys),
                        y: Object.values(simulationKeys),
                        mode: "lines+markers",
                        name: `${key}-${simRealDataKeyFilter[0].name}`,
                    };
                }
                const simulationKeys = simKeyFilter[0][key];
                return {
                    x: Object.keys(simulationKeys),
                    y: Object.values(simulationKeys),
                    type: "scatter",
                    name: `${key}-${simKeyFilter[0].name}`,
                };
            });
        });
    };

    useEffect(() => {
        const axiosData = graphSimulation();
        let dataToGraph = [];
        axiosData.forEach((simulation) => {
            simulation.forEach((parameter) => {
                dataToGraph = [...dataToGraph, parameter];
                return dataToGraph;
            });
        });
        setAxios(dataToGraph);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [savedSimulationKeys]);

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
            }}
            config={{
                editable: true,
            }}
        />
    );
};

export default Graphic;
