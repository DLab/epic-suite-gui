import { AddIcon } from "@chakra-ui/icons";
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerOverlay,
    DrawerContent,
    Button,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    IconButton,
} from "@chakra-ui/react";
import React, { useContext } from "react";

import { GraphicsData } from "context/GraphicsContext";

import ResultsMapsSelection from "./ResultsMapsSelection";
import ResultsSelection from "./ResultsSelection";

interface Props {
    isOpen: boolean;
    onOpen: (val: boolean) => void;
    onClose: (val: boolean) => void;
}

const ResultsDrawer = ({ isOpen, onOpen, onClose }: Props) => {
    const { allGraphicData, setAllGraphicData, savedSimulation } =
        useContext(GraphicsData);

    const btnRef = React.useRef();
    return (
        <>
            <IconButton
                bg="#16609E"
                color="#FFFFFF"
                aria-label="Call Segun"
                size="sm"
                cursor="pointer"
                _hover={{ bg: "blue.500" }}
                icon={<AddIcon />}
                ref={btnRef}
                onClick={() => {
                    onOpen(true);
                }}
            />

            <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={() => {
                    onClose(true);
                }}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent bg="#F2F2F0">
                    <DrawerBody p="0">
                        <Tabs h="90%" isFitted>
                            <TabList>
                                <Tab>Graphic</Tab>
                                <Tab>Map</Tab>
                            </TabList>
                            <TabPanels h="100%">
                                <TabPanel p="0" h="100%">
                                    <ResultsSelection />
                                    <DrawerFooter justifyContent="space-around">
                                        <Button
                                            colorScheme="teal"
                                            onClick={() => {
                                                setAllGraphicData([
                                                    ...allGraphicData,
                                                    [
                                                        {
                                                            graphicName: "",
                                                            leftAxis:
                                                                savedSimulation,
                                                            rightAxis: [],
                                                        },
                                                    ],
                                                ]);
                                                onClose(true);
                                            }}
                                        >
                                            Chart
                                        </Button>
                                        <Button
                                            variant="outline"
                                            onClick={() => {
                                                onClose(true);
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                    </DrawerFooter>
                                </TabPanel>
                                <TabPanel p="0 5%" h="100%">
                                    <ResultsMapsSelection onClose={onClose} />
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default ResultsDrawer;
