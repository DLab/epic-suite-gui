import { Button, useToast } from "@chakra-ui/react";
import { useContext } from "react";

import { ControlPanel, EpidemicsData } from "context/ControlPanelContext";
import SelectFeatureContext from "context/SelectFeaturesContext";

interface Models {
  spatialSelection: string[] | [];
  parameters: EpidemicsData;
}
const ToastMessage = () => {
  const toast = useToast();
  const { states, counties, mode } = useContext(SelectFeatureContext);
  const { parameters } = useContext(ControlPanel);
  const handleDataSessionStorage = () => {
    try {
      const sessionStorageExist = window.sessionStorage.getItem("models");
      if (!sessionStorageExist) {
        window.sessionStorage.setItem("models", JSON.stringify({ data: [] }));
      }
      const dataParameters: Models = {
        spatialSelection: [],
        parameters,
      };
      if (mode === "States") {
        dataParameters.spatialSelection = states;
      } else if (mode === "Counties") {
        dataParameters.spatialSelection = counties;
      } else {
        dataParameters.spatialSelection = [];
      }
      const dataModelsCreated = JSON.parse(
        sessionStorage.getItem("models")
      ).data;

      sessionStorage.setItem(
        "models",
        JSON.stringify({ data: [...dataModelsCreated, dataParameters] })
      );
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
      onClick={() => handleDataSessionStorage()}
      colorScheme="teal"
      size="md"
      mt="20px"
    >
      Add Model
    </Button>
  );
};

export default ToastMessage;
