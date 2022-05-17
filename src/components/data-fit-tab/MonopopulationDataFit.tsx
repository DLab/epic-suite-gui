import {
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Text,
} from "@chakra-ui/react";
import React, { useContext } from "react";

import { DataFit } from "context/DataFitContext";

import FitParameterTable from "./FitParameterTable";

const MonopopulationDataFit = () => {
    const { fittedData } = useContext(DataFit);

    return (
        <>
            <Text>{fittedData[0].name}</Text>

            <Tabs display="flex" isLazy>
                <TabList display="flex" flexDirection="column">
                    {Object.keys(fittedData[0]).map((key) => {
                        if (key !== "name" && key !== "I" && key !== "I_ac") {
                            return <Tab>{key}</Tab>;
                        }
                        return false;
                    })}
                </TabList>
                <TabPanels>
                    {Object.keys(fittedData[0]).map((key) => {
                        if (key !== "name" && key !== "I" && key !== "I_ac") {
                            // Para pasar a futuro el value de esa key
                            // const info = fittedData[0][key];
                            return (
                                <TabPanel>
                                    <FitParameterTable />
                                </TabPanel>
                            );
                        }
                        return false;
                    })}
                </TabPanels>
            </Tabs>
        </>
    );
};

export default MonopopulationDataFit;
