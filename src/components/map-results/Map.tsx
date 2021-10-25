import { useContext } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import SelectFeatureContext from "../../context/SelectFeaturesContext";

import CountiesMap from "./CountiesMap";
import NationMap from "./NationMap";
import StatesMap from "./StatesMap";

const Map = () => {
  const { mode } = useContext(SelectFeatureContext);

  return (
    <MapContainer
      className="will-change"
      center={[35, -100]}
      zoom={4}
      style={{ height: "80vh", width: "100%" }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {mode === "States" && <StatesMap />}
      {mode === "National" && <NationMap />}
      {mode === "Counties" && <CountiesMap />}
    </MapContainer>
  );
};

export default Map;
