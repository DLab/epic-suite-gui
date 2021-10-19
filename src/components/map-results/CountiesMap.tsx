import { useContext } from "react";
import { GeoJSON } from "react-leaflet";
import * as topojson from "topojson-client";
import { GeometryObject, Topology } from "topojson-specification";

import us_ from "../../data/counties-10m.json";
import SelectFeatureContext from "context/SelectFeaturesContext";

const CountiesMap = () => {
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
    <GeoJSON
      data={data}
      onEachFeature={(feature, layer) => eventsMap(feature, layer)}
      style={(feature) => handleSelectFeature(feature)}
    />
  );
};

export default CountiesMap;
