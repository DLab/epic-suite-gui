/* eslint-disable sonarjs/cognitive-complexity */
import { Flex, Text, Box } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

import createIdComponent from "utils/createIdcomponent";

interface Props {
  details: string[];
}

const ModelDetails = ({ details }: Props) => {
  const [modelDetails, setModelDetails] = useState([]);

  useEffect(() => {
    setModelDetails(details);
  }, [details]);

  let index;
  return (
    <>
      {modelDetails.map((parameter) => {
        const values = Object.values(parameter.parameters);
        const keys = Object.keys(parameter.parameters);
        return (
          <Flex id={createIdComponent()} direction="column">
            <Text id={createIdComponent()} textAlign="center" fontWeight="400">
              {parameter.parameters.name_model}
            </Text>
            <Flex id={createIdComponent()} justifyContent="center">
              <Box id={createIdComponent()}>
                {keys.map((key) => {
                  if (key !== "compartments") {
                    if (key === "name_model") {
                      return (
                        <Text
                          id={createIdComponent()}
                          fontSize="14px"
                          fontWeight="300"
                        >
                          Name :
                        </Text>
                      );
                    }
                    if (key === "name") {
                      return (
                        <Text
                          id={createIdComponent()}
                          fontSize="14px"
                          fontWeight="300"
                        >
                          Name_model :
                        </Text>
                      );
                    }
                    if (key === "t_end") {
                      return (
                        <Text
                          id={createIdComponent()}
                          fontSize="14px"
                          fontWeight="300"
                        >
                          duration :
                        </Text>
                      );
                    }
                    if (key === "t_init") {
                      return false;
                    }
                    return (
                      <Text
                        id={createIdComponent()}
                        fontSize="14px"
                        fontWeight="300"
                      >
                        {key} :
                      </Text>
                    );
                  }
                  index = keys.indexOf(key);
                  return false;
                })}
              </Box>
              <Box ml="5%" id={createIdComponent()}>
                {values.map((value, i) => {
                  if (i !== index) {
                    return (
                      <Text
                        id={createIdComponent()}
                        fontSize="14px"
                        fontWeight="300"
                      >
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
