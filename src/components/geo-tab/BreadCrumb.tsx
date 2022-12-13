import { ChevronRightIcon } from "@chakra-ui/icons";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    Icon,
} from "@chakra-ui/react";
import { HomeIcon } from "@heroicons/react/24/outline";
import React from "react";

interface Props {
    secondLink: string;
}

const BreadCrumb = ({ secondLink }: Props) => {
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
                <BreadcrumbLink href="#">Geographic Selection</BreadcrumbLink>
            </BreadcrumbItem>
            {secondLink && (
                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink href="#">{secondLink}</BreadcrumbLink>
                </BreadcrumbItem>
            )}
        </Breadcrumb>
    );
};

export default BreadCrumb;
