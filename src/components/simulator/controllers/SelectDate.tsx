import moment from "moment";
import React, { useState, useContext } from "react";
import DatePicker from "react-datepicker";

import { SimulationSetted } from "context/SimulationContext";

import "react-datepicker/dist/react-datepicker.css";

interface Props {
  idSimulation: number;
}

const SelectDate = ({ idSimulation }: Props) => {
  const { setSimulation } = useContext(SimulationSetted);
  const [startDate, setStartDate] = useState(new Date());

  const handleChange = (val: string | number) => {
    setSimulation({
      type: "update",
      id: idSimulation,
      target: "t_init",
      element: val,
    });
  };

  return (
    <DatePicker
      classNa
      selected={startDate}
      onChange={(date) => {
        const x = moment(date).format("YYYY-MM-D");
        setStartDate(date);
        handleChange(x);
      }}
    />
  );
};
export default SelectDate;

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';
