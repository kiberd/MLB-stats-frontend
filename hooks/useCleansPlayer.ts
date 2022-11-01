import React, { useEffect, useState } from "react";

export const useCleansPlayer = (player: any, indicator: string, type: string) => {


  const [cleansData, setCleansData] = useState<any>();

  useEffect(() => {

    const targetIndicator = player._source.player[type];
    const indicatorArry: any = [];

    targetIndicator?.map((record: any) => {

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
  }, [indicator, type]);

  // console.log(cleansData);

  return cleansData;
};

