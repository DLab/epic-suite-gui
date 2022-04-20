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
} from "@chakra-ui/react";
import React, { useState, useContext } from "react";

import { ModelsSaved } from "context/ModelsContext";

import EndPointSource from "./EndPointSource";
import FileSource from "./FileSource";
import SampleSource from "./SampleSource";

import "react-datepicker/dist/react-datepicker.css";

const DataFitTab = () => {
    const [dataSourceType, setDataSourceType] = useState("");
    const [modelId, setModelId] = useState<number>();
    const [geoSelectionId, setGeoSelectionId] = useState<number>();
    const [startDate, setStartDate] = useState(new Date(Date.now()));

    // Cambiar valores del radio button a nombres representativos de los ejemplos
    const [SampleSourceValue, setSampleSourceValue] = useState("1");

    const { parameters } = useContext(ModelsSaved);
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
                                }}
                            >
                                {parameters.length > 0 &&
                                    parameters.map((model) => {
                                        return (
                                            <option
                                                key={model.id}
                                                value={model.id}
                                            >
                                                {model.parameters.name_model}
                                            </option>
                                        );
                                    })}
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
                            >
                                <option>Algorithm 1</option>
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
                                startDate={startDate}
                                setStartDate={setStartDate}
                                value={geoSelectionId}
                                setValue={setGeoSelectionId}
                            />
                        )}
                        <Box mb="3%">
                            <Text fontSize="14px" fontWeight={500}>
                                Data For Fit
                            </Text>
                            <Tag size="sm" variant="outline" colorScheme="red">
                                <TagLabel>Pending</TagLabel>
                                <TagRightIcon as={WarningTwoIcon} />
                            </Tag>
                            {/* Condición según estado de petición y tipo de parámetro (I_d ó I_acum) */}
                            {/* <Tag size="sm" variant="outline" colorScheme="green">
                            <TagLabel>Loaded/ nombre de parámetro</TagLabel>
                            <TagRightIcon as={CheckCircleIcon} />
                        </Tag> */}
                        </Box>
                    </Flex>
                    <Box mt="2%">
                        <Center>
                            <Button colorScheme="blue" color="white">
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
                        <Text>Graphic Data Fit</Text>
                    </Flex>
                    <Box
                        h="50%"
                        bg="#FAFAFA"
                        borderRadius="6px"
                        p="2%"
                        boxShadow="sm"
                        overflowY="auto"
                    >
                        <Text>Fit Parameters Table</Text>
                    </Box>
                </Flex>
            </Flex>
        </Box>
    );
};
export default DataFitTab;
