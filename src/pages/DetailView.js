import React, { useState, useEffect } from "react";
import { useSearchParams, useLocation } from 'react-router-dom';
import Layout from "../components/Layout";
import ApplyDetail from "../container/ApplyDetail";
import { getDetail } from "../api/ApplyAPI";

const DetailView = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const uuid = searchParams.get('id');

  useEffect(() => {
    getDetail({
      UUID: uuid,
      MEMBER_NO: location.state.MEMBER_NO,
      QUOTE_NO: location.state.QUOTE_NO
    }).then((res) => {
      console.log(res)
    }).catch((e) => console.log(e));

  }, []);
  return (
    <Layout>  
      <ApplyDetail />
    </Layout>
  )
}
export default DetailView;

