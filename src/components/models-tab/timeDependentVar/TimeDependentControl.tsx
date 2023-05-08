import { FormControl, Flex, Switch, IconButton, Text } from "@chakra-ui/react";

import FunctionIcon from "components/icons/FunctionIcon";
import NumberInputVariableDependent from "components/NumberInputVariableDependent";

const TimeDependentControl = ({
    value,
    nameParams,
    name,
    description,
    step,
    min,
    max,
    isDisabled,
    duration,
    isStateLocal,
    isChecked,
    onChangeSwitch,
    onClickIconButton,
}) => (
    <FormControl display="flex" alignItems="center">
        <Flex w="50%" h="2rem" alignItems="center">
            <NumberInputVariableDependent
                value={value}
                nameParams={nameParams}
                name={name}
                description={description}
                step={step}
                min={min}
                max={max}
                isDisabled={isDisabled}
                duration={duration}
                isStateLocal={isStateLocal}
            />
        </Flex>
        <Flex alignItems="center" w="50%" justifyContent="flex-end">
            <Text fontSize="0.688rem">Set function</Text>
            <Switch
                ml="0.5rem"
                isChecked={isChecked}
                onChange={onChangeSwitch}
            />
            <IconButton
                fill="white"
                bg="#FFFFFF"
                color="#016FB9"
                aria-label="Call Segun"
                size="sm"
                isDisabled={!isDisabled}
                cursor="pointer"
                icon={<FunctionIcon />}
                ml="1rem"
                onClick={onClickIconButton}
            />
        </Flex>
    </FormControl>
);

export default TimeDependentControl;
