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
  Box,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { useContext, useRef, useState, useEffect } from "react";

import countyData from "../../data/counties.json";
import data from "../../data/states.json";
import { ShowSelectorMap, HideSelectorMap } from "../icons/ShowHideSelectorMap";
import StatesSelect from "components/StatesSelect";
import SelectFeatureContext from "context/SelectFeaturesContext";

const SelectorMap = (props) => {
  const {
    setMode,
    counties: countiesSelected,
    setCounties: setCountiesSelected,
  } = useContext(SelectFeatureContext);
  const [extentionOption, setExtentionOption] = useState("0");
  const [showSelector, setShowSelector] = useState(true);
  const showIconRef = useRef(null);
  const hideIconRef = useRef(null);
  const [stateOptions, setstateOptions] = useState([]);
  const [countiesOptions, setCountiesOptions] = useState([]);
  // select values
  const [countyFeature, setCountyFeature] = useState("");
  const [countyFeaturesByState, setCountyFeaturesByState] = useState("");
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
    getCountiesOptions();
  }, []);

  const handleAddCountiesByState = (codState) => {
    return countyData.data.filter((c) => c[0] === codState).map((c) => c[5]);
  };
  const handleAddCounties = (counties, isSelecting = true) => {
    // selecting all counties by states
    if (counties.length === 2) {
      const allCountiesInState = handleAddCountiesByState(counties);
      /* remove counties */
      if (!isSelecting) {
        const newCountiesSelected = [...countiesSelected].filter(
          (c) => !allCountiesInState.includes(c)
        );
        setCountiesSelected({ type: "remove", payload: newCountiesSelected });
        return false;
      }
      /* add counties */
      const selectedCounties = new Set([
        ...countiesSelected,
        ...allCountiesInState,
      ]);
      setCountiesSelected({ type: "add-all", payload: selectedCounties });
      return true;
    }
    // Remove one county
    if (!isSelecting) {
      const countiesWithoutSelectedFeature = [...countiesSelected].filter(
        (c) => c !== counties
      );
      /* remove only if not undefined */
      if (countiesWithoutSelectedFeature)
        setCountiesSelected({
          type: "remove",
          payload: countiesWithoutSelectedFeature,
        });
      return false;
    }
    // verify if a county exists in context
    const isSelectedInContext = [...countiesSelected].some(
      (c) => c === counties
    );
    if (isSelectedInContext) {
      return true;
    }
    // if it not exists, add it
    setCountiesSelected({
      type: "add",
      payload: [counties],
    });

    return true;
  };
  const handleResetCountiesSelected = () => {
    setCountiesSelected({ type: "reset" });
  };
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
          {extentionOption === "1" && (
            <FormControl mt="1rem">
              <StatesSelect
                options={options}
                extentionOption={extentionOption}
              />
            </FormControl>
          )}
          {extentionOption === "2" && (
            <>
              <FormControl mt="1rem">
                <Select
                  name="states"
                  options={options}
                  placeholder="Select all counties from a State"
                  size="sm"
                  onChange={({ value }) => setCountyFeaturesByState(value)}
                />
                <Box w="100%" textAlign="right" pt="0.3rem">
                  <Button
                    size="xs"
                    onClick={() => handleAddCounties(countyFeaturesByState)}
                    colorScheme="blue"
                  >
                    Add
                  </Button>
                  <Button
                    size="xs"
                    onClick={() =>
                      handleAddCounties(countyFeaturesByState, false)
                    }
                  >
                    Remove
                  </Button>
                </Box>
              </FormControl>
              <FormControl mt="1rem">
                <Select
                  name="counties"
                  options={optionsCounty}
                  placeholder="Select one or more counties..."
                  size="sm"
                  w="100%"
                  onChange={({ value }) => setCountyFeature(value)}
                />
                <Box w="100%" textAlign="right" pt="0.3rem">
                  <Button
                    size="xs"
                    colorScheme="blue"
                    onClick={() => handleAddCounties(countyFeature)}
                  >
                    Add
                  </Button>
                  <Button
                    size="xs"
                    onClick={() => handleAddCounties(countyFeature, false)}
                  >
                    Remove
                  </Button>
                </Box>
              </FormControl>
            </>
          )}
          <Center>
            <Button
              mt="0.5rem"
              variant="ghost"
              colorScheme="blue"
              onClick={handleResetCountiesSelected}
            >
              Reset
            </Button>
          </Center>
        </div>
      )}
    </FormControl>
  );
};

export default SelectorMap;
