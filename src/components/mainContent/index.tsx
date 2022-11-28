import {
    Tabs,
    TabList,
    TabPanel,
    TabPanels,
    Flex,
    Center,
    Spinner,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useContext } from "react";

import Results from "../results-tab";
import DataFitTab from "components/data-fit-tab";
import NewModel from "components/new-model";
import SummaryTab from "components/summary-tab/SummaryTab";
import { TabIndex } from "context/TabContext";

import SideBar from "./SideBar";

const Map = dynamic(() => import("../map-tab"), {
    loading: () => (
        <Flex justifyContent="center" alignItems="center" h="95vh">
            <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
            />
        </Flex>
    ),
    ssr: false,
});

const MainContentTab = () => {
    const { index: tabIndex, setIndex } = useContext(TabIndex);

    return (
        <Tabs
            id="tab-content"
            h="100vh"
            index={tabIndex}
            onChange={(index) => setIndex(index)}
            display="flex"
        >
            <TabList
                display="flex"
                flexDirection="column"
                h="100vh"
                bg="#016FB9"
                border="none"
            >
                <Flex
                    direction="column"
                    h="100%"
                    justify="space-between"
                    mt="15%"
                >
                    <SideBar />{" "}
                </Flex>
            </TabList>
            <TabPanels h="100vh" bg="#F2F2F0">
                <TabPanel maxH="100vh" h="100%">
                    <NewModel />
                </TabPanel>
                <TabPanel h="100vh" bg="#F2F2F0">
                    <Map />
                </TabPanel>
                <TabPanel h="100vh" maxH="100vh">
                    <DataFitTab />
                </TabPanel>
                <TabPanel maxH="100vh" h="100%">
                    <SummaryTab />
                </TabPanel>
                <TabPanel h="100vh" maxH="100vh">
                    <Flex maxh="100vh" h="97vh">
                        <Center w="100%" maxh="100vh">
                            <Results />
                        </Center>
                    </Flex>
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};

export default MainContentTab;
