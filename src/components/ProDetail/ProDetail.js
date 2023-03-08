import React, { useEffect, useState } from 'react'
import { Button, Descriptions } from 'antd'
import axios from 'axios'
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom'

import './ProDetail.css'
export default function ProDetail() {
    const navigate = useNavigate()
    const [params] = useSearchParams()
    const [data, setData] = useState({})
    useEffect(() => {
        //console.log('params=', params.get('key'));
        axios.get('/api/product/get/' + params.get('key')).then(res => {
            //console.log(res);
            // const { data } = res.data.data
            // //console.log(data);
            setData(res.data.data)
        }).catch(err => {
            //console.log(err);
        })
    }, [])
    const clickChange = () => {
        //console.log('点击修改产品');
        navigate('/testpro/change', {
            state: {
                key: 1
            }
        })
    }

    const clickChange2 = () => {
        //console.log('点击修改活动');
    }

    return (
        <>
            <div>
                <Descriptions title="产品详情" bordered column={2}
                    extra={<Button type='primary' onClick={clickChange}>修改产品信息</Button>}
                >
                    <Descriptions.Item label="产品名称" >{data.productName}</Descriptions.Item>
                    <Descriptions.Item label="产品代码" >{data.productId}</Descriptions.Item>
                    <Descriptions.Item label="产品生效日期">{data.effectTime}</Descriptions.Item>
                    <Descriptions.Item label="存款期限">{data.period}</Descriptions.Item>
                    <Descriptions.Item label="预计收益">{data.income}</Descriptions.Item>
                    <Descriptions.Item label="单位净值">{data.income ? 1 + 1 * data.income : 1}</Descriptions.Item>
                </Descriptions>
                <Descriptions title="秒杀活动详情" bordered column={2}
                    extra={<Button type='primary' onClick={clickChange2}>修改活动信息</Button>}
                >
                    <Descriptions.Item label="产品名称" >粤港澳大湾区指数灵活配置产品代销建信理财</Descriptions.Item>
                    <Descriptions.Item label="产品代码" >sfakjhdfkldfh1</Descriptions.Item>
                    <Descriptions.Item label="产品生效日期">2022-03-30</Descriptions.Item>
                    <Descriptions.Item label="存款期限">360天</Descriptions.Item>
                    <Descriptions.Item label="预计收益">2.215%</Descriptions.Item>
                    <Descriptions.Item label="单位净值">1.02315元</Descriptions.Item>
                    <Descriptions.Item label="产品总额">100,000,000元</Descriptions.Item>
                    <Descriptions.Item label="产品金额/份">10,000元</Descriptions.Item>
                    <Descriptions.Item label="单人最大购买数">10</Descriptions.Item>
                    <Descriptions.Item label="已购份数">0/10000</Descriptions.Item>
                    <Descriptions.Item label="秒杀开始时间">2022-03-20 10:00:00</Descriptions.Item>
                    <Descriptions.Item label="秒杀结束时间">2022-03-23 10:00:00</Descriptions.Item>
                </Descriptions>

            </div>
            <Outlet />
        </>
    )
}
