import getNodeNames from "../utils/getNodeNames";

describe("Pruebas en getNodesNames", () => {
    test("en caso de modelo monopoblacional debe retornar FIP", () => {
        const response = getNodeNames("04", true);
        expect(response).toBe("04");
    });
    test("debe retornar el nombre de Arizona", () => {
        const response = getNodeNames("04", false);
        expect(response).toBe("Arizona");
    });
    test("debe retornar el nombre de Houston, AL", () => {
        const response = getNodeNames("01069", false);
        expect(response).toBe("Houston, AL");
    });
});
