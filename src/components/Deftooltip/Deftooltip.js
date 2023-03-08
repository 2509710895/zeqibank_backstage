import React from 'react';
import { Line } from '@ant-design/plots';

const Deftooltip = () => {
    const data = [
        {
            year: '1991',
            value: 3,
        },
        {
            year: '1992',
            value: 4,
        },
        {
            year: '1993',
            value: 3.5,
        },
        {
            year: '1994',
            value: 5,
        },
        {
            year: '1995',
            value: 4.9,
        },
        {
            year: '1996',
            value: 6,
        },
        {
            year: '1997',
            value: 7,
        },
        {
            year: '1998',
            value: 9,
        },
        {
            year: '1999',
            value: 13,
        },
    ];

    const config = {
        data,
        yField: 'value',
        xField: 'year',
        tooltip: {
            customContent: (title, items) => {
                return (
                    <>
                        <h5 style={{ marginTop: 16 }}>{title}</h5>
                        <ul key={title + 'tool'} style={{ paddingLeft: 0, width: 100 }}>
                            {items?.map((item, index) => {
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
                                        <li
                                            key={item.year + '2'}
                                            className="g2-tooltip-list-item"
                                            data-index={index}
                                            style={{ marginBottom: 4, display: 'flex', alignItems: 'center' }}
                                        >
                                            <span className="g2-tooltip-marker" style={{ backgroundColor: color }}></span>
                                            <span
                                                style={{ display: 'inline-flex', flex: 1, justifyContent: 'space-between' }}
                                            >
                                                <span style={{ margiRight: 16 }}>{name}:</span>
                                                <span className="g2-tooltip-list-item-value">{value}2</span>
                                            </span>
                                        </li>
                                        <li
                                            key={item.year + '3'}
                                            className="g2-tooltip-list-item"
                                            data-index={index}
                                            style={{ marginBottom: 4, display: 'flex', alignItems: 'center' }}
                                        >
                                            <span className="g2-tooltip-marker" style={{ backgroundColor: color }}></span>
                                            <span
                                                style={{ display: 'inline-flex', flex: 1, justifyContent: 'space-between' }}
                                            >
                                                <span style={{ margiRight: 16 }}>{name}:</span>
                                                <span className="g2-tooltip-list-item-value">{value}33</span>
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
        point: {
            size: 5,
            shape: 'diamond',
            style: {
                fill: 'white',
                stroke: '#2593fc',
                lineWidth: 2,
            },
        },
    };

    return <Line {...config} />;
};

export default Deftooltip;