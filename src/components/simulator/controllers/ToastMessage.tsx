import { Button, useToast } from "@chakra-ui/react";
import { useContext } from "react";

import { ControlPanel, Model } from "context/ControlPanelContext";
import {
  ModelsSaved,
  DataParameters,
  ModelAttributes,
} from "context/ModelsContext";
import SelectFeatureContext from "context/SelectFeaturesContext";

const ToastMessage = () => {
  const toast = useToast();
  const { setParameters } = useContext(ModelsSaved);
  const { parameters, mode, setMode, idModelUpdate, setIdModelUpdate } =
    useContext(ControlPanel);
  const handleDataLocalStorage = () => {
    const bottomLeft = "bottom-left";
    try {
      const localStorageExist = window.localStorage.getItem("models");
      if (!localStorageExist) {
        window.localStorage.setItem("models", JSON.stringify([]));
      }
      const dataParameters: DataParameters = {
        parameters,
        id: Date.now(),
      };
      const dataModelsCreated: ModelAttributes["parameters"] = JSON.parse(
        localStorage.getItem("models")
      );
      if (mode === Model.Update) {
        const updateDataParameters: DataParameters = {
          parameters,
          id: idModelUpdate,
        };
        const indexDataToUpdate = dataModelsCreated.findIndex(
          (e: DataParameters) => e.id === idModelUpdate
        );
        dataModelsCreated[indexDataToUpdate] = updateDataParameters;
        localStorage.setItem("models", JSON.stringify(dataModelsCreated));
        setParameters({
          type: "update",
          element: `${idModelUpdate}`,
          payload: dataModelsCreated[indexDataToUpdate],
        });
        setIdModelUpdate(0);
        toast({
          position: bottomLeft,
          title: "Model Edited",
          description: "Your model was updated successfully",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        setMode(Model.Add);
      } else {
        localStorage.setItem(
          "models",
          JSON.stringify([...dataModelsCreated, dataParameters])
        );
        setParameters({
          type: "add",
          payload: dataParameters,
        });
        setIdModelUpdate(0);
        toast({
          position: bottomLeft,
          title: "Model Created",
          description: "Your model was created successfully",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      setIdModelUpdate(0);
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
          size="md"
          mt="20px"
        >
          Add Model
        </Button>
      )}
      {mode === Model.Update && (
        <>
          <Button
            onClick={() => handleDataLocalStorage()}
            colorScheme="yellow"
            color="gray.800"
            size="md"
            mt="20px"
          >
            Update Model
          </Button>
          <Button
            onClick={() => {
              setMode(Model.Add);
              setIdModelUpdate(0);
            }}
            colorScheme="red"
            color="white"
            size="md"
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

export default ToastMessage;
