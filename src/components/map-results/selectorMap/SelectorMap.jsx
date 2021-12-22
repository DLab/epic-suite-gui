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
import { useContext, useState, useEffect } from "react";

import countyData from "../../../data/counties.json";
import data from "../../../data/states.json";
import ResetAlerts from "components/ResetAlerts";
import CountiesSelect from "components/statesCountiesSelects/CountiesSelect";
import StatesSelect from "components/statesCountiesSelects/StatesSelect";
import { SelectFeature } from "context/SelectFeaturesContext";
import { Model } from "types/ControlPanelTypes";
import createIdComponent from "utils/createIdcomponent";

const SelectorMap = () => {
  const {
    mode,
    scale,
    setScale,
    states,
    counties,
    setCounties: setCountiesSelected,
    setStates: setStatesSelected,
  } = useContext(SelectFeature);
  const [extentionOption, setExtentionOption] = useState("0");

  const [stateOptions, setStateOptions] = useState([]);
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
    return setStateOptions(statesOptions);
  };
  const getCountiesOptions = () => {
    const getCounties = countyData.data.map((state) => {
      return { value: state[5], label: state[7] };
    });
    setCountiesOptions(getCounties);
  };

  useEffect(() => {
    if (scale === "National") {
      setExtentionOption("0");
    } else if (scale === "States") {
      setExtentionOption("1");
    } else {
      setExtentionOption("2");
    }
  }, [scale]);

  useEffect(() => {
    if (mode === Model.Add) {
      setStatesSelected({ type: "reset" });
      setCountiesSelected({ type: "reset" });
    }
    if (extentionOption === "0") {
      setScale("National");
    } else if (extentionOption === "1") {
      setScale("States");
    } else {
      setScale("Counties");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [extentionOption, setCountiesSelected, setScale, setStatesSelected]);

  useEffect(() => {
    getStatesOptions();
    getCountiesOptions();
  }, []);

  return (
    <FormControl maxHeight="51vh" id={createIdComponent()}>
      <div id={createIdComponent()}>
        <RadioGroup
          id={createIdComponent()}
          onChange={setExtentionOption}
          value={extentionOption}
        >
          <HStack id={createIdComponent()} spacing="8px">
            {mode === Model.Add && (
              <>
                {" "}
                <Radio
                  id={createIdComponent()}
                  bg="white"
                  border="1px"
                  borderColor="#5B58AD"
                  value="0"
                >
                  <span id={createIdComponent()} style={{ fontSize: "14px" }}>
                    National
                  </span>
                </Radio>
                <Radio
                  id={createIdComponent()}
                  bg="white"
                  border="1px"
                  borderColor="#5B58AD"
                  value="1"
                >
                  <span id={createIdComponent()} style={{ fontSize: "14px" }}>
                    State
                  </span>
                </Radio>
                <Radio
                  id={createIdComponent()}
                  bg="white"
                  border="1px"
                  borderColor="#5B58AD"
                  value="2"
                >
                  <span id={createIdComponent()} style={{ fontSize: "14px" }}>
                    County
                  </span>
                </Radio>
              </>
            )}
            {mode === Model.Update && (
              <>
                {" "}
                <Radio
                  id={createIdComponent()}
                  bg="white"
                  border="1px"
                  borderColor="#5B58AD"
                  value="0"
                  isDisabled
                >
                  <span id={createIdComponent()} style={{ fontSize: "14px" }}>
                    National
                  </span>
                </Radio>
                <Radio
                  id={createIdComponent()}
                  bg="white"
                  border="1px"
                  borderColor="#5B58AD"
                  value="1"
                  isDisabled
                >
                  <span id={createIdComponent()} style={{ fontSize: "14px" }}>
                    State
                  </span>
                </Radio>
                <Radio
                  id={createIdComponent()}
                  bg="white"
                  border="1px"
                  borderColor="#5B58AD"
                  value="2"
                  isDisabled
                >
                  <span id={createIdComponent()} style={{ fontSize: "14px" }}>
                    County
                  </span>
                </Radio>
              </>
            )}
          </HStack>
        </RadioGroup>
        {extentionOption === "1" && (
          <FormControl id={createIdComponent()} mt="0.6rem">
            <StatesSelect options={options} extentionOption={extentionOption} />
          </FormControl>
        )}
        {extentionOption === "2" && (
          <CountiesSelect
            id={createIdComponent()}
            options={options}
            optionsCounty={optionsCounty}
          />
        )}
        <Center id={createIdComponent()}>
          <Button
            id={createIdComponent()}
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
          <ResetAlerts
            id={createIdComponent()}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        </Center>
      </div>
    </FormControl>
  );
};

export default SelectorMap;
