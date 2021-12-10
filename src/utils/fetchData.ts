import axios from "axios";

export const getData = async (url) => {
  const res = await fetch(url);
  return res.json();
};
export const postData = async (url, body) => {
  const res = await axios.post(url, body);
  return res.data;
};
