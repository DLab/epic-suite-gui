// import { AttachmentIcon } from "@chakra-ui/icons";
// import {
//     useDisclosure,
//     useToast,
//     Modal,
//     ModalOverlay,
//     ModalContent,
//     ModalHeader,
//     ModalCloseButton,
//     ModalBody,
//     Center,
//     position,
//     Tooltip,
//     IconButton,
// } from "@chakra-ui/react";
// import { useContext } from "react";

// import { SelectFeature } from "context/SelectFeaturesContext";
// import { SimulationSetted } from "context/SimulationContext";
// import { InitialConditions } from "types/ControlPanelTypes";
// import { DataParameters } from "types/ModelsTypes";
// import { Action } from "types/SelectFeaturesTypes";
// import { ActionsSimulationData, OptionFeature } from "types/SimulationTypes";
// import { EpicConfigToml } from "types/TomlTypes";
// import addInLocalStorage from "utils/addInLocalStorage";
// import convertFiles, { TypeFile } from "utils/convertFiles";

// const ImportModels = () => {
//     const { setParameters } = useContext(ModelsSaved);
//     const { setSimulation } = useContext(SimulationSetted);
//     const { setGeoSelections } = useContext(SelectFeature);
//     const { isOpen, onOpen, onClose } = useDisclosure();
//     const toast = useToast();
//     return (
//         <>
//             <Tooltip label="Upload a simulation from TOML file config">
//                 <IconButton
//                     bg="#FFFFFF"
//                     color="#16609E"
//                     aria-label="Call Segun"
//                     size="sm"
//                     cursor="pointer"
//                     icon={<AttachmentIcon />}
//                     onClick={onOpen}
//                 />
//             </Tooltip>
//             <Modal isOpen={isOpen} onClose={onClose} isCentered>
//                 <ModalOverlay />
//                 <ModalContent>
//                     <ModalHeader>Upload a file</ModalHeader>
//                     <ModalCloseButton />
//                     <ModalBody>
//                         <Center>
//                             <input
//                                 type="file"
//                                 accept="application/toml"
//                                 onChange={(e) => {
//                                     if (
//                                         window.File &&
//                                         window.FileReader &&
//                                         window.FileList &&
//                                         window.Blob
//                                     ) {
//                                         const reader = new FileReader();
//                                         reader.readAsText(
//                                             e.target.files[0],
//                                             "UTF-8"
//                                         );
//                                         reader.onload = (est) => {
//                                             // import data raw like JSON
//                                             try {
//                                                 const importedData: EpicConfigToml =
//                                                     convertFiles(
//                                                         est.target.result,
//                                                         TypeFile.JSON
//                                                     ) as unknown as EpicConfigToml;
//                                                 // transform parameters, initial conditions, date simulation
//                                                 // geographical entities for adding to diferents react context
//                                                 const parameters = {
//                                                     ...importedData.parameters
//                                                         .dynamic,
//                                                     ...importedData.parameters
//                                                         .static,
//                                                     ...importedData.model,
//                                                     title: importedData.title,
//                                                 };

