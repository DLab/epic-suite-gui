import React from "react";

interface Props {
    maxValue: number;
}

const ColorsScale = ({ maxValue }: Props) => {
    const colors = [
        "#44010E",
        "#800026",
        "#BD0026",
        "#E31A1C",
        "#FC4E2A",
        "#FD8D3C",
        "#FEB24C",
        "#FED976",
    ];

    const rangeValue = Math.ceil(maxValue / colors.length);
    let min;
    let max;

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
            {colors.map((color, i) => {
                const quantityIndicator = getQuantityIndicator();

                const index = colors.length - i;
                if (i === colors.length - 1) {
                    min = 0;
                    max = rangeValue;
                } else {
                    min = (index - 1) * rangeValue + 1;
                    max = index * rangeValue;
                }
                const minRound =
                    Math.round(min / quantityIndicator) * quantityIndicator;

                return (
                    <div key={color} style={{ textAlign: "initial" }}>
                        <i
                            className="box-legend"
                            style={{ background: color }}
                        />
                        {new Intl.NumberFormat("de-DE").format(minRound)}
                    </div>
                );
            })}
        </div>
    );
};

export default ColorsScale;
