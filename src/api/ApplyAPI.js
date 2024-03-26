import axios from "axios";

export const ApplyListAPI = axios.create({
  baseURL: 'http://210.179.175.158',
  headers: {
    "Content-Type": "application/json",
  }
});

export const getList = async (params) => {
  return await ApplyListAPI.get(`/windstorm/member/Member/getList`, { params });
};

export const getKeywordList = async (params) => {
  return await ApplyListAPI.get(`/windstorm/member/Member/getList?KEYWORD=${params.KEYWORD}&${params.KEYWORD}=${params.KEYWORD_VALUE}&page=${params.page}&per_page=${params.per_page}`)
}

export const getDetail = async (params) => {
  return await ApplyListAPI.get(`/windstorm/member/Member/getDetail?UUID=${params.UUID}`);
};


