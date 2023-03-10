import React, { useEffect, useState } from 'react'
import {
    Button, Descriptions, Modal,
    Card, Row, Col, Statistic,
    message as msg, Tooltip, PageHeader
} from 'antd'
import {
    ExclamationCircleOutlined,
    ArrowUpOutlined
} from '@ant-design/icons';
import axios from 'axios'
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import AreaLine from '../../components/AreaLine/AreaLine';
import SexPie from '../../components/SexPie/SexPie';
import AgePie from '../../components/AgePie/AgePie';
import TopUsers from '../../components/TopUsers/TopUsers';
import PropComp from '../../components/PropComp/PropComp';
import moment from 'moment';

import './ActDetail.css'
const CNYoptions = {
    style: 'currency',
    currency: 'CNY',
};
const { confirm } = Modal
export default function ActDetail() {
    const navigate = useNavigate()
    // const [params] = useSearchParams()
    const params = useParams()
    const [actData, setActData] = useState({})
    const location = useLocation()
    const [LineData, setLineData] = useState([])
    const [startData, setStartData] = useState({})

    //console.log('render', actData);
    useEffect(() => {
        // //console.log('params=', params.get('id'));
        // //console.log(params);
        axios.get('/api/manager/activity/get/' + params.id, {
            headers: {
                "token": sessionStorage.getItem('token')
            }
        }).then(res => {
            //console.log(res);
            //console.log("===");
            const { code, data, message } = res.data
            if (code === 1200) {
                const temp = []
                let tempTime = data[0].startTime
                const tempEndTime = data[0].endTime
                const nowTime = moment().format("YYYY-MM-DD HH:mm:ss")
                while (tempTime < nowTime && tempTime < tempEndTime) {
                    temp.push({ timePeriod: tempTime, value: 0 })
                    tempTime = moment(tempTime, "YYYY-MM-DD HH:mm:ss").add(1, "minutes").format("YYYY-MM-DD HH:mm:ss")
                    // //console.log(tempTime);
                    // break;
                }
                const arr = data[2]
                let sumPeople = 0;
                let sumOrder = 0;
                // let i = 0;
                if (arr.length) {
                    arr.forEach(element => {
                        sumPeople += element.userNum
                        sumOrder += element.totalNum
                        temp[element.moment].value = element.totalNum
                    });
                    //console.log(temp);
                    const last = arr.pop()
                    setStartData({ sumPeople, sumOrder, addProple: 1, addOrder: 1 })
                }

                setLineData(temp);
                setActData({ ...data[0], ...data[1] })
            } else {
                msg.error(message)
            }
        }).catch(err => {
            //console.log(err);
            msg.error('?????????????????????????????????')
        })
        const timer = setInterval(() => {
            //console.log('????????????');
            axios.get('/api/manager/activity/get/' + params.id, {
                headers: {
                    "token": sessionStorage.getItem('token')
                }
            }).then(res => {
                // //console.log(res);
                //console.log("====================================");
                const { code, data, message } = res.data
                if (code === 1200) {
                    const temp = []
                    let tempTime = data[0].startTime
                    const tempEndTime = data[0].endTime
                    const nowTime = moment().format("YYYY-MM-DD HH:mm:ss")
                    while (tempTime < nowTime && tempTime < tempEndTime) {
                        temp.push({ timePeriod: tempTime, value: 0 })
                        tempTime = moment(tempTime, "YYYY-MM-DD HH:mm:ss").add(1, "minutes").format("YYYY-MM-DD HH:mm:ss")
                        // //console.log(tempTime);
                        // break;
                    }
                    const arr = data[2]
                    let sumPeople = 0;
                    let sumOrder = 0;
                    if (arr.length) {
                        arr.forEach(element => {
                            sumPeople += element.userNum
                            sumOrder += element.totalNum
                            temp[element.moment].value = element.totalNum
                        });
                        //console.log(temp);
                        const last = arr.pop()
                        setStartData({ sumPeople, sumOrder, addProple: sumPeople - last.userNum, addOrder: sumOrder - last.totalNum })
                    }

                    setLineData(temp);
                    setActData({ ...data[0], ...data[1] })
                } else {
                    msg.error(message)
                }
            }).catch(err => {
                //console.log(err);
                msg.error('?????????????????????????????????')
            })
        }, 60000)
        return () => {
            clearInterval(timer)
        }
    }, [params])
    const clickChange = () => {
        //console.log('??????????????????', location);
        navigate(location.pathname + '/change', {
            state: {
                actData
            }
        })
    }

    const clickDelete = () => {
        //console.log('??????????????????');
        confirm({
            title: '????????????????????????????',
            icon: <ExclamationCircleOutlined />,
            content: '?????????????????????????????????????????????',
            onOk() {
                //console.log('OK', sessionStorage.getItem('token'));
                axios.post('/api/activity/delete/' + actData.activityId, JSON.stringify({}), {
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                        'token': sessionStorage.getItem('token'),
                    }
                }).then(res => {
                    //console.log(res);
                    // ,{replace:true}
                    const { code, message } = res.data
                    if (code === 1200) {
                        msg.success('???????????????????????????????????????')
                        navigate('/checkactivity', { replace: true })
                    } else {
                        msg.error('????????????????????????')
                    }

                }).catch(err => {
                    //console.log(err);
                    msg.error('????????????????????????')
                })
            },
            onCancel() {
                //console.log('Cancel');
            },
        });
    }
    const clickBuyed = () => {
        //console.log('??????????????????', location);
        navigate(location.pathname + '/orderlist', {
            state: {
                actData
            }
        })
    }

    return (
        <>
            <div>
                <Descriptions title="??????????????????" bordered column={2}
                    extra={
                        <>
                            <Button style={{ marginRight: 20 }} type='primary' onClick={clickBuyed}>????????????</Button>
                            <Tooltip placement="topLeft" title="?????????????????????">
                                <Button disabled={moment().format("YYYY-MM-DD HH:mm:ss") >= actData.startTime ? true : false}
                                    style={{ marginRight: 20 }} type='primary' onClick={clickChange}>??????????????????</Button>
                                <Button disabled={moment().format("YYYY-MM-DD HH:mm:ss") >= actData.startTime ? true : false}
                                    type='primary' onClick={clickDelete}>????????????</Button>
                            </Tooltip>
                        </>
                    }
                >
                    <Descriptions.Item label="????????????" >{actData.productName}</Descriptions.Item>
                    <Descriptions.Item label="????????????" >{actData.productId}</Descriptions.Item>
                    <Descriptions.Item label="??????????????????">{actData.effectTime}</Descriptions.Item>
                    <Descriptions.Item label="????????????">{actData.period}</Descriptions.Item>
                    <Descriptions.Item label="????????????">{(actData.income * 100).toFixed(3) + ''}%</Descriptions.Item>
                    <Descriptions.Item label="????????????">{(1 + 1 * actData.income + '').toLocaleString('zh-CN', CNYoptions)}</Descriptions.Item>
                    <Descriptions.Item label="??????????????????">{(actData.setTotal * actData.price).toLocaleString('zh-CN', CNYoptions)}</Descriptions.Item>
                    <Descriptions.Item label="????????????/???">{(actData.price && actData.price.toLocaleString('zh-CN', CNYoptions))}???/???</Descriptions.Item>
                    <Descriptions.Item label="?????????????????????">{actData.limit}???</Descriptions.Item>
                    <Descriptions.Item label="????????????">{(actData.setTotal - actData.quantity).toLocaleString()}/{(actData.setTotal && actData.setTotal.toLocaleString())}</Descriptions.Item>
                    <Descriptions.Item label="??????????????????">{actData.startTime}</Descriptions.Item>
                    <Descriptions.Item label="??????????????????">{actData.endTime}</Descriptions.Item>
                </Descriptions>
            </div>
            <div className='started-div'>
                <PageHeader title="??????????????????" />
                <div style={{ backgroundColor: '#f0f0f0', padding: '30px' }}>
                    <Row justify="space-around" gutter={16}>
                        <Col span={10}>
                            <Card bordered>
                                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                    <Statistic
                                        title="????????????"
                                        value={startData.sumPeople}
                                        // precision={2}
                                        valueStyle={{ color: '#ef3a41' }}
                                        // prefix={<ArrowUpOutlined />}
                                        suffix="???"
                                    />
                                    <Statistic
                                        title="??????"
                                        value={startData.addProple}
                                        // precision={2}
                                        valueStyle={{ color: '#3f8600' }}
                                        prefix={<ArrowUpOutlined />}
                                        suffix="???"
                                    />
                                </div>
                            </Card>
                        </Col>
                        <Col span={10}>
                            <Card bordered>
                                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                    <Statistic
                                        title="????????????"
                                        value={startData.sumOrder}
                                        // precision={2}
                                        valueStyle={{ color: '#ef3a41' }}
                                        // prefix={<ArrowUpOutlined />}
                                        suffix="???"
                                    />
                                    <Statistic
                                        title="??????"
                                        value={startData.addOrder}
                                        // precision={2}
                                        valueStyle={{ color: '#3f8600' }}
                                        prefix={<ArrowUpOutlined />}
                                        suffix="???"
                                    />
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </div>
                <div>
                    <PageHeader title="???????????????" />
                    <Row gutter={16}>
                        <Col span={24}>
                            <AreaLine LineData={LineData} />
                        </Col>
                    </Row>
                </div>
            </div>
            <div>
                <PageHeader title="??????????????????" />
                <Row gutter={16}>
                    <Col className="gutter-row" span={12}>
                        <PageHeader title="????????????" />
                        {/* <div className='title'>????????????</div> */}
                        <div className='sex' style={{ height: 300 }}>
                            <SexPie />
                        </div>
                    </Col>
                    <Col className="gutter-row" span={12}>
                        <PageHeader title="???????????????" />
                        {/* <div className='title'>???????????????</div> */}
                        <div className='age' style={{ height: 300 }}>
                            <AgePie />
                        </div>
                    </Col>
                </Row>
                <div>
                    <PageHeader title="??????????????????????????????" />
                    <PropComp />
                </div>
                <div>
                    <PageHeader title="????????????" />
                    <TopUsers />
                </div>

            </div>
            <Outlet />
        </>
    )
}
