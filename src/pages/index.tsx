import { Box } from "@chakra-ui/react";
import { useReducer, useState } from "react";

import Simulator from "components/simulator/index";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ControlPanelContext from "context/ControlPanelContext";
import SelectFeatureContext, { Action } from "context/SelectFeaturesContext";

const Home = () => {
  // hasta acá funciona

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
        // return [...state, ...action.payload];
        return eliminateDuplicatesData(state, action.payload);
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
  const [states, setStates] = useReducer(reducer, initialState);
  const [counties, setCounties] = useReducer(reducer, initialState);
  const [mode, setMode] = useState("National");
  return (
    <ControlPanelContext>
      <SelectFeatureContext.Provider
        value={{ states, setStates, counties, setCounties, mode, setMode }}
      >
        <Box>
          <Simulator />
        </Box>
      </SelectFeatureContext.Provider>
    </ControlPanelContext>
  );
};

export default Home;
