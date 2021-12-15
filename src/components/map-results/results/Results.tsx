import { DeleteIcon } from "@chakra-ui/icons";
import { Box, Flex, Text, Spinner, Button } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useContext } from "react";

import { GraphicsData } from "context/GraphicsContext";
import { TabIndex } from "context/TabContext";

import Exports from "./Exports";
import ResultsSelection from "./ResultsSelection";
import SeeGraphic from "./SeeGraphic";

const Graphic = dynamic(() => import("./Graphic"), {
  loading: () => (
    <Flex justifyContent="center" alignItems="center">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Flex>
  ),
  ssr: false,
});
const Results = () => {
  const { aux: responseSim } = useContext(TabIndex);
  const { allGraphicData, setAllGraphicData, savedSimulation } =
    useContext(GraphicsData);

  return (
    <Flex w="100%" p="5px" mt="15px" h="100%" textAlign="center">
      {responseSim ? (
        <>
          <Flex
            minWidth="25%"
            maxWidth="25%"
            w="25%"
            direction="column"
            justify="space-between"
          >
            <ResultsSelection />
            <Box h="15%">
              <Button
                colorScheme="teal"
                size="md"
                mt="20px"
                minH="30px"
                onClick={() => {
                  setAllGraphicData([...allGraphicData, savedSimulation]);
                }}
              >
                Chart
              </Button>
            </Box>
          </Flex>
          <Flex w="75%" direction="column" justify="space-between">
            {allGraphicData.length > 0 ? (
              <Flex
                flexWrap="wrap"
                h="100%"
                overflowY="auto"
                justify="space-evenly"
              >
                {allGraphicData.map((graphicData, index) => {
                  return (
                    <Box>
                      <Flex justify="end">
                        {" "}
                        <SeeGraphic savedKeys={graphicData} index={index} />
                        <DeleteIcon
                          color="#16609E"
                          ml="2%"
                          cursor="pointer"
                          onClick={() => {
                            const aux = allGraphicData.filter((x, y) => {
                              if (y === index) {
                                return false;
                              }
                              return true;
                            });
                            setAllGraphicData(aux);
                          }}
                        >
                          Delete
                        </DeleteIcon>
                      </Flex>
                      <Graphic
                        savedSimulationKeys={graphicData}
                        index={index}
                        width="470"
                        height="340"
                      />
                    </Box>
                  );
                })}
              </Flex>
            ) : (
              <Flex h="100%" justify="center" align="center">
                <Text> There are no graphics to show.</Text>
              </Flex>
            )}
            <Exports data={responseSim} />
          </Flex>
        </>
      ) : (
        <Flex h="100%" w="100%" justify="center" align="center">
          <Text> Nothing here.</Text>
        </Flex>
      )}
    </Flex>
  );
};

export default Results;
