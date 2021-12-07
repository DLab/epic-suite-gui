import { Flex, Button, Text, Link } from "@chakra-ui/react";
import { Parser } from "json2csv";
import React, { useState, useEffect } from "react";

interface Props {
  data: string;
}

const Exports = ({ data }: Props) => {
  const [simulationKeys, setSimulationKeys] = useState("");
  const [csvContent, setCsvContent] = useState("");

  useEffect(() => {
    const graphicData = data ? JSON.parse(data) : "";
    if (graphicData) {
      const json2csvParser = new Parser();
      const csv = json2csvParser.parse(graphicData);
      setSimulationKeys(graphicData);
      setCsvContent(csv);
    }
  }, [data]);

  return (
    <Flex
      direction="column"
      alignItems="center"
      borderTop="1px solid #a7a1a1d6"
      m="0 5%"
    >
      <Text mt="1%">Exports</Text>
      <Flex w="100%" justify="space-around">
        <Button colorScheme="teal" size="md" mt="20px">
          <Link
            download="simulation.csv"
            href={`data:text/json;charset=utf-8,${encodeURIComponent(
              csvContent
            )}`}
          >
            CSV
          </Link>
        </Button>
        <Button colorScheme="teal" size="md" mt="20px">
          <Link
            download="simulation.json"
            href={`data:text/json;charset=utf-8,${encodeURIComponent(
              JSON.stringify(simulationKeys)
            )}`}
          >
            JSON
          </Link>
        </Button>
      </Flex>
    </Flex>
  );
};

export default Exports;
