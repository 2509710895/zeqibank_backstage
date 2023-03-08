import React, { useEffect, useState } from 'react'
import {
    Form,
    Input,
    InputNumber,
    Button,
    DatePicker,
    Select,
    message as msg
} from 'antd';

import axios from 'axios';
import moment from 'moment';
import { useLocation } from 'react-router-dom';

const { Option } = Select
// const { RangePicker } = DatePicker;
const TimeFormat = "YYYY-MM-DD HH:mm:ss";
const effectTimeFormat = "YYYY-MM-DD";
export default function ChangeActivity() {

    const [prodData, setProdData] = useState([])
    const location = useLocation()
    const [filterData, setFilterData] = useState([])

    const formItemLayout = {
        labelCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 8,
            },
        },
        wrapperCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 6,
            },
        },
    };
    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 16,
                offset: 8,
            },
        },
    };

    const [form] = Form.useForm();

    useEffect(() => {
        //console.log('开始请求', location.state);
        // //console.log(Stateparams.state, Stateparams);
        axios.get('/api/product/list', {
            headers: {
                "token": sessionStorage.getItem('token')
            }
        }).then(res => {
            //console.log(res);
            const { code } = res.data
            if (code === 1200) {
                //console.log(res.data.data);
                setProdData([...res.data.data])
                const { actData } = location.state
                actData.effectTime = moment(actData.effectTime, effectTimeFormat)
                actData.startTime = moment(actData.startTime, TimeFormat)
                actData.endTime = moment(actData.endTime, TimeFormat)
                form.setFieldsValue(actData)
                // //console.log(prodData);
            } else {
                msg.error(res.data.message)
            }
        }).catch(err => {
            //console.log(err);
        })
        axios.get('/api/filter/getall', {
            headers: {
                "token": sessionStorage.getItem('token')
            }
        }).then(res => {
            //console.log(res);
            const { code, message } = res.data
            if (code === 1200) {
                //console.log(res.data.data);
                setFilterData(res.data.data)
            } else {
                msg.error(message)
            }
        }).catch(err => {
            //console.log(err);
        })
    }, [form, location])

    const change = (value) => {
        //console.log(value);
    }

    const onFinish = (fieldsValue) => {
        const values = {
            ...fieldsValue,
            'effectTime': fieldsValue['effectTime'].format('YYYY-MM-DD'),
            'startTime': fieldsValue['startTime'].format('YYYY-MM-DD HH:mm:ss'),
            'endTime': fieldsValue['endTime'].format('YYYY-MM-DD HH:mm:ss'),
            'activityId': location.state.actData.activityId
        }
        //console.log('Received values of form: ', values);
        axios.post('/api/activity/upd', JSON.stringify(values), {
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                "token": sessionStorage.getItem('token')
            }
        }).then(res => {
            //console.log(res);
            const { code, message } = res.data
            if (code === 1200) {
                msg.success(message)
            } else {
                msg.error(message)
            }
        }).catch(err => {
            //console.log(err);
            msg.error('网络繁忙，请稍后重试！')
        })
    };
    const onFinishFailed = (err) => {
        //console.log('failed', err);
    }

    function onInputNumberChange(value) {
        //console.log('changed', value);
    }

    const onChange2 = (value, dateString) => {
        //console.log('Selected Time: ', value);
        //console.log('Formatted Selected Time: ', dateString);
    }

    const onOk2 = (value) => {
        //console.log('onOk: ', value);
    }

    const onChange3 = (value, dateString) => {
        //console.log('Selected Time: ', value);
        //console.log('Formatted Selected Time: ', dateString);
    }

    const onOk3 = (value) => {
        //console.log('onOk: ', value);
    }

    function onSearchChange(value) {
        //console.log(`selected ${value}`);
        const temp = prodData.find((data) => data.productId === value)
        temp.effectTime = moment(temp.effectTime, effectTimeFormat)
        form.setFieldsValue(temp)
        //console.log(form.getFieldValue());
    }

    function onSearch(val) {
        //console.log('search:', val);
    }

    function disabledDate(current) {
        // Can not select days before today and today
        return current && current < moment().endOf('day');
    }

    return (
        <div className=''>
            <Form
                {...formItemLayout}
                form={form}
                name="activity"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                scrollToFirstError
                initialValues={{ limit: 10, before: true }}
            >
                <Form.Item
                    name="productName"
                    label="产品名称"
                    rules={[

                        {
                            required: true,
                            message: '请输入产品名称',
                        },
                    ]}
                >
                    <Select
                        showSearch
                        placeholder="选择一款产品"
                        optionFilterProp="children"
                        onChange={onSearchChange}
                        onSearch={onSearch}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {
                            prodData.map((obj) => {
                                return <Option key={obj.productId} value={obj.productId}>{obj.productName}</Option>
                            })
                        }
                        <Option value={'test'}>{'test'}</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="productId"
                    label="产品代码"
                    rules={[
                        {
                            required: true,
                            message: '请输入产品代码',
                        },
                    ]}
                >
                    <InputNumber disabled={true} />
                </Form.Item>

                <Form.Item
                    name="effectTime"
                    label="产品生效日期"
                    rules={[
                        {
                            required: true,
                            message: '请选择日期',
                        },
                    ]}
                    hasFeedback
                >
                    <DatePicker disabledDate={disabledDate} disabled={true} />
                </Form.Item>

                <Form.Item
                    name="period"
                    label="存款期限/天"
                    tooltip="What do you want others to call you?"
                    rules={[
                        {
                            required: true,
                            message: '请输入产品的存款期限',
                            // whitespace: true,
                        },
                    ]}
                >
                    <InputNumber disabled={true} />
                </Form.Item>

                <Form.Item
                    name="income"
                    label="预计收益"
                    rules={[
                        {
                            required: true,
                            message: '请输入预计收益',
                        },
                    ]}
                >
                    <InputNumber disabled={true} onChange={change} />
                </Form.Item>

                <Form.Item
                    name="startTime"
                    label="秒杀开始时间"
                    rules={[
                        {
                            required: true,
                            message: '请选择秒杀开始日期',
                        },
                    ]}
                    hasFeedback
                >
                    <DatePicker showTime={{ defaultValue: moment('10:00:00', 'HH:mm:ss') }}
                        disabledDate={disabledDate} onChange={onChange2} onOk={onOk2} />
                </Form.Item>

                <Form.Item
                    name="endTime"
                    label="秒杀结束时间"
                    rules={[
                        {
                            required: true,
                            message: '请选择秒杀结束日期',
                        },
                    ]}
                    hasFeedback
                >
                    <DatePicker showTime={{ defaultValue: moment('22:00:00', 'HH:mm:ss') }}
                        disabledDate={disabledDate} onChange={onChange3} onOk={onOk3} />
                </Form.Item>

                <Form.Item
                    name="setTotal"
                    label="产品总份数"
                    tooltip="What do you want others to call you?"
                    rules={[
                        {
                            required: true,
                            message: '请输入产品总份数',
                        },
                    ]}
                >
                    <InputNumber style={{ width: 150 }} controls={false} />
                </Form.Item>

                <Form.Item
                    name="price"
                    label="产品金额（元）/份"
                    rules={[
                        {
                            required: true,
                            message: '请输入每份的产品金额',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="limit"
                    label="单人最大购买份数"
                    rules={[
                        {
                            required: true,
                            message: '请选择单人最大购买份数',
                        },
                    ]}
                >
                    <InputNumber min={1} max={10000} onChange={onInputNumberChange} />
                </Form.Item>
                <Form.Item
                    name="limitId"
                    label="初筛规则"
                    rules={[

                        {
                            required: true,
                            message: '请输入选择初筛规则',
                        },
                    ]}
                    wrapperCol={{
                        span: 8
                    }}
                >
                    <Select
                        name='limitId'
                        showSearch
                        placeholder="选择一套初筛规则"
                        optionFilterProp="children"
                        // onChange={onSearchChange}
                        onSearch={onSearch}
                        filterOption={(input, option) => {
                            // //console.log(option);
                            return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            // return 1
                        }}
                    // maxTagTextLength={800}
                    >
                        <Option value={0} style={{ wordWrap: 'break-word', wordBreak: 'break-all', overflow: 'hidden' }}>
                            无
                        </Option>
                        {
                            filterData.map((obj) => {
                                const { limitId, overdueCount, overdueDate, overdueDebt, overdueYear,
                                    agelimit, poorCredit, unemployment, isoverdue } = obj
                                return (<Option key={'limit' + limitId} value={limitId}>{
                                    `${isoverdue ? `除${overdueDebt}元${overdueDate}天内还清外${overdueYear}年内逾期${overdueCount}次, ` : ``}${poorCredit ? `失信,` : ``}${unemployment ? `无业/失业,` : ``}低于${agelimit}岁`
                                }</Option>)
                            })
                        }
                    </Select>
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        确认修改
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}