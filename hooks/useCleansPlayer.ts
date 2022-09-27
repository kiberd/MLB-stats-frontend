import React, { useEffect, useState } from "react";

const useCleansPlayer = (player: any, indicator: string) => {
  const [cleansData, setCleansData] = useState<any>();

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

    setCleansData(filterdIndicatorArry);
  }, [indicator]);

  return cleansData;
};

export default useCleansPlayer;
