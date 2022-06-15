/* eslint-disable @typescript-eslint/naming-convention */
import { EditIcon } from "@chakra-ui/icons";
import {
    Box,
    Text,
    Flex,
    IconButton,
    Switch,
    FormControl,
    Heading,
    AccordionItem,
    AccordionButton,
    AccordionIcon,
    AccordionPanel,
} from "@chakra-ui/react";
import { useContext, useState } from "react";

import NumberInputEpi from "../NumberInputEpi";
import FunctionIcon from "components/icons/FunctionIcon";
import NumberInputVariableDependent from "components/NumberInputVariableDependent";
import { ControlPanel } from "context/ControlPanelContext";
import VariableDependentTime, {
    NameFunction,
} from "types/VariableDependentTime";

import NodesParams from "./NodesParams";

interface Props {
    showSectionVariable: (values: boolean) => void;
    setShowSectionInitialConditions: (value: boolean) => void;
    setDataView: (values: VariableDependentTime) => void;
    setPositionVDT: (value: number) => void;
    nodes?: string[];
    modelCompartment?: string;
}

const ModelController = ({
    showSectionVariable,
    setShowSectionInitialConditions,
    setDataView,
    setPositionVDT,
    modelCompartment,
    nodes,
}: Props) => {
    const {
        setParameters: setParams,
        parameters: {
            t_end,
            pI_det,
            rR_S,
            tE_I,
            tI_R,
            population,
            populationfraction,
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
        description,
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
        <AccordionItem isFocusable>
            <h2>
                <AccordionButton
                    color="#16609E"
                    border="none"
                    borderBottom="2px solid #16609E"
                    _focus={{ boxShadow: "none" }}
                >
                    <Box flex="1" textAlign="left">
                        Parameters
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
            </h2>
            <AccordionPanel pb={4} bg="#FFFFFF">
                <Heading as="h3" fontSize="14px">
                    Commons parameters
                </Heading>
                <Flex justifyContent="space-between" wrap="wrap">
                    <FormControl display="flex" alignItems="center">
                        <Flex w="50%" h="2rem" alignItems="center">
                            <NumberInputEpi
                                value={t_end}
                                nameParams="t_end"
                                name="Duration"
                                description="Duration days"
                                min={0}
                                step={1}
                                max={Infinity}
                                isInitialParameters
                                type="number"
                                isStateLocal
                            />
                        </Flex>
                    </FormControl>
                </Flex>
                <Flex justifyContent="space-between" wrap="wrap">
                    {modelCompartment !== "SEIRHVD" && (
                        <FormControl display="flex" alignItems="center">
                            <Flex w="50%" justifyContent="space-between">
                                <NumberInputVariableDependent
                                    value={tI_R.val}
                                    nameParams="tI_R"
                                    name={description.tI_R.alias}
                                    description={description.tI_R.description}
                                    step={description.tI_R.values.step}
                                    min={description.tI_R.values.min}
                                    max={description.tI_R.values.max}
                                    isDisabled={isEnableIconButton.tI_R[0]}
                                    duration={t_end}
                                    isStateLocal
                                />
                            </Flex>
                            <Flex
                                alignItems="center"
                                w="50%"
                                justifyContent="flex-end"
                            >
                                <Text fontSize="11px">Set function</Text>
                                <Switch
                                    ml="0.5rem"
                                    isChecked={isEnableIconButton.tI_R[0]}
                                    onChange={(e) => {
                                        setIsEnableIconButton({
                                            ...isEnableIconButton,
                                            tI_R: [e.target.checked],
                                        });
                                        if (!e.target.checked) {
                                            showSectionVariable(false);
                                        }
                                        setParams({
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
                                    isDisabled={!isEnableIconButton.tI_R[0]}
                                    cursor="pointer"
                                    icon={<FunctionIcon />}
                                    ml="1rem"
                                    onClick={() => {
                                        setShowSectionInitialConditions(false);
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
                            <Flex w="50%" justifyContent="space-between">
                                <NumberInputVariableDependent
                                    value={tE_I.val}
                                    nameParams="tE_I"
                                    name={description.tE_I.alias}
                                    description={description.tE_I.description}
                                    step={description.tE_I.values.step}
                                    min={description.tE_I.values.min}
                                    max={description.tE_I.values.max}
                                    isDisabled={isEnableIconButton.tE_I[0]}
                                    duration={t_end}
                                    isStateLocal
                                />
                            </Flex>
                            <Flex
                                alignItems="center"
                                w="50%"
                                justifyContent="flex-end"
                            >
                                <Text fontSize="11px">Set function</Text>
                                <Switch
                                    ml="0.5rem"
                                    isChecked={isEnableIconButton.tE_I[0]}
                                    onChange={(e) => {
                                        setIsEnableIconButton({
                                            ...isEnableIconButton,
                                            tE_I: [e.target.checked],
                                        });
                                        if (!e.target.checked) {
                                            showSectionVariable(false);
                                        }
                                        setParams({
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
                                    isDisabled={!isEnableIconButton.tE_I[0]}
                                    cursor="pointer"
                                    icon={<FunctionIcon />}
                                    ml="1rem"
                                    onClick={() => {
                                        setShowSectionInitialConditions(false);
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
                            <Flex w="50%" alignItems="center">
                                <NumberInputVariableDependent
                                    value={rR_S.val}
                                    nameParams="rR_S"
                                    name={description.rR_S.alias}
                                    description={description.rR_S.description}
                                    step={description.rR_S.values.step}
                                    min={description.rR_S.values.min}
                                    max={description.rR_S.values.max}
                                    isDisabled={isEnableIconButton.rR_S[0]}
                                    duration={t_end}
                                    isStateLocal
                                />
                            </Flex>
                            <Flex
                                alignItems="center"
                                w="50%"
                                justifyContent="flex-end"
                            >
                                <Text fontSize="11px">Set function</Text>
                                <Switch
                                    ml="0.5rem"
                                    isChecked={isEnableIconButton.rR_S[0]}
                                    onChange={(e) => {
                                        setIsEnableIconButton({
                                            ...isEnableIconButton,
                                            rR_S: [e.target.checked],
                                        });
                                        if (!e.target.checked) {
                                            showSectionVariable(false);
                                        }
                                        setParams({
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
                                    isDisabled={!isEnableIconButton.rR_S[0]}
                                    cursor="pointer"
                                    icon={<FunctionIcon />}
                                    ml="1rem"
                                    onClick={() => {
                                        setShowSectionInitialConditions(false);
                                        showSectionVariable(true);
                                        setDataView(rR_S);
                                    }}
                                />
                            </Flex>
                        </FormControl>
                    )}
                </Flex>
                <Flex justifyContent="space-between" wrap="wrap">
                    <FormControl display="flex" alignItems="center">
                        <Flex w="50%" h="2rem" alignItems="center">
                            {modelCompartment !== "SEIRHVD" && (
                                <NumberInputEpi
                                    value={pI_det}
                                    nameParams="pI_det"
                                    name={description.pI_det.alias}
                                    description={description.pI_det.description}
                                    step={description.pI_det.values.step}
                                    min={description.pI_det.values.min}
                                    max={description.pI_det.values.max}
                                    type="number"
                                    isInitialParameters
                                    isStateLocal
                                />
                            )}
                        </Flex>
                    </FormControl>
                </Flex>
                {modelCompartment === "SEIRHVD" && (
                    <Flex justifyContent="space-between" wrap="wrap">
                        <FormControl display="flex" alignItems="center">
                            <Flex w="50%" h="2rem" alignItems="center">
                                <NumberInputEpi
                                    value={populationfraction}
                                    nameParams="populationfraction"
                                    name={description.populationfraction.alias}
                                    description={
                                        description.populationfraction
                                            .description
                                    }
                                    step={
                                        description.populationfraction.values
                                            .step
                                    }
                                    min={
                                        description.populationfraction.values
                                            .min
                                    }
                                    max={
                                        description.populationfraction.values
                                            .max
                                    }
                                    type="number"
                                    isInitialParameters
                                    isStateLocal
                                />
                            </Flex>
                        </FormControl>
                    </Flex>
                )}
                <Heading as="h3" fontSize="14px">
                    Parameters by Nodes
                </Heading>
                {/* <Accordion allowToggle reduceMotion> */}
                <NodesParams
                    beta={beta}
                    alpha={alpha}
                    mu={mu}
                    nodes={nodes}
                    duration={t_end}
                    setIsEnableIconButton={setIsEnableIconButton}
                    isEnableIconButton={isEnableIconButton}
                    showSectionVariable={showSectionVariable}
                    setShowSectionInitialConditions={
                        setShowSectionInitialConditions
                    }
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
            </AccordionPanel>
        </AccordionItem>
    );
};

export default ModelController;
function useEffect(arg0: () => void, arg1: number[]) {
    throw new Error("Function not implemented.");
}
