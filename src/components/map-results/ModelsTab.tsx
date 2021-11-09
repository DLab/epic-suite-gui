import { ViewIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
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
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

import ModelDetails from "./ModelDetails";

type ModelsData = {
  model_name: string;
  name: string;
  compartments?: string[];
  t_init: number;
  t_end: number;
  timestep: number;
  pI_det: number;
  beta: number;
  mu: number;
  r_R_S: number;
  alfa: number;
  tE_I: number;
  tI_R: number;
  population: number;
  R: number;
  I: number;
  I_d: number;
  I_ac: number;
  E: number;
};

const ModelsTab = () => {
  const [data, setData] = useState<ModelsData[] | []>({});
  const [viewDetails, setViewDetails] = useState(false);
  const [modelDetails, setmodelDetails] = useState([]);

  const getData = () => {
    let datamodels = {
      data: [],
    };
    setTimeout(() => {
      datamodels = JSON.parse(sessionStorage.getItem("models"));
      if (datamodels === null) {
        getData();
      }
      setData(datamodels.data);
    }, 500);
    setData(datamodels.data);
  };

  const chargeData = () => {
    const x = JSON.parse(sessionStorage.getItem("models"));
    setData(x);
  };

  // const viewModelDetails = (name: string) => {
  //   const details = data.filter((model) => model.name === name);
  //   setmodelDetails(details);
  //   setViewDetails(true);
  // };

  const deleteModel = (name: string) => {
    sessionStorage.clear();
    const modelDataFilter = data.filter(
      (model) => model.parameters.name_model !== name
    );
    sessionStorage.setItem("models", JSON.stringify(modelDataFilter));
    chargeData();
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {data.length > 0 ? (
        <Flex w="60%">
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
                        // onClick={() => {
                        //   viewModelDetails(model.name);
                        // }}
                      />
                    </Td>
                    <Td>
                      <Icon color="#16609E" as={EditIcon} />
                    </Td>
                    <Td>
                      <Icon
                        color="#16609E"
                        as={DeleteIcon}
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
      ) : (
        <Flex color="#858585" justify="center" fontSize="24px" mt="15%">
          <Text>There is not models added</Text>
        </Flex>
      )}
      {/* {viewDetails && <ModelDetails details={modelDetails} />} */}
    </>
  );
};

export default ModelsTab;
