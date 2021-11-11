import { Button, useToast } from "@chakra-ui/react";
import { useContext } from "react";

import { ControlPanel } from "context/ControlPanelContext";
import {
  ModelsSaved,
  DataParameters,
  ModelAttributes,
} from "context/ModelsContext";
import SelectFeatureContext from "context/SelectFeaturesContext";

const ToastMessage = () => {
  const toast = useToast();
  const { states, counties, mode } = useContext(SelectFeatureContext);
  const { parameters: modelsParameters, setParameters } =
    useContext(ModelsSaved);
  const { parameters } = useContext(ControlPanel);
  const handleDataLocalStorage = () => {
    try {
      const localStorageExist = window.localStorage.getItem("models");
      if (!localStorageExist) {
        window.localStorage.setItem("models", JSON.stringify([]));
      }
      const dataParameters: DataParameters = {
        spatialSelection: [],
        parameters,
        id: Date.now(),
      };
      if (mode === "States") {
        dataParameters.spatialSelection = states;
      } else if (mode === "Counties") {
        dataParameters.spatialSelection = counties;
      } else {
        dataParameters.spatialSelection = [];
      }
      const dataModelsCreated: ModelAttributes["parameters"] = JSON.parse(
        localStorage.getItem("models")
      );

      localStorage.setItem(
        "models",
        JSON.stringify([...dataModelsCreated, dataParameters])
      );
      setParameters({
        type: "add",
        payload: dataParameters,
      });
      toast({
        position: "bottom-left",
        title: "Model Created",
        description: "Your model was created successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        position: "bottom-left",
        title: "Error",
        description: "Something failed. Try again later!",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };
  return (
    <Button
      onClick={() => handleDataLocalStorage()}
      colorScheme="teal"
      size="md"
      mt="20px"
    >
      Add Model
    </Button>
  );
};

export default ToastMessage;
