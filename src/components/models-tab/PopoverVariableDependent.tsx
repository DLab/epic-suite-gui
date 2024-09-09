import { EditIcon } from "@chakra-ui/icons";
import {
    IconButton,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import React from "react";

import type {
    TransitionFunction,
    TypePhase,
} from "types/VariableDependentTime";

import {
    SinoInputs,
    SquareInputs,
    StaticInputs,
    TransitionInputs,
} from "./FormVariableDependent";

interface Props {
    data: DataPopover;
    setValues: (values: unknown) => void;
    i: number;
}
interface DataPopover {
    name?: string;
    value?: number;
    min?: number;
    max?: number;
    initvalue?: number;
    endvalue?: number;
    concavity?: number;
    initPhase?: TypePhase;
    period?: number;
    duty?: number;
    ftype?: TransitionFunction;
    gw?: number;
}

export const TimeDependentFunctionInput = (
    data: DataPopover,
    onClose: () => void,
    i: number,
    setValues: (values: unknown) => void
) => {
    const { name, ...rest } = data;
    switch (name) {
        case "static":
            return (
                <StaticInputs
                    value={rest.value}
                    id={i}
                    setVal={setValues}
                    close={onClose}
                />
            );
        case "sinusoidal":
            return (
                <SinoInputs
                    min={rest.min}
                    max={rest.max}
                    initPhase={rest.initPhase}
                    period={rest.period}
                    setVal={setValues}
                    id={i}
                    close={onClose}
                />
            );
        case "square":
            return (
                <SquareInputs
                    min={rest.min}
                    max={rest.max}
                    initPhase={rest.initPhase}
                    period={rest.period}
                    duty={rest.duty}
                    setVal={setValues}
                    id={i}
                    close={onClose}
                />
            );
        case "transition":
            return (
                <TransitionInputs
                    initvalue={rest.initvalue}
                    endvalue={rest.endvalue}
                    ftype={rest.ftype}
                    concavity={rest.concavity}
                    setVal={setValues}
                    id={i}
                    close={onClose}
                />
            );
        default:
            return <Text>Not Function Selected</Text>;
    }
};

const PopoverVariableDependent = ({ data, setValues, i }: Props) => {
    const { onOpen, onClose, isOpen } = useDisclosure();
    return (
        <Popover isLazy isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
            <PopoverTrigger>
                <IconButton
                    bg="#FFFFFF"
                    color="#16609E"
                    aria-label="Call Segun"
                    size="xs"
                    cursor="pointer"
                    icon={<EditIcon />}
                />
            </PopoverTrigger>
            <PopoverContent>
                {TimeDependentFunctionInput(data, onClose, i, setValues)}
            </PopoverContent>
        </Popover>
    );
};

export default PopoverVariableDependent;
