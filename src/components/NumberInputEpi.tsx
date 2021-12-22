import { InfoIcon } from "@chakra-ui/icons";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Flex,
  Slider,
  SliderFilledTrack,
  SliderTrack,
  SliderThumb,
  Text,
  Tooltip,
  Icon,
} from "@chakra-ui/react";

import createIdComponent from "utils/createIdcomponent";

interface Props {
  value: number;
  setValue: (val: unknown) => void;
  nameParams: string;
  description: string;
  step?: number;
  max?: number;
  min?: number;
  type: string;
  isInitialParameters?: boolean;
  isDisabled?: boolean;
  name?: string;
}

const NumberInputEpi = ({
  value,
  setValue,
  nameParams,
  step,
  max = Infinity,
  min = 0,
  type,
  isInitialParameters,
  isDisabled,
  name,
  description,
}: Props) => {
  const handleChange = (val: string | number) => {
    if (val <= max && val >= min) {
      setValue({ type: "set", payload: +val, target: nameParams });
    }
  };

  return (
    <>
      <Flex align="center" id={createIdComponent()}>
        <Text
          id={createIdComponent()}
          align="left"
          color={isDisabled && "gray.200"}
        >
          {name ?? nameParams}
        </Text>
        <Tooltip id={createIdComponent()} label={description}>
          <Icon
            id={createIdComponent()}
            as={InfoIcon}
            ml="10%"
            w="14px "
            color="teal"
          />
        </Tooltip>
      </Flex>
      <Flex id={createIdComponent()} mb="0.5rem">
        {type === "slider" && (
          <>
            <NumberInput
              id={createIdComponent()}
              maxW="100px"
              mr="1rem"
              defaultValue={+value}
              onChange={handleChange}
              size="xs"
              min={+min}
              max={+max}
              step={step}
              value={+value}
            >
              <NumberInputField id={createIdComponent()} />
              <NumberInputStepper id={createIdComponent()}>
                <NumberIncrementStepper id={createIdComponent()} />
                <NumberDecrementStepper id={createIdComponent()} />
              </NumberInputStepper>
            </NumberInput>
            <Slider
              id={createIdComponent()}
              flex="1"
              focusThumbOnChange={false}
              defaultValue={+value}
              value={+value}
              step={step}
              min={+min}
              max={+max}
              onChange={handleChange}
            >
              <SliderTrack id={createIdComponent()}>
                <SliderFilledTrack id={createIdComponent()} />
              </SliderTrack>
              <SliderThumb
                id={createIdComponent()}
                fontSize="sm"
                boxSize="32px"
              >
                {value}
              </SliderThumb>
            </Slider>
          </>
        )}
        {type === "number" && !isInitialParameters && (
          <NumberInput
            id={createIdComponent()}
            maxW="100px"
            mr="1rem"
            defaultValue={value}
            onChange={handleChange}
            size="xs"
            min={min}
            max={max}
            step={step}
            variant="filled"
            isDisabled
          >
            <NumberInputField />
            <NumberInputStepper id={createIdComponent()}>
              <NumberIncrementStepper id={createIdComponent()} />
              <NumberDecrementStepper id={createIdComponent()} />
            </NumberInputStepper>
          </NumberInput>
        )}
        {isInitialParameters && (
          <NumberInput
            id={createIdComponent()}
            maxW="100px"
            mr="1rem"
            value={value}
            onChange={handleChange}
            size="xs"
            min={min}
            max={max}
            step={step}
          >
            <NumberInputField id={createIdComponent()} />
            <NumberInputStepper id={createIdComponent()}>
              <NumberIncrementStepper id={createIdComponent()} />
              <NumberDecrementStepper id={createIdComponent()} />
            </NumberInputStepper>
          </NumberInput>
        )}
      </Flex>
    </>
  );
};

export default NumberInputEpi;
