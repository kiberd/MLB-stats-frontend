import React, { useState, useCallback, useEffect } from "react";
import { Group } from "@visx/group";
import letterFrequency, { LetterFrequency, } from "@visx/mock-data/lib/mocks/letterFrequency";
import {
    Tooltip,
    TooltipWithBounds,
    useTooltip,
    useTooltipInPortal,
    defaultStyles,
} from "@visx/tooltip";

import { format } from 'd3-format';
import { scaleLinear, scaleOrdinal, scaleThreshold, scaleQuantile } from '@visx/scale';
import { GlyphStar, GlyphWye, GlyphTriangle, GlyphDiamond } from '@visx/glyph';
import {
    Legend,
    LegendLinear,
    LegendQuantile,
    LegendOrdinal,
    LegendSize,
    LegendThreshold,
    LegendItem,
    LegendLabel
} from '@visx/legend';

import { Point } from "@visx/point";
import { Text } from "@visx/text";
import { Line, LineRadial } from "@visx/shape";


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

const defaultMargin = { top: 40, left: 40, right: 40, bottom: 40 };


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

    // console.log(data);

    const orange = "#115E59";
    const pumpkin = "#115E59";
    const silver = "#d9d9d9";



    const [polygonPointsList, setPolygonPointsList] = useState<any[]>([]);

    // useEffect(() => {
    //     console.log(polygonPointsList);
    // } ,[polygonPointsList])

    useEffect(() => {

        const newPolygonPointsList: any[] = [];
        // console.log(data);

        data.map((value: any) => {

            const newPolygonPoints = genPolygonPoints(value.data, (d) => yScale(d) ?? 0, y);

            const obj = {
                color: value.color,
                polygonData: newPolygonPoints
            }

            newPolygonPointsList.push(obj);
        });

        setPolygonPointsList(newPolygonPointsList);

    }, [data]);

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
    } = useTooltip<TooltipData>({});

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

    const webs = genAngles(4);
    const points = genPoints(4, radius);
    const zeroPoint = new Point({ x: 0, y: 0 });

    return width < 10 ? null : (
        <div>
            <div className=" absolute mt-4 ml-4">
                <div className="flex-col">
                    {
                        data && data.map((d: any) => {

                            const boxStyle = `w-4 h-4 border border-white mr-2 bg-[${d.color}]`;
                            return (
                                <div className="flex items-center my-1" key={d.name}>
                                    <div className={`${boxStyle}`}></div>
                                    <span className=" text-gray-700 font-semibold text-sm">{d.name}</span>
                                </div>
                            )
                        })
                    }

                </div>
            </div>


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
                    {[...new Array(4)].map((_, i) => {
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
                                    dx={points[i].x / 6}
                                    dy={points[i].y / 12}
                                    className={"text-xs tablet:text-sm font-semibold"}
                                >
                                    {data[0]?.data[i].letter}
                                </Text>
                            </>
                        );
                    })}

                    {
                        polygonPointsList.map((data) => (
                            <>
                                <polygon
                                    points={data.polygonData.pointString}
                                    fill={"transparent"}
                                    stroke={data.color}
                                    fillOpacity={0.3}
                                    strokeWidth={2}
                                />

                                {data.polygonData.points.map((point: any, i: any) => (
                                    <circle
                                        key={`radar-point-${i}`}
                                        cx={point.x}
                                        cy={point.y}
                                        r={1}
                                        fill={data.color}
                                    // onMouseOver={(e: any) => {
                                    //     handleMouseOver(
                                    //         e,
                                    //         point,
                                    //         `${data[i]?.letter}: ${data[i]?.value}`
                                    //     );
                                    // }}
                                    // onMouseOut={hideTooltip}
                                    />
                                ))}
                            </>
                        ))
                    }


                </Group>
            </svg>


        </div>
    );
}
