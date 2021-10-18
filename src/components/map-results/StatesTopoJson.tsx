import { useContext } from "react";
import { GeoJSON } from "react-leaflet";
import * as topojson from "topojson-client";
import { GeometryObject, Topology } from "topojson-specification";

import stateData_ from "../../data/states-10m.json";
import SelectFeatureContext from "context/SelectFeaturesContext";

const StatesTopoJson = () => {
  const stateData = stateData_ as unknown as Topology;
  const data = topojson.feature(
    stateData,
    stateData.objects.states as GeometryObject
  );
  const { states: statesSelected, setStates: setStatesSelected } =
    useContext(SelectFeatureContext);

  const onEachFeature = (feature, layer) => {
    layer.on({
      click: () => {
        setStatesSelected({ type: "add", payload: [feature.id] });
      },
    });
    layer.on("contextmenu ", () => {
      setStatesSelected({ type: "remove-one", payload: [feature.id] });
    });
  };

  const styles = (feature) => {
    let color;
    const stateId = feature.id;

    if (statesSelected.includes(stateId)) {
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

  return <GeoJSON data={data} onEachFeature={onEachFeature} style={styles} />;
};

export default StatesTopoJson;
