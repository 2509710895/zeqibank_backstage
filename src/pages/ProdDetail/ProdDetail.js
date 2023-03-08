import React, { useEffect, useState } from 'react'
import {
    Button,
    Descriptions,
    Modal,
    PageHeader,
    Row,
    Col,
    message as msg
} from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios'
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import DBLine from '../../components/DBLine/DBline';
const { confirm } = Modal
const CNYoptions = {
    style: 'currency',
    currency: 'CNY',
};
export default function ProdDetail() {
    const navigate = useNavigate()
    // const [params] = useSearchParams()
    const params = useParams()
    const [data, setData] = useState({})
    const location = useLocation()
    useEffect(() => {
        // //console.log('params=', params.get('id'));
        //console.log(params);
        axios.get('/api/product/get/' + params.id, {
            headers: {
                "token": sessionStorage.getItem('token')
            }
        }).then(res => {
            //console.log(res);
            setData(res.data.data)
        }).catch(err => {
            //console.log(err);
        })
    }, [params])
    const clickChange = () => {
        //console.log('点击修改产品', location);
        navigate(location.pathname + '/change', {
            state: {
                data
            }
        })
    }

    const clickDelete = () => {
        //console.log('点击删除产品');
        confirm({
            title: '您想删除这款产品吗?',
            icon: <ExclamationCircleOutlined />,
            content: '删除操作无法撤回，请再次确认！',
            onOk() {
                //console.log('OK');
                axios.post('/api/product/delete/' + data.productId, JSON.stringify({}), {
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                        "token": sessionStorage.getItem('token')
                    }
                }).then(res => {
                    //console.log(res);
                    // ,{replace:true}
                    const { code, message } = res.data
                    if (code === 1200) {
                        msg.success('删除成功，前往产品列表')
                        navigate('/checkpro', { replace: true })
                    } else {
                        msg.error('删除失败，请重试！')
                    }

                }).catch(err => {
                    //console.log(err);
                    msg.error('网络繁忙，请稍后重试！')
                })
            },
            onCancel() {
                //console.log('Cancel');
            },
        });
    }

    return (
        <>
            <div>
                {/* <PageHeader title="产品详情" /> */}
                <Descriptions title="产品详情" bordered column={2}
                    extra={
                        <>
                            <Button style={{ marginRight: 20 }} type='primary' onClick={clickChange}>修改产品信息</Button>
                            <Button type='primary' onClick={clickDelete}>删除产品</Button>
                        </>
                    }
                >
                    <Descriptions.Item label="产品名称" >{data.productName}</Descriptions.Item>
                    <Descriptions.Item label="产品代码" >{data.productId}</Descriptions.Item>
                    <Descriptions.Item label="产品生效日期">{data.effectTime}</Descriptions.Item>
                    <Descriptions.Item label="存款期限">{data.period}天</Descriptions.Item>
                    <Descriptions.Item label="预计收益">{(data.income * 100).toFixed(3) + ''}%</Descriptions.Item>
                    {/* <Descriptions.Item label="单位净值">{1 + 1 * data.income + ''}</Descriptions.Item> */}
                    <Descriptions.Item label="产品总金额">
                        {(data.setPrototal && data.setPrototal.toLocaleString('zh-CN', CNYoptions))}
                    </Descriptions.Item>
                    <Descriptions.Item label="产品余额">
                        {(data.prototal && data.prototal.toLocaleString('zh-CN', CNYoptions))}
                    </Descriptions.Item>
                </Descriptions>
            </div>
            <div>
                <PageHeader title="产品销售额" />
                <Row gutter={16}>
                    <Col span={24}>
                        <DBLine />
                    </Col>
                </Row>
            </div>
            <Outlet />
        </>
    )
}
