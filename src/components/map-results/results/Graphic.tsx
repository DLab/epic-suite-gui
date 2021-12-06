import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

import data from "data/SEIRresults.json";

interface Ref {
  name: string;
  keys: [];
}

interface Props {
  savedSimulationKeys?: Ref[];
  width: string;
  height: string;
  index: number;
}

const Graphic = ({ savedSimulationKeys, width, height, index }: Props) => {
  const [axios, setAxios] = useState([]);

  const graphSimulation = () => {
    return savedSimulationKeys.map((simKey) => {
      const simKeyFilter = data.filter((sim) => {
        return sim.name === simKey.name;
      });
      const savedKeys = simKey.keys;
      return savedKeys.map((key) => {
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
        width: parseInt(width, 10),
        height: parseInt(height, 10),
        title: `Graphic ${index + 1}`,
        xaxis: {
          autorange: true,
        },
        yaxis: {
          autorange: true,
        },
      }}
    />
  );
};

export default Graphic;
