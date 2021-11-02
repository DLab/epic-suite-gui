import {
  Box,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { ReactChild, ReactChildren } from "react";

interface Props {
  title: string;
  children: ReactChild | ReactChildren;
}

const AcordionContent = ({ title, children }: Props) => {
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
        {children}
      </AccordionPanel>
    </AccordionItem>
  );
};

export default AcordionContent;
