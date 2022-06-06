import data from "data/dataFitTestMono.json";

export default function userHandler(req, res) {
    const { method } = req;
    if (method === "GET") {
        res.send(data);
    } else {
        res.send("no se obtuvo la data");
    }
}
