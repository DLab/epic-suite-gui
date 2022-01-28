import { format } from "date-fns";
import React, { useState, useContext } from "react";
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
            simulation.find((s: SimulatorParams) => s.idSim === idSimulation)
                .t_init ?? Date.now()
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
                const x = format(date, "yyyy/MM/dd");
                setStartDate(new Date(x));
                handleChange(x);
            }}
            openToDate={new Date()}
        />
    );
};
export default SelectDate;
