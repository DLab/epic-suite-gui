import React, { useContext, useState } from "react";

import { DataFit } from "context/DataFitContext";

import MetapopulationDataFit from "./MetapopulationDataFit";
import MonopopulationDataFit from "./MonopopulationDataFit";
import NodeSearchFilter from "./NodeSearchFilter";

const FitParemetersTabs = () => {
    const [nodeNameFilter, setNodeNameFilter] = useState("");
    const { fittedData, realDataToFit } = useContext(DataFit);

    return (
        <>
            {/* <NodeSearchFilter setNodeNameFilter={setNodeNameFilter} /> */}
            {fittedData.length === 1 && realDataToFit.length === 1 ? (
                <MonopopulationDataFit />
            ) : (
                <MetapopulationDataFit nodeNameFilter={nodeNameFilter} />
            )}
        </>
    );
};

export default FitParemetersTabs;
