export {};
// /* eslint-disable no-nested-ternary */
// /* eslint-disable @typescript-eslint/dot-notation */
// import { EpidemicsData } from "types/ControlPanelTypes";
// import { DataParameters } from "types/ModelsTypes";
// import { EpicConfigToml } from "types/TomlTypes";
// import VariableDependentTime, {
//     NameFunction,
//     Sine,
//     Square,
//     StaticValue,
//     Transition,
//     TransitionFunction,
// } from "types/VariableDependentTime";

// import { variableDependentTimeParams } from "./createChunkDependentTime";

// // interface ForTomlFormat{
// //     name: string;
// //     name_model: string;
// //     compartments: string[];
// //     t_init:
// // }
// const convertTypeFunctionVDTForTomlFormat = (
//     type: (Sine | Square | Transition | StaticValue)[]
// ): unknown => {
//     return type.map((val) => {
//         if (val.name === NameFunction.sinusoidal) {
//             return JSON.stringify({
//                 function: "sine",
//                 min_val: val["min"],
//                 max_val: val["max"],
//                 period: val["period"],
//                 initPhase: val["initPhase"] === 0 ? "min" : "max",
//             });
//         }
//         if (val.name === NameFunction.square) {
//             return JSON.stringify({
//                 function: NameFunction.square,
//                 min_val: val["min"],
//                 max_val: val["max"],
//                 period: val["period"],
//                 duty: val["duty"],
//                 initPhase: val["initPhase"] === 0 ? "min" : "max",
//             });
//         }
//         if (val.name === NameFunction.transition) {
//             return JSON.stringify({
//                 function: NameFunction.transition,
//                 min_val: val["min"],
//                 max_val: val["max"],
//                 t_init: val["initValue"],
//                 t_end: val["endValue"],
//                 type:
//                     val["ftype"] === TransitionFunction.linear
//                         ? "linear"
//                         : val["ftype"] === TransitionFunction.quadratic
//                         ? "quadratic"
//                         : "sigmoidal",
//                 ...(val["ftype"] === TransitionFunction.quadratic
//                     ? { concavity: val["concavity"] }
//                     : {}),
//             });
//         }
//         return val["value"];
//     });
// };
// const convertVDTForTomlFormat = (data: DataParameters): unknown => {
//     const { parameters } = data[0];
//     return Object.entries(parameters)
//         .map(([key, value]) => {
//             if (variableDependentTimeParams.includes(key)) {
//                 const {
//                     rangeDays,
//                     type,
//                     isEnabled,
//                     default: defaultVDT,
//                 } = value as VariableDependentTime;
//                 return {
//                     [key]: isEnabled
//                         ? JSON.stringify({
//                               function: "events",
//                               values: convertTypeFunctionVDTForTomlFormat(type),
//                               days: rangeDays,
//                           })
//                         : defaultVDT,
//                 };
//             }
//             return { [key]: value };
//         })
//         .reduce(
//             (acc, current) => ({
//                 ...acc,
//                 ...current,
//             }),
//             {}
//         );
// };
// export default convertVDTForTomlFormat;
