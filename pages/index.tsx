import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useQuery } from "react-query";
import { getPlayersInfo } from "../api/api";

import React, { useEffect, useState } from "react";
import useQueryDebounce from "../hooks/useQueryDebounce";
import useSearchPlayers from "../hooks/useSearchPlayers";

const Home: NextPage = () => {

  const [name, setName] = useState<any>();

  // const { data, isLoading, isError } = useQuery("getPlayersInfo", () => getPlayersInfo("park"), {
  //   enabled: false,
  // });

  const debouncedSearchInput = useQueryDebounce(name, 500);
  const { data, isLoading, isFetching, isError } = useSearchPlayers(debouncedSearchInput);

  console.log(data);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  // if (isLoading) return (<div>Loading</div>);
  if (isError) return (<div>Error</div>);

  return (
    <div>
      <input onChange={handleNameChange}></input>
      
      {data && data.map((player: any) => (
        <div>
          {player._source.player.name}
        </div>
      ))}
    </div>
  );
};

export default Home;
