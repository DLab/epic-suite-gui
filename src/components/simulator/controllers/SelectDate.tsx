import { format } from "date-fns";
import React, { useContext } from "react";
import DatePicker from "react-datepicker";

import { ControlPanel } from "context/ControlPanelContext";
import { ActionsIdSimulation, OptionFeature } from "types/SimulationTypes";

import "react-datepicker/dist/react-datepicker.css";

interface Props {
    startDate: Date;
    setStartDate: (value: Date) => void;
    valueOptionFeature: (value: OptionFeature) => void;
    setIdGeo: (value: number) => void;
    setIdGraph: (value: number) => void;
    setIdSim: (value: ActionsIdSimulation) => void;
}

const SelectDate = ({
    startDate,
    setStartDate,
    valueOptionFeature,
    setIdGeo,
    setIdGraph,
    setIdSim,
}: Props) => {
    const { setInitialConditions } = useContext(ControlPanel);

    const handleChange = (val: string | number) => {
        setIdGeo(0);
        setIdGraph(0);
        setIdSim({
            type: "set",
            payload: 0,
        });
        setInitialConditions({
            type: "real-conditions",
            real: {
                I: 0,
                I_d: 0,
                I_ac: 0,
                population: 0,
                R: 0,
                E: 0,
                H_d: 0,
                H: 0,
                Iv_d: 0,
                Iv_ac: 0,
                D_d: 0,
                D: 0,
                Iv: 0,
                H_cap: 0,
            },
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
