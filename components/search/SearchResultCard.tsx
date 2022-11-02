import React, { useEffect, useState } from "react";
import { cleanAverageString } from "../../utils/cleans";
import Router, { useRouter } from "next/router";
import ParentSize from "@visx/responsive/lib/components/ParentSize";
import LineChart from "../chart/LineChart";
import RadarChart from "../chart/RadarChart";
import ListBox from "../ListBox";
import { Switch } from "@headlessui/react";
import ReactTooltip from "react-tooltip";

import { InformationCircleIcon } from "@heroicons/react/24/solid";

import { useCleansPlayer } from "../../hooks/useCleansPlayer";
import { useSummaryPlayer } from "../../hooks/useSummaryPlayer";
// import { summaryPlayer } from "../../utils/calc";

interface SearchResultCardProps {
  player: any;
}

const typeList = ["pitching", "batting"];

const SearchResultCard: React.FC<SearchResultCardProps> = ({ player }) => {


  const [indicator, setIndicator] = useState<string>("avg");
  const [type, setType] = useState<string>(typeList[0]);

  const [validate, setValidate] = useState<boolean>(true);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  const [isPitching, setIsPitching] = useState(false);

  const lineChartData = useCleansPlayer(player, indicator, type);
  const summaryData = useSummaryPlayer(player, type);

  useEffect(() => {
    isPitching ? setType(typeList[0]) : setType(typeList[1]);
  }, [isPitching]);

  useEffect(() => {
    if (summaryData) {
    
     setValidate(true);

      summaryData.map((data: any) => {
        if (Number(data.value) === 0 || Number(data.value) === 1) {
          setValidate(false);
        }
      });
    }
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
          <div className="text-lg font-bold h-[10%] flex justify-between items-center">
            <span>{player._source.player.name}</span>

            <div className="flex items-center">
              <div>
                <button
                  className="tablet:hidden border border-gray-100 rounded-lg bg-[#115E59] text-white text-[10px] px-2 mr-1"
                  onClick={handleDetailClick}
                >
                  Detail
                </button>
              </div>

              <Switch
                checked={isPitching}
                onChange={() => setIsPitching(!isPitching)}
                className={`${
                  isPitching ? "bg-[#115E59]" : "bg-gray-200 mr-4"
                } relative inline-flex h-5 w-10 items-center rounded-full mr-4`}
              >
                <span
                  className={`${
                    isPitching ? "translate-x-6" : "translate-x-1"
                  } inline-block h-3 w-3 transform rounded-full bg-white transition`}
                />
              </Switch>

              <InformationCircleIcon
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                className="w-4 h-4 mr-2"
                data-for="result-description"
                data-tip
              />

              {showTooltip ? (
                <ReactTooltip
                  id="result-description"
                  getContent={(dataTip) =>
                    "각 지표의 최대값은 역대 메이저리그 기록의 최대값 기준입니다."
                  }
                />
              ) : null}
            </div>
          </div>

          {/* Record */}
          <div className="h-[10%] flex items-center mb-1">
            {isPitching ? (
              <>
                <span className="text-xs text-gray-500">
                  {
                    player._source.player.pitching.filter(
                      (x: any) => x.stint == 1
                    ).length
                  }{" "}
                  년 &#183;{"   "}
                </span>

                <span className="ml-1 text-xs text-gray-500">
                  {player._source.player.career_pitching.win} 승 /{" "}
                  {player._source.player.career_pitching.lose} 패
                </span>
              </>
            ) : (
              <>
                <span className="text-xs text-gray-500">
                  {
                    player._source.player.batting.filter(
                      (x: any) => x.stint == 1
                    ).length
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
              </>
            )}
          </div>

          {/* Radar Chart */}
          <div className="h-[80%]">
            {validate && summaryData ? (
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
              <ListBox
                onHandleIndicatorChange={handleIndicatorChange}
                type={type}
              />
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
            {lineChartData && lineChartData.length > 0 ? (
              <ParentSize>
                {({ width, height }) => (
                  <LineChart
                    data={lineChartData}
                    indicator={indicator}
                    width={width}
                    height={height}
                  />
                )}
              </ParentSize>
            ) : (
              <div className="flex items-center justify-center h-full text-xs text-gray-400">
                투수 기록이 존재하지 않습니다.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultCard;
