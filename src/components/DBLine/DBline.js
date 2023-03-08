import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/plots';

const DBLine = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        // asyncFetch();
        const temp = [
            {
                name: '上月',
                date: '01',
                // value: '213200'
                value: 780000
            },
            {
                name: '上月',
                date: '02',
                // value: '656400'
                value: 500000
            },
            {
                name: '上月',
                date: '03',
                // value: '356800'
                value: 320000
            },
            {
                name: '上月',
                date: '04',
                // value: '132300'
                value: 610000
            },
            {
                name: '上月',
                date: '05',
                // value: '163100'
                value: 180000
            },
            {
                name: '上月',
                date: '06',
                // value: '132100'
                value: 400000
            },
            {
                name: '上月',
                date: '07',
                // value: '144600'
                value: 350000
            },
            {
                name: '上月',
                date: '08',
                // value: '213200'
                value: 420000
            },
            {
                name: '上月',
                date: '09',
                // value: '234600'
                value: 130000
            },
            {
                name: '上月',
                date: '10',
                // value: '245200'
                value: 560000
            },
            {
                name: '上月',
                date: '11',
                // value: '464200'
                value: 470000
            },
            {
                name: '上月',
                date: '12',
                // value: '986300'
                value: 350000
            },
            {
                name: '上月',
                date: '13',
                // value: '453600'
                value: 480000
            },
            {
                name: '上月',
                date: '14',
                // value: '142100'
                value: 200000
            },
            {
                name: '上月',
                date: '15',
                // value: '456300'
                value: 180000
            },
            {
                name: '上月',
                date: '16',
                // value: '345900'
                value: 380000
            },
            {
                name: '上月',
                date: '17',
                // value: '786500'
                value: 650000
            },
            {
                name: '上月',
                date: '18',
                // value: '123400'
                value: 720000
            },
            {
                name: '上月',
                date: '19',
                // value: '437800'
                value: 510000
            },
            {
                name: '上月',
                date: '20',
                // value: '453400'
                value: 360000
            },
            {
                name: '上月',
                date: '21',
                // value: '345200'
                value: 240000
            },
            {
                name: '上月',
                date: '22',
                // value: '645600'
                value: 460000
            },
            {
                name: '上月',
                date: '23',
                // value: '234200'
                value: 180000
            },
            {
                name: '上月',
                date: '24',
                // value: '242300'
                value: 370000
            },
            {
                name: '上月',
                date: '25',
                // value: '345200'
                value: 240000
            },
            {
                name: '上月',
                date: '26',
                // value: '645600'
                value: 360000
            },
            {
                name: '上月',
                date: '27',
                // value: '234200'
                value: 280000
            },
            {
                name: '上月',
                date: '28',
                // value: '242300'
                value: 420000
            },
            {
                name: '上月',
                date: '29',
                // value: '242300'
                value: 520000
            },
            {
                name: '上月',
                date: '30',
                // value: '242300'
                value: 300000
            },
            {
                name: '上月',
                date: '31',
                // value: '242300'
                value: 520000
            },
            {
                name: '本月',
                date: '01',
                value: 430000
                // value: 323200
            },
            {
                name: '本月',
                date: '02',
                // value: '200000'
                value: 560000
            },
            {
                name: '本月',
                date: '03',
                // value: '215100'
                value: 300000
            },
            {
                name: '本月',
                date: '04',
                // value: '434500'
                value: 160000
            },
            {
                name: '本月',
                date: '05',
                // value: '144500'
                value: 180000
            },
            {
                name: '本月',
                date: '06',
                // value: '234400'
                value: 240000
            },
            {
                name: '本月',
                date: '07',
                // value: '141000'
                value: 340000
            },
            {
                name: '本月',
                date: '08',
                // value: '208000'
                value: 530000
            },
            {
                name: '本月',
                date: '09',
                // value: '345400'
                value: 830000
            },
            {
                name: '本月',
                date: '10',
                // value: '208800'
                value: 670000
            },
            {
                name: '本月',
                date: '11',
                // value: '432420'
                value: 400000
            },
            {
                name: '本月',
                date: '12',
                // value: '424400'
                value: 270000
            },
            {
                name: '本月',
                date: '13',
                // value: '123400'
                value: 350000
            },
            {
                name: '本月',
                date: '14',
                // value: '345000'
                value: 130000
            },
            {
                name: '本月',
                date: '15',
                // value: '324400'
                value: 450000
            },
            {
                name: '本月',
                date: '16',
                // value: '453400'
                value: 680000
            },
            {
                name: '本月',
                date: '17',
                // value: '123400'
                value: 500000
            },
            {
                name: '本月',
                date: '18',
                // value: '786200'
                value: 910000
            },
            {
                name: '本月',
                date: '19',
                // value: '545400'
                value: 420000
            },
            {
                name: '本月',
                date: '20',
                // value: '453200'
                value: 750000
            },
            {
                name: '本月',
                date: '21',
                // value: '454520'
                value: 490000
            },
            {
                name: '本月',
                date: '22',
                // value: '234400'
                value: 460000
            },
            {
                name: '本月',
                date: '23',
                // value: '241340'
                value: 430000
            },
            {
                name: '本月',
                date: '24',
                // value: '345000'
                value: 180000
            },
        ]
        // let num = 0;
        // let num2 = 0;
        // temp.forEach(data => {
        //     if (data.name === '上月') {
        //         num += data.value
        //     } else {
        //         num2 += data.value
        //     }
        // })
        // //console.log(num, num2, num2 / num);
        setData(temp)
    }, []);

    // const asyncFetch = () => {
    //     fetch('https://gw.alipayobjects.com/os/bmw-prod/e00d52f4-2fa6-47ee-a0d7-105dd95bde20.json')
    //         .then((response) => response.json())
    //         .then((json) => setData(json))
    //         .catch((error) => {
    //             //console.log('fetch data failed', error);
    //         });
    // };
    const config = {
        data,
        xField: 'date',
        yField: 'value',
        seriesField: 'name',
        yAxis: {
            label: {
                // formatter: (v) => `${(v / 10e8).toFixed(1)} B`,
            },
        },
        // label: {},
        point: {
            size: 4,
            shape: 'circle',
        },
        tooltip: {
            showMarkers: false,
        },
        // state: {
        //     active: {
        //         style: {
        //             shadowBlur: 4,
        //             stroke: '#000',
        //             fill: 'red',
        //         },
        //     },
        // },
        legend: {
            position: 'top',
        },
        // smooth: true,
        // @TODO 后续会换一种动画方式
        // animation: {
        //     appear: {
        //         animation: 'path-in',
        //         duration: 5000,
        //     },
        // },
    };

    return <Line {...config} />;
};

export default DBLine;