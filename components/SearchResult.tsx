import React, { useEffect, useState } from "react";
import SearchQuery from "./SearchQuery";
import SearchResultCard from "./SearchResultCard";
import ReactPaginate from "react-paginate";
import styled from "styled-components";
import { NextRouter, useRouter } from "next/router";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
} from "@heroicons/react/24/solid";

interface SearchResultProps {
  query: string;
  data: any;
}

const PagenationWrapper = styled.div`
  display: flex;
  justify-content: center;
  //   margin-top: 2rem;
  margin-bottom: 3rem;
`;

const MyPaginate = styled(ReactPaginate).attrs({
  // You can redifine classes here, if you want.
  activeClassName: "active", // default to "disabled"
})`
  margin-top: 2rem 0 2rem 0;
  display: flex;
  flex-direction: row;
  // justify-content: space-between;
  justify-content: center;
  list-style-type: none;
  padding: 0 5rem;
  li {
    margin: 0 0.5rem 0 0.5rem;
  }
  li a {
    border-radius: 7px;
    padding: 0.1rem 0.5rem;
    // border: gray 1px solid;
    cursor: pointer;
    color: #115e59;
    height: 100%;
    vertical-align: middle;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size: 15px;
  }
  li.previous a,
  li.next a,
  li.break a {
    border-color: transparent;
  }
  //   li.previous a {
  //     svg {
  //       transform: rotate(-180deg);
  //     }
  //   }
  li.active a {
    border-color: transparent;
    color: #115e59;
    font-weight: 900;
  }
  li.disabled a {
    // color: #808091;
    // font-weight: 800;
    // display: hidden;
    visibility: hidden;
  }
  li.disable,
  li.disabled a {
    cursor: default;
  }
`;

const SearchResult: React.FC<SearchResultProps> = ({ query, data }) => {

  const router: NextRouter = useRouter();
  const [pageCount, setPageCount] = useState<number>(0);

  useEffect(() => {
    if (data) {
      setPageCount(Math.ceil(data?.total.value / 10));
    }
  }, [data]);

  const handlePageClick = (e: any) => {
    const page = e.selected + 1;

    router.push({
      pathname: "/search",
      query: {
        q: query,
        page: page,
      },
    });
  };

  return (
    <>
      <div className="container min-h-full p-10 mx-auto bg-transparent">
        <div className="my-4">
          <SearchQuery
            prefix="Results for "
            query={query}
            count={data?.total.value}
          />
        </div>

        {data && data.total.value === 0 ? (
          <div className="w-[100vw] h-[73vh]">검색 결과가 없습니다.</div>
        ) : null}

        {data &&
          data.hits.map((player: any, index: any) => (
            <SearchResultCard
              player={player}
              key={`${player._source.player.playerid}`}
            />
          ))}
      </div>

      <PagenationWrapper>
        <MyPaginate
          breakLabel="..."
          onPageChange={handlePageClick}
          pageRangeDisplayed={7}
          marginPagesDisplayed={1}
          pageCount={pageCount}
          initialPage={Number(router.query.page) - 1}
          previousLabel={<ChevronLeftIcon className="w-4 h-4" />}
          nextLabel={<ChevronRightIcon className="w-4 h-4" />}
        />
      </PagenationWrapper>
    </>
  );
};

export default SearchResult;
