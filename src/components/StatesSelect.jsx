import { Select } from "chakra-react-select";
import PropTypes from "prop-types";
import { useContext } from "react";

import SelectFeatureContext from "../context/SelectFeaturesContext";

const StatesSelect = ({ options, extentionOption }) => {
  const { states: statesSelected, setStates: setStatesSelected } =
    useContext(SelectFeatureContext);

  return (
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
      onChange={(e) => {
        const selectedFips = e.map((a) => {
          return a.fips;
        });
        if (statesSelected.includes(selectedFips)) {
          setStatesSelected({ type: "add", payload: selectedFips });
        } else {
          setStatesSelected({ type: "remove", payload: selectedFips });
        }
      }}
    />
  );
};

StatesSelect.propTypes = {
  options: PropTypes.arrayOf(PropTypes.any),
  extentionOption: PropTypes.string,
};

export default StatesSelect;
