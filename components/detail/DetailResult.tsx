import React, { useState } from "react";
import { Switch } from "@headlessui/react";
import { CustomTooltip } from "../CustomTooltip";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import StatTable from "../chart/StatTable";
import useMakeTableData from "../../hooks/useMakeTableData";

interface DetailResultProps {
  data: any;
}

const DetailResult: React.FC<DetailResultProps> = ({ data }) => {
  //   console.log(data);

  const [enabled, setEnabled] = useState<boolean>(true);
  const { columns, rowData } = useMakeTableData(data._source.player.batting);

  console.log(columns);
  console.log(rowData);

  return (
    <div className="container max-w-5xl min-h-full py-10 mx-auto bg-transparent">
      {/* 상단 info */}
      <div className="flex justify-between py-4 border-b-2 border-gray-300">
        <span className="text-3xl font-bold">
          {data._source.player.namefirst} {data._source.player.namelast}
        </span>

        <div className="flex items-center justify-center">
          <CustomTooltip message="투수 / 타자 기록 전환">
            <InformationCircleIcon className="w-4 h-4 mr-2" />
          </CustomTooltip>

          <Switch
            checked={enabled}
            onChange={setEnabled}
            className={`${
              enabled ? "bg-[#115E59]" : "bg-gray-200"
            } relative inline-flex h-5 w-10 items-center rounded-full`}
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

      {/* 요약 정보 */}
      <div className="flex justify-between px-8 mt-5">
        {/* Left */}
        <div className="flex flex-col mt-3 text-sm text-gray-700">
          <span className="mb-1 text-gray-400">
            {data._source.player.throws === "R" ? "우" : "좌"}투{" "}
            {data._source.player.bats === "R" ? "우" : "좌"}타{" "}
          </span>
          <span className="mb-1">
            출생 : {data._source.player.birthyear}-
            {data._source.player.birthmonth}-{data._source.player.birthday}{" "}
          </span>
          <span className="mb-1">
            국적 : {data._source.player.birthcity},{" "}
            {data._source.player.birthcountry}
          </span>
          <span className="mb-1">데뷔 : {data._source.player.debut}</span>
          {/* <span>은퇴 : {data._source.player.finalgame}</span> */}
        </div>

        {/* Right */}
        <div className="flex flex-col items-center justify-center p-4 border border-gray-400 rounded-md">
          <span className="mb-4 text-base font-bold">통산요약기록</span>

          <div className="flex justify-around w-[20vw]">
            <div>
              <div className="text-center text-gray-400">타수</div>
              <div className="text-center">
                {data._source.player.career_batting.ab.toLocaleString()}
              </div>
            </div>

            <div>
              <div className="text-center text-gray-400">타율</div>
              <div className="text-center">
                {data._source.player.career_batting.avg}
              </div>
            </div>

            <div>
              <div className="text-center text-gray-400">안타</div>
              <div className="text-center">
                {data._source.player.career_batting.hits.toLocaleString()}
              </div>
            </div>

            <div>
              <div className="text-center text-gray-400">홈런</div>
              <div className="text-center">
                {data._source.player.career_batting.homeruns.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 세부 정보 */}
      <div className="px-8 mt-12">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold">타격기록</span>
          <span className="mt-4 mr-10 text-sm font-bold underline cursor-pointer"><a>엑셀저장</a></span>
        </div>

        <div className="w-[48vw] border-teal-800 border-b-[3px] mt-3"></div>

        <div className="mt-4">
          {rowData && <StatTable columns={columns} data={rowData} />}
        </div>
      </div>
    </div>
  );
};

export default DetailResult;
