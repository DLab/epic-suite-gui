import { Flex, Text, Box } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

interface Props {
  details: string[];
}

const ModelDetails = ({ details }: Props) => {
  const [modelDetails, setModelDetails] = useState([]);

  useEffect(() => {
    setModelDetails(details);
  }, [details]);

  return (
    <>
      {modelDetails.map((parameter) => {
        const values = Object.values(parameter.parameters);
        const keys = Object.keys(parameter.parameters);
        return (
          <Flex>
            <Box>
              {keys.map((key) => {
                return (
                  <Text fontSize="14px" fontWeight="300">
                    {key} :
                  </Text>
                );
              })}
            </Box>
            <Box textAlign="end" ml="14%">
              {values.map((value) => {
                return (
                  <Text fontSize="14px" fontWeight="300">
                    {value}
                  </Text>
                );
              })}
            </Box>
          </Flex>
        );
      })}
    </>
  );
};

export default ModelDetails;
