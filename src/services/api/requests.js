import axios from "axios";

axios.defaults.baseURL = "https://auth-qa.qencode.com/v1/auth";

const errorAxios = (error) => {
  if (axios.isAxiosError(error)) {
    console.log("err", error);
  }
};
export const loginRes = async (data) => {
  try {
    const res = await axios.post("/login", data);
    return res;
  } catch (error) {
    errorAxios(error);
  }
};

export const accessTokenRes = async (data) => {
  try {
    const res = await axios.post("/access-token", data);
    return res;
  } catch (error) {
    errorAxios(error);
  }
};

export const refreshTokenRes = async (data) => {
  try {
    const res = await axios.post("/refresh-token", data);
    return res;
  } catch (error) {
    errorAxios(error);
  }
};

export const passwordSetRes = async (data) => {
  try {
    const res = await axios.post("/password-set", data);
    return res;
  } catch (error) {
    errorAxios(error);
  }
};

export const passwordResetRes = async (data) => {
  try {
    const res = await axios.post("/password-reset", data);
    return res;
  } catch (error) {
    errorAxios(error);
  }
};
