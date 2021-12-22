import { ViewIcon, EditIcon, DeleteIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Icon,
  Flex,
  Text,
  Box,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useState, useEffect, useContext } from "react";

import { ControlPanel } from "context/ControlPanelContext";
import { ModelsSaved } from "context/ModelsContext";
import { EpidemicsData, Model } from "types/ControlPanelTypes";
import { DataParameters } from "types/ModelsTypes";
import createIdComponent from "utils/createIdcomponent";

import ModelDetails from "./ModelDetails";

const ModelsTab = () => {
  const { parameters, setParameters } = useContext(ModelsSaved);
  const {
    setParameters: setParams,
    setMode,
    setIdModelUpdate,
  } = useContext(ControlPanel);
  const [data, setData] = useState([]);
  const [viewDetails, setViewDetails] = useState(false);
  const [modelDetails, setmodelDetails] = useState([]);

  useEffect(() => {
    setViewDetails(false);
  }, [parameters]);

  const deleteModel = (name: string) => {
    localStorage.removeItem("models");
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
  const viewModelDetails = (name: string) => {
    const details = parameters.filter(
      (model: DataParameters) => model.id === +name
    );
    setmodelDetails(details);
    setViewDetails(true);
  };

  return (
    <>
      {parameters.length > 0 ? (
        <Flex id={createIdComponent()}>
          <Flex
            id={createIdComponent()}
            w="60%"
            h="50%"
            borderRadius="md"
            border="1px solid"
            borderColor="#b7b7b7"
          >
            <Table
              id={createIdComponent()}
              size="md"
              bg="#FFFFFF"
              borderRadius="md"
            >
              <Thead id={createIdComponent()}>
                <Tr>
                  <Th>Name</Th>
                  <Th>Model</Th>
                  <Th> </Th>
                  <Th> </Th>
                  <Th> </Th>
                </Tr>
              </Thead>
              <Tbody>
                {parameters.map((model) => {
                  return (
                    <Tr key={createIdComponent()}>
                      <Td>{model.parameters.name_model}</Td>
                      <Td>{model.parameters.name}</Td>
                      <Td>
                        <Icon
                          id={createIdComponent()}
                          color="#16609E"
                          as={ViewIcon}
                          cursor="pointer"
                          onClick={() => {
                            viewModelDetails(model.id);
                          }}
                        />
                      </Td>
                      <Td>
                        <Icon
                          id={createIdComponent()}
                          color="#16609E"
                          as={EditIcon}
                          cursor="pointer"
                          onClick={() => {
                            updateModel(model.id, model.parameters);
                          }}
                        />
                      </Td>
                      <Td>
                        <Icon
                          id={createIdComponent()}
                          color="#16609E"
                          as={DeleteIcon}
                          cursor="pointer"
                          onClick={() => deleteModel(model.id)}
                        />
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </Flex>
          {viewDetails && (
            <Flex
              id={createIdComponent()}
              bg="#FFFFFF"
              w="40%"
              m="0 5%"
              p="2%"
              direction="column"
              borderRadius="md"
              border="1px solid"
              borderColor="#b7b7b7"
            >
              <Box textAlign="end" id={createIdComponent()}>
                <Icon
                  id={createIdComponent()}
                  as={CloseIcon}
                  cursor="pointer"
                  color="#16609E"
                  w="13 px"
                  onClick={() => {
                    setViewDetails(false);
                  }}
                />
              </Box>
              <ModelDetails details={modelDetails} />{" "}
            </Flex>
          )}
        </Flex>
      ) : (
        <Flex
          id={createIdComponent()}
          color="#858585"
          justify="center"
          fontSize="24px"
          mt="15%"
        >
          <Text id={createIdComponent()}>There are no models added</Text>
        </Flex>
      )}
    </>
  );
};

export default ModelsTab;
