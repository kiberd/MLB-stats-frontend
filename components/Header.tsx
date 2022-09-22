import React from "react";
import SearchInput from "./SearchInput";
import Link from "next/link";

const Header = () => {
  return (
    <header className="sticky top-0 flex items-center justify-between h-16 p-4 font-bold text-white bg-teal-800">
      <h1 className="text-xl">
        <Link href="/">Logo</Link>
      </h1>
      <nav className="flex items-center px-4">
        <div className="mr-10">
          <Link href="/">
            <a>선수비교</a>
          </Link>
        </div>
        <SearchInput />
      </nav>
    </header>
  );
};

export default Header;
