const colors = [
    "#440154",
    "#482878",
    "#3e4989",
    "#31688e",
    "#26828e",
    "#1f9e89",
    "#35b779",
    "#6ece58",
    "#b5de2b",
    "#fde725",
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
