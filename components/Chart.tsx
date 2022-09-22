import React from 'react';

import {
    AnimatedAxis,
    AnimatedGrid,
    AnimatedLineSeries,
    Tooltip,
    XYChart
  } from "@visx/xychart";

interface ChartProps{
    data: any,
    accessors: any
}
  

const Chart:React.FC<ChartProps> = ({ data, accessors }) => {
    return (
      <div className="w-[20vw] h-[15vh] flex items-center justify-center">
      <XYChart
        height={180}
        xScale={{ type: "band" }}
        yScale={{ type: "linear" }}
      >
        <AnimatedAxis orientation="bottom" />
        <AnimatedGrid columns={false} numTicks={4} />
        <AnimatedLineSeries
          dataKey="Line 1"
          data={data}
          {...accessors}
        />
        {/* <AnimatedLineSeries
          dataKey="Line 2"
          data={data2}
          {...accessors}
        /> */}
        {/* <Tooltip
        snapTooltipToDatumX
        snapTooltipToDatumY
        showVerticalCrosshair
        showSeriesGlyphs
        renderTooltip={({ tooltipData, colorScale }) => (
          <div>
            <div
              style={{ color: colorScale(tooltipData.nearestDatum.key) }}
            >
              {tooltipData.nearestDatum.key}
            </div>
            {accessors.xAccessor(tooltipData.nearestDatum.datum)}
            {", "}
            {accessors.yAccessor(tooltipData.nearestDatum.datum)}
          </div>
        )}
      /> */}
      </XYChart>
    </div>
    );
};

export default Chart;