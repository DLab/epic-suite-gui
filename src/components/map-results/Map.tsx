import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import data from "../../data/states-10m.json";

import TopoJson from "./TopoJson";

const Map = () => {
  return (
    <MapContainer
      className="will-change"
      center={[35, -100]}
      zoom={4}
      style={{ height: "80vh", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <TopoJson data={data} />
    </MapContainer>
  );
};

export default Map;
