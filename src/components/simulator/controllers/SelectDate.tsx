/* eslint-disable @typescript-eslint/naming-convention */
import moment from "moment";
import React, { useState, useContext } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

interface Props {
  setValue: (val: unknown) => void;
  nameParams: string;
}

const SelectDate = ({ setValue, nameParams }: Props) => {
  const [startDate, setStartDate] = useState(new Date());

  const handleChange = (val: string | number) => {
    setValue({ type: "set", payload: val, target: nameParams });
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
