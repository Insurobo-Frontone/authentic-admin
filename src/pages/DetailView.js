import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import Layout from "../components/Layout";
import ApplyDetail from "../container/ApplyDetail";
import { getDetail } from "../api/ApplyAPI";

const DetailView = () => {
  const location = useLocation();
  const [data, setData] = useState();

  useEffect(() => {
    getDetail({
      UUID: location.state.UUID
    }).then((res) => {
      console.log(res)
      setData(res.data.IN101TR)
    }).catch((e) => console.log(e));

  }, []);

  return (
    <Layout>  
      <ApplyDetail data={data} />
    </Layout>
  )
}
export default DetailView;

