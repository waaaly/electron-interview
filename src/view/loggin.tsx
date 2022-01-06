/*
 * @Description:
 * @Author: waaaly
 * @Github: https://github.com/waaaly
 * @Date: 2021-07-26 17:28:53
 * @LastEditTime: 2021-08-30 10:13:05
 */
import React, { useState } from 'react';
import { Input, Button, message, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import background from '../assets/image/login-bg-small.jpg';
import logImg from '../assets/image/log.png';

export default (props: any): JSX.Element => {
    let user: string;
    let phone: string;
    const [password, setPassword] = useState<string>('');
    console.log(props);
    function adminLogin() {
        Modal.confirm({
            title: '管理员登录',
            icon: <ExclamationCircleOutlined />,
            content: (
                <Input
                    type="password"
                    onPressEnter={(e: any) => setPassword(e)}
                    onChange={(e: any) => setPassword(e)}
                />
            ),
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                if (password === 'snwit') {
                    props.history.push({ pathname: '/admin' });
                }
            },
        });
    }
    function login() {
        const phoneRule = /^1[3456789]\d{9}$/;
        try {
            if (!user || !phone) {
                throw Error('请输入姓名和手机号！');
            }

            if (!phoneRule.test(phone)) {
                throw Error('手机号码有误，请重填！');
            }

            localStorage.setItem('user', user);
            localStorage.setItem('phone', phone);
            localStorage.setItem(
                'loginTime',
                moment(new Date()).format('YYYY-MM-DD HH:MM:SS')
            );
            props.history.push({ pathname: '/exam' });
        } catch (err) {
            message.error(err);
        }
    }

    return (
        <div className="App">
            <div
                style={{
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    position: 'absolute',
                    backgroundImage: `url(${background})`,
                    backgroundSize: 'cover',
                    filter: 'blur(5px)',
                    zIndex: -1,
                }}
            />
            <p className="app-title">欢迎使用广州司南面试系统</p>
            <div className="sn-login">
                <img
                    onClick={() => {
                        adminLogin();
                    }}
                    src={logImg}
                    style={{ width: 40, height: 40 }}
                />

                <div className="left">用户名：</div>
                <Input
                    style={{
                        height: 50,
                        fontSize: 14,
                        borderRadius: 8,
                        marginBottom: 20,
                    }}
                    placeholder="请输入姓名"
                    onChange={(e) => (user = e.target.value)}
                />
                <div className="left">手机号：</div>
                <Input
                    style={{
                        height: 50,
                        borderRadius: 8,
                        fontSize: 14,
                        marginBottom: 40,
                    }}
                    placeholder="请输入手机号码"
                    maxLength={11}
                    onChange={(e) => (phone = e.target.value)}
                />
                <Button
                    type="primary"
                    style={{
                        height: 40,
                        width: 180,
                        borderRadius: 4,
                        fontSize: 16,
                    }}
                    onClick={() => login()}
                >
                    进入答题
                </Button>
            </div>
        </div>
    );
};
