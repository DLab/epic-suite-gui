import { FormControl, Button, Box } from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import PropTypes from "prop-types";
import { useContext, useState } from "react";

import SelectFeatureContext from "../context/SelectFeaturesContext";
import countyData from "../data/counties.json";

const CountiesSelect = ({ options, optionsCounty }) => {
  const { counties: countiesSelected, setCounties: setCountiesSelected } =
    useContext(SelectFeatureContext);
  const [countyFeature, setCountyFeature] = useState("");
  const [countyFeaturesByState, setCountyFeaturesByState] = useState("");
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
  return (
    <>
      <FormControl mt="1rem">
        <Select
          name="states"
          options={options}
          placeholder="Select all counties from a State"
          size="sm"
          onChange={({ fips }) => setCountyFeaturesByState(fips)}
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
            onClick={() => handleAddCounties(countyFeaturesByState, false)}
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
  );
};
CountiesSelect.propTypes = {
  options: PropTypes.arrayOf(PropTypes.any),
  optionsCounty: PropTypes.arrayOf(PropTypes.any),
};
export default CountiesSelect;
