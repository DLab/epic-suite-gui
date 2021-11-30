import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

import data from "data/SEIRresults.json";

interface Props {
  savedSimulationKeys: string[];
  width: string;
  height: string;
}

const Graphic = ({ savedSimulationKeys, width, height }: Props) => {
  const [axios, setAxios] = useState([]);

  const graphSimulation = () => {
    return savedSimulationKeys.map((x) => {
      const y = data[x];
      return {
        x: Object.keys(y),
        y: Object.values(y),
        type: "scatter",
        name: x,
      };
    });
  };

  useEffect(() => {
    const axiosData = graphSimulation();
    setAxios(axiosData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedSimulationKeys]);

  return (
    <Plot
      data={axios}
      layout={{
        width: parseInt(width, 10),
        height: parseInt(height, 10),
        title: "Graphic: Name 1",
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
