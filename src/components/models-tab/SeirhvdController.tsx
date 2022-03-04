/* eslint-disable @typescript-eslint/naming-convention */
import { Flex, IconButton, Switch, FormControl } from "@chakra-ui/react";
import React, { useContext } from "react";

import FunctionIcon from "components/icons/FunctionIcon";
import NumberInputEpi from "components/NumberInputEpi";
import NumberInputVariableDependent from "components/NumberInputVariableDependent";
import PEImNumberInput from "components/PEImNumberInput";
import PhdPhrNumberInput from "components/PhdPhrNumberInput";
import PIvRPIvHNumberInput from "components/PIvRPIvHNumberInput";
import { ControlPanel } from "context/ControlPanelContext";
import VariableDependentTime from "types/VariableDependentTime";

type Props = {
    showSectionVariable: (values: boolean) => void;
    setDataView: (values: VariableDependentTime) => void;
    isEnableIconButton: boolean[];
    setIsEnableIconButton: (values: boolean[]) => void;
};

const SeirhvdController = ({
    showSectionVariable,
    setDataView,
    isEnableIconButton,
    setIsEnableIconButton,
}: Props) => {
    const {
        setParameters,
        parameters: {
            population,
            populationfraction,
            Beta_v,
            pIcr_det,
            pIm_det,
            pIv_det,
            vac_d,
            vac_eff,
            tE_Im,
            tE_Icr,
            tEv_Iv,
            tIm_R,
            tIcr_H,
            tIv_R,
            tIv_H,
            tH_R,
            tH_D,
            pR_S,
            tR_S,
        },
    } = useContext(ControlPanel);

    return (
        <>
            <FormControl display="flex" alignItems="center">
                <Flex w="50%" justifyContent="space-between">
                    <span>Beta_v</span>
                    <NumberInputVariableDependent
                        value={Beta_v.val}
                        setValue={setParameters}
                        nameParams="Beta_v"
                        name="Beta_v (α)"
                        description="Vaccinated infected Infection rate"
                        step={0.01}
                        min={0}
                        max={1}
                        isDisabled={isEnableIconButton[5]}
                    />
                </Flex>
                <Flex alignItems="center" w="50%" justifyContent="flex-end">
                    <span>Set function</span>
                    <Switch
                        ml="0.5rem"
                        isChecked={isEnableIconButton[5]}
                        onChange={(e) => {
                            setIsEnableIconButton([
                                ...isEnableIconButton.slice(0, 5),
                                e.target.checked,
                                ...isEnableIconButton.slice(6),
                            ]);
                            if (!e.target.checked) {
                                showSectionVariable(false);
                            }
                            setParameters({
                                type: "switch",
                                target: "Beta_v",
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
                        isDisabled={!isEnableIconButton[5]}
                        cursor="pointer"
                        icon={<FunctionIcon />}
                        ml="1rem"
                        onClick={() => {
                            showSectionVariable(true);
                            setDataView(Beta_v);
                        }}
                    />
                </Flex>
            </FormControl>
            <NumberInputEpi
                value={population}
                setValue={setParameters}
                nameParams="population"
                name="population"
                description="Population at the beginning of the simulation"
                step={1}
                max={Infinity}
                min={1}
                isInitialParameters
                type="number"
            />
            <NumberInputEpi
                value={populationfraction}
                setValue={setParameters}
                nameParams="populationfraction"
                name="populationfraction"
                description="Fraction of the total population that take part on the dynamic at the beginning"
                step={0.01}
                min={0}
                max={1}
                type="slider"
            />
            <PEImNumberInput
                showSectionVariable={showSectionVariable}
                setDataView={setDataView}
                isEnableIconButton={isEnableIconButton}
                setIsEnableIconButton={setIsEnableIconButton}
            />
            <FormControl display="flex" alignItems="center">
                <Flex w="50%" justifyContent="space-between">
                    <span>tE_Im</span>
                    <NumberInputVariableDependent
                        value={tE_Im.val}
                        setValue={setParameters}
                        nameParams="tE_Im"
                        name="tE_Im"
                        description="Transition time between E and Imm"
                        step={1}
                        min={0.01}
                        isDisabled={isEnableIconButton[10]}
                    />
                </Flex>
                <Flex alignItems="center" w="50%" justifyContent="flex-end">
                    <span>Set function</span>
                    <Switch
                        ml="0.5rem"
                        isChecked={isEnableIconButton[10]}
                        onChange={(e) => {
                            setIsEnableIconButton([
                                ...isEnableIconButton.slice(0, 10),
                                e.target.checked,
                                ...isEnableIconButton.slice(11),
                            ]);
                            if (!e.target.checked) {
                                showSectionVariable(false);
                            }
                            setParameters({
                                type: "switch",
                                target: "tE_Im",
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
                        isDisabled={!isEnableIconButton[10]}
                        cursor="pointer"
                        icon={<FunctionIcon />}
                        ml="1rem"
                        onClick={() => {
                            showSectionVariable(true);
                            setDataView(tE_Im);
                        }}
                    />
                </Flex>
            </FormControl>
            <FormControl display="flex" alignItems="center">
                <Flex w="50%" justifyContent="space-between">
                    <span>tE_Icr</span>
                    <NumberInputVariableDependent
                        value={tE_Icr.val}
                        setValue={setParameters}
                        nameParams="tE_Icr"
                        name="tE_Icr"
                        description="Transition time between E and Icr"
                        step={1}
                        min={0.01}
                        isDisabled={isEnableIconButton[12]}
                    />
                </Flex>
                <Flex alignItems="center" w="50%" justifyContent="flex-end">
                    <span>Set function</span>
                    <Switch
                        ml="0.5rem"
                        isChecked={isEnableIconButton[12]}
                        onChange={(e) => {
                            setIsEnableIconButton([
                                ...isEnableIconButton.slice(0, 12),
                                e.target.checked,
                                ...isEnableIconButton.slice(13),
                            ]);
                            if (!e.target.checked) {
                                showSectionVariable(false);
                            }
                            setParameters({
                                type: "switch",
                                target: "tE_Icr",
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
                        isDisabled={!isEnableIconButton[12]}
                        cursor="pointer"
                        icon={<FunctionIcon />}
                        ml="1rem"
                        onClick={() => {
                            showSectionVariable(true);
                            setDataView(tE_Icr);
                        }}
                    />
                </Flex>
            </FormControl>
            <FormControl display="flex" alignItems="center">
                <Flex w="50%" justifyContent="space-between">
                    <span>tEv_Iv</span>
                    <NumberInputVariableDependent
                        value={tEv_Iv.val}
                        setValue={setParameters}
                        nameParams="tEv_Iv"
                        name="tEv_Iv"
                        description="Transition time between Ev and Iv"
                        step={1}
                        min={0.01}
                        isDisabled={isEnableIconButton[13]}
                    />
                </Flex>
                <Flex alignItems="center" w="50%" justifyContent="flex-end">
                    <span>Set function</span>
                    <Switch
                        ml="0.5rem"
                        isChecked={isEnableIconButton[13]}
                        onChange={(e) => {
                            setIsEnableIconButton([
                                ...isEnableIconButton.slice(0, 13),
                                e.target.checked,
                                ...isEnableIconButton.slice(14),
                            ]);
                            if (!e.target.checked) {
                                showSectionVariable(false);
                            }
                            setParameters({
                                type: "switch",
                                target: "tEv_Iv",
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
                        isDisabled={!isEnableIconButton[13]}
                        cursor="pointer"
                        icon={<FunctionIcon />}
                        ml="1rem"
                        onClick={() => {
                            showSectionVariable(true);
                            setDataView(tEv_Iv);
                        }}
                    />
                </Flex>
            </FormControl>
            <FormControl display="flex" alignItems="center">
                <Flex w="50%" justifyContent="space-between">
                    <span>tIm_R</span>
                    <NumberInputVariableDependent
                        value={tIm_R.val}
                        setValue={setParameters}
                        nameParams="tIm_R"
                        name="tIm_R"
                        description="Transition time between Im and R"
                        step={1}
                        min={0.01}
                        isDisabled={isEnableIconButton[14]}
                    />
                </Flex>
                <Flex alignItems="center" w="50%" justifyContent="flex-end">
                    <span>Set function</span>
                    <Switch
                        ml="0.5rem"
                        isChecked={isEnableIconButton[14]}
                        onChange={(e) => {
                            setIsEnableIconButton([
                                ...isEnableIconButton.slice(0, 14),
                                e.target.checked,
                                ...isEnableIconButton.slice(15),
                            ]);
                            if (!e.target.checked) {
                                showSectionVariable(false);
                            }
                            setParameters({
                                type: "switch",
                                target: "tIm_R",
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
                        isDisabled={!isEnableIconButton[14]}
                        cursor="pointer"
                        icon={<FunctionIcon />}
                        ml="1rem"
                        onClick={() => {
                            showSectionVariable(true);
                            setDataView(tIm_R);
                        }}
                    />
                </Flex>
            </FormControl>
            <FormControl display="flex" alignItems="center">
                <Flex w="50%" justifyContent="space-between">
                    <span>tIcr_H</span>
                    <NumberInputVariableDependent
                        value={tIcr_H.val}
                        setValue={setParameters}
                        nameParams="tIcr_H"
                        name="tIcr_H"
                        description="Transition time between Icr and H"
                        step={1}
                        min={0.01}
                        isDisabled={isEnableIconButton[15]}
                    />
                </Flex>
                <Flex alignItems="center" w="50%" justifyContent="flex-end">
                    <span>Set function</span>
                    <Switch
                        ml="0.5rem"
                        isChecked={isEnableIconButton[15]}
                        onChange={(e) => {
                            setIsEnableIconButton([
                                ...isEnableIconButton.slice(0, 15),
                                e.target.checked,
                                ...isEnableIconButton.slice(16),
                            ]);
                            if (!e.target.checked) {
                                showSectionVariable(false);
                            }
                            setParameters({
                                type: "switch",
                                target: "tIcr_H",
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
                        isDisabled={!isEnableIconButton[15]}
                        cursor="pointer"
                        icon={<FunctionIcon />}
                        ml="1rem"
                        onClick={() => {
                            showSectionVariable(true);
                            setDataView(tIcr_H);
                        }}
                    />
                </Flex>
            </FormControl>
            <PIvRPIvHNumberInput
                showSectionVariable={showSectionVariable}
                setDataView={setDataView}
                isEnableIconButton={isEnableIconButton}
                setIsEnableIconButton={setIsEnableIconButton}
            />

            <FormControl display="flex" alignItems="center">
                <Flex w="50%" justifyContent="space-between">
                    <span>tIv_R</span>
                    <NumberInputVariableDependent
                        value={tIv_R.val}
                        setValue={setParameters}
                        nameParams="tIv_R"
                        name="tIv_R"
                        description="Transition time between Iv and R"
                        step={1}
                        min={0.01}
                        isDisabled={isEnableIconButton[17]}
                    />
                </Flex>
                <Flex alignItems="center" w="50%" justifyContent="flex-end">
                    <span>Set function</span>
                    <Switch
                        ml="0.5rem"
                        isChecked={isEnableIconButton[17]}
                        onChange={(e) => {
                            setIsEnableIconButton([
                                ...isEnableIconButton.slice(0, 17),
                                e.target.checked,
                            ]);
                            if (!e.target.checked) {
                                showSectionVariable(false);
                            }
                            setParameters({
                                type: "switch",
                                target: "tIv_R",
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
                        isDisabled={!isEnableIconButton[17]}
                        cursor="pointer"
                        icon={<FunctionIcon />}
                        ml="1rem"
                        onClick={() => {
                            showSectionVariable(true);
                            setDataView(tIv_R);
                        }}
                    />
                </Flex>
            </FormControl>
            <FormControl display="flex" alignItems="center">
                <Flex w="50%" justifyContent="space-between">
                    <span>tIv_H</span>
                    <NumberInputVariableDependent
                        value={tIv_H.val}
                        setValue={setParameters}
                        nameParams="tIv_H"
                        name="tIv_H"
                        description="Transition time between Iv and H"
                        step={1}
                        min={0.01}
                        isDisabled={isEnableIconButton[19]}
                    />
                </Flex>
                <Flex alignItems="center" w="50%" justifyContent="flex-end">
                    <span>Set function</span>
                    <Switch
                        ml="0.5rem"
                        isChecked={isEnableIconButton[19]}
                        onChange={(e) => {
                            setIsEnableIconButton([
                                ...isEnableIconButton.slice(0, 19),
                                e.target.checked,
                                ...isEnableIconButton.slice(20),
                            ]);
                            if (!e.target.checked) {
                                showSectionVariable(false);
                            }
                            setParameters({
                                type: "switch",
                                target: "tIv_H",
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
                        isDisabled={!isEnableIconButton[19]}
                        cursor="pointer"
                        icon={<FunctionIcon />}
                        ml="1rem"
                        onClick={() => {
                            showSectionVariable(true);
                            setDataView(tIv_H);
                        }}
                    />
                </Flex>
            </FormControl>
            <PhdPhrNumberInput
                showSectionVariable={showSectionVariable}
                setDataView={setDataView}
                isEnableIconButton={isEnableIconButton}
                setIsEnableIconButton={setIsEnableIconButton}
            />
            <FormControl display="flex" alignItems="center">
                <Flex w="50%" justifyContent="space-between">
                    <span>tH_R</span>
                    <NumberInputVariableDependent
                        value={tH_R.val}
                        setValue={setParameters}
                        nameParams="tH_R"
                        name="tH_R"
                        description="Transition time between H and R"
                        step={1}
                        min={0.01}
                        isDisabled={isEnableIconButton[21]}
                    />
                </Flex>
                <Flex alignItems="center" w="50%" justifyContent="flex-end">
                    <span>Set function</span>
                    <Switch
                        ml="0.5rem"
                        isChecked={isEnableIconButton[21]}
                        onChange={(e) => {
                            setIsEnableIconButton([
                                ...isEnableIconButton.slice(0, 21),
                                e.target.checked,
                                ...isEnableIconButton.slice(22),
                            ]);
                            if (!e.target.checked) {
                                showSectionVariable(false);
                            }
                            setParameters({
                                type: "switch",
                                target: "tH_R",
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
                        isDisabled={!isEnableIconButton[21]}
                        cursor="pointer"
                        icon={<FunctionIcon />}
                        ml="1rem"
                        onClick={() => {
                            showSectionVariable(true);
                            setDataView(tH_R);
                        }}
                    />
                </Flex>
            </FormControl>
            <FormControl display="flex" alignItems="center">
                <Flex w="50%" justifyContent="space-between">
                    <span>tH_D</span>
                    <NumberInputVariableDependent
                        value={tH_D.val}
                        setValue={setParameters}
                        nameParams="tH_D"
                        name="tH_D"
                        description="Transition time between H and D"
                        step={1}
                        min={0.01}
                        // max={1}
                        isDisabled={isEnableIconButton[23]}
                    />
                </Flex>
                <Flex alignItems="center" w="50%" justifyContent="flex-end">
                    <span>Set function</span>
                    <Switch
                        ml="0.5rem"
                        isChecked={isEnableIconButton[23]}
                        onChange={(e) => {
                            setIsEnableIconButton([
                                ...isEnableIconButton.slice(0, 23),
                                e.target.checked,
                                ...isEnableIconButton.slice(24),
                            ]);
                            if (!e.target.checked) {
                                showSectionVariable(false);
                            }
                            setParameters({
                                type: "switch",
                                target: "tH_D",
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
                        isDisabled={!isEnableIconButton[23]}
                        cursor="pointer"
                        icon={<FunctionIcon />}
                        ml="1rem"
                        onClick={() => {
                            showSectionVariable(true);
                            setDataView(tH_D);
                        }}
                    />
                </Flex>
            </FormControl>
            <FormControl display="flex" alignItems="center">
                <Flex w="50%" justifyContent="space-between">
                    <span>pR_S</span>
                    <NumberInputVariableDependent
                        value={pR_S.val}
                        setValue={setParameters}
                        nameParams="pR_S"
                        name="pR_S"
                        description="Existence of immunity loss"
                        step={1}
                        min={0}
                        max={1}
                        isDisabled={isEnableIconButton[24]}
                    />
                </Flex>
                <Flex alignItems="center" w="50%" justifyContent="flex-end">
                    <span>Set function</span>
                    <Switch
                        ml="0.5rem"
                        isChecked={isEnableIconButton[24]}
                        onChange={(e) => {
                            setIsEnableIconButton([
                                ...isEnableIconButton.slice(0, 24),
                                e.target.checked,
                                ...isEnableIconButton.slice(25),
                            ]);
                            if (!e.target.checked) {
                                showSectionVariable(false);
                            }
                            setParameters({
                                type: "switch",
                                target: "pR_S",
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
                        isDisabled={!isEnableIconButton[24]}
                        cursor="pointer"
                        icon={<FunctionIcon />}
                        ml="1rem"
                        onClick={() => {
                            showSectionVariable(true);
                            setDataView(pR_S);
                        }}
                    />
                </Flex>
            </FormControl>
            <FormControl display="flex" alignItems="center">
                <Flex w="50%" justifyContent="space-between">
                    <span>tR_S</span>
                    <NumberInputVariableDependent
                        value={tR_S.val}
                        setValue={setParameters}
                        nameParams="tR_S"
                        name="tR_S"
                        description="Transition time between R and S"
                        step={1}
                        min={0.01}
                        isDisabled={isEnableIconButton[25]}
                    />
                </Flex>
                <Flex alignItems="center" w="50%" justifyContent="flex-end">
                    <span>Set function</span>
                    <Switch
                        ml="0.5rem"
                        isChecked={isEnableIconButton[25]}
                        onChange={(e) => {
                            setIsEnableIconButton([
                                ...isEnableIconButton.slice(0, 25),
                                e.target.checked,
                            ]);
                            if (!e.target.checked) {
                                showSectionVariable(false);
                            }
                            setParameters({
                                type: "switch",
                                target: "tR_S",
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
                        isDisabled={!isEnableIconButton[25]}
                        cursor="pointer"
                        icon={<FunctionIcon />}
                        ml="1rem"
                        onClick={() => {
                            showSectionVariable(true);
                            setDataView(tR_S);
                        }}
                    />
                </Flex>
            </FormControl>
            <NumberInputEpi
                value={pIcr_det}
                setValue={setParameters}
                nameParams="pIcr_det"
                name="pIcr_det"
                description="pIcr_det"
                step={0.05}
                min={0}
                max={1}
                type="slider"
            />
            <NumberInputEpi
                value={pIm_det}
                setValue={setParameters}
                nameParams="pIm_det"
                name="pIm_det"
                description="pIm_det"
                step={0.05}
                min={0}
                max={1}
                type="slider"
            />
            <NumberInputEpi
                value={pIv_det}
                setValue={setParameters}
                nameParams="pIv_det"
                name="pIv_det"
                description="pIv_det"
                step={0.05}
                min={0}
                max={1}
                type="slider"
            />
            <FormControl display="flex" alignItems="center">
                <Flex w="50%" justifyContent="space-between">
                    <span>vac_d</span>
                    <NumberInputVariableDependent
                        value={vac_d.val}
                        setValue={setParameters}
                        nameParams="vac_d"
                        name="vac_d"
                        description="Amount of vaccinated people per day"
                        step={1}
                        min={0}
                        isDisabled={isEnableIconButton[6]}
                    />
                </Flex>
                <Flex alignItems="center" w="50%" justifyContent="flex-end">
                    <span>Set function</span>
                    <Switch
                        ml="0.5rem"
                        isChecked={isEnableIconButton[6]}
                        onChange={(e) => {
                            setIsEnableIconButton([
                                ...isEnableIconButton.slice(0, 6),
                                e.target.checked,
                                ...isEnableIconButton.slice(7),
                            ]);
                            if (!e.target.checked) {
                                showSectionVariable(false);
                            }
                            setParameters({
                                type: "switch",
                                target: "vac_d",
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
                        isDisabled={!isEnableIconButton[6]}
                        cursor="pointer"
                        icon={<FunctionIcon />}
                        ml="1rem"
                        onClick={() => {
                            showSectionVariable(true);
                            setDataView(vac_d);
                        }}
                    />
                </Flex>
            </FormControl>
            <FormControl display="flex" alignItems="center">
                <Flex w="50%" justifyContent="space-between">
                    <span>vac_eff</span>
                    <NumberInputVariableDependent
                        value={vac_eff.val}
                        setValue={setParameters}
                        nameParams="vac_eff"
                        name="vac_eff"
                        description="Vaccine effectivity"
                        step={0.05}
                        min={0}
                        max={1}
                        isDisabled={isEnableIconButton[8]}
                    />
                </Flex>
                <Flex alignItems="center" w="50%" justifyContent="flex-end">
                    <span>Set function</span>
                    <Switch
                        ml="0.5rem"
                        isChecked={isEnableIconButton[8]}
                        onChange={(e) => {
                            setIsEnableIconButton([
                                ...isEnableIconButton.slice(0, 8),
                                e.target.checked,
                                ...isEnableIconButton.slice(9),
                            ]);
                            if (!e.target.checked) {
                                showSectionVariable(false);
                            }
                            setParameters({
                                type: "switch",
                                target: "vac_eff",
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
                        isDisabled={!isEnableIconButton[8]}
                        cursor="pointer"
                        icon={<FunctionIcon />}
                        ml="1rem"
                        onClick={() => {
                            showSectionVariable(true);
                            setDataView(vac_eff);
                        }}
                    />
                </Flex>
            </FormControl>
        </>
    );
};

export default SeirhvdController;
