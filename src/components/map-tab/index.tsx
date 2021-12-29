import { Button, Flex } from "@chakra-ui/react";
import { useState, useContext } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { SelectFeature } from "../../context/SelectFeaturesContext";
import GeoSelectionsTab from "components/statesCountiesSelects/GeoSelectionsTab";

import CountiesMap from "./CountiesMap";
import NationMap from "./NationMap";
import SelectorMapAccordion from "./selectorMap/SelectorMapAccordion";
import StatesMap from "./StatesMap";

const Map = () => {
  const { scale } = useContext(SelectFeature);

  return (
    <Flex h="100%">
      <SelectorMapAccordion />
      <Flex direction="column" w="73%" align="center">
        <Flex w="80%" justify="center">
          <MapContainer
            className="will-change"
            center={[38, -96]}
            zoom={3.5}
            style={{ height: "61vh", maxHeight: "61vh", width: "100%" }}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {scale === "States" && <StatesMap />}
            {scale === "National" && <NationMap />}
            {scale === "Counties" && <CountiesMap />}
          </MapContainer>
        </Flex>
        <GeoSelectionsTab />
      </Flex>
    </Flex>
  );
};

export default Map;
