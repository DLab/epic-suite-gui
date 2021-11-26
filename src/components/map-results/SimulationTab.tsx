import { Table, Thead, Tbody, Tr, Th, Icon, Box, Flex } from "@chakra-ui/react";
import { useContext } from "react";

import PlusIcon from "components/icons/PlusIcon";
import { SimulationSetted, OptionFeature } from "context/SimulationContext";

import SimulationItem from "./SimulationItem";

const SimulationTab = () => {
  const { simulation, setSimulation } = useContext(SimulationSetted);
  return (
    <Flex h="95%" flexWrap="wrap" overflowY="scroll">
      <Box>
        <Table size="md" bg="#FFFFFF" borderRadius="md">
          <Thead>
            <Tr>
              <Th>Model Parameters</Th>
              <Th>Graph / Spatial</Th>
              <Th>Selection</Th>
              <Th>Initial Conditions</Th>
              <Th> </Th>
            </Tr>
          </Thead>
          <Tbody>
            {simulation.length > 0 &&
              simulation.map((e) => (
                <SimulationItem key={e.idSim} idSimulation={e.idSim} />
              ))}
          </Tbody>
        </Table>
      </Box>
      <Flex justifyContent="center" alignItems="flex-end" w="100%" pb="1rem">
        <Icon
          stroke="#16609E"
          fill="#ffffff"
          w="40px"
          h="40px"
          as={PlusIcon}
          cursor="pointer"
          onClick={() =>
            setSimulation({
              type: "add",
              payload: {
                idSim: Date.now(),
                idModel: 0,
                idGeo: 0,
                idGraph: 0,
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
      </Flex>
    </Flex>
  );
};

export default SimulationTab;
