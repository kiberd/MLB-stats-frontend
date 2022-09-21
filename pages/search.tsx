import React, { useEffect, useState } from "react";
import type { NextPage } from "next";

import Header from "../components/Header";
import Footer from "../components/Footer";

import { useQuery } from "react-query";
import { getPlayersInfo } from "../apis/api";

import useQueryDebounce from "../hooks/useQueryDebounce";
import useSearchPlayers from "../hooks/useSearchPlayers";

import { NextRouter, useRouter } from "next/router";
import { SearchPlayersParams } from "params";
import SearchLoading from "../components/SearchLoading";
import SearchResult from "../components/SearchResult";

const Search: NextPage = () => {
  const router: NextRouter = useRouter();

  const resultSize = 10;
  const startingIndex =
    (parseInt(router.query.page as string) - 1) * resultSize;

  const { data, isLoading, isFetching, isError } = useSearchPlayers(
    router.query.q && resultSize && startingIndex >= 0
      ? ({
          name: router.query.q,
          resultSize: resultSize,
          startingIndex: startingIndex,
        } as SearchPlayersParams)
      : null
  );

  if (isLoading) return <SearchLoading query={router.query.q as string} />;

  return (
    <div>
      <Header />
      <main>
        <SearchResult query={router.query.q as string} data={data}/>
      </main>
      <Footer />
    </div>
  );
};

export default Search;
