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
} from "@chakra-ui/react";

interface Props {
  value: number;
  setValue: (val: unknown) => void;
  nameParams: string;
  step?: number;
  max?: number;
  min?: number;
  type: string;
}

const NumberInputEpi = ({
  value,
  setValue,
  nameParams,
  step,
  max,
  min,
  type,
}: Props) => {
  const handleChange = (val: string | number) => {
    if (val <= max && val >= min) {
      setValue({ type: "set", payload: +val, target: nameParams });
    }
  };

  return (
    <>
      <Text align="left">{nameParams}</Text>
      <Flex mb="0.5rem">
        {type === "slider" && (
          <>
            <NumberInput
              maxW="100px"
              mr="1rem"
              defaultValue={+value}
              onChange={handleChange}
              size="xs"
              min={+min}
              max={+max}
              step={step}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Slider
              flex="1"
              focusThumbOnChange={false}
              defaultValue={+value}
              step={step}
              min={+min}
              max={+max}
              onChange={handleChange}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb fontSize="sm" boxSize="32px">
                {value}
              </SliderThumb>
            </Slider>
          </>
        )}
        {type === "number" && (
          <NumberInput
            maxW="100px"
            mr="1rem"
            defaultValue={value}
            onChange={handleChange}
            size="xs"
            min={min}
            max={max}
            step={step}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        )}
      </Flex>
    </>
  );
};

export default NumberInputEpi;
