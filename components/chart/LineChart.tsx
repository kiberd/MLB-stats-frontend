import React from "react";

import {
  AnimatedAxis,
  AnimatedGrid,
  AnimatedLineSeries,
  Tooltip,
  XYChart,
} from "@visx/xychart";

import { curveLinear } from "@visx/curve";

interface ChartProps {
  data: any;
  indicator: string;
  width: number;
  height: number;
}

const accessors = {
  xAccessor: (d: any) => d.x,
  yAccessor: (d: any) => d.y,
};

const LineChart: React.FC<ChartProps> = ({
  data,
  indicator,
  width,
  height,
}) => {
  return (
    <>
      <XYChart
        width={width}
        height={height}
        xScale={{ type: "band" }}
        yScale={{ type: "linear" }}
      >
        <AnimatedAxis orientation="bottom" />
        <AnimatedAxis
          orientation="left"
          tickFormat={(value) =>
            indicator === "avg" ? value.toFixed(3) : value
          }
          numTicks={5}
        />
        <AnimatedGrid columns={false} numTicks={4} />
        <AnimatedLineSeries
          dataKey="Line 1"
          data={data}
          xAccessor={accessors.xAccessor}
          yAccessor={accessors.yAccessor}
          curve={curveLinear}
        />
        <Tooltip
          snapTooltipToDatumX
          snapTooltipToDatumY
          showVerticalCrosshair
          showSeriesGlyphs
          renderTooltip={({ tooltipData, colorScale }) => {
            return (
              <div>
                {accessors.xAccessor(tooltipData?.nearestDatum?.datum)}
                {"년, "}
                {accessors.yAccessor(tooltipData?.nearestDatum?.datum)}
              </div>
            );
          }}
        />
      </XYChart>
    </>
  );
};

export default LineChart;
