import React, { useEffect, useState } from "react";
import { cleanAverageString } from "../utils/cleans";

import {
  AnimatedAxis,
  AnimatedGrid,
  AnimatedLineSeries,
  Tooltip,
  XYChart,
} from "@visx/xychart";
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import Chart from "./Chart";
import RadarChart from "./RadarChart";
import ListBox from "./ListBox";


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
      <div className="flex p-6 border border-gray-300 rounded-md h-[35vh]">
        {/* Left Side */}
        <div className="w-[30%] h-full border-r border-gray-300 pr-4">

          {/* Name */}
          <div className="text-lg font-bold h-[10%] ">{player._source.player.name}</div>

          {/* Record */}
          <div className="h-[15%]  flex items-center">
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

          {/* Radar Chart */}
          <div className="h-[75%] ">
            <ParentSize>{({ width, height }) => <RadarChart width={width} height={height} />}</ParentSize>
          </div>

        </div>

        {/* Right Side */}
        <div className="ml-2 w-[70%] h-full">


          <div className="flex justify-between h-[10%]">
          <div className="w-[20%] ml-10">
            <ListBox />
          </div>

          <div className="mr-10 text-center">
            <button className="border border-gray-100 rounded-md bg-[#115E59] text-white text-sm px-3 py-2">Detail</button>
          </div>

          </div>





          <div className="h-[90%]">
            {targetData && <Chart data={targetData} accessors={accessors} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultCard;
