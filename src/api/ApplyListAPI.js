import axios from "axios";

export const ApplyListAPI = axios.create({
  baseURL: 'http://210.179.175.158'
});

export const getList = async () => {
  return await ApplyListAPI.get(`/windstorm/insurance/get`);
};

export const getAllList = async (params) => {
  return await ApplyListAPI.get(`/windstorm/insurance/getall`, {
    params
  });
};