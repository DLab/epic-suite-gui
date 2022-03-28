import { useContext, useReducer, useState, useEffect } from "react";
import { GeoJSON, Tooltip, useMap } from "react-leaflet";
import * as topojson from "topojson-client";
import { GeometryObject, Topology } from "topojson-specification";

import us_ from "../../data/counties-10m.json";
import { SelectFeature } from "context/SelectFeaturesContext";
import { TabIndex } from "context/TabContext";

interface ActionTooltip {
    type: string;
    payload: string;
}

interface Props {
    idGeo: number;
    parameterValue: number;
    maxValue: number;
}

const CountiesResultsMap = ({ idGeo, parameterValue, maxValue }: Props) => {
    const { geoSelections } = useContext(SelectFeature);
    const us = us_ as unknown as Topology;
    const data = topojson.feature(us, us.objects.counties as GeometryObject);
    const map = useMap();
    const { index: tabIndex } = useContext(TabIndex);

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
            const geoSelection = geoSelections.find(
                (element) => element.id === idGeo
            );

            setCountiesSelected(geoSelection.featureSelected);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [idGeo]);

    useEffect(() => {
        if (tabIndex === 3) {
            map.invalidateSize(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tabIndex, parameterValue]);

    const onEachFeature = (feature, layer) => {
        layer.on("mouseover", () => {
            dispatch({ type: "set", payload: feature.properties.name });
        });
    };

    const colors = [
        "#FFEDA0",
        "#FED976",
        "#FEB24C",
        "#FD8D3C",
        "#FC4E2A",
        "#E31A1C",
        "#BD0026",
        "#800026",
    ];

    const rangeValue = Math.ceil(maxValue / colors.length);
    const getColor = (d) => {
        let color;
        for (let i = 0; i < 9; i += 1) {
            if (i === 0) {
                if (d <= rangeValue) {
                    color = colors[i];
                }
            } else if (d > i * rangeValue) {
                color = colors[i];
            }
        }
        return color;
    };

    const styles = (feature) => {
        let color;
        const stateId = feature.id;

        if (countiesSelected?.includes(stateId)) {
            color = getColor(parameterValue);
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

export default CountiesResultsMap;
