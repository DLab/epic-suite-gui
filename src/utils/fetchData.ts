import axios from "axios";

// export const getData = async (url) => {
//     const { data } = await axios(url);
//     return data;
// };
const postData = async (url, body) => {
    const res = await axios.post(url, body);
    return res.data;
};
export default postData;
