import React, { useState, useEffect } from 'react'
import AutoLinkText from 'react-autolink-text2';
import { createPortal } from 'react-dom'
import fetch from 'isomorphic-unfetch';
import { TranslationWrong } from '../../../../public/utils';
import { Menu, Avatar, Dropdown, Button, message, Popover, Typography, Image, List, Document, Page } from 'antd';
import { Link } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
const { Text } = Typography;

const Tiji = ({ iftiji, item, tijilist, mentionUserInfo, ifmine }) => {

  const userNames = tijilist.concat("所有人");
  const regex = new RegExp(`(@(${userNames.join("|")}))\\s`, "g");
  const regex1 = new RegExp(`(@(${userNames.join("|")}))`, "g")
  const parts = item.split(regex);
  if (tijilist.length > 0 && parts.length !== 1) {
    const newParts = [];
    let nnlist = [];
    let i = true;
    parts.forEach((part) => {
      if (part.match(regex1) && part.match(regex1).length == 1) {
        const userName = part.slice(1);
        nnlist = nnlist.concat(userName);
        if (userName !== "所有人") {
          newParts.push(
            React.createElement(
              Link,
              {
                to: `/friendinfo?name=${userName}`,
                target: "_blank",
                key: { userName }
              },
              `@${userName} `
            )

          );
        }
        else {
          newParts.push(part)
        }
        i = false;
      } else {
        if (i == false) { i = true }
        else { newParts.push(part); }
      }
    });
    if (iftiji && nnlist.length !== 0) { mentionUserInfo(nnlist); nnlist = []; }
    return (
      ifmine ?
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginTop: '8px',
          }}
        >  <Text
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            color: 'white',
            backgroundColor: 'green',
            maxWidth: '800px',
            wordWrap: 'break-word',
            wordBreak: 'break-all',
          }}
        >
            <BrowserRouter><AutoLinkText linkProps={{ target: '_blank' }} text={newParts} /></BrowserRouter>
          </Text></div>
        :
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginTop: '8px',
          }}
        > <Text
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            color: 'white',
            backgroundColor: 'blue',
            maxWidth: '800px',
            wordWrap: 'break-word',
            wordBreak: 'break-all',
          }}
        >
            <BrowserRouter><AutoLinkText linkProps={{ target: '_blank' }} text={newParts} /></BrowserRouter>
          </Text>    </div>

    );
  }
  else {
    return (
      ifmine ?
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginTop: '8px',
          }}
        >  <Text
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            color: 'white',
            backgroundColor: 'green',
            maxWidth: '800px',
            wordWrap: 'break-word',
            wordBreak: 'break-all',
          }}
        >
            <BrowserRouter><AutoLinkText linkProps={{ target: '_blank' }} text={item} /></BrowserRouter>
          </Text>    </div>
        :
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginTop: '8px',
          }}
        > <Text
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            color: 'white',
            backgroundColor: 'blue',
            maxWidth: '800px',
            wordWrap: 'break-word',
            wordBreak: 'break-all',
          }}
        >
            <BrowserRouter><AutoLinkText linkProps={{ target: '_blank' }} text={item} /></BrowserRouter>
          </Text>    </div>

    );
  }
};

function ChatBubble({ iftiji, item, ifmine, tijilist, mentionUserInfo }) {

  return (
    <div
      style={{
        height: "30px"
      }}
    >
      <Tiji iftiji={iftiji} item={item} tijilist={tijilist} ifmine={ifmine} mentionUserInfo={mentionUserInfo} />
    </div>

  );
}

function isStringSizeExceeded(str) {
  const sizeInBytes = Buffer.byteLength(str, 'utf-8');
  const maxSizeInBytes = 4 * 1024 * 1024; // 4MB
  return sizeInBytes > maxSizeInBytes;
}

function senderName(base64) {
  const colonIndex = base64.indexOf(':');
  if (colonIndex !== -1) {
    return base64.substring(0, colonIndex);
  }
  return 'None';
}

