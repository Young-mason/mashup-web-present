import axios from "axios";

export const postMessage = async (
  token: string,
  channel: string,
  text: string
) => {
  const params = { channel, text };
  const option = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const res = await axios.post(
    "https://slack.com/api/chat.postMessage",
    params,
    option
  );

  console.log(res.data);
};

export const uploadFile = async (
  token: string,
  channels: string,
  form: any
) => {
  const res = await axios.post("https://slack.com/api/files.upload", form, {
    headers: form.getHeaders(),
  });

  console.log(res.data);
};
