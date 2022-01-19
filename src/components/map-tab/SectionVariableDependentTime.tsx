/* eslint-disable @typescript-eslint/dot-notation */
import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
    Skeleton,
    Box,
    Heading,
    Tooltip,
    IconButton,
    Flex,
    Select,
    Button,
    ButtonGroup,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    NumberInput,
    useToast,
} from "@chakra-ui/react";
import { useReducer, useState, useContext } from "react";

import { ControlPanel } from "context/ControlPanelContext";
import VariableDependentTime, {
    NameFunction,
} from "types/VariableDependentTime";
import createIdComponent from "utils/createIdcomponent";
import reducerVariableDependent, {
    handleNameFunctionSelect,
    valueBeforeRangeDays,
} from "utils/reducerVariableDependent";

import DateRangeVariableDependent from "./DateRangeVariableDependent";
import PopoverVariableDependent from "./PopoverVariableDependent";

interface Props {
    valuesVariablesDependent: VariableDependentTime;
    showSectionVariable: (value: boolean) => void;
}

const SectionVariableDependentTime = ({
    valuesVariablesDependent,
    showSectionVariable,
}: Props) => {
    const [idRangeUpdating, setIdRangeUpdating] = useState(-1);
    const [isRangeUpdating, setIsRangeUpdating] = useState<boolean>(false);
    const { setParameters } = useContext(ControlPanel);
    const [values, setValues] = useReducer(
        reducerVariableDependent,
        valuesVariablesDependent
    );
    const toast = useToast();
    return (
        <Box>
            <Skeleton h="30vh">
                <div>contents wrapped</div>
                <div>won't be visible</div>
            </Skeleton>
            <Box>
                <Flex justifyContent="space-between">
                    <Heading as="h3">{values["name"]}</Heading>
                    <Flex alignItems="center">
                        Default:
                        <NumberInput
                            ml="0.2rem"
                            w="35%"
                            size="xs"
                            value={values["default"]}
                            onChange={(e) =>
                                setValues({
                                    type: "editDefault",
                                    index: +e,
                                })
                            }
                        >
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </Flex>
                    <Tooltip label="Add a range">
                        <IconButton
                            bg="#16609E"
                            color="#FFFFFF"
                            aria-label="Call Segun"
                            size="sm"
                            cursor="pointer"
                            _hover={{ bg: "blue.500" }}
                            icon={<AddIcon />}
                            onClick={() => {
                                setValues({
                                    type: "add",
                                    payloadVariableDependent: {
                                        rangeDays: [
                                            valueBeforeRangeDays(
                                                values.rangeDays
                                            ),
                                            valueBeforeRangeDays(
                                                values.rangeDays
                                            ) + 10,
                                        ],
                                        type: {
                                            name: NameFunction.static,
                                            value: 1,
                                        },
                                    },
                                });
                            }}
                        />
                    </Tooltip>
                </Flex>
                <Box
                    border="1px"
                    p="0.5"
                    borderColor="gray.200"
                    maxH="30vh"
                    h="30vh"
                    overflowY="scroll"
                >
                    {values["rangeDays"].map((range: number[], i: number) => (
                        <Flex
                            key={createIdComponent()}
                            h="3rem"
                            alignItems="center"
                            justifyContent="space-between"
                            borderBottom="1px"
                            borderColor="gray.200"
                        >
                            range: {i + 1}{" "}
                            <Flex w="50%" justifyContent="space-around">
                                <IconButton
                                    bg="#ffffff"
                                    color="#16609E"
                                    aria-label="Call Segun"
                                    size="xs"
                                    isDisabled={
                                        isRangeUpdating &&
                                        idRangeUpdating !== i &&
                                        idRangeUpdating !== -1
                                    }
                                    cursor="pointer"
                                    icon={<EditIcon />}
                                    onClick={() => {
                                        setIsRangeUpdating(true);
                                        setIdRangeUpdating(i);
                                    }}
                                />
                                <DateRangeVariableDependent
                                    beforeRange={
                                        values["rangeDays"][
                                            i === 0 ? 0 : i - 1
                                        ][1]
                                    }
                                    init={range[0]}
                                    end={range[1]}
                                    id={i}
                                    setDate={setValues}
                                    isRangeUpdating={isRangeUpdating}
                                    idRangeUpdating={idRangeUpdating}
                                    handleInput={{
                                        setId: setIdRangeUpdating,
                                        setIsRange: setIsRangeUpdating,
                                    }}
                                />
                            </Flex>
                            <Flex
                                w="50%"
                                alignItems="center"
                                justifyContent="end"
                            >
                                Type function:
                                <Select
                                    w="45%"
                                    size="sm"
                                    ml="0.2rem"
                                    value={values["type"][i].name}
                                    onChange={(e) => {
                                        handleNameFunctionSelect(
                                            e.target.value,
                                            i,
                                            setValues
                                        );
                                    }}
                                >
                                    <option value="transition">
                                        transition
                                    </option>
                                    <option value={NameFunction.static}>
                                        {NameFunction.static}
                                    </option>
                                    <option value={NameFunction.sinusoidal}>
                                        {NameFunction.sinusoidal}
                                    </option>
                                    <option value={NameFunction.square}>
                                        {NameFunction.square}
                                    </option>
                                </Select>
                                <PopoverVariableDependent
                                    data={values["type"][i]}
                                    i={i}
                                    setValues={setValues}
                                />
                                {values["type"].length !== 1 && (
                                    <IconButton
                                        bg="#ffffff"
                                        color="#16609E"
                                        aria-label="Call Segun"
                                        size="xs"
                                        isDisabled={isRangeUpdating}
                                        cursor="pointer"
                                        icon={<DeleteIcon />}
                                        onClick={() => {
                                            setValues({
                                                type: "delete",
                                                index: i,
                                            });
                                            setIdRangeUpdating(-1);
                                            setIsRangeUpdating(false);
                                        }}
                                    />
                                )}
                            </Flex>
                        </Flex>
                    ))}
                </Box>
                <ButtonGroup variant="outline" spacing="6" my="0.5rem">
                    <Button
                        w="50%"
                        size="sm"
                        colorScheme="blue"
                        onClick={() => {
                            const isCorrectRange = values["rangeDays"].every(
                                (e, i, arr) => {
                                    if (i > 0) {
                                        return e[0] >= arr[i - 1][1];
                                    }
                                    return true;
                                }
                            );
                            if (isCorrectRange) {
                                setParameters({
                                    type: "setVariableDependent",
                                    target: values["name"],
                                    payloadVariableDependent: values,
                                });
                                showSectionVariable(false);
                            } else {
                                toast({
                                    title: "Failed setting function",
                                    description:
                                        "Days ranges are wrong. Fix it for setting please!",
                                    status: "error",
                                    duration: 4000,
                                    isClosable: true,
                                    position: "bottom-left",
                                });
                            }
                        }}
                    >
                        Set
                    </Button>
                    <Button
                        w="50%"
                        size="sm"
                        onClick={() => showSectionVariable(false)}
                    >
                        Cancel
                    </Button>
                </ButtonGroup>
            </Box>
        </Box>
    );
};

export default SectionVariableDependentTime;
