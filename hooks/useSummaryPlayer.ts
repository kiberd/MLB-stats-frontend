import React, { useEffect, useState } from "react";
import {
  getAvgValue,
  getPowerValue,
  getOPSValue,
  getOnBaseValue,
} from "../utils/calc";


const useSummaryPlayer = (player: any, type: string) => {

  const [summaryData, setSummaryData] = useState<any[]>([]);

  useEffect(() => {
    const battingRecord = player._source.player.career_batting;

    console.log(battingRecord)

    setSummaryData([
      {
        letter: "OnBase",
        value: getOnBaseValue(battingRecord).toFixed(3),
      },
      {
        letter: "OPS",
        value: getOPSValue(battingRecord).toFixed(3),
      },
      {
        letter: "Power",
        value: getPowerValue(battingRecord).toFixed(3),
      },
      {
        letter: "Contact",
        value: getAvgValue(battingRecord).toFixed(3),
      },
    ]);
  }, [player]);

  return summaryData;
};

export default useSummaryPlayer;
