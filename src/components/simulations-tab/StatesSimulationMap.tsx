import { useContext, useReducer, useEffect, useState } from "react";
import { GeoJSON, Tooltip } from "react-leaflet";
import * as topojson from "topojson-client";
import { GeometryObject, Topology } from "topojson-specification";

import stateData_ from "../../data/states-10m.json";
import { SelectFeature } from "context/SelectFeaturesContext";

interface ActionTooltip {
  type: string;
  payload: string;
}

interface Props {
  geoAreaSelected: string[];
  idGeo: number;
}

const StateSimulationMap = ({ geoAreaSelected, idGeo }: Props) => {
  const { geoSelections, setScale } = useContext(SelectFeature);
  const stateData = stateData_ as unknown as Topology;
  const data = topojson.feature(
    stateData,
    stateData.objects.states as GeometryObject
  );

  const [statesSelected, setStatesSelected] = useState([]);

  const initialState: string | undefined = "";

  const reducer = (state: string, action: ActionTooltip) => {
    if (action.type === "set") {
      return action.payload;
    }
    return state;
  };
  const [tootipCounty, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (idGeo === 0) {
      setStatesSelected([]);
    } else {
      const geoSelection = geoSelections.find(
        (element) => element.id === idGeo
      );

      setStatesSelected(geoSelection.featureSelected);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idGeo]);

  const onEachFeature = (feature, layer) => {
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

export default StateSimulationMap;
