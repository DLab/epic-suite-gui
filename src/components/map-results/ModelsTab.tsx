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
import React, { useState, useEffect } from "react";

import { EpidemicsData } from "../../context/ControlPanelContext";

import ModelDetails from "./ModelDetails";

interface ModelType {
  spatialSelection: [];
  parameters: EpidemicsData;
}

const ModelsTab = () => {
  const [data, setData] = useState<ModelType[]>([]);
  const [viewDetails, setViewDetails] = useState(false);
  const [modelDetails, setmodelDetails] = useState([]);

  const getData = () => {
    let datamodels = {
      data: [],
    };
    setTimeout(() => {
      datamodels = JSON.parse(sessionStorage.getItem("models"));
      if (datamodels === null || datamodels === undefined) {
        getData();
      }
      setData(datamodels.data);
    }, 500);
    setData(datamodels.data);
  };

  const loadData = () => {
    const dataLoaded = JSON.parse(sessionStorage.getItem("models"));
    setData(dataLoaded.data);
  };

  const viewModelDetails = (name: string) => {
    const details = data.filter(
      (model) => model.parameters.name_model === name
    );
    setmodelDetails(details);
    setViewDetails(true);
  };

  const deleteModel = (name: string) => {
    sessionStorage.clear();
    const modelDataFilter = data.filter(
      (model) => model.parameters.name_model !== name
    );
    sessionStorage.setItem("models", JSON.stringify({ data: modelDataFilter }));
    loadData();
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {data.length > 0 ? (
        <Flex>
          <Flex w="60%" h="50%">
            <Table size="md" bg="#FFFFFF">
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
                    <Tr>
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
                            viewModelDetails(model.parameters.name_model);
                          }}
                        />
                      </Td>
                      <Td>
                        <Icon color="#16609E" as={EditIcon} cursor="pointer" />
                      </Td>
                      <Td>
                        <Icon
                          color="#16609E"
                          as={DeleteIcon}
                          cursor="pointer"
                          onClick={() => {
                            deleteModel(model.parameters.name_model);
                          }}
                        />
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </Flex>
          {viewDetails && (
            <Flex bg="#FFFFFF" w="40%" m="0 5%" p="2% 5%" direction="column">
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
              <Text textAlign="center" fontWeight="400">
                Details
              </Text>
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
