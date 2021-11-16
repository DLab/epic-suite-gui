import { Box } from "@chakra-ui/react";
import { useReducer, useState } from "react";

import Simulator from "components/simulator/index";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ControlPanelContext from "context/ControlPanelContext";
import ModelsContext from "context/ModelsContext";
import SelectFeatureContext, { Action } from "context/SelectFeaturesContext";

export interface DataGeoSelections {
  id: number;
  name: string;
  mode: string;
  featureSelected: string[];
}

const Home = () => {
  const initialStateGeoSelections: DataGeoSelections | [] = [];
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
  const [mode, setMode] = useState("National");
  return (
    <ModelsContext>
      <ControlPanelContext>
        <SelectFeatureContext.Provider
          value={{
            states,
            setStates,
            counties,
            setCounties,
            mode,
            setMode,
            geoSelections,
            setGeoSelections,
          }}
        >
          <Box>
            <Simulator />
          </Box>
        </SelectFeatureContext.Provider>
      </ControlPanelContext>
    </ModelsContext>
  );
};

export default Home;
