import { InfoIcon } from "@chakra-ui/icons";
import { Text, Flex, Icon } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";

import { SelectFeature } from "context/SelectFeaturesContext";
import { OptionFeature } from "types/SimulationTypes";

import CountiesSimulationMap from "./CountiesSimulationMap";
import StatesSimulationMap from "./StatesSimulationMap";

interface Props {
  idGeo: number;
  typeSelection: string;
  geoAreaSelected: string[];
  optionFeature: OptionFeature;
}

const AreaSelectedBox = ({
  idGeo,
  typeSelection,
  geoAreaSelected,
  optionFeature,
}: Props) => {
  const {
    simulationScale: scaleResults,
    setSimulationScale,
    geoSelections,
  } = useContext(SelectFeature);

  useEffect(() => {
    setSimulationScale("States");
    const geoSelection = geoSelections.find((element) => element.id === idGeo);
    if (geoSelection !== undefined) {
      setSimulationScale(geoSelection.scale);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idGeo]);

  return (
    <>
      {typeSelection === "" && (
        <Flex
          bg="#e7e7e7"
          h="50%"
          borderRadius="6px"
          justify="center"
          align="center"
          mb="2%"
          boxShadow="sm"
        >
          <Icon color="#666666" as={InfoIcon} />
          <Text color="#666666" ml="2%">
            Choose a type of area.
          </Text>
        </Flex>
      )}
      {optionFeature === OptionFeature.Geographic && (
        <Flex
          bg="#c8cdcd"
          borderRadius="6px"
          justify="center"
          align="center"
          mb="2%"
          boxShadow="sm"
        >
          <Flex w="100%" justify="center" h="45vh">
            <MapContainer
              className="will-change"
              center={[38, -96]}
              zoom={3.48}
              style={{ height: "45vh", maxHeight: "45vh", width: "100%" }}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {scaleResults === "States" && (
                <StatesSimulationMap idGeo={idGeo} />
              )}
              {scaleResults === "Counties" && (
                <CountiesSimulationMap
                  geoAreaSelected={geoAreaSelected}
                  idGeo={idGeo}
                />
              )}
            </MapContainer>
          </Flex>
        </Flex>
      )}
      {optionFeature === OptionFeature.Graph && (
        <Flex
          bg="#e7e7e7"
          h="50%"
          borderRadius="6px"
          justify="center"
          align="center"
          mb="2%"
          boxShadow="sm"
        >
          <Text>In construction...</Text>
        </Flex>
      )}
    </>
  );
};

export default AreaSelectedBox;
