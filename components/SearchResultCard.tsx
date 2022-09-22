import React from "react";
import { cleanAverageString } from "../utils/cleans";

import {
  AnimatedAxis,
  AnimatedGrid,
  AnimatedLineSeries,
  Tooltip,
  XYChart,
} from "@visx/xychart";

import Chart from "./Chart";

const data1 = [
  { x: "2021", y: 50 },
  { x: "2020", y: 10 },
  { x: "2019", y: 20 },
];

const data2 = [
  { x: "2021", y: 30 },
  { x: "2020", y: 40 },
  { x: "2019", y: 80 },
];

const accessors = {
  xAccessor: (d: any) => d.x,
  yAccessor: (d: any) => d.y,
};

interface SearchResultCardProps {
  player: any;
}

const SearchResultCard: React.FC<SearchResultCardProps> = ({ player }) => {

  

  return (
    <div className="py-3">
      <div className="flex p-6 border border-gray-300 rounded-md">
        {/* Left Side */}
        <div className="">
          {/* Name */}
          <div className="text-lg font-bold">{player._source.player.name}</div>

          {/* Record */}
          <div className="mt-2">
            <span className="text-sm text-gray-500">
              {
                player._source.player.batting.filter((x: any) => x.stint == 1)
                  .length
              }{" "}
              년 &#183;{" "}
            </span>

            <span className="text-sm text-gray-500">
              타율 :{" "}
              {cleanAverageString(player._source.player.career_batting.avg)}
              {"   "} / 안타 : {player._source.player.career_batting.hits}
              {"   "} / 홈런 : {player._source.player.career_batting.homeruns}
            </span>
          </div>
        </div>

        {/* Right Side */}
        <div className="ml-2">
          <Chart data={data1} accessors={accessors} />
        </div>
      </div>
    </div>
  );
};

export default SearchResultCard;
