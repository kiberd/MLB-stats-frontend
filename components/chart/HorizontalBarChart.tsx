import React from "react";
import { BarGroupHorizontal, Bar } from "@visx/shape";
import { Group } from "@visx/group";
import { AxisLeft, AxisBottom } from "@visx/axis";
import cityTemperature, {
  CityTemperature,
} from "@visx/mock-data/lib/mocks/cityTemperature";
import { scaleBand, scaleLinear, scaleOrdinal } from "@visx/scale";
import { timeParse, timeFormat } from "d3-time-format";
import { IncomingMessage } from "http";

export type BarGroupHorizontalProps = {
  width: number;
  height: number;
  data: any;
  margin?: { top: number; right: number; bottom: number; left: number };
  events?: boolean;
};

type CityName = "New York" | "San Francisco" | "Austin";

const blue = "black";
export const green = "red";
const purple = "green";
export const background = "transparent";
const defaultMargin = { top: 20, right: 20, bottom: 20, left: 40 };

function max<D>(arr: D[], fn: (d: any) => number) {
  return Math.max(...arr.map(fn));
}

const chartData = [
  {
    indicator: "타수",
    player1: 12,
    player2: 23,
    player3: 97,
  },
  {
    indicator: "홈런",
    player1: 12,
    player2: 23,
    player3: 97,
  },
  {
    indicator: "안타",
    player1: 12,
    player2: 23,
    player3: 97,
  },
];

const keys = Object.keys(chartData[0]).filter((d) => d !== "indicator");

// accessors
const getIndicator = (d: any) => d.indicator;

// scales
const indicatorScale = scaleBand({
  domain: chartData.map(getIndicator),
  padding: 0.1,
});
const playerScale = scaleBand({
  domain: keys,
  padding: 0.1,
});
const valueScale = scaleLinear<number>({
  domain: [0, max(chartData, (d) => max(keys, (key) => d[key]))],
});

const colorScale = scaleOrdinal<string, string>({
  domain: keys,
  range: [blue, green, purple],
});

export default function HorizontalBarChart({
  width,
  height,
  data,
  margin = defaultMargin,
  events = true,
}: BarGroupHorizontalProps) {


  const keys = Object.keys(data.chartData[0]).filter((d) => d !== "indicator");

  // accessors
  const getIndicator = (d: any) => d.indicator;

  // scales
  const indicatorScale = scaleBand({
    domain: data.chartData.map(getIndicator),
    padding: 0.3,
  });
  const playerScale = scaleBand({
    domain: keys,
    padding: 0.1,
  });
  const valueScale = scaleLinear<number>({
    domain: [0, max(data.chartData, (d) => max(keys, (key) => {
      return d[key];
    }))],
  });

  const colorScale = scaleOrdinal<string, string>({
    domain: keys,
    range: [blue, green, purple],
  });

  // bounds
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  // update scale output dimensions
  indicatorScale.rangeRound([0, yMax]);
  playerScale.rangeRound([0, indicatorScale.bandwidth()]);
  valueScale.rangeRound([0, xMax]);

  return width < 10 ? null : (
    <>
      {/* <span className="p-2 text-sm text-gray-400">통산 기록</span> */}
      <svg width={width} height={height}>
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill={background}
          rx={14}
        />
        <Group top={margin.top} left={margin.left}>
          <BarGroupHorizontal
            data={data.chartData}
            keys={keys}
            width={xMax}
            y0={getIndicator}
            y0Scale={indicatorScale}
            y1Scale={playerScale}
            xScale={valueScale}
            color={colorScale}
          >
            {(barGroups) =>
              barGroups.map((barGroup) => (
                <Group
                  key={`bar-group-horizontal-${barGroup.index}-${barGroup.y0}`}
                  top={barGroup.y0}
                >
                  {barGroup.bars.map((bar) => (
                    <Bar
                      key={`${barGroup.index}-${bar.index}-${bar.key}`}
                      x={bar.x}
                      y={bar.y}
                      width={bar.width}
                      height={bar.height}
                      // height={20}
                      fill={data.playerInfoData[bar.index].color}
                      rx={5}
                      onClick={() => {
                        if (events)
                          alert(
                            `${bar.key} (${bar.value}) - ${JSON.stringify(bar)}`
                          );
                      }}
                    />
                  ))}
                </Group>
              ))
            }
          </BarGroupHorizontal>

          <AxisLeft
            scale={indicatorScale}
            orientation="left"
            left={0}
            top={0}
            hideAxisLine
            tickLabelProps={() => ({
              fontSize: 13,
              textAnchor: "end",
              dy: "4px",
              dx: "-3px",
            })}
          />
        </Group>
      </svg>
    </>
  );
}
