import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import DetailResult from "../components/detail/DetailResult";
import DetailLoading from "../components/detail/DetailLoading";
import SearchLoading from "../components/search/SearchLoading";

import useSearchPlayerBatting from "../hooks/useSearchPlayerBatting";

import { NextRouter, useRouter } from "next/router";

const Detail: NextPage = () => {
  const router: NextRouter = useRouter();

  const [playerId, setPlayerId] = useState<any>();

  useEffect(() => {
    if (router.query) {
      setPlayerId(router.query.id);
    }
  }, [router.query]);

  const { data, isLoading, isFetching, isError } =
    useSearchPlayerBatting(playerId);

  if (isLoading || isFetching)
    return <SearchLoading query={router.query.id as string} />;

  return (
    <div>
      <Header />
      <main>{data && <DetailResult data={data} />}</main>
      <Footer />
    </div>
  );
};

export default Detail;
