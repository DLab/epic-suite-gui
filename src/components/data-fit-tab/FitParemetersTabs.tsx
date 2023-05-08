import { useContext } from "react";

import { DataFit } from "context/DataFitContext";

import MonopopulationDataFit from "./MonopopulationDataFit";
// import NodeSearchFilter from "./NodeSearchFilter";

/**
 * Component that shows the tabs according to the monopopulation or metapopulation model.
 * @subcategory DataFitTab
 * @component
 */
const FitParemetersTabs = () => {
    const { fittedData, realDataToFit } = useContext(DataFit);

    return (
        <>
            {/* <NodeSearchFilter setNodeNameFilter={setNodeNameFilter} /> */}
            {fittedData.length === 1 && realDataToFit.length === 1 && (
                <MonopopulationDataFit />
            )}
        </>
    );
};

export default FitParemetersTabs;
