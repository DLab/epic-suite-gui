import {
  AddIcon,
  EditIcon,
  DeleteIcon,
  CheckIcon,
  CloseIcon,
} from "@chakra-ui/icons";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Tooltip,
  IconButton,
  Text,
  Heading,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { useContext, useState, useEffect } from "react";

import { DataParameters } from "../../types/ModelsTypes";
import ToastMessage from "components/simulator/controllers/ToastMessage";
import ModelBuilder from "components/simulator/ModelBuilder";
import { ControlPanel, initialState } from "context/ControlPanelContext";
import { ModelsSaved } from "context/ModelsContext";
import { EpidemicsData, Model } from "types/ControlPanelTypes";
import createIdComponent from "utils/createIdcomponent";

const ModelsPills = () => {
  const toast = useToast();
  const { parameters, setParameters } = useContext(ModelsSaved);
  const {
    parameters: params,
    setParameters: setParams,
    setMode,
    setIdModelUpdate,
  } = useContext(ControlPanel);
  const [idModel, setIdModel] = useState<number>(0);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [tabIndex, setTabIndex] = useState<number>(0);
  const deleteModel = (name: string) => {
    // localStorage.removeItem("models");
    const modelDataFilter = parameters.filter(
      (model: DataParameters) => model.id !== +name
    );
    localStorage.setItem("models", JSON.stringify(modelDataFilter));
    setParameters({ type: "remove", element: `${name}` });
  };
  const updateModel = (id: number, dataForUpdate: EpidemicsData) => {
    setMode(Model.Update);
    setIdModelUpdate(id);
    setParams({ type: "update", updateData: dataForUpdate });
  };
  useEffect(() => {
    if (parameters.length > 0) {
      setIdModel(parameters[parameters.length - 1].id);
      setTabIndex(parameters.length - 1);
    } else {
      setIdModel(0);
      setTabIndex(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parameters.length]);
  return (
    <>
      {parameters.length > 0 ? (
        <Tabs
          display="flex"
          index={tabIndex}
          onChange={(e) => {
            if (isEditing) {
              setMode(Model.Add);
              setIsEditing(false);
              setIdModelUpdate(0);
              toast({
                position: "bottom-left",
                title: "Mode Edition was stopped",
                description: "Your model wasn't updated",
                status: "warning",
                duration: 2000,
                isClosable: true,
              });
            }
            setTabIndex(e);
            setIdModel(parameters[e].id);
          }}
        >
          <TabList display="flex" flexDirection="column">
            {parameters.map(
              ({ parameters: ParametersModels, id }: DataParameters) => (
                <Tab
                  key={createIdComponent()}
                  _selected={{ color: "white", bg: "blue.500" }}
                  onClick={() => {
                    setIdModel(id);
                    setIsEditing(true);
                  }}
                >
                  <p>{ParametersModels.name_model}</p>
                </Tab>
              )
            )}
            <Tooltip label="Create Model">
              <IconButton
                bg="#16609E"
                color="#FFFFFF"
                aria-label="Call Segun"
                size="sm"
                isDisabled={isEditing}
                cursor="pointer"
                _hover={{ bg: "blue.500" }}
                icon={<AddIcon />}
                onClick={() => {
                  if (!isEditing) {
                    const idNew = Date.now();
                    setParameters({
                      type: "add",
                      payload: {
                        id: idNew,
                        parameters: initialState,
                      },
                    });
                    localStorage.setItem(
                      "models",
                      JSON.stringify([
                        ...parameters,
                        {
                          id: idNew,
                          parameters: initialState,
                        },
                      ])
                    );
                    setIdModel(idNew);
                    setIsEditing(true);
                    updateModel(idNew, initialState);
                  }
                }}
              />
            </Tooltip>
          </TabList>
          {!isEditing && (
            <TabPanels display="flex">
              {parameters.map(
                ({ parameters: ParametersModels, id }: DataParameters) => (
                  <TabPanel
                    w="100%"
                    key={createIdComponent()}
                    border="2px"
                    borderColor="gray.200"
                  >
                    <>
                      <Heading fontSize={24} as="h2">
                        {ParametersModels.name_model}
                      </Heading>
                      <Text>Model: {ParametersModels.name}</Text>
                      <Heading pt="1rem" fontSize={24} as="h3">
                        Models parameters
                      </Heading>
                      <Text>
                        Duration: {ParametersModels.t_end}{" "}
                        {ParametersModels.t_end === 1 ? "day" : "days."}
                      </Text>
                      <Text>Beta (β): {ParametersModels.beta}</Text>
                      <Text>Mu (μ): {ParametersModels.mu}</Text>
                      <Text>pI_det: {ParametersModels.pI_det}</Text>
                      <Text>rR_S: {ParametersModels.rR_S}</Text>
                      <Text>tE_I: {ParametersModels.tE_I}</Text>
                      <Text>tI_R: {ParametersModels.tI_R}</Text>
                      <Heading pt="1rem" fontSize={24} as="h3">
                        Interventions parameters
                      </Heading>
                      <Text>Alpha (α): {ParametersModels.alpha}</Text>
                    </>
                  </TabPanel>
                )
              )}
            </TabPanels>
          )}
          {isEditing && <ModelBuilder />}
          <Flex direction="column">
            <IconButton
              color="#16609E"
              aria-label="Call Segun"
              size="sm"
              cursor="pointer"
              isDisabled={isEditing}
              _hover={{ bg: "blue.500", color: "#ffffff" }}
              icon={<EditIcon />}
              onClick={() => {
                if (!isEditing) {
                  setIsEditing(true);
                  updateModel(
                    idModel,
                    parameters.find((e) => e.id === idModel).parameters
                  );
                }
              }}
            />
            <IconButton
              color="#16609E"
              aria-label="Call Segun"
              size="sm"
              cursor="pointer"
              _hover={{ bg: "blue.500", color: "#ffffff" }}
              icon={<DeleteIcon />}
              isDisabled={isEditing}
              onClick={() => {
                if (!isEditing) {
                  deleteModel(`${idModel}`);
                }
              }}
            />
            {isEditing && (
              <ToastMessage
                isEditing={isEditing}
                closeUpdatingModel={setIsEditing}
              />
            )}
          </Flex>
        </Tabs>
      ) : (
        <Tabs>
          <Tooltip label="Create Model">
            <IconButton
              bg="#16609E"
              color="#FFFFFF"
              aria-label="Call Segun"
              size="sm"
              cursor="pointer"
              isDisabled={isEditing}
              _hover={{ bg: "blue.500" }}
              icon={<AddIcon />}
              onClick={() => {
                if (!isEditing) {
                  const idM = Date.now();
                  setParameters({
                    type: "add",
                    payload: {
                      id: idM,
                      parameters: initialState,
                    },
                  });
                  localStorage.setItem(
                    "models",
                    JSON.stringify([
                      ...parameters,
                      {
                        id: idM,
                        parameters: initialState,
                      },
                    ])
                  );
                  setIdModel(idM);
                  updateModel(idM, initialState);
                  setIsEditing(true);
                }
              }}
            />
          </Tooltip>
        </Tabs>
      )}
    </>
  );
};

export default ModelsPills;
