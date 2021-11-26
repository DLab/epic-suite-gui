import data from "data/SEIRresults.json";

export default function getResults(req, res) {
  if (req.method === "GET") {
    res.send(data);
  } else {
    res.send("no se obtuvo la data");
  }
}
