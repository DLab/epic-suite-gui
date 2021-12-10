import React, { useState, useEffect, useContext } from "react";
import Plot from "react-plotly.js";

import { TabIndex } from "context/TabContext";

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
  const { aux } = useContext(TabIndex);
  const data = JSON.parse(aux);
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
        width: +width,
        height: +height,
        title: `Graphic ${index + 1}`,
        legend: { xanchor: "end", x: 20, y: 1 },
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
