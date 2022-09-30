import React, { useState, useEffect } from "react";
import SearchInput from "../search/SearchInput";
import CompareRaderChart from "../chart/CompareRaderChart";
import ParentSize from "@visx/responsive/lib/components/ParentSize";
import CompareSearchResultCard from "./CompareSearchResultCard";
import ComparePlayerCard from "./ComparePlayerCard";
import { SearchPlayersParams } from "params";
import useQueryDebounce from "../../hooks/useQueryDebounce";
import useSearchPlayers from "../../hooks/useSearchPlayers";
import ClipLoader from "react-spinners/ClipLoader";
import HorizontalBarChart from "../chart/HorizontalBarChart";
import { summaryPlayer } from "../../utils/calc";
// import useSummaryPlayer from "../../hooks/useSummaryPlayer";

const mockdata = [
  { letter: "OnBase", value: "0.313" },
  { letter: "OPS", value: "0.283" },
  { letter: "Power", value: "0.253" },
  { letter: "Contact", value: "0.441" },
];

// const color = [ "green", "red", "blue", "orange" ]

const CompareContainer = () => {

  const [colorState, setColorState] = useState([
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
    }
  ]);

  const [playerName, setPlayerName] = useState<string>();
  const [playerList, setPlayerList] = useState<any[]>([]);

  const [radarChartData, setRadarChartData] = useState<any[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerName(e.target.value);
  };

  const debouncedPlayerName = useQueryDebounce(playerName, 500);

  useEffect(() => {

    const newRadarChartDataList: any[] = [];

    playerList.map((player) => {

      const summaryData = summaryPlayer(player, "batting");

      const obj = {
        name: player._source.player.name,
        color: player.color,
        // color: "#" + Math.floor(Math.random()*16777215).toString(16),
        data: summaryData
      }
      newRadarChartDataList.push(obj);

    });

    setRadarChartData(newRadarChartDataList);

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
      (player) => player._source.player.playerid === data._source.player.playerid
    );

    let isValid = true;
    const summaryData = summaryPlayer(data, "batting");

    summaryData.map((data) => {
      if (Number(data.value) === 0 || Number(data.value) === 1) isValid = false;
    });

    if (isExist) {
      alert("선수비교 목록에 이미 있습니다.");
    } else if (!isValid) {
      alert("분석할 데이터가 부족합니다.")
    } else if (playerList.length === 4) {
      alert("최대 선수 비교 수는 4명입니다.")
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

      const newDataObj = { ...data, color: targetColor }
      newPlayerList.push(newDataObj);

      setPlayerList(newPlayerList);
    }
  };

  const handleRemoveClick = (data: any) => {

    const targetColor = data.color;
    const targetIndex = colorState.findIndex(e => e.name === targetColor);

    const newColorState = [...colorState];
    newColorState[targetIndex].used = false;
    setColorState(newColorState);

    const newPlayerList = playerList.filter(
      (player) => player._source.player.playerid !== data._source.player.playerid
    );
    setPlayerList(newPlayerList);
  };

  return (
    <>
      {/* 상단 info */}
      <div className="flex justify-between py-4 border-b-2 border-gray-300">
        <span className="text-3xl font-bold">Comparison tool</span>
      </div>

      {playerList.length === 0 ? <div className="hidden tablet:flex justify-center items-center text-gray-400 text-sm my-4 py-4 h-full">비교할 선수를 추가해주세요.</div> : null}


      {/* 모바일 용 선수 검색 */}
      <fieldset className="border border-gray-300 rounded-md mt-2 p-1" >
      <legend className="font-semibold text-gray-700 p-2">Search Player</legend>
      <div className="tablet:hidden flex flex-col w-full tablet:w-[40%] rounded-md p-1">


        {/* SearchInput */}
        <div className="flex items-center mb-2">
          <input
            type="text"
            className="w-full px-3 py-1 tablet:mr-2 text-base font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 rounded-md outline-none tablet:w-auto "
            placeholder="선수 검색"
            onChange={handleInputChange}
          />
        </div>

        {/* SearchResult */}
        <div className=" h-[130px] tablet:h-96 overflow-auto border border-gray-300 rounded-md overscroll-contain">
          {!isLoading && !isFetching && !data ? (
            <div className="flex items-center justify-center w-full h-full text-sm text-gray-400">
              검색어를 입력해주세요.
            </div>
          ) : null}

          {data && data.hits.length === 0 ? (
            <div className="flex items-center justify-center w-full h-full text-sm text-gray-400">
              일치하는 항목이 없습니다.
            </div>
          ) : null}

          {isLoading ? (
            <div className="flex items-center justify-center w-full h-full text-sm text-gray-400">
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
      </div>
      </fieldset>


      {/* 비교 리스트 */}
      {playerList && playerList.length > 0 ?
        <fieldset className=" h-36 overflow-auto tablet:h-auto min-h-[100px] border border-gray-300 rounded-md mt-2 tablet:grid tablet:grid-cols-2 laptop:grid-cols-4 p-5 w-full gap-2">
          <legend className="font-semibold text-gray-700 p-2">Compare List</legend>
          {playerList &&
            playerList.map((player) => (
              <ComparePlayerCard
                key={player._source.player.playerid}
                player={player}
                onHandleRemoveClick={handleRemoveClick}
              />
            ))}
        </fieldset> : null}


      {/* 선수 비교 */}
      <div className="flex flex-col-reverse tablet:flex-row justify-center w-full mt-2 border border-gray-300 rounded-md p-3">



        {/* Left */}
        <div className="flex flex-col w-full tablet:w-[60%] tablet:border-r tablet:border-gray-300 tablet:mr-2 justify-center">


          {/* RadarChart */}
          <div className="w-full h-[420px] p-2">
            {mockdata && (
              <ParentSize>
                {({ width, height }) => (
                  <CompareRaderChart width={width} height={height} data={radarChartData} />
                )}
              </ParentSize>
            )}
          </div>




        </div>

        {/* Right */}
        <div className="hidden tablet:flex flex-col w-full tablet:w-[40%] rounded-md p-1">


          {/* SearchInput */}
          <div className="flex items-center mb-2">
            <input
              type="text"
              className="w-full px-3 py-1 tablet:mr-2 text-base font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 rounded-md outline-none tablet:w-auto "
              placeholder="선수 검색"
              onChange={handleInputChange}
            />
          </div>

          {/* SearchResult */}
          <div className=" h-52 tablet:h-96 overflow-auto border border-gray-300 rounded-md overscroll-contain">
            {!isLoading && !isFetching && !data ? (
              <div className="flex items-center justify-center w-full h-full text-sm text-gray-400">
                검색어를 입력해주세요.
              </div>
            ) : null}

            {data && data.hits.length === 0 ? (
              <div className="flex items-center justify-center w-full h-full text-sm text-gray-400">
                일치하는 항목이 없습니다.
              </div>
            ) : null}

            {isLoading ? (
              <div className="flex items-center justify-center w-full h-full text-sm text-gray-400">
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
        </div>
      </div>

      {/* <div className="w-full h-96 border border-gray-300 rounded-md mt-2 overscroll-contain overflow-auto">
        <ParentSize>
          {({ width, height }) => (
            <HorizontalBarChart width={width} height={height} />
          )}
        </ParentSize>
      </div> */}
    </>
  );
};

export default CompareContainer;
