import React, { useEffect, useState } from "react";
import { cleanAverageString } from "../utils/cleans";

import {
  AnimatedAxis,
  AnimatedGrid,
  AnimatedLineSeries,
  Tooltip,
  XYChart,
} from "@visx/xychart";
import ParentSize from "@visx/responsive/lib/components/ParentSize";
import Chart from "./Chart";
import RadarChart from "./RadarChart";
import ListBox from "./ListBox";
import { Switch } from "@headlessui/react";

import {
  InformationCircleIcon
} from "@heroicons/react/24/solid";


const accessors = {
  xAccessor: (d: any) => d.x,
  yAccessor: (d: any) => d.y,
};

interface SearchResultCardProps {
  player: any;
}

const SearchResultCard: React.FC<SearchResultCardProps> = ({ player }) => {

  console.log(player);

  const [enabled, setEnabled] = useState(false);
  const [targetData, setTargetData] = useState<any>();
  const [indicator, setIndicator] = useState<string>("avg");

  useEffect(() => {
    const indicatorArry: any = [];

    player._source.player.batting.map((record: any) => {
      const year = record.yearid.toString();
      const indi = Number(record[indicator]);

      const recordObj = {
        x: year,
        y: indi,
        count: 1,
      };

      const duppIndex = indicatorArry.findIndex((e: any) => e.x === year);

      if (duppIndex !== -1) {
        // do something
        const oldIndi = indicatorArry[duppIndex].y;
        indicatorArry[duppIndex].y = indi + oldIndi;
        indicatorArry[duppIndex].count += 1;
      } else {
        indicatorArry.push(recordObj);
      }
    });

    const filterdIndicatorArry: any = [];

    indicatorArry.map((indicatorObj: any) => {
      const filterdObj = indicatorObj;

      if (indicator === "avg") {
        filterdObj.y = (indicatorObj.y / indicatorObj.count).toFixed(3);
      } else {
        filterdObj.y = indicatorObj.y;
      }

      delete filterdObj.count;

      filterdIndicatorArry.push(filterdObj);
    });

    setTargetData(filterdIndicatorArry);
  }, [indicator]);

  const handleIndicatorChange = (indi: any) => {
    setIndicator(indi.value);
  };

  return (
    <div className="py-3">
      <div className="flex p-6 border border-gray-300 rounded-md h-[35vh]">
        {/* Left Side */}
        <div className="w-[30%] h-full border-r border-gray-300 pr-4">
          {/* Name */}
          <div className="text-lg font-bold h-[10%] flex justify-between">
            {player._source.player.name}
            <div className="flex items-center">
              <InformationCircleIcon className="w-4 h-4 mr-2" />
              <Switch
                checked={enabled}
                onChange={setEnabled}
                className={`${
                  enabled ? "bg-[#115E59]" : "bg-gray-200 mr-4"
                } relative inline-flex h-5 w-10 items-center rounded-full mr-4`}
              >
                <span className="sr-only">Enable notifications</span>
                <span
                  className={`${
                    enabled ? "translate-x-6" : "translate-x-1"
                  } inline-block h-3 w-3 transform rounded-full bg-white transition`}
                />
              </Switch>
            </div>
          </div>

          {/* Record */}
          <div className="h-[15%]  flex items-center">
            <span className="text-sm text-gray-500">
              {
                player._source.player.batting.filter((x: any) => x.stint == 1)
                  .length
              }{" "}
              년 &#183;{"   "}
            </span>

            <span className="ml-1 text-sm text-gray-500">
              타율 :{" "}
              {cleanAverageString(player._source.player.career_batting.avg)}
              {"   "} / 안타 :{" "}
              {player._source.player.career_batting.hits.toLocaleString()}
              {"   "} / 홈런 :{" "}
              {player._source.player.career_batting.homeruns.toLocaleString()}
            </span>
          </div>

          {/* Radar Chart */}
          <div className="h-[75%] ">
            <ParentSize>
              {({ width, height }) => (
                <RadarChart width={width} height={height} />
              )}
            </ParentSize>
          </div>
        </div>

        {/* Right Side */}
        <div className="ml-2 w-[70%] h-full">
          <div className="flex justify-between h-[10%]">
            <div className="w-[20%] ml-4">
              <ListBox onHandleIndicatorChange={handleIndicatorChange} />
            </div>

            <div className="mr-10 text-center">
              <button className="border border-gray-100 rounded-md bg-[#115E59] text-white text-sm px-3 py-2">
                Detail
              </button>
            </div>
          </div>

          <div className="h-[90%]">
            {targetData && (
              <Chart
                data={targetData}
                accessors={accessors}
                indicator={indicator}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultCard;
