/* eslint-disable sonarjs/no-identical-functions */
/* eslint-disable sonarjs/no-duplicate-string */
import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Box,
    Text,
    Button,
    ButtonGroup,
    Flex,
    Stack,
    Radio,
    RadioGroup,
    useToast,
} from "@chakra-ui/react";
import { useState } from "react";

import {
    TransitionFunction,
    TypePhase,
} from "../../types/VariableDependentTime";
import ToastCustom from "components/ToastCustom";
import { useWaveformInputs } from "hooks/modelTab/useWaveForm";
import { StatusSimulation } from "types/HardSimulationType";

import {
    ChooseTDFunction,
    InputTDFunction,
    RadioInputTDFunction,
} from "./timeDependentVar/ChooseTDFunction";

interface DataSetters {
    id: number;
    setVal: (values: unknown) => void;
    close: () => void;
}

interface StaticsProps extends DataSetters {
    value: number;
}
interface SineProps extends DataSetters {
    min: number;
    max: number;
    period: number;
    initPhase: TypePhase;
}
interface SquareProps extends SineProps {
    duty: number;
}
interface TransProps extends DataSetters {
    initvalue: number;
    endvalue: number;
    concavity: number;
    ftype: TransitionFunction;
}

const CustomNumberInput = ({
    label,
    value,
    onChange,
    width = "35%",
    min = 0,
    step = 0.01,
    isInvalid,
    size = "xs",
}) => (
    <>
        {label}:
        <NumberInput
            w={width}
            size={size}
            value={value}
            min={min}
            step={step}
            isInvalid={isInvalid}
            onChange={onChange}
        >
            <NumberInputField />
            <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
            </NumberInputStepper>
        </NumberInput>
    </>
);

const CustomRadioGroup = ({ label, value, onChange, options, size = "sm" }) => (
    <>
        {label}:
        <RadioGroup value={value} size={size} onChange={onChange}>
            <Stack direction="row">
                {options.map((option) => (
                    <Radio key={option.value} value={`${option.value}`}>
                        {option.label}
                    </Radio>
                ))}
            </Stack>
        </RadioGroup>
    </>
);

export const StaticInputs = ({ value, id, setVal, close }: StaticsProps) => {
    const { state, setstate } = useWaveformInputs({ value });
    return (
        <ChooseTDFunction label="Static Value">
            <InputTDFunction
                label=""
                value={state}
                onChange={setstate}
                precision={0.2}
            />
            <ButtonGroup mt={1} display="flex" justifyContent="flex-end">
                <Button
                    size="xs"
                    onClick={() => {
                        setVal({
                            type: "editElement",
                            index: id,
                            payloadTypeElement: {
                                name: "static",
                                value: +state,
                            },
                        });
                        close();
                    }}
                >
                    Set
                </Button>
                <Button size="xs" onClick={() => close()}>
                    Cancel
                </Button>
            </ButtonGroup>
        </ChooseTDFunction>
    );
};

