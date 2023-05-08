import colorsScales from "./getColorsScales";

/**
 * Return the color according to the value of the parameter on the day delivered.
 * @param  dayValue simulation day.
 * @param {number} maxValue maximum value of the parameter between the values of the simulation.
 * @returns {string}
 */
const getColor = (dayValue: number, maxValue: number, scaleName: string) => {
    const rangeValue = Math.ceil(maxValue / colorsScales[scaleName].length);
    let color;
    const scaleLength = colorsScales[scaleName].length - 1;
    if (!Number.isNaN(dayValue)) {
        for (let i = 0; i < scaleLength; i += 1) {
            if (i === 0) {
                if (dayValue <= rangeValue) {
                    color = colorsScales[scaleName][i];
                }
            } else if (dayValue > i * rangeValue) {
                color = colorsScales[scaleName][i];
            }
        }
    }
    return color;
};
export default getColor;
