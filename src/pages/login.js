import React from 'react'
import { WhyCantEmail, EmailWrong, WhyErrorInUserInfo } from '../../public/utils';
import reportWebVitals from './views/funcs/reportWebVitals';
import Router from 'next/router'

import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
class Login extends React.Component {
  constructor(props) {
    super(props);
    // react定义数据
    this.state = {
      name: '',
      password: '',
      type: 0,
      email: '',
      emailpassword: ''
    }
  }
  returnToLayOutPage = () => {
    Router.push({
      pathname: '/layout'
    })
  }
  nameChange = (event) => {
    // 把表单输入的值赋值给username
    this.setState({ name: event.target.value });
  }

  // 要求后端给this.state.email对应的邮箱发送邮件
  sendEmailPassword = () => {
    // console.log("用户尝试使用邮箱验证码登录");

    // 构建请求体
    const requestData = {
      email: this.state.email,
      type: "request_verification",
    };
    // 记录一下干了什么
    // console.log("向后端发送了：" + JSON.stringify(requestData));
    // 把请求体发送到后端
    fetch('https://Backend-seteamp.app.secoder.net/request_verification', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    })
      .then(response => {
        // 把发过来的数据解析成json格式
        response.json()
          .then(data => {

            // 把数据中的信息提取出来
            const { code, info } = data;

            // 发过来了成功响应
            if ((code === 0 && info === "Succeed")) {
              // 提示用户操作成功
              message.info("验证码已发送，请您去邮箱查看");

              // 在日志中记录操作成功
              // console.log("成功向邮箱发送验证码");

            }

            // 失败响应
            else {
              // 在日志中记录用户登陆失败
              // console.log("使用邮箱登录失败：" + EmailWrong(code, info));

              // 提示用户登录失败
              message.warning("使用邮箱登录失败：" + EmailWrong(code, info));
            }
          })
          .catch(error => {
            // 打印错误信息到控制台
            // console.error("request_verification的http协议和后端没能成功建立连接，消息无法传到后端");

            // 提示用户失败
            // message.error("request_verification的http协议和后端没能成功建立连接，消息无法传到后端");
          });
      });

  }


  passwordChange = (event) => {
    // 把表单输入的值赋值给userpassword
    this.setState({ password: event.target.value });
  }
  emailPasswordChange = (event) => {
    // 把表单输入的值赋值给userpassword
    this.setState({ emailpassword: event.target.value });
  }
  emailChange = (event) => {
    // 把表单输入的值赋值给userpassword
    this.setState({ email: event.target.value });
  }

  logIn = () => {
    if (this.state.type === 0) // 使用密码登录
    {
      // 提示一下用户现在在做什么
      message.info("您正在尝试使用用户名密码登录账户");
      // 在日志中记录
      // console.log("用户尝试使用用户名密码登录账户");
      // 调用登录函数
      this.NPlogin();
    }
    else if (this.state.type === 1)  // 邮箱登录 
    {
      // 提示一下用户现在在做什么
      message.info("您正在尝试使用邮箱登录账户");
      // 在日志中记录
      // console.log("用户尝试使用邮箱登录账户");
      // 调用邮箱登录函数
      this.EmailLogin();
    }
    else {
      // message.error("前端this.state.type不是0也不是1，出现问题，请联系开发团队解决");
    }
  };

  // 使用用户名和密码登录
  NPlogin = () => {
    // 构建请求体
    const requestData = {
      name: this.state.name,
      password: this.state.password,
    };
    // 记录一下干了什么
    // console.log("向后端发送了：" + JSON.stringify(requestData));
    // 把请求体发送到后端
    fetch('https://Backend-seteamp.app.secoder.net/user_login/name_password', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    })
      .then(response => {
        // 把发过来的数据解析成json格式
        response.json()
          .then(data => {

            // 把数据中的信息提取出来
            const { code, info } = data;

            // 发过来了成功响应
            if ((code === 0 && info === "Succeed")) {
              // 提示用户操作成功
              message.success("使用用户名密码登录成功");

              // 在日志中记录操作成功
              // console.log("用户成功使用用户名密码登录");

              // 跳转到用户界面
              Router.push({
                pathname: '/person', query: { name: this.state.name }
              })
            }

            // 失败响应
            else {
              // 在日志中记录用户登陆失败
              // console.log("使用用户名密码登录失败：" + WhyErrorInUserInfo(code, info));

              // 提示用户登录失败
              message.warning("使用用户名密码登录失败：" + WhyErrorInUserInfo(code, info));
            }
          })
          .catch(error => {
            // 打印错误信息到控制台
            // console.error("user_login/name_password的http协议和后端没能成功建立连接，消息无法传到后端");

            // 提示用户失败
            // message.error("user_login/name_password的http协议和后端没能成功建立连接，消息无法传到后端");
          });


      });
  };

  // 使用邮箱验证登录
  EmailLogin = () => {
    // 构建请求体
    const requestData = {
      email: this.state.email,
      verification: this.state.emailpassword,
    };
    // 记录一下干了什么
    // console.log("向后端发送了：" + JSON.stringify(requestData));
    // 把请求体发送到后端
    fetch('https://Backend-seteamp.app.secoder.net/user_login/email_verification', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    })
      .then(response => {
        // 把发过来的数据解析成json格式
        response.json()
          .then(data => {
            // 把数据中的信息提取出来
            const { code, info, name = null } = data;

            // 发过来了成功响应
            if ((code === 0 && info === "Succeed" && name !== null)) {
              // 提示用户操作成功
              message.success("成功使用邮箱登录");

              // 在日志中记录操作成功
              // console.log("用户成功使用邮箱登录");
              // 跳转到用户界面
              Router.push({
                pathname: '/person', query: { name: name }
              })
            }

            // 失败响应
            else {
              // 在日志中记录用户登陆失败
              // console.log("登录失败：" + WhyCantEmail(code, info));

              // 提示用户登录失败
              message.warning("使用邮箱登录失败：" + WhyCantEmail(code, info));
            }
          })
          .catch(error => {
            // 打印错误信息到控制台
            // console.error("/user_login/email_verification的http协议和后端没能成功建立连接，消息无法传到后端");

            // 提示用户失败
            // message.error("/user_login/email_verification的http协议和后端没能成功建立连接，消息无法传到后端");
          });


      });
  };

  render() {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%", position: "absolute", backgroundImage: `url("https://img-qn.51miz.com/preview/element/00/01/18/55/E-1185569-C19E0244.jpg")`, backgroundSize: "cover" }}>
        <div>
          <p style={{ fontSize: "60px", color: "#000000", marginTop: "-100px", textAlign: "center" }}>IMESSAGE</p>
          <p style={{ textAlign: "center" }}>为了保护您的隐私，请使用 HTTPS 协议访问本网址。</p>
          <p style={{ textAlign: "center" }}>使用 HTTP 协议访问将会在登录后被强制登出。</p>
          <p style={{ textAlign: "center" }}>我们的主页是：<a href="https://frontend-seteamp.app.secoder.net/index">https://frontend-seteamp.app.secoder.net/index</a></p>
          <div style={{ textAlign: "center", marginTop: "30px" }}>
            <p style={{ fontWeight: 'bold', fontSize: '20px', marginBottom: '10px' }}>您正在登录</p>
            <Button type="primary" onClick={() => { this.setState({ type: (this.state.type === 0 ? 1 : 0) }) }}>{this.state.type === 0 ? "邮箱登录" : "密码登录"}</Button>
          </div>
          <Form name="login-form">
            {this.state.type === 0 ?
              <>
                <Form.Item
                  name="username"
                  rules={[{ required: true, message: '请输入用户名' }, { pattern: /^[a-zA-Z0-9_]{1,20}$/, message: '用户名只能包含大小写字母、数字和下划线，长度不能超过20位' }]}
                >
                  <Input prefix={<UserOutlined />} onChange={this.nameChange} />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[{ required: true, message: '请输入密码' }, { min: 8, message: '密码长度不能少于8位' }]}
                >
                  <Input.Password prefix={<LockOutlined />} onChange={this.passwordChange} />
                </Form.Item>
              </>
              :
              <>
                <Form.Item
                  name="email"
                  rules={[{ required: true, message: '请输入邮箱地址' }, { type: 'email', message: '请输入有效的邮箱地址' }]}
                >
                  <Input prefix={<MailOutlined />} placeholder="邮箱" onChange={this.emailChange} />
                </Form.Item>
                <Form.Item
                  name="emailPassword"
                >
                  <Input prefix={<LockOutlined />} placeholder="验证码" onChange={this.emailPasswordChange} />
                </Form.Item>
                <Button style={{ backgroundColor: "green", width: "150px", color: "white", marginBottom: '20px' }} onClick={this.sendEmailPassword}>{"获取验证码"}</Button>
              </>
            }
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button type="primary" onClick={this.logIn}>{"登录"}</Button>
              <Button style={{ backgroundColor: "white", width: "100px", color: "black" }} onClick={() => window.history.back()}>{"返回上一页"}</Button>
            </div>
          </Form>
        </div>
      </div>
    );
  }
  
}
reportWebVitals();
export default Login
