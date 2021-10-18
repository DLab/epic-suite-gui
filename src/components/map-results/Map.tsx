import { useContext } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as topojson from "topojson";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { GeometryObject, Topology } from "topojson-specification";

import SelectFeatureContext from "../../context/SelectFeaturesContext";
import us_ from "../../data/counties-10m.json";

import StatesTopoJson from "./StatesTopoJson";

const Map = () => {
  const {
    counties: countiesSelected,
    setCounties: setCountiesSelected,
    mode,
  } = useContext(SelectFeatureContext);
  const us = us_ as unknown as Topology;
  const data = topojson.feature(us, us.objects.counties as GeometryObject);

  const handleSelectFeature = (feature) => {
    let color;
    const isIncluded = [...countiesSelected].some(
      (c: string) => c === feature.id
    );
    if (isIncluded) {
      color = "#e4b721";
    } else {
      color = "#1777c7";
    }
    return {
      fillColor: color,
      fillOpacity: 0.7,
      weight: 0.7,
      color: "white",
      opacity: 1,
    };
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const eventsMap = (feature, layer) => {
    layer.on("click", () => {
      setCountiesSelected({ type: "add", payload: [feature.id] });
    });
    layer.on("contextmenu ", () => {
      setCountiesSelected({ type: "remove-one", payload: [feature.id] });
    });
  };
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
      {mode === "County" ? (
        <GeoJSON
          data={data}
          onEachFeature={(feature, layer) => eventsMap(feature, layer)}
          style={(feature) => handleSelectFeature(feature)}
        />
      ) : (
        <StatesTopoJson />
      )}
    </MapContainer>
  );
};

export default Map;
