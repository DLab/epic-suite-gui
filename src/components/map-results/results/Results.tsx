import { DeleteIcon } from "@chakra-ui/icons";
import { Box, Flex, Text, Spinner, Button } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useContext } from "react";

import { GraphicsData } from "context/GraphicsContext";
import { TabIndex } from "context/TabContext";
import createIdComponent from "utils/createIdcomponent";

import Exports from "./Exports";
import ResultsSelection from "./ResultsSelection";
import SeeGraphic from "./SeeGraphic";

const Graphic = dynamic(() => import("./Graphic"), {
  loading: () => (
    <Flex id={createIdComponent()} justifyContent="center" alignItems="center">
      <Spinner
        id={createIdComponent()}
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
    <Flex
      id={createIdComponent()}
      w="100%"
      p="5px"
      mt="15px"
      h="100%"
      textAlign="center"
    >
      {responseSim ? (
        <>
          <Flex
            id={createIdComponent()}
            minWidth="25%"
            maxWidth="25%"
            w="25%"
            direction="column"
            justify="space-between"
          >
            <ResultsSelection />
            <Box id={createIdComponent()} h="15%">
              <Button
                id={createIdComponent()}
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
          <Flex
            w="75%"
            id={createIdComponent()}
            direction="column"
            justify="space-between"
          >
            {allGraphicData.length > 0 ? (
              <Flex
                id={createIdComponent()}
                flexWrap="wrap"
                h="100%"
                overflowY="auto"
                justify="space-evenly"
              >
                {allGraphicData.map((graphicData, index) => {
                  return (
                    <Box id={createIdComponent()}>
                      <Flex justify="end" id={createIdComponent()}>
                        {" "}
                        <SeeGraphic savedKeys={graphicData} index={index} />
                        <DeleteIcon
                          id={createIdComponent()}
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
              <Flex
                id={createIdComponent()}
                h="100%"
                justify="center"
                align="center"
              >
                <Text id={createIdComponent()}>
                  {" "}
                  There are no graphics to show.
                </Text>
              </Flex>
            )}
            <Exports data={responseSim} />
          </Flex>
        </>
      ) : (
        <Flex
          id={createIdComponent()}
          h="100%"
          w="100%"
          justify="center"
          align="center"
        >
          <Text id={createIdComponent()}> Nothing here.</Text>
        </Flex>
      )}
    </Flex>
  );
};

export default Results;