// 调整图片的base64字符串的格式
function setBase64Format(base64) {
  const colonIndex = base64.indexOf(":");
  if (colonIndex !== -1) {
    // console.log()
    return "data" + base64.split("data")[1];
  } else {
    return base64;
  }
}

// TODO：这里面的item后面不应该带有标注引用的信息，就应该是[发送人:base64字符串]的格式
function ChatBubbleQuote({ item, id, scrollToMessage }) {
  if (isStringSizeExceeded(item) === true) // 内容过大
  {
    return <ChatBubble iftiji={this.props.iftiji} item={"【很抱歉，这条多媒体信息大小过大，为了保证网页的运行流畅性，我们将不予显示渲染您发送的内容。】"} ifmine={this.props.ifmine} tijilist={this.props.tijilist} mentionUserInfo={this.props.mentionUserInfo} />;
  }
  if (item) // 文件已存在
  {
    let item1 = item.split("//回复次数//")[0];
    let item2 = item.split("//回复次数//")[1];
    let base = setBase64Format(item1);
    if (base.startsWith("data:image/jpeg")) // 图片
    {return (
      <div onClick={() => { scrollToMessage(id) }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          marginTop: '8px',
        }}
      >
        <Text
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            color: 'white',
            backgroundColor: 'gray',
            maxWidth: '800px',
            wordWrap: 'break-word',
            wordBreak: 'break-all',
          }}
        >
          <AutoLinkText linkProps={{ target: '_blank' }} text={senderName(item1) + ":一条图片信息" + "//回复次数//" + item2} />
        </Text>
      </div>)
    }
    
    else if (base.startsWith("data:audio/wav")) // 音频
    {
      return (<div onClick={() => { scrollToMessage(id) }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          marginTop: '8px',
        }}
      >
        <Text
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            color: 'white',
            backgroundColor: 'gray',
            maxWidth: '800px',
            wordWrap: 'break-word',
            wordBreak: 'break-all',
          }}
        >
          <AutoLinkText linkProps={{ target: '_blank' }} text={senderName(item1) + ":一条音频信息" + "//回复次数//" + item2} />
        </Text>
      </div>);
    }
    else if (base.startsWith("data:video/mp4")) // 视频
    {
      return (<div onClick={() => { scrollToMessage(id) }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          marginTop: '8px',
        }}
      >
        <Text
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            color: 'white',
            backgroundColor: 'gray',
            maxWidth: '800px',
            wordWrap: 'break-word',
            wordBreak: 'break-all',
          }}
        >
          <AutoLinkText linkProps={{ target: '_blank' }} text={senderName(item1) + ":一条视频信息" + "//回复次数//" + item2} />
        </Text>
      </div>);
    }
    else if (base.startsWith("data:application/pdf")) // pdf
    {
      return (<div onClick={() => { scrollToMessage(id) }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          marginTop: '8px',
        }}
      >
        <Text
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            color: 'white',
            backgroundColor: 'gray',
            maxWidth: '800px',
            wordWrap: 'break-word',
            wordBreak: 'break-all',
          }}
        >
          <AutoLinkText linkProps={{ target: '_blank' }} text={senderName(item1) + ":一条文件信息" + "//回复次数//" + item2} />
        </Text>
      </div>);
    }
    else // 文本
    {
      return (
        <div onClick={() => { scrollToMessage(id) }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginTop: '8px',
          }}
        >
          <Text
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              color: 'white',
              backgroundColor: 'gray',
              maxWidth: '800px',
              wordWrap: 'break-word',
              wordBreak: 'break-all',
            }}
          >
            <AutoLinkText linkProps={{ target: '_blank' }} text={item} />
          </Text>
        </div>
      );
    }
  }
  else // 文件不存在，展示上传组件
  {
    return (
      <p>【前端识别信息不存在】</p>
    );
  }






}
// 向后端申请进行语音转文字操作
// **注意应该提醒用户，格式只支持wmv**
function VoiceToText({ base64 }) {
  // 生成请求体
  const [result, setResult] = useState('');

  async function transformVoice(base64) {
    const requestData = {
      voice_info: base64.substring(22),
      voice_type: "wav",
    }
    // 向后端发送
    fetch('https://Backend-seteamp.app.secoder.net/voice_to_text', {
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
            // console.log(JSON.stringify(data));
            // 把数据中的信息提取出来
            const { code, info, text_info = null } = data;
            // 发过来了成功响应
            if ((code === 0 && info === "Succeed" && text_info !== null)) {
              // 在日志中记录操作成功
              // console.log("成功请求语音转文字功能" + JSON.stringify(requestData));
              setResult(text_info);
            }
            // 失败响应
            else {
              // 在日志中记录用户搜索失败
              // console.log("没能成功申请语音转文字功能：" + VoiceToTextError(code, info));
              // 提示用户登录失败
              message.warning("没能成功申请语音转文字功能：" + VoiceToTextError(code, info));
            }
          })
          // 压根就没和后端成功建立连接
          .catch(error => {
            // 打印错误信息到控制台
            // console.error("语音转文字的http协议操作部分抛出错误：" + JSON.stringify(error));
            // 提示用户失败
            // message.error("语音转文字的http协议操作部分抛出错误：" + JSON.stringify(error));
          });
      });
    // 报告干了什么
    // console.log("向后端请求进行语音转文字：" + JSON.stringify(requestData));
  }
  transformVoice(base64);
  return (
    <div>
      {result && <AutoLinkText
        linkProps={{ target: '_blank' }}
        text={result}
        onContextMenu={e => e.stopPropagation()}
      />}
    </div>
  );
}

