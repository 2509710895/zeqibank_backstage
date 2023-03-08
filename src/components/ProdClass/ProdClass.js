import React from 'react';

import { Column, G2 } from '@ant-design/plots';
//统计每月各类产品的份额，
//统计每月各类产品的购买人数
const ProdClass = () => {
    const data = [
        {
            year: '1750',
            class: 'a',
            value: 502,
            country: 'Asia',

        },
        {
            year: '1750',
            class: 'b',
            value: 111,
            country: 'Asia',

        },
        {
            country: 'Asia',
            year: '1800',
            value: 635,
        },
        {
            country: 'Asia',
            year: '1850',
            value: 809,
        },
        {
            country: 'Asia',
            year: '1900',
            value: 947,
        },
        {
            country: 'Asia',
            year: '1950',
            value: 1402,
        },
        {
            country: 'Asia',
            year: '1999',
            value: 3634,
        },
        {
            country: 'Asia',
            year: '2050',
            value: 5268,
        },
        {
            country: 'Africa',
            class: 'a',
            year: '1750',
            value: 106,
        },
        {
            year: '1750',
            class: 'b',
            value: 500,
            country: 'Africa',

        },
        {
            country: 'Africa',
            year: '1800',
            value: 107,
        },
        {
            country: 'Africa',
            year: '1850',
            value: 111,
        },
        {
            country: 'Africa',
            year: '1900',
            value: 133,
        },
        {
            country: 'Africa',
            year: '1950',
            value: 221,
        },
        {
            country: 'Africa',
            year: '1999',
            value: 767,
        },
        {
            country: 'Africa',
            year: '2050',
            value: 1766,
        },
        {
            country: 'Europe',
            class: 'a',
            year: '1750',
            value: 163,
        },
        {
            year: '1750',
            class: 'b',
            value: 200,
            country: 'Europe',

        },
        {
            country: 'Europe',
            year: '1800',
            value: 203,
        },
        {
            country: 'Europe',
            year: '1850',
            value: 276,
        },
        {
            country: 'Europe',
            year: '1900',
            value: 408,
        },
        {
            country: 'Europe',
            year: '1950',
            value: 547,
        },
        {
            country: 'Europe',
            year: '1999',
            value: 729,
        },
        {
            country: 'Europe',
            year: '2050',
            value: 628,
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
        seriesField: 'country',
        groupField: 'class',
        label: {
            position: 'middle',
            content: (item) => {
                // //console.log(item);
                return item.value.toFixed(2);
            },
            style: {
                fill: '#fff',
            },
        },
        tooltip: {
            customContent: (title, items) => {
                // //console.log(title, items);
                // let sum = 0;
                // items.forEach(element => {
                //     // //console.log(element);
                //     sum += element.data.value
                // });
                return (
                    <>
                        <h5 style={{ marginTop: 16 }}>{title}</h5>
                        <ul key={title + 'ul1'} style={{ paddingLeft: 0, width: 150 }}>
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
        });
    }

    return <Column {...config} onReady={test} />;
};

export default ProdClass;

