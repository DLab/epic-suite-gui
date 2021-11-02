/* eslint-disable @typescript-eslint/naming-convention */
import {
  Box,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Flex,
} from "@chakra-ui/react";
import React, { useContext } from "react";

import { ControlPanel } from "context/ControlPanelContext";

const InitialConditions = () => {
  const { setParameters, parameters } = useContext(ControlPanel);
  const { R, I, I_d, I_ac, E } = parameters;
  return (
    <AccordionItem id="ic" bg="#16609E" mb="30px">
      <h2>
        <AccordionButton color="white">
          <Box flex="1" textAlign="left">
            Initial Conditions
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4} bg="#FAFAFA">
        <Flex mb="5%">
          <Text flex="1" textAlign="left">
            Recovered
          </Text>
          <NumberInput
            size="xs"
            defaultValue={R}
            min={0}
            onChange={(e) => {
              setParameters({ type: "set", target: "R", payload: e });
            }}
          >
            <NumberInputField w="100px" />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Flex>
        <Flex mb="5%">
          <Text flex="1" textAlign="left">
            Active Infected
          </Text>
          <NumberInput
            size="xs"
            defaultValue={I}
            min={0}
            h="25px"
            onChange={(e) => {
              setParameters({ type: "set", target: "I", payload: e });
            }}
          >
            <NumberInputField w="100px" />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Flex>
        <Flex mb="5%">
          <Text flex="1" textAlign="left">
            New daily Infected
          </Text>
          <NumberInput
            size="xs"
            defaultValue={I_d}
            min={0}
            h="25px"
            onChange={(e) => {
              setParameters({ type: "set", target: "I_d", payload: e });
            }}
          >
            <NumberInputField w="100px" />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Flex>
        <Flex mb="5%">
          <Text flex="1" textAlign="left">
            Exposed
          </Text>
          <NumberInput
            size="xs"
            defaultValue={E}
            min={0}
            onChange={(e) => {
              setParameters({ type: "set", target: "E", payload: e });
            }}
          >
            <NumberInputField w="100px" />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Flex>
        <Flex mb="5%">
          <Text flex="1" textAlign="left">
            Accumulate Infected
          </Text>
          <NumberInput
            size="xs"
            defaultValue={I_ac}
            min={0}
            h="25px"
            onChange={(e) => {
              setParameters({ type: "set", target: "I_ac", payload: e });
            }}
          >
            <NumberInputField w="100px" />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Flex>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default InitialConditions;
