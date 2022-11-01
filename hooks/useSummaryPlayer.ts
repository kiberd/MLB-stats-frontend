import React, { useState, useEffect } from "react";
import {
  getPowerValue,
  getAvgValue,
  getOPSValue,
  getOnBaseValue,
  getWinValue,
  getEraValue,
  getSoValue,
  getInningValue,
} from "../utils/calc";

export const useSummaryPlayer = (player: any, type: string) => {
  const [summaryData, setSummaryData] = useState<any>();

  useEffect(() => {
    const years = player._source.player[type].filter(
      (x: any) => x.stint == 1
    ).length;

    let record;
    if (type === "batting") {
      record = player._source.player.career_batting;
    } else {
      record = player._source.player.career_pitching;
    }

    if (type === "batting") {
      setSummaryData([
        {
          letter: "OnBase",
          value: getOnBaseValue(record).toFixed(3),
        },
        {
          letter: "OPS",
          value: getOPSValue(record).toFixed(3),
        },
        {
          letter: "Power",
          value: getPowerValue(record).toFixed(3),
        },
        {
          letter: "Contact",
          value: getAvgValue(record).toFixed(3),
        },
      ]);
    } else {
      setSummaryData([
        {
          letter: "Win",
          value: getWinValue(record, years).toFixed(3),
        },
        {
          letter: "ERA",
          value: getEraValue(record, years).toFixed(3),
        },
        {
          letter: "SO",
          value: getSoValue(record, years).toFixed(3),
        },
        {
          letter: "Inning",
          value: getInningValue(record, years).toFixed(3),
        },
      ]);
    }
  }, [player, type]);

  return summaryData;
};
