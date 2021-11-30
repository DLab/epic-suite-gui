export default function userHandler(req, res) {
  const initialConditions = {
    population: Math.floor(Math.random() * 1000),
    R: Math.floor(Math.random() * 400),
    I: Math.floor(Math.random() * 400),
    I_d: Math.floor(Math.random() * 400),
    I_ac: Math.floor(Math.random() * 400),
    E: Math.floor(Math.random() * 400),
  };
  const { method } = req;
  if (method === "POST") {
    res.send(initialConditions);
  }
  if (method === "GET") {
    res.send(initialConditions);
  }
}

// export function ejemploApi(req, res) {
//   // const { method } = req;
//   // if (method === "GET") {
//   //   res.send("hola");
//   // }
//   res.send("hola");
// }
