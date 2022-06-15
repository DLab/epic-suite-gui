export {};
// import { Select, Text, Box, useToast } from "@chakra-ui/react";
// import { add, format } from "date-fns";
// import React, { useContext } from "react";
// import DatePicker from "react-datepicker";

// import { DataFit } from "context/DataFitContext";
// import { NewModelSetted } from "context/NewModelsContext";
// import { SelectFeature } from "context/SelectFeaturesContext";
// import { DataParameters } from "types/ModelsTypes";
// import postData from "utils/fetchData";

// interface Props {
//     modelId: number;
//     startDate: Date;
//     setStartDate: (value: Date) => void;
//     value: number;
//     setValue: (value: number) => void;
//     setDataValues: (value: unknown[]) => void;
//     algorithmValue: undefined | string;
// }

// const EndPointSource = ({
//     modelId,
//     startDate,
//     setStartDate,
//     value,
//     setValue,
//     setDataValues,
//     algorithmValue,
// }: Props) => {
//     const toast = useToast();
//     const { geoSelections } = useContext(SelectFeature);
//     const { parameters } = useContext(ModelsSaved);
//     const { setRealDataToFit, setFittedData } = useContext(DataFit);
//     const { completeModel } = useContext(NewModelSetted);

//     const getObjectConfig = (geoId) => {
//         const { parameters: modelParameters } = parameters.find(
//             (model: DataParameters) => model.id === modelId
//         );
//         const geoSetted = geoSelections.find((geo) => geo.id === geoId);
//         const timeEnd = add(new Date(startDate), {
//             days: modelParameters.t_end,
//         });
//         return {
//             name: "Data Fit",
//             compartments: modelParameters.name,
//             timeInit: format(new Date(startDate), "yyyy-MM-dd"),
//             timeEnd: format(timeEnd, "yyyy-MM-dd"),
//             scale: geoSetted?.scale,
//             spatialSelection: geoSetted?.featureSelected,
//         };
//     };

//     const handleFetch = async (geoId) => {
//         try {
//             const objectConfig = getObjectConfig(geoId);
//             const res = await postData("http://192.168.2.131:5001/realData", {
//                 Data_Fit: objectConfig,
//             });
//             const fitDataName = Object.keys(res.result);
//             if (algorithmValue === "algorithm-1") {
//                 const dataForAlgorithm1 = Object.values(res.result.Data_Fit.I);
//                 setDataValues(dataForAlgorithm1);
//                 const dataForRealData = {
//                     I: res.result.Data_Fit.I,
//                     name: fitDataName[0],
//                 };
//                 setRealDataToFit([dataForRealData]);
//             }
//             if (algorithmValue === "algorithm-2") {
//                 const dataForAlgorithm2 = Object.values(
//                     res.result.Data_Fit.I_active
//                 );
//                 setDataValues(dataForAlgorithm2);
//                 const dataForRealData = {
//                     I_ac: res.result.Data_Fit.I_active,
//                     name: fitDataName[0],
//                 };
//                 setRealDataToFit([dataForRealData]);
//             }
//         } catch (error) {
//             if (modelId === undefined) {
//                 toast({
//                     position: "bottom-left",
//                     title: "Error",
//                     description: "Please, choose a model",
//                     status: "error",
//                     duration: 3000,
//                     isClosable: true,
//                 });
//             } else {
//                 toast({
//                     position: "bottom-left",
//                     title: "Error",
//                     description: `${error.message}`,
//                     status: "error",
//                     duration: 3000,
//                     isClosable: true,
//                 });
//             }
//         }
//     };

//     return (
//         <Box ml="5%">
//             <Box mb="3%">
//                 <Text fontSize="14px" fontWeight={500}>
//                     Date
//                 </Text>
//                 <DatePicker
//                     dateFormat="yyyy/MM/dd"
//                     selected={startDate}
//                     onChange={(date) => {
//                         const newDate = format(date, "yyyy/MM/dd");
//                         setStartDate(new Date(newDate));
//                         setFittedData([]);
//                         setRealDataToFit([]);
//                         setValue(0);
//                     }}
//                     openToDate={new Date(2021, 11, 31)}
//                     maxDate={new Date(2021, 11, 31)}
//                 />
//             </Box>
//             <Box mb="3%">
//                 <Text fontSize="14px" fontWeight={500}>
//                     Area Selected
//                 </Text>
//                 <Select
//                     w="13rem"
//                     fontSize="14px"
//                     size="sm"
//                     placeholder="Name Selection"
//                     value={value}
//                     onChange={(e) => {
//                         setValue(+e.target.value);
//                         setFittedData([]);
//                         setRealDataToFit([]);
//                         handleFetch(+e.target.value);
//                     }}
//                 >
//                     {geoSelections.length > 0 &&
//                         geoSelections.map((e) => {
//                             return (
//                                 <option key={e.id} value={e.id}>
//                                     {e.name}
//                                 </option>
//                             );
//                         })}
//                 </Select>
//             </Box>
//         </Box>
//     );
// };

// export default EndPointSource;
