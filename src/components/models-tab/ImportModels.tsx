/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable complexity */
/* eslint-disable no-nested-ternary */
import { AttachmentIcon } from "@chakra-ui/icons";
import {
    useDisclosure,
    useToast,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Center,
    Tooltip,
    IconButton,
} from "@chakra-ui/react";
import _ from "lodash";
import { useContext } from "react";

import {
    COUNTYCODES,
    COUNTYNAMES,
    REGEXTYPEMODEL,
    STATECODES,
    STATENAMES,
} from "constants/verifyAttrTomlConstants";
import { NewModelSetted } from "context/NewModelsContext";
import { SelectFeature } from "context/SelectFeaturesContext";
import { InitialConditions } from "types/ControlPanelTypes";
import { DataParameters } from "types/ModelsTypes";
import { Action } from "types/SelectFeaturesTypes";
import {
    ActionsSimulationData,
    NewModelsAllParams,
    OptionFeature,
} from "types/SimulationTypes";
import { EpicConfigToml } from "types/TomlTypes";
import addInLocalStorage from "utils/addInLocalStorage";
import convertFiles, { TypeFile } from "utils/convertFiles";
import {
    cleanInitialConditions,
    TomlInitialConditions,
    prepareChunk,
    // TomlInitialConditions,
} from "utils/createChunkDependentTime";
import verifyAttrTomlRight from "utils/verifyAttrTomlRight";
import verifyTomlTypesAttr from "utils/verifyTomlTypesAttr";

const position = "bottom-left";

