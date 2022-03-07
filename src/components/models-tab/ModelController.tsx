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
} from "@chakra-ui/react";
import { useContext, useState, useEffect } from "react";

import NumberInputEpi from "../NumberInputEpi";
import FunctionIcon from "components/icons/FunctionIcon";
import NumberInputVariableDependent from "components/NumberInputVariableDependent";
import { ControlPanel } from "context/ControlPanelContext";
import VariableDependentTime from "types/VariableDependentTime";

import SeirhvdController from "./SeirhvdController";

interface Props {
    showSectionVariable: (values: boolean) => void;
    setDataView: (values: VariableDependentTime) => void;
}

const ModelController = ({ showSectionVariable, setDataView }: Props) => {
    const [modelAux, setModelAux] = useState("SEIR");
    const {
        setParameters,
        parameters: {
            t_end,
            name_model,
            name,
            beta,
            pI_det,
            rR_S,
            tE_I,
            tI_R,
            mu,
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
    const [isEnableIconButton, setIsEnableIconButton] = useState([
        beta.isEnabled,
        rR_S.isEnabled,
        tE_I.isEnabled,
        tI_R.isEnabled,
        alpha.isEnabled,
        Beta_v.isEnabled,
        vac_d.isEnabled,
        vac_eff.isEnabled,
        pE_Im.isEnabled,
        tE_Im.isEnabled,
        pE_Icr.isEnabled,
        tE_Icr.isEnabled,
        tEv_Iv.isEnabled,
        tIm_R.isEnabled,
        tIcr_H.isEnabled,
        pIv_R.isEnabled,
        tIv_R.isEnabled,
        pIv_H.isEnabled,
        tIv_H.isEnabled,
        pH_R.isEnabled,
        tH_R.isEnabled,
        pH_D.isEnabled,
        tH_D.isEnabled,
        pR_S.isEnabled,
        tR_S.isEnabled,
    ]);

    useEffect(() => {
        setModelAux(name);
    }, [name]);

    return (
        <Box w="100%">
            <Box>
                <Text flex="1" textAlign="left">
                    Model Name
                </Text>
                <Input
                    size="sm"
                    value={name_model}
                    onChange={(e) => {
                        setParameters({
                            type: "set",
                            target: "name_model",
                            payload: e.target.value,
                        });
                    }}
                />
                <Text flex="1" textAlign="left">
                    Model
                </Text>
                <RadioGroup
                    size="sm"
                    value={modelAux}
                    onChange={(e) => {
                        if (e === "SEIR") {
                            setParameters({
                                type: "set",
                                target: "compartments",
                                payload: ["S", "E", "I", "R"],
                            });
                            setModelAux(e);
                        } else if (e === "SEIRHVD") {
                            setParameters({
                                type: "set",
                                target: "compartments",
                                payload: ["S", "E", "I", "R", "H", "V", "D"],
                            });
                            setModelAux(e);
                        } else {
                            setParameters({
                                type: "set",
                                target: "compartments",
                                payload: ["S", "I", "R"],
                            });
                            setModelAux(e);
                        }
                        setParameters({
                            type: "set",
                            target: "name",
                            payload: e,
                        });
                    }}
                >
                    <Stack direction="row">
                        <Radio value="SEIR">SEIR</Radio>
                        <Radio value="SIR">SIR</Radio>
                        <Radio value="SEIRHVD">SEIRHVD</Radio>
                    </Stack>
                </RadioGroup>
            </Box>
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
                <FormControl display="flex" alignItems="center">
                    <Flex w="50%" justifyContent="space-between">
                        Beta (β){" "}
                        <NumberInputVariableDependent
                            value={beta.val}
                            setValue={setParameters}
                            nameParams="beta"
                            name="Beta (β)"
                            description="Infection rate"
                            step={0.01}
                            min={0.01}
                            max={0.5}
                            isDisabled={isEnableIconButton[0]}
                        />
                    </Flex>
                    <Flex alignItems="center" w="50%" justifyContent="flex-end">
                        <span>Set function</span>
                        <Switch
                            ml="0.5rem"
                            isChecked={isEnableIconButton[0]}
                            onChange={(e) => {
                                setIsEnableIconButton([
                                    e.target.checked,
                                    ...isEnableIconButton.slice(1),
                                ]);
                                if (!e.target.checked) {
                                    showSectionVariable(false);
                                }
                                setParameters({
                                    type: "switch",
                                    target: "beta",
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
                            isDisabled={!isEnableIconButton[0]}
                            cursor="pointer"
                            icon={<FunctionIcon />}
                            ml="1rem"
                            onClick={() => {
                                showSectionVariable(true);
                                setDataView(beta);
                            }}
                        />
                    </Flex>
                </FormControl>
            </Flex>
            <Flex justifyContent="space-between" wrap="wrap">
                {modelAux !== "SEIRHVD" && (
                    <FormControl display="flex" alignItems="center">
                        <Flex w="50%" justifyContent="space-between">
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
                                isDisabled={isEnableIconButton[1]}
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
                                isChecked={isEnableIconButton[1]}
                                onChange={(e) => {
                                    setIsEnableIconButton([
                                        isEnableIconButton[0],
                                        e.target.checked,
                                        ...isEnableIconButton.slice(2),
                                    ]);
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
                                isDisabled={!isEnableIconButton[1]}
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
            <Flex justifyContent="space-between" wrap="wrap">
                {modelAux !== "SEIRHVD" && (
                    <FormControl display="flex" alignItems="center">
                        <Flex w="50%" justifyContent="space-between">
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
                                isDisabled={isEnableIconButton[2]}
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
                                isChecked={isEnableIconButton[2]}
                                onChange={(e) => {
                                    setIsEnableIconButton([
                                        ...isEnableIconButton.slice(0, 2),
                                        e.target.checked,
                                        ...isEnableIconButton.slice(3),
                                    ]);
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
                                isDisabled={!isEnableIconButton[2]}
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
                {modelAux !== "SEIRHVD" && (
                    <FormControl display="flex" alignItems="center">
                        <Flex w="50%" justifyContent="space-between">
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
                                isDisabled={isEnableIconButton[3]}
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
                                isChecked={isEnableIconButton[3]}
                                onChange={(e) => {
                                    setIsEnableIconButton([
                                        ...isEnableIconButton.slice(0, 3),
                                        e.target.checked,
                                        ...isEnableIconButton.slice(4),
                                    ]);
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
                                isDisabled={!isEnableIconButton[3]}
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
            <Box py="0.5rem">
                <NumberInputEpi
                    value={mu}
                    setValue={setParameters}
                    nameParams="mu"
                    name="Mu (μ)"
                    description="Exposed/Infected Initial rate"
                    step={0.01}
                    min={0.01}
                    max={5}
                    type="slider"
                />
            </Box>
            <Box py="0.5rem">
                {modelAux !== "SEIRHVD" && (
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
            <Box py="0.5rem">
                {modelAux === "SEIRHVD" && (
                    <SeirhvdController
                        showSectionVariable={showSectionVariable}
                        setDataView={setDataView}
                        isEnableIconButton={isEnableIconButton}
                        setIsEnableIconButton={setIsEnableIconButton}
                    />
                )}
            </Box>
            <Flex justifyContent="space-between" wrap="wrap">
                <FormControl display="flex" alignItems="center">
                    <Flex w="50%" justifyContent="space-between">
                        <span>Alpha (α)</span>
                        <NumberInputVariableDependent
                            value={alpha.val}
                            setValue={setParameters}
                            nameParams="alpha"
                            name="Alpha (α)"
                            description="Mobility"
                            step={0.01}
                            min={0.01}
                            max={0.5}
                            isDisabled={isEnableIconButton[4]}
                        />
                    </Flex>
                    <Flex alignItems="center" w="50%" justifyContent="flex-end">
                        <span>Set function</span>
                        <Switch
                            ml="0.5rem"
                            isChecked={isEnableIconButton[4]}
                            onChange={(e) => {
                                setIsEnableIconButton([
                                    ...isEnableIconButton.slice(0, 4),
                                    e.target.checked,
                                    ...isEnableIconButton.slice(5),
                                ]);
                                if (!e.target.checked) {
                                    showSectionVariable(false);
                                }
                                setParameters({
                                    type: "switch",
                                    target: "alpha",
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
                            isDisabled={!isEnableIconButton[4]}
                            cursor="pointer"
                            icon={<FunctionIcon />}
                            ml="1rem"
                            onClick={() => {
                                showSectionVariable(true);
                                setDataView(alpha);
                            }}
                        />
                    </Flex>
                </FormControl>
            </Flex>
        </Box>
    );
};

export default ModelController;
