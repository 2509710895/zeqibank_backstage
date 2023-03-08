import React, { useState, useEffect } from 'react';

import { Mix, G2 } from '@ant-design/plots';

//购买量与购买人数之间的关系（两幅饼图）
const PropComp = (props) => {
    const G = G2.getEngine('canvas')
    const [data, setData] = useState({});

    useEffect(() => {
        // asyncFetch();
        const tempData = {
            pie1: [
                { type: '1-9份', value: 50000000 },
                { type: '10-99份', value: 30000000 },
                { type: '100份以上', value: 20000000 },
            ],
            pie2: [
                { type: '1-9份', num: 250 },
                { type: '10-99份', num: 30 },
                { type: '100份以上', num: 2 },
            ]
        }
        setData(tempData)
    }, []);

    if (!Object.keys(data).length) {
        return null;
    }
    const config = {
        // 关闭 chart 上的 tooltip，子 view 开启 tooltip
        tooltip: false,
        legend: true,
        plots: [
            {
                type: 'pie',
                region: {
                    start: {
                        x: 0,
                        y: 0,
                    },
                    end: {
                        x: 0.45,
                        y: 1,
                    },
                },
                options: {
                    data: data.pie1,
                    // angleField: 'bill',
                    angleField: 'value',
                    // colorField: 'area',
                    colorField: 'type',
                    radius: 0.85,
                    tooltip: {
                        showMarkers: false,
                    },
                    label: {
                        type: 'spider',
                        labelHeight: 40,
                        formatter: (data, mappingData) => {
                            const group = new G.Group({});
                            group.addShape({
                                type: 'circle',
                                attrs: {
                                    x: 0,
                                    y: 0,
                                    width: 40,
                                    height: 50,
                                    r: 5,
                                    fill: mappingData.color,
                                },
                            });
                            group.addShape({
                                type: 'text',
                                attrs: {
                                    x: 10,
                                    y: 8,
                                    text: `${data.type}`,
                                    fill: mappingData.color,
                                },
                            });
                            group.addShape({
                                type: 'text',
                                attrs: {
                                    x: 0,
                                    y: 25,
                                    text: `${data.value / 10000.0}万元 ${(data.percent * 100).toFixed(2)}%`,
                                    fill: 'rgba(0, 0, 0, 0.65)',
                                    fontWeight: 700,
                                },
                            });
                            return group;
                        },
                    },
                    interactions: [
                        {
                            type: 'element-active',
                        },
                        {
                            type: 'association-tooltip',
                        },
                        {
                            type: 'association-highlight',
                        },
                    ],
                },
            },
            {
                type: 'pie',
                region: {
                    start: {
                        x: 0.55,
                        y: 0,
                    },
                    end: {
                        x: 1,
                        y: 1,
                    },
                },
                options: {
                    data: data.pie2,
                    radius: 0.85,
                    // angleField: 'value',
                    angleField: 'num',
                    // colorField: 'area',
                    colorField: 'type',
                    label: {
                        type: 'spider',
                        labelHeight: 40,
                        formatter: (data, mappingData) => {
                            const group = new G.Group({});
                            group.addShape({
                                type: 'circle',
                                attrs: {
                                    x: 0,
                                    y: 0,
                                    width: 40,
                                    height: 50,
                                    r: 5,
                                    fill: mappingData.color,
                                },
                            });
                            group.addShape({
                                type: 'text',
                                attrs: {
                                    x: 10,
                                    y: 8,
                                    text: `${data.type}`,
                                    fill: mappingData.color,
                                },
                            });
                            group.addShape({
                                type: 'text',
                                attrs: {
                                    x: 0,
                                    y: 25,
                                    text: `${data.num}人 ${(data.percent * 100).toFixed(2)}%`,
                                    fill: 'rgba(0, 0, 0, 0.65)',
                                    fontWeight: 700,
                                },
                            });
                            return group;
                        },
                    },
                    tooltip: {
                        showMarkers: false,
                    },
                    interactions: [
                        {
                            type: 'association-tooltip',
                        },
                        {
                            type: 'association-selected',
                        },
                    ],
                },
            },
        ],
    };

    return <Mix {...config} />;
};

export default PropComp;

