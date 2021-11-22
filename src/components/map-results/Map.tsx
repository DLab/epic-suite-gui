import { Button, Flex } from "@chakra-ui/react";
import { useState, useContext } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import SelectFeatureContext from "../../context/SelectFeaturesContext";
import GeoSelectionsTab from "components/statesCountiesSelects/GeoSelectionsTab";

import CountiesMap from "./CountiesMap";
import NationMap from "./NationMap";
import StatesMap from "./StatesMap";

const Map = () => {
  const { scale } = useContext(SelectFeatureContext);
  const [seeSelections, setSeeSelections] = useState(false);

  return !seeSelections ? (
    <MapContainer
      className="will-change"
      center={[35, -100]}
      zoom={4}
      style={{ height: "69vh", maxHeight: "69vh", width: "100%" }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {scale === "States" && <StatesMap />}
      {scale === "National" && <NationMap />}
      {scale === "Counties" && <CountiesMap />}
      <Flex h="100%" justify="end" align="flex-end">
        <Button
          colorScheme="teal"
          size="md"
          m="2%"
          zIndex="1000"
          onClick={() => {
            setSeeSelections(true);
          }}
        >
          See Selections
        </Button>
      </Flex>
    </MapContainer>
  ) : (
    <GeoSelectionsTab setSeeSelections={setSeeSelections} />
  );
};

export default Map;
