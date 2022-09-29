import React from "react";
import { cleanAverageString } from "../../utils/cleans";

interface ComparePlayerCardProps {
  data: any;
  onHandleRemoveClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const ComparePlayerCard: React.FC<ComparePlayerCardProps> = ({
  data,
  onHandleRemoveClick,
}) => {
  const handleRemoveClick = () => {
    onHandleRemoveClick(data);
  };

  return (
    <div className="px-4 py-2 border border-gray-300 rounded-md">
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <span className="mb-1 text-base font-semibold">{data.name}</span>
          <button
            className="border border-gray-100 rounded-md bg-[#115E59] text-white text-[10px] h-[30px] px-4"
            onClick={handleRemoveClick}
          >
            제거
          </button>
        </div>

        <div className="flex items-center">
          <span className="text-[10px] text-gray-400">
            {data.batting.filter((x: any) => x.stint == 1).length}년 &#183; 타율
            : {cleanAverageString(data.career_batting.avg)} / 안타 :{" "}
            {data.career_batting.hits.toLocaleString()} / 홈런 :{" "}
            {data.career_batting.homeruns.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ComparePlayerCard;
