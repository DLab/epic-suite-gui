import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

import data from "data/SEIRresults.json";

interface Props {
  savedSimulationKeys: string[];
}

const Graphic = ({ savedSimulationKeys }: Props) => {
  const [axios, setAxios] = useState([]);

  const graphSimulation = () => {
    const filterData = savedSimulationKeys.map((x) => {
      return data[x];
    });

    return filterData.map((x) => {
      return {
        x: Object.keys(x),
        y: Object.values(x),
        type: "scatter",
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
        width: 320,
        height: 240,
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
