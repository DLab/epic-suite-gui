import PropTypes from "prop-types";
import { useRef, useEffect, useContext } from "react";
import { GeoJSON } from "react-leaflet";
import * as topojson from "topojson-client";

import SelectFeatureContext from "context/SelectFeaturesContext";

// interface StatesTopoJson {
//   data: any;
// }

const StatesTopoJson = ({ data, ...defProps }) => {
  const layerRef = useRef(null);
  // const selectFeatureContext = useContext(SelectFeatureContext);
  // const { states, setStates } = selectFeatureContext;
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
      color = "#438ecd";
    } else {
      color = "red";
    }
    return {
      fillColor: color,
      fillOpacity: 0.6,
      weight: 1,
      color: "white",
      opacity: 1,
    };
  };

  const addData = (layer, jsonData) => {
    if (jsonData.type === "Topology") {
      Object.keys(jsonData.objects).forEach((key) => {
        const geojson = topojson.feature(jsonData, jsonData.objects.states);
        layer.addData(geojson);
      });
    } else {
      layer.addData(jsonData);
    }
  };

  useEffect(() => {
    const layer = layerRef.current;
    addData(layer, data);
  }, [data]);

  return (
    <GeoJSON
      ref={layerRef}
      {...defProps}
      onEachFeature={onEachFeature}
      style={styles}
    />
  );
};

StatesTopoJson.propTypes = {
  data: PropTypes.objectOf,
};

export default StatesTopoJson;
