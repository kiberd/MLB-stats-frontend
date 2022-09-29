import React from "react";
import { ArrowsPointingOutIcon } from "@heroicons/react/24/solid";
import { cleanAverageString } from "../../utils/cleans";

interface CompareSearchResultCardProps {
  data: any;
  onHandleAddClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const CompareSearchResultCard: React.FC<CompareSearchResultCardProps> = ({
  data,
  onHandleAddClick
}) => {

  const handleAddClick = () => {
    onHandleAddClick(data);
  }

  return (
    <div className="flex justify-between px-6 py-3 border-b border-gray-300">
      {/* Left */}
      <div className="flex flex-col">
        <span className="mb-1 text-lg font-semibold">{data.name}</span>
        <span className="text-[10px] text-gray-400">
          {data.batting.filter((x: any) => x.stint == 1).length}년 &#183; 타율 :{" "}
          {cleanAverageString(data.career_batting.avg)} / 안타 :{" "}
          {data.career_batting.hits.toLocaleString()} / 홈런 :{" "}
          {data.career_batting.homeruns.toLocaleString()}
        </span>
      </div>

      {/* Right */}
      <div className="flex items-center">
        <button className="border border-gray-100 rounded-md bg-[#115E59] text-white text-[10px] h-[30px] px-4 mr-4" onClick={handleAddClick}>
          추가
        </button>
        <ArrowsPointingOutIcon className="w-4 h-4" />
      </div>
    </div>
  );
};

export default CompareSearchResultCard;
