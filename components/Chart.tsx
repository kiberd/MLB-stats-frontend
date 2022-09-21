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
        <div>
      <XYChart
        height={100}
        margin={{ left: 60, top: 35, bottom: 38, right: 27 }}
        xScale={{ type: "time" }}
        yScale={{ type: "linear" }}
      >
        <AnimatedGrid
          columns={false}
          numTicks={4}
          lineStyle={{
            stroke: "#e1e1e1",
            strokeLinecap: "round",
            strokeWidth: 1
          }}
          strokeDasharray="0, 4"
        />
        <AnimatedAxis
          hideAxisLine
          hideTicks
          orientation="bottom"
        //   tickLabelProps={() => ({ dy: tickLabelOffset })}
          left={30}
          numTicks={4}
        />
        <AnimatedAxis
          hideAxisLine
          hideTicks
          orientation="left"
          numTicks={4}
          tickLabelProps={() => ({ dx: -10 })}
        />

        <AnimatedLineSeries
          stroke="#008561"
          dataKey="primary_line"
          data={data}
          {...accessors}
        />
        {/* <Tooltip
          snapTooltipToDatumX
          snapTooltipToDatumY
          showSeriesGlyphs
          glyphStyle={{
            fill: "#008561",
            strokeWidth: 0
          }}
        
        /> */}
      </XYChart>
    </div>
    );
};

export default Chart;