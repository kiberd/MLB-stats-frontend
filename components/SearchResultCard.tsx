import React, { useEffect, useState } from "react";
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
  // { x: "2019", y: 20 },
  // { x: "2018", y: 50 },
  // { x: "2017", y: 10 },
  // { x: "2016", y: 20 },
  // { x: "2015", y: 50 },
  // { x: "2014", y: 10 },
  // { x: "2013", y: 20 },
  // { x: "2012", y: 50 },
  // { x: "2011", y: 10 },
  // { x: "2010", y: 20 },
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
  console.log(player);

  const [targetData, setTargetData] = useState<any>();

  useEffect(() => {
    if (player) {
      // console.log(player);
      const avgArry: any = [];

      player._source.player.batting.map((record: any) => {
        const recordObj = {
          x: record.yearid.toString(),
          y: Number(Number(record.avg).toFixed(3)),
          // y: record.homeruns,
          // y: record.runs,
        };

        // if (avgArry)

        avgArry.push(recordObj);
      });

      // console.log(avgArry);
      setTargetData(avgArry);
    }
  }, [player]);

  return (
    <div className="py-3">
      <div className="flex p-6 bg-gray-400 border border-gray-300 rounded-md h-[35vh]">
        {/* Left Side */}
        <div className="bg-red-300 w-[30%]">
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
        <div className="ml-2 bg-blue-300 w-[70%]">
          {targetData && <Chart data={targetData} accessors={accessors} />}
        </div>
      </div>
    </div>
  );
};

export default SearchResultCard;
