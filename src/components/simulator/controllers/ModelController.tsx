/* eslint-disable @typescript-eslint/naming-convention */
import { Box, Select, Text, Flex, Input } from "@chakra-ui/react";
import { useContext } from "react";

import NumberInputEpi from "../../NumberInputEpi";
import { ControlPanel } from "context/ControlPanelContext";

const ModelController = () => {
  const { setParameters, parameters } = useContext(ControlPanel);
  const { t_end, name_model } = parameters;
  return (
    <>
      <Box>
        <Text flex="1" textAlign="left">
          Model Name
        </Text>
        <Input
          size="sm"
          value={name_model}
          onChange={(e) => {
            setParameters({
              type: "set",
              target: "name_model",
              payload: e.target.value,
            });
          }}
        />
        <Text flex="1" textAlign="left">
          Model
        </Text>
        <Select
          size="sm"
          onChange={(e) => {
            if (e.target.value === "SEIR") {
              setParameters({
                type: "set",
                target: "compartments",
                payload: ["S", "E", "I", "R"],
              });
            } else {
              setParameters({
                type: "set",
                target: "compartments",
                payload: ["S", "I", "R"],
              });
            }
            setParameters({
              type: "set",
              target: "name",
              payload: e.target.value,
            });
          }}
        >
          <option value="SEIR">SEIR</option>
          <option value="SIR">SIR</option>
        </Select>
      </Box>
      <Flex justify="space-between">
        <Box>
          <NumberInputEpi
            value={t_end}
            setValue={setParameters}
            min={0}
            max={Infinity}
            nameParams="Duration"
            type="number"
            isInitialParameters
          />
        </Box>
      </Flex>
      <NumberInputEpi
        value={parameters.beta}
        setValue={setParameters}
        nameParams="Beta (β)"
        step={0.01}
        min={0.01}
        max={0.5}
        type="slider"
      />
      <NumberInputEpi
        value={parameters.rR_S}
        setValue={setParameters}
        nameParams="rR_S"
        min={0}
        type="number"
        isInitialParameters
      />
      <NumberInputEpi
        value={parameters.mu}
        setValue={setParameters}
        nameParams="Mu (μ)"
        step={0.01}
        min={0.01}
        max={5}
        type="slider"
      />
      <NumberInputEpi
        value={parameters.tI_R}
        setValue={setParameters}
        nameParams="tI_R"
        type="number"
        min={0.01}
        isInitialParameters
      />
      <NumberInputEpi
        value={parameters.tE_I}
        setValue={setParameters}
        nameParams="tE_I"
        type="number"
        isInitialParameters
        min={0.01}
      />
      <NumberInputEpi
        value={parameters.pI_det}
        setValue={setParameters}
        nameParams="pI_det"
        step={0.01}
        min={0.01}
        max={1}
        type="slider"
      />
    </>
  );
};

export default ModelController;
