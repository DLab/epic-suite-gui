import { ViewIcon, DeleteIcon, CloseIcon } from "@chakra-ui/icons";
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

import SelectFeatureContext from "context/SelectFeaturesContext";

const GeoSelectionsTab = () => {
  const { geoSelections, setGeoSelections } = useContext(SelectFeatureContext);
  const [data, setData] = useState([]);
  const [viewDetails, setViewDetails] = useState(false);
  const [geoSelectionDetails, setgeoSelectionDetails] = useState([]);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.localStorage.getItem("geoSelection")
    ) {
      const localStorageGeoSelection =
        window.localStorage.getItem("geoSelection");
      setData(JSON.parse(localStorageGeoSelection));
    }
    setViewDetails(false);
  }, [geoSelections]);

  const deleteGeoSelection = (id: string) => {
    localStorage.clear();
    const geoSelectionFilter = data.filter(
      (geoSelection) => geoSelection.id !== id
    );
    localStorage.setItem("geoSelection", JSON.stringify(geoSelectionFilter));
    setGeoSelections({ type: "removeGeoSelection", element: `${id}` });
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
                  <Th>Scale</Th>
                  <Th> </Th>
                  <Th> </Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.map((geoSelection) => {
                  return (
                    <Tr key={geoSelection.id}>
                      <Td>
                        <Checkbox defaultIsChecked />
                      </Td>
                      <Td>{geoSelection.name}</Td>
                      <Td>{geoSelection.mode}</Td>
                      <Td>
                        <Icon color="#16609E" as={ViewIcon} cursor="pointer" />
                      </Td>
                      <Td>
                        <Icon
                          color="#16609E"
                          as={DeleteIcon}
                          cursor="pointer"
                          onClick={() => deleteGeoSelection(geoSelection.id)}
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
              <h1>Details</h1>
            </Flex>
          )}
        </Flex>
      ) : (
        <Flex color="#858585" justify="center" fontSize="24px" mt="15%">
          <Text>There is not geographic selections added</Text>
        </Flex>
      )}
    </>
  );
};

export default GeoSelectionsTab;
