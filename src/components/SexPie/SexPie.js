import React from 'react';
import { Pie, G2 } from '@ant-design/plots';

//抽成一个组件接收接收参数渲染
//一项产品购买用户的男女比例
export default function SexPie(props) {
    //////console.log(props);
    const G = G2.getEngine('canvas');
    const data = [
        {
            type: '男',
            value: 53.42,
        },
        {
            type: '女',
            value: 100 - 53.42,
        },
    ];
    const config = {
        //额外增加的 appendPadding 值，在 padding 的基础上，设置额外的 padding 数值，可以是单个数字 16，或者数组 [16, 8, 16, 8] 代表四个方向。
        appendPadding: 10,
        //设置图表数据源。数据源为对象集合，例如：[{ time: '1991'，value: 20 }, { time: '1992'，value: 20 }]。
        data,
        angleField: 'value',//扇形切片大小（弧度）所对应的数据字段名.(占比)
        colorField: 'type',//扇形颜色映射对应的数据字段名.(key,例:分类一)
        radius: 1,//饼图的半径，原点为画布中心。配置值域为 (0,1]，1 代表饼图撑满绘图区域。
        // legend: {
        //     layout: 'horizontal',
        //     position: 'bottom'
        // },//旁边的标识
        legend: false,
        color: ({ type }) => type === '男' ? '#1890ff' : '#f04864',
        label: {
            type: 'outer',
            // content: '{name} {percentage}',
            labelHeight: 40,
            formatter: (data, mappingData) => {
                const group = new G.Group({});
                group.addShape({
                    type: 'image',
                    attrs: {
                        x: 0,
                        y: 0,
                        width: 40,
                        height: 50,
                        img: data.type === '男' ?
                            'https://gw.alipayobjects.com/zos/rmsportal/oeCxrAewtedMBYOETCln.png' :
                            'https://gw.alipayobjects.com/zos/rmsportal/mweUsJpBWucJRixSfWVP.png',
                    },
                });
                group.addShape({
                    type: 'text',
                    attrs: {
                        x: 0,
                        y: 65,
                        text: `${data.type} ${(data.percent * 100).toFixed(2)}%`,
                        fill: mappingData.color,
                        fontWeight: 700,
                    },
                });
                return group;
            },
        },
        // 开启「鼠标移入图表元素（柱状图的柱子、点图的点等）时触发 active」的交互interactions: [{ type: 'element-active' }]
        interactions: [
            {
                type: 'pie-legend-active',
            },
            {
                type: 'element-active',//会动
            },
        ],
    };
    return <Pie {...config} />;
};