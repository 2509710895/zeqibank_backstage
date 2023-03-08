import React from 'react'
import DataSet from '@antv/data-set';
import { Chart } from '@antv/g2';



export default function DisMap() {

    fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/china-provinces.geo.json')
        .then(res => res.json())
        .then(mapData => {
            const chart = new Chart({
                container: 'test1',
                autoFit: true,
                height: 1000,
                padding: [55, 20]
            });
            chart.tooltip({
                showTitle: false,
                showMarkers: false,
                shared: true,
            });
            // 同步度量
            chart.scale({
                longitude: {
                    sync: true
                },
                latitude: {
                    sync: true
                }
            });
            chart.axis(false);
            chart.legend('trend', {
                position: 'left'
            });

            // 绘制世界地图背景
            const ds = new DataSet();
            const worldMap = ds.createView('back')
                .source(mapData, {
                    type: 'GeoJSON'
                });
            const worldMapView = chart.createView();
            worldMapView.data(worldMap.rows);
            worldMapView.tooltip(false);
            worldMapView.polygon().position('longitude*latitude').style({
                fill: '#fff',
                stroke: '#ccc',
                lineWidth: 1
            });

            // 可视化用户数据
            // const userData = [
            //     { name: 'Russia', value: 86.8 },
            //     { name: 'China', value: 106.3 },
            //     { name: 'Japan', value: 94.7 },
            //     { name: 'Mongolia', value: 98 },
            //     { name: 'Canada', value: 98.4 },
            //     { name: 'United Kingdom', value: 97.2 },
            //     { name: 'United States of America', value: 98.3 },
            //     { name: 'Brazil', value: 96.7 },
            //     { name: 'Argentina', value: 95.8 },
            //     { name: 'Algeria', value: 101.3 },
            //     { name: 'France', value: 94.8 },
            //     { name: 'Germany', value: 96.6 },
            //     { name: 'Ukraine', value: 86.3 },
            //     { name: 'Egypt', value: 102.1 },
            //     { name: 'South Africa', value: 101.3 },
            //     { name: 'India', value: 107.6 },
            //     { name: 'Australia', value: 99.9 },
            //     { name: 'Saudi Arabia', value: 130.1 },
            //     { name: 'Afghanistan', value: 106.5 },
            //     { name: 'Kazakhstan', value: 93.4 },
            //     { name: 'Indonesia', value: 101.4 }
            // ];
            const userData = [
                { name: '云南省', code: 530000, value: 17881.12, },
                { name: '黑龙江省', code: 230000, value: 16361.62, },
                { name: '贵州省', code: 520000, value: 14806.45, },
                { name: '北京市', code: 110000, value: 30319.98, },
                { name: '河北省', code: 130000, value: 36010.27, },
                { name: '山西省', code: 140000, value: 16818.11, },
                { name: '吉林省', code: 220000, value: 15074, },
                { name: '宁夏回族自治区', code: 640000, value: 3705.18, },
                { name: '辽宁省', code: 210000, value: 25315.35, },
                { name: '海南省', code: 460000, value: 4832.05, },
                { name: '内蒙古自治区', code: 150000, value: 17289.22, },
                { name: '天津市', code: 120000, value: 18809.64, },
                { name: '新疆维吾尔自治区', code: 650000, value: 12199.08, },
                { name: '上海市', code: 310000, value: 32679.87, },
                { name: '陕西省', code: 610000, value: 24438.32, },
                { name: '甘肃省', code: 620000, value: 8246.07, },
                { name: '安徽省', code: 340000, value: 30006.82, },
                { name: '香港特别行政区', code: 810000, value: 0, },
                { name: '广东省', code: 440000, value: 97277.77, },
                { name: '河南省', code: 410000, value: 48055.86, },
                { name: '湖南省', code: 430000, value: 36425.78, },
                { name: '江西省', code: 360000, value: 21984.78, },
                { name: '四川省', code: 510000, value: 40678.13, },
                { name: '广西壮族自治区', code: 450000, value: 20353.51, },
                { name: '江苏省', code: 320000, value: 92595.4, },
                { name: '澳门特别行政区', code: 820000, value: 100000, },
                { name: '浙江省', code: 330000, value: 56197.15, },
                { name: '山东省', code: 370000, value: 76469.67, },
                { name: '青海省', code: 630000, value: 2865.23, },
                { name: '重庆市', code: 500000, value: 20363.19, },
                { name: '福建省', code: 350000, value: 35804.04, },
                { name: '湖北省', code: 420000, value: 39366.55, },
                { name: '西藏自治区', code: 540000, value: 1477.63, },
                { name: '台湾省', code: 710000, value: 0, },
            ];
            const userDv = ds.createView()
                .source(userData)
                .transform({
                    geoDataView: worldMap,
                    field: 'name',
                    type: 'geo.region',
                    as: ['longitude', 'latitude']
                })
                .transform({
                    type: 'map',
                    callback: obj => {
                        obj.trend = (obj.value > 100) ? '男性更多' : '女性更多';
                        return obj;
                    }
                });
            const userView = chart.createView();
            userView.data(userDv.rows);
            userView.scale({
                trend: {
                    alias: '每100位女性对应的男性数量'
                }
            });
            userView.polygon()
                .position('longitude*latitude')
                .color('trend', ['#F51D27', '#0A61D7'])
                .tooltip('name*trend')
                .style({
                    fillOpacity: 0.85
                })
                .animate({
                    leave: {
                        animation: 'fade-out'
                    }
                });
            userView.interaction('element-active');

            chart.render();
        });


    return (
        <div id='test1'>

        </div>
    )
}
