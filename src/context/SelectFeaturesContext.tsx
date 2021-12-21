import { createContext, useReducer, useState } from "react";

import { Model } from "types/ControlPanelTypes";
import {
  DataGeoSelections,
  Action,
  StatesProps,
} from "types/SelectFeaturesTypes";

export const SelectFeature = createContext<StatesProps>({
  idGeoSelectionUpdate: 0,
  setIdGeoSelectionUpdate: () => {},
  mode: Model.Add,
  setMode: () => {},
  nameGeoSelection: "Geo Selection 1",
  setNameGeoSelection: () => {},
  scale: "National",
  setScale: () => {},
  states: [],
  setStates: () => {},
  counties: [],
  setCounties: () => {},
  geoSelections: [],
  setGeoSelections: () => {},
});

// eslint-disable-next-line react/prop-types
const SelectFeatureContext: React.FC = ({ children }) => {
  const initialStateGeoSelections: DataGeoSelections[] = [];
  const initialState: string[] = [];
  const eliminateDuplicatesData = (
    baseDataArray: string[] | [],
    newDataArray: string[]
  ) => {
    return [...baseDataArray, ...newDataArray].reduce((acc, item) => {
      if (!acc.includes(item)) {
        return [...acc, item];
      }
      return acc;
    }, []);
  };

  const reducer = (state: string[], action: Action) => {
    switch (action.type) {
      case "add":
        return eliminateDuplicatesData(state, action.payload);
      case "handle-select":
        if (state.includes(action.payload[0])) {
          return state.filter((s: string) => s !== action.payload[0]);
        }
        return [...state, ...action.payload];
      case "remove":
        return [...action.payload];
      case "remove-one":
        return state.filter((s: string) => s !== action.payload[0]);
      case "add-all":
        return [...action.payload];
      case "reset":
        return [];
      case "update":
        return action.updateData;

      default:
        return state;
    }
  };

  const reducerGeoSelections = (state: DataGeoSelections[], action: Action) => {
    switch (action.type) {
      case "addGeoSelection":
        return [...state, action.geoPayload];
      case "removeGeoSelection":
        return state.filter(
          (geoSelection) => geoSelection.id !== +action.element
        );
      case "updateGeoSelection":
        return state.map((e) => {
          if (e.id === +action.element) {
            e.featureSelected = action.geoPayload.featureSelected;
          }
          return e;
        });
      default:
        return state;
    }
  };

  const [states, setStates] = useReducer(reducer, initialState);
  const [counties, setCounties] = useReducer(reducer, initialState);
  const [geoSelections, setGeoSelections] = useReducer(
    reducerGeoSelections,
    initialStateGeoSelections
  );
  const [scale, setScale] = useState("National");
  const [nameGeoSelection, setNameGeoSelection] = useState("Geo Selection 1");
  const [mode, setMode] = useState<Model>(Model.Add);
  const [idGeoSelectionUpdate, setIdGeoSelectionUpdate] = useState(0);

  return (
    <SelectFeature.Provider
      value={{
        idGeoSelectionUpdate,
        setIdGeoSelectionUpdate,
        mode,
        setMode,
        states,
        setStates,
        counties,
        setCounties,
        scale,
        setScale,
        nameGeoSelection,
        setNameGeoSelection,
        geoSelections,
        setGeoSelections,
      }}
    >
      {children}
    </SelectFeature.Provider>
  );
};

export default SelectFeatureContext;
