import React, { useEffect } from 'react'
import * as echarts from 'echarts';
import chinaMapData from '../../priSrc/chinaMap';

//统计一项产品购买人数的地域差别，有地图和条形图
export default function EMap() {

    // var chartDom = document.getElementById('main');
    let EmapRef = {}
    useEffect(() => {
        const myChart = echarts.init(EmapRef);
        var option;

        const data = [
            { name: '云南省', code: 530000, value: 1788, },
            { name: '黑龙江省', code: 230000, value: 1636, },
            { name: '贵州省', code: 520000, value: 1480, },
            { name: '北京市', code: 110000, value: 3031, },
            { name: '河北省', code: 130000, value: 3601, },
            { name: '山西省', code: 140000, value: 1681, },
            { name: '吉林省', code: 220000, value: 1507, },
            { name: '宁夏回族自治区', code: 640000, value: 3705, },
            { name: '辽宁省', code: 210000, value: 2531, },
            { name: '海南省', code: 460000, value: 4832, },
            { name: '内蒙古自治区', code: 150000, value: 1728, },
            { name: '天津市', code: 120000, value: 1880, },
            { name: '新疆维吾尔自治区', code: 650000, value: 1219, },
            { name: '上海市', code: 310000, value: 3267, },
            { name: '陕西省', code: 610000, value: 2443, },
            { name: '甘肃省', code: 620000, value: 2246, },
            { name: '安徽省', code: 340000, value: 3000, },
            { name: '香港特别行政区', code: 810000, value: 1235, },
            { name: '广东省', code: 440000, value: 9727, },
            { name: '河南省', code: 410000, value: 4805, },
            { name: '湖南省', code: 430000, value: 3642, },
            { name: '江西省', code: 360000, value: 2198, },
            { name: '四川省', code: 510000, value: 8067, },
            { name: '广西壮族自治区', code: 450000, value: 2035, },
            { name: '江苏省', code: 320000, value: 9255, },
            { name: '澳门特别行政区', code: 820000, value: 955, },
            { name: '浙江省', code: 330000, value: 5619, },
            { name: '山东省', code: 370000, value: 7646, },
            { name: '青海省', code: 630000, value: 2865, },
            { name: '重庆市', code: 500000, value: 2036, },
            { name: '福建省', code: 350000, value: 3580, },
            { name: '湖北省', code: 420000, value: 3936, },
            { name: '西藏自治区', code: 540000, value: 1477, },
            { name: '台湾省', code: 710000, value: 0, },
        ];
        // let num = 0;
        // data.forEach(dataobj => {

        //     num += dataobj.value
        // })
        // //console.log(num,);
        myChart.hideLoading();
        echarts.registerMap('CN', chinaMapData,
            // {
            //     '海南省': {
            //         left: 72,
            //         top: 19,
            //         width: 8
            //     },
            // }
        );

        data.sort(function (a, b) {
            return a.value - b.value;
        });
        const mapOption = {
            tooltip: {
                trigger: 'item'
            },
            grid: {
                x: 25,
                y: 45,
                x2: 100,
                y2: 100,
            },
            visualMap: {
                left: 'right',
                min: 0,
                max: 10000,
                inRange: {
                    // prettier-ignore
                    color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
                },
                text: ['High', 'Low'],
                calculable: true
            },
            series: [
                {
                    id: 'population',
                    name: '人数',
                    type: 'map',
                    roam: false,
                    aspectScale: 0.75, //长宽比
                    zoom: 1.2,
                    map: 'CN',
                    animationDurationUpdate: 1000,
                    universalTransition: true,
                    data: data,
                    tooltip: {
                        valueFormatter: value => value.toLocaleString() + '人'
                    },
                }
            ],
        };
        const barOption = {
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                type: 'value',
                data: data.map(function (item) {
                    return item.value + '000';
                }),
            },
            yAxis: {
                type: 'category',
                axisLabel: {
                    rotate: 30
                },
                data: data.map(function (item) {
                    return item.name;
                })
            },
            animationDurationUpdate: 1000,
            series: {
                type: 'bar',
                id: 'population',
                name: '人数',
                data: data.map(function (item) {
                    return item.value;
                }),
                tooltip: {
                    valueFormatter: value => value.toLocaleString() + ' 人'
                },
                universalTransition: true
            }
        };
        let currentOption = mapOption;
        myChart.setOption(mapOption);
        // setInterval(function () {
        //     currentOption = currentOption === mapOption ? barOption : mapOption;
        //     myChart.setOption(currentOption, true);
        // }, 2000);

        EmapRef.addEventListener('click', (event) => {
            currentOption = currentOption === mapOption ? barOption : mapOption;
            myChart.setOption(currentOption, true);
        })

        option && myChart.setOption(option);
    })


    return (
        <>
            <div ref={r => EmapRef = r} style={{ width: '100%', height: 750 }} >

            </div>
            {/* <div>为达到展示效果更佳的目的，将海南省单独展示，无其他目的</div> */}
        </>
    )
}





