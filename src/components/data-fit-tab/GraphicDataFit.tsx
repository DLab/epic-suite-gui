import React, { useContext, useEffect, useState } from "react";
import Plot from "react-plotly.js";

import { DataFit } from "context/DataFitContext";

interface Props {
    algorithmValue: undefined | string;
}

const GraphicDataFit = ({ algorithmValue }: Props) => {
    const { fittedData, realDataToFit } = useContext(DataFit);
    const [axios, setAxios] = useState([]);

    const getAxisData = (parameter) => {
        const getFittedData = {
            x: Object.keys(fittedData[0].I),
            y: Object.values(fittedData[0].I),
            mode: "lines",
            name: `I Fit ${fittedData[0].name}`,
        };
        const getRealData = {
            x: Object.keys(realDataToFit[0].I_d_data),
            y: Object.values(realDataToFit[0].I_d_data),
            mode: "line",
            line: {
                dash: "dot",
                width: 3,
            },
            name: `I Real ${realDataToFit[0].name}`,
        };

        setAxios([getFittedData, getRealData]);
    };

    useEffect(() => {
        if (fittedData[0] !== undefined && realDataToFit[0] !== undefined) {
            if (algorithmValue === "algorithm-1") {
                getAxisData("I_d_data");
            }
            if (algorithmValue === "algorithm-2") {
                getAxisData("I_d_data");
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [algorithmValue, fittedData, realDataToFit]);

    return (
        <Plot
            data={axios}
            layout={{
                autosize: false,
                width: "90%",
                height: 200,
                margin: {
                    l: 50,
                    b: 30,
                    t: 50,
                },
                color: "blue",
                title: `<span style="display: none">""</span>`,
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
                yaxis2: {
                    title: "Population",
                    titlefont: { color: "#5991c1" },
                    tickfont: { color: "#5991c1" },
                    overlaying: "y",
                    side: "right",
                },
                // shapes: [
                //     {
                //         type: "line",
                //         x0: 5,
                //         y0: 0,
                //         x1: 5,
                //         y1: 20000,
                //         line: {
                //             color: "#7c8187",
                //             width: 2,
                //             dash: "dash",
                //         },
                //     },
                // ],
            }}
            config={{
                editable: false,
                responsive: true,
            }}
        />
    );
};

export default GraphicDataFit;
