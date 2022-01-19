import moment from "moment";
import React, { useState, useEffect, useContext } from "react";
import DatePicker from "react-datepicker";

import { SimulationSetted } from "context/SimulationContext";
import { SimulatorParams } from "types/SimulationTypes";

import "react-datepicker/dist/react-datepicker.css";

interface Props {
    idSimulation: number;
}

const SelectDate = ({ idSimulation }: Props) => {
    const { simulation, setSimulation } = useContext(SimulationSetted);
    const [startDate, setStartDate] = useState(
        new Date(
            moment(
                simulation.find(
                    (s: SimulatorParams) => s.idSim === idSimulation
                ).t_init
            ).format("YYYY/MM/D")
        )
    );
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
            dateFormat="yyyy/MM/dd"
            selected={startDate}
            onChange={(date) => {
                const x = moment(date).format("YYYY/MM/D");
                setStartDate(date);
                handleChange(x);
            }}
            openToDate={new Date()}
        />
    );
};
export default SelectDate;

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';
