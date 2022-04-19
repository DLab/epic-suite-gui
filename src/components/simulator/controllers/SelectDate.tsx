import { format } from "date-fns";
import React, { useState, useContext } from "react";
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
    const { simulation, setSimulation } = useContext(SimulationSetted);
    // const [startDate, setStartDate] = useState(
    //     new Date(
    //         simulation.find((s: SimulatorParams) => s.idSim === idSimulation)
    //             .t_init ?? Date.now()
    //     )
    // );

    const handleChange = (val: string | number) => {
        // setSimulation({
        //     type: "update",
        //     id: idSimulation,
        //     target: "t_init",
        //     element: val,
        // });
        // valueOptionFeature(OptionFeature.None);
        setIdGeo(0);
        setIdGraph(0);
        setIdSim({
            type: "set",
            payload: 0,
        });
        // selectSim(
        //     {
        //         S: 0,
        //         R: 0,
        //         I: 0,
        //         I_d: 0,
        //         I_ac: 0,
        //         E: 0,
        //         H: 0,
        //         H_acum: 0,
        //         V: 0,
        //         V_acum: 0,
        //         D: 0,
        //         D_acum: 0,
        //     },
        //     "initialConditions"
        // );
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
