import { useContext, useReducer } from "react";
import { GeoJSON, Tooltip } from "react-leaflet";
import * as topojson from "topojson-client";
import { GeometryObject, Topology } from "topojson-specification";

import stateData_ from "../../data/states-10m.json";
import { SelectFeature } from "context/SelectFeaturesContext";

interface ActionTooltip {
  type: string;
  payload: string;
}

const StatesMap = () => {
  const stateData = stateData_ as unknown as Topology;
  const data = topojson.feature(
    stateData,
    stateData.objects.states as GeometryObject
  );
  const { states: statesSelected, setStates: setStatesSelected } =
    useContext(SelectFeature);

  const initialState: string | undefined = "";

  const reducer = (state: string, action: ActionTooltip) => {
    if (action.type === "set") {
      return action.payload;
    }
    return state;
  };
  const [tootipCounty, dispatch] = useReducer(reducer, initialState);

  const onEachFeature = (feature, layer) => {
    layer.on({
      click: () => {
        setStatesSelected({ type: "handle-select", payload: [feature.id] });
      },
    });
    layer.on("mouseover", () => {
      dispatch({ type: "set", payload: feature.properties.name });
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

  return (
    <GeoJSON data={data} onEachFeature={onEachFeature} style={styles}>
      <Tooltip>{tootipCounty}</Tooltip>
    </GeoJSON>
  );
};

export default StatesMap;