const ImportModels = () => {
    const { setGeoSelections } = useContext(SelectFeature);
    const { setCompleteModel, setNewModel } = useContext(NewModelSetted);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    return (
        <>
            <Tooltip label="Upload a simulation from TOML file config">
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
                                            try {
                                                const importedData: EpicConfigToml =
                                                    convertFiles(
                                                        est.target.result,
                                                        TypeFile.JSON
                                                    ) as unknown as EpicConfigToml;
                                                verifyAttrTomlRight(
                                                    importedData
                                                );
                                                verifyTomlTypesAttr(
                                                    importedData
                                                );
                                                // transform parameters, initial conditions, date simulation
                                                // geographical entities for adding to diferents react context
                                                const {
                                                    compartments,
                                                    name,
                                                    model,
                                                } = importedData.model;
                                                const parameters = {
                                                    ...importedData.parameters
                                                        .dynamic,
                                                    ...importedData.parameters
                                                        .static,
                                                    compartments,
                                                    name_model: name,
                                                    name: model.match(
                                                        REGEXTYPEMODEL
                                                    )[0],
                                                };
                                                // const initialConditions: InitialConditions =
                                                //     cleanInitialConditions(
                                                //         importedData.initialconditions as TomlInitialConditions
                                                //     );
                                                // console.log(initialConditions);
                                                const formattedDay =
                                                    importedData.data.initdate.includes(
                                                        "-"
                                                    )
                                                        ? importedData.data.initdate.replaceAll(
                                                              "-",
                                                              "/"
                                                          )
                                                        : importedData.data
                                                              .initdate;
                                                // date can't be newer than 2021/12/31
                                                const maxDateSim = new Date(
                                                    "2022/05/31"
                                                );
                                                const dateSim =
                                                    maxDateSim >
                                                    new Date(formattedDay)
                                                        ? formattedDay
                                                        : "2022/05/31";
                                                const geographData =
                                                    importedData.data;
                                                const idModel = Date.now();
                                                // const idSim = Date.now();
                                                const idGeo = Date.now();

                                                const geoForAdd: Action = {
                                                    type: "addGeoSelection",
                                                    geoPayload: {
                                                        id: idGeo,
                                                        name:
                                                            geographData
                                                                .loc_name
                                                                .length > 0
                                                                ? geographData.loc_name
                                                                : "Imported from TOML",
                                                        scale:
                                                            (geographData.state
                                                                .length > 0
                                                                ? "States"
                                                                : geographData
                                                                      .county
                                                                      .length >
                                                                  0
                                                                ? "Counties"
                                                                : "") ?? "",
                                                        featureSelected:
                                                            geographData.state
                                                                .length > 0
                                                                ? _.isString(
                                                                      geographData.state
                                                                  )
                                                                    ? Array.of(
                                                                          geographData.state
                                                                      )
                                                                    : Array.from(
                                                                          geographData.state
                                                                      )
                                                                : geographData
                                                                      .county
                                                                      .length >
                                                                  0
                                                                ? _.isString(
                                                                      geographData.county
                                                                  )
                                                                    ? Array.of(
                                                                          geographData.county
                                                                      )
                                                                    : Array.from(
                                                                          geographData.county
                                                                      )
                                                                : [],
                                                    },
                                                };
                                                const getGeoNames = (
                                                    cod: string | string[],
                                                    scales: string
                                                ) => {
                                                    const newCod = _.isString(
                                                        cod
                                                    )
                                                        ? [cod]
                                                        : cod;
                                                    return newCod.map(
                                                        (spatialCode, i) => {
                                                            if (
                                                                scales ===
                                                                "States"
                                                            ) {
                                                                const stateIndex =
                                                                    STATECODES.findIndex(
                                                                        (
                                                                            id
                                                                        ) => {
                                                                            return (
                                                                                id ===
                                                                                spatialCode
                                                                            );
                                                                        }
                                                                    );
                                                                return STATENAMES[
                                                                    stateIndex
                                                                ];
                                                            }
                                                            if (
                                                                scales ===
                                                                "Counties"
                                                            ) {
                                                                const countiesIndex =
                                                                    COUNTYCODES.findIndex(
                                                                        (id) =>
                                                                            id ===
                                                                            spatialCode
                                                                    );
                                                                return COUNTYNAMES[
                                                                    countiesIndex
                                                                ];
                                                            }
                                                            return `${i}`;
                                                        }
                                                    );
                                                };
                                                const initialCond = getGeoNames(
                                                    geoForAdd.geoPayload
                                                        .featureSelected,
                                                    geoForAdd.geoPayload.scale
                                                ).map((cod, i) => {
                                                    return {
                                                        name: cod,
                                                        conditionsValues:
                                                            Object.entries(
                                                                importedData.initialconditions
                                                            ).reduce(
                                                                (acc, curr) => {
                                                                    return {
                                                                        ...acc,
                                                                        [curr[0]]:
                                                                            _.isArray(
                                                                                curr[1]
                                                                            )
                                                                                ? curr[1][
                                                                                      i
                                                                                  ]
                                                                                : curr[1],
                                                                    };
                                                                },
                                                                {}
                                                            ),
                                                    };
                                                });
                                                const modelForAdd = {
                                                    idNewModel: idModel,
                                                    name,
                                                    modelType:
                                                        model.match(
                                                            REGEXTYPEMODEL
                                                        )[0],
                                                    idGeo,
                                                    t_init: parameters.t_init,
                                                    populationType: `${importedData.data.geo_topology}population`,
                                                    idGraph: 0,
                                                    initialConditions:
                                                        initialCond,
                                                    numberNodes:
                                                        initialCond.length,
                                                    typeSelection:
                                                        importedData.data.state
                                                            .length === 0 &&
                                                        importedData.data.county
                                                            .length === 0
                                                            ? "graph"
                                                            : "geographic",
                                                };
                                                setNewModel({
                                                    type: "add",
                                                    payload: modelForAdd,
                                                });
                                                setCompleteModel({
                                                    type: "add",
                                                    payload: {
                                                        ...modelForAdd,
                                                        parameters:
                                                            prepareChunk(
                                                                parameters
                                                            ),
                                                    },
                                                });

                                                // const simForAdd: ActionsSimulationData =
                                                //     {
                                                //         type: "add",
                                                //         payload: {
                                                //             name: importedData.title,
                                                //             idSim,
                                                //             idModel,
                                                //             idGeo:
                                                //                 !geographData.state ||
                                                //                 !geographData.county ||
                                                //                 !geographData.country
                                                //                     ? idGeo
                                                //                     : 0,
                                                //             idGraph:
                                                //                 geographData
                                                //                     .state
                                                //                     .length ===
                                                //                     0 &&
                                                //                 geographData
                                                //                     .county
                                                //                     .length ===
                                                //                     0
                                                //                     ? 1
                                                //                     : 0,
                                                //             typeSelection:
                                                //                 geographData
                                                //                     .state
                                                //                     .length ===
                                                //                     0 &&
                                                //                 geographData
                                                //                     .county
                                                //                     .length ===
                                                //                     0
                                                //                     ? OptionFeature.Graph
                                                //                     : OptionFeature.Geographic,
                                                //             initialConditions,
                                                //             t_init: `${new Intl.DateTimeFormat(
                                                //                 "en-US"
                                                //             ).format(
                                                //                 dateSim
                                                //                     ? new Date(
                                                //                           dateSim
                                                //                       )
                                                //                     : Date.now()
                                                //             )}`,
                                                //         },
                                                //     };
                                                //  add spatial entities
                                                // if (
                                                //     geoForAdd.geoPayload.scale
                                                //         .length > 0
                                                // ) {
                                                setGeoSelections(geoForAdd);
                                                //     addInLocalStorage(
                                                //         [geoForAdd.geoPayload],
                                                //         "geoSelection"
                                                //     );
                                                // }
                                                // // add simulation
                                                // setSimulation(simForAdd);
                                                // addInLocalStorage(
                                                //     [simForAdd.payload],
                                                //     "simulations"
                                                // );
                                                // setParameters({
                                                //     type: "add",
                                                //     payload: modelForAdd,
                                                // });
                                                // addInLocalStorage(
                                                //     [modelForAdd],
                                                //     "models"
                                                // );
                                                onClose();
                                                toast({
                                                    position,
                                                    title: "Models imported",
                                                    description:
                                                        "Models was imported successfully",
                                                    status: "success",
                                                    duration: 5000,
                                                    isClosable: true,
                                                });
                                            } catch (error) {
                                                toast({
                                                    position,
                                                    title: "Error",
                                                    description: `Uploading simulation failed. Check your TOML config and try later \n ${error}`,
                                                    status: "error",
                                                    duration: 5000,
                                                    isClosable: true,
                                                });
                                            }
                                        };
                                        reader.onerror = (err) => {
                                            toast({
                                                position,
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
                                            position,
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

export default ImportModels;
