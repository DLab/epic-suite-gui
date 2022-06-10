import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Flex,
    FormControl,
    IconButton,
    Switch,
    Text,
} from "@chakra-ui/react";
import { useContext } from "react";

import FunctionIcon from "components/icons/FunctionIcon";
import NumberInputEpi from "components/NumberInputEpi";
import NumberInputVariableDependent from "components/NumberInputVariableDependent";
import { ControlPanel } from "context/ControlPanelContext";
import { ActionsEpidemicData } from "types/ControlPanelTypes";
import VariableDependentTime from "types/VariableDependentTime";
import createIdComponent from "utils/createIdcomponent";

import SeirhvdController from "./SeirhvdController";

type Props = {
    nodes: string[];
    beta: VariableDependentTime[];
    alpha: VariableDependentTime[];
    mu: number[];
    duration: number;
    modelCompartment: string;
    otherParameters: Record<string, VariableDependentTime[]>;
    setParameters: (values: ActionsEpidemicData) => void;
    setIsEnableIconButton: (obj: Record<string, boolean[]>) => void;
    isEnableIconButton: Record<string, boolean[]>;
    showSectionVariable: (show: boolean) => void;
    setShowSectionInitialConditions: (value: boolean) => void;
    setDataView: (dataView: VariableDependentTime) => void;
    setPositionVDT: (position: number) => void;
};

const NodesParams = ({
    nodes,
    beta,
    alpha,
    mu,
    duration,
    otherParameters,
    setParameters,
    setIsEnableIconButton,
    isEnableIconButton,
    showSectionVariable,
    setShowSectionInitialConditions,
    setDataView,
    setPositionVDT,
    modelCompartment,
}: Props) => {
    const { description } = useContext(ControlPanel);
    return (
        <Accordion reduceMotion allowToggle>
            {nodes.map((node, i) => (
                <AccordionItem key={createIdComponent()}>
                    <h2>
                        <AccordionButton>
                            <Box flex="1" textAlign="left">
                                {node}
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel>
                        <Flex justifyContent="space-between" wrap="wrap">
                            <FormControl display="flex" alignItems="center">
                                <Flex w="50%">
                                    <Text fontSize="14px">Beta (β)</Text>
                                    <NumberInputVariableDependent
                                        value={beta[i].val}
                                        index={i}
                                        setValue={setParameters}
                                        nameParams="beta"
                                        name={description.beta.alias}
                                        description={
                                            description.beta.description
                                        }
                                        step={description.beta.values.step}
                                        min={description.beta.values.min}
                                        max={description.beta.values.max}
                                        isStateLocal
                                        duration={duration}
                                        isDisabled={isEnableIconButton.beta[i]}
                                    />
                                </Flex>
                                <Flex
                                    alignItems="center"
                                    w="50%"
                                    justifyContent="flex-end"
                                >
                                    <Text fontSize="14px">Set function</Text>
                                    <Switch
                                        ml="0.5rem"
                                        isChecked={isEnableIconButton.beta[i]}
                                        onChange={(e) => {
                                            const subPermission: boolean[] =
                                                isEnableIconButton.beta;
                                            subPermission[i] = e.target.checked;
                                            setIsEnableIconButton({
                                                ...isEnableIconButton,
                                                beta: subPermission,
                                            });
                                            if (!e.target.checked) {
                                                showSectionVariable(false);
                                            }
                                            setParameters({
                                                type: "switch",
                                                target: "beta",
                                                switch: e.target.checked,
                                                positionVariableDependentTime:
                                                    i,
                                            });
                                        }}
                                    />

                                    <IconButton
                                        fill="white"
                                        bg="#FFFFFF"
                                        color="#16609E"
                                        aria-label="Call Segun"
                                        size="sm"
                                        isDisabled={!isEnableIconButton.beta[i]}
                                        cursor="pointer"
                                        icon={<FunctionIcon />}
                                        ml="1rem"
                                        onClick={() => {
                                            setShowSectionInitialConditions(
                                                false
                                            );
                                            showSectionVariable(true);
                                            setDataView(beta[i]);
                                            setPositionVDT(i);
                                        }}
                                    />
                                </Flex>
                            </FormControl>
                        </Flex>

                        <Flex justifyContent="space-between" wrap="wrap">
                            <FormControl display="flex" alignItems="center">
                                <Flex w="60%">
                                    <Text fontSize="14px">Alpha (α)</Text>
                                    <NumberInputVariableDependent
                                        value={alpha[i].val}
                                        setValue={setParameters}
                                        nameParams="alpha"
                                        name={description.alpha.alias}
                                        description={
                                            description.alpha.description
                                        }
                                        step={description.alpha.values.step}
                                        min={description.alpha.values.min}
                                        max={description.alpha.values.max}
                                        index={i}
                                        duration={duration}
                                        isStateLocal
                                        isDisabled={isEnableIconButton.alpha[i]}
                                    />
                                </Flex>
                                <Flex
                                    alignItems="center"
                                    w="50%"
                                    justifyContent="flex-end"
                                >
                                    <Text fontSize="14px">Set function</Text>
                                    <Switch
                                        ml="0.5rem"
                                        isChecked={isEnableIconButton.alpha[i]}
                                        onChange={(e) => {
                                            const subPermission: boolean[] =
                                                isEnableIconButton.alpha;
                                            subPermission[i] = e.target.checked;
                                            setIsEnableIconButton({
                                                ...isEnableIconButton,
                                                alpha: subPermission,
                                            });
                                            if (!e.target.checked) {
                                                showSectionVariable(false);
                                            }
                                            setParameters({
                                                type: "switch",
                                                target: "alpha",
                                                switch: e.target.checked,
                                                positionVariableDependentTime:
                                                    i,
                                            });
                                        }}
                                    />

                                    <IconButton
                                        fill="white"
                                        bg="#FFFFFF"
                                        color="#16609E"
                                        aria-label="Call Segun"
                                        size="sm"
                                        isDisabled={
                                            !isEnableIconButton.alpha[i]
                                        }
                                        cursor="pointer"
                                        icon={<FunctionIcon />}
                                        ml="1rem"
                                        onClick={() => {
                                            setShowSectionInitialConditions(
                                                false
                                            );
                                            showSectionVariable(true);
                                            setDataView(alpha[i]);
                                            setPositionVDT(i);
                                        }}
                                    />
                                </Flex>
                            </FormControl>
                        </Flex>
                        <Box py="0.5rem">
                            <NumberInputEpi
                                value={mu[i]}
                                setValue={setParameters}
                                nameParams="mu"
                                name={description.mu.alias}
                                description={description.mu.description}
                                step={description.mu.values.step}
                                min={description.mu.values.min}
                                max={description.mu.values.max}
                                index={i}
                                type="number"
                                isStateLocal
                                isInitialParameters
                            />
                        </Box>
                        {modelCompartment === "SEIRHVD" && (
                            <SeirhvdController
                                setPositionVDT={setPositionVDT}
                                showSectionVariable={showSectionVariable}
                                idNode={i}
                                setDataView={setDataView}
                                isEnableIconButton={isEnableIconButton}
                                setIsEnableIconButton={setIsEnableIconButton}
                                seirhvdProps={otherParameters}
                                duration={duration}
                            />
                        )}
                    </AccordionPanel>
                </AccordionItem>
            ))}
        </Accordion>
    );
};

export default NodesParams;
