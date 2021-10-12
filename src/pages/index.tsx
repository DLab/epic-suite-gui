import { Box } from "@chakra-ui/react";
import { useState } from "react";

import Simulator from "components/simulator/index";
import SelectFeatureContext from "context/SelectFeaturesContext";

interface StatesProps {
  label: string;
}

const Home = () => {
  const [states, setStates] = useState<string>("alabama");

  return (
    <SelectFeatureContext.Provider value={{ states, setStates }}>
      <Box>
        <Simulator />
      </Box>
    </SelectFeatureContext.Provider>
  );
};

export default Home;
