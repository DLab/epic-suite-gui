import { Box } from "@chakra-ui/react";

import Simulator from "components/simulator/index";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ControlPanelContext from "context/ControlPanelContext";
import ModelsContext from "context/ModelsContext";
import SelectFeatureContext from "context/SelectFeaturesContext";

const Home = () => {
  return (
    <ModelsContext>
      <ControlPanelContext>
        <SelectFeatureContext>
          <Box>
            <Simulator />
          </Box>
        </SelectFeatureContext>
      </ControlPanelContext>
    </ModelsContext>
  );
};

export default Home;
