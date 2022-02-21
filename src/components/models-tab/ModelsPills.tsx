import { AddIcon, EditIcon, DeleteIcon, ViewIcon } from "@chakra-ui/icons";
import {
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Tooltip,
    IconButton,
    Text,
    Heading,
    Flex,
    useToast,
    Box,
} from "@chakra-ui/react";
import { useContext, useState, useEffect } from "react";

import { DataParameters } from "../../types/ModelsTypes";
import ModelBuilder from "components/simulator/ModelBuilder";
import { ControlPanel, initialState } from "context/ControlPanelContext";
import { ModelsSaved } from "context/ModelsContext";
import { EpidemicsData, Model } from "types/ControlPanelTypes";
import VariableDependentTime from "types/VariableDependentTime";
import createIdComponent from "utils/createIdcomponent";

import EpidemiologicSEIR from "./SEIR-model-pill-content/EpidemiologicSEIR";
import EpidemiologicSEIRHVD from "./SEIRHVD-model-pill-content/EpidemiologicSEIRHVD";
import InterventionsSEIRHVD from "./SEIRHVD-model-pill-content/InterventionsSEIRHVD";
import StateTransitionSEIRHVD from "./SEIRHVD-model-pill-content/StateTransitionSEIRHVD";
import SubreportSEIRHVD from "./SEIRHVD-model-pill-content/SubreportSEIRHVD";
import ViewVariableDependentTime from "./ViewVariableDependentTime";

