import React, { useState, useEffect } from "react";
import CompareRaderChart from "../chart/CompareRaderChart";
import ParentSize from "@visx/responsive/lib/components/ParentSize";
import CompareSearchResultCard from "./CompareSearchResultCard";
import ComparePlayerCard from "./ComparePlayerCard";
import useQueryDebounce from "../../hooks/useQueryDebounce";
import useSearchPlayers from "../../hooks/useSearchPlayers";
import ClipLoader from "react-spinners/ClipLoader";
import HorizontalBarChart from "../chart/HorizontalBarChart";
import { summaryPlayer, makeBarChartData } from "../../utils/calc";
// import { useSummaryPlayer } from "../../hooks/useSummaryPlayer";
import { XMarkIcon, InformationCircleIcon } from "@heroicons/react/24/solid";
import ReactTooltip from "react-tooltip";

const initColorState = [
  {
    name: "green",
    used: false,
  },
  {
    name: "red",
    used: false,
  },
  {
    name: "blue",
    used: false,
  },
  {
    name: "orange",
    used: false,
  },
];

const CompareContainer = () => {
  const [playerName, setPlayerName] = useState<string>();
  const [playerList, setPlayerList] = useState<any[]>([]);

  const [radarChartData, setRadarChartData] = useState<any[]>([]);
  const [summaryBarChartData, setSummaryBarChartData] = useState<any>();

  const [colorState, setColorState] = useState(initColorState);
  const [searchResultVisible, setSearchResultVisible] =
    useState<boolean>(false);

  const [radarTooltipShow, setRadarTooltipShow] = useState<boolean>(false);
  const [chartTooltipShow, setChartTooltipShow] = useState<boolean>(false);

  const debouncedPlayerName = useQueryDebounce(playerName, 500);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerName(e.target.value);
  };

  useEffect(() => {
    // Set RadarChart data
    const newRadarChartDataList: any[] = [];
    playerList.map((player) => {
      const summaryData = summaryPlayer(player, "batting");
      const obj = {
        name: player._source.player.name,
        color: player.color,
        data: summaryData,
      };
      newRadarChartDataList.push(obj);
    });
    setRadarChartData(newRadarChartDataList);

    const chartData = makeBarChartData(playerList);
    const playerInfoData: any[] = [];

    playerList.map((player) => {
      const obj = {
        name: player._source.player.name,
        color: player.color,
      };

      playerInfoData.push(obj);
    });

    const barDataObj = {
      playerInfoData: playerInfoData,
      chartData: chartData,
    };

    setSummaryBarChartData(barDataObj);
  }, [playerList]);

  const {
    data,
    isLoading,
    isFetching,
    isError,
  }: { data: any; isLoading: any; isFetching: any; isError: any } =
    useSearchPlayers(
      debouncedPlayerName
        ? {
            name: debouncedPlayerName,
            resultSize: 100,
            startingIndex: 0,
          }
        : null
    );

  const handleAddClick = (data: any) => {
    const isExist = playerList.some(
      (player) =>
        player._source.player.playerid === data._source.player.playerid
    );

    let isValid = true;
    const summaryData = summaryPlayer(data, "batting");

    summaryData.map((data: any) => {
      if (Number(data.value) === 0 || Number(data.value) === 1) isValid = false;
    });

    if (isExist) {
      alert("선수비교 목록에 이미 있습니다.");
    } else if (!isValid) {
      alert("분석할 데이터가 부족합니다.");
    } else if (playerList.length === 4) {
      alert("최대 선수 비교 수는 4명입니다.");
    } else {
      const newPlayerList = [...playerList];

      let targetColor: any;
      let targetIndex: any;

      colorState.map((color, index) => {
        if (!color.used) {
          targetColor = color.name;
          targetIndex = index;
        }
      });

      const newColorState = [...colorState];
      newColorState[targetIndex].used = true;
      setColorState(newColorState);

      const newDataObj = { ...data, color: targetColor };
      newPlayerList.push(newDataObj);

      setPlayerList(newPlayerList);
      setSearchResultVisible(false);
    }
  };

  const handleRemoveClick = (data: any) => {
    const targetColor = data.color;
    const targetIndex = colorState.findIndex((e) => e.name === targetColor);

    const newColorState = [...colorState];
    newColorState[targetIndex].used = false;
    setColorState(newColorState);

    const newPlayerList = playerList.filter(
      (player) =>
        player._source.player.playerid !== data._source.player.playerid
    );
    setPlayerList(newPlayerList);
  };

  return (
    <>
      <div className="flex justify-between py-4 border-b-2 border-gray-300">
        <span className="text-3xl font-bold">Comparison tool</span>
      </div>
      <div className="pb-2 mt-4 border-b border-gray-300">
        <div className="flex items-center mb-2">
          <input
            type="text"
            className="w-full px-3 py-1 text-base font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 rounded-md outline-none tablet:mr-2 tablet:w-auto "
            placeholder="선수 검색"
            onChange={handleInputChange}
            onFocus={() => setSearchResultVisible(true)}
          />
        </div>
        {searchResultVisible ? (
          <div className="absolute items-center w-[330px] h-96 overflow-auto border border-gray-300 rounded-md overscroll-contain bg-white z-30">
            <div className="flex flex-row-reverse cursor-pointer">
              <XMarkIcon
                className="w-4 h-4 m-2"
                onClick={() => setSearchResultVisible(false)}
              />
            </div>

            {!isLoading && !isFetching && !data ? (
              <div className="flex items-center justify-center w-full h-[21rem] text-sm text-gray-400">
                검색어를 입력해주세요.
              </div>
            ) : null}

            {data && data.hits.length === 0 ? (
              <div className="flex items-center justify-center w-full h-[21rem] text-sm text-gray-400">
                일치하는 항목이 없습니다.
              </div>
            ) : null}

            {isLoading ? (
              <div className="flex items-center justify-center w-full h-[21rem] text-sm text-gray-400">
                <ClipLoader color={"#115E59"} loading={true} size={50} />
              </div>
            ) : null}

            {data &&
              data.hits.map((player: any) => (
                <CompareSearchResultCard
                  key={player._source.player.playerid}
                  player={player}
                  onHandleAddClick={handleAddClick}
                />
              ))}
          </div>
        ) : null}
      </div>

      {playerList.length === 0 ? (
        <div className="items-center justify-center hidden h-full py-4 my-4 text-sm text-gray-400 tablet:flex">
          비교할 선수를 추가해주세요.
        </div>
      ) : null}
      {playerList && playerList.length > 0 ? (
        <fieldset className="overflow-auto tablet:h-auto min-h-[100px] border border-gray-300 rounded-md mt-2 grid tablet:grid-cols-2 desktop:grid-cols-4 p-2 tablet:p-5 w-full gap-2">
          <legend className="font-bold text-[#115E59] p-2">Compare List</legend>

          {playerList &&
            playerList.map((player) => (
              <ComparePlayerCard
                key={player._source.player.playerid}
                player={player}
                onHandleRemoveClick={handleRemoveClick}
              />
            ))}
        </fieldset>
      ) : null}
      <div className="flex flex-col justify-center w-full p-3 mt-2 border border-gray-300 rounded-md tablet:flex-row">
        <div className="flex flex-col w-full border-b border-gray-300 pb-2 tablet:pb-0 tablet:w-[60%] tablet:border-b-0 tablet:border-r tablet:border-gray-300 tablet:mr-2 justify-center">
          <div className="flex items-center justify-between">
            <span className="p-2 text-sm text-gray-400">종합 점수</span>
            <InformationCircleIcon
              className="w-4 h-5 mr-4"
              data-for="radar-description"
              onMouseEnter={() => setRadarTooltipShow(true)}
              onMouseLeave={() => setRadarTooltipShow(false)}
              data-tip
            />
            {radarTooltipShow ? (
              <ReactTooltip
                id="radar-description"
                getContent={(dataTip) =>
                  "각 지표(타율, 장타율, 출루율, OPS) 의 최대값은 역대 메이저리그 기록의 최대값 기준입니다."
                }
              />
            ) : null}
          </div>

          <div className="w-full h-[420px] p-2">
            {radarChartData && (
              <ParentSize>
                {({ width, height }) => (
                  <CompareRaderChart
                    width={width}
                    height={height}
                    data={radarChartData}
                  />
                )}
              </ParentSize>
            )}
          </div>
        </div>

        <div className="tablet:flex flex-col w-full h-[450px] tablet:w-[40%] pt-2 tablet:pt-0">
          <div className="flex items-center justify-between">
            <span className="p-2 text-sm text-gray-400">통산 기록</span>
            <InformationCircleIcon
              className="w-4 h-5 mr-2"
              onMouseEnter={() => setChartTooltipShow(true)}
              onMouseLeave={() => setChartTooltipShow(false)}
              data-for="chart-description"
              data-tip
            />
            {chartTooltipShow ? (
              <ReactTooltip
                id="chart-description"
                getContent={(dataTip) =>
                  "각 지표는 통산기록 최고기록 기준 백분율 점수입니다."
                }
              />
            ) : null}
          </div>

          {summaryBarChartData &&
          summaryBarChartData.playerInfoData.length > 0 ? (
            <ParentSize>
              {({ width, height }) => (
                <HorizontalBarChart
                  width={width}
                  height={height}
                  data={summaryBarChartData}
                />
              )}
            </ParentSize>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default CompareContainer;
