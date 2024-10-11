import React from 'react'
import { WhyErrorInUserInfo, EmailWrong } from '../../public/utils';
import reportWebVitals from './views/funcs/reportWebVitals';
import Router from 'next/router'

import { Input, Button, message } from 'antd';
class Register extends React.Component {
  constructor(props) {
    super(props);
    // react定义数据
    this.state = {
      name: '',
      password: '',
      email: '',
      emailpassword: '',
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
  passwordChange = (event) => {
    // 把表单输入的值赋值给userpassword
    this.setState({ password: event.target.value });
  }
  emailChange = (event) => {
    // 把表单输入的值赋值给userpassword
    this.setState({ email: event.target.value });
  }
  emailPasswordChange = (event) => {
    // 把表单输入的值赋值给userpassword
    this.setState({ emailpassword: event.target.value });
  }

  // 把this.state.email发给后端，说用户正在使用这个邮箱注册，要后端发验证码
  sendEmailPassword = () => {
    // 日志中记录在干什么
    // console.log("用户请求邮箱验证码注册账户");

    // 构建请求体
    const requestData = {
      email: this.state.email,
      type: "request_verification"
    };
    // 记录一下干了什么
    // console.log("向后端发送了：" + JSON.stringify(requestData));
    // 把请求体发送到后端
    fetch('https://Backend-seteamp.app.secoder.net/request_verification_register', {
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
              message.success("验证码已发送，请您去邮箱查看，请注意，如果您输入的邮箱符合邮箱格式但并不存在，我们依然会尝试发送验证码。");

              // 在日志中记录操作成功
              // console.log("成功向邮箱发送验证码");

            }

            // 失败响应
            else {
              // 在日志中记录用户登陆失败
              // console.log("请求验证码失败：" + EmailWrong(code, info));

              // 提示用户登录失败
              message.warning("请求验证码失败：" + EmailWrong(code, info));
            }
          })
          .catch(error => {
            // 打印错误信息到控制台
            // console.error("注册请求验证码和后端没能成功建立连接，消息无法传到后端");

            // 提示用户失败
            // message.error("注册请求验证码和后端没能成功建立连接，消息无法传到后端");
          });
      });
  }
  // 实现注册功能


  register = () => {

    // 提示当前的操作
    message.info("您正在尝试注册该账户");

    // 日志中记录在干什么
    // console.log("用户尝试注册账户");

    // 整理请求体
    const requestData = {
      name: this.state.name,
      password: this.state.password,
      email: this.state.email,
      type: "register",
      verification: this.state.emailpassword
    };
    // 记录一下干了什么
    // console.log("向后端发送了：" + JSON.stringify(requestData));

    // 把信息传给后端
    fetch('https://Backend-seteamp.app.secoder.net/user', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    })
      .then(response => {
        // 解析响应的数据
        response.json()
          .then
          (data => {
            // 提取响应的信息
            const { code, info } = data;

            // 发过来的是成功响应
            if (code === 0 && info === "Succeed") {
              // 提示用户操作成功
              message.success("注册成功");

              // 在日志里面记录成功操作
              // console.log("用户注册成功");

              // 页面跳转
              Router.push({
                pathname: '/layout'
              })
            }

            // 发过来的是错误响应
            else {
              // 提示用户注册失败
              message.warning("注册失败：" + WhyErrorInUserInfo(code, info));

              // 在日志里面记录失败
              // console.log("注册失败：" + WhyErrorInUserInfo(code, info));

            }
          })

          // 消息压根就没有发到后端
          .catch(error => {
            // 打印错误信息到控制台
            // console.error("用户注册的http协议和后端没能成功建立连接");

            // 提示用户失败
            // message.error("用户注册的http协议和后端没能成功建立连接");
          });

      });
  }

  render() {
    return (
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundImage: `url("https://img-qn.51miz.com/preview/element/00/01/18/55/E-1185569-C19E0244.jpg")`,
        backgroundSize: "100% 100%"
      }}>
        <div style={{ width: "60%", textAlign: "center" }}>
          <div style={{ margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <p style={{ fontSize: "60px", color: "#000000" }}>IMESSAGE</p>
            <p>为了保护您的隐私，请使用 HTTPS 协议访问本网址。</p>
            <p>使用 HTTP 协议访问将会在登录后被强制登出。</p>
            <p style={{ textAlign: "center" }}>我们的主页是：<a href="https://frontend-seteamp.app.secoder.net/index">https://frontend-seteamp.app.secoder.net/index</a></p>
            <p>用户名长度不能超过20位且应只含有大小写字母、数字、下划线</p>
            <p>密码长度不得小于八位</p>
            <div style={{ marginTop: "50px", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <a style={{ display: "flex", justifyContent: "center" }}>
                您正在注册用户
                <Button type="primary" style={{ width: "100px", backgroundColor: "white", color: "black", marginLeft: "55px" }} onClick={this.returnToLayOutPage}>
                  返回上一页
                </Button>
              </a>
              <form style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                  <span style={{ width: "80px" }}>用户名：</span>
                  <Input
                    name="name"
                    placeholder="请输入用户名"
                    maxLength={20}
                    onChange={this.nameChange}
                    style={{ width: "200px" }}
                  />
                  <span style={{ marginLeft: "10px" }}></span>
                </div>
                <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                  <span style={{ width: "80px" }}>密码：</span>
                  <Input.Password
                    type="password"
                    name="password"
                    placeholder="请输入密码"
                    minLength={8}
                    onChange={this.passwordChange}
                    style={{ width: "200px" }}
                  />
                  <span style={{ marginLeft: "10px" }}></span>
                </div>
                <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                  <span style={{ width: "80px" }}>邮箱：</span>
                  <Input
                    name="email"
                    placeholder="请输入邮箱地址"
                    onChange={this.emailChange}
                    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                    title='您输入的不是一个邮箱地址'
                    style={{ width: "200px" }}
                  />
                  <span style={{ marginLeft: "10px" }}></span>
                </div>
                <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                  <span style={{ width: "80px" }}>验证码：</span>
                  <Input
                    name="verificationCode"
                    placeholder="请输入收到的验证码"
                    onChange={this.emailPasswordChange}
                    style={{ width: "200px" }}
                  />
                  <span style={{ marginLeft: "10px" }}></span>
                </div>
              </form>
              <div style={{ display: "flex", alignItems: "center", marginTop: "20px" }}>
                <Button style={{ backgroundColor: "lightblue", width: "100px" }} onClick={this.sendEmailPassword}>
                  获取验证码
                </Button>
                <Button style={{ backgroundColor: "lightgreen", width: "100px", marginLeft: "20px" }} onClick={this.register}>
                  注册
                </Button> {/* 点击注册按钮触发 register 函数，获取输入的用户名和密码进行注册 */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  

}
reportWebVitals();
export default Register
