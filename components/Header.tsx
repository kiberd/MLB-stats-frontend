import React from "react";
import SearchInput from "./SearchInput";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <header className="sticky top-0 flex items-center justify-between h-[7vh] p-4 font-bold text-white bg-teal-800 z-10">
      <h1 className="flex items-center justify-center text-xl">
        
        <Link href="/">
          {/* <Image
            src='/logo.png'
            width={110}
            height={60}
          // layout="fill"
          /> */}
          Logo
          </Link>
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
