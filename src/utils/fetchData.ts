import axios from "axios";

export const getData = async (url) => {
  const res = await fetch(url);
  return res.json();
};
export const postData = async (url, body) => {
  try {
    const data = await axios.post(url, body, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        // eslint-disable-next-line prettier/prettier
        mode: "no-cors",
      },
    });
    return data.data;
  } catch (error) {
    // console.log("fetchData", error);
    return error;
  }
};
