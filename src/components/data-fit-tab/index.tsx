/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable @typescript-eslint/naming-convention */
import { WarningTwoIcon, CheckCircleIcon } from "@chakra-ui/icons";
import {
    Select,
    Text,
    Box,
    Flex,
    Button,
    Center,
    Tag,
    TagLabel,
    TagRightIcon,
    Spinner,
    useToast,
} from "@chakra-ui/react";
import { add, format } from "date-fns";
import dynamic from "next/dynamic";
import React, { useState, useContext, useEffect } from "react";

import { DataFit } from "context/DataFitContext";
import { NewModelSetted } from "context/NewModelsContext";
import { SelectFeature } from "context/SelectFeaturesContext";
import { NewModelsAllParams } from "types/SimulationTypes";
import postData from "utils/fetchData";

import EndPointSource from "./EndPointSource";
import FileSource from "./FileSource";
import FitParemetersTabs from "./FitParemetersTabs";
import getObjectConfigTest from "./getFitObjectConfigTest";
import SampleSource from "./SampleSource";

import "react-datepicker/dist/react-datepicker.css";

const Graphic = dynamic(() => import("./GraphicDataFit"), {
    loading: () => (
        <Flex justifyContent="center" alignItems="center">
            <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
            />
        </Flex>
    ),
    ssr: false,
});

