import React, { useEffect, useState } from "react";
import { cleanAverageString } from "../../utils/cleans";
import Router, { useRouter } from "next/router";
import {
  AnimatedAxis,
  AnimatedGrid,
  AnimatedLineSeries,
  Tooltip,
  XYChart,
} from "@visx/xychart";
import ParentSize from "@visx/responsive/lib/components/ParentSize";
import LineChart from "../chart/LineChart";
import RadarChart from "../chart/RadarChart";
import ListBox from "../ListBox";
import { Switch } from "@headlessui/react";
import { CustomTooltip } from "../CustomTooltip";

import { InformationCircleIcon } from "@heroicons/react/24/solid";

import useCleansPlayer from "../../hooks/useCleansPlayer";
import useSummaryPlayer from "../../hooks/useSummaryPlayer";

interface SearchResultCardProps {
  player: any;
}

const SearchResultCard: React.FC<SearchResultCardProps> = ({ player }) => {
  const [indicator, setIndicator] = useState<string>("avg");
  const [type, setType] = useState<string>("batting");
  const [validate, setValidate] = useState<boolean>(true);

  const lineChartData = useCleansPlayer(player, indicator);
  const summaryData = useSummaryPlayer(player, type);

  useEffect(() => {
    // 종합 데이터중 하나라도 이상한 값 (0 or max) 이 있으면 set validate false
    summaryData.map((data) => {
      if (Number(data.value) === 0 || Number(data.value) === 1)
        setValidate(false);
    });
  }, [summaryData]);

  const handleIndicatorChange = (indi: any) => {
    setIndicator(indi.value);
  };

  const handleDetailClick = () => {
    if (player) {
      const id = player._source.player.playerid;
      Router.push({
        pathname: "/detail",
        query: {
          id: id,
        },
      });
    }
  };

  return (
    <div className="py-3">
      <div className="flex p-6 border border-gray-300 rounded-md h-[300px]">

        
        {/* Left Side */}
        <div className="w-full tablet:w-[35%] laptop:w-[30%] h-full tablet:border-r tablet:border-gray-300 tablet:pr-4">
          {/* Name */}
          <div className="text-lg font-bold h-[10%] flex justify-between">
            <span>{player._source.player.name}</span>

            <div className="flex items-center">
              <button
                className="tablet:hidden border border-gray-100 rounded-lg bg-[#115E59] text-white text-[10px] px-2 mb-2"
                onClick={handleDetailClick}
              >
                Detail
              </button>
              {/* <CustomTooltip message="각 지표의 최대값은 역대 메이저리그 기록의 최대값 기준입니다.">
                <InformationCircleIcon className="w-4 h-4 mr-2" />
              </CustomTooltip> */}

              {/* <Switch
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
              </Switch> */}
            </div>
          </div>

          {/* Record */}
          <div className="h-[10%] flex items-center mb-1">
            <span className="text-xs text-gray-500">
              {
                player._source.player.batting.filter((x: any) => x.stint == 1)
                  .length
              }{" "}
              년 &#183;{"   "}
            </span>

            <span className="ml-1 text-xs text-gray-500">
              타율 :{" "}
              {cleanAverageString(player._source.player.career_batting.avg)}
              {"   "} / 안타 :{" "}
              {player._source.player.career_batting.hits.toLocaleString()}
              {"   "} / 홈런 :{" "}
              {player._source.player.career_batting.homeruns.toLocaleString()}
            </span>
          </div>

          {/* Radar Chart */}
          <div className="h-[80%]">
            {validate ? (
              <ParentSize>
                {({ width, height }) => (
                  <RadarChart
                    width={width}
                    height={height}
                    data={summaryData}
                  />
                )}
              </ParentSize>
            ) : (
              <div className="flex items-center justify-center h-full text-xs text-gray-400">
                분석할 데이터가 충분하지 않습니다.
              </div>
            )}
          </div>
        </div>

        {/* Right Side */}
        <div className="ml-2 tablet:w-[65%] laptop:w-[70%] h-full hidden tablet:block">
          <div className="flex justify-between h-[10%]">
            <div className="w-[30%] laptop:w-[20%] ml-4">
              <ListBox onHandleIndicatorChange={handleIndicatorChange} />
            </div>

            <div className="mr-10 text-center">
              <button
                className="border border-gray-100 rounded-md bg-[#115E59] text-white text-sm px-3 py-2"
                onClick={handleDetailClick}
              >
                Detail
              </button>
            </div>
          </div>

          <div className="h-[90%]">
            {lineChartData && (
              <LineChart data={lineChartData} indicator={indicator} />
            )}
          </div>
        </div>


      </div>
    </div>
  );
};

export default SearchResultCard;
