import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { message } from 'antd';
import { VerificationWrong } from '../../../../public/utils';

class Dialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      curname: props.curname,
      id:this.props.id
    }
  }
  passwordChange = (event) => {
    this.setState({ password: event.target.value });
  }
  
  // 二次验证登录
  verification_login = () => {
    // 将该聊天密码this.state.password以及聊天的标识符发给后端
    this.props.close();
    // 生成请求体
    const requestData = {
      "name": this.state.curname,
      "password": this.state.password,
      "conversation_id":this.state.id,
    }
    // 记录一下干了什么
    // console.log("向后端发送了：" + JSON.stringify(requestData));
    // 发送请求
    fetch('https://Backend-seteamp.app.secoder.net/twice_verification', {
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
              message.success("成功通过二次验证");
              // 在日志中记录操作成功
              // console.log("用户成功通过二次验证");
              // 如果密码正确就运行以下代码
              this.props.permit(this.props.name,this.state.id);
              this.props.set();
            }
            // 失败响应
            else {
              // 在日志中记录用户登陆失败
              // console.log("二次验证失败：" + VerificationWrong(code, info));
              // 提示用户登录失败
              message.warning("二次验证失败：" + VerificationWrong(code, info));
            }
          })
          .catch(error => {
            // 打印错误信息到控制台
            // console.error("twice_verification的http协议和后端没能成功建立连接，消息无法传到后端");

            // 提示用户失败
            // message.error("twice_verification的http协议和后端没能成功建立连接，消息无法传到后端");
          });
      });
  }


  render() {
    return (
      this.props.visible && (
        <div style={{ position: "absolute", top: "200px", left: "670px", width: "600px", height: "500px", backgroundColor: "white", border: "solid" }}>
          <form style={{ position: "relative", top: "20px", left: "30px", }}>
            {"请输入密码"}<br />
            <input type="password" name="password" onChange={this.passwordChange} />
          </form>
          <button style={{ position: "relative", top: "20px", left: "30px", }} onClick={this.verification_login}>确认</button>
        </div>
      )
    )
  }
}

export const ChatVerification = (props) => {
  const [visible, setVisible] = useState(props.visible);
  const [isMounted, setIsMounted] = useState()
  useEffect(() => {
    setIsMounted(true)
  }, [])
  if (isMounted) {
    const node = document.createElement('div');
    document.body.appendChild(node);
    return <div>
      {createPortal(
        <Dialog id={props.id} curname={props.curname} permit={props.permit} name={props.name} visible={visible} setState={props.setState} close={() => { setVisible(false) }} />, node)}
    </div>;
  }
}

export default ChatVerification