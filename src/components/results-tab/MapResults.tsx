import { DeleteIcon } from "@chakra-ui/icons";
import {
    Flex,
    Spinner,
    Text,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    IconButton,
    Stat,
    StatLabel,
    StatNumber,
    StatGroup,
} from "@chakra-ui/react";
import { format, add } from "date-fns";
import dynamic from "next/dynamic";
import React, { useContext, useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";

import PauseIcon from "components/icons/PauseIcon";
import PlayIcon from "components/icons/PlayIcon";
import { GraphicsData } from "context/GraphicsContext";
import { TabIndex } from "context/TabContext";
import { MapResultsData } from "types/GraphicsTypes";

import ColorsScale from "./ColorsScale";
import CountiesResultsMap from "./CountiesResultsMap";

interface Props {
    map: MapResultsData;
}

const StatesResultsMap = dynamic(() => import("./StatesResultsMap"), {
    loading: () => (
        <Flex justifyContent="center" alignItems="center" w="100%">
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

const MapResults = ({ map }: Props) => {
    const [simDay, setSimDay] = useState(0);
    const [simDate, setSimDate] = useState("");
    const [parameterValue, setParameterValue] = useState();
    const [maxValue, setMaxValue] = useState();
    const [isPlaying, setIsPlaying] = useState(false);
    const { aux } = useContext(TabIndex);
    const data = JSON.parse(aux);
    const { realDataSimulationKeys, dataToShowInMap, setDataToShowInMap } =
        useContext(GraphicsData);

    useEffect(() => {
        setSimDay(0);
    }, [map]);

    useEffect(() => {
        if (map.parameter.includes("Real")) {
            const simRealDataKeyFilter = realDataSimulationKeys.filter(
                (sim) => {
                    return sim.name === map.nameSim;
                }
            );
            const filterKey = map.parameter.slice(0, -5);
            const getParameterValue = simRealDataKeyFilter[0][filterKey];
            const parametersValuesArray = Object.values(getParameterValue);
            const getMaxValue = Math.max.apply(null, parametersValuesArray);
            setMaxValue(getMaxValue);
            if (getParameterValue !== undefined) {
                setParameterValue(getParameterValue[simDay]);
            }
        } else {
            const simKeyFilter = data.filter((sim) => {
                return sim.name === map.nameSim;
            });
            const getParameterValue = simKeyFilter[0][map.parameter];

            const parametersValuesArray = Object.values(getParameterValue);
            const getMaxValue = Math.max.apply(null, parametersValuesArray);

            setMaxValue(getMaxValue);
            if (getParameterValue !== undefined) {
                setParameterValue(getParameterValue[simDay]);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, map.nameSim, map.parameter, simDay]);

    useEffect(() => {
        if (isPlaying && simDay < map.duration - 1) {
            setTimeout(() => {
                const simDayAux = simDay;
                setSimDay(simDayAux + 1);
            }, 100);
        }
        if (simDay === map.duration - 1) {
            setIsPlaying(false);
        }
    }, [simDay, isPlaying, map.duration]);

    useEffect(() => {
        setSimDate(format(new Date(map.date), "dd/MM/yyyy"));
        const newDate = add(new Date(map.date), {
            days: simDay,
        });
        setSimDate(format(newDate, "dd/MM/yyyy"));
    }, [map.date, simDay]);

    return (
        <Flex direction="column" mt="2%">
            <Flex justify="space-between">
                <Text ml="2%">
                    {map.parameter} {map.nameSim}
                </Text>
                <IconButton
                    color="#16609E"
                    aria-label="Call Segun"
                    size="sm"
                    cursor="pointer"
                    _hover={{
                        bg: "blue.500",
                        color: "#ffffff",
                    }}
                    icon={<DeleteIcon />}
                    onClick={() => {
                        const dataToShowInMapFilter = dataToShowInMap.filter(
                            (mapData) => {
                                return mapData.idMap !== map.idMap;
                            }
                        );
                        setDataToShowInMap(dataToShowInMapFilter);
                    }}
                />
            </Flex>
            <Flex w="100%" justify="center" h="45vh">
                <MapContainer
                    className="will-change"
                    center={[38, -96]}
                    zoom={3.48}
                    style={{
                        height: "45vh",
                        maxHeight: "45vh",
                        width: "100%",
                    }}
                    scrollWheelZoom={false}
                >
                    <ColorsScale maxValue={maxValue} />
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {map.scale === "States" ? (
                        <StatesResultsMap
                            idGeo={map.idGeo}
                            parameterValue={parameterValue}
                            maxValue={maxValue}
                        />
                    ) : (
                        <CountiesResultsMap
                            idGeo={map.idGeo}
                            parameterValue={parameterValue}
                            maxValue={maxValue}
                        />
                    )}
                </MapContainer>
            </Flex>
            <StatGroup w="90%" mt="1%">
                <Stat>
                    <StatLabel>Day</StatLabel>
                    <StatNumber>{simDay + 1}</StatNumber>
                </Stat>

                <Stat>
                    <StatLabel>Date</StatLabel>
                    <StatNumber>{simDate}</StatNumber>
                </Stat>
                <Stat>
                    <StatLabel>Value</StatLabel>
                    <StatNumber>{parameterValue}</StatNumber>
                </Stat>
            </StatGroup>
            <Flex w="95%" m="2% 0">
                {!isPlaying ? (
                    <IconButton
                        fontSize="20px"
                        bg="#16609E"
                        color="#FFFFFF"
                        fill="white"
                        aria-label="Play"
                        size="sm"
                        cursor="pointer"
                        icon={<PlayIcon />}
                        mr="1rem"
                        onClick={() => {
                            setIsPlaying(true);
                        }}
                    />
                ) : (
                    <IconButton
                        fontSize="20px"
                        bg="#16609E"
                        color="#FFFFFF"
                        fill="white"
                        aria-label="Play"
                        size="sm"
                        cursor="pointer"
                        icon={<PauseIcon />}
                        mr="1rem"
                        onClick={() => {
                            setIsPlaying(false);
                        }}
                    />
                )}

                <Slider
                    aria-label="slider-ex-1"
                    defaultValue={1}
                    max={map.duration - 1}
                    value={simDay}
                    onChange={(value) => {
                        setSimDay(value);
                        setIsPlaying(false);
                    }}
                >
                    <SliderTrack>
                        <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                </Slider>
            </Flex>
        </Flex>
    );
};

export default MapResults;
