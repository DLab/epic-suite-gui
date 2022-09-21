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

import ColorsScale from "../ColorsScale";
import GraphAndMapMetaModal from "../graphic-map-modal/GraphAndMapMetaModal";
import PauseIcon from "components/icons/PauseIcon";
import PlayIcon from "components/icons/PlayIcon";
import { GraphicsData } from "context/GraphicsContext";
import { TabIndex } from "context/TabContext";
import { MapResultsData } from "types/GraphicsTypes";

import CountiesMetaResultsMap from "./CountiesMetaResultsMap";
import StatesMetaResultsMap from "./StatesMetaResultsMap";

interface Props {
    map: MapResultsData;
    sizeGraphic: number[];
}

const MetaMapResults = ({ map, sizeGraphic }: Props) => {
    const [simMetaDay, setSimMetaDay] = useState(0);
    const [simMetaDate, setSimMetaDate] = useState("");
    const [parameterMetaValue, setParameterMetaValue] = useState([]);
    const [maxMetaValue, setMaxMetaValue] = useState();
    const [isPlaying, setIsPlaying] = useState(false);

    const { aux } = useContext(TabIndex);
    const data = JSON.parse(aux);
    const {
        realDataSimulationKeys,
        dataToShowInMap,
        setDataToShowInMap,
        setAllResults,
        allGraphicData,
    } = useContext(GraphicsData);

    useEffect(() => {
        setSimMetaDay(0);
    }, [map]);

    /**
     * Saves in the "parameterMetaValue" state the values of a parameter according to the simulation day.
     * @param  {Array} simData list of real or simulated metapopulation data.
     * @param {string}  typeData type of data to filter: real or simulated.
     */
    const filterMetaData = (simData, typeData) => {
        let getParameterValue;

        if (typeData === "Real") {
            let filterKey = map.parameter.slice(0, -5);
            if (filterKey === "population") {
                filterKey = "P";
            }
            getParameterValue = simData.map((nodeData) => {
                return Object.values(nodeData[filterKey]);
            });
        } else {
            let filterSimKey = map.parameter;
            if (filterSimKey === "population") {
                filterSimKey = "S";
            }
            getParameterValue = simData.map((nodeData) => {
                return nodeData[filterSimKey];
            });
        }
        const maxValues = getParameterValue.map((valArray) => {
            return Math.max.apply(null, valArray);
        });
        const getMaxValue = Math.max.apply(null, maxValues);
        setMaxMetaValue(getMaxValue);
        if (getParameterValue !== undefined) {
            const parameterValuesList = getParameterValue.map((val) => {
                return val[simMetaDay];
            });
            setParameterMetaValue(parameterValuesList);
        }
    };

    useEffect(() => {
        if (map.parameter.includes("Real")) {
            filterMetaData(realDataSimulationKeys, "Real");
        } else {
            filterMetaData(data, "Sim");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [map.nameSim, map.parameter, simMetaDay]);

    useEffect(() => {
        const durationValue = map.duration.toString();
        if (isPlaying && simMetaDay < parseInt(durationValue, 10) - 1) {
            setTimeout(() => {
                const simMetaDayAux = simMetaDay;
                setSimMetaDay(simMetaDayAux + 1);
            }, 100);
        }
        if (simMetaDay === parseInt(durationValue, 10) - 1) {
            setIsPlaying(false);
        }
    }, [simMetaDay, isPlaying, map.duration]);

    useEffect(() => {
        setSimMetaDate(format(new Date(map.date), "dd/MM/yyyy"));
        const newDate = add(new Date(map.date), {
            days: simMetaDay,
        });
        setSimMetaDate(format(newDate, "dd/MM/yyyy"));
    }, [map.date, simMetaDay]);

    return (
        <Flex direction="column" w="48%" mb="2rem">
            <Flex justify="end" alignSelf="end" mr="0.2rem" w="10%" mt="2%">
                <Flex h="1.5rem">
                    <GraphAndMapMetaModal mapInfo={map} />
                    <DeleteIcon
                        color="#16609E"
                        cursor="pointer"
                        onClick={() => {
                            const dataToShowInMapFilter =
                                dataToShowInMap.filter((mapData) => {
                                    return mapData.idMap !== map.idMap;
                                });
                            setDataToShowInMap(dataToShowInMapFilter);

                            Promise.resolve(setAllResults([])).then(() => {
                                setAllResults(
                                    [].concat(
                                        dataToShowInMapFilter,
                                        allGraphicData
                                    )
                                );
                            });
                        }}
                    >
                        Delete
                    </DeleteIcon>
                </Flex>
            </Flex>
            <Flex
                direction="column"
                justify="center"
                bg="#FFFFFF"
                borderRadius="10px"
                alignItems="center"
                w="100%"
                h="70vh"
            >
                <Flex justify="center" direction="column" w="90%">
                    <Text ml="2%">
                        {map.parameter} {map.nameSim}
                    </Text>
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
                        <ColorsScale maxValue={maxMetaValue} />
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {map.scale === "States" ? (
                            <StatesMetaResultsMap
                                idGeo={map.idGeo}
                                parameterValue={parameterMetaValue}
                                maxValue={maxMetaValue}
                                statesData={map.geoDataSelected}
                            />
                        ) : (
                            <CountiesMetaResultsMap
                                idGeo={map.idGeo}
                                parameterValue={parameterMetaValue}
                                maxValue={maxMetaValue}
                                countiesData={map.geoDataSelected}
                            />
                        )}
                    </MapContainer>
                </Flex>
                <StatGroup w="90%" mt="1%">
                    <Stat>
                        <StatLabel>Day</StatLabel>
                        <StatNumber>{simMetaDay + 1}</StatNumber>
                    </Stat>

                    <Stat>
                        <StatLabel>Date</StatLabel>
                        <StatNumber>{simMetaDate}</StatNumber>
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
                        max={parseInt(map.duration.toString(), 10) - 1}
                        value={simMetaDay}
                        onChange={(value) => {
                            setSimMetaDay(value);
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
        </Flex>
    );
};

export default MetaMapResults;
