import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";

import { DataFit } from "context/DataFitContext";

const FitParemetersTabs = () => {
    const { fittedData, realDataToFit, setFittedData, setRealDataToFit } =
        useContext(DataFit);

    useEffect(() => {
        // console.log(Object.keys(fittedData[0]));
    }, [fittedData]);

    return (
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
                        const info = fittedData[0][key];
                        return <TabPanel>{info}</TabPanel>;
                    }
                    return false;
                })}
            </TabPanels>
        </Tabs>
    );
};

export default FitParemetersTabs;
