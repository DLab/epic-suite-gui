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
  const { parameters, setParameters } = useContext(ModelsSaved);
  const {
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
    if (parameters.length > 1) {
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
                  }}
                >
                  <p>{ParametersModels.name_model}</p>
                </Tab>
              )
            )}
            <Tooltip id={createIdComponent()} label="Create Model">
              <IconButton
                id={createIdComponent()}
                bg="#16609E"
                color="#FFFFFF"
                aria-label="Call Segun"
                size="sm"
                cursor="pointer"
                _hover={{ bg: "blue.500" }}
                icon={<AddIcon />}
                onClick={() => {
                  setParameters({
                    type: "add",
                    payload: {
                      id: Date.now(),
                      parameters: initialState,
                    },
                  });
                  localStorage.setItem(
                    "models",
                    JSON.stringify([
                      ...parameters,
                      {
                        id: Date.now(),
                        parameters: initialState,
                      },
                    ])
                  );
                }}
              />
            </Tooltip>
          </TabList>

          <TabPanels display="flex">
            {parameters.map(
              ({ parameters: ParametersModels, id }: DataParameters) => (
                <TabPanel
                  w="100%"
                  key={createIdComponent()}
                  border="2px"
                  borderColor="gray.200"
                >
                  {!isEditing ? (
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
                  ) : (
                    <ModelBuilder />
                  )}
                </TabPanel>
              )
            )}
            <Flex direction="column">
              <IconButton
                id={createIdComponent()}
                color="#16609E"
                aria-label="Call Segun"
                size="sm"
                cursor="pointer"
                _hover={{ bg: "blue.500", color: "#ffffff" }}
                icon={<EditIcon />}
                onClick={() => {
                  setIsEditing(true);
                  updateModel(
                    idModel,
                    parameters.find((e) => e.id === idModel).parameters
                  );
                }}
              />
              <IconButton
                id={createIdComponent()}
                color="#16609E"
                aria-label="Call Segun"
                size="sm"
                cursor="pointer"
                _hover={{ bg: "blue.500", color: "#ffffff" }}
                icon={<DeleteIcon />}
                onClick={() => deleteModel(`${idModel}`)}
              />
              {isEditing && <ToastMessage closeUpdatingModel={setIsEditing} />}
            </Flex>
          </TabPanels>
        </Tabs>
      ) : (
        <p>nada</p>
      )}
    </>
  );
};

export default ModelsPills;
