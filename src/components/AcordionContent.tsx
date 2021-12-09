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
    <AccordionItem id={title} mb="30px">
      <h2>
        <AccordionButton
          bg="#16609E"
          color="white"
          _hover={{ backgroundColor: "#16609E" }}
          _focus={{ boxShadow: "none" }}
        >
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
