/* eslint-disable @typescript-eslint/naming-convention */
import { EditIcon } from "@chakra-ui/icons";
import {
    Box,
    Stack,
    Text,
    Flex,
    Input,
    Radio,
    RadioGroup,
    IconButton,
    Switch,
    FormControl,
    Heading,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionIcon,
    AccordionPanel,
} from "@chakra-ui/react";
import { useContext, useState, useEffect } from "react";

import NumberInputEpi from "../NumberInputEpi";
import FunctionIcon from "components/icons/FunctionIcon";
import NumberInputVariableDependent from "components/NumberInputVariableDependent";
import { ControlPanel } from "context/ControlPanelContext";
import VariableDependentTime from "types/VariableDependentTime";
import createIdComponent from "utils/createIdcomponent";

import NodesParams from "./NodesParams";
import SeirhvdController from "./SeirhvdController";

interface Props {
    showSectionVariable: (values: boolean) => void;
    setDataView: (values: VariableDependentTime) => void;
    setPositionVDT: (value: number) => void;
    nodes?: string[];
    modelCompartment?: string;
}

const ModelController = ({
    showSectionVariable,
    setDataView,
    setPositionVDT,
    modelCompartment = "SEIR",
    nodes,
}: Props) => {
    const {
        setParameters,
        parameters: {
            t_end,
            pI_det,
            rR_S,
            tE_I,
            tI_R,
            mu,
            beta,
            alpha,
            Beta_v,
            vac_d,
            vac_eff,
            pE_Im,
            tE_Im,
            pE_Icr,
            tE_Icr,
            tEv_Iv,
            tIm_R,
            tIcr_H,
            pIv_R,
            tIv_R,
            pIv_H,
            tIv_H,
            pH_R,
            tH_R,
            pH_D,
            tH_D,
            pR_S,
            tR_S,
        },
    } = useContext(ControlPanel);
    const [isEnableIconButton, setIsEnableIconButton] = useState<
        Record<string, boolean[]>
    >(
        [
            rR_S,
            tE_I,
            tI_R,
            beta,
            alpha,
            Beta_v,
            vac_d,
            vac_eff,
            pE_Im,
            tE_Im,
            pE_Icr,
            tE_Icr,
            tEv_Iv,
            tIm_R,
            tIcr_H,
            pIv_R,
            tIv_R,
            pIv_H,
            tIv_H,
            pH_R,
            tH_R,
            pH_D,
            tH_D,
            pR_S,
            tR_S,
        ].reduce((acc, current) => {
            if (Array.isArray(current)) {
                return {
                    ...acc,
                    [current[0].name]: [
                        ...current.map((variable) => variable.isEnabled),
                    ],
                };
            }
            return {
                ...acc,
                [current.name]: [current.isEnabled],
            };
        }, {})
    );
    return (
        <Box w="100%" h="80vh">
            <Accordion allowMultiple>
                <AccordionItem isFocusable>
                    <h2>
                        <AccordionButton>
                            <Box flex="1" textAlign="left">
                                Parameters
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel>
                        <Heading as="h3">Commons parameters</Heading>
                        <Flex justify="space-between">
                            <Box>
                                <NumberInputEpi
                                    value={t_end}
                                    setValue={setParameters}
                                    nameParams="t_end"
                                    name="Duration"
                                    description="Duration days"
                                    min={0}
                                    step={1}
                                    max={Infinity}
                                    isInitialParameters
                                    type="number"
                                />
                            </Box>
                        </Flex>
                        <Flex justifyContent="space-between" wrap="wrap">
                            {modelCompartment !== "SEIRHVD" && (
                                <FormControl display="flex" alignItems="center">
                                    <Flex
                                        w="50%"
                                        justifyContent="space-between"
                                    >
                                        tI_R{" "}
                                        <NumberInputVariableDependent
                                            value={tI_R.val}
                                            setValue={setParameters}
                                            nameParams="tI_R"
                                            name="tI_R"
                                            description="Transition time between infectious and removed"
                                            step={0.01}
                                            min={0.01}
                                            max={0.5}
                                            isDisabled={
                                                isEnableIconButton.tI_R[0]
                                            }
                                            duration={t_end}
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
                                            isChecked={
                                                isEnableIconButton.tI_R[0]
                                            }
                                            onChange={(e) => {
                                                setIsEnableIconButton({
                                                    ...isEnableIconButton,
                                                    tI_R: [e.target.checked],
                                                });
                                                if (!e.target.checked) {
                                                    showSectionVariable(false);
                                                }
                                                setParameters({
                                                    type: "switch",
                                                    target: "tI_R",
                                                    switch: e.target.checked,
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
                                                !isEnableIconButton.tI_R[0]
                                            }
                                            cursor="pointer"
                                            icon={<FunctionIcon />}
                                            ml="1rem"
                                            onClick={() => {
                                                showSectionVariable(true);
                                                setDataView(tI_R);
                                            }}
                                        />
                                    </Flex>
                                </FormControl>
                            )}
                        </Flex>
                        <Flex justifyContent="space-between" wrap="wrap">
                            {modelCompartment !== "SEIRHVD" && (
                                <FormControl display="flex" alignItems="center">
                                    <Flex
                                        w="50%"
                                        justifyContent="space-between"
                                    >
                                        <span>tE_I</span>
                                        <NumberInputVariableDependent
                                            value={tE_I.val}
                                            setValue={setParameters}
                                            nameParams="tE_I"
                                            name="tE_I"
                                            description="Transition time between exposed and infectious"
                                            step={0.01}
                                            min={0.01}
                                            max={0.5}
                                            isDisabled={
                                                isEnableIconButton.tE_I[0]
                                            }
                                            duration={t_end}
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
                                            isChecked={
                                                isEnableIconButton.tE_I[0]
                                            }
                                            onChange={(e) => {
                                                setIsEnableIconButton({
                                                    ...isEnableIconButton,
                                                    tE_I: [e.target.checked],
                                                });
                                                if (!e.target.checked) {
                                                    showSectionVariable(false);
                                                }
                                                setParameters({
                                                    type: "switch",
                                                    target: "tE_I",
                                                    switch: e.target.checked,
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
                                                !isEnableIconButton.tE_I[0]
                                            }
                                            cursor="pointer"
                                            icon={<FunctionIcon />}
                                            ml="1rem"
                                            onClick={() => {
                                                showSectionVariable(true);
                                                setDataView(tE_I);
                                            }}
                                        />
                                    </Flex>
                                </FormControl>
                            )}
                        </Flex>
                        <Flex justifyContent="space-between" wrap="wrap">
                            {modelCompartment !== "SEIRHVD" && (
                                <FormControl display="flex" alignItems="center">
                                    <Flex
                                        w="50%"
                                        justifyContent="space-between"
                                    >
                                        rR_S{" "}
                                        <NumberInputVariableDependent
                                            value={rR_S.val}
                                            setValue={setParameters}
                                            nameParams="rR_S"
                                            name="rR_S"
                                            description="Average immunity loss rate"
                                            step={0.01}
                                            min={0.01}
                                            max={0.5}
                                            isDisabled={
                                                isEnableIconButton.rR_S[0]
                                            }
                                            duration={t_end}
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
                                            isChecked={
                                                isEnableIconButton.rR_S[0]
                                            }
                                            onChange={(e) => {
                                                setIsEnableIconButton({
                                                    ...isEnableIconButton,
                                                    rR_S: [e.target.checked],
                                                });
                                                if (!e.target.checked) {
                                                    showSectionVariable(false);
                                                }
                                                setParameters({
                                                    type: "switch",
                                                    target: "rR_S",
                                                    switch: e.target.checked,
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
                                                !isEnableIconButton.rR_S[0]
                                            }
                                            cursor="pointer"
                                            icon={<FunctionIcon />}
                                            ml="1rem"
                                            onClick={() => {
                                                showSectionVariable(true);
                                                setDataView(rR_S);
                                            }}
                                        />
                                    </Flex>
                                </FormControl>
                            )}
                        </Flex>
                        <Box py="0.5rem">
                            {modelCompartment !== "SEIRHVD" && (
                                <NumberInputEpi
                                    value={pI_det}
                                    setValue={setParameters}
                                    nameParams="pI_det"
                                    description="Underreport"
                                    step={0.01}
                                    min={0.01}
                                    max={1}
                                    type="slider"
                                />
                            )}
                        </Box>
                        <Heading as="h3">Parameters by Nodes</Heading>
                        {/* <Accordion allowToggle reduceMotion> */}
                        {/* Map parameters comming soon */}
                        <NodesParams
                            setParameters={setParameters}
                            beta={beta}
                            alpha={alpha}
                            mu={mu}
                            nodes={nodes}
                            duration={t_end}
                            setIsEnableIconButton={setIsEnableIconButton}
                            isEnableIconButton={isEnableIconButton}
                            showSectionVariable={showSectionVariable}
                            setDataView={setDataView}
                            setPositionVDT={setPositionVDT}
                            modelCompartment={modelCompartment}
                            otherParameters={{
                                Beta_v,
                                vac_d,
                                vac_eff,
                                pE_Im,
                                tE_Im,
                                pE_Icr,
                                tE_Icr,
                                tEv_Iv,
                                tIm_R,
                                tIcr_H,
                                pIv_R,
                                tIv_R,
                                pIv_H,
                                tIv_H,
                                pH_R,
                                tH_R,
                                pH_D,
                                tH_D,
                                pR_S,
                                tR_S,
                            }}
                        />
                        {/* {nodes.map((node, i) => (
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
                                        <Flex
                                            justifyContent="space-between"
                                            wrap="wrap"
                                        >
                                            <FormControl
                                                display="flex"
                                                alignItems="center"
                                            >
                                                <Flex
                                                    w="50%"
                                                    justifyContent="space-between"
                                                >
                                                    Beta (β){" "}
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
                                                        isDisabled={
                                                            isEnableIconButton
                                                                .beta[i]
                                                        }
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
                                                        isChecked={
                                                            isEnableIconButton
                                                                .beta[i]
                                                        }
                                                        onChange={(e) => {
                                                            const subPermission: boolean[] =
                                                                isEnableIconButton.beta;
                                                            subPermission[i] =
                                                                e.target.checked;
                                                            setIsEnableIconButton(
                                                                {
                                                                    ...isEnableIconButton,
                                                                    beta: subPermission,
                                                                }
                                                            );
                                                            if (
                                                                !e.target
                                                                    .checked
                                                            ) {
                                                                showSectionVariable(
                                                                    false
                                                                );
                                                            }
                                                            setParameters({
                                                                type: "switch",
                                                                target: "beta",
                                                                switch: e.target
                                                                    .checked,
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
                                                            !isEnableIconButton
                                                                .beta[i]
                                                        }
                                                        cursor="pointer"
                                                        icon={<FunctionIcon />}
                                                        ml="1rem"
                                                        onClick={() => {
                                                            showSectionVariable(
                                                                true
                                                            );
                                                            setDataView(
                                                                beta[i]
                                                            );
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
                                            />
                                        </Box>

                                        <Box py="0.5rem">
                                            {modelCompartment === "SEIRHVD" && (
                                                <SeirhvdController
                                                    showSectionVariable={
                                                        showSectionVariable
                                                    }
                                                    idNode={i}
                                                    setDataView={setDataView}
                                                    isEnableIconButton={
                                                        isEnableIconButton
                                                    }
                                                    setIsEnableIconButton={
                                                        setIsEnableIconButton
                                                    }
                                                />
                                            )}
                                        </Box>
                                        <Flex
                                            justifyContent="space-between"
                                            wrap="wrap"
                                        >
                                            <FormControl
                                                display="flex"
                                                alignItems="center"
                                            >
                                                <Flex
                                                    w="50%"
                                                    justifyContent="space-between"
                                                >
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
                                                        isDisabled={
                                                            isEnableIconButton
                                                                .alpha[i]
                                                        }
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
                                                        isChecked={
                                                            isEnableIconButton
                                                                .alpha[i]
                                                        }
                                                        onChange={(e) => {
                                                            const subPermission: boolean[] =
                                                                isEnableIconButton.alpha;
                                                            subPermission[i] =
                                                                e.target.checked;
                                                            setIsEnableIconButton(
                                                                {
                                                                    ...isEnableIconButton,
                                                                    alpha: subPermission,
                                                                }
                                                            );
                                                            if (
                                                                !e.target
                                                                    .checked
                                                            ) {
                                                                showSectionVariable(
                                                                    false
                                                                );
                                                            }
                                                            setParameters({
                                                                type: "switch",
                                                                target: "alpha",
                                                                switch: e.target
                                                                    .checked,
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
                                                            !isEnableIconButton
                                                                .alpha[i]
                                                        }
                                                        cursor="pointer"
                                                        icon={<FunctionIcon />}
                                                        ml="1rem"
                                                        onClick={() => {
                                                            showSectionVariable(
                                                                true
                                                            );
                                                            setDataView(
                                                                alpha[i]
                                                            );
                                                            setPositionVDT(i);
                                                        }}
                                                    />
                                                </Flex>
                                            </FormControl>
                                        </Flex>
                                    </AccordionPanel>
                                </AccordionItem>
                            ))} */}
                        {/* </Accordion> */}
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </Box>
    );
};

export default ModelController;
