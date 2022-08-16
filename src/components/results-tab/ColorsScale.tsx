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
    return (
        <div className="info legend">
            {colors.map((color, i) => {
                const index = colors.length - i;
                if (i === colors.length - 1) {
                    min = 0;
                    max = rangeValue;
                } else {
                    min = (index - 1) * rangeValue + 1;
                    max = index * rangeValue;
                }
                return (
                    <div key={color} style={{ textAlign: "initial" }}>
                        <i
                            className="box-legend"
                            style={{ background: color }}
                        />
                        {new Intl.NumberFormat("de-DE").format(min)} -
                        {new Intl.NumberFormat("de-DE").format(max)}
                    </div>
                );
            })}
        </div>
    );
};

export default ColorsScale;
