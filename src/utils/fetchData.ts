export const getData = async (url) => {
  const res = await fetch(url);
  return res.json();
};
export const postData = async (url, body) => {
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
  });
  return res.json();
};
