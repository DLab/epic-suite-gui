import { Button, useToast } from "@chakra-ui/react";
import { useContext } from "react";

import SelectFeatureContext from "context/SelectFeaturesContext";

const GeoToastMessage = () => {
  const toast = useToast();
  const { states, counties, setGeoSelections, mode } =
    useContext(SelectFeatureContext);
  const handleDataLocalStorage = () => {
    const bottomLeft = "bottom-left";
    try {
      const localStorageExist = window.localStorage.getItem("geoSelection");
      if (!localStorageExist) {
        window.localStorage.setItem("geoSelection", JSON.stringify([]));
      }
      const dataGeoSelections = {
        id: Date.now(),
        name: "test",
        mode,
        featureSelected:
          (mode === "States" && states) || (mode === "Counties" && counties),
      };

      const dataGeoSelectionsCreated = JSON.parse(
        localStorage.getItem("geoSelection")
      );

      localStorage.setItem(
        "geoSelection",
        JSON.stringify([...dataGeoSelectionsCreated, dataGeoSelections])
      );
      setGeoSelections({
        type: "addGeoSelection",
        geoPayload: dataGeoSelections,
      });
      toast({
        position: bottomLeft,
        title: "Geographic Selection Created",
        description: "Your geographic selection was created successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        position: bottomLeft,
        title: "Error",
        description: "Something failed. Try again later!",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };
  return (
    <>
      <Button
        onClick={() => handleDataLocalStorage()}
        colorScheme="teal"
        size="md"
        mt="20px"
      >
        Add Selection
      </Button>
    </>
  );
};

export default GeoToastMessage;
