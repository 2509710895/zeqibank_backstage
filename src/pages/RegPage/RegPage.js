import React from 'react'
import { Form, Input, Button, message as msg } from 'antd';

import './RegPage.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import stringify from '../../priSrc/changeToFormData.js'
export default function RegPage() {

    const navigate = useNavigate()

    const onRegFinish = (values) => {
        //console.log('Reg Success:', values);
        axios.post('/api/manager/register', JSON.stringify(values), {
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        }).then(res => {
            //console.log(res);
            const { code, message } = res.data;
            if (code === 1200) {
                msg.success('注册成功，前往登录')
                navigate('/')
            } else if (code === 1001) {
                msg.error(message)
            } else if (code === 1002) {
                msg.error(message)
            } else {
                msg.error(message)
            }
        }).catch(err => {
            //console.log(err);
        })
        // axios({
        //     method: 'post',
        //     url: '/api/manager/register',
        //     // data: {
        //     //     username: 'dzm',
        //     //     password: 'dzm123456'
        //     // },
        //     data: values,
        //     transformRequest: [
        //         function (data) {
        //             // 将请求数据转换成功 formdata 接收格式
        //             return stringify(data)
        //         }
        //     ],
        //     headers: {
        //         'Content-Type': 'application/x-www-form-urlencoded'
        //     }
        // }).then(res => {
        //     //console.log("success", res);
        // }).catch(err => {
        //     //console.log(err);
        // })
    };

    const onRegFinishFailed = (errorInfo) => {
        //console.log('Reg Failed:', errorInfo);
    };


    return (
        <div className='content-div'>

            <Form
                name="Reg"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 8,
                }}
                onFinish={onRegFinish}
                onFinishFailed={onRegFinishFailed}
                autoComplete="off"
                size='large'
                className='RegForm'
                style={{ display: '' }}
            >
                <Form.Item
                    label="管理员姓名"
                    name="managername"
                    rules={[
                        {
                            required: true,
                            message: '请输入您的姓名!',
                        },
                    ]}
                    className='RegFormItem'
                >
                    <Input className='RegFormInput' />
                </Form.Item>
                <Form.Item
                    label="手机号"
                    name="phone"
                    rules={[
                        {
                            required: true,
                            message: '请输入您的手机号!',
                        },
                        () => ({
                            validator(_, value) {
                                const patter = /^1[0-9]{10}$/
                                if (!value || patter.test(value)) {
                                    return Promise.resolve();
                                }

                                return Promise.reject(new Error('请输入正确的手机号!'));
                            },
                        }),
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="密码"
                    name="password"
                    rules={[
                        { required: true, message: '请输入6-16位数字、字母密码!' },
                        () => ({
                            validator(_, value) {
                                const patter = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
                                if (!value || patter.test(value)) {
                                    return Promise.resolve();
                                }

                                return Promise.reject(new Error('请输入6-16位数字、字母密码!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name="confirm_password"
                    label="确认密码"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: '请再次输入密码进行确认!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }

                                return Promise.reject(new Error('两次输入密码不匹配!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                {/* <Form.Item
                    label="工号"
                    name="job_number"
                    rules={[
                        {
                            required: true,
                            message: '请输入您的工号!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item> */}


                <Form.Item
                    wrapperCol={{
                        offset: 11,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        注册
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
