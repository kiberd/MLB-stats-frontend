import React, { useState, useCallback } from "react";
import { Group } from "@visx/group";
// import letterFrequency, { LetterFrequency,} from "@visx/mock-data/lib/mocks/letterFrequency";
import {
  Tooltip,
  TooltipWithBounds,
  useTooltip,
  useTooltipInPortal,
  defaultStyles,
} from "@visx/tooltip";
import { scaleLinear } from "@visx/scale";
import { Point } from "@visx/point";
import { Text } from "@visx/text";
import { Line, LineRadial } from "@visx/shape";

// 점수 계산

// Power : 안타 중 홈런, 2루타, 3루타 비율
// Hitting : 타석 당 타점 비율
// Contact : 타율
// Speed : 도루

const orange = "#115E59";
export const pumpkin = "#115E59";

const silver = "#d9d9d9";
export const background = "#FAF7E9";

type TooltipData = string;

const degrees = 360;

const y = (d: { letter: string; value: number }) => d.value;

const genAngles = (length: number) =>
  [...new Array(length + 1)].map((_, i) => ({
    angle: i * (degrees / length),
  }));

const genPoints = (length: number, radius: number) => {
  const step = (Math.PI * 2) / length;
  return [...new Array(length)].map((_, i) => ({
    x: radius * Math.sin(i * step),
    y: radius * Math.cos(i * step),
  }));
};

function genPolygonPoints<Datum>(
  dataArray: Datum[],
  scale: (n: number) => number,
  getValue: (d: Datum) => number
) {

  const step = (Math.PI * 2) / dataArray.length;
  const points: { x: number; y: number }[] = new Array(dataArray.length).fill({
    x: 0,
    y: 0,
  });
  const pointString: string = new Array(dataArray.length)
    .fill("")
    .reduce((res, _, i) => {
      if (i > dataArray.length) return res;
      const xVal = scale(getValue(dataArray[i])) * Math.sin(i * step);
      const yVal = scale(getValue(dataArray[i])) * Math.cos(i * step);
      points[i] = { x: xVal, y: yVal };
      res += `${xVal},${yVal} `;
      return res;
    }, []);

  return { points, pointString };

}

const defaultMargin = { top: 25, left: 40, right: 40, bottom: 25 };

export type RadarProps = {
  width: number;
  height: number;
  data: any;
  margin?: { top: number; right: number; bottom: number; left: number };
  levels?: number;
};

export default function RadarChart({
  width,
  height,
  data,
  levels = 6,
  margin = defaultMargin,
}: RadarProps) {
  const [tooltipShouldDetectBounds, setTooltipShouldDetectBounds] =
    useState(true);

  // const { containerRef, containerBounds, TooltipInPortal } = useTooltipInPortal({
  //   scroll: true,
  //   detectBounds: tooltipShouldDetectBounds,
  // });

  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;
  const radius = Math.min(xMax, yMax) / 2;

  const radialScale = scaleLinear<number>({
    range: [0, Math.PI * 2],
    domain: [degrees, 0],
  });

  const yScale = scaleLinear<number>({
    range: [0, radius],
    domain: [0, 1],
  });

  const {
    showTooltip,
    hideTooltip,
    tooltipOpen,
    tooltipData,
    tooltipLeft = 0,
    tooltipTop = 0,
  } = useTooltip<TooltipData>({
    // initial tooltip state
    // tooltipOpen: true,
    // tooltipLeft: width / 3,
    // tooltipTop: height / 3,
  });

  const handleMouseOver = useCallback(
    (event: any, coords: any, datum: any) => {
      showTooltip({
        tooltipLeft: event.pageX,
        tooltipTop: event.pageY,
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

  const webs = genAngles(data.length);
  const points = genPoints(data.length, radius);
  const polygonPoints = genPolygonPoints(data, (d) => yScale(d) ?? 0, y);

  const zeroPoint = new Point({ x: 0, y: 0 });

  return width < 10 ? null : (
    <div>
      <svg width={width} height={height}>
        <rect fill={background} width={width} height={height} rx={14} />
        <Group top={height / 2} left={width / 2}>
          {[...new Array(levels)].map((_, i) => (
            <LineRadial
              key={`web-${i}`}
              data={webs}
              angle={(d) => radialScale(d.angle) ?? 0}
              radius={((i + 1) * radius) / levels}
              fill="none"
              stroke={silver}
              strokeWidth={2}
              strokeOpacity={0.8}
              strokeLinecap="round"
            />
          ))}
          {[...new Array(data.length)].map((_, i) => {
            return (
              <>
                <Line
                  key={`radar-line-${i}`}
                  from={zeroPoint}
                  to={points[i]}
                  stroke={silver}
                />
                <Text
                  textAnchor="middle"
                  verticalAnchor="middle"
                  y={points[i].y}
                  x={points[i].x}
                  dx={points[i].x / 4}
                  dy={points[i].y / 10}
                  className={"text-xs"}
                >
                  {data[i].letter}
                </Text>
              </>
            );
          })}
          <polygon
            points={polygonPoints?.pointString}
            fill={orange}
            fillOpacity={0.3}
            stroke={orange}
            strokeWidth={1}
          />
          {polygonPoints?.points.map((point, i) => (
            <circle
              key={`radar-point-${i}`}
              cx={point.x}
              cy={point.y}
              r={4}
              fill={pumpkin}
              onMouseOver={(e: any) => {
                handleMouseOver(
                  e,
                  point,
                  `${data[i]?.letter}: ${data[i]?.value}`
                );
              }}
              onMouseOut={hideTooltip}
            />
          ))}
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
    </div>
  );
}
