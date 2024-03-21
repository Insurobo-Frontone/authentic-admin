import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { useFormContext } from "react-hook-form";
import ApplyList from "../container/ApplyList";
import { listData } from "../demo";

const Home = () => {
  const { reset } = useFormContext();
  useEffect(() => {
    reset();
  }, []);

  return (
    <Layout>
      <ApplyList data={listData} />
    </Layout>
  )
}
export default Home;

