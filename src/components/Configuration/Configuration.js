import React from 'react';
import {
    Form,
    InputNumber,
    Button,
    Switch,
    message as msg
} from 'antd';


import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import axios from 'axios';
import './Configuration.css'

export default function Configuration() {
    const formItemLayout = {
        labelCol: {
            // xs: {
            //     span: 24,
            // },
            // sm: {
            //     span: 10,
            // },
            span: 10
        },
        wrapperCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 6,
            },
            // span: 10,
            // offset: 0
        },
    };
    const tailFormItemLayout = {
        wrapperCol: {
            // xs: {
            //     span: 24,
            //     offset: 0,
            // },
            // sm: {
            //     span: 16,
            //     offset: 9,
            // },
            span: 24,
            offset: 9
        },
    };

    const [form] = Form.useForm();

    const onFinish = (values) => {
        //console.log('Received values of form: ', values);
        const value = {
            ...values,
            isoverdue: values.isOverdue ? 1 : 0,
            unemployment: values.unemployment ? 1 : 0,
            poorCredit: values.poorCredit ? 1 : 0
        }
        //console.log(value);
        axios.post('/api/filter/add', JSON.stringify(value), {
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                "token": sessionStorage.getItem('token')
            }
        }).then(res => {
            //console.log(res);
            const { code, message } = res.data
            if (code === 1200) {
                msg.success("配置成功")
            } else {
                msg.error(message)
            }
        }).catch(err => {
            //console.log(err);
            msg.error("网络繁忙，请稍后重试！")
        })
    };

    const onSwitchChange = (checked) => {
        //console.log('onSwitchChange', checked);
        if (!checked) {
            form.setFieldsValue({
                overdueYear: null,
                overdueCount: null,
                overdueDebt: null,
                overdueDate: null
            })
        }
    }

    const onSwitchChange2 = (checked) => {
        //console.log('onSwitchChange2', checked);
        if (!checked) {
            form.setFieldsValue({
                agelimit: 0
            })
        }
    }

    return (
        <div className='NewGoodDiv'>
            <Form
                {...formItemLayout}
                form={form}
                name="config"
                onFinish={onFinish}
                initialValues={{
                    isOverdue: true,
                    overdueYear: 3,
                    overdueCount: 2,
                    overdueDebt: 2000,
                    overdueDate: 3,
                    unemployment: true,
                    poorCredit: true,
                    isAge: true,
                    agelimit: 18
                }}
                scrollToFirstError
            // labelCol={{
            //     span: 10
            // }}
            >

                <Form.Item
                    name="isOverdue"
                    label="是否限制逾期"
                    valuePropName="checked"
                    rules={[
                        {
                            required: true,
                            message: '请选择是否限制逾期',
                        }
                    ]}
                >
                    <Switch
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                        defaultChecked={false}
                        onChange={onSwitchChange}
                    />
                </Form.Item>

                <Form.Item
                    name="overdueYear"
                    label="逾期年度范围/年"
                // rules={[
                //     {
                //         required: true,
                //         message: '请输入逾期年度范围',
                //     },
                // ]}
                >
                    <InputNumber />
                </Form.Item>

                <Form.Item
                    name="overdueCount"
                    label="逾期次数"
                // rules={[
                //     {
                //         required: true,
                //         message: '请输入逾期次数',
                //     },
                // ]}
                >
                    <InputNumber />
                </Form.Item>

                <Form.Item
                    name="overdueDebt"
                    label="欠款额度/元"
                    dependencies={['password']}
                // rules={[
                //     {
                //         required: true,
                //         message: '请输入欠款额度',
                //     }
                // ]}
                >
                    <InputNumber controls={false} />
                </Form.Item>

                <Form.Item
                    name="overdueDate"
                    label="还清欠款期限/天"
                // rules={[
                //     {
                //         required: true,
                //         message: '请输入还清欠款期限',
                //     },
                // ]}
                >
                    <InputNumber />
                </Form.Item>

                <Form.Item
                    name="unemployment"
                    label="无业/失业人员是否限制"
                    valuePropName="checked"
                    rules={[
                        {
                            required: true,
                            message: '请选择无业/失业人员能否购买!',
                        }
                    ]}
                >
                    <Switch
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                        defaultChecked={false}
                    // onChange={onSwitchChange}
                    />
                </Form.Item>

                <Form.Item
                    name="poorCredit"
                    label="失信人是否限制"
                    valuePropName="checked"
                    rules={[
                        {
                            required: true,
                            message: '请选择失信人能否购买!',
                        },
                    ]}
                >
                    <Switch
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                        defaultChecked={false}
                    // onChange={onSwitchChange2}
                    />
                </Form.Item>

                <Form.Item
                    name="isAge"
                    label="是否限制年龄"
                    valuePropName="checked"
                    rules={[
                        {
                            required: true,
                            message: '请选择是否限制年龄',
                        },
                    ]}
                >
                    <Switch
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                        defaultChecked={false}
                        onChange={onSwitchChange2}
                    />
                </Form.Item>

                <Form.Item
                    name="agelimit"
                    label="用户年龄下限"
                    rules={[
                        {
                            required: true,
                            message: '请输入用户年龄下限!',
                        },
                    ]}
                >
                    <InputNumber

                    />
                </Form.Item>


                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        完成配置
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );

}
