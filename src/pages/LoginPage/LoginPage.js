import React from 'react'
import { Form, Input, Button, Checkbox, message as msg } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import axios from 'axios';
import './LoginPage.css'
import { Link, useNavigate } from 'react-router-dom';

export default function LoginPage(props) {
    const { setUsername } = props
    const navigate = useNavigate()
    const onFinish = (values) => {
        //console.log('Received values of form: ', values);
        // //console.log(process.env.REACT_APP_API_URL);
        axios.post('/api/manager/logintoken', JSON.stringify(values), {
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        }).then(res => {
            //console.log("success", res);
            const { code, data } = res.data

            if (code === 1200) {
                const { token, id, username } = data
                msg.success('登录成功')
                sessionStorage.setItem('token', token)
                sessionStorage.setItem('id', id)
                sessionStorage.setItem('username', username)
                setUsername(username)
                navigate('/index')
            } else {
                msg.error('手机号或密码错误')
            }
        }).catch(err => {
            //console.log(err);
            msg.error('服务器繁忙，请稍后重试')
        })

    }
    const onLogFinishFailed = (errorInfo) => {
        //console.log('Reg Failed:', errorInfo);
    };

    return (
        <div className='LoginFormDiv'>
            <Form
                name="normal_login"
                // labelCol={{
                //     span: 8,
                // }}
                wrapperCol={{
                    span: 4,
                    offset: 8,
                }}
                // className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onLogFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    name="phone"
                    rules={[
                        {
                            required: true,
                            message: '请输入手机号!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="手机号" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: '请输入密码!',
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="密码"
                    />
                </Form.Item>
                {/* <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>记住我</Checkbox>
                    </Form.Item>

                    <a className="login-form-forgot" href="http://www.baidu.com">
                        忘记密码
                    </a>
                </Form.Item> */}

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        登录
                    </Button>
                    或者 <Link to="/reg">注册!</Link>
                </Form.Item>
            </Form>
        </div>
    )
}
