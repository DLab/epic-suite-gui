import { ChevronRightIcon } from "@chakra-ui/icons";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Icon,
} from "@chakra-ui/react";
import { HomeIcon } from "@heroicons/react/24/outline";
import React, { useContext, useEffect } from "react";

import { NewModelSetted } from "context/NewModelsContext";
import { SelectFeature } from "context/SelectFeaturesContext";
import { TabIndex } from "context/TabContext";
import { Model } from "types/ControlPanelTypes";

interface Props {
    firstLink: string;
    secondLink?: string;
    setSecondLink?: (value: string) => void;
    modelMode?: string;
    setModelMode?: (value: string) => void;
    idModel?: number;
}

const BreadCrumb = ({
    firstLink,
    secondLink,
    setSecondLink,
    modelMode,
    setModelMode,
    idModel,
}: Props) => {
    const { completeModel } = useContext(NewModelSetted);
    const { setMode, mode, idGeoSelectionUpdate, geoSelections } =
        useContext(SelectFeature);
    const { setIndex } = useContext(TabIndex);

    useEffect(() => {
        if (firstLink === "Models") {
            if (modelMode === "initial") {
                setSecondLink(undefined);
            }
            if (modelMode === "add") {
                setSecondLink("New");
            }
            if (modelMode === "update") {
                const { name } = completeModel.find(
                    (model) =>
                        model.idNewModel.toString() === idModel.toString()
                );
                setSecondLink(name);
            }
        }
    }, [
        completeModel,
        firstLink,
        geoSelections,
        idGeoSelectionUpdate,
        idModel,
        mode,
        modelMode,
        secondLink,
        setSecondLink,
    ]);

    useEffect(() => {
        if (firstLink === "Geographic Selection") {
            if (mode === Model.Initial) {
                setSecondLink(undefined);
            }
            if (mode === Model.Add) {
                setSecondLink("New");
            }
            if (mode === Model.Update) {
                const { name } = geoSelections.find(
                    (selection) =>
                        selection.id.toString() ===
                        idGeoSelectionUpdate.toString()
                );
                setSecondLink(name);
            }
        }
    }, [
        firstLink,
        geoSelections,
        idGeoSelectionUpdate,
        mode,
        secondLink,
        setSecondLink,
    ]);

    return (
        <Breadcrumb
            spacing="8px"
            separator={<ChevronRightIcon color="gray.500" />}
        >
            <BreadcrumbItem>
                <BreadcrumbLink
                    onClick={() => {
                        setIndex(0);
                    }}
                >
                    {" "}
                    <Icon w="18px" h="18px" as={HomeIcon} color="#016FB9" />
                </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
                <BreadcrumbLink
                    onClick={() => {
                        if (firstLink === "Geographic Selection") {
                            setMode(Model.Initial);
                        }
                        if (firstLink === "Models") {
                            setModelMode("initial");
                        }
                    }}
                >
                    {firstLink}
                </BreadcrumbLink>
            </BreadcrumbItem>
            {secondLink && (
                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink>{secondLink}</BreadcrumbLink>
                </BreadcrumbItem>
            )}
        </Breadcrumb>
    );
};

export default BreadCrumb;
