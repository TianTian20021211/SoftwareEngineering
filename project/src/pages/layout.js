import React from 'react'
import Router from 'next/router'
import { Button } from 'antd';

class Layout extends React.Component {
    //1.登陆
    logInHandler = () => {
        Router.push({
            pathname: '/login'
        })
    }
    //2.注销
    logOutHandler = () => {
        Router.push({
            pathname: '/logout'
        })
    }
    // 3.注册
    registerHandler = () => {
        Router.push({
            pathname: '/register'
        })
    }
    // 4.返回首页
    startHandler = () => {
        Router.push({
            pathname: '/'
        })
    }
    render() {
        return (
            <div style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                backgroundImage: `url("https://img-qn.51miz.com/preview/element/00/01/18/55/E-1185569-C19E0244.jpg")`,
                backgroundSize: "cover"
            }}>
                <p style={{ opacity: "0.0" }}>pyd</p>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%"
                }}>
                    <p style={{
                        fontSize: "60px",
                        color: "black",
                        marginTop: "-150px"
                    }}>IMESSAGE</p>

                    <p>为了保护您的隐私，请使用https协议访问本网址。</p>
                    <p>使用http协议访问将会在登录后被强制登出。</p>
                    <p style={{ textAlign: "center" }}>我们的主页是：<a href="https://frontend-seteamp.app.secoder.net/index">https://frontend-seteamp.app.secoder.net/index</a></p>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: "40px"
                    }}>
                        <p style={{
                            fontSize: '24px',
                            fontWeight: 'bold',
                            color: 'black',
                            marginBottom: "20px"
                        }}>{"请选择您的操作"}</p>
                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            marginBottom: "20px"
                        }}>
                            <Button
                                style={{
                                    backgroundColor: "rgb(0,200,20)",
                                    marginRight: "20px", color: "white"
                                }}
                                size="large"
                                onClick={this.logInHandler}
                            >
                                登录账户
                            </Button>
                            <Button
                                style={{
                                    backgroundColor: "rgb(0,200,20)",
                                    marginRight: "20px", color: "white"
                                }}
                                size="large"
                                onClick={this.logOutHandler}
                            >
                                注销账户
                            </Button>
                            <Button
                                style={{
                                    backgroundColor: "rgb(0,200,20)", color: "white"
                                }}
                                size="large"
                                onClick={this.registerHandler}
                            >
                                注册账户
                            </Button>
                        </div>
                        <Button
                            style={{
                                backgroundColor: "white", color: "black"
                            }}
                            size="large"
                            onClick={this.startHandler}
                        >
                            返回首页
                        </Button>
                    </div>
                </div>
            </div>
        );

    }
}
export default Layout
