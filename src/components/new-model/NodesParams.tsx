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
} from "@chakra-ui/react";
import React from "react";

import FunctionIcon from "components/icons/FunctionIcon";
import NumberInputEpi from "components/NumberInputEpi";
import NumberInputVariableDependent from "components/NumberInputVariableDependent";
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
    setDataView,
    setPositionVDT,
    modelCompartment,
}: Props) => {
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
                                    <span>Beta (β)</span>
                                    <NumberInputVariableDependent
                                        value={beta[i].val}
                                        index={i}
                                        setValue={setParameters}
                                        nameParams="beta"
                                        name="Beta (β)"
                                        description="Infection rate"
                                        step={0.01}
                                        min={0.01}
                                        max={0.5}
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
                                    <span>Set function</span>
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
                                    <span>Alpha (α)</span>
                                    <NumberInputVariableDependent
                                        value={alpha[i].val}
                                        setValue={setParameters}
                                        nameParams="alpha"
                                        name="Alpha (α)"
                                        description="Mobility"
                                        step={0.01}
                                        min={0.01}
                                        max={0.5}
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
                                    <span>Set function</span>
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
                                name="Mu (μ)"
                                description="Exposed/Infected Initial rate"
                                step={0.01}
                                min={0.01}
                                max={5}
                                index={i}
                                type="slider"
                                isStateLocal
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