export const SinoInputs = ({
    min,
    max,
    period,
    initPhase,
    id,
    setVal,
    close,
}: SineProps) => {
    const {
        minVal,
        setMinVal,
        maxVal,
        setMaxVal,
        periodVal,
        setPeriodVal,
        initPhaseVal,
        setInitPhaseVal,
    } = useWaveformInputs({ min, max, period, initPhase });
    const toast = useToast();
    return (
        <ChooseTDFunction label="Sinusoidal">
            <Flex wrap="wrap">
                <InputTDFunction
                    label="Min"
                    value={minVal}
                    onChange={setMinVal}
                    precision={2}
                />
                <InputTDFunction
                    label="Max"
                    value={maxVal}
                    isInvalid={maxVal <= minVal}
                    onChange={setMaxVal}
                    precision={2}
                />
                <InputTDFunction
                    label="Period"
                    value={periodVal}
                    onChange={setPeriodVal}
                    precision={0}
                    step={1}
                    min={1}
                />
                <RadioInputTDFunction
                    label="InitPhase"
                    defaultValue={initPhaseVal}
                    value={initPhaseVal}
                    onChange={setInitPhaseVal}
                    radioValueOptions={[
                        { key: "Min", val: `${TypePhase.min}` },
                        { key: "Max", val: `${TypePhase.max}` },
                    ]}
                />
            </Flex>
            <ButtonGroup display="flex" justifyContent="flex-end">
                <Button
                    size="xs"
                    onClick={() => {
                        if (minVal >= maxVal) {
                            toast({
                                duration: 3000,
                                isClosable: true,
                                position: "bottom-right",
                                render: () => (
                                    <ToastCustom
                                        title="Failed setting function"
                                        status={StatusSimulation.ERROR}
                                    >
                                        "min must to be lesser than max. Fix it
                                        for setting please!"
                                    </ToastCustom>
                                ),
                            });
                        } else {
                            setVal({
                                type: "editElement",
                                index: id,
                                payloadTypeElement: {
                                    name: "sinusoidal",
                                    min: +minVal,
                                    max: +maxVal,
                                    period: periodVal,
                                    initPhase: initPhaseVal,
                                },
                            });
                            close();
                        }
                    }}
                >
                    Set
                </Button>
                <Button size="xs" onClick={() => close()}>
                    Cancel
                </Button>
            </ButtonGroup>
        </ChooseTDFunction>
    );
};
export const SquareInputs = ({
    min,
    max,
    period,
    initPhase,
    duty,
    id,
    setVal,
    close,
}: SquareProps) => {
    const {
        minVal,
        setMinVal,
        maxVal,
        setMaxVal,
        periodVal,
        setPeriodVal,
        initPhaseVal,
        setInitPhaseVal,
        dutyVal,
        setDutyVal,
    } = useWaveformInputs({ min, max, period, initPhase, duty });
    const toast = useToast();
    const handleOnClick = () => {
        if (+minVal >= +maxVal) {
            toast({
                duration: 3000,
                isClosable: true,
                position: "bottom-right",
                render: () => (
                    <ToastCustom
                        title="Failed setting function"
                        status={StatusSimulation.ERROR}
                    >
                        "min must to be lesser than max. Fix it for setting
                        please!"
                    </ToastCustom>
                ),
            });
            return;
        }
        setVal({
            type: "editElement",
            index: id,
            payloadTypeElement: {
                name: "square",
                min: +minVal,
                max: +maxVal,
                period: periodVal,
                initPhase: +initPhaseVal,
                duty: +dutyVal,
            },
        });
        close();
    };
    return (
        <ChooseTDFunction label="Square">
            <Flex wrap="wrap">
                <InputTDFunction
                    label="Min"
                    value={minVal}
                    onChange={setMinVal}
                    precision={2}
                />
                <InputTDFunction
                    label="Max"
                    value={maxVal}
                    isInvalid={maxVal <= minVal}
                    onChange={setMaxVal}
                    precision={2}
                />
                <InputTDFunction
                    label="Period"
                    value={periodVal}
                    onChange={setPeriodVal}
                    precision={0}
                    step={1}
                    min={1}
                />
                <InputTDFunction
                    label="Duty"
                    value={dutyVal}
                    onChange={setDutyVal}
                    precision={2}
                />
                <RadioInputTDFunction
                    label="InitPhase"
                    defaultValue={initPhaseVal}
                    value={initPhaseVal}
                    onChange={setInitPhaseVal}
                    radioValueOptions={[
                        { key: "Min", val: `${TypePhase.min}` },
                        { key: "Max", val: `${TypePhase.max}` },
                    ]}
                />
            </Flex>
            <ButtonGroup display="flex" justifyContent="flex-end">
                <Button size="xs" onClick={handleOnClick}>
                    Set
                </Button>
                <Button size="xs" onClick={() => close()}>
                    Cancel
                </Button>
            </ButtonGroup>
        </ChooseTDFunction>
    );
};
export const TransitionInputs = ({
    ftype,
    initvalue,
    endvalue,
    concavity,
    id,
    setVal,
    close,
}: TransProps) => {
    const {
        transitionVal,
        setTransitionVal,
        initVal,
        setInitVal,
        endVal,
        setEndVal,
        concavityVal,
        setConcavityVal,
    } = useWaveformInputs({ ftype, initvalue, endvalue, concavity });
    const toast = useToast();
    return (
        <Flex direction="column" p="0.5rem">
            <Text>Transition</Text>
            <RadioGroup
                value={`${transitionVal}`}
                // eslint-disable-next-line sonarjs/no-identical-functions
                onChange={(e) => {
                    if (+e === 0) {
                        setTransitionVal(TransitionFunction.linear);
                    } else if (+e === 1) {
                        setTransitionVal(TransitionFunction.quadratic);
                    } else {
                        setTransitionVal(TransitionFunction.sigmoidal);
                    }
                }}
            >
                <Stack direction="row">
                    <Radio value={`${TransitionFunction.linear}`}>Linear</Radio>
                    <Radio value={`${TransitionFunction.quadratic}`}>
                        Quadratic
                    </Radio>
                    <Radio value={`${TransitionFunction.sigmoidal}`}>
                        Sigmoidal
                    </Radio>
                </Stack>
            </RadioGroup>
            <Flex wrap="wrap">
                initial value:
                <NumberInput
                    w="35%"
                    size="xs"
                    value={initVal}
                    min={0}
                    step={0.01}
                    onChange={(e) => setInitVal(e)}
                >
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
                End value:
                <NumberInput
                    w="35%"
                    size="xs"
                    value={endVal}
                    min={0}
                    step={0.01}
                    onChange={(e) => setEndVal(e)}
                    isInvalid={endVal <= initVal}
                >
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
                <Flex>
                    {transitionVal === 1 && (
                        <>
                            Concavity:
                            <RadioGroup
                                value={`${concavityVal}`}
                                // eslint-disable-next-line sonarjs/no-identical-functions
                                onChange={(e) => {
                                    setConcavityVal(+e);
                                }}
                            >
                                <Stack direction="row">
                                    <Radio value="0">Concave</Radio>
                                    <Radio value="1">Convex</Radio>
                                </Stack>
                            </RadioGroup>
                        </>
                    )}
                </Flex>
            </Flex>
            <ButtonGroup display="flex" justifyContent="flex-end" mt="0.5">
                <Button
                    size="xs"
                    onClick={() => {
                        if (initVal >= endVal) {
                            toast({
                                duration: 3000,
                                isClosable: true,
                                position: "bottom-right",
                                render: () => (
                                    <ToastCustom
                                        title="Failed setting function"
                                        status={StatusSimulation.ERROR}
                                    >
                                        "min must to be lesser than max. Fix it
                                        for setting please!"
                                    </ToastCustom>
                                ),
                            });
                        } else {
                            setVal({
                                type: "editElement",
                                index: id,
                                payloadTypeElement: {
                                    name: "transition",
                                    initvalue: +initVal,
                                    endvalue: +endVal,
                                    ftype: +transitionVal,
                                    concavity: +concavityVal,
                                },
                            });
                            close();
                        }
                    }}
                >
                    Set
                </Button>
                <Button size="xs" onClick={() => close()}>
                    Cancel
                </Button>
            </ButtonGroup>
        </Flex>
    );
};
