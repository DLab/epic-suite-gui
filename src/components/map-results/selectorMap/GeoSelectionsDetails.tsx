import { Flex, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

interface Props {
  details: string[];
}

const GeoSelectionsDetails = ({ details }: Props) => {
  const [geoSelectionsDetails, setGeoSelectionsDetails] = useState([]);

  useEffect(() => {
    setGeoSelectionsDetails(details);
  }, [details]);

  return (
    <>
      {geoSelectionsDetails.map((geoSelection) => {
        return (
          <Flex direction="column">
            <Text textAlign="center" fontWeight="400">
              {geoSelection.name}
            </Text>
          </Flex>
        );
      })}
    </>
  );
};

export default GeoSelectionsDetails;
