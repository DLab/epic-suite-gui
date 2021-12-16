import { ViewIcon, DeleteIcon, CloseIcon } from "@chakra-ui/icons";
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
  Button,
} from "@chakra-ui/react";
import { useState, useEffect, useContext } from "react";

import GeoSelectionsDetails from "components/map-results/selectorMap/GeoSelectionsDetails";
import { SelectFeature } from "context/SelectFeaturesContext";

interface Props {
  setSeeSelections: (value: boolean) => void;
}

const GeoSelectionsTab = ({ setSeeSelections }: Props) => {
  const { geoSelections, setGeoSelections } = useContext(SelectFeature);
  const [viewDetails, setViewDetails] = useState(false);
  const [geoSelectionDetails, setGeoSelectionDetails] = useState([]);

  useEffect(() => {
    setViewDetails(false);
  }, [geoSelections]);

  const deleteGeoSelection = (id: number) => {
    localStorage.removeItem("geoSelection");
    const geoSelectionFilter = geoSelections.filter(
      (geoSelection) => geoSelection.id !== +id
    );
    localStorage.setItem("geoSelection", JSON.stringify(geoSelectionFilter));
    setGeoSelections({ type: "removeGeoSelection", element: `${id}` });
  };

  const viewGeoSelectionsDetails = (id: number) => {
    const details = geoSelections.filter(
      (geoSelection) => geoSelection.id === id
    );
    setGeoSelectionDetails(details);
    setViewDetails(true);
  };

  return (
    <>
      {geoSelections.length > 0 ? (
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
                  <Th>Name</Th>
                  <Th>Scale</Th>
                  <Th> </Th>
                  <Th> </Th>
                </Tr>
              </Thead>
              <Tbody>
                {geoSelections.map((geoSelection) => {
                  return (
                    <Tr key={geoSelection.id}>
                      <Td>{geoSelection.name}</Td>
                      <Td>{geoSelection.scale}</Td>
                      <Td>
                        <Icon
                          color="#16609E"
                          as={ViewIcon}
                          cursor="pointer"
                          onClick={() => {
                            viewGeoSelectionsDetails(geoSelection.id);
                          }}
                        />
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
              <GeoSelectionsDetails
                details={geoSelectionDetails}
                setSeeSelections={setSeeSelections}
              />
            </Flex>
          )}
        </Flex>
      ) : (
        <Flex color="#858585" justify="center" fontSize="24px" mt="15%">
          <Text>There is not geographic selections added</Text>
        </Flex>
      )}
      <Flex justify="end">
        <Button
          colorScheme="teal"
          size="md"
          m="2% 5% 0 0"
          zIndex="1000"
          onClick={() => {
            setSeeSelections(false);
          }}
        >
          See Map
        </Button>
      </Flex>
    </>
  );
};

export default GeoSelectionsTab;
