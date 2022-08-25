import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Text,
    Icon,
    Flex,
} from "@chakra-ui/react";
import React, { useEffect, useState, useContext } from "react";
import { MapContainer, TileLayer } from "react-leaflet";

import ColorsScale from "../ColorsScale";
import CountiesResultsMap from "../CountiesResultsMap";
import GraphModal from "../GraphModal";
import PlayDataSlider from "../PlayDataSlider";
import StatesResultsMap from "../StatesResultsMap";
import PlayModal from "components/icons/PlayModal";
import { GraphicsData } from "context/GraphicsContext";
import { TabIndex } from "context/TabContext";
import { MapResultsData } from "types/GraphicsTypes";
import createIdComponent from "utils/createIdcomponent";

interface Props {
    mapInfo: MapResultsData;
    sizeGraphic: number[];
}

const GraphAndMapMonoModal = ({ mapInfo, sizeGraphic }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [parameterModalValue, setParameterModalValue] = useState();
    // const [scrollBehavior, setScrollBehavior] = React.useState("inside");
    const [isPlayingModal, setIsPlayingModal] = useState(false);
    const [simDayModal, setSimDayModal] = useState(1);
    const [maxModalValue, setMaxModalValue] = useState();
    const { aux } = useContext(TabIndex);
    const data = JSON.parse(aux);
    const { realDataSimulationKeys } = useContext(GraphicsData);

    const graphInfo = {
        graphicName: mapInfo.parameter,
        graphicId: createIdComponent(),
        leftAxis: [
            {
                keys: [mapInfo.parameter],
                name: mapInfo.nameSim,
            },
        ],
        rightAxis: [],
    };

    const filterData = (simData, typeData) => {
        const simRealDataKeyFilter = simData.filter((sim) => {
            return sim.name === mapInfo.nameSim;
        });

        let getParameterValue;

        if (typeData === "Real") {
            let filterKey = mapInfo.parameter.slice(0, -5);
            if (filterKey === "population") {
                filterKey = "P";
            }
            getParameterValue = simRealDataKeyFilter[0][filterKey];
        } else {
            let filterSimKey = mapInfo.parameter;
            if (filterSimKey === "population") {
                filterSimKey = "S";
            }
            getParameterValue = simRealDataKeyFilter[0][filterSimKey];
        }
        const parametersValuesArray = Object.values(getParameterValue);
        const getMaxModalValue = Math.max.apply(null, parametersValuesArray);
        setMaxModalValue(getMaxModalValue);
        if (getParameterValue !== undefined) {
            setParameterModalValue(getParameterValue[simDayModal]);
        }
    };

    useEffect(() => {
        if (mapInfo.parameter.includes("Real")) {
            filterData(realDataSimulationKeys, "Real");
        } else {
            filterData(data, "Sim");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, mapInfo.nameSim, mapInfo.parameter, simDayModal]);

    useEffect(() => {
        const durationValue = mapInfo.duration.toString();
        if (isPlayingModal && simDayModal < parseInt(durationValue, 10) - 1) {
            setTimeout(() => {
                const simDayModalAux = simDayModal;
                setSimDayModal(simDayModalAux + 1);
            }, 60);
        }
        if (simDayModal === parseInt(durationValue, 10) - 1) {
            setIsPlayingModal(false);
        }
    }, [simDayModal, isPlayingModal, mapInfo.duration]);

    const btnRef = React.useRef(null);
    return (
        <>
            <Icon
                as={PlayModal}
                onClick={onOpen}
                cursor="pointer"
                fontSize="1.4rem"
            />

            <Modal
                onClose={onClose}
                size="xl"
                // finalFocusRef={btnRef}
                isOpen={isOpen}
                scrollBehavior="outside"
            >
                <ModalOverlay />
                <ModalContent textAlign="center" maxW="70vw" maxH="90vh">
                    <ModalHeader>
                        {mapInfo.parameter} {mapInfo.nameSim}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex justify="center" direction="column" w="90%">
                            {/* <Text ml="2%">
                                {mapInfo.parameter} {mapInfo.nameSim}
                            </Text> */}
                            <Flex>
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
                                    <ColorsScale maxValue={maxModalValue} />
                                    <TileLayer
                                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    {mapInfo.scale === "States" ? (
                                        <StatesResultsMap
                                            idGeo={mapInfo.idGeo}
                                            parameterValue={parameterModalValue}
                                            maxValue={maxModalValue}
                                            statesData={mapInfo.geoDataSelected}
                                        />
                                    ) : (
                                        <CountiesResultsMap
                                            idGeo={mapInfo.idGeo}
                                            parameterValue={parameterModalValue}
                                            maxValue={maxModalValue}
                                            coutiesData={
                                                mapInfo.geoDataSelected
                                            }
                                        />
                                    )}
                                </MapContainer>
                                <GraphModal
                                    savedSimulationKeys={[graphInfo]}
                                    simDay={simDayModal}
                                    setSimDay={setSimDayModal}
                                    // width={`${sizeGraphic[0] ?? 0}`}
                                    // height={`${sizeGraphic[1] ?? 0}`}
                                />
                            </Flex>
                        </Flex>
                        <PlayDataSlider
                            map={mapInfo}
                            isPlaying={isPlayingModal}
                            setIsPlaying={setIsPlayingModal}
                            simDay={simDayModal}
                            setSimDay={setSimDayModal}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default GraphAndMapMonoModal;
