/* eslint-disable @typescript-eslint/naming-convention */
import {
  Box,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Select,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Input,
  Flex,
} from "@chakra-ui/react";
import React, { useContext } from "react";

import { ControlPanel } from "context/ControlPanelContext";

const SimulationController = () => {
  const { setParameters, parameters } = useContext(ControlPanel);
  const { t_init, t_end, timestep } = parameters;
  return (
    <AccordionItem id="simulation" bg="#16609E" mb="30px">
      <h2>
        <AccordionButton color="white">
          <Box flex="1" textAlign="left">
            Simulation
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4} bg="#FAFAFA">
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
                payload: e.target.value,
              });
            }}
          >
            <option value="SEIR">SEIR</option>
            {/* <option value="SEIRHUB">SEIRHUB</option>
            <option value="SIR">SIR</option> */}
          </Select>
        </Box>
        <Flex justify="space-between">
          <Box>
            <Text flex="1" textAlign="left">
              t_init
            </Text>
            <NumberInput
              size="xs"
              h="25px"
              ml="10% "
              defaultValue={t_init}
              min={0}
              onChange={(e) => {
                setParameters({
                  type: "set",
                  target: "t_init",
                  payload: e,
                });
              }}
            >
              <NumberInputField w="70px" />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Box>
          <Box>
            <Text flex="1" textAlign="left">
              t_end
            </Text>
            <NumberInput
              size="xs"
              h="25px"
              ml="10% "
              defaultValue={t_end}
              min={parseInt(t_init, 10) + 1}
              onChange={(e) => {
                setParameters({
                  type: "set",
                  target: "t_end",
                  payload: e,
                });
              }}
            >
              <NumberInputField w="70px" />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Box>
        </Flex>
        <Box>
          <Text flex="1" textAlign="left">
            timestep
          </Text>
          <Flex>
            <Slider
              size="md"
              id="s1"
              aria-label="timestep"
              defaultValue={timestep}
              min={0.01}
              max={0.1}
              mt="20px"
              value={timestep}
              step={0.01}
              onChange={(e) => {
                setParameters({ type: "set", target: "timestep", payload: e });
              }}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
            <NumberInput
              size="xs"
              h="100%"
              ml="10% "
              defaultValue={timestep}
              value={timestep}
              min={0.01}
              max={0.1}
              step={0.01}
              onChange={(e) => {
                setParameters({ type: "set", target: "timestep", payload: e });
              }}
            >
              <NumberInputField w="70px" />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Flex>
        </Box>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default SimulationController;
