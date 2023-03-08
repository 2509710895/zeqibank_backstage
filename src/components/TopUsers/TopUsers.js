import React from 'react';
import { Column } from '@ant-design/plots';

//统计每项产品购买的头部用户
export default function TopUsers() {
    const data = [
        {
            name: '客户1',
            value: 2000000,
            id: '000001',
        },
        {
            name: '客户2',
            value: 1500000,
            id: '000002',
        },
        {
            name: '客户3',
            value: 3000000,
            id: '000003',
        },
        {
            name: '客户4',
            value: 2800000,
        },
        {
            name: '客户5',
            value: 1800000,
        },
        {
            name: '客户6',
            value: 1900000,
        },
        {
            name: '客户7',
            value: 3400000,
        },
        {
            name: '客户8',
            value: 2200000,
        },
        {
            name: '客户9',
            value: 1200000,
        },
        {
            name: '客户10',
            value: 5200000,
        },
    ];
    // const paletteSemanticRed = '#F4664A';
    // const brandColor = '#5B8FF9';
    const config = {
        data,
        xField: 'name',
        yField: 'value',
        // columnWidthRatio: 0.3,
        // seriesField: 'value',//来决定颜色
        // // colorField: 'value',
        // color: (data) => {
        //     // //console.log(data);
        //     if (data.value < 3000000) {
        //         return paletteSemanticRed;
        //     }
        //     return brandColor;
        // },
        label: {
            position: 'top',
            content: (originData) => {
                return originData.value
                // const val = parseFloat(originData.value);
                // if (val < 0.05) {
                //     return (val * 100).toFixed(1) + '%';
                // }
            },
        },
        legend: false,
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
    };

    const test = (plot) => {
        plot.on('element:click', (...args) => {
            //console.log(...args);
        });
    }


    return <Column {...config} onReady={test} />;
}


