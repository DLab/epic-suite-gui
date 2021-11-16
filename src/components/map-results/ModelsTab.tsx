import { ViewIcon, EditIcon, DeleteIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  Icon,
  Flex,
  Text,
  Box,
} from "@chakra-ui/react";
import { useState, useEffect, useContext } from "react";

import {
  ControlPanel,
  EpidemicsData,
  Model,
} from "context/ControlPanelContext";
import { ModelsSaved } from "context/ModelsContext";

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
    if (
      typeof window !== "undefined" &&
      window.localStorage.getItem("models")
    ) {
      const asdf = window.localStorage.getItem("models");
      setData(JSON.parse(asdf));
    }
    setViewDetails(false);
  }, [parameters]);

  const deleteModel = (name: string) => {
    localStorage.removeItem("models");
    const modelDataFilter = data.filter((model) => model.id !== name);
    localStorage.setItem("models", JSON.stringify(modelDataFilter));
    setParameters({ type: "remove", element: `${name}` });
  };
  const updateModel = (id: number, dataForUpdate: EpidemicsData) => {
    setMode(Model.Update);
    setIdModelUpdate(id);
    setParams({ type: "update", updateData: dataForUpdate });
  };
  const viewModelDetails = (name: string) => {
    const details = data.filter((model) => model.id === name);
    setmodelDetails(details);
    setViewDetails(true);
  };

  return (
    <>
      {data.length > 0 ? (
        <Flex>
          <Flex
            w="60%"
            h="50%"
            borderRadius="md"
            border="1px solid"
            borderColor="#b7b7b7"
          >
            <Table size="md" bg="#FFFFFF" borderRadius="md">
              <Thead>
                <Tr>
                  <Th> </Th>
                  <Th>Name</Th>
                  <Th>Model</Th>
                  <Th>Exposed</Th>
                  <Th> </Th>
                  <Th> </Th>
                  <Th> </Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.map((model) => {
                  return (
                    <Tr key={model.id}>
                      <Td>
                        <Checkbox defaultIsChecked />
                      </Td>
                      <Td>{model.parameters.name_model}</Td>
                      <Td>{model.parameters.name}</Td>
                      <Td>{model.parameters.E}</Td>
                      <Td>
                        <Icon
                          color="#16609E"
                          as={ViewIcon}
                          cursor="pointer"
                          onClick={() => {
                            setViewDetails(false);
                            viewModelDetails(model.id);
                          }}
                        />
                      </Td>
                      <Td>
                        <Icon
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
              bg="#FFFFFF"
              w="40%"
              m="0 5%"
              p="2%"
              direction="column"
              borderRadius="md"
              border="1px solid"
              borderColor="#b7b7b7"
            >
              <Box textAlign="end">
                <Icon
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
        <Flex color="#858585" justify="center" fontSize="24px" mt="15%">
          <Text>There is not models added</Text>
        </Flex>
      )}
    </>
  );
};

export default ModelsTab;
