import React from "react";
import SearchInput from "../search/SearchInput";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <header className="sticky top-0 flex items-center justify-between h-[7vh] p-4 font-bold text-white bg-teal-800 z-10">


      <h1 className="flex items-center justify-center text-lg tablet:text-xl">
        <Link href="/">MLB-Stats</Link>
      </h1>


      <nav className="flex items-center ml-1 tablet:px-4">
        <div className="mr-4 text-sm text-gray-400 tablet:mr-10">
          <Link href="/compare">
            <a>선수비교</a>
          </Link>
        </div>
        <SearchInput />
      </nav>


    </header>
  );
};

export default Header;
