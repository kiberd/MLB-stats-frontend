import React, { useEffect, useState } from "react";
import type { NextPage } from "next";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

import useSearchPlayers from "../hooks/useSearchPlayers";

import { NextRouter, useRouter } from "next/router";
import { SearchPlayersParams } from "params";
import SearchLoading from "../components/search/SearchLoading";
import SearchResult from "../components/search/SearchResult";
import PageLayout from "../components/layout/PageLayout";

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
        <PageLayout>
          <SearchResult query={router.query.q as string} data={data} />
        </PageLayout>
      </main>
      <Footer />
    </div>
  );
};

export default Search;
