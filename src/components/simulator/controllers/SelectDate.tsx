import { format } from "date-fns";
import React, { useContext } from "react";
import DatePicker from "react-datepicker";

import { ControlPanel } from "context/ControlPanelContext";
import { SimulationSetted } from "context/SimulationContext";
import { ActionsIdSimulation, OptionFeature } from "types/SimulationTypes";

import "react-datepicker/dist/react-datepicker.css";

interface Props {
    nameSim: string;
    optionFeature: OptionFeature;
    idModel: number;
    idSimulation: number;
    startDate: Date;
    setStartDate: (value: Date) => void;
    setIdGeo: (value: number) => void;
    setIdGraph: (value: number) => void;
    setIdSim: (value: ActionsIdSimulation) => void;
}

const SelectDate = ({
    nameSim,
    optionFeature,
    idModel,
    idSimulation,
    startDate,
    setStartDate,
    setIdGeo,
    setIdGraph,
    setIdSim,
}: Props) => {
    const { setInitialConditions } = useContext(ControlPanel);
    const { setSimulation } = useContext(SimulationSetted);

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
                setSimulation({
                    type: "update-all",
                    id: idSimulation,
                    payload: {
                        name: nameSim,
                        idSim: idSimulation,
                        idModel,
                        idGeo: 0,
                        idGraph: 0,
                        t_init: format(new Date(x), "yyyy/MM/dd"),
                        typeSelection: optionFeature,
                        initialConditions: {
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
                    },
                });
            }}
            openToDate={new Date(2021, 11, 31)}
            maxDate={new Date(2021, 11, 31)}
        />
    );
};
export default SelectDate;