function Translation({ text }) {
  const [result, setResult] = useState('');

  async function translateText(text) {
    // 下面尝试前端把需要翻译的内容发给后端，后端把它翻译然后传回给前端
    const requestData = {
      "msg_body": text,
    }
    // 记录一下干了什么
    // console.log("向后端发送了：" + JSON.stringify(requestData));
    fetch('https://Backend-seteamp.app.secoder.net/translation', {
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
            const { code, info, transalated_msg_body = null } = data;

            // 发过来了成功响应
            if ((code === 0 && info === 'Succeed' && transalated_msg_body !== null)) {
              // 提示用户操作成功
              message.success("翻译成功");

              // 在日志中记录操作成功
              // console.log("用户完成对消息【" + text + "】的翻译");

              // 提交翻译的结果
              setResult(transalated_msg_body);
            }

            // 失败响应
            else {
              // 在日志中记录用户登陆失败
              // console.log("翻译失败：" + TranslationWrong(code, info));
              // 提示用户登录失败
              // message.warning("使用用户名密码登录失败：" + TranslationWrong(code, info));
            }
          })
          .catch(error => {
            // 打印错误信息到控制台
            // console.error("translation的http协议和后端没能成功建立连接，消息无法传到后端");
            // 提示用户失败
            // message.error("translation的http协议和后端没能成功建立连接，消息无法传到后端");
          });
      });
  }

  translateText(text);
  return (
    <div>
      {result && <AutoLinkText
        linkProps={{ target: '_blank' }}
        text={result}
        onContextMenu={e => e.stopPropagation()}
      />}
    </div>
  );
}

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jpgvisible: false,
      text: this.props.text,
      menuvisible: false,
      id: this.props.id,
      iftranslate: false,
      iftransform: false,
      showQuote: true,  // 是否显示引用框
      quoteText: this.props.markmessage,     // 引用的消息内容
    };
    this.handleQuote = this.handleQuote.bind(this);
  }
  menu = (
    <Menu>
      <Menu.Item key="1">
        <Button onClick={() => this.props.onDeleteClick(this.props.id)}
          style={{ backgroundColor: "rgb(0,200,500)", color: "white" }}>删除</Button>
      </Menu.Item>
      <Menu.Item key="2">
        <Button onClick={() => this.props.onWithdrawClick(this.props.id)}
          style={{ backgroundColor: "rgb(0,200,500)", color: "white" }}>撤回</Button>
      </Menu.Item>
      <Menu.Item key="3">
        <Button
          style={{ backgroundColor: "rgb(0,200,500)", color: "white" }}
          onClick={() => this.handleQuote()}>引用</Button>
      </Menu.Item>
      <Menu.Item key="4">
        <Button style={{ backgroundColor: "rgb(0,200,500)", color: "white" }}
          onClick={() => this.handleForward()}>转发</Button>
      </Menu.Item>
      <Menu.Item key="5">
        <Button onClick={() => this.setState({ iftranslate: true })}
          style={{ backgroundColor: "rgb(0,200,500)", color: "white" }}>翻译</Button>
      </Menu.Item>
      <Menu.Item key="6">
        <Button onClick={() => this.setState({ iftransform: true })}
          style={{ backgroundColor: "rgb(0,200,500)", color: "white" }}>音转文</Button>
      </Menu.Item>
    </Menu>
  );


  handleQuote() {
    // 设置引用框的内容为当前消息的内容和发送者信息
    this.props.mark(this.state.id);
  }

  // 调整图片的base64字符串的格式
  setBase64Format = (base64) => {
    const colonIndex = base64.indexOf(":");
    if (colonIndex !== -1) {
      // console.log()
      return "data" + base64.split("data")[1];
    } else {
      return base64;
    }
  }

  // 调整音频的格式
  setAudioFormat = (base64) => {
    const colonIndex = base64.indexOf(":");
    if (colonIndex !== -1) {
      // console.log()
      return "data" + base64.split("data")[1];
    } else {
      return base64;
    }
  }

  // 识别消息的发送人
  senderName = (base64) => {
    const colonIndex = base64.indexOf(':');
    if (colonIndex !== -1) {
      return base64.substring(0, colonIndex);
    }
    return 'None';
  }
  // 判断base64字符串的长度是否过大
  isStringSizeExceeded = (str) => {
    const sizeInBytes = Buffer.byteLength(str, 'utf-8');
    const maxSizeInBytes = 4 * 1024 * 1024; // 4MB
    return sizeInBytes > maxSizeInBytes;
  }


  handleForward() {
    this.props.forward(this.state.id);
  }

  // 把多媒体信息转化成能显示的元件
  allocate = (item, type) => {

    const fileTypes = {
      1: {
        ftype: 'image/jpeg',
        ext: 'jpg',
      },
      2: {
        ftype: 'audio/mpeg',
        ext: 'wav',
      },
      3: {
        ftype: 'video/mp4',
        ext: 'mp4',
      },
      4: {
        ftype: 'text/plain',
        ext: 'pdf',
      },
    };
    const fileType = fileTypes[type];
    if (this.isStringSizeExceeded(item) === true) // 内容过大
    {

      return <ChatBubble iftiji={this.props.iftiji} item={"【很抱歉，这条多媒体信息大小过大，为了保证网页的运行流畅性，我们将不予显示渲染您发送的内容。】"} ifmine={this.props.ifmine} tijilist={this.props.tijilist} mentionUserInfo={this.props.mentionUserInfo} />;
    }
    if (type === 0) // 文本消息
    {
      return <ChatBubble iftiji={this.props.iftiji} item={item} ifmine={this.props.ifmine} tijilist={this.props.tijilist} mentionUserInfo={this.props.mentionUserInfo} />;
      // return <p>识别为文本信息</p>
    }
    else { // 多媒体消息
      if (item) // 文件已存在
      {
        let base = this.setBase64Format(item);
        if (base.startsWith("data:image/jpeg")) // 图片
        {
          // 获取当前的时间

          // 调整格式
          // console.log("图片的多媒体信息：" + base);
          // 返回结果
          return <div>{this.senderName(item) + ":"}<Image src={base} style={{ width: '300px', height: '200px' }}></Image></div>;
          // return <p>测试图片的返回结果</p>
        }
        else if (base.startsWith("data:audio/wav")) // 音频
        {
          // 获取当前的时间

          // 转化格式
          // console.log("音频的文件为：" + base);
          // 在线播放音频
          return (
            <figure>
              <figcaption>{this.senderName(item) + ":"}</figcaption>
              <audio controls="controls" autobuffer="autobuffer">
                {this.senderName(item) + ":"}<source src={base} />
              </audio></figure>
          );

          // return <p>识别为音频</p>
        }
        else if (base.startsWith("data:video/mp4")) // 视频
        {
          // 获取当前的时间

          // 调整视频的格式
          // console.log("视频的文件为：" + base);
          // 在线播放视频
          return (<video controls style={{ width: '300px', height: '200px' }}>
            {this.senderName(item) + ":"}<source src={base} />
          </video>);
        }
        else // pdf
        {
          // 返回对应的结果
          return (<div>{this.senderName(item) + ":"}<object data={base} type="application/pdf"
            width="100%"
            height="500px"></object></div>);
        }
      }
      else // 文件不存在，展示上传组件
      {
        return (
          // <Dragger>
          //   <p className="ant-upload-drag-icon">
          //     <InboxOutlined />
          //   </p>
          //   <p className="ant-upload-text">点击上传{fileType.ext}文件</p>
          // </Dragger>
          <p>前端识别认为文件不存在</p>
        );
      }
    }
  }
  render() {
    return (
      <div
        onContextMenu={e => e.preventDefault()}
        style={{
          width: "800px",
          wordWrap: "break-word",
          wordBreak: "break-all",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Dropdown overlay={this.menu} trigger={["contextMenu"]}>
            <div style={{ display: "flex" }}>
              <Avatar
                src={"data:image/jpeg;base64," + this.props.avatar}
              />
              <div style={{ marginLeft: "8px" }}>
                <Popover
                  placement="left"
                  content={
                    <div>
                      <Typography.Text type="secondary">{"发送时间：" + this.props.time + "  "}</Typography.Text>
                      <Typography.Text type="secondary">{"已读列表：" + this.props.havereadlist}</Typography.Text>
                    </div>
                  }
                  mouseEnterDelay={0.5}
                > <div>
                    {this.allocate(this.props.item, this.props.type)}</div></Popover>
                {this.state.iftranslate && <Translation text={this.props.item} />}
                {this.state.iftransform && <VoiceToText base64={this.setBase64Format(this.props.item)} />}
              </div>
            </div>
          </Dropdown>
          {/* 引用框 */}
          {this.state.quoteText != "" ?
            <div
              style={{
                backgroundColor: "#f0f0f0",
                width: "762px",
                display: "flex",
                flexDirection: "column",
                paddingLeft: "38px",
                marginBottom: "10px",
              }}
            >
              <div style={{ display: "flex", flex: 1 }}>
                <div style={{ flex: 1 }}>
                  <ChatBubbleQuote item={this.state.quoteText} id={this.props.markid} scrollToMessage={this.props.scrollToMessage} />
                </div>
              </div>
            </div>
            : <></>}

        </div>
      </div>)
  }
}

class Dialog extends React.Component {
  constructor(props) {
    super(props);
    this.listRef = React.createRef();

  }
  state = {
    displayedItems: this.props.historymessage,
    displayedItemsId: this.props.historymessageid,
    displayedItemsMark: this.props.markmessage,
    displayedItemsType: this.props.messagetype,
    displayedItemsTime: this.props.timelist,
    displayedItemsAvatar: this.props.avatarlist,
    displayedItemsRead: this.props.readlist,
  };
  scrollToMessage = (messageId) => {

    const node = document.getElementById(messageId);

    if (node) {

      node.scrollIntoView({ behavior: "smooth" });
    }
  };
  componentDidUpdate() {
    const list = document.getElementById("list-container");
    list.scrollTop = list.scrollHeight;
  }
  componentDidMount() {
    const { historymessage, historymessageid, markmessage, messagetype, timelist, avatarlist, readlist } = this.props;
    this.setState({
      displayedItems: historymessage,
      displayedItemsId: historymessageid,
      displayedItemsMark: markmessage,
      displayedItemsType: messagetype,
      displayedItemsAvatar: avatarlist,
      displayedItemsTime: timelist,
      displayedItemsRead: readlist,
    });

  }

  render() {
    const { scrollTop, displayedItems, displayedItemsId, displayedItemsMark, displayedItemsType, displayedItemsRead, displayedItemsTime, displayedItemsAvatar } = this.state;
    return (
      this.props.visible && (
        <div style={{ position: "absolute", top: "120px", left: "506px", width: "910px", height: "560px", backgroundColor: "white" }}>
          <p style={{ fontSize: "20px", position: "absolute", top: "-60px", left: "300px", color: "gray" }}>{this.props.talkingobject}</p>

          <List ref={this.listRef}
            id="list-container"
            style={{ height: "calc(100% - 80px)", overflow: "auto", paddingBottom: "2px" }}
            itemLayout="horizontal"
            dataSource={displayedItems}
            renderItem={(item, index) => (
              <List.Item key={displayedItemsId[index]} index={index} id={displayedItemsId[index]}>
                <Message className={`message-${displayedItemsId[index]}`}
                  mentionUserInfo={this.props.mentionUserInfo}
                  onDeleteClick={(msg) => this.props.onDeleteClick(msg)}
                  onWithdrawClick={(msg) => this.props.onWithdrawClick(msg)}
                  mark={this.props.mark}
                  forward={this.props.forward}
                  item={item}
                  time={displayedItemsTime ? displayedItemsTime[index] : new Date().toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric'
                  })}
                  havereadlist={JSON.stringify(displayedItemsRead[index])}
                  avatar={displayedItemsAvatar[index]}
                  id={displayedItemsId[index]}
                  type={displayedItemsType[index]}
                  markid={displayedItemsId[displayedItems.indexOf(displayedItemsMark[index].split("//回复次数//")[0])]}
                  markmessage={(displayedItemsMark[index])}
                  ifmine={item.indexOf(this.props.name + ":") !== 0 ? false : true}
                  tijilist={this.props.tijilist}
                  scrollToMessage={this.scrollToMessage}
                  iftiji={(index === (displayedItems.length - 1)) ? true : false}
                />
              </List.Item>
            )}
            inverted="true"
            split={false}
          />

          <div className="scroll-indicator" style={{ height: `${scrollTop / 10}%` }} />
        </div>
      )
    )
  }
}
export const Chatbox = (props) => {
  const [visible, setVisible] = useState(props.visible);
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])
  if (isMounted) {
    const node = document.createElement('div');
    document.body.appendChild(node);
    return <div>
      {createPortal(
        <Dialog onDeleteClick={(msg) => props.onDeleteClick(msg)} onWithdrawClick={(msg) => props.onWithdrawClick(msg)}
          historymessage={props.historymessage} historymessageid={props.historymessageid} name={props.name} mark={props.mark}
          forward={props.forward} tijilist={props.tijilist}
          markmessage={props.markmessage}
          messagetype={props.historymessagetype}
          mentionUserInfo={props.mentionUserInfo}
          timelist={props.timelist}
          avatarlist={props.avatarlist}
          talkingobject={props.talkingobject} visible={visible}
          readlist={props.readlist}
          close={() => { setVisible(false) }} />, node)}
    </div>;
  }
}

export default Chatbox
