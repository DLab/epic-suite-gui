/* eslint-disable @typescript-eslint/naming-convention */
import { Box, Select, Text, Flex } from "@chakra-ui/react";
import React, { useContext } from "react";

import NumberInputEpi from "../../NumberInputEpi";
import { ControlPanel } from "context/ControlPanelContext";

const SimulationController = () => {
  const { setParameters, parameters } = useContext(ControlPanel);
  const { t_init, t_end, timestep } = parameters;
  return (
    <>
      <Box>
        <Text flex="1" textAlign="left">
          Model
        </Text>
        <Select
          size="sm"
          onChange={(e) => {
            setParameters({
              type: "set",
              target: "name",
              payload: +e.target.value,
            });
          }}
        >
          <option value="SEIR">SEIR</option>
        </Select>
      </Box>
      <Flex justify="space-between">
        <Box>
          <NumberInputEpi
            value={t_init}
            setValue={setParameters}
            min={0}
            max={Infinity}
            nameParams="t_init"
            type="number"
          />
        </Box>
        <Box>
          <NumberInputEpi
            value={t_end}
            setValue={setParameters}
            min={
              typeof t_init === "string" ? parseInt(t_init, 10) + 1 : t_init + 1
            }
            max={Infinity}
            nameParams="t_end"
            type="number"
          />
        </Box>
      </Flex>
      <Box>
        <NumberInputEpi
          value={timestep}
          setValue={setParameters}
          min={0.01}
          max={0.1}
          step={0.01}
          nameParams="timestep"
          type="slider"
        />
      </Box>
    </>
  );
};

export default SimulationController;
