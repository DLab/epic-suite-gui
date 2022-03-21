import { DownloadIcon, AttachmentIcon } from "@chakra-ui/icons";
import {
    Button,
    Center,
    IconButton,
    Link,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Popover,
    PopoverBody,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    Tooltip,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import { useContext } from "react";

import { ModelsSaved } from "context/ModelsContext";
import { DataParameters } from "types/ModelsTypes";
import addInLocalStorage from "utils/addInLocalStorage";
import convertFiles, { TypeFile } from "utils/convertFiles";
import SeirhbdChunkImport from "./SeirhvdChunkImport";

export const ImportModel = () => {
    const { setParameters } = useContext(ModelsSaved);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    return (
        <>
            <Tooltip label="Upload a model from JSON file">
                <IconButton
                    bg="#FFFFFF"
                    color="#16609E"
                    aria-label="Call Segun"
                    size="sm"
                    cursor="pointer"
                    icon={<AttachmentIcon />}
                    onClick={onOpen}
                />
            </Tooltip>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Upload a file</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Center>
                            <input
                                type="file"
                                accept="Application/JSON"
                                onChange={(e) => {
                                    if (
                                        window.File &&
                                        window.FileReader &&
                                        window.FileList &&
                                        window.Blob
                                    ) {
                                        const reader = new FileReader();
                                        reader.readAsText(
                                            e.target.files[0],
                                            "UTF-8"
                                        );
                                        reader.onload = (est) => {
                                            const models = JSON.parse(
                                                JSON.parse(
                                                    JSON.stringify(
                                                        est.target.result
                                                    )
                                                )
                                            );
                                            models.forEach((mod) => {
                                                if (
                                                    mod.parameters.name ===
                                                    "SEIRHVD"
                                                ) {
                                                    setParameters({
                                                        type: "add",
                                                        payload: mod,
                                                    });
                                                } else {
                                                    setParameters({
                                                        type: "add",
                                                        payload: {
                                                            ...mod,
                                                            parameters: {
                                                                ...mod.parameters,
                                                                ...SeirhbdChunkImport,
                                                            },
                                                        },
                                                    });
                                                }
                                            });
                                            addInLocalStorage(models, "models");
                                            onClose();
                                            toast({
                                                title: "Models imported",
                                                description:
                                                    "Models was imported successfully",
                                                status: "success",
                                                duration: 5000,
                                                isClosable: true,
                                            });
                                        };
                                        reader.onerror = (err) => {
                                            toast({
                                                title: "Error",
                                                description:
                                                    "Occurs an error during import process",
                                                status: "error",
                                                duration: 5000,
                                                isClosable: true,
                                            });
                                        };
                                    } else {
                                        toast({
                                            title: "Doesn't supported API",
                                            description:
                                                "The File APIs are not fully supported by your browser.",
                                            status: "error",
                                            duration: 5000,
                                            isClosable: true,
                                        });
                                    }
                                }}
                            />
                        </Center>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export const ExportModels = () => {
    const { parameters } = useContext(ModelsSaved);
    const cleanModelForDownload = (data: DataParameters[] | []): unknown => {
        const propsByTypeModel = {
            SEIR: ["tE_I"],
            common: [
                "name_model",
                "name",
                "compartments",
                "t_init",
                "t_end",
                "beta",
                "mu",

                "alpha",
                "tI_R",
                "pI_det",
                "rR_S",
            ],
        };
        return data.map((d) => {
            if (d.parameters.name === "SEIRHVD") {
                return d;
            }
            const newData = [
                ...propsByTypeModel.SEIR,
                ...propsByTypeModel.common,
            ].reduce(
                (prev, current) => {
                    return {
                        ...prev,
                        parameters: {
                            ...prev.parameters,
                            [current]: d.parameters[current],
                        },
                    };
                },
                { id: d.id, parameters: {} }
            );
            if (d.parameters.name === "SIR") {
                // eslint-disable-next-line @typescript-eslint/dot-notation
                delete newData.parameters["tE_I"];
            }
            return newData;
        });
    };
    return (
        <>
            <Popover placement="right">
                <Tooltip label="Download saved models">
                    <PopoverTrigger>
                        <IconButton
                            bg="#16609E"
                            color="#FFFFFF"
                            aria-label="Call Segun"
                            size="sm"
                            cursor="pointer"
                            _hover={{ bg: "blue.500" }}
                            icon={<DownloadIcon />}
                        />
                    </PopoverTrigger>
                </Tooltip>
                <PopoverContent>
                    <PopoverHeader pt={4} fontWeight="bold" border="0">
                        Choose a format file!
                    </PopoverHeader>
                    <PopoverBody>
                        <Link
                            download="models.json"
                            href={`data:text/json;charset=utf-8,${encodeURIComponent(
                                JSON.stringify(
                                    cleanModelForDownload(parameters)
                                )
                            )}`}
                        >
                            to JSON
                        </Link>
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </>
    );
};
