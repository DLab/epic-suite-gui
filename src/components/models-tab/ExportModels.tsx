/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/naming-convention */
import { DownloadIcon } from "@chakra-ui/icons";
import {
    Popover,
    PopoverTrigger,
    IconButton,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    Link,
    Tooltip,
    Button,
} from "@chakra-ui/react";
import _ from "lodash";
import { useContext, useState } from "react";

import { NewModelSetted } from "context/NewModelsContext";
import { SelectFeature } from "context/SelectFeaturesContext";
import convertFiles from "utils/convertFiles";
import {
    formatInitialConditionsForExport,
    StringifyVariableDependentTime,
} from "utils/helpersExportsModels";

interface PropsExportModels {
    idModel?: number;
}

const ExportModels = ({ idModel }: PropsExportModels) => {
    const { completeModel } = useContext(NewModelSetted);
    const { geoSelections } = useContext(SelectFeature);
    const [tomlFile, setTomlFile] = useState<string>("");
    const [nameModelForToml, setNameModelForToml] = useState<string>("");
    /**
     * It creates a string for a toml file.
     * @param {number} id - number
     * @returns A string with the model in toml format.
     */
    // eslint-disable-next-line sonarjs/cognitive-complexity
    const createStringForToml = (id: number): string => {
        // establecer type de salida de la funcion
        const modelSelected = completeModel.find(
            // eslint-disable-next-line @typescript-eslint/dot-notation
            (model) => model["idNewModel"] === id
        );
        if (!_.isEmpty(modelSelected)) {
            const geoSelected = geoSelections.find(
                (geo) => geo.id === modelSelected.idGeo
            ) ?? { scale: "graph", featureSelected: [], id: 0 };
            const {
                name,
                modelType,
                parameters,
                populationType,
                initialConditions: initCond,
                t_init,
            } = modelSelected;

            const {
                name_model: notConsiderertitle,
                name: notConsiderertitleName,
                population,
                compartments,
                t_init: notConsidererTInit,
                t_end,
                populationfraction,
                tI_R,
                tE_I,
                pI_det,
                rR_S,
                mu,
                alpha,
                beta,
                pIcr_det,
                pIm_det,
                pIv_det,
                ...dynamicSEIRHVD
            } = parameters;

            const jsonForToml = {
                model: {
                    name,
                    model: `${modelType}${
                        populationType.replace("population", "") === "meta"
                            ? "meta"
                            : ""
                    }`,
                    compartments:
                        modelType === "seirhvd"
                            ? [
                                  "S",
                                  "S_v",
                                  "E",
                                  "E_v",
                                  "Im",
                                  "Icr",
                                  "Iv",
                                  "R",
                                  "H",
                                  "D",
                              ]
                            : compartments,
                },
                data: {
                    datafile: false,
                    importdata: false,
                    initdate: "2020-03-22",
                    country: "USA",
                    state:
                        geoSelected.scale === "States"
                            ? geoSelected.featureSelected
                            : "",
                    county:
                        geoSelected.scale === "Counties"
                            ? geoSelected.featureSelected
                            : "",
                    healthservice: "",
                    loc_name: "",
                    geo_topology: populationType.replace("population", ""),
                },
                initialconditions: formatInitialConditionsForExport(
                    initCond,
                    populationType
                ),
                parameters: {
                    static:
                        modelType === "seirhvd"
                            ? {
                                  t_init,
                                  t_end,
                                  mu,
                                  timestep: 0,
                                  k_I: 0,
                                  k_R: 0,
                                  seroprevfactor: 0,
                                  expinfection: 0,
                                  populationfraction,
                                  pIcr_det,
                                  pIm_det,
                                  pIv_det,
                              }
                            : {
                                  t_init,
                                  t_end,
                                  mu,
                                  timestep: 0,
                                  k_I: 0,
                                  k_R: 0,
                                  seroprevfactor: 0,
                                  expinfection: 0,
                                  pI_det,
                              },
                    dynamic:
                        modelType === "seirhvd"
                            ? {
                                  ...StringifyVariableDependentTime({
                                      alpha,
                                      beta,
                                      ...dynamicSEIRHVD,
                                  }),
                              }
                            : modelType === "seir"
                            ? {
                                  ...StringifyVariableDependentTime({
                                      alpha,
                                      beta,
                                      tI_R,
                                      tE_I,
                                      rR_S,
                                  }),
                              }
                            : {
                                  ...StringifyVariableDependentTime({
                                      alpha,
                                      beta,
                                      tI_R,
                                      rR_S,
                                  }),
                              },
                },
            };
            setNameModelForToml(name);
            return `${convertFiles(jsonForToml)}`;
        }
        return "";
    };

    return (
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
                    Download Model
                </PopoverHeader>
                <PopoverBody>
                    <Button hidden={!tomlFile} colorScheme="blue">
                        <Link
                            download={`${nameModelForToml ?? "model"}.toml`}
                            href={`data:text/json;charset=utf-8,${encodeURIComponent(
                                tomlFile
                            )}`}
                            style={{ textDecoration: "none" }}
                        >
                            Download your model
                        </Link>
                    </Button>
                    <Button
                        colorScheme="blue"
                        hidden={!!tomlFile}
                        onClick={() =>
                            setTomlFile(createStringForToml(idModel))
                        }
                    >
                        {" "}
                        Create TOML File
                    </Button>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
};

export default ExportModels;
