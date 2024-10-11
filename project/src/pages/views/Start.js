import React from 'react';
import Router from 'next/router';
import { Button, Typography } from 'antd';

const { Title, Text } = Typography;

const Start = (props) => {
    const goLayoutHandler = () => {
        Router.push({
            pathname: '/layout',
        });
    };

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                backgroundImage: `url("https://img-qn.51miz.com/preview/element/00/01/18/55/E-1185569-C19E0244.jpg")`,
                backgroundSize: 'cover'
            }}
        >
            <div style={{ textAlign: 'center', maxWidth: '600px' }}>
                <Title level={1} style={{ color: '#000000' }}>
                    欢迎使用IMESSAGE
                </Title>
                <p style={{ textAlign: "center" }}>为了保护您的隐私，请使用 HTTPS 协议访问本网址。</p>
                <p style={{ textAlign: "center" }}>使用 HTTP 协议访问将会在登录后被强制登出。</p>
                <p style={{ textAlign: "center" }}>我们的主页是：<a href="https://frontend-seteamp.app.secoder.net/index">https://frontend-seteamp.app.secoder.net/index</a></p>
                <Button type="primary" onClick={goLayoutHandler}>
                    开始体验
                </Button>
                <br />
                <div style={{ color: 'purple', marginTop: '20px' }}>
                    <Text strong>前端开发人员：</Text>
                    <br />
                    <Text>田田 tian-t21@mails.tsinghua.edu.cn</Text>
                    <br />
                    <Text>彭扬达 pyd21@mails.tsinghua.edu.cn</Text>
                    <br />
                    <br />
                    <Text strong>后端开发人员：</Text>
                    <br />
                    <Text>金佳希 jinjx@mails.tsinghua.edu.cn</Text>
                    <br />
                    <Text>黄宇成 yc-huang@mails.tsinghua.edu.cn</Text>
                    <br />
                    <Text>李子轩 zx-li@mails.tsinghua.edu.cn</Text>
                    <br />
                </div>
            </div>
        </div>
    );
};

export default Start;
