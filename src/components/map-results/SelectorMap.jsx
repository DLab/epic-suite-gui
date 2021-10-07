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
import React, { useRef, useState } from "react";

import { ShowSelectorMap, HideSelectorMap } from "../icons/ShowHideSelectorMap";

export const stateOptions = [
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AS", label: "American Samoa" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DE", label: "Delaware" },
  { value: "DC", label: "District Of Columbia" },
  { value: "FM", label: "Federated States Of Micronesia" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "GU", label: "Guam" },
  { value: "HI", label: "Hawaii" },
  { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" },
  { value: "IN", label: "Indiana" },
  { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" },
  { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" },
  { value: "MH", label: "Marshall Islands" },
  { value: "MD", label: "Maryland" },
  { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" },
  { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" },
  { value: "MT", label: "Montana" },
  { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" },
  { value: "NH", label: "New Hampshire" },
  { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" },
  { value: "NY", label: "New York" },
  { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" },
  { value: "MP", label: "Northern Mariana Islands" },
  { value: "OH", label: "Ohio" },
  { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" },
  { value: "PW", label: "Palau" },
  { value: "PA", label: "Pennsylvania" },
  { value: "PR", label: "Puerto Rico" },
  { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" },
  { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" },
  { value: "UT", label: "Utah" },
  { value: "VT", label: "Vermont" },
  { value: "VI", label: "Virgin Islands" },
  { value: "VA", label: "Virginia" },
  { value: "WA", label: "Washington" },
  { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" },
  { value: "WY", label: "Wyoming" },
];
const options = [
  {
    label: "STATES",
    options: stateOptions,
  },
];

const SelectorMap = (props) => {
  const [extentionOption, setExtentionOption] = useState("0");
  const [showSelector, setShowSelector] = useState(true);
  const showIconRef = useRef(null);
  const hideIconRef = useRef(null);

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
