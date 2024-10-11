import React, { Component } from 'react';
import { withRouter } from 'next/router';
import Router from 'next/router';
import { Button, Row, Col, Card, Layout, Input, Form, message, Image } from 'antd';
import { UserOutlined, LockOutlined, UploadOutlined } from '@ant-design/icons';
const { Header, Content } = Layout;
const FormItem = Form.Item;
import { EmailWrong, WhyErrorInUserInfo, WhyCantChangeAvatar, CantChangeVerification } from '../../public/utils.js';
class Userinfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      view_order : props.view_order,
      view_id_order : props.view_id_order,
      silent_list : props.silent_list,
      need_twice_verification : props.need_twice_verification,
      num_of_top : props.num_of_top,
      editobject: "",
      avatar: "", // 用户头像
      editingField: '用户名',
      edit_type: props.edit_type,
      email: props.email,
      emailpassword: props.emailpassword,
    };
    this.handleFieldSelect = this.handleFieldSelect.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  componentDidMount = () => {
    this.requestAvatar(this.state.name);
  }
  handleFieldSelect(field) {
    this.setState({ editingField: field });
  }


  // 对于内容的修改
  handleInputChange(event) {
    this.setState({ editobject: event.target.value });
  }

  // 调整修改类型的格式 
  changeFormat(info) {
    if (info === "用户名") {
      return "name";
    }
    else if (info === "密码") {
      return "password";
    }
    else if (info === "邮箱") {
      return "email";
    }
    else // 前端出现bug
    {
      return "name";
    }
  }

  // 尝试修改
  handleSave() {
    // 提醒用户当前操作
    message.info("申请修改" + this.state.editingField + "为" + this.state.editobject)
    // 日志中记录
    // console.log("申请修改" + this.state.editingField + "为" + this.state.editobject)
    // 设置请求体
    const requestData = {
      name: this.state.name,
      info_type: this.changeFormat(this.state.editingField),
      new_value: this.state.editobject,
    }
    // 记录一下干了什么
    // console.log("向后端发送了：" + JSON.stringify(requestData));
    // 向后端发送修改请求
    fetch('https://Backend-seteamp.app.secoder.net/user_info_edit', {
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
            // console.log("收到了：" + JSON.stringify(data));
            // 把数据中的信息提取出来
            const { code, info } = data;
            // 发过来了成功响应
            if ((code === 0 && info === "Succeed")) {
              // 提示用户操作成功
              message.success("成功修改" + this.state.editingField + "，重新登录后将刷新" + this.state.editingField);
              // 在日志中记录操作成功
              // console.log("成功修改" + this.state.editingField + "，重新登录后将刷新" + this.state.editingField);
              // 防止出问题，强制要求退出
              Router.push({
                pathname: '/layout'
              })
              // 构建请求体
            }
            // 失败响应
            else {
              // 在日志中记录用户修改
              // console.log("修改失败：" + CantChangeVerification(code, info));
              // 提示用户修改失败
              message.warning("修改失败：" + CantChangeVerification(code, info));
            }
          })
          .catch(error => {
            // 打印错误信息到控制台
            // console.error("编辑用户个人信息的http协议和后端没能成功建立连接，消息无法传到后端");
            // 提示用户失败
            // message.error("编辑用户个人信息的http协议和后端没能成功建立连接，消息无法传到后端");
          });
      });
  }

  requestAvatar = (name) => {
    // 提醒当前操作
    // console.log("向后端请求了【" + name + "】用户的头像");

    // 构建请求体
    const requestData = {
      "name": name,
    }
    // console.log("向后端发送了：" + JSON.stringify(requestData));
    // 发送请求信息
    // 发送请求
    fetch('https://Backend-seteamp.app.secoder.net/user_request_avatar', {
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
            const { code, info, avatar = null } = data;
            // 发过来了成功响应
            if ((code === 0 && info === "Succeed" && avatar !== null)) {
              // 在日志中记录操作成功
              // console.log("成功请求到【" + name + "用户的头像对应的Base64位字符串");
              // 调整内容的格式
              let ava = "data:image/jpeg;base64," + avatar;
              // 设定到state里面
              this.setState({ avatar: ava });
            }
            // 失败响应
            else {
              // 在日志中记录用户登陆失败
              // console.log("从后端请求【" + name + "】用户的头像失败：" + WhyCantChangeAvatar(code, info));
              // 提示用户登录失败
              message.warning("从后端请求【" + name + "】用户的头像失败：" + WhyCantChangeAvatar(code, info));
            }
          })
          .catch(error => {
            // 打印错误信息到控制台
            // console.error("user_request_avatar相关http协议部分出现bug");
            // 提示用户失败
            // message.error("user_request_avatar相关http协议部分出现bug");
          });
      });
  }

  handleCancel() {
    this.setState({ editingField: '' });
  }

  render() {
    const { name, password, avatar, editingField, imageUrl } = this.state;

    return (this.state.edit_type !== 0) ? (<ImageUpload name={this.state.name} />)
      : (
        <Layout>
          <Header style={{ backgroundColor: '#fff', padding: 0 }}>
            <Row justify="start" style={{ paddingLeft: 24 }}>
              <Button onClick={() => Router.back()}>返回</Button>
            </Row>
          </Header>
          <Content>
            <div style={{ padding: 24 }}>
              <Row justify="center" align="middle">
                <Col span={8}>
                  <div>
                    <Image src={this.state.avatar} />
                  </div>
                  <Card
                    actions={[
                      <Button key="username" icon={<UserOutlined />} type="link" onClick={() => this.handleFieldSelect('用户名')}>
                        修改姓名
                      </Button>,
                      <Button key="password" icon={<LockOutlined />} type="link" onClick={() => this.handleFieldSelect('密码')}>
                        修改密码
                      </Button>,
                      <Button key="email" icon={<UploadOutlined />} type="link" onClick={() => this.handleFieldSelect('邮箱')}>
                        修改绑定邮箱
                      </Button>,
                    ]}
                  >
                    <Card.Meta
                      title={`用户名：${this.state.name}`}
                      description={editingField ? (
                        <Form onFinish={this.handleSave} layout="inline">
                          <FormItem label="改为：">
                            <Input name={editingField} defaultValue={this.state[editingField]} onChange={this.handleInputChange} />
                          </FormItem>
                          <FormItem>
                            <Button type="primary" htmlType="submit">确认修改</Button>
                            <Button style={{ backgroundColor: "white", width: "200px", color: "black", marginLeft: '50px' }} onClick={() => window.history.back()}>退出个人信息编辑</Button>
                          </FormItem>
                          <FormItem>
                            <a style={{ color: 'lightblack', fontSize: '10px' }}>
                              {"目前正在修改：" + this.state.editingField}
                            </a>
                            <Button style={{ marginLeft: '148px' }} onClick={this.handleCancel}>取消</Button>
                          </FormItem>
                        </Form>
                      ) : "点击下方按钮选择修改对象"}
                    />
                  </Card>
                </Col>
              </Row>
            </div>
          </Content>
        </Layout >
      );
  }
}

class VerificationContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVerified: false,
      name: this.props.router.query.name,
      email: "",
      emailpassword: "",
      edit_type: 0,
    };
    this.handleVerification = this.handleVerification.bind(this);
    this.GetVerificationCode = this.GetVerificationCode.bind(this);
    this.emailChange = this.emailChange.bind(this)
    this.emailPasswordChange = this.emailPasswordChange.bind(this)
    this.checkVerification_avatar = this.checkVerification_avatar.bind(this)
    this.checkVerification_other = this.checkVerification_other.bind(this)
  }

  // 要求后端发送验证码
  GetVerificationCode() {
    // 告诉用户自己在干什么
    message.info("您正在请求后端发送验证码")
    // 日志中记录在干什么
    // console.log("用户使用邮箱验证码注册账户");
    // 构建请求体
    const requestData = {
      email: this.state.email,
      type: "request_verification"
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
              message.success("验证码已发送，请您去邮箱查看");
              // 在日志中记录操作成功
              // console.log("成功向邮箱发送验证码");
            }
            // 失败响应
            else {
              // 在日志中记录用户登陆失败
              // console.log("后端没能成功发送验证码：" + EmailWrong(code, info));
              // 提示用户登录失败
              message.warning("后端没能成功发送验证码：" + EmailWrong(code, info));
            }
          })
          .catch(error => {
            // 打印错误信息到控制台
            // console.error("请求后端发送验证码的http协议和后端没能成功建立连接，消息无法传到后端");
            // 提示用户失败
            // message.error("请求后端发送验证码的http协议和后端没能成功建立连接，消息无法传到后端");
          });
      });
  }

  // 读入对于邮箱的输入
  emailChange(event) {
    this.setState({ email: event.target.value })
  }

  // 输入对于验证码的输入
  emailPasswordChange(event) {
    this.setState({ emailpassword: event.target.value })
  }


  // 把验证码和邮箱发给后端，判断能否登录
  handleVerification() {
    // 在日志中记录在干什么
    // console.log("用户在尝试使用邮箱验证码获取编辑个人信息权限")
    // 提示用户在干什么
    message.info("您正在尝试使用邮箱验证码获取编辑个人信息权限")
    // 编辑请求体
    const requestData = {
      "email": this.state.email,
      "verification": this.state.emailpassword,
    }
    // // 为了测试方便的密钥
    // if (this.state.emailpassword === "password") {
    //   // 提醒下干了什么
    //   message.success("您输入了跳转界面的密钥")
    //   // 跳转至编辑界面
    //   this.setState({ isVerified: true });
    // }
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
            const { code, info } = data;
            // 发过来了成功响应
            if ((code === 0 && info === "Succeed")) {
              // 提示用户操作成功
              message.success("成功获得编辑个人信息权限");
              // 在日志中记录操作成功
              // console.log("成功获得编辑个人信息权限");
              // 跳转至编辑界面
              this.setState({ isVerified: true });
            }
            // 失败响应
            else {
              // 在日志中记录用户登陆失败
              // console.log("没能成功获得编辑个人信息权限：" + WhyErrorInUserInfo(code, info));
              // 提示用户登录失败
              message.warning("没能获得编辑个人信息权限：" + WhyErrorInUserInfo(code, info));
            }
          })
          .catch(error => {
            // 打印错误信息到控制台
            // console.error("请求后端发送验证码的http协议和后端没能成功建立连接，消息无法传到后端");
            // 提示用户失败
            // message.error("请求后端发送验证码的http协议和后端没能成功建立连接，消息无法传到后端");
          });
      });
  }


  // 转过去编辑除了头像之外的信息
  checkVerification_other() {
    // 设定成编辑姓名/密码/邮箱
    this.setState({ edit_type: 0 })
    // 向后端发送请求
    this.handleVerification();
  }

  // 转过去编辑头像
  checkVerification_avatar() {
    // 设定成编辑头像
    this.setState({ edit_type: 1 })
    // 向后端发送请求
    this.handleVerification();
  }


  render() {
    const { isVerified } = this.state;
    return isVerified ? (
      <Userinfo name={this.state.name} edit_type={this.state.edit_type} email={this.state.email} emailpassword={this.state.emailpassword} />
    ) : (
      <Layout>
        <Content>
          <div style={{ display: 'flex', padding: 24, alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <Form onFinish={this.handleVerification} layout="vertical">
              <FormItem label="请输入您的邮箱" rules={[{ required: true, message: '您必须填入邮箱' }]}>
                <Input value={this.state.email} onChange={this.emailChange} />
              </FormItem>
              <FormItem label="请输入邮箱验证码" rules={[{ required: true, message: '您必须输入验证码' }]}>
                <Input value={this.state.emailpassword} onChange={this.emailPasswordChange} />
              </FormItem>
              <FormItem>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button type="primary" onClick={this.GetVerificationCode}>获取验证码</Button>
                  <div style={{ width: 16 }}></div>
                  <Button type="primary" htmlType="submit" onClick={this.checkVerification_other}>验证邮箱（修改姓名/密码/邮箱）</Button>
                  <div style={{ width: 16 }}></div>
                  <Button type="primary" htmlType="submit" onClick={this.checkVerification_avatar}>验证邮箱（修改头像）</Button>
                </div>
                <Button style={{ backgroundColor: "white", width: "200px", color: "black", marginLeft: '50px' }} onClick={() => window.history.back()}>退出个人信息编辑</Button>
              </FormItem>
            </Form>
          </div>
        </Content>
      </Layout>
    );
  }
}

export default withRouter(VerificationContainer);

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      file: null,
      imagePreviewUrl: null,
      imageData: null,
      used_avatar: "",
    };
  }
  componentDidMount = () => {
    this.requestAvatar(this.state.name);
  }

  handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
        imageData: reader.result.split(",")[1] // 获取Base64编码的图片数据
      });
    }

    reader.readAsDataURL(file)
  }

  base64ToBinary(base64) {
    const byteString = window.atob(base64);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return ab;
  }

  // 获取头像的函数
  requestAvatar = (name) => {
    // 提醒当前操作
    // console.log("向后端请求了【" + name + "】用户的头像");
    // 构建请求体
    const requestData = {
      "name": name,
    }
    // 发送请求信息
    // console.log("向后端发送了：" + JSON.stringify(requestData));
    // 发送请求
    fetch('https://Backend-seteamp.app.secoder.net/user_request_avatar', {
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
            const { code, info, avatar = null } = data;
            // 发过来了成功响应
            if ((code === 0 && info === "Succeed" && avatar !== null)) {
              // 在日志中记录操作成功
              // console.log("成功请求到【" + name + "用户的头像对应的Base64位字符串");
              // 调整内容的格式
              let ava = "data:image/jpeg;base64," + avatar;
              // 设定到state里面
              this.setState({ used_avatar: ava });
            }
            // 失败响应
            else {
              // 在日志中记录用户登陆失败
              // console.log("从后端请求【" + name + "】用户的头像失败：" + WhyCantChangeAvatar(code, info));
              // 提示用户登录失败
              message.warning("从后端请求【" + name + "】用户的头像失败：" + WhyCantChangeAvatar(code, info));
            }
          })
          .catch(error => {
            // 打印错误信息到控制台
            // console.error("user_request_avatar相关http协议部分出现bug");
            // 提示用户失败
            // message.error("user_request_avatar相关http协议部分出现bug");
          });
      });
  }

  // 向后端提交头像的修改
  sendChange() {
    // 把Base64转化成formData表单包装的
    const { imageData } = this.state;
    const binaryData = this.base64ToBinary(imageData);

    const formData = new FormData();
    const blob = new Blob([binaryData], { type: 'image/jpg' });
    formData.append('avatar', blob);

    // 报告现在在干什么
    // console.log("用户正在向后端提交头像的修改")
    message.info("用户正在向后端提交头像的修改")

    // 构建请求体
    const requestData = {
      "name": this.state.name,
      // "new_avatar": formData, 
      new_avatar: this.state.imageData, // Base64字符串
    }
    // 记录一下干了什么
    // console.log("向后端发送了：" + JSON.stringify(requestData));
    // 把请求体发送到后端
    fetch('https://Backend-seteamp.app.secoder.net/user_avatar_edit', {
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
              message.success("成功修改自己的头像，退出后可以更新修改");
              // 在日志中记录操作成功
              // console.log("用户成功修改自己的头像");
              // TODO：这里是退出的部分
              Router.back();
            }
            // 失败响应
            else {
              // 在日志中记录用户登陆失败
              // console.log("没能成功修改自己的头像：" + WhyCantChangeAvatar(code, info));
              // 提示用户登录失败没能成功修改自己的头像：
              message.warning("没能成功修改自己的头像：" + WhyCantChangeAvatar(code, info));

            }
          })
          .catch(error => {
            // 打印错误信息到控制台
            // console.error("user_avatar_edit的http协议和后端没能成功建立连接，消息无法传到后端");
            // 提示用户失败
            // message.error("user_avatar_edit的http协议和后端没能成功建立连接，消息无法传到后端");
          });


      });

  }


  render() {
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<Image src={imagePreviewUrl} style={{ width: '400px', height: '400px' }} alt="上传的图片" />);
    } else {
      $imagePreview = (<div className="previewText"></div>);
    }

    return (
      <div className="image-upload">
        <div className="title">
          <h2>上传您的图片并在线预览，注意格式为jpg</h2>
        </div>
        {/* 在这里显示之前的头像 */}
        <div>
          <p>您当前的头像为（渲染需要较长时间，请稍候）：</p>
          <Image src={this.state.used_avatar} style={{ width: '400px', height: '400px' }} />
        </div>
        <div className="upload-container">
          <div className="upload-area">
            <input type="file" accept="image/jpeg" onChange={(e) => this.handleImageChange(e)} />
          </div>
          <div className="preview-area">
            <div className="preview-box">
              {$imagePreview}
            </div>
            <div className="buttons">
              <Button style={{ backgroundColor: "white", width: "200px", color: "black" }} onClick={() => this.sendChange()}>上传修改</Button>
              <Button style={{ backgroundColor: "white", width: "200px", color: "black" }} onClick={() => window.history.back()}>退出个人信息编辑</Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}



<div className="upload-container">
  <div className="upload-area">
    <input type="file" onChange={(e) => this.handleImageChange(e)} />
  </div>
  <div className="preview-area">
    <div className="buttons">
      <Button style={{ backgroundColor: "white", width: "200px", color: "black" }} onClick={() => this.sendChange()}>上传修改</Button>
    </div>
  </div>
</div>