import React, { useCallback } from "react";
import { BarGroupHorizontal, Bar } from "@visx/shape";
import { Group } from "@visx/group";
import { AxisLeft } from "@visx/axis";
import {
  Tooltip,
  useTooltip,
  defaultStyles,
} from "@visx/tooltip";
import { scaleBand, scaleLinear, scaleOrdinal } from "@visx/scale";

export type BarGroupHorizontalProps = {
  width: number;
  height: number;
  data: any;
  margin?: { top: number; right: number; bottom: number; left: number };
  events?: boolean;
};


const blue = "black";
const green = "red";
const purple = "green";
const background = "transparent";

const defaultMargin = { top: 20, right: 20, bottom: 20, left: 45 };

function max<D>(arr: D[], fn: (d: any) => number) {
  return Math.max(...arr.map(fn));
}

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


  const {
    showTooltip,
    hideTooltip,
    tooltipOpen,
    tooltipData,
    tooltipLeft = 0,
    tooltipTop = 0,
  } = useTooltip<any>({});

  const handleMouseOver = useCallback(
    (event: any, datum: any) => {
      showTooltip({
        tooltipLeft: event.pageX,
        tooltipTop: event.pageY - 20,
        tooltipData: datum,
      });
    },
    [showTooltip]
  );

  const tooltipStyles = {
    ...defaultStyles,
    backgroundColor: "rgba(53,71,125,0.8)",
    color: "white",
    padding: 12,
  };

  return width < 10 ? null : (
    <>
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
                      // onClick={() => {
                      //   if (events)
                      //     alert(
                      //       `${bar.key} (${bar.value}) - ${JSON.stringify(bar)}`
                      //     );
                      // }}

                      onMouseOver={(e: any) => {
                        handleMouseOver(e, `${bar.key} : ${bar.value.toFixed(0)}점`);
                      }}
                      onMouseOut={hideTooltip}
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
      {tooltipOpen && tooltipTop && tooltipLeft && (
        <Tooltip
          key={Math.random()}
          top={tooltipTop}
          left={tooltipLeft}
          style={tooltipStyles}
        >
          <strong>
            <>{tooltipData}</>
          </strong>
        </Tooltip>
      )}
    </>
  );
}
