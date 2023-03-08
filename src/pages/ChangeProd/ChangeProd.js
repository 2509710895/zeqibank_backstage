import React, { useEffect } from 'react';
import {
    Form,
    Input,
    Button,
    DatePicker,
    InputNumber,
} from 'antd';

import axios from 'axios';
import { useLocation } from 'react-router-dom';
import moment from 'moment';
// const { RangePicker } = DatePicker;
const effectTimeFormat = "YYYY-MM-DD";
export default function ChangeProd() {
    //console.log('ChangeProd render');
    // const [params] = useSearchParams()
    // const [data, setData] = useState({})
    const Stateparams = useLocation()

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
        //console.log(Stateparams.state, Stateparams);
        const { data } = Stateparams.state
        data.effectTime = moment(data.effectTime, effectTimeFormat)
        form.setFieldsValue(data)
    }, [Stateparams, form])

    const onFinish = (fieldsValue) => {
        //改为更新产品
        const values = {
            ...fieldsValue,
            'effectTime': fieldsValue['effectTime'].format('YYYY-MM-DD'),
            // 'date-time-picker': fieldsValue['date-time-picker'].format('YYYY-MM-DD HH:mm:ss'),
        }
        //console.log('newgood Received values of form: ', values);
        axios.post('/api/product/add', JSON.stringify(values), {
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                "token": sessionStorage.getItem('token')
            }
        }).then(res => {
            //console.log(res);
        }).catch(err => {
            //console.log(err);
        })
    };

    const onChange = (value, dateString) => {
        //console.log('Selected Time: ', value);
        //console.log('Formatted Selected Time: ', dateString);
    }

    const onOk = (value) => {
        //console.log('onOk: ', value);
    }

    return (
        <div className='NewGoodDiv'>
            <Form
                {...formItemLayout}
                form={form}
                name="newgood"
                onFinish={onFinish}
                scrollToFirstError
                initialValues={{ permax: 10 }}
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
                    <Input />
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
                    <DatePicker onChange={onChange} onOk={onOk} />
                </Form.Item>

                <Form.Item
                    name="period"
                    label="存款期限/天"
                    // tooltip="What do you want others to call you?"
                    rules={[
                        {
                            required: true,
                            message: '请输入产品的存款期限',
                        },
                    ]}
                >
                    <Input />
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
                    <InputNumber style={{ width: 300 }} controls={false} />
                </Form.Item>

                <Form.Item
                    name="setPrototal"
                    label="总金额"
                    rules={[
                        {
                            required: true,
                            message: '请输入产品总金额',
                        },
                    ]}
                    wrapperCol={{
                        span: 16,
                        // offset: 16
                    }}
                >
                    <InputNumber prefix="￥" style={{ width: 300 }} controls={false}
                        formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => value.replace(/\$\s?|(,*)/g, '')} />
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        确认修改
                    </Button>
                </Form.Item>
            </Form>
        </div >
    );

}