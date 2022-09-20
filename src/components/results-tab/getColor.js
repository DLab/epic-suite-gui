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
 * Entrega el color según el valor que tiene el parámetro en el día entregado.
 * @param  dayValue día de la simulación.
 * @param {number} maxValue valor máximo del parámetro entre los valores de la simulación.
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
