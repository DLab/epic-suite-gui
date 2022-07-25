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
import { useContext } from "react";

import { NewModelSetted } from "context/NewModelsContext";
import { SelectFeature } from "context/SelectFeaturesContext";

interface PropsExportModels {
    idModel?: number;
}

const ExportModels = ({ idModel }: PropsExportModels) => {
    const { completeModel } = useContext(NewModelSetted);
    const { geoSelections } = useContext(SelectFeature);

    const anithing = (id: number) => {
        const modelSelected = completeModel.find(
            (model) => model.idNewModel === id
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
                initialConditions: initCond,
                t_init,
            } = modelSelected;

            const {
                name_model: notConsiderertitle,
                name: notConsiderertitleName,
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
                ...dynamicSEIRHVD
            } = parameters;

            const obj = {
                idSim: idNewModel,
                model: {
                    name,
                    model: modelType,
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
                },
                initialconditions: {
                    ...initCond
                        .map((init) => init.conditionsValues)
                        .reduce((acc, current, _idx, src) => {
                            if (src.length === 1) {
                                return {
                                    ...acc,
                                    ...current,
                                };
                            }
                            const keysValuesInitCond = Object.entries(current);
                            return {
                                ...acc,
                            };
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
                              },
                    dynamic:
                        modelType === "seirhvd"
                            ? {
                                  alpha,
                                  beta,
                                  ...dynamicSEIRHVD,
                              }
                            : modelType === "seir"
                            ? {
                                  alpha,
                                  beta,
                                  tI_R,
                                  tE_I,
                                  pI_det,
                                  rR_S,
                              }
                            : {
                                  alpha,
                                  beta,
                                  tI_R,
                                  pI_det,
                                  rR_S,
                              },
                },
            };
        }
    };

    return (
        <Popover placement="right">
            <PopoverTrigger>
                <Tooltip label="Download saved models">
                    <IconButton
                        bg="#16609E"
                        color="#FFFFFF"
                        aria-label="Call Segun"
                        size="sm"
                        cursor="pointer"
                        _hover={{ bg: "blue.500" }}
                        icon={<DownloadIcon />}
                    />
                </Tooltip>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverHeader pt={4} fontWeight="bold" border="0">
                    Choose a format file!
                </PopoverHeader>
                <PopoverBody>
                    <Link
                        download="models.toml"
                        href={`data:text/json;charset=utf-8,${encodeURIComponent(
                            "asdf"
                        )}`}
                    >
                        to TOML
                    </Link>
                    <Button onClick={() => anithing(idModel)}>
                        {" "}
                        Make a try
                    </Button>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
};

export default ExportModels;
