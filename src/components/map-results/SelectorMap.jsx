import { InfoIcon } from "@chakra-ui/icons";
import {
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  HStack,
  Button,
  Center,
  Tooltip,
  Text,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { useContext, useRef, useState, useEffect } from "react";

import data from "../../data/states.json";
import { ShowSelectorMap, HideSelectorMap } from "../icons/ShowHideSelectorMap";
import SelectFeatureContext from "context/SelectFeaturesContext";

const SelectorMap = (props) => {
  const { setMode } = useContext(SelectFeatureContext);
  const [extentionOption, setExtentionOption] = useState("0");
  const [showSelector, setShowSelector] = useState(true);
  const showIconRef = useRef(null);
  const hideIconRef = useRef(null);
  const [stateOptions, setstateOptions] = useState([]);

  const options = [
    {
      label: "STATES",
      options: stateOptions,
    },
  ];
  const getStatesOptions = () => {
    const states = data.data.map((state) => {
      return { value: state[1], label: state[2] };
    });
    return setstateOptions(states);
  };

  useEffect(() => {
    if (extentionOption === "0") {
      setMode("National");
    } else if (extentionOption === "1") {
      setMode("State");
    } else {
      setMode("County");
    }
  }, [extentionOption, setMode]);

  useEffect(() => {
    getStatesOptions();
  }, []);

  return (
    <FormControl {...props}>
      <FormLabel display="flex" justifyContent="space-between">
        <Text>
          {showSelector
            ? "Select scale for simulation"
            : "Select an interest area"}
          <Tooltip label="Lorem ipsum" fontSize="md" placement="top-start">
            <InfoIcon color="blue.800" ml="0.5rem" />
          </Tooltip>
        </Text>
        {showSelector ? (
          <ShowSelectorMap
            ref={showIconRef}
            onClick={() => setShowSelector(!showSelector)}
          />
        ) : (
          <HideSelectorMap
            ref={hideIconRef}
            onClick={() => setShowSelector(!showSelector)}
          />
        )}
      </FormLabel>
      {showSelector && (
        <div>
          <RadioGroup onChange={setExtentionOption} value={extentionOption}>
            <HStack spacing="24px">
              <Radio value="0">National</Radio>
              <Radio value="1">State</Radio>
              <Radio value="2">County</Radio>
            </HStack>
          </RadioGroup>
          {(extentionOption === "1" || extentionOption === "2") && (
            <FormControl mt="1rem">
              <Select
                isMulti
                name="states"
                options={options}
                placeholder={
                  extentionOption === "1"
                    ? "Select one or more States"
                    : "Select all counties from a State"
                }
                closeMenuOnSelect={false}
                size="md"
              />
            </FormControl>
          )}
          {extentionOption === "2" && (
            <FormControl mt="1rem">
              <Select
                isMulti
                name="counties"
                options={options}
                placeholder="Select one or more counties..."
                closeMenuOnSelect={false}
                size="md"
              />
            </FormControl>
          )}
          <Center>
            <Button mt="0.5rem" variant="ghost" colorScheme="blue">
              Reset
            </Button>
          </Center>
        </div>
      )}
    </FormControl>
  );
};

export default SelectorMap;
