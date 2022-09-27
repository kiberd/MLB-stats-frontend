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
import SearchLoading from "../components/search/SearchLoading";
import SearchResult from "../components/search/SearchResult";

const Search: NextPage = () => {
  const router: NextRouter = useRouter();
  const [params, setParams] = useState<SearchPlayersParams>();

  useEffect(() => {
    if (router.query) {
      setParams({
        name: router.query.q as string,
        resultSize: 10,
        startingIndex: (parseInt(router.query.page as string) - 1) * 10,
      });
    }
  }, [router.query]);

  const { data, isLoading, isFetching, isError } = useSearchPlayers(
    params ? params : null
  );

  if (isLoading || isFetching)
    return <SearchLoading query={router.query.q as string} />;

  return (
    <div>
      <Header />
      <main>
        <SearchResult query={router.query.q as string} data={data} />
      </main>
      <Footer />
    </div>
  );
};

export default Search;
