import React from 'react';
import { Pie, G2 } from '@ant-design/plots';

//一项产品购买用户的年龄段比例
export default function AgePie() {
    const G = G2.getEngine('canvas');
    const data = [
        {
            type: '18-30岁',
            value: 8513,
        },
        {
            type: '30-40岁',
            value: 13457,
        },
        {
            type: '40-50岁',
            value: 26108,
        },
        {
            type: '50-65岁',
            value: 29364,
        },
        {
            type: '65岁以上',
            value: 35211,
        },
    ];
    const cfg = {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 1,
        legend: false,
        label: {
            type: 'spider',//蜘蛛网
            labelHeight: 40,
            formatter: (data, mappingData) => {
                const group = new G.Group({});
                group.addShape({//圆点
                    type: 'circle',
                    attrs: {
                        x: 0,
                        y: 0,
                        width: 60,
                        height: 50,
                        r: 5,
                        fill: mappingData.color,
                        // fill: obj.sex === '男' ? '#1890ff' : '#f04864',
                    },
                });
                group.addShape({//key
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
                        text: `${(data.value).toLocaleString()}人 ${(data.percent * 100).toFixed(2)}%`,
                        fill: 'rgba(0, 0, 0, 0.65)',
                        fontWeight: 700,
                    },
                });
                return group;
            },
        },
        interactions: [
            {
                type: 'element-selected',
            },
            {
                type: 'element-active',
            },
        ],
    };
    const config = cfg;
    return <Pie {...config} />;
};