import React from 'react'
import { WhyErrorInUserInfo } from '../../public/utils';
import reportWebVitals from './views/funcs/reportWebVitals';
import Router from 'next/router'
import { Form, Input, Button, message } from 'antd';

class Logout extends React.Component {
  constructor(props) {
    super(props);
    // react定义数据
    this.state = {
      name: '',
      password: ''
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
  logOut = () => {

    // 提醒用户现在在做什么
    message.warning("您正在尝试注销该账户");

    // 在日志中记录现在在做什么
    // console.log("用户尝试注销账户");

    // 整理请求体
    const requestData = {
      name: this.state.name,
      password: this.state.password,
      type: "deregister"
    };
    // 记录一下干了什么
    // console.log("向后端发送了：" + JSON.stringify(requestData));

    // 把请求体送到后端
    fetch('https://Backend-seteamp.app.secoder.net/user', {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    })
      .then(response => {

        // 解析收到的数据
        response.json()
          .then(data => {

            // 提取信息
            const { code, info } = data;

            // 成功响应
            if (code === 0 && info === "Succeed") {
              // 提示用户在干什么
              message.success("注销成功");

              // 在日志中记录在干什么
              // console.log("用户注销成功");

              Router.push({
                pathname: '/layout'
              })
            }

            // 错误响应
            else {
              // 提示用户问题是什么
              message.warning("注销失败：" + WhyErrorInUserInfo(code, info));

              // 在日志中记录
              // console.log("用户注销失败");
            }
          })

          // 压根就没和后端连接上
          .catch(error => {
            // 打印错误信息到控制台
            // console.error("用户注销的http协议没能和后端建立连接");

            // 提示用户出现了问题
            // message.error("用户注销的http协议没有和后端建立连接");
          }
          );


      });
  }
  render() {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center",  width: "100vw", height: "100vh",backgroundImage: `url("https://img-qn.51miz.com/preview/element/00/01/18/55/E-1185569-C19E0244.jpg")`, backgroundSize: "cover" }}>
        <div>
          <p style={{ fontSize: "60px", color: "#000000", textAlign: "center" }}>IMESSAGE</p>
          <p style={{ textAlign: "center" }}>为了保护您的隐私，请使用https协议访问本网址。</p>
          <p style={{ textAlign: "center" }}>使用http协议访问将会在登录后被强制登出。</p>
          <p style={{ textAlign: "center" }}>我们的主页是：<a href="https://frontend-seteamp.app.secoder.net/index">https://frontend-seteamp.app.secoder.net/index</a></p>
          <div style={{ marginTop: '30px' }}>
            <p style={{ fontWeight: 'bold', fontSize: '20px', marginBottom: '10px', textAlign: "center" }}>您正在注销账户</p>
            <Form name="logout-form">
              <Form.Item
                label="用户名"
                name="username"
                rules={[{ required: true, message: '请输入用户名' }, { max: 20, message: '用户名长度不能超过20位' }, { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名只能包含大小写字母、数字和下划线' }]}
                onChange={this.nameChange}
              >
                <Input />
              </Form.Item>
  
              <Form.Item
                label="密码"
                name="password"
                rules={[{ required: true, message: '请输入密码' }, { min: 8, message: '密码长度不能少于8位' }]}
                onChange={this.passwordChange}
              >
                <Input.Password />
              </Form.Item>
            </Form>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
              <Button type="primary" style={{ width: '120px' }} onClick={this.logOut}>注销</Button>
              <Button type="dashed" onClick={() => window.history.back()} style={{ width: '120px' }}>返回上一页</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
}
reportWebVitals();
export default Logout
