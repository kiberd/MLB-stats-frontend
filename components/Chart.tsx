import React from "react";

import {
  AnimatedAxis,
  AnimatedGrid,
  AnimatedLineSeries,
  Tooltip,
  XYChart,
  AreaSeries
} from "@visx/xychart";

import { scaleBand, scaleLinear, scaleOrdinal } from "@visx/scale";
import { curveBasis, curveLinear, curveNatural, curveCardinal } from '@visx/curve';
import { ParentSize } from "@visx/responsive";

interface ChartProps {
  data: any;
  accessors: any;
  indicator: string;
}

const Chart: React.FC<ChartProps> = ({ data, accessors, indicator }) => {

  return (
    <>
      <ParentSize>
        {({ width, height }) => (
          <>
            <XYChart
              width={width}
              height={height}
              xScale={{ type: "band" }}
              yScale={{ type: "linear" }}

            >
              <AnimatedAxis orientation="bottom" />
              <AnimatedAxis orientation="left"  tickFormat={(value) => indicator === "avg" ? value.toFixed(3) : value} numTicks={5}/>
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
        )}
      </ParentSize>
    </>
  );
};

export default Chart;
