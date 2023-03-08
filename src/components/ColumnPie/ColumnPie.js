import React, { useEffect, useState } from 'react'
import { Column, G2, Mix } from '@ant-design/plots';
export default function ColumnPie() {
    const G = G2.getEngine('canvas')
    const [dataPies, setDataPies] = useState({});

    useEffect(() => {
        // asyncFetch();
        const tempData = {
            pie1: [
                {
                    year: '2022-03',
                    class: '销售额',
                    value: 360000,
                    type: '国债',
                },

                {
                    type: '存款产品',
                    class: '销售额',
                    year: '2022-03',
                    value: 340000,
                },

                {
                    type: '基金',
                    class: '销售额',
                    year: '2022-03',
                    value: 170000,
                },

                // { type: '100份以上', value: 20000000 },
            ],
            pie2: [
                {
                    year: '2022-03',
                    class: '人数',
                    value: 120,
                    type: '国债',
                },
                {
                    year: '2022-03',
                    class: '人数',
                    value: 150,
                    type: '存款产品',

                },
                {
                    year: '2022-03',
                    class: '人数',
                    value: 190,
                    type: '基金',

                },
                // { type: '1-9份', num: 250 },
                // { type: '10-99份', num: 30 },
                // { type: '100份以上', num: 2 },
            ]
        }
        setDataPies(tempData)
    }, []);

    if (!Object.keys(dataPies).length) {
        return null;
    }
    const configPies = {
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
                    data: dataPies.pie1,
                    // angleField: 'bill',
                    angleField: 'value',
                    // colorField: 'area',
                    colorField: 'type',
                    radius: 0.85,
                    tooltip: {
                        showMarkers: false,
                        formatter: obj => {
                            return { name: obj.type, value: obj.value.toLocaleString() + '元' }
                        }
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
                    data: dataPies.pie2,
                    radius: 0.85,
                    // angleField: 'value',
                    angleField: 'value',
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
                                    text: `${data.value}人 ${(data.percent * 100).toFixed(2)}%`,
                                    fill: 'rgba(0, 0, 0, 0.65)',
                                    fontWeight: 700,
                                },
                            });
                            return group;
                        },
                    },
                    tooltip: {
                        showMarkers: false,
                        formatter: obj => {
                            return { name: obj.type, value: obj.value.toLocaleString() + '人' }
                        }
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

    const data = [
        {
            year: '2021-10',
            class: '销售额',
            value: 500000,
            type: '国债',
        },
        {
            year: '2021-10',
            class: '人数',
            value: 245,
            type: '国债',
        },
        {
            type: '存款产品',
            class: '销售额',
            year: '2021-10',
            value: 100000,
        },
        {
            year: '2021-10',
            class: '人数',
            value: 500,
            type: '存款产品',

        },
        {
            type: '基金',
            class: '销售额',
            year: '2021-10',
            value: 160000,
        },
        {
            year: '2021-10',
            class: '人数',
            value: 300,
            type: '基金',

        },
        {
            year: '2021-11',
            class: '销售额',
            value: 430000,
            type: '国债',
        },
        {
            year: '2021-11',
            class: '人数',
            value: 234,
            type: '国债',
        },
        {
            type: '存款产品',
            class: '销售额',
            year: '2021-11',
            value: 230000,
        },
        {
            year: '2021-11',
            class: '人数',
            value: 456,
            type: '存款产品',

        },
        {
            type: '基金',
            class: '销售额',
            year: '2021-11',
            value: 340000,
        },
        {
            year: '2021-11',
            class: '人数',
            value: 235,
            type: '基金',

        },
        {
            year: '2021-12',
            class: '销售额',
            value: 430000,
            type: '国债',
        },
        {
            year: '2021-12',
            class: '人数',
            value: 110,
            type: '国债',
        },
        {
            type: '存款产品',
            class: '销售额',
            year: '2021-12',
            value: 170000,
        },
        {
            year: '2021-12',
            class: '人数',
            value: 130,
            type: '存款产品',

        },
        {
            type: '基金',
            class: '销售额',
            year: '2021-12',
            value: 180000,
        },
        {
            year: '2021-12',
            class: '人数',
            value: 210,
            type: '基金',

        },
        {
            year: '2022-01',
            class: '销售额',
            value: 540000,
            type: '国债',
        },
        {
            year: '2022-01',
            class: '人数',
            value: 340,
            type: '国债',
        },
        {
            type: '存款产品',
            class: '销售额',
            year: '2022-01',
            value: 400000,
        },
        {
            year: '2022-01',
            class: '人数',
            value: 320,
            type: '存款产品',

        },
        {
            type: '基金',
            class: '销售额',
            year: '2022-01',
            value: 320000,
        },
        {
            year: '2022-01',
            class: '人数',
            value: 153,
            type: '基金',

        },
        {
            year: '2022-02',
            class: '销售额',
            value: 430000,
            type: '国债',
        },
        {
            year: '2022-02',
            class: '人数',
            value: 320,
            type: '国债',
        },
        {
            type: '存款产品',
            class: '销售额',
            year: '2022-02',
            value: 220000,
        },
        {
            year: '2022-02',
            class: '人数',
            value: 460,
            type: '存款产品',

        },
        {
            type: '基金',
            class: '销售额',
            year: '2022-02',
            value: 250000,
        },
        {
            year: '2022-02',
            class: '人数',
            value: 240,
            type: '基金',

        },
        {
            year: '2022-03',
            class: '销售额',
            value: 360000,
            type: '国债',
        },
        {
            year: '2022-03',
            class: '人数',
            value: 120,
            type: '国债',
        },
        {
            type: '存款产品',
            class: '销售额',
            year: '2022-03',
            value: 340000,
        },
        {
            year: '2022-03',
            class: '人数',
            value: 150,
            type: '存款产品',

        },
        {
            type: '基金',
            class: '销售额',
            year: '2022-03',
            value: 170000,
        },
        {
            year: '2022-03',
            class: '人数',
            value: 190,
            type: '基金',

        },
    ];

    G2.registerInteraction('element-link', {
        start: [
            {
                trigger: 'interval:mouseenter',
                action: 'element-link-by-color:link',
            },
        ],
        end: [
            {
                trigger: 'interval:mouseleave',
                action: 'element-link-by-color:unlink',
            },
        ],
    });

    const config = {
        data,
        xField: 'year',
        yField: 'value',
        isPercent: true,
        isStack: true,
        isGroup: true,
        seriesField: 'type',
        groupField: 'class',
        label: {
            position: 'middle',
            content: (item) => {
                // //console.log(item);
                return item.value.toFixed(2);
                // return item.value;
            },
            style: {
                fill: '#fff',
            },
        },
        tooltip: {
            customContent: (title, items) => {
                // //console.log(title, items);
                return (
                    <>
                        <h5 style={{ marginTop: 16 }}>{title}</h5>
                        <ul key={title + 'ul1'} style={{ paddingLeft: 0, width: 180 }}>
                            {items.map((item, index) => {
                                // //console.log(item);
                                const { name, value, color } = item;
                                return (
                                    <>
                                        <li
                                            key={item.year + '1'}
                                            className="g2-tooltip-list-item"
                                            data-index={index}
                                            style={{ marginBottom: 4, display: 'flex', alignItems: 'center' }}
                                        >
                                            <span className="g2-tooltip-marker" style={{ backgroundColor: color }}></span>
                                            <span
                                                style={{ display: 'inline-flex', flex: 1, justifyContent: 'space-between' }}
                                            >
                                                <span style={{ margiRight: 16 }}>{name}:</span>
                                                <span className="g2-tooltip-list-item-value">{value}</span>
                                            </span>
                                        </li>
                                    </>
                                );
                            })}
                        </ul>
                    </>
                );
            },
        },
        interactions: [
            {
                type: 'element-highlight-by-color',
            },
            {
                type: 'element-link',
            },
        ],
    };

    const test = (plot) => {
        plot.on('element:click', (...args) => {
            // //console.log(...args);
            const allData = { ...args }
            //console.log(allData[0].data);
            const { year } = allData[0].data.data
            //console.log(year);
            const tempData = data.filter((obj) => {
                return obj.year === year
            })
            //console.log(tempData);
            const newData = { pie1: [], pie2: [] }
            tempData.forEach(obj => {
                if (obj.class === '销售额') {
                    newData.pie1.push(obj)
                } else {
                    newData.pie2.push(obj)
                }
            })
            setDataPies(newData)
        });
    }


    return (
        <>
            <Mix {...configPies} />
            <Column {...config} onReady={test} />
        </>
    )
}
