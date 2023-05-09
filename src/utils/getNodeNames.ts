import countiesData from "../data/counties.json";
import stateData from "../data/states.json";

const getNodeName = (fip, isMono, i = 0) => {
    try {
        if (isMono) {
            return fip;
        }
        if (fip.length === 2) {
            return stateData.data.find((state) => state[0] === fip)[2];
        }
        return countiesData.data.find((state) => state[5] === fip)[7];
    } catch (error) {
        return `${i}`;
    }
};

export default getNodeName;
