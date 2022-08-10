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
    Box,
} from "@chakra-ui/react";
import { format, add } from "date-fns";
import dynamic from "next/dynamic";
import React, { useContext, useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { GeometryObject } from "topojson-specification";

// import us_ from "../../data/counties-10m.json";
// import stateData_ from "../../data/states-10m.json";
// import stateData_ from "../../data/statesResults-10m.json";
// import stateObject from "../../data/statesObject.json";
import PauseIcon from "components/icons/PauseIcon";
import PlayIcon from "components/icons/PlayIcon";
import { GraphicsData } from "context/GraphicsContext";
import { SelectFeature } from "context/SelectFeaturesContext";
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

    const [isGeoDataLoaded, setGeoDataLoaded] = useState(false);
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
        setSimDay(0);
    }, [map]);

    const filterData = (simData, typeData) => {
        const simRealDataKeyFilter = simData.filter((sim) => {
            return sim.name === map.nameSim;
        });

        let getParameterValue;

        if (typeData === "Real") {
            let filterKey = map.parameter.slice(0, -5);
            if (filterKey === "population") {
                filterKey = "P";
            }
            getParameterValue = simRealDataKeyFilter[0][filterKey];
        } else {
            let filterSimKey = map.parameter;
            if (filterSimKey === "population") {
                filterSimKey = "S";
            }
            getParameterValue = simRealDataKeyFilter[0][filterSimKey];
        }
        const parametersValuesArray = Object.values(getParameterValue);
        const getMaxValue = Math.max.apply(null, parametersValuesArray);
        setMaxValue(getMaxValue);
        if (getParameterValue !== undefined) {
            setParameterValue(getParameterValue[simDay]);
        }
    };

    useEffect(() => {
        if (map.parameter.includes("Real")) {
            filterData(realDataSimulationKeys, "Real");
        } else {
            filterData(data, "Sim");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, map.nameSim, map.parameter, simDay]);

    useEffect(() => {
        const durationValue = map.duration.toString();
        if (isPlaying && simDay < parseInt(durationValue, 10) - 1) {
            setTimeout(() => {
                const simDayAux = simDay;
                setSimDay(simDayAux + 1);
            }, 100);
        }
        if (simDay === parseInt(durationValue, 10) - 1) {
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

    // let geoSelectionSetted = [];
    // let geoSelectionFiltered;

    // const setGeoSelectionsFiltered = (geoSelection, geoSelectionGeometries) => {
    //     geoSelection.featureSelected.forEach((id) => {
    //         geoSelectionFiltered = geoSelectionGeometries.filter(
    //             (geometrieId) => {
    //                 return geometrieId.id === id;
    //             }
    //         );
    //         geoSelectionSetted = [
    //             ...geoSelectionSetted,
    //             ...geoSelectionFiltered,
    //         ];
    //     });
    // };
    // useEffect(() => {
    //     setGeometryData(stateData_);
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    // useEffect(() => {
    //     const geoSelection = geoSelections.find(
    //         (element) => element.id === map.idGeo
    //     );
    //     // let dataAux;
    //     // let geoSelectionGeometries;

    //     if (map.scale === "States") {
    //         const dataAux = stateData_;
    //         const geoDataSetted = [];
    //         const x = geoSelection.featureSelected.map((id) => {
    //             // const geoFiltered = stateObject.filter((geometrieId) => {
    //             //     return geometrieId.id === id;
    //             // });
    //             return stateObject.filter((geometrieId) => {
    //                 return geometrieId.id === id;
    //             })[0];
    //             // geoSelectionSetted = [
    //             //     ...geoSelectionSetted,
    //             //     ...geoSelectionFiltered,
    //             // ];
    //         });
    //         dataAux.objects.states.geometries = x;
    //         setGeoData(dataAux);
    //         // const dataAux = geometryData;
    //         // // let geoSelectionGeometries;
    //         // // dataAux = stateData_;
    //         // // const geoSelectionGeometries =
    //         // //     geometryData.objects.states.geometries;
    //         // // dataAux = JSON.parse(JSON.stringify(stateData_));
    //         // // geoSelectionGeometries = JSON.parse(
    //         // //     JSON.stringify(stateData_.objects.states.geometries)
    //         // // );
    //         // setGeoSelectionsFiltered(geoSelection, stateObject);
    //         // dataAux.objects.states.geometries = geoSelectionSetted;
    //         // console.log(dataAux);
    //         // setGeoData(dataAux);
    //         // // setGeometryData(stateData_);
    //     }
    //     // if (map.scale === "Counties") {
    //     //     dataAux = us_;
    //     //     geoSelectionGeometries = us_.objects.counties.geometries;
    //     //     setGeoSelectionsFiltered(geoSelection, geoSelectionGeometries);
    //     //     dataAux.objects.counties.geometries = geoSelectionSetted;
    //     //     setGeoData(dataAux);
    //     // }

    //     setGeoDataLoaded(true);
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [map, geoSelections, geoSelectionSetted]);

    return (
        <Flex direction="column" w="48%" mb="2rem">
            <Flex justify="end" alignSelf="end" mr="0.2rem" w="10%" mt="2%">
                <Flex h="1.5rem">
                    <DeleteIcon
                        color="#16609E"
                        cursor="pointer"
                        onClick={() => {
                            const dataToShowInMapAux = dataToShowInMap;
                            // const dataToShowInMapFilter =
                            //     dataToShowInMapAux.map((mapData) => {
                            //         if (mapData.idMap === map.idMap) {
                            //             return {};
                            //         }
                            //         return mapData;
                            //     });
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
                                statesData={map.geoDataSelected}
                            />
                        ) : (
                            <CountiesResultsMap
                                idGeo={map.idGeo}
                                parameterValue={parameterValue}
                                maxValue={maxValue}
                                coutiesData={map.geoDataSelected}
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
                        <StatNumber>
                            {new Intl.NumberFormat("de-DE").format(
                                parameterValue
                            )}
                        </StatNumber>
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
        </Flex>
    );
};

export default MapResults;
