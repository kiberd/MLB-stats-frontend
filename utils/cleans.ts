export const cleanAverageString = (avg: any) => {
  if (isNaN(avg)) {
    return "0.000";
  }
  return avg;
};

export const cleanNanDisplay = (stat: any) => {
  if (typeof stat === "string") {
    if (stat == "") {
      return "-";
    }
    return stat;
  }

  if (isNaN(stat)) {
    return 0;
  }
  return stat;
};

export const cleanNanChart = (stat: any) => {
  if (typeof stat === "string") {
    if (stat === "-" || stat === "") {
      return 0;
    }
    return stat;
  }

  if (isNaN(stat)) {
    return 0;
  }
  return stat;
};

export const cleanChartStats = (battingStats: any, chartStat: any) => {
  return battingStats
    .filter((line: any) => line.stint === 1)
    .map(
      ((stat: any, line: any) => {
        return {
          x: parseInt(`${line.yearid}`),
          y: cleanNanChart(line[`${stat}`]),
        };
      }).bind(null, chartStat)
    );
};

// module.exports = {
//   cleanAverageString,
//   cleanNanDisplay,
//   cleanNanChart,
//   cleanChartStats,
// };
