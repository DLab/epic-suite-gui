import { InfoIcon } from "@chakra-ui/icons";
import {
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  HStack,
  Button,
  Center,
} from "@chakra-ui/react";
import { useContext, useRef, useState, useEffect } from "react";

import countyData from "../../../data/counties.json";
import data from "../../../data/states.json";
import ResetAlerts from "components/ResetAlerts";
import CountiesSelect from "components/statesCountiesSelects/CountiesSelect";
import StatesSelect from "components/statesCountiesSelects/StatesSelect";
import SelectFeatureContext from "context/SelectFeaturesContext";

const SelectorMap = () => {
  const {
    setMode,
    states,
    counties,
    setCounties: setCountiesSelected,
    setStates: setStatesSelected,
  } = useContext(SelectFeatureContext);
  const [extentionOption, setExtentionOption] = useState("0");

  const [stateOptions, setstateOptions] = useState([]);
  const [countiesOptions, setCountiesOptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
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
    const statesOptions = data.data.map((state) => {
      return { value: state[1], label: state[2], fips: state[0] };
    });
    return setstateOptions(statesOptions);
  };
  const getCountiesOptions = () => {
    const getCounties = countyData.data.map((state) => {
      return { value: state[5], label: state[7] };
    });
    setCountiesOptions(getCounties);
  };

  useEffect(() => {
    setStatesSelected({ type: "reset" });
    setCountiesSelected({ type: "reset" });
    if (extentionOption === "0") {
      setMode("National");
    } else if (extentionOption === "1") {
      setMode("States");
    } else {
      setMode("Counties");
    }
  }, [extentionOption, setCountiesSelected, setMode, setStatesSelected]);

  useEffect(() => {
    getStatesOptions();
    getCountiesOptions();
  }, []);

  return (
    <FormControl maxHeight="51vh">
      <div>
        <RadioGroup onChange={setExtentionOption} value={extentionOption}>
          <HStack spacing="8px">
            <Radio bg="white" border="1px" borderColor="#5B58AD" value="0">
              <span style={{ fontSize: "14px" }}>National</span>
            </Radio>
            <Radio bg="white" border="1px" borderColor="#5B58AD" value="1">
              <span style={{ fontSize: "14px" }}>State</span>
            </Radio>
            <Radio bg="white" border="1px" borderColor="#5B58AD" value="2">
              <span style={{ fontSize: "14px" }}>County</span>
            </Radio>
          </HStack>
        </RadioGroup>
        {extentionOption === "1" && (
          <FormControl mt="0.6rem">
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
            fontSize="14px"
            onClick={() => {
              if (states.length === 0 && counties.length === 0) {
                return;
              }
              setIsOpen(true);
            }}
          >
            Reset
          </Button>
          <ResetAlerts isOpen={isOpen} setIsOpen={setIsOpen} />
        </Center>
      </div>
    </FormControl>
  );
};

export default SelectorMap;
