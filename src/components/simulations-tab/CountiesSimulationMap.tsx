import { useContext, useReducer, useState, useEffect } from "react";
import { GeoJSON, Tooltip } from "react-leaflet";
import * as topojson from "topojson-client";
import { GeometryObject, Topology } from "topojson-specification";

import us_ from "../../data/counties-10m.json";
import { SelectFeature } from "context/SelectFeaturesContext";

interface ActionTooltip {
  type: string;
  payload: string;
}

interface Props {
  geoAreaSelected: string[];
  idGeo: number;
}

const CountiesSimulationMap = ({ geoAreaSelected, idGeo }: Props) => {
  const { geoSelections } = useContext(SelectFeature);
  const us = us_ as unknown as Topology;
  const data = topojson.feature(us, us.objects.counties as GeometryObject);

  const [countiesSelected, setCountiesSelected] = useState([]);

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
      setCountiesSelected([]);
    } else {
      const geri = geoSelections.find((element) => element.id === idGeo);

      setCountiesSelected(geri.featureSelected);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idGeo]);

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
    layer.on("mouseover", () => {
      dispatch({ type: "set", payload: feature.properties.name });
    });
  };
  return (
    <GeoJSON
      data={data}
      onEachFeature={(feature, layer) => eventsMap(feature, layer)}
      style={(feature) => handleSelectFeature(feature)}
    >
      <Tooltip>{tootipCounty}</Tooltip>
    </GeoJSON>
  );
};

export default CountiesSimulationMap;
