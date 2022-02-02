import { format } from "date-fns";
import moment from "moment";
import React, { useState, useEffect, useContext } from "react";
import DatePicker from "react-datepicker";

import { SimulationSetted } from "context/SimulationContext";
import {
    ActionsIdSimulation,
    InitialConditions,
    OptionFeature,
    SimulatorParams,
} from "types/SimulationTypes";

import "react-datepicker/dist/react-datepicker.css";

interface Props {
    idSimulation: number;
    valueOptionFeature: (value: OptionFeature) => void;
    setIdGeo: (value: number) => void;
    setIdGraph: (value: number) => void;
    setIdSim: (value: ActionsIdSimulation) => void;
    selectSim: (value: InitialConditions, target: string) => void;
}

const SelectDate = ({
    idSimulation,
    valueOptionFeature,
    setIdGeo,
    setIdGraph,
    setIdSim,
    selectSim,
}: Props) => {
    const { simulation, setSimulation } = useContext(SimulationSetted);
    const [startDate, setStartDate] = useState(
        new Date(
            simulation.find((s: SimulatorParams) => s.idSim === idSimulation)
                .t_init ?? Date.now()
        )
    );
    // const [startDate, setStartDate] = useState(
    //     new Date(
    //         moment(
    //             simulation.find(
    //                 (s: SimulatorParams) => s.idSim === idSimulation
    //             ).t_init
    //         ).format("YYYY-MM-D")
    //     )
    // );
    const handleChange = (val: string | number) => {
        setSimulation({
            type: "update",
            id: idSimulation,
            target: "t_init",
            element: val,
        });
        valueOptionFeature(OptionFeature.None);
        setIdGeo(0);
        setIdGraph(0);
        setIdSim({
            type: "set",
            payload: 0,
        });
        selectSim(
            {
                S: 0,
                R: 0,
                I: 0,
                I_d: 0,
                I_ac: 0,
                E: 0,
                H: 0,
                H_acum: 0,
                V: 0,
                V_acum: 0,
                D: 0,
                D_acum: 0,
            },
            "initialConditions"
        );
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

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';
