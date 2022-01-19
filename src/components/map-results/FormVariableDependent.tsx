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

import { TransitionFunction, TypePhase } from "types/VariableDependentTime";

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
    min: number;
    max: number;
    concavity: number;
    gw?: number;
    transition: TransitionFunction;
}

export const StaticInputs = ({ value, id, setVal, close }: StaticsProps) => {
    const [state, setstate] = useState<number>(value);
    return (
        <Flex alignItems="center">
            <Text>Static</Text>
            Value:
            <NumberInput
                w="30%"
                ml="0.5"
                size="sm"
                min={0}
                step={0.01}
                value={state}
                onChange={(e) => setstate(+e)}
            >
                <NumberInputField />
                <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>
            <ButtonGroup mt={1} d="flex" justifyContent="flex-end">
                <Button
                    size="xs"
                    onClick={() => {
                        setVal({
                            type: "editElement",
                            index: id,
                            payloadTypeElement: {
                                name: "static",
                                value: state,
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
        </Flex>
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
    const [minVal, setMinVal] = useState(min);
    const [maxVal, setMaxVal] = useState(max);
    const [periodVal, setPeriodVal] = useState(period);
    const [initPhaseVal, setInitPhaseVal] = useState(initPhase);
    const toast = useToast();
    return (
        <Flex direction="column">
            <Text>Sinusoidal</Text>
            <Flex wrap="wrap" direction="column">
                <Flex>
                    Min:
                    <NumberInput
                        w="35%"
                        size="xs"
                        value={minVal}
                        min={0}
                        step={0.01}
                        onChange={(e) => setMinVal(+e)}
                    >
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </Flex>
                <Flex>
                    Max:
                    <NumberInput
                        w="35%"
                        size="xs"
                        value={maxVal}
                        min={0}
                        step={0.01}
                        isInvalid={maxVal <= minVal}
                        onChange={(e) => setMaxVal(+e)}
                    >
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </Flex>
                <Flex>
                    Period:
                    <NumberInput
                        w="35%"
                        size="xs"
                        value={periodVal}
                        min={0}
                        step={0.01}
                        onChange={(e) => setPeriodVal(+e)}
                    >
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </Flex>
                <Flex>
                    InitPhase:
                    <RadioGroup
                        value={`${initPhaseVal}`}
                        size="sm"
                        onChange={(e) => {
                            if (e === TypePhase.min) {
                                setInitPhaseVal(TypePhase.min);
                            } else {
                                setInitPhaseVal(TypePhase.max);
                            }
                        }}
                    >
                        <Stack direction="row">
                            <Radio value={TypePhase.min}>{TypePhase.min}</Radio>
                            <Radio value={TypePhase.max}>{TypePhase.max}</Radio>
                        </Stack>
                    </RadioGroup>
                </Flex>
            </Flex>
            <ButtonGroup d="flex" justifyContent="flex-end">
                <Button
                    size="xs"
                    onClick={() => {
                        if (minVal >= maxVal) {
                            toast({
                                title: "Failed setting function",
                                description:
                                    "min must to be lesser than max. Fix it for setting please!",
                                status: "error",
                                duration: 4000,
                                isClosable: true,
                                position: "bottom-right",
                            });
                        } else {
                            setVal({
                                type: "editElement",
                                index: id,
                                payloadTypeElement: {
                                    name: "sinusoidal",
                                    min: minVal,
                                    max: maxVal,
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
        </Flex>
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
    const [minVal, setMinVal] = useState(min);
    const [maxVal, setMaxVal] = useState(max);
    const [periodVal, setPeriodVal] = useState(period);
    const [initPhaseVal, setInitPhaseVal] = useState(initPhase);
    const [dutyVal, setDutyVal] = useState(duty);
    const toast = useToast();
    return (
        <Flex direction="column">
            <Text>Square</Text>
            <Flex wrap="wrap">
                Min:
                <NumberInput
                    size="xs"
                    value={minVal}
                    onChange={(e) => setMinVal(+e)}
                    w="35%"
                    min={0}
                    step={0.01}
                >
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
                Max:
                <NumberInput
                    size="xs"
                    value={maxVal}
                    onChange={(e) => setMaxVal(+e)}
                    w="35%"
                    min={0}
                    step={0.01}
                    isInvalid={maxVal <= minVal}
                >
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
                Period:
                <NumberInput
                    size="xs"
                    value={periodVal}
                    onChange={(e) => setPeriodVal(+e)}
                    w="35%"
                >
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
                Duty:
                <NumberInput
                    w="35%"
                    size="xs"
                    value={dutyVal}
                    min={0}
                    step={0.01}
                    onChange={(e) => setDutyVal(+e)}
                >
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
                InitPhase:
                <RadioGroup
                    defaultValue={initPhaseVal}
                    // eslint-disable-next-line sonarjs/no-identical-functions
                    onChange={(e) => {
                        if (e === "min") {
                            setInitPhaseVal(TypePhase.min);
                        } else {
                            setInitPhaseVal(TypePhase.max);
                        }
                    }}
                >
                    <Stack direction="row">
                        <Radio value="min">{TypePhase.min}</Radio>
                        <Radio value="max">{TypePhase.max}</Radio>
                    </Stack>
                </RadioGroup>
            </Flex>
            <ButtonGroup d="flex" justifyContent="flex-end">
                <Button
                    size="xs"
                    onClick={() => {
                        if (minVal >= maxVal) {
                            toast({
                                title: "Failed setting function",
                                description:
                                    "min must to be lesser than max. Fix it for setting please!",
                                status: "error",
                                duration: 4000,
                                isClosable: true,
                                position: "bottom-right",
                            });
                        } else {
                            setVal({
                                type: "editElement",
                                index: id,
                                payloadTypeElement: {
                                    name: "square",
                                    min: minVal,
                                    max: maxVal,
                                    period: periodVal,
                                    initPhase: initPhaseVal,
                                    duty: dutyVal,
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
export const TransitionInputs = ({
    transition,
    min,
    max,
    concavity,
    gw,
    id,
    setVal,
    close,
}: TransProps) => {
    const [transitionVal, setTransitionVal] =
        useState<TransitionFunction>(transition);
    const [minVal, setMinVal] = useState(min);
    const [maxVal, setMaxVal] = useState(max);
    const [concavityVal, setConcavityVal] = useState(concavity);
    const [gwVal, setGwVal] = useState(gw);
    const toast = useToast();
    return (
        <Flex direction="column" p="0.5rem">
            <Text>Transition</Text>
            <RadioGroup
                value={`${transitionVal}`}
                // eslint-disable-next-line sonarjs/no-identical-functions
                onChange={(e) => {
                    if (e === "linear") {
                        setTransitionVal(TransitionFunction.linear);
                    } else if (e === "quadratic") {
                        setTransitionVal(TransitionFunction.quadratic);
                    } else {
                        setTransitionVal(TransitionFunction.sigmoidal);
                    }
                }}
            >
                <Stack direction="row">
                    <Radio value="linear">{TransitionFunction.linear}</Radio>
                    <Radio value="quadratic">
                        {TransitionFunction.quadratic}
                    </Radio>
                    <Radio value="sigmoidal">
                        {TransitionFunction.sigmoidal}
                    </Radio>
                </Stack>
            </RadioGroup>
            <Flex wrap="wrap">
                Min:
                <NumberInput
                    w="35%"
                    size="xs"
                    value={minVal}
                    min={0}
                    step={0.01}
                    onChange={(e) => setMinVal(+e)}
                >
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
                Max:
                <NumberInput
                    w="35%"
                    size="xs"
                    value={maxVal}
                    min={0}
                    step={0.01}
                    onChange={(e) => setMaxVal(+e)}
                    isInvalid={maxVal <= minVal}
                >
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
                <Flex>
                    Concavity:
                    <NumberInput
                        w="35%"
                        size="xs"
                        value={concavityVal}
                        min={0}
                        step={0.01}
                        onChange={(e) => setConcavityVal(+e)}
                    >
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                    {transitionVal === `quadratic` && (
                        <>
                            gw:
                            <NumberInput
                                w="35%"
                                size="xs"
                                value={gwVal}
                                min={0}
                                step={0.01}
                                onChange={(e) => setGwVal(+e)}
                            >
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </>
                    )}
                </Flex>
            </Flex>
            <ButtonGroup d="flex" justifyContent="flex-end" mt="0.5">
                <Button
                    size="xs"
                    onClick={() => {
                        if (minVal >= maxVal) {
                            toast({
                                title: "Failed setting function",
                                description:
                                    "min must to be lesser than max. Fix it for setting please!",
                                status: "error",
                                duration: 4000,
                                isClosable: true,
                                position: "bottom-right",
                            });
                        } else {
                            setVal({
                                type: "editElement",
                                index: id,
                                payloadTypeElement: {
                                    name: "transition",
                                    min: minVal,
                                    max: maxVal,
                                    transition: transitionVal,
                                    concavity: concavityVal,
                                    gw: gwVal,
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
