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
import { useContext, useRef, useState, useEffect } from "react";

import countyData from "../../data/counties.json";
import data from "../../data/states.json";
import CountiesSelect from "components/CountiesSelect";
import StatesSelect from "components/StatesSelect";
import SelectFeatureContext from "context/SelectFeaturesContext";

const SelectorMap = (props) => {
  const {
    setMode,
    setCounties: setCountiesSelected,
    setStates: setStatesSelected,
  } = useContext(SelectFeatureContext);
  const [extentionOption, setExtentionOption] = useState("0");

  const [stateOptions, setstateOptions] = useState([]);
  const [countiesOptions, setCountiesOptions] = useState([]);
  const options = [
    {
      label: "STATES",
      options: stateOptions,
    },
  ];
  const optionsCounty = [
    {
      label: "COUNTY",
      options: countiesOptions,
    },
  ];
  const getStatesOptions = () => {
    const states = data.data.map((state) => {
      return { value: state[1], label: state[2], fips: state[0] };
    });
    return setstateOptions(states);
  };
  const getCountiesOptions = () => {
    const states = countyData.data.map((state) => {
      return { value: state[5], label: state[7] };
    });
    setCountiesOptions(states);
  };

  useEffect(() => {
    setStatesSelected({ type: "reset" });
    setCountiesSelected({ type: "reset" });
    if (extentionOption === "0") {
      setMode("National");
    } else if (extentionOption === "1") {
      setMode("State");
    } else {
      setMode("County");
    }
  }, [extentionOption, setCountiesSelected, setMode, setStatesSelected]);

  useEffect(() => {
    getStatesOptions();
    getCountiesOptions();
  }, []);

  const handleResetSelected = () => {
    setStatesSelected({ type: "reset" });
    setCountiesSelected({ type: "reset" });
  };
  return (
    <FormControl p="1rem" borderRadius="1rem" bgColor="white">
      <h2 style={{ color: "#16609E" }}>Select an interest area</h2>
      <FormLabel display="flex" justifyContent="space-between">
        <Text display="flex" m="5% 0">
          <h3>Select scale for simulation</h3>
          <Tooltip label="Lorem ipsum" fontSize="md" placement="top-start">
            <InfoIcon color="blue.800" ml="0.5rem" />
          </Tooltip>
        </Text>
      </FormLabel>
      <div>
        <RadioGroup onChange={setExtentionOption} value={extentionOption}>
          <HStack spacing="24px">
            <Radio bg="white" border="1px" borderColor="#5B58AD" value="0">
              National
            </Radio>
            <Radio bg="white" border="1px" borderColor="#5B58AD" value="1">
              State
            </Radio>
            <Radio bg="white" border="1px" borderColor="#5B58AD" value="2">
              County
            </Radio>
          </HStack>
        </RadioGroup>
        {extentionOption === "1" && (
          <FormControl mt="1rem">
            <StatesSelect options={options} extentionOption={extentionOption} />
          </FormControl>
        )}
        {extentionOption === "2" && (
          <CountiesSelect options={options} optionsCounty={optionsCounty} />
        )}
        <Center>
          <Button
            mt="0.5rem"
            variant="ghost"
            colorScheme="blue"
            onClick={handleResetSelected}
          >
            Reset
          </Button>
        </Center>
      </div>
    </FormControl>
  );
};

export default SelectorMap;
