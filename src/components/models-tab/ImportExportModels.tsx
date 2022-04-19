/* eslint-disable no-nested-ternary */
/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable complexity */
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
import { SelectFeature } from "context/SelectFeaturesContext";
import { SimulationSetted } from "context/SimulationContext";
import { DataParameters } from "types/ModelsTypes";
import { Action } from "types/SelectFeaturesTypes";
import {
    InitialConditions,
    ActionsSimulationData,
    OptionFeature,
} from "types/SimulationTypes";
import { EpicConfigToml } from "types/TomlTypes";
import addInLocalStorage from "utils/addInLocalStorage";
import convertFiles, { TypeFile } from "utils/convertFiles";
import createChunkDependentTime, {
    cleanInitialConditions,
    prepareChunk,
    TomlInitialConditions,
} from "utils/createChunkDependentTime";

import SeirhbdChunkImport from "./SeirhvdChunkImport";

export const ImportModel = () => {
    const { setParameters } = useContext(ModelsSaved);
    const { setSimulation } = useContext(SimulationSetted);
    const { setGeoSelections } = useContext(SelectFeature);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    return (
        <>
            <Tooltip label="Upload a model from TOML file config">
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
                                accept="application/toml"
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
                                            // import data raw like JSON
                                            const importedData: EpicConfigToml =
                                                convertFiles(
                                                    est.target.result,
                                                    TypeFile.JSON
                                                ) as unknown as EpicConfigToml;
                                            // transform parameters, initial conditions, date simulation
                                            // geographical entities for adding to diferents react context
                                            const parameters = {
                                                ...importedData.parameters
                                                    .dynamic,
                                                ...importedData.parameters
                                                    .static,
                                                ...importedData.model,
                                                title: importedData.title,
                                            };
                                            const initialConditions: InitialConditions =
                                                cleanInitialConditions(
                                                    importedData.initialconditions as TomlInitialConditions
                                                );
                                            const dateSim =
                                                importedData.data.initdate.includes(
                                                    "-"
                                                )
                                                    ? importedData.data.initdate.replaceAll(
                                                          "-",
                                                          "/"
                                                      )
                                                    : importedData.data
                                                          .initdate;
                                            const geographData =
                                                importedData.data;
                                            const idModel = Date.now();
                                            const idSim = Date.now();
                                            const idGeo = Date.now();
                                            const modelForAdd: DataParameters =
                                                {
                                                    id: idModel,
                                                    parameters:
                                                        prepareChunk(
                                                            parameters
                                                        ),
                                                };
                                            const geoForAdd: Action = {
                                                type: "addGeoSelection",
                                                geoPayload: {
                                                    id: idGeo,
                                                    name:
                                                        geographData.loc_name
                                                            .length > 0
                                                            ? geographData.loc_name
                                                            : "Imported from TOML",
                                                    scale:
                                                        (geographData.state
                                                            .length > 0
                                                            ? "States"
                                                            : geographData
                                                                  .county
                                                                  .length > 0
                                                            ? "Counties"
                                                            : "") ?? "",
                                                    featureSelected:
                                                        geographData.state
                                                            .length > 0
                                                            ? typeof geographData.state ===
                                                              "string"
                                                                ? Array.of(
                                                                      geographData.state
                                                                  )
                                                                : Array.from(
                                                                      geographData.state
                                                                  )
                                                            : geographData
                                                                  .county
                                                                  .length > 0
                                                            ? typeof geographData.county ===
                                                              "string"
                                                                ? Array.of(
                                                                      geographData.county
                                                                  )
                                                                : Array.from(
                                                                      geographData.county
                                                                  )
                                                            : [],
                                                },
                                            };

                                            const simForAdd: ActionsSimulationData =
                                                {
                                                    type: "add",
                                                    payload: {
                                                        name: importedData.title,
                                                        idSim,
                                                        idModel,
                                                        idGeo:
                                                            !geographData.state ||
                                                            !geographData.county ||
                                                            !geographData.country
                                                                ? idGeo
                                                                : 0,
                                                        idGraph:
                                                            geographData.state
                                                                .length === 0 &&
                                                            geographData.county
                                                                .length === 0
                                                                ? 1
                                                                : 0,
                                                        typeSelection:
                                                            geographData.state
                                                                .length === 0 &&
                                                            geographData.county
                                                                .length === 0
                                                                ? OptionFeature.Graph
                                                                : OptionFeature.Geographic,
                                                        initialConditions,
                                                        t_init: `${new Intl.DateTimeFormat(
                                                            "en-US"
                                                        ).format(
                                                            dateSim
                                                                ? new Date(
                                                                      dateSim
                                                                  )
                                                                : Date.now()
                                                        )}`,
                                                    },
                                                };
                                            // add spatial entities
                                            if (
                                                geoForAdd.geoPayload.scale
                                                    .length > 0
                                            ) {
                                                setGeoSelections(geoForAdd);
                                            }
                                            // add simulation
                                            setSimulation(simForAdd);
                                            setParameters({
                                                type: "add",
                                                payload: modelForAdd,
                                            });
                                            addInLocalStorage(
                                                [modelForAdd],
                                                "models"
                                            );
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
