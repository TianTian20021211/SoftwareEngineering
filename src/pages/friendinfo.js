import React, { Component } from 'react';
import { withRouter } from 'next/router';
import { Card, Button, Image } from 'antd';
import { message } from 'antd';
import { ChatWrongResponse } from '../../public/utils.js';
import Router from 'next/router';

class Friend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      userData: null,
      loading: true,
    };
    this.backgroundImage = 'url(https://frontend-seteamp.app.secoder.net/myimg.jpg)';
  }

  componentDidMount() {
    if (this.props.router.query.name !== undefined) {
      this.setState({ name: this.props.router.query.name }, () => {
        this.setData();
      });
    }
    else {
      const query = new URLSearchParams(location.search);
      const username = query.get('name');
      this.setState({ name: username }, () => {
        this.setData();
      });
    }
  }

  setData() {

    const requestData = {
      key_word: this.state.name,
    };
    fetch('https://Backend-seteamp.app.secoder.net/user_search', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    })
      .then(response => {
        response.json()
          .then(data => {
            // console.log("后端发来的信息是" + JSON.stringify(data));
            const { code, info, user_name = null, user_id = null, user_email = null, user_avatar = null } = data;
            if (code === 0 && info === "Succeed") {
              message.success("搜索成功，找到用户【" + user_name + "】");
              // console.log("用户搜索成功" + JSON.stringify(user_name));
              let pt = { user_name, user_id, user_email, user_avatar }
              this.setState({ userData: pt, loading: false });
            }
            else {
              // console.log("搜索失败：" + ChatWrongResponse(code, info) + this.props.router.query.name);
              message.warning("搜索失败：" + ChatWrongResponse(code, info));
              Router.back();
            }
          })
          .catch(error => {
            // console.error("user_search的http协议和后端没能成功建立连接：" + error);
            // message.error("user_search的http协议和后端没能成功建立连接");
            Router.back();
          });
      });
  }

  render() {
    const { userData } = this.state;

    return (
      <div style={{
        background: `${this.backgroundImage}`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '20px'
      }}>
        {this.state.loading === false ? (
          <Card
            title="用户信息"
            bordered={false}
            style={{ width: 300, textAlign: 'center' }}
            bodyStyle={{ fontSize: 16, fontWeight: 'bold' }}
          >
            <p style={{ marginBottom: 16 }}>用户名：{userData.user_name}</p>
            <p style={{ marginBottom: 16 }}>用户id：{userData.user_id}</p>
            <p style={{ marginBottom: 16 }}>绑定邮箱：{userData.user_email}</p>
            <p style={{ marginBottom: 16 }}>当前头像：</p>
            <div>
              <Image src={"data:image/jpeg;base64," + userData.user_avatar} />
            </div>
            <Button onClick={() => Router.back()}>返回</Button>
          </Card>
        ) : (
          <div>正在加载，请稍候...</div>
        )}
      </div>
    );
  }
}

export default withRouter(Friend);
