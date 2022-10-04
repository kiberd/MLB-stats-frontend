// 점수 계산 (max 수치는 역대 최고기록 기준)

// Power : 장타율 (max : 0.690)
// OPS : ops (max: 1.164)
// Contact : 타율 (max: 0.366)
// OnBase : 출루율 (max: 0.482)

const getPowerValue = (battingRecord: any) => {
  const powerValue =
    (battingRecord.hits +
      battingRecord.doubles +
      battingRecord.triples * 2 +
      battingRecord.homeruns * 3) /
    battingRecord.ab;

    //0.863
  return powerValue < 0.7 ? powerValue / 0.7 : 1;
};

const getAvgValue = (battingRecord: any) => {
  const avgValue = Number(battingRecord.avg);

  return avgValue < 0.367 ? avgValue / 0.367 : 1;
};

const getOPSValue = (battingRecord: any) => {

  const powerValue =
    (battingRecord.hits +
      battingRecord.doubles +
      battingRecord.triples * 2 +
      battingRecord.homeruns * 3) /
    battingRecord.ab;

  const onBaseValue =
    (battingRecord.hits + battingRecord.bb + battingRecord.hbp) /
    (battingRecord.ab +
      battingRecord.bb +
      battingRecord.hbp +
      battingRecord.sf);


  const opsValue = Number(powerValue + onBaseValue);

  return opsValue < 1.165 ? opsValue / 1.165 : 1;
};

const getOnBaseValue = (battingRecord: any) => {
  const onBaseValue =
    (battingRecord.hits + battingRecord.bb + battingRecord.hbp) /
    (battingRecord.ab +
      battingRecord.bb +
      battingRecord.hbp +
      battingRecord.sf);


  return onBaseValue < 0.483 ? onBaseValue / 0.483 : 1;
};

export const summaryPlayer = (player: any, type: string) => {
  const battingRecord = player._source.player.career_batting;

  return [
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
  ];
};

export const makeBarChartData = (playerList: any) => {
  
  const barChartData: any[] = [
    {
      indicator: "타율",
    },
    {
      indicator: "안타",
    },
    {
      indicator: "2루타",
    },
    {
      indicator: "3루타",
    },
    {
      indicator: "홈런",
    },
    {
      indicator: "타점",
    },
  ];


  playerList.map((player: any) => {

    const name = player._source.player.name;

    const avg = player._source.player.career_batting.avg;
    const hits = player._source.player.career_batting.hits;
    const doubles = player._source.player.career_batting.doubles;
    const triples = player._source.player.career_batting.triples;
    const homeruns = player._source.player.career_batting.homeruns;
    const rbi = player._source.player.career_batting.rbi;

    const years = player._source.player.batting.filter((x: any) => x.stint == 1).length;
    
    barChartData[0][name] = Number(avg) / 0.367 * 100;
    barChartData[1][name] = hits / 4198 * 100;
    barChartData[2][name] = doubles / 792 * 100;
    barChartData[3][name] = triples / 295 * 100;
    barChartData[4][name] = homeruns / 762 * 100;
    barChartData[5][name] = rbi / 2297 * 100;

  })

  return barChartData;
};
