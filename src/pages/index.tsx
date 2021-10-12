import { Box } from "@chakra-ui/react";
import { useState } from "react";

import Simulator from "components/simulator/index";
import SelectFeatureContext from "context/SelectFeaturesContext";

const Home = () => {
  const [states, setStates] = useState([""]);
  const [counties, setCounties] = useState([""]);
  const [mode, setMode] = useState("National");
  return (
    <SelectFeatureContext.Provider
      value={{ states, setStates, counties, setCounties, mode, setMode }}
    >
      <Box>
        <Simulator />
      </Box>
    </SelectFeatureContext.Provider>
  );
};

export default Home;
