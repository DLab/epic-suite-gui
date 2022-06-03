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
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import React, { useState, useContext, useEffect } from "react";

import { DataFit } from "context/DataFitContext";
import { NewModelSetted } from "context/NewModelsContext";
import { NewModelsAllParams } from "types/SimulationTypes";

import EndPointSource from "./EndPointSource";
import FileSource from "./FileSource";
import FitParemetersTabs from "./FitParemetersTabs";
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
    const [dataSourceType, setDataSourceType] = useState("");
    const [algorithmValue, setAlgorithmValue] = useState(undefined);
    const [modelId, setModelId] = useState<number>(undefined);
    const [geoSelectionId, setGeoSelectionId] = useState<number>(0);
    const [startDate, setStartDate] = useState(new Date(2021, 11, 31));
    const [dataValues, setDataValues] = useState([]);
    const [parameterName, setParameterName] = useState(undefined);

    // Cambiar valores del radio button a nombres representativos de los ejemplos
    const [SampleSourceValue, setSampleSourceValue] = useState("1");
    const { fittedData, realDataToFit, setFittedData, setRealDataToFit } =
        useContext(DataFit);
    const { completeModel } = useContext(NewModelSetted);

    useEffect(() => {
        if (algorithmValue === "algorithm-1") {
            setParameterName("New daily infected");
        }
        if (algorithmValue === "algorithm-2") {
            setParameterName("Active infected");
        }
    }, [algorithmValue]);

    async function getFittedData() {
        const res = await fetch(`/api/simulator`, {
            method: "GET",
        });
        return res.json();
    }

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
                                    setGeoSelectionId(0);
                                    setFittedData([]);
                                    setRealDataToFit([]);
                                    setDataValues([]);
                                }}
                            >
                                {completeModel.length > 0 &&
                                    completeModel.map(
                                        (model: NewModelsAllParams) => {
                                            return (
                                                <option
                                                    key={model.idNewModel}
                                                    value={model.idNewModel}
                                                >
                                                    {model.name}
                                                </option>
                                            );
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
                                    setGeoSelectionId(0);
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
                        <Box mb="3%">
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
                        </Box>
                        {dataSourceType === "file" && <FileSource />}
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
                        )}
                        <Box mb="3%">
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
                        </Box>
                    </Flex>
                    <Box mt="2%">
                        <Center>
                            <Button
                                colorScheme="blue"
                                color="white"
                                onClick={() => {
                                    getFittedData().then((res) => {
                                        const val = Object.values(
                                            res.fitResult
                                        );
                                        const keys = Object.keys(res.fitResult);
                                        const resFittedData = val
                                            .map(
                                                (simString: string) => simString
                                            )
                                            .map((sim, i) => ({
                                                name: keys[i],
                                                // eslint-disable-next-line @typescript-eslint/ban-types
                                                ...(sim as {}),
                                            }));
                                        setFittedData(resFittedData);
                                    });
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
