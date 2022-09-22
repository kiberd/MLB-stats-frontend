import React from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchQuery from "./SearchQuery";

interface SearchLoadingProps {
  query: string;
}

const SearchLoading: React.FC<SearchLoadingProps> = ({ query }) => {
  return (
    <div>
      <Header />
      <main className="w-[100vw] h-[87vh]">
        <div className="container min-h-full p-10 mx-auto bg-transparent">
          <SearchQuery prefix="Searching for " query={query} count={undefined} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SearchLoading;
