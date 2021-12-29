import { GeoJSON } from "react-leaflet";
import * as topojson from "topojson-client";
import { GeometryObject, Topology } from "topojson-specification";

import stateData_ from "../../data/states-10m.json";

const NationMap = () => {
  const stateData = stateData_ as unknown as Topology;
  const data = topojson.feature(
    stateData,
    stateData.objects.states as GeometryObject
  );

  const styles = () => {
    return {
      fillColor: "#1777c7",
      fillOpacity: 0.7,
      weight: 0.7,
      color: "white",
      opacity: 1,
    };
  };

  return <GeoJSON data={data} style={styles} />;
};

export default NationMap;
