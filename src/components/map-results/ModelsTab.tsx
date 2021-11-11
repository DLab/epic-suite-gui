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
import { useState, useEffect, useContext } from "react";

import { ModelsSaved } from "context/ModelsContext";

const ModelsTab = () => {
  const { parameters, setParameters } = useContext(ModelsSaved);
  const [data, setData] = useState([]);
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.localStorage.getItem("models")
    ) {
      const asdf = window.localStorage.getItem("models");
      setData(JSON.parse(asdf));
    }
  }, [parameters]);
  const deleteModel = (name: string) => {
    localStorage.clear();
    const modelDataFilter = data.filter((model) => model.id !== name);
    localStorage.setItem("models", JSON.stringify(modelDataFilter));
    setParameters({ type: "remove", element: `${name}` });
  };
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
                  <Tr key={model.id}>
                    <Td>
                      <Checkbox defaultIsChecked />
                    </Td>
                    <Td>{model.parameters.name_model}</Td>
                    <Td>{model.parameters.name}</Td>
                    <Td>{model.parameters.E}</Td>
                    <Td>
                      <Icon color="#16609E" as={ViewIcon} />
                    </Td>
                    <Td>
                      <Icon color="#16609E" as={EditIcon} />
                    </Td>
                    <Td>
                      <Icon
                        color="#16609E"
                        as={DeleteIcon}
                        onClick={() => deleteModel(model.id)}
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
    </>
  );
};

export default ModelsTab;
