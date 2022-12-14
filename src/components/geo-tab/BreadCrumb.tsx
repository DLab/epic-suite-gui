import { ChevronRightIcon } from "@chakra-ui/icons";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    Icon,
} from "@chakra-ui/react";
import { HomeIcon } from "@heroicons/react/24/outline";
import React, { useContext, useEffect } from "react";

import { SelectFeature } from "context/SelectFeaturesContext";
import { Model } from "types/ControlPanelTypes";

interface Props {
    secondLink: string;
    setSecondLink: (value: string) => void;
}

const BreadCrumb = ({ secondLink, setSecondLink }: Props) => {
    const { setMode, mode, idGeoSelectionUpdate, geoSelections } =
        useContext(SelectFeature);

    useEffect(() => {
        if (mode === Model.Initial) {
            setSecondLink(undefined);
        }
        if (mode === Model.Add) {
            setSecondLink("New");
        }
        if (mode === Model.Update) {
            const { name } = geoSelections.find(
                (selection) =>
                    selection.id.toString() === idGeoSelectionUpdate.toString()
            );
            setSecondLink(name);
        }
    }, [geoSelections, idGeoSelectionUpdate, mode, setSecondLink]);

    return (
        <Breadcrumb
            spacing="8px"
            separator={<ChevronRightIcon color="gray.500" />}
        >
            <BreadcrumbItem>
                <BreadcrumbLink href="#">
                    {" "}
                    <Icon w="18px" h="18px" as={HomeIcon} color="#016FB9" />
                </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
                <BreadcrumbLink
                    onClick={() => {
                        setMode(Model.Initial);
                    }}
                >
                    Geographic Selection
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