const DataFitTab = () => {
    const toast = useToast();
    const [dataSourceType, setDataSourceType] = useState("");
    const [algorithmValue, setAlgorithmValue] = useState(undefined);
    const [modelId, setModelId] = useState<number>(undefined);
    const [geoSelectionId, setGeoSelectionId] = useState(0);
    const [startDate, setStartDate] = useState(new Date(2021, 11, 31));
    const [dataValues, setDataValues] = useState([]);
    const [parameterName, setParameterName] = useState(undefined);

    // Cambiar valores del radio button a nombres representativos de los ejemplos
    const [SampleSourceValue, setSampleSourceValue] = useState("1");
    const { fittedData, realDataToFit, setFittedData, setRealDataToFit } =
        useContext(DataFit);
    const { completeModel } = useContext(NewModelSetted);
    const { geoSelections } = useContext(SelectFeature);

    useEffect(() => {
        if (algorithmValue === "algorithm-1") {
            setParameterName("New daily infected");
        }
        if (algorithmValue === "algorithm-2") {
            setParameterName("Active infected");
        }
    }, [algorithmValue]);

    const getObjectConfig = (geoId) => {
        const { parameters: modelParameters, t_init } = completeModel.find(
            (model: NewModelsAllParams) => model.idNewModel === modelId
        );
        const geoSetted = geoSelections.find((geo) => geo.id === geoId);
        const timeEnd = add(new Date(t_init), {
            days: modelParameters.t_end,
        });
        return {
            name: "Data Fit",
            compartments: modelParameters.name,
            timeInit: format(new Date(t_init), "yyyy-MM-dd"),
            timeEnd: format(timeEnd, "yyyy-MM-dd"),
            scale: geoSetted?.scale,
            spatialSelection: geoSetted?.featureSelected,
        };
    };

    const getTimeData = (tEnd) => {
        let timeObject = {};
        for (let index = 0; index < tEnd; index += 1) {
            timeObject = { ...timeObject, [index]: index };
        }
        return timeObject;
    };

    // const getFitObjectConfig = (data) => {
    //     const { parameters: modelParameters } = completeModel.find(
    //         (model: NewModelsAllParams) => model.idNewModel === modelId
    //     );
    //     return {
    //         "tE-I": modelParameters.tE_I,
    //         "tI-R": modelParameters.tI_R,
    //         I_d_data: data,
    //         t_data: getTimeData(modelParameters.t_end),
    //     };
    // };

    async function getFittedData(data) {
        // const objectConfig = getFitObjectConfig(data);
        const objectConfig = getObjectConfigTest();
        const res = await postData(
            "http://192.168.2.131:5003/datafit",
            objectConfig
        );
        // const res = await fetch(`/api/simulator`, {
        //     method: "GET",
        // });
        // console.log("hola", res);

        return res.json();
    }

    const handleFetch = async () => {
        try {
            const objectConfig = getObjectConfig(geoSelectionId);
            const res = await postData("http://192.168.2.131:5001/realData", {
                Data_Fit: objectConfig,
            });
            const fitDataName = Object.keys(res.result);

            const dataForAlgorithm1 = Object.values(res.result.Data_Fit.I);
            setDataValues(dataForAlgorithm1);
            const dataForRealData = {
                I: res.result.Data_Fit.I,
                name: fitDataName[0],
            };
            setRealDataToFit([dataForRealData]);
            // getFittedData(res.result.Data_Fit.I);
            const fitRes = await getFittedData(res.result.Data_Fit.I);
            // console.log(fitRes);

            // const val = Object.values(fitRes.fitResult);
            // const keys = Object.keys(fitRes.fitResult);
            // const resFittedData = val
            //     .map((simString: string) => simString)
            //     .map((sim, i) => ({
            //         name: keys[i],
            //         // eslint-disable-next-line @typescript-eslint/ban-types
            //         ...(sim as {}),
            //     }));
            // setFittedData(resFittedData);
        } catch (error) {
            if (modelId === undefined) {
                toast({
                    position: "bottom-left",
                    title: "Error",
                    description: "Please, choose a model",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                toast({
                    position: "bottom-left",
                    title: "Error",
                    description: `${error.message}`,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }
        }
    };

    return (
        <Box>
            <Box h="5vh" mh="5vh">
                <Text color="#16609E" fontSize="18px" fontWeight="bold">
                    Data Fit
                </Text>
            </Box>
            <Flex ml="2%" p="0" h="100%">
                <Flex
                    direction="column"
                    w="35%"
                    bg="#FAFAFA"
                    borderRadius="6px"
                    p="2%"
                    h="88vh"
                    boxShadow="sm"
                    justify="space-between"
                >
                    <Flex direction="column">
                        <Box mb="3%">
                            <Text fontSize="14px" fontWeight={500}>
                                Model
                            </Text>
                            <Select
                                w="13rem"
                                fontSize="14px"
                                placeholder="Select a model"
                                size="sm"
                                value={modelId}
                                onChange={(e) => {
                                    setModelId(+e.target.value);
                                    if (e.target.value !== "") {
                                        const { idGeo } = completeModel.filter(
                                            (model) => {
                                                return (
                                                    model.idNewModel ===
                                                    +e.target.value
                                                );
                                            }
                                        )[0];
                                        // setGeoSelectionId(0);
                                        if (idGeo !== undefined) {
                                            const stringIdGeo =
                                                idGeo.toString();
                                            setGeoSelectionId(
                                                parseInt(stringIdGeo, 10)
                                            );
                                        }
                                    }
                                    setFittedData([]);
                                    setRealDataToFit([]);
                                    setDataValues([]);
                                }}
                            >
                                {completeModel.length > 0 &&
                                    completeModel.map(
                                        (model: NewModelsAllParams) => {
                                            if (
                                                model.typeSelection ===
                                                "geographic"
                                            ) {
                                                return (
                                                    <option
                                                        key={model.idNewModel}
                                                        value={model.idNewModel}
                                                    >
                                                        {model.name}
                                                    </option>
                                                );
                                            }
                                            return false;
                                        }
                                    )}
                            </Select>
                        </Box>
                        <Box mb="3%">
                            <Text fontSize="14px" fontWeight={500}>
                                Fit Algorithm
                            </Text>
                            <Select
                                w="13rem"
                                fontSize="14px"
                                placeholder="Select a Algorithm"
                                size="sm"
                                value={algorithmValue}
                                onChange={(e) => {
                                    setAlgorithmValue(e.target.value);
                                    setFittedData([]);
                                    setRealDataToFit([]);
                                    setDataValues([]);
                                }}
                            >
                                <option key="algorithm-1" value="algorithm-1">
                                    Intervals
                                </option>
                                <option key="algorithm-2" value="algorithm-2">
                                    Sequential
                                </option>
                            </Select>
                        </Box>
                        {/* <Box mb="3%">
                            <Text fontSize="14px" fontWeight={500}>
                                Data Source
                            </Text>
                            <Select
                                w="13rem"
                                fontSize="14px"
                                placeholder="Select a source"
                                size="sm"
                                value={dataSourceType}
                                onChange={(e) => {
                                    setDataSourceType(e.target.value);
                                    setFittedData([]);
                                    setRealDataToFit([]);
                                    setDataValues([]);
                                    setGeoSelectionId(0);
                                }}
                            >
                                <option key="file" value="file">
                                    File Upload
                                </option>
                                <option key="sample" value="sample">
                                    Sample Data
                                </option>
                                <option key="endpoint" value="endpoint">
                                    Endpoint
                                </option>
                            </Select>
                        </Box> */}
                        {/* {dataSourceType === "file" && <FileSource />}
                        {dataSourceType === "sample" && (
                            <SampleSource
                                value={SampleSourceValue}
                                setValue={setSampleSourceValue}
                            />
                        )}
                        {dataSourceType === "endpoint" && (
                            <EndPointSource
                                modelId={modelId}
                                startDate={startDate}
                                setStartDate={setStartDate}
                                value={geoSelectionId}
                                setValue={setGeoSelectionId}
                                setDataValues={setDataValues}
                                algorithmValue={algorithmValue}
                            />
                        )} */}
                        {/* <Box mb="3%">
                            <Text fontSize="14px" fontWeight={500}>
                                Data For Fit
                            </Text>

                            {dataValues.length > 0 ? (
                                <Tag
                                    size="sm"
                                    variant="outline"
                                    colorScheme="green"
                                >
                                    <TagLabel>{parameterName} Loaded</TagLabel>
                                    <TagRightIcon as={CheckCircleIcon} />
                                </Tag>
                            ) : (
                                <Tag
                                    size="sm"
                                    variant="outline"
                                    colorScheme="red"
                                >
                                    <TagLabel>Pending</TagLabel>
                                    <TagRightIcon as={WarningTwoIcon} />
                                </Tag>
                            )}
                        </Box> */}
                    </Flex>
                    <Box mt="2%">
                        <Center>
                            <Button
                                colorScheme="blue"
                                color="white"
                                onClick={() => {
                                    handleFetch();
                                    // getFittedData().then((res) => {
                                    //     const val = Object.values(
                                    //         res.fitResult
                                    //     );
                                    //     const keys = Object.keys(res.fitResult);
                                    //     const resFittedData = val
                                    //         .map(
                                    //             (simString: string) => simString
                                    //         )
                                    //         .map((sim, i) => ({
                                    //             name: keys[i],
                                    //             // eslint-disable-next-line @typescript-eslint/ban-types
                                    //             ...(sim as {}),
                                    //         }));
                                    //     setFittedData(resFittedData);
                                    // });
                                }}
                            >
                                Fit
                            </Button>
                        </Center>
                    </Box>
                </Flex>
                <Flex direction="column" w="65%" m="0 2%">
                    <Flex
                        h="50%"
                        bg="#FAFAFA"
                        borderRadius="6px"
                        justify="center"
                        align="center"
                        mb="2%"
                        boxShadow="sm"
                    >
                        {fittedData.length > 0 && realDataToFit.length > 0 ? (
                            <Graphic algorithmValue={algorithmValue} />
                        ) : (
                            <Text>Graphic</Text>
                        )}
                    </Flex>
                    <Box
                        h="50%"
                        bg="#FAFAFA"
                        borderRadius="6px"
                        p="2%"
                        boxShadow="sm"
                        overflowY="auto"
                    >
                        {fittedData.length > 0 && realDataToFit.length > 0 ? (
                            <FitParemetersTabs />
                        ) : (
                            <Text>Fit Parameters Table</Text>
                        )}
                    </Box>
                </Flex>
            </Flex>
        </Box>
    );
};
export default DataFitTab;
