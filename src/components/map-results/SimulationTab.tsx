import { AddIcon, InfoIcon } from "@chakra-ui/icons";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Box,
  Flex,
  Tooltip,
  IconButton,
  Icon,
} from "@chakra-ui/react";
import moment from "moment";
import { useContext } from "react";

import { SimulationSetted } from "context/SimulationContext";
import { OptionFeature } from "types/SimulationTypes";
import createIdComponent from "utils/createIdcomponent";

import SimulationItem from "./SimulationItem";

const SimulationTab = () => {
  const { simulation, setSimulation } = useContext(SimulationSetted);
  return (
    <Flex
      id={createIdComponent()}
      h="92%"
      maxH="92%"
      flexWrap="wrap"
      overflowY="scroll"
    >
      <Box id={createIdComponent()} w="100%">
        <Table
          id={createIdComponent()}
          size="md"
          bg="#FFFFFF"
          borderRadius="md"
        >
          <Thead id={createIdComponent()}>
            <Tr>
              <Th>Name Simulation</Th>
              <Th>Model Parameters</Th>
              <Th>
                Initial Date
                <Tooltip
                  id={createIdComponent()}
                  label="Disabled on graph simulation"
                >
                  <Icon
                    id={createIdComponent()}
                    as={InfoIcon}
                    ml="10%"
                    w="14px "
                    color="teal"
                  />
                </Tooltip>
              </Th>
              <Th>Graph / Spatial</Th>
              <Th>Selection</Th>
              <Th>Initial Conditions</Th>
              <Th minW="10px">
                {" "}
                <Flex
                  id={createIdComponent()}
                  justifyContent="center"
                  alignItems="flex-end"
                  w="100%"
                >
                  <Tooltip id={createIdComponent()} label="Add Simulation">
                    <IconButton
                      id={createIdComponent()}
                      bg="#16609E"
                      color="#FFFFFF"
                      aria-label="Call Segun"
                      size="sm"
                      cursor="pointer"
                      _hover={{ bg: "blue.500" }}
                      icon={<AddIcon />}
                      onClick={() =>
                        setSimulation({
                          type: "add",
                          payload: {
                            name: "",
                            idSim: Date.now(),
                            idModel: 0,
                            idGeo: 0,
                            idGraph: 0,
                            t_init: moment().format("YYYY-MM-D"),
                            typeSelection: OptionFeature.None,
                            initialConditions: {
                              population: 0,
                              R: 0,
                              I: 0,
                              I_d: 0,
                              I_ac: 0,
                              E: 0,
                            },
                          },
                        })
                      }
                    />
                  </Tooltip>
                </Flex>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {simulation.length > 0 &&
              simulation &&
              simulation.map((e) => (
                <SimulationItem
                  key={createIdComponent()}
                  idSimulation={e.idSim}
                />
              ))}
          </Tbody>
        </Table>
      </Box>
    </Flex>
  );
};

export default SimulationTab;
