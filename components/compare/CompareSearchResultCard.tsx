import React from "react";
import { ArrowsPointingOutIcon } from "@heroicons/react/24/solid";
import { cleanAverageString } from "../../utils/cleans";

interface CompareSearchResultCardProps {
  player: any;
  onHandleAddClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const CompareSearchResultCard: React.FC<CompareSearchResultCardProps> = ({
  player,
  onHandleAddClick
}) => {

  const handleAddClick = () => {
    onHandleAddClick(player);
  }

  return (
    <div className="flex justify-between px-6 py-3 border-b border-gray-300">
      {/* Left */}
      <div className="flex flex-col">
        <span className="mb-1 text-lg font-semibold">{player._source.player.name}</span>
        <span className="text-[10px] text-gray-400">
          {player._source.player.batting.filter((x: any) => x.stint == 1).length}년 &#183; 타율 :{" "}
          {cleanAverageString(player._source.player.career_batting.avg)} / 안타 :{" "}
          {player._source.player.career_batting.hits.toLocaleString()} / 홈런 :{" "}
          {player._source.player.career_batting.homeruns.toLocaleString()}
        </span>
      </div>

      {/* Right */}
      <div className="flex items-center">
        <button className="border border-gray-100 rounded-md bg-[#115E59] text-white text-[10px] h-[30px] px-4 mr-4" onClick={handleAddClick}>
          추가
        </button>
        {/* <ArrowsPointingOutIcon className="w-4 h-4 cursor-pointer" /> */}
      </div>
    </div>
  );
};

export default CompareSearchResultCard;
