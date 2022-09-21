const colors = [
    "#FED976",
    "#FEB24C",
    "#FD8D3C",
    "#FC4E2A",
    "#E31A1C",
    "#BD0026",
    "#800026",
    "#44010E",
];

/**
 * Return the color according to the value of the parameter on the day delivered.
 * @param  dayValue simulation day.
 * @param {number} maxValue maximum value of the parameter between the values of the simulation.
 * @returns {string}
 */
const getColor = (dayValue, maxValue) => {
    const rangeValue = Math.ceil(maxValue / colors.length);
    let color;
    for (let i = 0; i < 9; i += 1) {
        if (i === 0) {
            if (dayValue <= rangeValue) {
                color = colors[i];
            }
        } else if (dayValue > i * rangeValue) {
            color = colors[i];
        }
    }
    return color;
};
export default getColor;
