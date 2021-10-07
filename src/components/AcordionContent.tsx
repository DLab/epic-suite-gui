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
} from "@chakra-ui/react";

interface Props {
  title: string;
}

const AcordionContent = ({ title }: Props) => {
  return (
    <AccordionItem id={title} bg="#16609E" mb="30px">
      <h2>
        <AccordionButton color="white">
          <Box flex="1" textAlign="left">
            {title}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4} bg="#FAFAFA">
        <Select placeholder="Select option" mt="20px">
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>
        <Select placeholder="Select option" mt="20px">
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>
        <Slider id="s1" aria-label="slider-ex-1" defaultValue={30} mt="20px">
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        <Slider id="s2" aria-label="slider-ex-1" defaultValue={30} mt="20px">
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default AcordionContent;
