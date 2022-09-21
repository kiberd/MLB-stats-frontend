import React, { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import Router, { useRouter } from "next/router";

const SearchInput = () => {

  const [serarchInput, setSearchInput] = useState<string>();

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleSearchButtonClick = (e: React.MouseEvent<SVGSVGElement>) => {
    e.preventDefault();

    if (serarchInput && serarchInput.length > 0) {
      Router.push({
        pathname: "/search",
        query: {
          q: serarchInput,
          page: 1
        }
      })
    }
  }


  return (
    <div className="flex items-center">
      <input
        type="text"
        className="px-3 py-1 m-0 mr-2 text-base font-normal text-gray-700 transition ease-in-out bg-white border rounded-md outline-none border-gray-50 "
        placeholder="선수 검색"
        onChange={handleSearchInput}
      />
      <MagnifyingGlassIcon className="w-5 h-5 text-white" onClick={handleSearchButtonClick} />
    </div>
  );
};

export default SearchInput;
