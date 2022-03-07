import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Icon,
    Flex,
    Text,
    Button,
    Tag,
    TagLabel,
    TagLeftIcon,
    TagRightIcon,
    TagCloseButton,
    IconButton,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import DoubleYaxisIcon from "../icons/DoubleYaxisIcon";
import RightArrow from "../icons/RightArrow";
import LeftArrow from "components/icons/LeftArrow";
import { SavedSimulationData } from "types/GraphicsTypes";
import createIdComponent from "utils/createIdcomponent";

interface Props {
    savedKeys?: SavedSimulationData[];
}

const DoubleYAxis = ({ savedKeys }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [leftAxis, setLeftAxis] = useState([]);
    const [rightAxis, setRightAxis] = useState([]);

    useEffect(() => {
        setLeftAxis(savedKeys);
    }, [savedKeys]);

    const getParametersSetted = (axis, name, k) => {
        return axis.map((e) => {
            if (e.name === name) {
                e.keys = [...e.keys, k];
            }
            return e;
        });
    };

    const setAxis = (name, k, axisName) => {
        if (axisName === "right") {
            setRightAxis([...rightAxis, { name, keys: [k] }]);
        } else {
            setLeftAxis([...leftAxis, { name, keys: [k] }]);
        }
    };

    const setParametersToAxis = (axis, name, k, axisName) => {
        if (axis.length === 0) {
            setAxis(name, k, axisName);
        } else {
            const nameSimExists = axis.some((e) => {
                return e.name === name;
            });
            if (nameSimExists) {
                const paramsSetted = getParametersSetted(axis, name, k);
                if (axisName === "right") {
                    setRightAxis(paramsSetted);
                } else {
                    setLeftAxis(paramsSetted);
                }
            } else {
                setAxis(name, k, axisName);
            }
        }
    };

    const deleteParameterFromAxis = (axis, name, k, axisName) => {
        const simByName = axis.filter((param) => {
            return param.name === name;
        });
        const simKeys = simByName[0].keys;
        const simKeysFilter = simKeys.filter((simKey) => {
            return simKey !== k;
        });
        if (axisName === "left") {
            setParametersToAxis(rightAxis, name, k, "right");
        } else {
            setParametersToAxis(leftAxis, name, k, "left");
        }

        let newParamsSim = axis.map((e) => {
            if (e.name === name) {
                e.keys = simKeysFilter;
            }
            return e;
        });

        newParamsSim = newParamsSim.filter((sim) => {
            return sim.keys.length > 0;
        });

        if (axisName === "left") {
            setLeftAxis(newParamsSim);
        } else {
            setRightAxis(newParamsSim);
        }
    };

    let rightAxisAux = rightAxis;
    let leftAxisAux = leftAxis;

    const setAuxAxis = (name, k, axisName) => {
        if (axisName === "right") {
            rightAxisAux = [...rightAxisAux, { name, keys: [k] }];
        } else {
            leftAxisAux = [...leftAxisAux, { name, keys: [k] }];
        }
    };

    const setAllParametersToAxis = (axis, name, k, axisName) => {
        if (axis.length === 0) {
            setAuxAxis(name, k, axisName);
        } else {
            const nameSimExists = axis.some((e) => {
                return e.name === name;
            });
            if (nameSimExists) {
                const paramsSetted = getParametersSetted(axis, name, k);
                if (axisName === "right") {
                    rightAxisAux = paramsSetted;
                } else {
                    leftAxisAux = paramsSetted;
                }
            } else {
                setAuxAxis(name, k, axisName);
            }
        }
    };

    const removeAllParameters = (axis, axisName) => {
        if (axisName === "left") {
            axis.forEach((sim) => {
                return sim.keys.forEach((k) => {
                    return setAllParametersToAxis(
                        rightAxisAux,
                        sim.name,
                        k,
                        "right"
                    );
                });
            });
            setRightAxis(rightAxisAux);
            setLeftAxis([]);
        } else {
            axis.forEach((sim) => {
                return sim.keys.forEach((k) => {
                    return setAllParametersToAxis(
                        leftAxisAux,
                        sim.name,
                        k,
                        "left"
                    );
                });
            });
            setLeftAxis(leftAxisAux);
            setRightAxis([]);
        }
    };

    return (
        <>
            <Icon
                as={DoubleYaxisIcon}
                onClick={onOpen}
                cursor="pointer"
                fontSize="1.4rem"
                key="double-axis-open-icon"
            />
            {savedKeys.map((ks) => {
                return (
                    <Modal
                        isOpen={isOpen}
                        onClose={onClose}
                        size="xl"
                        key={ks.name}
                    >
                        <ModalOverlay />
                        <ModalContent
                            textAlign="center"
                            key="double-axis-content"
                            maxW="70vw"
                            maxH="90vh"
                            h="79vh"
                        >
                            <ModalCloseButton />
                            <ModalBody>
                                <Flex justifyContent="space-around" h="87%">
                                    <Flex direction="column" w="35%" p="2%">
                                        <Flex
                                            alignItems="center"
                                            m="3% 0"
                                            justifyContent="center"
                                        >
                                            <Text m="0 5%">Left Axis</Text>
                                            <IconButton
                                                colorScheme="blue"
                                                aria-label="Search database"
                                                icon={<ArrowRightIcon />}
                                                size="sm"
                                                onClick={() => {
                                                    removeAllParameters(
                                                        leftAxis,
                                                        "left"
                                                    );
                                                }}
                                            />
                                        </Flex>
                                        <Flex
                                            bg="#dcdcdc"
                                            p="3%"
                                            borderRadius="10px"
                                            flexDirection="column"
                                            h="93%"
                                        >
                                            {leftAxis.map((key) => {
                                                const savedKey = key.keys;
                                                const { name } = key;
                                                return savedKey.map((k) => {
                                                    return (
                                                        <Tag
                                                            key={`${k} ${name}`}
                                                            size="lg"
                                                            borderRadius="full"
                                                            variant="solid"
                                                            bg="#16609E"
                                                            justifyContent="space-between"
                                                            m="2% 0"
                                                            cursor="pointer"
                                                            onClick={() => {
                                                                deleteParameterFromAxis(
                                                                    leftAxis,
                                                                    name,
                                                                    k,
                                                                    "left"
                                                                );
                                                            }}
                                                        >
                                                            <TagLabel>
                                                                {`${k} ${name}`}
                                                            </TagLabel>
                                                            <TagRightIcon
                                                                as={RightArrow}
                                                                fontSize="1.3rem"
                                                            />
                                                        </Tag>
                                                    );
                                                });
                                            })}
                                        </Flex>
                                    </Flex>
                                    <Flex direction="column" w="35%" p="2%">
                                        <Flex
                                            alignItems="center"
                                            m="3% 0"
                                            justifyContent="center"
                                        >
                                            <IconButton
                                                colorScheme="blue"
                                                aria-label="Search database"
                                                icon={<ArrowLeftIcon />}
                                                size="sm"
                                                onClick={() => {
                                                    removeAllParameters(
                                                        rightAxis,
                                                        "right"
                                                    );
                                                }}
                                            />
                                            <Text m="0 5%">Right Axis</Text>
                                        </Flex>
                                        <Flex
                                            bg="#dcdcdc"
                                            p="3%"
                                            borderRadius="10px"
                                            flexDirection="column"
                                            h="93%"
                                        >
                                            {rightAxis.map((key) => {
                                                const savedKey = key.keys;
                                                const { name } = key;
                                                return savedKey.map((k) => {
                                                    return (
                                                        <Tag
                                                            key={`${k} ${name}`}
                                                            size="lg"
                                                            borderRadius="full"
                                                            variant="solid"
                                                            bg="#16609E"
                                                            justifyContent="space-between"
                                                            m="2% 0"
                                                            cursor="pointer"
                                                            onClick={() => {
                                                                deleteParameterFromAxis(
                                                                    rightAxis,
                                                                    name,
                                                                    k,
                                                                    "right"
                                                                );
                                                            }}
                                                        >
                                                            <TagRightIcon
                                                                as={LeftArrow}
                                                                fontSize="1.3rem"
                                                            />
                                                            <TagLabel>
                                                                {`${k} ${name}`}
                                                            </TagLabel>
                                                        </Tag>
                                                    );
                                                });
                                            })}
                                        </Flex>
                                    </Flex>
                                </Flex>
                                <Button
                                    colorScheme="teal"
                                    size="sm"
                                    mt="20px"
                                    key={createIdComponent()}
                                >
                                    Set
                                </Button>
                                <Button
                                    colorScheme="teal"
                                    variant="outline"
                                    size="sm"
                                    mt="20px"
                                    ml="20px"
                                    key={createIdComponent()}
                                >
                                    Cancel
                                </Button>
                            </ModalBody>
                        </ModalContent>
                    </Modal>
                );
            })}
        </>
    );
};

export default DoubleYAxis;
