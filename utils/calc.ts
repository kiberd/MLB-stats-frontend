// 점수 계산 (max 수치는 역대 최고기록 기준)

// Power : 장타율 (max : 4)
// Speed : 도루 (max: 130)
// Contact : 타율 (max: 0.4)
// OnBase : 출루율 (max: 0.6)

export const getPowerValue = (battingRecord: any) => {
  const powerValue =
    (battingRecord.hits +
      battingRecord.doubles +
      battingRecord.triples * 2 +
      battingRecord.homeruns * 3) /
    battingRecord.ab;

  return powerValue < 0.863 ? powerValue / 0.863 : 1;
};

export const getAvgValue = (battingRecord: any) => {
  const avgValue = Number(battingRecord.avg);

  return avgValue < 0.426 ? avgValue / 0.426 : 1;
};

export const getOPSValue = (battingRecord: any) => {
  const opsValue = Number(
    getOnBaseValue(battingRecord) + getPowerValue(battingRecord)
  );

  // return opsValue < 1.422 ? opsValue / 1.422 : 1;
  return opsValue < 2 ? opsValue / 2 : 1;
};

export const getOnBaseValue = (battingRecord: any) => {
  const onBaseValue =
    (battingRecord.hits + battingRecord.bb + battingRecord.hbp) /
    (battingRecord.ab +
      battingRecord.bb +
      battingRecord.hbp +
      battingRecord.sf);

  return onBaseValue < 0.6 ? onBaseValue / 0.6 : 1;
};
