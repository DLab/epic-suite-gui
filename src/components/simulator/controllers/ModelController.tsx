/* eslint-disable @typescript-eslint/naming-convention */
import { Box, Select, Text, Flex, Input } from "@chakra-ui/react";
import { useContext } from "react";

import NumberInputEpi from "../../NumberInputEpi";
import { ControlPanel } from "context/ControlPanelContext";

const ModelController = () => {
  const {
    setParameters,
    parameters: { t_end, name_model, beta, pI_det, rR_S, tE_I, tI_R, mu },
  } = useContext(ControlPanel);

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
            nameParams="t_end"
            name="Duration"
            description="Duration days"
            min={0}
            step={1}
            max={Infinity}
            isInitialParameters
            type="number"
          />
        </Box>
      </Flex>
      <NumberInputEpi
        value={beta}
        setValue={setParameters}
        nameParams="beta"
        name="Beta (β)"
        description="Infection rate"
        step={0.01}
        min={0.01}
        max={0.5}
        type="slider"
      />
      <NumberInputEpi
        value={rR_S}
        setValue={setParameters}
        nameParams="rR_S"
        description="Average immunity loss rate"
        step={0.01}
        min={0}
        isInitialParameters
        type="number"
      />
      <NumberInputEpi
        value={mu}
        setValue={setParameters}
        nameParams="mu"
        name="Mu (μ)"
        description="Exposed/Infected Initial rate"
        step={0.01}
        min={0.01}
        max={5}
        type="slider"
      />
      <NumberInputEpi
        value={tI_R}
        setValue={setParameters}
        nameParams="tI_R"
        description="Transition time between infectious and removed"
        min={0.01}
        isInitialParameters
        type="number"
      />
      <NumberInputEpi
        value={tE_I}
        setValue={setParameters}
        nameParams="tE_I"
        description="Transition time between exposed and infectious"
        min={0.01}
        isInitialParameters
        type="number"
      />
      <NumberInputEpi
        value={pI_det}
        setValue={setParameters}
        nameParams="pI_det"
        description="Underreport"
        step={0.01}
        min={0.01}
        max={1}
        type="slider"
      />
    </>
  );
};

export default ModelController;
