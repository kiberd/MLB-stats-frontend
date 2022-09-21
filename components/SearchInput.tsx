import React from "react";
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'

const SearchInput = () => {
  return (
    <div className="flex items-center">
      <input
        type="text"
        className="px-3 py-1 m-0 mr-2 text-base font-normal text-gray-700 transition ease-in-out bg-white border rounded-md outline-none border-gray-50 "
        placeholder="선수 검색"
      />
      <MagnifyingGlassIcon className="w-5 h-5 text-white" />
    </div>
  );
};

export default SearchInput;
