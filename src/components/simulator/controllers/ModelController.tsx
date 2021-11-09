/* eslint-disable @typescript-eslint/naming-convention */
import {
  Box,
  Select,
  Text,
  Flex,
  Input,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";
import { useContext, useState } from "react";

import NumberInputEpi from "../../NumberInputEpi";
import { ControlPanel } from "context/ControlPanelContext";

const ModelController = () => {
  const { setParameters, parameters } = useContext(ControlPanel);
  const { t_init, t_end, timestep, name_model } = parameters;
  // const [invalid, setInValid] = useState(false);
  // const [isAlert, setIsAlert] = useState(false);
  return (
    <>
      <Box>
        <Text flex="1" textAlign="left">
          Model Name
        </Text>
        <Input
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
      <NumberInputEpi
        value={parameters.beta}
        setValue={setParameters}
        nameParams="beta"
        step={0.001}
        min={0.01}
        max={0.5}
        type="slider"
      />
      <NumberInputEpi
        value={parameters.r_R_S}
        setValue={setParameters}
        nameParams="r_R_S"
        type="number"
      />
      <NumberInputEpi
        value={parameters.mu}
        setValue={setParameters}
        nameParams="mu"
        step={0.01}
        min={0.01}
        max={20}
        type="slider"
      />
      <NumberInputEpi
        value={parameters.tI_R}
        setValue={setParameters}
        nameParams="tI_R"
        type="number"
      />
      <NumberInputEpi
        value={parameters.tE_I}
        setValue={setParameters}
        nameParams="tE_I"
        type="number"
      />
      <NumberInputEpi
        value={parameters.pI_det}
        setValue={setParameters}
        nameParams="pI_det"
        step={1}
        min={0.01}
        max={1}
        type="slider"
      />
    </>
  );
};

export default ModelController;
