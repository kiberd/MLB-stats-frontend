import React, { useState, useEffect } from "react";
import SearchInput from "../search/SearchInput";
import RadarChart from "../chart/RadarChart";
import ParentSize from "@visx/responsive/lib/components/ParentSize";
import CompareSearchResultCard from "./CompareSearchResultCard";
import ComparePlayerCard from "./ComparePlayerCard";
import { SearchPlayersParams } from "params";
import useQueryDebounce from "../../hooks/useQueryDebounce";
import useSearchPlayers from "../../hooks/useSearchPlayers";
import ClipLoader from "react-spinners/ClipLoader";
import HorizontalBarChart from "../chart/HorizontalBarChart";

const mockdata = [
  { letter: "OnBase", value: "0.313" },
  { letter: "OPS", value: "0.283" },
  { letter: "Power", value: "0.253" },
  { letter: "Contact", value: "0.441" },
];

const CompareContainer = () => {
  const [playerName, setPlayerName] = useState<string>();
  const [playerList, setPlayerList] = useState<any[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerName(e.target.value);
  };

  const debouncedPlayerName = useQueryDebounce(playerName, 500);

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
      (player) => player.playerid === data.playerid
    );
    if (isExist) {
      alert("선수비교 목록에 이미 있습니다.");
    } else {
      const newPlayerList = [...playerList];
      newPlayerList.push(data);
      setPlayerList(newPlayerList);
    }
  };

  const handleRemoveClick = (data: any) => {
    const newPlayerList = playerList.filter(
      (player) => player.playerid !== data.playerid
    );
    setPlayerList(newPlayerList);
  };

  return (
    <>
      {/* 상단 info */}
      <div className="flex justify-between py-4 border-b-2 border-gray-300">
        <span className="text-3xl font-bold">Comparison tool</span>
      </div>

      <div className="min-h-[100px] border border-gray-300 rounded-md mt-2 grid grid-cols-4 p-5 w-full gap-2">
        {playerList &&
          playerList.map((data) => (
            <ComparePlayerCard
              key={data.playerid}
              data={data}
              onHandleRemoveClick={handleRemoveClick}
            />
          ))}
      </div>

      {/* 선수 비교 */}
      <div className="flex justify-center w-full mt-2">
        {/* Left */}
        <div className="flex flex-col w-[60%] border-r border-gray-300 mr-2">
          {/* RadarChart */}
          <div className="w-full h-[400px] p-2">
            {mockdata && (
              <ParentSize>
                {({ width, height }) => (
                  <RadarChart width={width} height={height} data={mockdata} />
                )}
              </ParentSize>
            )}
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col w-[40%] rounded-md p-1">
          {/* SearchInput */}
          <div className="flex items-center mb-2">
            <input
              type="text"
              className="w-full px-3 py-1 mr-2 text-base font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 rounded-md outline-none tablet:w-auto "
              placeholder="선수 검색"
              onChange={handleInputChange}
            />
          </div>

          {/* SearchResult */}
          <div className="h-[35vh] overflow-auto border border-gray-300 rounded-md">
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
                  data={player._source.player}
                  onHandleAddClick={handleAddClick}
                />
              ))}
          </div>
        </div>
      </div>

      <div className="w-full h-full border border-gray-300 rounded-md">
        <ParentSize>
          {({ width, height }) => (
            <HorizontalBarChart width={width} height={height} />
          )}
        </ParentSize>
      </div>
    </>
  );
};

export default CompareContainer;
