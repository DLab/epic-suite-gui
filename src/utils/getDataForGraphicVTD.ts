/* eslint-disable @typescript-eslint/dot-notation */

import { presimplify } from "topojson";

import VariableDependentTime, {
    NameFunction,
    Sine,
    Square,
    StaticValue,
    Transition,
} from "types/VariableDependentTime";

import { postData } from "./fetchData";

const repeatValue = (value: number, factor: number): number[] =>
    Array(factor * 10).fill(value);
const generateXAxisForGraph = (
    init: number,
    end: number,
    factor: number
): number[] => {
    return Array((end - Math.ceil(init)) * 10)
        .fill(0)
        .map((_xElement, i) => +(init + i * factor).toFixed(1));
};

// Format Dependent Time Variable and sending it to endpoint [POST] /functions
export const formatVariableDependentTime = (
    data:
        | VariableDependentTime
        | {
              default: string;
              rangeDays: number[][];
              type: (Sine | Square | Transition | StaticValue)[];
              name: string;
              isEnabled: boolean;
              val: number;
          }
) => {
    const { default: def, rangeDays, type } = data;
    // Reduce rangeDays to object setting initial and ending days and adding
    // type function depends its place into the array
    return rangeDays.reduce((previous, current, i, array) => {
        if (i === 0)
            return [
                {
                    t_init: current[0],
                    t_end: current[1],
                    function: type[i],
                },
            ];
        if (i <= array.length - 1) {
            const lastDayBetweenRange =
                previous[previous.length - 1]["t_end"] ?? "";
            const firstDayBetweenRange = current[0];
            if (lastDayBetweenRange === firstDayBetweenRange) {
                return [
                    ...previous,
                    {
                        t_init: current[0],
                        t_end: current[1],
                        function: type[i],
                    },
                ];
            }
            return [
                ...previous,
                {
                    t_init: lastDayBetweenRange,
                    t_end: firstDayBetweenRange,
                    default: def,
                },
                {
                    t_init: current[0],
                    t_end: current[1],
                    function: type[i],
                },
            ];
        }
        return [
            ...previous,
            {
                t_init: current[0],
                t_end: current[1],
                function: type[i],
            },
        ];
    }, []);
};

// clean attributes and its values getting only needed data for sending to server
const getAttributesByTypeFunction = (dataFromSectionVariableDependent) => {
    const {
        function: functionValues,
        t_init: tInit,
        t_end: tEnd,
    } = dataFromSectionVariableDependent;
    if (
        functionValues.name === NameFunction.sinusoidal ||
        functionValues.name === NameFunction.square
    ) {
        const newValues = {
            ...functionValues,
            function:
                functionValues.name === NameFunction.sinusoidal
                    ? "sine"
                    : functionValues.name,
            initphase: functionValues.initPhase,
            min_val: functionValues.min,
            max_val: functionValues.max,
        };
        delete newValues.initPhase;
        delete newValues.name;
        delete newValues.max;
        delete newValues.min;
        return newValues;
    }
    if (functionValues.name === NameFunction.transition) {
        const transitionValues = {
            ...functionValues,
            function: functionValues.name,
            t_init: tInit,
            t_end: tEnd,
        };

        delete transitionValues.name;
        return transitionValues;
    }
    return functionValues;
};

// create data series transform all range to Promise Object and
// getting any data from server.
export const createSeries = async (data, url, defaultValue, duration) => {
    const newData = data.map((d) => {
        if (d.default) {
            return new Promise((resolve) => {
                resolve({
                    function: repeatValue(d.default, d.t_end - d.t_init),
                    t: generateXAxisForGraph(d.t_init, d.t_end, 0.1),
                });
            });
        }
        if (d.function.name === NameFunction.static) {
            return new Promise((resolve) => {
                resolve({
                    function: repeatValue(d.function.value, d.t_end - d.t_init),
                    t: generateXAxisForGraph(d.t_init, d.t_end, 0.1),
                });
            });
        }
        // if function isn't static or default values, format its content
        const newAttributes = getAttributesByTypeFunction(d);
        const dataForFunctionEndpoint = {
            ...d,
            function: {
                ...newAttributes,
            },
        };
        // send data from server
        return postData(url, dataForFunctionEndpoint);
    });
    const allData = await Promise.all(newData);
    // reduce all objects to one.
    const preSeries = allData
        .map((serie) => {
            if (serie.results) {
                serie.results.function.pop();
                serie.results.t.pop();
                return serie.results;
            }
            return serie;
        })
        .reduce(
            (prev, current) => {
                return {
                    function: [...prev.function, ...current.function],
                    t: [...prev.t, ...current.t],
                };
            },
            { function: [], t: [] }
        );
    if (preSeries.t[0] !== 0) {
        preSeries.function = [
            ...repeatValue(defaultValue, preSeries.t[0]),
            ...preSeries.function,
        ];
        preSeries.t = [
            ...generateXAxisForGraph(0, preSeries.t[0], 0.1),
            ...preSeries.t,
        ];
    }
    if (preSeries.t[preSeries.t.length - 1] < duration) {
        preSeries.function = [
            ...preSeries.function,
            ...repeatValue(
                defaultValue,
                Math.round(duration - preSeries.t[preSeries.t.length - 1])
            ),
        ];
        preSeries.t = [
            ...preSeries.t,
            ...generateXAxisForGraph(
                preSeries.t[preSeries.t.length - 1],
                duration,
                0.1
            ),
        ];
    }
    return preSeries;
};
