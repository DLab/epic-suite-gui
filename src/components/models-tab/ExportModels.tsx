/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/naming-convention */
import { DownloadIcon } from "@chakra-ui/icons";
import {
    useToast,
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
import VariableDependentTime from "types/VariableDependentTime";
import convertFiles from "utils/convertFiles";
import {
    convertTypeFunctionVDTForTomlFormat,
    fixMixTypeInArray,
} from "utils/convertVDTForTomlFormat";

interface PropsExportModels {
    idModel?: number;
}
type DynamicAttributes = Record<
    string,
    VariableDependentTime[] | number | VariableDependentTime
>;
const StringfyVariableDependentTime = (DinamicAttribute: DynamicAttributes) => {
    return Object.entries(DinamicAttribute)
        .map(([keys, data]) => {
            if (_.isNumber(data)) {
                return { [keys]: data };
            }
            if (!_.isArray(data)) {
                const { rangeDays, type, isEnabled, val } = data;
                return {
                    [keys]: isEnabled
                        ? JSON.stringify({
                              function: "events",
                              values: convertTypeFunctionVDTForTomlFormat(
                                  type,
                                  rangeDays
                              ),
                              days: rangeDays,
                          })
                        : val,
                };
            }
            // util variable
            const med = data
                .map((u: VariableDependentTime) => {
                    const { rangeDays, type, isEnabled, val } = u;
                    return {
                        [keys]: isEnabled
                            ? JSON.stringify({
                                  function: "events",
                                  values: convertTypeFunctionVDTForTomlFormat(
                                      type,
                                      rangeDays
                                  ),
                                  days: rangeDays,
                              })
                            : val,
                    };
                })
                .reduce((ac, curr) => {
                    // reduce array object to one object with variables dependent time
                    return {
                        [keys]:
                            ac[keys] || ac[keys] === 0
                                ? [ac[keys], curr[keys]]
                                : curr[keys],
                    };
                }, {});
            // if med array, fix it when it has mixed types before returning
            return {
                [keys]: med[keys],
            };
            // return {
            //     [keys]: _.isArray(med[keys])
            //         ? fixMixTypeInArray(med[keys] as Array<unknown>)
            //         : med[keys],
            // };
        })
        .reduce((acc, curr) => {
            return { ...acc, ...curr };
        }, {});
};
const ExportModels = ({ idModel }: PropsExportModels) => {
    const { completeModel } = useContext(NewModelSetted);
    const { geoSelections } = useContext(SelectFeature);
    const [tomlFile, setTomlFile] = useState<string>("");
    const [nameModelForToml, setNameModelForToml] = useState<string>("");
    // eslint-disable-next-line sonarjs/cognitive-complexity
    const anithing = (id: number): string => {
        // establecer type de salida de la funcion
        const modelSelected = completeModel.find(
            // eslint-disable-next-line @typescript-eslint/dot-notation
            (model) => model["idNewModel"] === id
        );
        if (!_.isEmpty(modelSelected)) {
            const geoSelected = geoSelections.find(
                (geo) => geo.id === modelSelected.idGeo
            );
            const {
                name,
                modelType,
                parameters,
                idNewModel,
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

            const obj = {
                model: {
                    name,
                    model: `${modelType}${
                        populationType.replace("population", "") === "meta"
                            ? "meta"
                            : ""
                    }`,
                    compartments: parameters.compartments,
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
                initialconditions: {
                    ...initCond
                        .map((init) => init.conditionsValues)
                        .reduce((acc, current, _idx, src) => {
                            if (
                                src.length === 1 &&
                                populationType.replace("population", "") ===
                                    "mono"
                            ) {
                                return {
                                    ...acc,
                                    ...current,
                                };
                            }
                            return Object.entries(current)
                                .map((e) => {
                                    return {
                                        [e[0]]: acc[e[0]]
                                            ? [...acc[e[0]], e[1]]
                                            : [e[1]],
                                    };
                                })
                                .reduce(
                                    (subAccum, subCurrent) => ({
                                        ...subAccum,
                                        ...subCurrent,
                                    }),
                                    {}
                                );
                        }, {}),
                },
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
                                  ...StringfyVariableDependentTime({
                                      alpha,
                                      beta,
                                      ...dynamicSEIRHVD,
                                  }),
                              }
                            : modelType === "seir"
                            ? {
                                  ...StringfyVariableDependentTime({
                                      alpha,
                                      beta,
                                      tI_R,
                                      tE_I,
                                      rR_S,
                                  }),
                              }
                            : {
                                  ...StringfyVariableDependentTime({
                                      alpha,
                                      beta,
                                      tI_R,
                                      rR_S,
                                  }),
                              },
                },
            };
            setNameModelForToml(name);
            return `${convertFiles(obj)}`;
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
                    <Link
                        hidden={!tomlFile}
                        download={`${nameModelForToml ?? "model"}.toml`}
                        href={`data:text/json;charset=utf-8,${encodeURIComponent(
                            tomlFile
                        )}`}
                    >
                        Download TOML file
                    </Link>
                    <Button
                        hidden={!!tomlFile}
                        onClick={() => setTomlFile(anithing(idModel))}
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
