import React, { useCallback, useEffect, useState } from "react";

interface Props {
    maxValue: number;
}

/**
 * Color scale for map display.
 * @subcategory Results
 * @component
 */
const ColorsScale = ({ maxValue }: Props) => {
    const [scaleValues, setScaleValues] = useState([]);

    const getScaleValues = useCallback(() => {
        const colors = [
            "#fde725, #b5de2b",
            "#b5de2b, #6ece58",
            "#6ece58, #35b779",
            "#35b779, #1f9e89",
            "#1f9e89, #26828e",
            "#26828e, #31688e",
            "#31688e, #3e4989",
            "#3e4989, #482878",
            "#482878, #440154",
        ];
        const rangeValue = Math.ceil(maxValue / colors.length);
        let min;
        let max;
        return colors.map((cc, ic) => {
            const index = colors.length - ic;
            if (ic === colors.length - 1) {
                min = 0;
                max = rangeValue;
            } else if (ic === 1 || ic === 3 || ic === 5 || ic === 7) {
                min = "none";
            } else if (ic === 0) {
                min = maxValue;
            } else {
                min = (index - 1) * rangeValue + 1;
                max = index * rangeValue;
            }
            return {
                color: `linear-gradient(${cc})`,
                minValue: min,
                maxValue: max,
            };
        });
    }, [maxValue]);

    useEffect(() => {
        setScaleValues(getScaleValues());
    }, [getScaleValues]);

    /**
     * Returns the unit to which it should be rounded according to the maximum value of the simulation.
     * @returns {number}
     */
    const getQuantityIndicator = () => {
        let indicator;
        if (maxValue / 1000 >= 1) {
            indicator = 1000;
        } else if (maxValue / 100 >= 1) {
            indicator = 100;
        } else if (maxValue / 10 >= 1) {
            indicator = 10;
        } else {
            indicator = 1;
        }
        return indicator;
    };

    return (
        <div className="info legend">
            {scaleValues.map((scale) => {
                const quantityIndicator = getQuantityIndicator();
                const minRound =
                    Math.round(scale.minValue / quantityIndicator) *
                    quantityIndicator;

                return (
                    <div key={scale.color} style={{ textAlign: "initial" }}>
                        <i
                            className="box-legend"
                            style={{ background: scale.color }}
                        />
                        {scale.minValue !== "none" && (
                            <span>
                                {new Intl.NumberFormat("de-DE").format(
                                    minRound
                                )}
                            </span>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default ColorsScale;