//                                                 const initialConditions: InitialConditions =
//                                                     cleanInitialConditions(
//                                                         importedData.initialconditions as TomlInitialConditions
//                                                     );
//                                                 const formattedDay =
//                                                     importedData.data.initdate.includes(
//                                                         "-"
//                                                     )
//                                                         ? importedData.data.initdate.replaceAll(
//                                                               "-",
//                                                               "/"
//                                                           )
//                                                         : importedData.data
//                                                               .initdate;
//                                                 // date can't be newer than 2021/12/31
//                                                 const maxDateSim = new Date(
//                                                     "2021/12/31"
//                                                 );
//                                                 const dateSim =
//                                                     maxDateSim >
//                                                     new Date(formattedDay)
//                                                         ? formattedDay
//                                                         : "2021/12/31";
//                                                 const geographData =
//                                                     importedData.data;
//                                                 const idModel = Date.now();
//                                                 const idSim = Date.now();
//                                                 const idGeo = Date.now();
//                                                 const modelForAdd: DataParameters =
//                                                     {
//                                                         id: idModel,
//                                                         parameters:
//                                                             prepareChunk(
//                                                                 parameters
//                                                             ),
//                                                     };
//                                                 const geoForAdd: Action = {
//                                                     type: "addGeoSelection",
//                                                     geoPayload: {
//                                                         id: idGeo,
//                                                         name:
//                                                             geographData
//                                                                 .loc_name
//                                                                 .length > 0
//                                                                 ? geographData.loc_name
//                                                                 : "Imported from TOML",
//                                                         scale:
//                                                             (geographData.state
//                                                                 .length > 0
//                                                                 ? "States"
//                                                                 : geographData
//                                                                       .county
//                                                                       .length >
//                                                                   0
//                                                                 ? "Counties"
//                                                                 : "") ?? "",
//                                                         featureSelected:
//                                                             geographData.state
//                                                                 .length > 0
//                                                                 ? typeof geographData.state ===
//                                                                   "string"
//                                                                     ? Array.of(
//                                                                           geographData.state
//                                                                       )
//                                                                     : Array.from(
//                                                                           geographData.state
//                                                                       )
//                                                                 : geographData
//                                                                       .county
//                                                                       .length >
//                                                                   0
//                                                                 ? typeof geographData.county ===
//                                                                   "string"
//                                                                     ? Array.of(
//                                                                           geographData.county
//                                                                       )
//                                                                     : Array.from(
//                                                                           geographData.county
//                                                                       )
//                                                                 : [],
//                                                     },
//                                                 };
//                                                 const simForAdd: ActionsSimulationData =
//                                                     {
//                                                         type: "add",
//                                                         payload: {
//                                                             name: importedData.title,
//                                                             idSim,
//                                                             idModel,
//                                                             idGeo:
//                                                                 !geographData.state ||
//                                                                 !geographData.county ||
//                                                                 !geographData.country
//                                                                     ? idGeo
//                                                                     : 0,
//                                                             idGraph:
//                                                                 geographData
//                                                                     .state
//                                                                     .length ===
//                                                                     0 &&
//                                                                 geographData
//                                                                     .county
//                                                                     .length ===
//                                                                     0
//                                                                     ? 1
//                                                                     : 0,
//                                                             typeSelection:
//                                                                 geographData
//                                                                     .state
//                                                                     .length ===
//                                                                     0 &&
//                                                                 geographData
//                                                                     .county
//                                                                     .length ===
//                                                                     0
//                                                                     ? OptionFeature.Graph
//                                                                     : OptionFeature.Geographic,
//                                                             initialConditions,
//                                                             t_init: `${new Intl.DateTimeFormat(
//                                                                 "en-US"
//                                                             ).format(
//                                                                 dateSim
//                                                                     ? new Date(
//                                                                           dateSim
//                                                                       )
//                                                                     : Date.now()
//                                                             )}`,
//                                                         },
//                                                     };
//                                                 // add spatial entities
//                                                 if (
//                                                     geoForAdd.geoPayload.scale
//                                                         .length > 0
//                                                 ) {
//                                                     setGeoSelections(geoForAdd);
//                                                     addInLocalStorage(
//                                                         [geoForAdd.geoPayload],
//                                                         "geoSelection"
//                                                     );
//                                                 }
//                                                 // add simulation
//                                                 setSimulation(simForAdd);
//                                                 addInLocalStorage(
//                                                     [simForAdd.payload],
//                                                     "simulations"
//                                                 );
//                                                 setParameters({
//                                                     type: "add",
//                                                     payload: modelForAdd,
//                                                 });
//                                                 addInLocalStorage(
//                                                     [modelForAdd],
//                                                     "models"
//                                                 );
//                                                 onClose();
//                                                 toast({
//                                                     position,
//                                                     title: "Models imported",
//                                                     description:
//                                                         "Models was imported successfully",
//                                                     status: "success",
//                                                     duration: 5000,
//                                                     isClosable: true,
//                                                 });
//                                             } catch (error) {
//                                                 toast({
//                                                     position,
//                                                     title: "Error",
//                                                     description:
//                                                         "Uploading simulation failed. Check your TOML config and try later",
//                                                     status: "error",
//                                                     duration: 5000,
//                                                     isClosable: true,
//                                                 });
//                                             }
//                                         };
//                                         reader.onerror = (err) => {
//                                             toast({
//                                                 position,
//                                                 title: "Error",
//                                                 description:
//                                                     "Occurs an error during import process",
//                                                 status: "error",
//                                                 duration: 5000,
//                                                 isClosable: true,
//                                             });
//                                         };
//                                     } else {
//                                         toast({
//                                             position,
//                                             title: "Doesn't supported API",
//                                             description:
//                                                 "The File APIs are not fully supported by your browser.",
//                                             status: "error",
//                                             duration: 5000,
//                                             isClosable: true,
//                                         });
//                                     }
//                                 }}
//                             />
//                         </Center>
//                     </ModalBody>
//                 </ModalContent>
//             </Modal>
//         </>
//     );
// };

// export default ImportModels
export default {};
