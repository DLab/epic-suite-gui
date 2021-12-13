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
        let index;
        return (
          <Flex direction="column">
            <Text textAlign="center" fontWeight="400">
              {parameter.parameters.name_model}
            </Text>
            <Flex justifyContent="center">
              <Box>
                {keys.map((key) => {
                  if (key !== "compartments") {
                    if (key === "name_model") {
                      return (
                        <Text fontSize="14px" fontWeight="300">
                          Name :
                        </Text>
                      );
                    }
                    if (key === "name") {
                      return (
                        <Text fontSize="14px" fontWeight="300">
                          Name_model :
                        </Text>
                      );
                    }
                    return (
                      <Text fontSize="14px" fontWeight="300">
                        {key} :
                      </Text>
                    );
                  }
                  index = keys.indexOf(key);
                  return false;
                })}
              </Box>
              <Box ml="5%">
                {values.map((value, i) => {
                  if (i !== index) {
                    return (
                      <Text fontSize="14px" fontWeight="300">
                        {value}
                      </Text>
                    );
                  }
                  return false;
                })}
              </Box>
            </Flex>
          </Flex>
        );
      })}
    </>
  );
};

export default ModelDetails;
