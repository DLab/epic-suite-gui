// useShouldRenderModelController.js
import { useMemo } from "react";

function useShouldRenderModelController({
    numberOfNodes,
    dataSourceValue,
    areaSelectedValue,
    graphId,
}) {
    return useMemo(() => {
        if (numberOfNodes === 0 || numberOfNodes === undefined) {
            return false;
        }

        const isGeographicSourceValid =
            dataSourceValue === "geographic" &&
            areaSelectedValue !== "" &&
            areaSelectedValue !== undefined;

        const isGraphSourceValid =
            dataSourceValue === "graph" &&
            graphId !== "" &&
            graphId !== undefined;

        return isGeographicSourceValid || isGraphSourceValid;
    }, [numberOfNodes, dataSourceValue, areaSelectedValue, graphId]);
}

export default useShouldRenderModelController;
