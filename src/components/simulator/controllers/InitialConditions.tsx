/* eslint-disable complexity */
/* eslint-disable @typescript-eslint/naming-convention */
import { InfoIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    useToast,
    Flex,
    Text,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    Icon,
} from "@chakra-ui/react";
import React, { useContext, useState, useEffect, useCallback } from "react";

import NumberInputEpi from "../../NumberInputEpi";
import { ControlPanel } from "context/ControlPanelContext";
import { ModelsSaved } from "context/ModelsContext";
import { SelectFeature } from "context/SelectFeaturesContext";
import { SimulationSetted } from "context/SimulationContext";
import { InitialConditions as InitialConditionsContext } from "types/ControlPanelTypes";
import { DataParameters } from "types/ModelsTypes";
import { SimulatorParams } from "types/SimulationTypes";
import createIdComponent from "utils/createIdcomponent";

interface Props {
    idModel: number;
    idSimulation: number;
    intialConditionsSim: InitialConditionsContext;
    initialConditionsMode: boolean;
    setInitialConditionsMode: (val: boolean) => void;
}

const InitialConditions = ({
    idModel: idModelSelected,
    idSimulation,
    intialConditionsSim,
    initialConditionsMode,
    setInitialConditionsMode,
}: Props) => {
    const RealConditions = "real-conditions";
    const toast = useToast();
    const { setInitialConditions, initialConditions } =
        useContext(ControlPanel);

    const {
        simulation,
        setSimulation,
        idSimulationUpdating,
        setIdSimulationUpdating,
    } = useContext(SimulationSetted);
    const { parameters } = useContext(ModelsSaved);
    const [models, setModels] = useState(false);
    const [modelName, setModelName] = useState("SEIR");
    const {
        S,
        R,
        I,
        I_d,
        I_ac,
        E,
        H,
        H_acum,
        V,
        V_acum,
        D,
        D_acum,
        Iv,
        Iv_d,
        Iv_ac,
        H_d,
        D_d,
        H_cap,
    } = initialConditions;
    const { idModel } =
        simulation.find(
            ({ idSim }: SimulatorParams) => idSim === idSimulationUpdating
        ) ?? {};
    useEffect(() => {
        if (idModelSelected !== 0) {
            const getIdModel = simulation.find(
                ({ idSim }: SimulatorParams) => idSim === idSimulation
            );

            const getModelById = parameters.find(
                (m: DataParameters) => m.id === getIdModel.idModel
            )?.parameters;
            setModelName(getModelById?.name);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [idModelSelected, idModel]);

    useEffect(() => {
        if (initialConditionsMode) {
            setInitialConditions({
                type: RealConditions,
                real: intialConditionsSim,
            });
        }
        if (
            typeof window !== "undefined" &&
            window.localStorage.getItem("models") &&
            idModel
        ) {
            const dataLocalStorageModel = JSON.parse(
                window.localStorage.getItem("models")
            );
            const {
                parameters: { name },
            } = dataLocalStorageModel.find((dl) => dl.id === idModel);
            if (name === "SEIR" || name === "SEIRHVD") setModels(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [idModel, idSimulation, intialConditionsSim, modelName]);
    return (
        <Flex direction="column">
            <Flex m="2% 1%" flexWrap="wrap">
                {!initialConditionsMode && idModelSelected !== 0 && (
                    <Flex wrap="wrap">
                        <Box w="25%">
                            <Stat>
                                <StatLabel>S</StatLabel>
                                <StatNumber fontSize="xl">
                                    {new Intl.NumberFormat().format(
                                        intialConditionsSim.S
                                    )}
                                </StatNumber>
                                <StatHelpText>Population</StatHelpText>
                            </Stat>
                        </Box>
                        <Box w="25%">
                            <Stat>
                                <StatLabel>R</StatLabel>
                                <StatNumber fontSize="xl">
                                    {new Intl.NumberFormat().format(
                                        intialConditionsSim.R
                                    )}
                                </StatNumber>
                                <StatHelpText>Removed</StatHelpText>
                            </Stat>
                        </Box>
                        <Box w="25%">
                            <Stat>
                                <StatLabel>I</StatLabel>
                                <StatNumber fontSize="xl">
                                    {new Intl.NumberFormat().format(
                                        intialConditionsSim.I
                                    )}
                                </StatNumber>
                                <StatHelpText>Infected actives</StatHelpText>
                            </Stat>
                        </Box>
                        <Box w="25%">
                            <Stat>
                                <StatLabel>I_d</StatLabel>
                                <StatNumber fontSize="xl">
                                    {new Intl.NumberFormat().format(
                                        intialConditionsSim.I_d
                                    )}
                                </StatNumber>
                                <StatHelpText>Infected daily</StatHelpText>
                            </Stat>
                        </Box>
                        <Box w="25%">
                            <Stat>
                                <StatLabel>I_ac</StatLabel>
                                <StatNumber fontSize="xl">
                                    {new Intl.NumberFormat().format(
                                        intialConditionsSim.I_ac
                                    )}
                                </StatNumber>
                                <StatHelpText>
                                    Infected accumulated
                                </StatHelpText>
                            </Stat>
                        </Box>
                        {modelName !== "SIR" && (
                            <Box w="25%">
                                <Stat>
                                    <StatLabel>E</StatLabel>
                                    <StatNumber fontSize="xl">
                                        {new Intl.NumberFormat().format(
                                            intialConditionsSim.E
                                        )}
                                    </StatNumber>
                                    <StatHelpText>Exposed </StatHelpText>
                                </Stat>
                            </Box>
                        )}
                        {modelName === "SEIRHVD" && (
                            <>
                                <Box w="25%">
                                    <Stat>
                                        <StatLabel>Iv</StatLabel>
                                        <StatNumber fontSize="xl">
                                            {new Intl.NumberFormat().format(
                                                intialConditionsSim.Iv
                                            )}
                                        </StatNumber>
                                        <StatHelpText>
                                            Vaccinated Inffected
                                        </StatHelpText>
                                    </Stat>
                                </Box>
                                <Box w="25%">
                                    <Stat>
                                        <StatLabel>Iv_d</StatLabel>
                                        <StatNumber fontSize="xl">
                                            {new Intl.NumberFormat().format(
                                                intialConditionsSim.V
                                            )}
                                        </StatNumber>
                                        <StatHelpText>
                                            Daily new Vaccinated Infected
                                        </StatHelpText>
                                    </Stat>
                                </Box>
                                <Box w="25%">
                                    <Stat>
                                        <StatLabel>Iv_ac</StatLabel>
                                        <StatNumber fontSize="xl">
                                            {new Intl.NumberFormat().format(
                                                intialConditionsSim.V_acum
                                            )}
                                        </StatNumber>
                                        <StatHelpText>
                                            Accumulated Vaccinated Infected
                                        </StatHelpText>
                                    </Stat>
                                </Box>
                                <Box w="25%">
                                    <Stat>
                                        <StatLabel>H_cap</StatLabel>
                                        <StatNumber fontSize="xl">
                                            {new Intl.NumberFormat().format(
                                                intialConditionsSim.H_cap
                                            )}
                                        </StatNumber>
                                        <StatHelpText>
                                            Hospitalization Capacity
                                        </StatHelpText>
                                    </Stat>
                                </Box>
                                <Box w="25%">
                                    <Stat>
                                        <StatLabel>H_d</StatLabel>
                                        <StatNumber fontSize="xl">
                                            {new Intl.NumberFormat().format(
                                                intialConditionsSim.H_d
                                            )}
                                        </StatNumber>
                                        <StatHelpText>
                                            Daily new Hospitalized
                                        </StatHelpText>
                                    </Stat>
                                </Box>
                                <Box w="25%">
                                    <Stat>
                                        <StatLabel>H</StatLabel>
                                        <StatNumber fontSize="xl">
                                            {new Intl.NumberFormat().format(
                                                intialConditionsSim.H_acum
                                            )}
                                        </StatNumber>
                                        <StatHelpText>
                                            Hospitalized
                                        </StatHelpText>
                                    </Stat>
                                </Box>
                                <Box w="25%">
                                    <Stat>
                                        <StatLabel>D_d</StatLabel>
                                        <StatNumber fontSize="xl">
                                            {new Intl.NumberFormat().format(
                                                intialConditionsSim.D
                                            )}
                                        </StatNumber>
                                        <StatHelpText>
                                            Daily new Deaths
                                        </StatHelpText>
                                    </Stat>
                                </Box>
                                <Box w="25%">
                                    <Stat>
                                        <StatLabel>D</StatLabel>
                                        <StatNumber fontSize="xl">
                                            {new Intl.NumberFormat().format(
                                                intialConditionsSim.D
                                            )}
                                        </StatNumber>
                                        <StatHelpText>Deaths</StatHelpText>
                                    </Stat>
                                </Box>
                            </>
                        )}
                    </Flex>
                )}
                {initialConditionsMode && idModelSelected !== 0 && (
                    <>
                        <Box mr="5%">
                            <NumberInputEpi
                                value={S}
                                setValue={setInitialConditions}
                                nameParams="S"
                                description="Total population"
                                min={0}
                                max={Infinity}
                                isInitialParameters
                                type="number"
                            />
                        </Box>
                        <Box>
                            <NumberInputEpi
                                value={R}
                                setValue={setInitialConditions}
                                nameParams="R"
                                description="Recovered"
                                min={0}
                                max={Infinity}
                                isInitialParameters
                                type="number"
                            />
                        </Box>
                        <Box id={createIdComponent()}>
                            <NumberInputEpi
                                value={I}
                                setValue={setInitialConditions}
                                nameParams="I"
                                description="Active infected"
                                min={0}
                                max={Infinity}
                                isInitialParameters
                                type="number"
                            />
                        </Box>
                        <Box id={createIdComponent()}>
                            <NumberInputEpi
                                value={I_d}
                                setValue={setInitialConditions}
                                nameParams="I_d"
                                description="New daily infected"
                                min={0}
                                max={Infinity}
                                isInitialParameters
                                type="number"
                            />
                        </Box>
                        <Box id={createIdComponent()}>
                            <NumberInputEpi
                                value={I_ac}
                                setValue={setInitialConditions}
                                nameParams="I_ac"
                                description="Accumulated infected"
                                min={0}
                                max={Infinity}
                                isInitialParameters
                                type="number"
                            />
                        </Box>
                        {modelName !== "SIR" && (
                            <Box id={createIdComponent()}>
                                <NumberInputEpi
                                    value={E}
                                    setValue={setInitialConditions}
                                    nameParams="E"
                                    description="Exposed"
                                    min={0}
                                    max={Infinity}
                                    isInitialParameters
                                    type="number"
                                />
                            </Box>
                        )}
                        {modelName === "SEIRHVD" && (
                            <>
                                <Box id={createIdComponent()}>
                                    <NumberInputEpi
                                        value={Iv}
                                        setValue={setInitialConditions}
                                        nameParams="Iv"
                                        description="Iv"
                                        min={0}
                                        max={Infinity}
                                        isInitialParameters
                                        type="number"
                                    />
                                </Box>
                                <Box id={createIdComponent()}>
                                    <NumberInputEpi
                                        value={V ?? 0}
                                        setValue={setInitialConditions}
                                        nameParams="V"
                                        name="Iv_d"
                                        description="Iv_d"
                                        min={0}
                                        max={Infinity}
                                        isInitialParameters
                                        type="number"
                                    />
                                </Box>
                                <Box id={createIdComponent()}>
                                    <NumberInputEpi
                                        value={V_acum ?? 0}
                                        setValue={setInitialConditions}
                                        name="Iv_ac"
                                        nameParams="V_acum"
                                        description="Iv_ac"
                                        min={0}
                                        max={Infinity}
                                        isInitialParameters
                                        type="number"
                                    />
                                </Box>
                                <Box id={createIdComponent()}>
                                    <NumberInputEpi
                                        value={H_cap ?? 0}
                                        setValue={setInitialConditions}
                                        nameParams="H_cap"
                                        description="H_cap"
                                        min={0}
                                        max={Infinity}
                                        isInitialParameters
                                        type="number"
                                    />
                                </Box>
                                <Box id={createIdComponent()}>
                                    <NumberInputEpi
                                        value={H_d ?? 0}
                                        setValue={setInitialConditions}
                                        nameParams="H_d"
                                        description="H_d"
                                        min={0}
                                        max={Infinity}
                                        isInitialParameters
                                        type="number"
                                    />
                                </Box>
                                <Box id={createIdComponent()}>
                                    <NumberInputEpi
                                        value={H_acum}
                                        setValue={setInitialConditions}
                                        nameParams="H_acum"
                                        name="H"
                                        description="H"
                                        min={0}
                                        max={Infinity}
                                        isInitialParameters
                                        type="number"
                                    />
                                </Box>
                                <Box id={createIdComponent()}>
                                    <NumberInputEpi
                                        value={D}
                                        setValue={setInitialConditions}
                                        nameParams="D"
                                        name="D_d"
                                        description="D_d"
                                        min={0}
                                        max={Infinity}
                                        isInitialParameters
                                        type="number"
                                    />
                                </Box>

                                <Box id={createIdComponent()}>
                                    <NumberInputEpi
                                        value={D_acum}
                                        setValue={setInitialConditions}
                                        nameParams="D_acum"
                                        name="D"
                                        description="D"
                                        min={0}
                                        max={Infinity}
                                        isInitialParameters
                                        type="number"
                                    />
                                </Box>
                            </>
                        )}
                    </>
                )}
            </Flex>
            {initialConditionsMode && idModelSelected !== 0 && (
                <Flex justify="center">
                    <Button
                        id={createIdComponent()}
                        mr="10%"
                        colorScheme="teal"
                        onClick={() => {
                            setSimulation({
                                type: "update-initial-conditions",
                                payloadInitialConditions: initialConditions,
                                id: idSimulation,
                            });
                            setIdSimulationUpdating({
                                type: "set",
                                payload: 0,
                            });
                            toast({
                                position: "bottom-left",
                                title: "Updated successful",
                                description:
                                    "Updating Initial conditions was successful",
                                status: "success",
                                duration: 3000,
                                isClosable: true,
                            });
                            setInitialConditionsMode(false);
                        }}
                    >
                        Update
                    </Button>
                    <Button
                        id={createIdComponent()}
                        ml="0.5rem"
                        colorScheme="gray"
                        onClick={() => {
                            setIdSimulationUpdating({
                                type: "set",
                                payload: 0,
                            });
                            setInitialConditionsMode(false);
                        }}
                    >
                        Cancel
                    </Button>
                </Flex>
            )}
            {idModelSelected === 0 && (
                <Flex
                    bg="#e7e7e7"
                    h="200px"
                    borderRadius="6px"
                    justify="center"
                    align="center"
                    mb="2%"
                    boxShadow="sm"
                >
                    <Icon color="#666666" as={InfoIcon} />
                    <Text color="#666666" ml="2%">
                        There is not model selected.
                    </Text>
                </Flex>
            )}
        </Flex>
    );
};

export default InitialConditions;