const ModelsPills = () => {
    const toast = useToast();
    const { parameters, setParameters } = useContext(ModelsSaved);
    const {
        parameters: params,
        setParameters: setParams,
        setMode,
        setIdModelUpdate,
    } = useContext(ControlPanel);
    const [idModel, setIdModel] = useState<number>(0);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [showViewVariable, setShowViewVariable] = useState<boolean>(false);
    const [dataViewVariable, setDataViewVariable] = useState<
        VariableDependentTime | Record<string, never>
    >({});
    const [tabIndex, setTabIndex] = useState<number>(0);
    const deleteModel = (name: string) => {
        // localStorage.removeItem("models");
        const modelDataFilter = parameters.filter(
            (model: DataParameters) => model.id !== +name
        );
        localStorage.setItem("models", JSON.stringify(modelDataFilter));
        setParameters({ type: "remove", element: `${name}` });
    };
    const updateModel = (id: number, dataForUpdate: EpidemicsData) => {
        setMode(Model.Update);
        setIdModelUpdate(id);
        setParams({ type: "update", updateData: dataForUpdate });
    };
    useEffect(() => {
        if (parameters.length > 0) {
            setIdModel(parameters[parameters.length - 1].id);
            setTabIndex(parameters.length - 1);
        } else {
            setIdModel(0);
            setTabIndex(0);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [parameters.length]);
    return (
        <>
            {parameters.length > 0 ? (
                <Tabs
                    display="flex"
                    index={tabIndex}
                    mt="1%"
                    h="88vh"
                    mh="88vh"
                    onChange={(e) => {
                        if (isEditing) {
                            setMode(Model.Add);
                            setIsEditing(false);
                            setIdModelUpdate(0);
                            toast({
                                position: "bottom-left",
                                title: "Mode Edition was stopped",
                                description: "Your model wasn't updated",
                                status: "warning",
                                duration: 2000,
                                isClosable: true,
                            });
                        }
                        setShowViewVariable(false);
                        setTabIndex(e);
                        setIdModel(parameters[e].id);
                    }}
                >
                    <Box>
                        <Flex maxH="82vh" overflowY="auto">
                            <TabList display="flex" flexDirection="column">
                                {parameters.map(
                                    ({
                                        parameters: ParametersModels,
                                        id,
                                    }: DataParameters) => (
                                        <Tab
                                            key={createIdComponent()}
                                            _selected={{
                                                color: "white",
                                                bg: "blue.500",
                                            }}
                                            onClick={() => {
                                                setIdModel(id);
                                                setIsEditing(true);
                                            }}
                                        >
                                            <p>{ParametersModels.name_model}</p>
                                        </Tab>
                                    )
                                )}
                            </TabList>
                        </Flex>
                        <Tooltip label="Create Model">
                            <IconButton
                                bg="#16609E"
                                color="#FFFFFF"
                                aria-label="Call Segun"
                                size="sm"
                                w="100%"
                                mt="1%"
                                isDisabled={isEditing}
                                cursor="pointer"
                                _hover={{ bg: "blue.500" }}
                                icon={<AddIcon />}
                                onClick={() => {
                                    if (!isEditing) {
                                        const idNew = Date.now();
                                        setParameters({
                                            type: "add",
                                            payload: {
                                                id: idNew,
                                                parameters: initialState,
                                            },
                                        });
                                        localStorage.setItem(
                                            "models",
                                            JSON.stringify([
                                                ...parameters,
                                                {
                                                    id: idNew,
                                                    parameters: initialState,
                                                },
                                            ])
                                        );
                                        setIdModel(idNew);
                                        setIsEditing(true);
                                        updateModel(idNew, initialState);
                                    }
                                }}
                            />
                        </Tooltip>
                    </Box>
                    <TabPanels minWidth="30vw" display="flex">
                        {!isEditing &&
                            parameters.map(
                                ({
                                    parameters: ParametersModels,
                                    id,
                                }: DataParameters) => (
                                    <TabPanel
                                        key={createIdComponent()}
                                        w="60%"
                                        borderRadius="6px"
                                        ml="2%"
                                        boxShadow="sm"
                                        bg="#FAFAFA"
                                        overflowY="auto"
                                    >
                                        <>
                                            <Heading fontSize={24} as="h2">
                                                {ParametersModels.name_model}
                                            </Heading>
                                            <Text>
                                                Model: {ParametersModels.name}
                                            </Text>
                                            <Heading
                                                pt="1rem"
                                                fontSize={24}
                                                as="h3"
                                            >
                                                Models parameters
                                            </Heading>
                                            <Text>
                                                Duration:{" "}
                                                {ParametersModels.t_end}{" "}
                                                {ParametersModels.t_end === 1
                                                    ? "day"
                                                    : "days."}
                                            </Text>
                                            <Text>
                                                Beta (β):{" "}
                                                {ParametersModels.beta
                                                    .isEnabled ? (
                                                    <IconButton
                                                        color="#16609E"
                                                        aria-label="Call Segun"
                                                        size="sm"
                                                        cursor="pointer"
                                                        icon={<ViewIcon />}
                                                        onClick={() => {
                                                            setDataViewVariable(
                                                                ParametersModels.beta
                                                            );
                                                            setShowViewVariable(
                                                                true
                                                            );
                                                        }}
                                                    />
                                                ) : (
                                                    ParametersModels.beta.val
                                                )}
                                            </Text>
                                            <Text>
                                                Mu (μ): {ParametersModels.mu}
                                            </Text>
                                            {ParametersModels.name !==
                                                "SEIRHVD" && (
                                                <EpidemiologicSEIR
                                                    ParametersModels={
                                                        ParametersModels
                                                    }
                                                    setDataViewVariable={
                                                        setDataViewVariable
                                                    }
                                                    setShowViewVariable={
                                                        setShowViewVariable
                                                    }
                                                />
                                            )}
                                            {ParametersModels.name ===
                                                "SEIRHVD" && (
                                                <EpidemiologicSEIRHVD
                                                    ParametersModels={
                                                        ParametersModels
                                                    }
                                                    setDataViewVariable={
                                                        setDataViewVariable
                                                    }
                                                    setShowViewVariable={
                                                        setShowViewVariable
                                                    }
                                                />
                                            )}
                                            <Heading
                                                pt="1rem"
                                                fontSize={24}
                                                as="h3"
                                            >
                                                Interventions parameters
                                            </Heading>
                                            <Text>
                                                Alpha (α):{" "}
                                                {ParametersModels.alpha
                                                    .isEnabled ? (
                                                    <IconButton
                                                        color="#16609E"
                                                        aria-label="Call Segun"
                                                        size="sm"
                                                        cursor="pointer"
                                                        icon={<ViewIcon />}
                                                        onClick={() => {
                                                            setDataViewVariable(
                                                                ParametersModels.alpha
                                                            );
                                                            setShowViewVariable(
                                                                true
                                                            );
                                                        }}
                                                    />
                                                ) : (
                                                    ParametersModels.alpha.val
                                                )}
                                            </Text>
                                            {ParametersModels.name ===
                                                "SEIRHVD" && (
                                                <InterventionsSEIRHVD
                                                    ParametersModels={
                                                        ParametersModels
                                                    }
                                                    setDataViewVariable={
                                                        setDataViewVariable
                                                    }
                                                    setShowViewVariable={
                                                        setShowViewVariable
                                                    }
                                                />
                                            )}
                                            {ParametersModels.name ===
                                                "SEIRHVD" && (
                                                <StateTransitionSEIRHVD
                                                    ParametersModels={
                                                        ParametersModels
                                                    }
                                                    setDataViewVariable={
                                                        setDataViewVariable
                                                    }
                                                    setShowViewVariable={
                                                        setShowViewVariable
                                                    }
                                                />
                                            )}
                                            {ParametersModels.name ===
                                                "SEIRHVD" && (
                                                <SubreportSEIRHVD
                                                    ParametersModels={
                                                        ParametersModels
                                                    }
                                                    setDataViewVariable={
                                                        setDataViewVariable
                                                    }
                                                    setShowViewVariable={
                                                        setShowViewVariable
                                                    }
                                                />
                                            )}
                                        </>
                                    </TabPanel>
                                )
                            )}
                        {isEditing && (
                            <ModelBuilder
                                isEditing={isEditing}
                                setIsEditing={setIsEditing}
                            />
                        )}
                        {!isEditing && (
                            <>
                                <Flex direction="column">
                                    <IconButton
                                        color="#16609E"
                                        aria-label="Call Segun"
                                        size="sm"
                                        cursor="pointer"
                                        isDisabled={isEditing}
                                        _hover={{
                                            bg: "blue.500",
                                            color: "#ffffff",
                                        }}
                                        icon={<EditIcon />}
                                        onClick={() => {
                                            if (!isEditing) {
                                                setIsEditing(true);
                                                updateModel(
                                                    idModel,
                                                    parameters.find(
                                                        (e: DataParameters) =>
                                                            e.id === idModel
                                                    ).parameters
                                                );
                                                setShowViewVariable(false);
                                            }
                                        }}
                                    />
                                    <IconButton
                                        color="#16609E"
                                        aria-label="Call Segun"
                                        size="sm"
                                        cursor="pointer"
                                        _hover={{
                                            bg: "blue.500",
                                            color: "#ffffff",
                                        }}
                                        icon={<DeleteIcon />}
                                        isDisabled={isEditing}
                                        onClick={() => {
                                            if (!isEditing) {
                                                deleteModel(`${idModel}`);
                                                setShowViewVariable(false);
                                            }
                                        }}
                                    />
                                </Flex>
                                <Flex w="100%" justifyContent="end">
                                    {showViewVariable && (
                                        <ViewVariableDependentTime
                                            close={setShowViewVariable}
                                            data={dataViewVariable}
                                        />
                                    )}
                                </Flex>
                            </>
                        )}
                    </TabPanels>
                </Tabs>
            ) : (
                <Tabs>
                    <Tooltip label="Create Model">
                        <IconButton
                            bg="#16609E"
                            color="#FFFFFF"
                            aria-label="Call Segun"
                            size="sm"
                            cursor="pointer"
                            isDisabled={isEditing}
                            _hover={{ bg: "blue.500" }}
                            icon={<AddIcon />}
                            onClick={() => {
                                if (!isEditing) {
                                    const idM = Date.now();
                                    setParameters({
                                        type: "add",
                                        payload: {
                                            id: idM,
                                            parameters: initialState,
                                        },
                                    });
                                    localStorage.setItem(
                                        "models",
                                        JSON.stringify([
                                            ...parameters,
                                            {
                                                id: idM,
                                                parameters: initialState,
                                            },
                                        ])
                                    );
                                    setIdModel(idM);
                                    updateModel(idM, initialState);
                                    setIsEditing(true);
                                }
                            }}
                        />
                    </Tooltip>
                </Tabs>
            )}
        </>
    );
};

export default ModelsPills;
