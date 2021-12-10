import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Flex,
  Button,
  Text,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
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
    <Flex direction="column" alignItems="end" m="0 5%">
      <Menu>
        <MenuButton
          as={Button}
          size="sm"
          colorScheme="teal"
          rightIcon={<ChevronDownIcon />}
        >
          Exports
        </MenuButton>
        <MenuList>
          <Link
            download="simulation.csv"
            href={`data:text/json;charset=utf-8,${encodeURIComponent(
              csvContent
            )}`}
          >
            <MenuItem>CSV</MenuItem>
          </Link>
          <Link
            download="simulation.json"
            href={`data:text/json;charset=utf-8,${encodeURIComponent(
              JSON.stringify(simulationKeys)
            )}`}
          >
            <MenuItem>JSON</MenuItem>
          </Link>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default Exports;
