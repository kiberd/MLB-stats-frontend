import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useQuery } from "react-query";
import { getPlayersInfo } from "../api/api";

const Home: NextPage = () => {

  const { data, isLoading, isError } = useQuery("getPlayersInfo", () => getPlayersInfo("park"), {
    enabled: true,
  });

  if (isLoading) return (<div>Loading</div>);
  if (isError) return (<div>Error</div>);


  return (
    <div>
      <h1 className="">Hello world!</h1>
      {data}
    </div>
  );
};

export default Home;
