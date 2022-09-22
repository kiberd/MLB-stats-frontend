import React from "react";
import SearchInput from "./SearchInput";
import InfoCard from "./InfoCard";

import { ArrowTrendingUpIcon, MagnifyingGlassIcon, ArrowDownOnSquareIcon } from '@heroicons/react/24/solid';

const Landing = () => {
  return (
    <div className="container mx-auto bg-transparent">
      <div className="p-10">
        <p className="text-[40px] text-white ml-3">
          엘라스틱 서치를 활용한
          <br /> 메이저리그 기록 검색{" "}
        </p>

        <p className="text-[20px] text-gray-400 ml-3">
          with Lahman’s Baseball Database (~ 2020)
        </p>

        <div className="mt-5 ml-3">
          <SearchInput />
        </div>

        <div className="grid mt-9 gird-cols-1 tablet:grid-cols-3">
          <InfoCard
            title={"Analzye Trends"}
            subTitle={"각 선수의 타격기록을 시각화 합니다."}
            logo={<MagnifyingGlassIcon className="w-20 h-20"/>}
          />
          <InfoCard
            title={"Intelligent Search"}
            subTitle={
              "Elastic Search 의 fuzzy search API를 활용하여 정확한 정보를 제공합니다."
            }
            logo={<ArrowTrendingUpIcon className="w-20 h-20"/>}
          />
          <InfoCard
            title={"Download Statistics"}
            subTitle={"각 선수 프로필 페이지에서 통계자료를 다운로드 할 수 있습니다."}
            logo={<ArrowDownOnSquareIcon className="w-20 h-20"/>}
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;
