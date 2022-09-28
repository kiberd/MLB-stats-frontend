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
          ibb: record.ibb,
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
        Footer: "Total",
      },
      {
        accessor: "teamid",
        Header: "팀",
        Footer: "-",
      },
      {
        accessor: "leagueid",
        Header: "리그",
        Footer: "-",
      },
      {
        accessor: "games",
        Header: "경기수",
        Footer: (d: any) => {
          const total = useMemo(
            () =>
              d.rows.reduce((sum: any, row: any) => row.values.games + sum, 0),
            [d.rows]
          );
          return `${total}`;
        },
      },
      {
        accessor: "ab",
        Header: "타수",
        Footer: (d: any) => {
          const total = useMemo(
            () =>
              d.rows.reduce((sum: any, row: any) => row.values.ab + sum, 0),
            [d.rows]
          );
          return `${total}`;
        },
      },
      {
        accessor: "runs",
        Header: "득점",
        Footer: (d: any) => {
          const total = useMemo(
            () =>
              d.rows.reduce((sum: any, row: any) => row.values.runs + sum, 0),
            [d.rows]
          );
          return `${total}`;
        },
      },
      {
        accessor: "hits",
        Header: "안타",
        Footer: (d: any) => {
          const total = useMemo(
            () =>
              d.rows.reduce((sum: any, row: any) => row.values.hits + sum, 0),
            [d.rows]
          );
          return `${total}`;
        },
      },
      {
        accessor: "doubles",
        Header: "2루타",
        Footer: (d: any) => {
          const total = useMemo(
            () =>
              d.rows.reduce((sum: any, row: any) => row.values.doubles + sum, 0),
            [d.rows]
          );
          return `${total}`;
        },
      },
      {
        accessor: "triples",
        Header: "3루타",
        Footer: (d: any) => {
          const total = useMemo(
            () =>
              d.rows.reduce((sum: any, row: any) => row.values.triples + sum, 0),
            [d.rows]
          );
          return `${total}`;
        },
      },
      {
        accessor: "homeruns",
        Header: "홈런",
        Footer: (d: any) => {
          const total = useMemo(
            () =>
              d.rows.reduce((sum: any, row: any) => row.values.homeruns + sum, 0),
            [d.rows]
          );
          return `${total}`;
        },
      },
      {
        accessor: "rbi",
        Header: "타점",
        Footer: (d: any) => {
          const total = useMemo(
            () =>
              d.rows.reduce((sum: any, row: any) => row.values.rbi + sum, 0),
            [d.rows]
          );
          return `${total}`;
        },
      },
      {
        accessor: "sb",
        Header: "도루",
        Footer: (d: any) => {
          const total = useMemo(
            () =>
              d.rows.reduce((sum: any, row: any) => row.values.sb + sum, 0),
            [d.rows]
          );
          return `${total}`;
        },
      },
      // {
      //   accessor: "cs",
      //   Header: "도루실패",
      // },
      {
        accessor: "bb",
        Header: "볼넷",
        Footer: (d: any) => {
          const total = useMemo(
            () =>
              d.rows.reduce((sum: any, row: any) => row.values.bb + sum, 0),
            [d.rows]
          );
          return `${total}`;
        },
      },
      {
        accessor: "so",
        Header: "삼진",
        Footer: (d: any) => {
          const total = useMemo(
            () =>
              d.rows.reduce((sum: any, row: any) => row.values.so + sum, 0),
            [d.rows]
          );
          return `${total}`;
        },
      },
      {
        accessor: "ibb",
        Header: "고의사구",
        Footer: (d: any) => {
          const total = useMemo(
            () =>
              d.rows.reduce((sum: any, row: any) => row.values.ibb + sum, 0),
            [d.rows]
          );
          return `${total}`;
        },
      },
    ],
    []
  );

  //   const rowData = useMemo(() => targetData, []);

  return { columns, rowData };
};

export default useMakeTableData;
