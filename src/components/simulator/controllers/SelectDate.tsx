import moment from "moment";
import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

interface Props {
  setDatepickerValue: (val: unknown) => void;
  datepickerValue: string;
}

const SelectDate = ({ setDatepickerValue, datepickerValue }: Props) => {
  const [startDate, setStartDate] = useState(new Date());

  const handleChange = (val: string | number) => {
    setDatepickerValue(val);
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
