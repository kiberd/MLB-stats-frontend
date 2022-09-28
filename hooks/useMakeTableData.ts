import { abort } from "process";
import React, { useEffect, useState, useMemo } from "react";

const useMakeTableData = (battingRecord: any) => {
  // console.log(battingRecord);

  const [rowData, setRowData] = useState<any>();

  useEffect(() => {
    if (battingRecord) {
      const recordArry: any[] = [];

      battingRecord.map((record: any) => {
        recordArry.push({
          yearid: record.yearid,
          teamid: record.teamid,
          leagueid: record.leagueid,
          games: record.games,
          ab: record.ab,
          runs: record.runs,
          hits: record.hits,
          doubles: record.doubles,
          triples: record.triples,
          homeruns: record.homeruns,
          rbi: record.rbi,
          sb: record.sb,
          // cs: record.cs,
          bb: record.bb,
          so: record.so,
          ibb: record.ibb
        });
      });

      setRowData(recordArry);
    }
  }, [battingRecord]);

  const columns = useMemo(
    () => [
      {
        accessor: "yearid",
        Header: "연도",
      },
      {
        accessor: "teamid",
        Header: "팀",
      },
      {
        accessor: "leagueid",
        Header: "리그",
      },
      {
        accessor: "games",
        Header: "경기수",
      },
      {
        accessor: "ab",
        Header: "타수",
      },
      {
        accessor: "runs",
        Header: "득점",
      },
      {
        accessor: "hits",
        Header: "안타",
      },
      {
        accessor: "doubles",
        Header: "2루타",
      },
      {
        accessor: "triples",
        Header: "3루타",
      },
      {
        accessor: "homeruns",
        Header: "홈런",
      },
      {
        accessor: "rbi",
        Header: "타점",
      },
      {
        accessor: "sb",
        Header: "도루",
      },
      // {
      //   accessor: "cs",
      //   Header: "도루실패",
      // },
      {
        accessor: "bb",
        Header: "볼넷",
      },
      {
        accessor: "so",
        Header: "삼진",
      },
      {
        accessor: "ibb",
        Header: "고의사구",
      },
    ],
    []
  );

  //   const rowData = useMemo(() => targetData, []);

  return { columns, rowData };
};

export default useMakeTableData;
