import { Button } from "@chakra-ui/react";
import React from "react";
import Plot from "react-plotly.js";

import VariableDependentTime, {
    DataForGraph,
    Sine,
    Square,
    StaticValue,
    Transition,
} from "types/VariableDependentTime";
import {
    createSeries,
    formatVariableDependentTime,
} from "utils/getDataForGraphicVTD";

type Props = {
    setData: (data: unknown) => void;
    values:
        | VariableDependentTime
        | {
              default: string;
              rangeDays: number[][];
              type: (Sine | Square | Transition | StaticValue)[];
              name: string;
              isEnabled: boolean;
              val: number;
          };
    dataForGraph: DataForGraph;
    duration: number;
};

const GraphDependentTimeParameters = ({
    setData,
    values,
    dataForGraph,
    duration,
}: Props) => {
    return (
        <>
            <Plot
                data={[
                    {
                        x: dataForGraph.t,
                        y: dataForGraph.function,
                        type: "scatter",
                    },
                ]}
                layout={{
                    width: "100%",
                    height: 200,
                    margin: {
                        l: 50,
                        b: 30,
                        t: 50,
                    },
                    title: `${values.name} `,
                    legend: { xanchor: "end", x: 1, y: 1 },
                    showlegend: true,
                    xaxis: {
                        title: {
                            text: "Days",
                        },
                        autorange: true,
                    },
                    yaxis: {
                        title: {
                            text: "Values",
                        },
                        autorange: true,
                    },
                }}
                config={{
                    editable: false,
                }}
            />
            <Button
                size="sm"
                onClick={async () => {
                    setData([
                        await createSeries(
                            formatVariableDependentTime(values),
                            "http://192.168.2.131:5003/function",
                            values.default,
                            duration
                        ),
                    ]);
                }}
            >
                {" "}
                Show Graph
            </Button>
        </>
    );
};

export default GraphDependentTimeParameters;
