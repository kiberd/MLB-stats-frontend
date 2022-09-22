import React from "react";

import {
  AnimatedAxis,
  AnimatedGrid,
  AnimatedLineSeries,
  Tooltip,
  XYChart,
  AreaSeries
} from "@visx/xychart";

import { curveBasis, curveLinear, curveNatural, curveCardinal } from '@visx/curve';
import { ParentSize } from "@visx/responsive";

interface ChartProps {
  data: any;
  accessors: any;
}

const Chart: React.FC<ChartProps> = ({ data, accessors }) => {
  return (
    <>
      <ParentSize>
        {({ width, height }) => (
          <>
            <XYChart
              width={width}
              height={height}
              xScale={{ type: "band" }}
              yScale={{ type: "band" }}
            >
              <AnimatedAxis orientation="bottom" />
              <AnimatedAxis orientation="left" />
              <AnimatedGrid columns={false} numTicks={4} />
              <AnimatedLineSeries
                dataKey="Line 1"
                data={data}
                xAccessor={accessors.xAccessor}
                yAccessor={accessors.yAccessor}
                curve={curveNatural}
              />

              {/* <AreaSeries
                dataKey="Line 1"
                data={data}
                xAccessor={accessors.xAccessor}
                yAccessor={accessors.yAccessor}
                curve={curveBasis}
              /> */}

              <Tooltip
                snapTooltipToDatumX
                snapTooltipToDatumY
                showVerticalCrosshair
                showSeriesGlyphs
                //     renderTooltip={({ tooltipData, colorScale }) => (
                //       <div>
                //         <div>{tooltipData?.nearestDatum?.index}</div>
                //         {/* <div
                //   style={{ color: colorScale(tooltipData.nearestDatum.key) }}
                // >
                //   {tooltipData.nearestDatum.key}
                // </div>
                // {accessors.xAccessor(tooltipData.nearestDatum.datum)}
                // {", "}
                // {accessors.yAccessor(tooltipData.nearestDatum.datum)} */}
                //       </div>
                //     )}
                renderTooltip={({ tooltipData, colorScale }) => {
                  // console.log(tooltipData);

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
