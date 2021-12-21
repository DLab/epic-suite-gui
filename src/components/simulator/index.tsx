import { Flex } from "@chakra-ui/react";
import { useEffect, useContext } from "react";

import MapResult from "../map-results/index";
import Footer from "components/layout/Footer";
import { ModelsSaved } from "context/ModelsContext";
import { SelectFeature } from "context/SelectFeaturesContext";
import TabContext from "context/TabContext";
import createIdComponent from "utils/createIdcomponent";

import SidebarOpen from "./sidebar/SidebarOpen";

const Simulator = () => {
  // set initial models and geoSelections from localstorage.
  const { setParameters, setInitialParameters } = useContext(ModelsSaved);
  const { setGeoSelections } = useContext(SelectFeature);
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.localStorage.getItem("models")
    ) {
      const dataLocalStorageModel = window.localStorage.getItem("models");
      setParameters({
        type: "set",
        initial: JSON.parse(dataLocalStorageModel),
      });
      setInitialParameters({
        type: "reset",
        initial: JSON.parse(dataLocalStorageModel),
      });
    }
    if (
      typeof window !== "undefined" &&
      window.localStorage.getItem("geoSelection")
    ) {
      const dataLocalStorageGeo = window.localStorage.getItem("geoSelection");
      setGeoSelections({
        type: "setInitialSelection",
        initial: JSON.parse(dataLocalStorageGeo),
      });
    }
  }, [setGeoSelections, setParameters, setInitialParameters]);

  return (
    <TabContext>
      <Flex id={createIdComponent()} maxHeight="92vh">
        <SidebarOpen />
        <Flex
          id={createIdComponent()}
          w="100%"
          direction="column"
          justify="space-between"
        >
          <MapResult />
          <Footer />
        </Flex>
      </Flex>
    </TabContext>
  );
};

export default Simulator;
