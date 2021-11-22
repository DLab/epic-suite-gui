import { Button, useToast } from "@chakra-ui/react";
import { useContext } from "react";

import { Model, SelectFeature } from "context/SelectFeaturesContext";

const GeoToastMessage = () => {
  const toast = useToast();
  const {
    states,
    counties,
    setGeoSelections,
    scale,
    mode,
    setMode,
    idGeoSelectionUpdate,
    setIdGeoSelectionUpdate,
    nameGeoSelection,
  } = useContext(SelectFeature);

  const handleDataLocalStorage = () => {
    const bottomLeft = "bottom-left";
    try {
      const localStorageExist = window.localStorage.getItem("geoSelection");
      if (!localStorageExist) {
        window.localStorage.setItem("geoSelection", JSON.stringify([]));
      }
      const dataGeoSelections = {
        id: Date.now(),
        name: nameGeoSelection,
        scale,
        featureSelected:
          (scale === "States" && states) || (scale === "Counties" && counties),
      };

      const dataGeoSelectionsCreated = JSON.parse(
        localStorage.getItem("geoSelection")
      );

      if (mode === Model.Update) {
        const updateDataParameters = {
          id: idGeoSelectionUpdate,
          name: nameGeoSelection,
          scale,
          featureSelected:
            (scale === "States" && states) ||
            (scale === "Counties" && counties),
        };
        const indexDataToUpdate = dataGeoSelectionsCreated.findIndex(
          (e) => e.id === idGeoSelectionUpdate
        );
        dataGeoSelectionsCreated[indexDataToUpdate] = updateDataParameters;
        localStorage.setItem(
          "geoSelection",
          JSON.stringify(dataGeoSelectionsCreated)
        );
        setGeoSelections({
          type: "updateGeoSelection",
          element: `${idGeoSelectionUpdate}`,
          geoPayload: dataGeoSelections,
        });
        setIdGeoSelectionUpdate(0);
        toast({
          position: bottomLeft,
          title: "Selection Edited",
          description: "Your selection was updated successfully",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        setMode(Model.Add);
      } else {
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
      }
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
      {mode === Model.Add && (
        <Button
          onClick={() => handleDataLocalStorage()}
          colorScheme="teal"
          size="sm"
          mt="20px"
        >
          Add Selection
        </Button>
      )}
      {mode === Model.Update && (
        <>
          <Button
            onClick={() => handleDataLocalStorage()}
            colorScheme="teal"
            size="sm"
            mt="20px"
          >
            Update Selection
          </Button>
          <Button
            onClick={() => {
              setMode(Model.Add);
              setIdGeoSelectionUpdate(0);
            }}
            colorScheme="teal"
            variant="outline"
            size="sm"
            mt="20px"
            ml="20px"
          >
            Cancel
          </Button>
        </>
      )}
    </>
  );
};

export default GeoToastMessage;
