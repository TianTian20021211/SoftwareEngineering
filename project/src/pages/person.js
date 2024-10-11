import { Layout, Menu, Avatar, Dropdown, Button, Col, Row, Typography, Modal, message, Checkbox, Radio, Input, Badge, Card } from 'antd';
import {
    UserOutlined,
    PoweroffOutlined,
    MessageOutlined,
} from '@ant-design/icons';
import { Mentions, Image } from 'antd';
const { Option } = Mentions;
import { debounce } from 'lodash';
import React from 'react'
import { Chatbox } from "./views/funcs/ChatBox.js";
import { ChatVerification } from "./views/funcs/chatVerification.js";
import reportWebVitals from './views/funcs/reportWebVitals';
import { ChatWrongResponse, SentAddFriendRequest, DeleteFriend, SearchChatHistory, FriendGroup, CantCancelVerification, VerificationWrong, WhyCantChangeAvatar, CheckFriendList } from '../../public/utils.js';
import { Addfriend, Showfriendlist } from "./views/funcs/AddFriend.js";
import { withRouter} from 'next/router'
import Router from 'next/router'

const { Title, Text } = Typography;
import { Upload, } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

function NewFriendModal(props) {
    return (
        <Modal
            open={props.ifvisible}
            onCancel={props.onClose}
            title="新朋友"
            footer={[
                <Button key="close" onClick={() => props.onClose()}>
                    关闭
                </Button>
            ]}
        >
            <div className="new-friend-list">
                <Addfriend visible={props.addvisible}
                    onCancel={props.setclose}
                    onClick={props.onClick}
                    addFriend={props.addFriend} username={props.name}
                    clickView={props.clickView} />
            </div>
            <div className="new-friend-list">
                <div className="requestlist">
                    {props.requestlist.map((item, index) => {
                        return (
                            <Dropdown key={item + index} overlay={<Menu >
                                <Menu.Item key="1"  >
                                    <Button onClick={() => { props.AcceptFriendRequest(props.requestlist[index]) }}
                                        style={{ backgroundColor: "rgb(0,200,500)", color: "white" }}>接受</Button>
                                </Menu.Item>
                                <Menu.Item key="2"  >
                                    <Button onClick={() => { props.RefuseFriendRequest(props.requestlist[index]) }}
                                        style={{ backgroundColor: "rgb(0,200,500)", color: "white" }}>拒绝</Button>
                                </Menu.Item>
                            </Menu>} trigger={['contextMenu']}>
                                <div className="friend-info" style={{ display: 'flex', alignItems: 'center', flexWrap: 'nowrap' }}>
                                    <Title level={5}>{item}向您发送了好友申请</Title>
                                </div>
                            </Dropdown>
                        )
                    })}
                </div>
                {/* 更多新朋友项 */}
            </div>
        </Modal>
    );
}
class ChatList extends React.Component {
    render() {
        return (
            <div className="chat-list-container">
                {this.props.chatList()}
            </div>
        );
    }
}


class Chatobject extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const name = this.props.objectname;
        return (
            <>
                <Dropdown overlay={<Menu>
                    {this.props.ifup ? <Menu.Item key="1" onClick={() => { this.props.deleteup(this.props.objectname) }}>取消置顶</Menu.Item>
                        : <Menu.Item key="2" onClick={() => { this.props.up(this.props.objectname) }}>置顶</Menu.Item>}
                    {this.props.ifveri ? <Menu.Item key="3" onClick={() => { this.props.deleteverify(this.props.objectname) }}>取消加密</Menu.Item>
                        : <Menu.Item key="4" onClick={() => { this.props.verify(this.props.objectname) }}>加密</Menu.Item>}
                    {this.props.ifsilent ? <Menu.Item key="5" onClick={() => { this.props.deletesilent(this.props.objectname) }}>取消免扰</Menu.Item>
                        : <Menu.Item key="6" onClick={() => { this.props.silent(this.props.objectname) }}>免扰</Menu.Item>}
                    <Menu.Item key="7" onClick={() => { this.props.handledel(this.props.objectname) }}>删除</Menu.Item>
                </Menu>}
                    trigger={['contextMenu']} onOpenChange={(visible) => console.log(visible)}>
                    {this.props.ifup ? <Button type="primary" style={{ color: "green", width: "150px", backgroundColor: "rgb(500,100,300)" }}
                        onClick={this.props.onClick}>
                        {name}
                        <Badge count={this.props.ifsilent ? 0 : this.props.number} style={{ backgroundColor: "#ff3300", position: "relative", left: "50px" }} />
                    </Button> : <Button type="primary" style={{ color: "green", width: "150px", backgroundColor: "rgb(200,100,300)" }}
                        onClick={this.props.onClick}>
                        {name}
                        <Badge count={this.props.ifsilent ? 0 : this.props.number} style={{ backgroundColor: "#ff3300", position: "relative", left: "50px" }} />
                    </Button>}
                </Dropdown>
                <br /><br />
            </>
        )
    }
}
const { Header, Sider, Content } = Layout;

class PersonalPage extends React.Component {
    constructor(props) {
        super(props);
        this.mymsg = React.createRef(Mentions);
        this.state = {
            ifchat: false,

            curname: props.router.query.name,
            collapsed: false,
            currentchatid: -1,
            talkingobject: '',//正在谈话的对象，可以是人，也可以是群聊？

            ifgroup: false,
            curgroupnotice: '',
            curgrouplist: [],

            message: '',
            chat_visible: false,
            friendlist: [],
            taglist: [],

            chatlist: [],
            chatidlist: [],
            messagenumber: [],
            verilist: [],//有没有二次验证
            silent_list: [],
            veri_visible: false,//显不显示二次验证

            historymessage: [],//历史记录
            historymessagetype: [],
            historymessageid: [],//历史记录id
            markmessagelist: [],
            messageavatarlist: [],
            messagetimelist: [],
            readlist: [],

            showchatlist: false,
            showalllist: false,
            newfriendvisible: false,
            addvisible: false,

            upend: -1,

            ifuserinfo: false,

            requestlist: [],//收到的好友申请列表

            markmessage: "",
            markmessageid: -1,

            addmanagerlist: [],

            ifforward: false,
            forwardidlist: [],
            forwardobjectids: [],

            grouplist: [],

            ifviewgroup: false,

            searhisvisible: false,
            selectedoption: 'time',
            searchbody: '',
            searlist: [],

            announcementContent: "",

            myavatar: '',
        }
        this.socket_connection = null;
        this.friend_request_connection = null;
    }

    shouldComponentUpdate(nextProps, nextState) {
        // 如果路由参数发生变化，则需要重新渲染组件
        if (this.props.router.query.name !== nextProps.router.query.name) {
            return true;
        }

        // 比较所有状态变量，包括嵌套数据和数组
        return Object.keys(this.state).some(key => {
            if (!nextState[key]) {
                return true;
            }
            if (Array.isArray(this.state[key])) {
                if (this.state[key].length !== nextState[key].length) {
                    return true;
                }
                return this.state[key].some((item, i) => {
                    if (typeof item !== typeof nextState[key][i]) {
                        return true;
                    }
                    if (typeof item === "object") {
                        return JSON.stringify(item) !== JSON.stringify(nextState[key][i]);
                    }
                    return item !== nextState[key][i];
                });
            } else if (typeof this.state[key] === "object") {
                return JSON.stringify(this.state[key]) !== JSON.stringify(nextState[key]);
            } else {
                return this.state[key] !== nextState[key];
            }
        });

    }

    componentWillUnmount() {
        const requestData = {
            "conversation_type": "log_out",
            "user_name": this.state.curname,
            "view_order": this.state.chatlist,
            "view_id_order": this.state.chatidlist,
            "view_ifveri_list": this.state.verilist,
            "silent_list": this.state.silent_list,
            "need_twice_verification": this.state.verilist,
            "num_of_top": this.state.upend,
        }
        // 发送登出的请求
        this.socket_connection.send(JSON.stringify(requestData));

        // 关闭socket连接
        // console.log("关闭连接")
        this.socket_connection.close();
        this.friend_request_connection.close();

        // 在日志中记录
        // console.log("向后端发送了：" + JSON.stringify(requestData));
    }

    componentDidMount() {
        // 初始化头像
        this.requestAvatar(this.state.curname);

        // 创建用于收发信息的websocket连接
        this.socket_connection = new WebSocket("wss://Backend-seteamp.app.secoder.net/chat");
        // 创建用于处理好友申请的websocket连接
        this.friend_request_connection = new WebSocket("wss://Backend-seteamp.app.secoder.net/friend_request");

        // 成功建立连接
        this.socket_connection.addEventListener('open', (event) => {
            // 提醒用户
            // console.log("用于聊天的websocket连接已建立")
            // message.success("成功和后端建立聊天的websocket连接");

            // 构建请求体
            const requestData = {
                conversation_type: "view_init",
                name: this.state.curname,
            }

            // 记录现在要干什么
            // console.log("向后端请求聊天界面各个聊天的顺序，请求体为" + JSON.stringify(requestData));

            // 向后端发送
            this.socket_connection.send(JSON.stringify(requestData));

            // 提醒后端是谁连接了
            const Data = {
                "conversation_type": "get_name",
                "name": this.state.curname,
            }
            // 记录一下
            // console.log("向后端提醒是谁连接了聊天的socket：" + JSON.stringify(Data));
            // 发送
            this.socket_connection.send(JSON.stringify(Data));
        });
        this.friend_request_connection.addEventListener('open', (event) => {
            // 提醒用户
            // console.log("用于添加好友的websocket连接已建立")
            // message.success("成功和后端建立好友相关的websocket连接");

            // 向后端申请发送好友信息的情况
            const friend_request_data = {
                "request_type": "request_init",
                "receiver_name": this.state.curname,
            }

            // 发送请求
            this.friend_request_connection.send(JSON.stringify(friend_request_data));

            // 在日志中记录
            // console.log("向后端发送了：" + JSON.stringify(friend_request_data));

            // 向后端发送自己的名称
            const requestData = {
                "name": this.state.curname,
            }

            // 发送
            this.friend_request_connection.send(JSON.stringify(requestData));

            // 在日志中记录
            // console.log("向后端发送了信息" + JSON.stringify(requestData) + "来提醒后端成功连接好友的ws");
        });

        // 连接失败
        this.socket_connection.addEventListener('error', (event) => {
            // 提醒用户
            // console.log("用于聊天的websocket连接发生错误,错误信息为:" + event.data);
            // message.error("用于聊天的websocket连接发生错误,错误信息为:" + event.data);
        });

        this.friend_request_connection.addEventListener('error', (event) => {
            // 提醒用户
            // console.log("用于处理好友申请的websocket连接发生错误,错误信息为:" + event.data);
            // message.error("用于处理好友申请的websocket连接发生错误,错误信息为:" + event.data);
        })

        // 接收从后端发送来的信息
        this.socket_connection.addEventListener('message', (event) => {
            // 解析后端发来的信息
            const responseData = JSON.parse(event.data);

            // 分析信息内容
            if ('conversation_type' in responseData) // 是成功响应 & 收到的信息
            {
                // console.log("接受后端发来的信息的ws收到了信息：" + JSON.stringify(responseData));
                if (responseData.conversation_type === "public_init") // 获取聊天的历史记录
                {
                    // 提醒用户成功
                    message.success("成功从后端获取这一聊天的历史记录");
                    // console.log("成功从后端获取这一聊天的历史记录" + JSON.stringify(responseData));

                    this.setState({
                        ifgroup: true,
                        curgrouplist: responseData.member_list,
                        // messageavatarlist:responseData.member_avatar_list,
                    }, () => {
                        // console.log('updated:', this.state.curgrouplist);
                    });


                    let num_of_reply = responseData.message_num_of_reply_list; // 每条消息被回复了几次

                    let nl = [];
                    // 操作存储历史记录
                    let new_list = responseData.msg_list;
                    let r = this.state.chatidlist.indexOf(this.state.currentchatid);
                    let new_num_list = [];
                    for (let i = 0; i < this.state.messagenumber.length; i++) {
                        if (i !== r) {
                            new_num_list.push(this.state.messagenumber[i])
                        }
                        else {
                            new_num_list.push(0);
                        }
                    }
                    for (let i = 0; i < new_list.length; i++) {
                        nl.push(responseData.member_avatar_list[responseData.message_avatar_rank_list[i]]);
                    }
                    let marklist = [];
                    for (let i = 0; i < responseData.message_reply_list.length; i++) {
                        if (responseData.message_reply_list[i] !== -1) {
                            let rr = responseData.message_id_list.indexOf(responseData.message_reply_list[i]);
                            if (rr >= 0) {
                                marklist.push(new_list[rr] + "//回复次数//当前该信息已被回复" + num_of_reply[rr] + "次");
                            }
                            else {
                                marklist.push("");
                            }
                        }
                        else {
                            marklist.push("");
                        }
                    }
                    this.setState({
                        messagenumber: new_num_list,
                        historymessage: new_list,
                        historymessageid: responseData.message_id_list,
                        messagetimelist: responseData.message_time_list,
                        messageavatarlist: nl,
                        markmessagelist: marklist,
                        historymessagetype: responseData.message_type_list,
                        readlist: responseData.message_have_read_list,
                    }, () => {
                        // console.log('updated:', this.state.historymessage);
                    });
                }
                else if (responseData.conversation_type === "private_init") // 获取聊天的历史记录
                {
                    // 提醒用户成功
                    message.success("成功从后端获取这一聊天的历史记录");
                    // console.log("成功从后端获取这一聊天的历史记录" + JSON.stringify(responseData));
                    // 判断是群聊还是私聊

                    this.setState({
                        ifgroup: false,
                        curgrouplist: [],
                        // messageavatarlist:responseData.member_avatar_list,
                    }, () => {
                        // console.log('updated:', this.state.ifgroup);
                    });


                    let num_of_reply = responseData.message_num_of_reply_list; // 每条消息被回复了几次



                    // 操作存储历史记录
                    let new_list = responseData.msg_list;
                    let r = this.state.chatidlist.indexOf(this.state.currentchatid);
                    let new_num_list = [];
                    let nl = [];
                    for (let i = 0; i < this.state.messagenumber.length; i++) {

                        if (i !== r) {
                            new_num_list.push(this.state.messagenumber[i])
                        }
                        else {
                            new_num_list.push(0);
                        }
                    }
                    for (let i = 0; i < new_list.length; i++) {
                        nl.push(responseData.avatar_list[responseData.message_avatar_rank_list[i]]);
                    }
                    let marklist = [];
                    for (let i = 0; i < responseData.message_reply_list.length; i++) {
                        if (responseData.message_reply_list[i] !== -1) {
                            let rr = responseData.message_id_list.indexOf(responseData.message_reply_list[i]);
                            if (rr >= 0) {
                                marklist.push(new_list[rr] + "//回复次数//当前该信息已被回复" + num_of_reply[rr] + "次");
                            }
                            else {
                                marklist.push("");
                            }
                        }
                        else {
                            marklist.push("");
                        }
                    }
                    this.setState({
                        messagenumber: new_num_list,
                        historymessage: new_list,
                        historymessageid: responseData.message_id_list,
                        historymessagetype: responseData.message_type_list,
                        messagetimelist: responseData.message_time_list,
                        messageavatarlist: nl,
                        markmessagelist: marklist,
                        readlist: responseData.message_have_read_list,
                    }, () => {
                        // console.log('updated:', this.state.messagetimelist);
                    });
                }
                else if (responseData.conversation_type === "chat") // 是收到的消息
                {
                    // 提醒用户收到信息
                    // message.info("收到了一条信息");
                    // console.log("收到了一条信息：" + JSON.stringify(responseData));


                    let read_list = responseData.have_read_list;

                    let chat_id = responseData.conversation_id; // 目前的这个聊天的id
                    let r = this.state.chatidlist.indexOf(chat_id);
                    // 操作展示这条信息
                    this.setState(prevState => {
                        const updatedArray = [...prevState.messagenumber]
                        updatedArray[r] = 0
                        return { messagenumber: updatedArray }
                    })
                    let newreadlist = [];
                    for (let i = 0; i < this.state.readlist.length; i++) {
                        newreadlist.push(this.state.readlist[i]);
                    }
                    newreadlist.push(read_list);
                    this.setState({
                        forwardidlist: [], forwardobjectids: [], ifforward: false,
                        historymessageid: this.state.historymessageid.concat(responseData.message_id),
                        readlist: newreadlist,
                        messagetimelist: this.state.messagetimelist.concat(responseData.message_time),
                        messageavatarlist: this.state.messageavatarlist.concat(responseData.sender_avatar),
                        historymessagetype: this.state.historymessagetype.concat(0),
                        markmessagelist: this.state.markmessagelist.concat(""),
                        historymessage: this.state.historymessage.concat(responseData.msg_body),
                        ifchat: true,
                    }, () => {
                        // console.log('updated:', this.state.readlist);
                    });
                }
                else if (responseData.conversation_type === "log_out") // 登出的成功响应
                {
                    // 提醒用户
                    // console.log("用户成功登出")
                    // message.success("成功退出登录")
                    // 成功登出
                }
                else if (responseData.conversation_type === "private_withdraw") // 成功撤回消息的提示
                {
                    // 提醒用户成功撤回信息
                    message.success("成功撤回了发送给" + responseData.receiver_name + "的信息")
                    // console.log("成功撤回了发送给" + responseData.receiver_name + "的信息：" + responseData.msg_body)

                    // 撤回信息
                    let new_list = this.state.historymessage;
                    let new_listid = this.state.historymessageid;
                    let new_listavatar = this.state.messageavatarlist;
                    let new_listtime = this.state.messagetimelist;
                    let new_list_mark = this.state.markmessagelist;
                    let new_list_type = this.state.historymessagetype;
                    let new_list_read = this.state.readlist;

                    for (var i = 0; i < new_list.length; i++) {
                        if (new_listid[i] == responseData.message_id) {
                            new_list.splice(i, 1);
                            new_listid.splice(i, 1);
                            new_list_mark.splice(i, 1);
                            new_list_type.splice(i, 1);
                            new_listavatar.splice(i, 1);
                            new_listtime.splice(i, 1);
                            new_list_read.splice(i, 1);
                            break;
                        }
                    }
                    this.setState({
                        historymessage: new_list,
                        readlist: new_list_read,
                        messageavatarlist: new_listavatar, messagetimelist: new_listtime,
                        historymessageid: new_listid, markmessagelist: new_list_mark, historymessagetype: new_list_type
                    }, () => {
                        // console.log('updated:', this.state.historymessage);
                    });
                }
                else if (responseData.conversation_type === "reply_message") // 成功回复信息
                {

                    let read_list = responseData.have_read_list;

                    let newreadlist = [];
                    for (let i = 0; i < this.state.readlist.length; i++) {
                        newreadlist.push(this.state.readlist[i]);
                    }
                    newreadlist.push(read_list);
                        this.setState({
                            historymessage: this.state.historymessage.concat(responseData.reply_msg_body),
                            readlist: newreadlist,
                            messageavatarlist: this.state.messageavatarlist.concat(responseData.message_responder_avatar),
                            messagetimelist: this.state.messagetimelist.concat(responseData.message_time),
                            historymessageid: this.state.historymessageid.concat(responseData.message_id),
                            historymessagetype: this.state.historymessagetype.concat(0),
                            markmessagelist: this.state.markmessagelist.concat(responseData.msg_body + "//回复次数//当前该信息已被回复" + responseData.num_of_reply + "次"),
                        }, () => {
                            message.success("成功回复了信息，这条信息目前已被回复【" + responseData.num_of_reply + "】次");
                    // console.log("成功回复了信息，这条信息目前已被回复【" + responseData.num_of_reply + "】次");
                        });

                    // 你回复的消息目前已经被多少条消息回复：responseData.num_of_reply
                    
 
                    message.success("成功回复信息，这条信息目前已被回复【" + responseData.num_of_reply + "】次");
                    // console.log("成功回复了信息【" + responseData.msg_body + "】，这条信息目前已被回复【" + responseData.num_of_reply + "】次");
                    // 你回复的这条信息是谁发出来的：responseData.message_responder
                }
                else if (responseData.conversation_type === "message forwarding") // 成功转发信息
                {
                    // 提示用户操作成功
                    // console.log("转发信息成功")
                    message.success("转发信息成功")
                    let n = [], nn = []
                    // 成功转发之后清零这个列表
                    this.setState({ forwardidlist: n, forwardobjectids: nn, ifforward: false }, () => {
                        // console.log('updated:', this.state.forwardidlist);
                    });

                }
                else if (responseData.conversation_type === "delete_message") // 成功删除信息
                {
                    // 提取信息
                    let msgid = responseData.message_id;

                    // 提示用户成功删除了信息
                    // console.log("成功删除了id为" + msgid + "的信息")
                    message.success("成功删除了id为" + msgid + "的信息")

                    // 执行删除信息的操作
                    let new_listavatar = this.state.messageavatarlist;
                    let new_listtime = this.state.messagetimelist;
                    let new_list = this.state.historymessage;
                    let new_list_id = this.state.historymessageid;
                    let new_list_read = this.state.readlist;
                    let new_list_mark = this.state.markmessagelist;
                    let new_list_type = this.state.historymessagetype;
                    for (var i = 0; i < new_list.length; i++) {
                        if (this.state.historymessageid[i] == msgid) {
                            new_list.splice(i, 1);
                            new_list_id.splice(i, 1);
                            new_list_mark.splice(i, 1);
                            new_list_type.splice(i, 1);
                            new_listavatar.splice(i, 1);
                            new_listtime.splice(i, 1);
                            new_list_read.splice(i, 1);
                            i--;
                            break;
                        }
                    }
                    this.setState({ messageavatarlist: new_listavatar, readlist: new_list_read, messagetimelist: new_listtime, historymessage: new_list, historymessageid: new_list_id, markmessagelist: new_list_mark, historymessagetype: new_list_type }, () => {
                        // console.log('updated:', this.state.historymessage);
                    });
                }
                else if (responseData.conversation_type === "mention_feedback") // 你的提及被反馈了
                {
                    // 解析收到的数据
                    let name = responseData.selected_user_name; // 谁读到了你的提及
                    let chat_id = responseData.conversation_id; // 在哪个聊天里面读到了
                    // 调出用户的名字
                    let r = this.state.chatidlist.indexOf(chat_id);
                    let chat_name = this.state.chatlist[r];
                    // 报告
                    message.success("你在聊天【" + chat_name + "中对用户【" + name + "】的提及被已读");
                    // console.log("提及得到反馈：" + JSON.stringify(responseData));
                }
                else if (responseData.conversation_type === "public_create") // 成功创建了群聊
                {
                    // 记录成功入群的人和拒绝入群的人
                    let grouplist = responseData.accept_list;
                    let rejectlist = responseData.reject_list;
                    let group_name = responseData.group_name;
                    // 报告这一操作
                    message.success("成功创建包含【" + JSON.stringify(grouplist) + "】的群聊，群名为：" + group_name);
                    // console.log("成功创建包含【" + JSON.stringify(grouplist) + "】的群聊，群名为：" + group_name);
                    // 报告是否有人拒绝入群
                    if (rejectlist.length === 0) // 没有人拒绝入群
                    {
                        message.success("没有人拒绝入群");
                        // console.log("没有人拒绝入群");
                    }
                    else // 有人拒绝入群
                    {
                        // 报告有哪些人拒绝入群
                        message.warning("这些人拒绝入群【" + JSON.stringify(responseData.reject_list) + "】");
                        // console.log("这些人拒绝入群【" + JSON.stringify(responseData.reject_list) + "】");
                    }
                    let n = []
                    if (responseData.name === this.state.curname) // 我是群主
                    {

                        // 构建群聊，grouplist是成员成员信息
                        this.setState({
                            chatlist: this.state.chatlist.concat(group_name),
                            messagenumber: this.state.messagenumber.concat(0),
                            verilist: this.state.verilist.concat(false),
                            silent_list: this.state.silent_list.concat(false),
                            chatidlist: this.state.chatidlist.concat(responseData.conversation_id),
                            grouplist: n
                        }, () => {
                            // console.log('updated:', this.state.chatlist);
                        });

                    }
                    else // 我是群成员 
                    {
                        // 构建群聊，grouplist是成员成员信息
                        this.setState({
                            chatlist: this.state.chatlist.concat(group_name),
                            messagenumber: this.state.messagenumber.concat(0),
                            verilist: this.state.verilist.concat(false),
                            silent_list: this.state.silent_list.concat(false),
                            chatidlist: this.state.chatidlist.concat(responseData.conversation_id),
                            grouplist: n
                        }, () => {
                            // console.log('updated:', this.state.chatlist);
                        });

                    }
                }
                else if (responseData.conversation_type === "view_init") // 收到聊天的初始顺序
                {
                    // 提醒一下
                    // message.success("成功从后端请求到所有聊天的排列顺序");
                    // console.log("成功从后端请求到所有聊天的排列顺序：" + JSON.stringify(responseData));
                    // 解析收到的数据
                    let silent_list = responseData.silent_list; // list，对应每个聊天是否需要被免打扰，内容为true或false
                    let unread_count_list = responseData.unread_count_list; // list，对应未读计数
                    // 这两个list的顺序都是和view_order一样的
                    this.setState({
                        showchatlist: true,
                        chatlist: responseData.view_order,
                        messagenumber: unread_count_list,
                        chatidlist: responseData.view_id_order,
                        silent_list: silent_list,
                        taglist: responseData.tag_list,
                        verilist: responseData.twice_verification_list,
                        upend: responseData.num_of_top,
                    }, () => {
                        let nl = [];
                        let nnl = [];
                        let nnnl = [];
                        for (let i = 0; i < responseData.selected_conversation_list.length; i++) {
                            if (nl.indexOf(responseData.selected_conversation_list[i]) === -1) {
                                nl.push(responseData.selected_conversation_list[i]);
                                nnl.push(this.state.chatlist[this.state.chatidlist.indexOf(responseData.selected_conversation_list[i])]);
                                nnnl.push(responseData.selected_sender_list[i])
                            }
                        }
                        if (nnl.length !== 0) {
                            message.success("在群聊" + JSON.stringify(nnl) + "里您被" + JSON.stringify(nnnl) + "提及了");
                        }
                        // console.log('获取的messagenumber:', this.state.messagenumber);
                    });


                }
                else if (responseData.conversation_type === "choose_group_manager") // 成功设定群管理员
                {
                    // 获取有用的信息
                    let id = responseData.conversation_id; // 群聊的id
                    let manager_list = responseData.manager_name_list; // 群管理员的list
                    // 报告干了什么

                    // console.log("成功为id为" + id + "的群聊添加了" + JSON.stringify(manager_list) + "为群管理员");
                    message.success("成功为id为" + id + "的群聊添加了" + JSON.stringify(manager_list) + "为群管理员");
                }
                else if (responseData.conversation_type === "group owner transfer") // 成功转让群主
                {
                    // 解析收到的信息
                    let new_owner_name = responseData.new_owner_name; // 新群主的名称
                    message.success("群主被转让给" + new_owner_name);
                    // console.log("群主被转让给" + new_owner_name);
                    // message.success("群主被转让给" + new_owner_name);
                }
                else if (responseData.conversation_type === "group announcement") // 成功发布群公告
                {
                    // 解析数据
                    let name = responseData.announcer_name; // 发布者姓名
                    let content = responseData.announcement_content; // 公告的内容
                    let msg_id = responseData.message_id; // 这条群公告作为信息的id
                    let group_id = responseData.conversation_id; // 聊天的id

                    // 注意所有的用户都会收到这条公告
                    if (this.state.curname === name) // 是你发的群公告
                    {

                        this.setState({
                            curgroupnotice: content
                        }, () => {
                            // console.log('updated:', this.state.curgroupnotice);
                        });
                        // 报告操作信息
                        // console.log("您成功发布了一条群公告");
                        message.success("您成功发布了一条群公告");
                    }
                    else // 是别人发的群公告
                    {

                        this.setState({
                            curgroupnotice: content
                        }, () => {
                            // console.log('updated:', this.state.curgroupnotice);
                        });
                        // 报告操作信息
                        // console.log("您在的某个群聊中有人发送了一条群公告");
                        message.info("您在的某个群聊中有人发送了一条群公告");
                    }
                }
                else if (responseData.conversation_type === "group_info") // 群聊信息展示的成功响应
                {
                    // 解析收到的数据
                    let id = responseData.conversation_id; // 聊天的id
                    let chat_name = responseData.conversation_name; // 聊天的名称
                    let owner_name = responseData.owner_name; // 群主的名字
                    let members = responseData.group_member; // 所有成员，是个list
                    this.setState({ curgrouplist: members });
                    let announce_history = responseData.announce_history; // list，装着所有的群公告
                    let group_manager = responseData.group_manager; // 群管理员们

                    Modal.confirm({
                        title: '群聊信息',
                        content: (
                            <Card bordered={false}>
                                <p style={{ marginBottom: 16 }}>群聊id:  {id}</p>
                                <p style={{ marginBottom: 16 }}>群聊名称:  {chat_name}</p>
                                <p style={{ marginBottom: 16 }}>群主: {owner_name}</p>
                                <p style={{ marginBottom: 16 }}>群聊成员: {JSON.stringify(members)}</p>
                                <p style={{ marginBottom: 16 }}>历史公告:</p>
                                <ul style={{ marginBottom: 16 }}>
                                    {announce_history.map((item, index) => (
                                        <li key={index + item}><p>{item}</p></li>
                                    ))}
                                </ul>
                                <p style={{ marginBottom: 16 }}>群管理员: {JSON.stringify(group_manager)}</p>

                                <Button onClick={() => this.handleAddFriendGroup(members)}>从群聊中添加好友</Button>
                            </Card>
                        ),
                        onOk: () => { Modal.info().destroy(); },
                    });

                    // 报告干了什么
                    // console.log("成功从后端获取群的信息：" + JSON.stringify(responseData));
                }
                else if (responseData.conversation_type === "invite") // 成功给别人发出进群邀请
                {
                    // 解析收到的数据
                    let id = responseData.conversation_id; // 这个群的id
                    let name = responseData.invited_name; // 被邀请者的名字
                    // console.log("成功给" + name + "发出了入群邀请");
                    message.success("成功给" + name + "发出了入群邀请");
                }
                else if (responseData.conversation_type === "invite_to_check") // 自己管理的群有成员给别人发出了进群邀请
                {
                    // 解析收到的数据
                    let id = responseData.conversation_id; // 这个群的id
                    let name = responseData.invited_name; // 被邀请者的名字
                    // console.log("作为群主的群中，有人给" + name + "发出了入群邀请");
                    message.success("您管理的群聊中有人发出了入群申请");
                }
                else if (responseData.conversation_type === "invite_init") // 收到了自己管理的所有的群的入群申请
                {
                    // 解析收到的数据
                    // 这块感觉靠注释说不清楚，最好去看API文档，群聊.md中搜索“入群申请”
                    let group_id_list = responseData.conversation_id_list;
                    let group_name_list = responseData.conversation_name_list;
                    let user_name_list = responseData.invited_name_list;
                    let invitor_list = responseData.invitor_name_list;
                    Modal.confirm({
                        title: '当前入群申请',
                        content: (
                            <div>
                                {
                                    user_name_list.map((item, index) => (
                                        <li key={item + index}>
                                            <div className="friend-info">
                                                {/* <Avatar src="..." /> */}
                                                <Title level={5}>{item}</Title>
                                                <Text type="secondary">{item}请求入群{" " + group_name_list[index] + " "}</Text>
                                            </div>
                                            <button style={{ backgroundColor: "green", }} onClick={() => {
                                                this.acceptInvite(
                                                    group_id_list[index], invitor_list[index], user_name_list[index]
                                                )
                                            }}>接受</button>
                                            <button style={{ backgroundColor: "green", }} onClick={() => {
                                                this.rejectInvite(
                                                    group_id_list[index], invitor_list[index], user_name_list[index]
                                                )
                                            }}>拒绝</button>
                                            <br></br>
                                        </li>
                                    ))
                                }
                            </div>
                        ),
                        onOk: () => { Modal.info().destroy(); }
                    });
                    // 提醒
                    // console.log("从后端获取了自己管理的所有的群的入群申请");
                }
                else if (responseData.conversation_type === "invite_approve") // 成功同意了管理的群的入群申请
                {
                    // 解析收到的数据
                    let id = responseData.conversation_id; // 群聊的id
                    let invitor_name = responseData.invitor_name; // 提出申请人的名字
                    let invited_name = responseData.invited_name; // 在申请中被请求可以加入群的人的名字

                    this.setState({ curgrouplist: this.state.curgrouplist.concat(invited_name) }, () => {
                        // console.log('updated:', this.state.curgrouplist);
                    });

                    // console.log("成功通过了" + invitor_name + "请求拉" + invited_name + "入群的申请");
                    message.success("成功通过了" + invitor_name + "请求拉" + invited_name + "入群的申请");
                }
                else if (responseData.conversation_type === "invite_reject") // 成功拒绝了管理的群的入群申请
                {
                    // 解析收到的数据
                    let id = responseData.conversation_id; // 群聊的id
                    let invitor_name = responseData.invitor_name; // 提出申请人的名字
                    let invited_name = responseData.invited_name; // 在申请中被请求可以加入群的人的名字
                    // console.log("成功拒绝了" + invitor_name + "请求拉" + invited_name + "入群的申请");
                    message.success("成功拒绝了" + invitor_name + "请求拉" + invited_name + "入群的申请");
                }
                else if (responseData.conversation_type === "exit_group") // 成功退出群聊
                {
                    // 解析收到的数据
                    let id = responseData.conversation_id; // 群聊的id
                    // console.log("成功退出id为" + id + "的群聊");
                    message.success("成功退出id为" + id + "的群聊");
                }
                else if (responseData.conversation_type === "member_change") // 某个群的成员变化
                {
                    // 解析收到的数据
                    let chat_id = responseData.conversation_id; // 聊天的id
                    let member_list = responseData.member_now; // 目前这个聊天的成员列表


                    if (chat_id === this.state.currentchatid) {
                        this.setState({ curgrouplist: member_list });
                    }
                    // 报告
                    // console.log("从后端收到了群聊成员变化的响应：" + JSON.stringify(responseData));
                }
                else if (responseData.conversation_type === "unread count") // 后端提醒多了一条未读信息
                {
                    // 解析收到的数据
                    // console.log('initial messagenumber:', JSON.stringify(this.state.messagenumber))
                    let id = responseData.conversation_id; // 群聊的id
                    let r = this.state.chatidlist.indexOf(id);
                    let nnlist = [];
                    for (let i = 0; i < this.state.messagenumber.length; i++) {
                        if (i !== r) nnlist.push(this.state.messagenumber[i])
                        else nnlist.push(this.state.messagenumber[i] + 1)
                    }
                    this.setState({ messagenumber: nnlist }, () => {
                        // console.log('updated messagenumber:', JSON.stringify(this.state.messagenumber))
                    }
                    )

                    // 提醒

                    // console.log("后端提醒id为" + id + "的群聊收到一条未读信息");

                }
                else if (responseData.conversation_type === "public_withdraw") // 成功在群中撤回一条消息
                {
                    // 解析收到的数据
                    let msg_id = responseData.message_id; // 撤回的消息的id
                    let chat_id = responseData.conversation_id; // 群聊的id
                    let new_listavatar = this.state.messageavatarlist;
                    let new_listtime = this.state.messagetimelist;
                    let new_list = this.state.historymessage;
                    let new_listid = this.state.historymessageid;
                    let new_list_read = this.state.readlist;
                    let new_list_mark = this.state.markmessagelist;
                    let new_list_type = this.state.historymessagetype;
                    for (var i = 0; i < new_list.length; i++) {
                        if (new_listid[i] == msg_id) {
                            new_list.splice(i, 1);
                            new_listid.splice(i, 1);
                            new_list_mark.splice(i, 1);
                            new_list_type.splice(i, 1);
                            new_listavatar.splice(i, 1);
                            new_listtime.splice(i, 1);
                            new_list_read.splice(i, 1);
                            break;
                        }
                    }
                    this.setState({ messageavatarlist: new_listavatar, readlist: new_list_read, messagetimelist: new_listtime, historymessage: new_list, historymessageid: new_listid, markmessagelist: new_list_mark, historymessagetype: new_list_type }, () => {
                        // console.log('updated:', this.state.historymessage);
                    });
                    // 提醒
                    // console.log("成功撤回一条消息：" + JSON.stringify(responseData));
                    message.success("成功在群聊中撤回了一条信息");
                }
                else if (responseData.conversation_type === "multimedia message") // 收到了对方发送的多媒体信息
                {

                    let read_list = responseData.have_read_list;

                    // 解析收到的数据
                    let media_info = responseData.multimedia_info; // base64位字符串
                    let media_type = responseData.multimedia_type // 类型
                    let chat_id = responseData.conversation_id; // 群聊的id

                    let time = responseData.message_time; // 时间和头像
                    let avatar = responseData.sender_avatar; // 头像
                    let msg_id = responseData.message_id; // 信息的id
                    // message.info("收到了一条多媒体信息");
                    // console.log("收到了一条多媒体信息" + media_type);
                    let type = 0
                    if (media_type === "jpg") {
                        type = 1;
                    }
                    else if (media_type === "mp3") {
                        type = 2;
                    }
                    else if (media_type === "mp4") {
                        type = 3;
                    }
                    else {
                        type = 4;
                    }
                    let newreadlist = [];
                    for (let i = 0; i < this.state.readlist.length; i++) {
                        newreadlist.push(this.state.readlist[i]);
                    }
                    newreadlist.push(read_list);
                    // 操作展示这条信息
                    this.setState({
                        historymessage: this.state.historymessage.concat(media_info),
                        historymessageid: this.state.historymessageid.concat(msg_id),
                        readlist: newreadlist,
                        messageavatarlist: this.state.messageavatarlist.concat(avatar),
                        messagetimelist: this.state.messagetimelist.concat(time),
                        historymessagetype: this.state.historymessagetype.concat(media_type),
                        markmessagelist: this.state.markmessagelist.concat(""),
                    }, () => {
                        // console.log('updated:', this.state.historymessageid);
                    });
                    // 提醒
                    // console.log("收到了后端发送来的多媒体信息：" + JSON.stringify(responseData));
                }
                else if (responseData.conversation_type === "mention_user") // 收到提及的人的具体信息
                {
                    // 解析收到的的数据
                    let name_list = responseData.selected_user_name_list; // 被提及的所有的人的名字
                    let chat_id = responseData.conversation_id; // 提及的聊天的id
                    let id_list = responseData.selected_user_id_list; // 提及的所有人的id
                    // 解析聊天名称
                    let r = this.state.chatidlist.indexOf(chat_id);
                    let chat_name = this.state.chatlist[r];
                    // 告诉提及的人发送成功了
                    message.success("成功在聊天【" + chat_name + "】中提及了" + name_list);
                    // 报告
                    // console.log("收到了后端提及的成功响应：" + JSON.stringify(responseData));
                }
                else if (responseData.conversation_type === "member_remove") // 成功移除群成员
                {
                    // 解析收到的数据
                    let chat_id = responseData.conversation_id; // 在哪个聊天里移除了
                    let name = responseData.remove_name; // 移除了谁
                    // 进行操作
                    let r = this.state.curgrouplist.indexOf(name);
                    if (r !== -1) {
                        this.state.curgrouplist.splice(r, 1);
                        this.setState({ curgrouplist: this.state.curgrouplist }, () => {
                            // console.log('updated:', this.state.curgrouplist);
                        });

                    }
                    // 响应
                    message.success("成功移除了用户：" + name);
                    // console.log("收到移除群成员的成功响应：" + JSON.stringify(responseData));
                }
                else if (responseData.conversation_type === "mentioned") // 你在线的时候被提及了
                {
                    // 解析收到的数据
                    let chat_id = responseData.conversation_id; // 发生提及的聊天的id
                    let r = this.state.chatidlist.indexOf(chat_id);
                    let chat_name = this.state.chatlist[r];
                    // 告诉用户这个聊天中有人提及了你
                    message.info("在聊天【" + chat_name + "】中有人提及了你");
                    // 报告
                    // console.log("被提及了");
                }
                else if (responseData.conversation_type === "leave_chat") // 离开聊天
                {
                    // 记录一下
                    // console.log("后端记录你离开了聊天");
                }
                else if (responseData.conversation_type === "have_read") // 某个用户已读某个聊天的消息
                {
                    // 解析内容
                    let chat_id = responseData.conversation_id; // 哪个聊天
                    let name = responseData.have_read_name; // 谁已读
                    let nnlist = [];
                    for (let i = 0; i < this.state.readlist.length; i++) {
                        nnlist.push(this.state.readlist[i]);
                        if (nnlist[i].indexOf(name) === -1) {
                            nnlist[i].push(name);
                        }
                    }
                    this.setState({ readlist: nnlist, }, () => {
                        // console.log('updated:', JSON.stringify(this.state.readlist));
                    });
                    // 记录一下
                    // console.log("收到后端发来的已读成功响应：" + JSON.stringify(responseData));
                }
                else if (responseData.conversation_type === "add_conversation") // 收到了和另一个用户的私聊的信息
                {
                    // 记录
                    // console.log("收到了后端发来的信息：" + JSON.stringify(responseData));
                    // 解析
                    let chat_id = responseData.conversation_id; // 聊天的id
                    let chat_name = responseData.conversation_name; // 聊天的名字
                    if (this.state.chatidlist.indexOf(chat_id) >= 0) {
                        message.warning("当前已有该聊天")
                    }
                    else {
                        let n1 = this.state.chatlist.concat(chat_name); // 这个聊天的名字
                        let n2 = this.state.chatidlist.concat(chat_id); // 聊天的id
                        let n3 = this.state.verilist.concat(false); // 是否进行二次验证
                        let n4 = this.state.silent_list.concat(false); // 是否消息免打扰

                        this.setState({
                            chatlist: n1,
                            messagenumber: this.state.messagenumber.concat(0),
                            chatidlist: n2,
                            verilist: n3,
                            silent_list: n4,
                        },
                            () => {
                                // console.log("更新了:", this.state.chatlist);
                            });
                    }
                }
                else if (responseData.conversation_type === "group_member_and_friend") // 所在的群里有人改名了
                {
                    // 记录
                    // console.log("收到了后端发来的信息：" + JSON.stringify(responseData));
                    // 解析
                    let chat_id = responseData.conversation_id; // 聊天的id
                    let group_namelist = responseData.group_member_name_list; // 只包括还在群里的人的 群成员列表 包含自己
                    let friend_namelist = responseData.friend_name_list; // 不包含自己 不包含已注销的好友 好友列表
                    if (chat_id === this.state.currentchatid) {
                        this.setState({ curgrouplist: group_namelist, friendlist: friend_namelist }, () => {
                            // console.log('updated:', this.state.curgrouplist);
                            Modal.confirm({
                                title: '群聊功能',
                                content: (
                                    <div>
                                        <Button onClick={this.groupInfo}>群聊信息</Button><br />
                                        <Button onClick={this.groupNotice}>发布公告</Button>
                                        <Button onClick={this.memberManage}>群员管理</Button>
                                    </div>
                                ),
                                onOk: () => { Modal.info().destroy(); }
                            });
                        });
                    }
                }
                else // 收到了不知道什么东西
                {
                    // message.warning("用于收发聊天信息的socket收到了内容不符合规定的信息：" + JSON.stringify(responseData))
                }
            }
            else // 是错误的响应
            {
                // 根据错误响应的类型通知用户
                if ('code' in responseData) {
                    // console.log("收到错误响应：", JSON.stringify(responseData));
                    message.warning("错误响应：" + ChatWrongResponse(responseData.code, responseData.info));
                }
                else {
                    // 错误的响应的消息类型不正常
                    // console.log('收到格式无法解析的错误响应，数据为：' + JSON.stringify(responseData.data));
                    // message.error("收到格式无法解析的错误响应：" + JSON.stringify(responseData));
                }
            }

        });

        this.friend_request_connection.addEventListener('message', (event) => {
            // 解析后端发来的信息
            const responseData = JSON.parse(event.data);

            // 分析信息内容
            if ('request_type' in responseData) // 是好友申请相关的数据
            {
                if (responseData.request_type === "request_init") // 发给自己未处理的好友申请
                {
                    // 提醒用户
                    // message.success("成功从后端获取所有未处理的好友申请（也可能没有未处理的好友申请）")
                    // console.log("成功从后端获取所有未处理的好友申请（也可能没有未处理的好友申请）")

                    // 执行操作
                    let new_list = responseData.request_body;
                    this.setState({ requestlist: new_list, }, () => {
                        // console.log('updated:', this.state.requestlist);
                    });

                }
                else if (responseData.request_type === "request_forward_accept") // 通过了对方的好友申请
                {
                    if (this.state.curname === responseData.receiver_name) {
                        // 提醒用户
                        message.success("成功通过了【" + responseData.sender_name + "】发来的好友申请，已自动提醒对方");
                        // console.log("成功通过了【" + responseData.sender_name + "】发来的好友申请，已自动提醒对方" + responseData.conversation_id);

                        let newlist = this.state.friendlist.concat(responseData.sender_name)
                        let nlist = this.state.chatlist.concat(responseData.sender_name + " and " + this.state.curname)
                        // 添加新的好友
                        this.setState({ friendlist: newlist })
                        this.setState({
                            chatlist: nlist,
                            messagenumber: this.state.messagenumber.concat(0),
                            verilist: this.state.verilist.concat(false),
                            silent_list: this.state.silent_list.concat(false),
                            chatidlist: this.state.chatidlist.concat(responseData.conversation_id)
                        }, () => {
                            // console.log('updated:', this.state.chatidlist);
                        });
                        // 删除好友申请
                        let index = this.state.requestlist.indexOf(responseData.sender_name); // 查找元素的下标
                        this.state.requestlist.splice(index, 1); // 从数组中删除元素
                    }

                }
                else if (responseData.request_type === "request_forward_accepted") // 自己发送的好友申请被通过了
                {
                    if (this.state.curname === responseData.sender_name) {
                        // 提醒用户
                        // console.log(responseData.receiver_name + "同意了你发送的好友申请")
                        message.success(responseData.receiver_name + "同意了你发送的好友申请")
                        let newlist = this.state.friendlist.concat(responseData.receiver_name)
                        let nlist = this.state.chatlist.concat(this.state.curname + " and " + responseData.receiver_name)
                        // 执行操作
                        this.setState({
                            friendlist: newlist, chatlist: nlist,
                            messagenumber: this.state.messagenumber.concat(0),
                            verilist: this.state.verilist.concat(false),
                            silent_list: this.state.silent_list.concat(false),
                            chatidlist: this.state.chatidlist.concat(responseData.conversation_id)
                        }, () => {
                            // console.log('updated:', this.state.friendlist);
                        });


                    }
                }
                else if (responseData.request_type === "request_send") // 我发出了好友申请
                {
                    // 提醒用户
                    message.success("成功给" + responseData.receiver_name + "发送了好友申请");
                    // console.log("成功给" + responseData.receiver_name + "发送了好友申请");
                }
                else if (responseData.request_type === "request_receive") // 我收到了好友申请
                {
                    // 提醒用户
                    message.info("收到【" + responseData.sender_name + "】发来的好友申请");
                    // console.log("收到【" + responseData.sender_name + "】发来的好友申请");

                    // 执行操作
                    this.setState({ requestlist: this.state.requestlist.concat(responseData.sender_name), }, () => {
                        // console.log('updated:', this.state.requestlist);
                    });

                }
                else if (responseData.request_type === "request_forward_refuse") // 成功拒绝了好友申请
                {
                    if (this.state.curname === responseData.receiver_name) {
                        // 提醒用户
                        message.success("成功拒绝了" + responseData.sender_name + "的好友申请。")
                        // console.log("成功拒绝了" + responseData.sender_name + "的好友申请。")

                        // 执行拒绝好友申请的操作
                        let name = responseData.sender_name;
                        let index = this.state.requestlist.indexOf(name); // 查找元素的下标
                        this.state.requestlist.splice(index, 1); // 从数组中删除元素
                        this.setState({ requestlist: this.state.requestlist, }, () => {
                            // console.log('updated:', this.state.requestlist);
                        });

                    }
                }
                else if (responseData.request_type === "request_forward_refused") // 自己发出的好友申请被拒绝了
                {
                    // 提醒用户
                    message.warning("您发送给【" + responseData.receiver_name + "】的好友申请被拒绝了")
                    // console.log("您发送给【" + responseData.receiver_name + "】的好友申请被拒绝了")
                }
                else // 异常情况
                {
                    // 提醒用户
                    // message.error("处理好友的socket从后端收到了格式不正确的数据：" + JSON.stringify(responseData));
                    // console.log("处理好友的socket从后端收到了格式不正确的数据：" + JSON.stringify(responseData));
                }
            }
            else // 是错误的响应
            {
                // 根据错误响应的类型通知用户
                if (('code' in responseData) && ('info' in responseData)) {
                    // 提醒用户
                    // console.log("处理好友的socket收到错误响应：" + SentAddFriendRequest(responseData.code, responseData.info));
                    message.warning("处理好友的socket收到错误响应：" + SentAddFriendRequest(responseData.code, responseData.info));
                }
                else {
                    // 错误的响应的消息类型不正常
                     
                    // message.error("处理好友的socket收到格式无法解析的错误响应：" + JSON.stringify(responseData));
                }
            }
        });

        // 连接关闭
        this.socket_connection.addEventListener('close', (event) => {
            // 在日志中提醒一下
             
            // 提醒一下用户
            if (this.state.ifuserinfo === false) {
                this.signOut();
                message.warning("出现网络波动或您使用了危险的网络信道，为保证安全和数据一致性，可能会将您强行登出。");
            }
        });

        this.friend_request_connection.addEventListener('close', (event) => {
            // 在日志中提醒一下
           
            // 提醒一下用户
            if (this.state.ifuserinfo === false) {
                this.signOut();
                message.warning("出现网络波动或您使用了危险的网络信道，为保证安全和数据一致性，可能会将您强行登出。");
            }
        });

        // 这里是需要执行的函数
        const requestData = {
            "name": this.state.curname,
        };
        // 记录一下干了什么
       
        // 发送给后端并解析数据
        fetch('https://Backend-seteamp.app.secoder.net/friend', {
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
                        const { code, info, friends_ids, friends_names } = data;
                        // 发过来了成功响应
                        if ((code === 0 && info === "Succeed")) {
                            // 在日志中记录操作成功
                             

                            this.setState({ friendlist: friends_names }, () => {
                                 
                            });

                        }
                        // 失败响应
                        else {
                            // 在日志中记录用户搜索失败
                          
                            // 提示用户登录失败
                            message.warning("初始化时获取好友列表失败：" + CheckFriendList(code, info));
                        }
                    })
                    // 压根就没和后端成功建立连接
                    .catch(error => {
                        // 打印错误信息到控制台
                        // console.error("friend的http协议和后端没能成功建立连接" + JSON.stringify(error));

                        // 提示用户失败
                        // message.error("friend的http协议和后端没能成功建立连接" + JSON.stringify(error));
                    });
            });
    }
    // 向后端请求提及某个用户
    // 参数：提及的那个人的用户名 
    mentionUserInfo = (namelist) => {
        if (this.state.ifchat) {
            // 构建请求体
            const requestData = {
                "selected_user_name_list": namelist,
                "select_user_name": this.state.curname,
                "conversation_type": "mention_user",
                "conversation_id": this.state.currentchatid,
            }
            // 发送请求体
            this.socket_connection.send(JSON.stringify(requestData));
            // 报告
             
            this.setState({ ifchat: false })
        }

    }

    handleAddFriendGroup = (members) => {
        Modal.confirm({
            title: '请选择想加的朋友',
            content: (
                <div>
                    {
                        members.map((member, index) => (
                            <Button key={index + member}
                                onClick={() => this.addFriend(member)}
                            >
                                {member}
                            </Button>
                        ))
                    }
                </div>
            ),
            onOk: () => { Modal.info().destroy(); }
        });
    }
    // 搜索聊天记录的函数
    searchChatHistory = (check_type, check_body) => {
        // 构建请求体
        const requestData = {
            "check_type": check_type,
            "check_body": check_body,
            "conversation_id": this.state.currentchatid,
        }

        // 记录一下干了什么
       
        // 发送请求信息
        fetch('https://Backend-seteamp.app.secoder.net/chat_history', {
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
                        const { code = null, info = null, check_type = null, message_list = null } = data;
                        // 发过来了成功响应
                        if ((code === null && info === null && message_list !== null && check_type !== null)) {
                            // 提示用户操作成功
                            message.success("成功搜索【" + check_body + "】");
                            // 在日志中记录操作成功
                             
                            // 判断一下有没有搜索到消息
                            if (message_list.length === 0) // 没有搜索到信息
                            {
                                // 提醒用户没有搜索到信息
                                message.warning("根据【" + check_body + "】没有搜索到信息")
                            }
                            else // 成功搜索到了信息
                            {
                                this.setState({ searlist: message_list }, () => {
                                   
                                });
                            }
                        }
                        // 失败响应
                        else if (code !== null && info !== null && check_type === null && message_list === null) {
                            // 在日志中记录用户登陆失败
                          
                         
                            // 提示用户登录失败
                            message.warning("搜索聊天记录失败：" + SearchChatHistory(code, info));
                        }
                        // 收到的响应的格式不正确
                        else {
                            // message.error("收到的后端响应的格式不正确");
                            // console.error("收到的后端响应的格式不正确")
                            // message.error("收到的数据：" + JSON.stringify(data));
                            // console.error("收到的数据：" + JSON.stringify(response));
                        }
                    })
                    .catch(error => {
                        // 打印错误信息到控制台
                        // console.error("和后端没能成功建立连接，消息无法传到后端");
                        // 提示用户失败
                        // message.error("和后端没能成功建立连接，消息无法传到后端");
                    });
            });
    }
    // 把多媒体信息发送给后端
    // 参数分别是：Base64位字符串，类型的名字（API文档里规定了四种），群聊的id
    sendMediaMessage = (media_content, media_type, chat_id) => {
        let type = "jpg"
        if (media_type === 1) {
            type = "jpg";
        }
        else if (media_type === 2) {
            type = "mp3";
        }
        else if (media_type === 3) {
            type = "mp4";
        }
        else {
            type = "pdf";
        }
        // 构建请求体
        const requestData = {
            "conversation_type": "multimedia message",
            "multimedia_info": media_content,
            "multimedia_type": type,
            "sender_name": this.state.curname,
            "conversation_id": chat_id,
        }
        // 发送信息
        this.socket_connection.send(JSON.stringify(requestData));
        // 报告
      
    }
    withdrawGroupMessage = (msg_id) => {
        // chat_id是那个群聊的id，msg_id是要撤回的那条消息的id
        // 构建请求体
        const requestData = {
            "conversation_type": "public_withdraw",
            "name": this.state.curname,
            "conversation_id": this.state.currentchatid,
            "message_id": msg_id,
        }
        // 发送
        this.socket_connection.send(JSON.stringify(requestData));
        // 报告
        
    }

    acceptInvite = (id, invitor_name, invited_name) => {
        // 构建请求体
        const requestData = {
            "conversation_type": "invite_approve",
            "conversation_id": id,
            "invitor_name": invitor_name, // 发出邀请者的名字
            "invited_name": invited_name, // 被邀请者的名字
        }
        // 发送
        this.socket_connection.send(JSON.stringify(requestData));
        // 报告
         
        message.success("成功同意了" + invitor_name + "请求" + invited_name + "入群的申请");
    }

    rejectInvite = (id, invitor_name, invited_name) => {
        // 构建请求体
        const requestData = {
            "conversation_type": "invite_reject",
            "conversation_id": id,
            "invitor_name": invitor_name, // 发出邀请者的名字
            "invited_name": invited_name, // 被邀请者的名字
        }
        // 发送
        this.socket_connection.send(JSON.stringify(requestData));
        // 报告
         
        message.success("成功拒绝了" + invitor_name + "请求" + invited_name + "入群的申请");
    }


    // 告诉后端，自己退出了id的群聊
    groupWithidraw = () => {
        // 构建请求体
        const requestData = {
            "conversation_type": "exit_group",
            "conversation_id": this.state.currentchatid,
            "name": this.state.curname,
        }
        // 发送
        this.socket_connection.send(JSON.stringify(requestData));
        // 报告
        
    }

    // 群主向后端申请自己管理的所有的群的入群申请
    groupRequest = () => {
        // 构建请求体
        const requestData = {
            "conversation_type": "invite_init",
            "name": this.state.curname,
        };
        // 在日志中记录
         
        // 发送请求体
        this.socket_connection.send(JSON.stringify(requestData));
    }

    // 二次验证相关
    ifveri = (id) => {
        for (let i = 0; i < this.state.chatidlist.length; i++) {
            if (this.state.chatidlist[i] === id) {
                return this.state.verilist[i];
            }
        }
        return false;
    }

    handleclick = (name, id) => {
        // 
        this.setState({
            chat_visible: true, currentchatid: id
            , talkingobject: name,
            markmessage: "",
            markmessageid: -1,

            ifforward: false,
            forwardidlist: [],
            forwardobjectids: [],
        }, () => {
            
            const requestData = {
                "conversation_type": "private_init",
                "conversation_id": this.state.currentchatid,
                "name": this.state.curname,
                "receiver_name": name,
            }

            // 提醒现在在干什么
       

            // 把请求体发送给后端
            this.socket_connection.send(JSON.stringify(requestData))
        });
    }

    // 向后端请求群聊的信息
    groupInfo = () => {
        // 构建请求体
        const requestData = {
            "conversation_type": "group_info",
            "conversation_id": this.state.currentchatid,
        }
        // 发送
        this.socket_connection.send(JSON.stringify(requestData));
        // 报告
        
    }

    handleRightClickofChatObject = (event) => {
        event.preventDefault();

    }

    // 向后端发信息请求把new_owner（是字符串）设定为群主，id是群聊的id
    transferOwner = (new_owner) => {
        // 构建请求体
        const requestData = {
            "conversation_type": "group owner transfer",
            "conversation_id": this.state.currentchatid,
            "name": this.state.curname,
            "new_owner_name": new_owner,
        }
        // 报告在干什么
         
        // 发送请求
        this.socket_connection.send(JSON.stringify(requestData));
    }

    messageChange = debounce((event) => {
        // 把表单输入的值赋值给userpassword
        const { value } = event.target;

        this.setState((state) => ({
            ...state,
            message: value
        }));
    }, 30); // 300毫秒为等待时间


    AcceptFriendRequest = (name) => {
        // 同意好友申请
        // 生成请求体
        const requestData = {
            "request_type": "request_forward_accept",
            "sender_name": name,
            "receiver_name": this.state.curname,
        }
        // 发送请求体
        this.friend_request_connection.send(JSON.stringify(requestData));
        // 在日志中记录
         
    }

    RefuseFriendRequest = (name) => {
        // 拒绝好友申请
        // 生成请求体
        const requestData = {
            "request_type": "request_forward_refuse",
            "sender_name": name,
            "receiver_name": this.state.curname,
        }
        // 发送请求体
        this.friend_request_connection.send(JSON.stringify(requestData));
        // 在日志中记录
        
    }

    deletemessage = (msgid) => {
        // 告诉后端你删除了id为msgid的消息
        // 向后端请求删除
         
        message.info("向后端请求删除id为" + msgid + "的信息");

        // 构建请求体
        const responseData = {
            "conversation_type": "delete_message",
            "current_user_name": this.state.curname,
            "message_id": msgid,
        }

        // 发送信息
        this.socket_connection.send(JSON.stringify(responseData));

        // 在日志中记录
        
    }

    withdrawmessage = (msgid) => {
        // 向后端发送请求撤回msg的申请
        // 构建请求体
        let msg = "";
        for (var i = 0; i < this.state.historymessageid.length; i++) {
            if (this.state.historymessageid[i] == msgid) {
                msg = this.state.historymessage[i];
                break;
            }
        }
        const requestData = {
            "name": this.state.curname,
            "conversation_type": "private_withdraw",
            "msg_body": msg,
            "message_id": msgid,
            "conversation_id": this.state.currentchatid,
        }

        // 发送申请
        this.socket_connection.send(JSON.stringify(requestData));

        // 在日志中记录
         
    }

    permit = (name, id) => {
        this.handleclick(name, id);
    }

    // 向后端请求和另一个用户的聊天的信息
    addChat = (friend_name) => {
        // 构建请求体
        const requestData = {
            "conversation_type": "add_conversation",
            "my_name": this.state.curname,
            "friend_name": friend_name,
        }
        // 记录
       
        // 发送
        this.socket_connection.send(JSON.stringify(requestData));
    }



    pushChat = (name) => {
        this.addChat(name);
    }

    // 把消息发送到后端
    sendMessage = () => {
        // 更新消息内容

        if (this.state.markmessage == "") {
            // 创建请求体
            const requestData = {
                "conversation_type": "chat",
                "name": this.state.curname,
                "conversation_id": this.state.currentchatid,
                "msg_body": this.state.message,
            };
            // 发送 
            this.socket_connection.send(JSON.stringify(requestData));

            // 在日志中记录
       
        }
        else {
            this.replyMessage(this.state.markmessage, this.state.message, this.state.markmessageid);
            this.setState({ markmessage: "", markmessageid: -1 }, () => {
                
            });

        }
    }

    // 向后端请求在tag组里删除好友
    friendGroupDel = (friend_name, tag) => {
        // friend_name是好友的名称，tag是组，类型都是字符串
        // 构建请求体
        const requestData = {
            "name": this.state.curname, // 用户自己的名字
            "friend_name": friend_name, // 好友的名字
            "tag": tag, // 标签的具体内容
        }
        // 报告一下
     
        // 发送到后端
        fetch('https://Backend-seteamp.app.secoder.net/friend_tag', {
            method: "DELETE",
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
                        const { code, info, tag_list } = data;
                        // 发过来了成功响应
                        if ((code === 0 && info === "Succeed")) {
                            // 提醒一下
                            
                            message.success("成功把好友从分组中移除");
                            this.setState({ taglist: tag_list }, () => {
                                 
                            })
                        }
                        // 失败响应
                        else {
                            // 在日志中记录用户登陆失败
                            // console.log("没能成功移除：" + FriendGroup(code, info));
                            // 提示用户登录失败
                            message.warning("没能成功移除：" + FriendGroup(code, info));
                        }
                    })
                    .catch(error => {
                        // 打印错误信息到控制台
                        // console.error("把好友从分组移除的http协议抛出问题");
                        // 提示用户失败
                        // message.error("把好友从分组移除的http协议抛出问题");
                    });
            });
    }

    // 向后端请求把某个好友分到某个组里
    // friend_name是好友的名称，tag是分的到的组，类型都是字符串
    friendGroup = (friend_name, tag) => {
        // 构建请求体
        const requestData = {
            "name": this.state.curname, // 用户自己的名字
            "friend_name": friend_name, // 好友的名字
            "tag": tag, // 标签的具体内容
        }
        // 报告一下
        // console.log("向后端请求对好友进行分组：" + JSON.stringify(requestData));
        // 发送到后端
        fetch('https://Backend-seteamp.app.secoder.net/friend_tag', {
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
                        const { code, info, tag_list } = data;
                        // 发过来了成功响应
                        if ((code === 0 && info === "Succeed")) {
                            // 提醒一下
                            // console.log("成功给好友分组");
                            message.success("成功给好友分组");
                            this.setState({ taglist: tag_list }, () => {
                                // console.log('updated:', this.state.taglist);
                            })
                        }
                        // 失败响应
                        else {
                            // 在日志中记录用户登陆失败
                            // console.log("没能分组：" + FriendGroup(code, info));
                            // 提示用户登录失败
                            message.warning("分组失败：" + FriendGroup(code, info));
                        }
                    })
                    .catch(error => {
                        // 打印错误信息到控制台
                        // console.error("好友分组的http协议抛出问题");
                        // 提示用户失败
                        // message.error("好友分组的http协议抛出问题");
                    });
            });
    }


    // 回复信息
    replyMessage = (msg_body, reply_msg_body, msg_id) => {
        // msg_body是被回复的消息，reply_msg_body是你发出的回复的信息，msg_id是被回复的消息的id，message_sender是你回复的那条信息的发出者
        // 这需要在发送的按钮上区分回复信息和正常发送信息
        const requestData = {
            "conversation_type": "reply_message",
            "current_user_name": this.state.curname,
            "msg_body": msg_body,
            "reply_msg_body": reply_msg_body,
            "message_id": msg_id,
            "conversation_id": this.state.currentchatid,
        }
        this.socket_connection.send(JSON.stringify(requestData));

        // 在日志中记录
        // console.log("向后端发送了：" + JSON.stringify(requestData));
    }

    // 点击转发按钮调用的函数
    messageForward = (msg_id_list) => {
        // msg_id_list是一个列表，包含所有需要转发的信息
        const requestData = {
            "conversation_type": "message forwarding",
            "message_id_list": msg_id_list,
            "sender_name": this.state.curname,
            "current_conversation_id": this.state.currentchatid, // 被转发的信息来自的聊天的id
            "target_conversation_id": this.state.forwardobjectids // 转发到的聊天的id
        }
        this.socket_connection.send(JSON.stringify(requestData));

        // 在日志中记录
        // console.log("向后端发送了：" + JSON.stringify(requestData));
    }

    // 请求删除好友
    deleteFriend = (name) => {
        // 构建请求体
        const requestData = {
            "name": this.state.curname,
            "deleted_name": name
        }
        // 记录一下干了什么
        // console.log("向后端发送了：" + JSON.stringify(requestData));
        // 发送删除好友的请求并处理响应
        fetch('https://Backend-seteamp.app.secoder.net/friend', {
            method: "DELETE",
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
                            // 执行删除好友的操作
                            let new_list = this.state.friendlist;

                            new_list.splice(new_list.indexOf(name), 1);
                            this.setState({
                                friendlist: new_list, showalllist: false,
                                showchatlist: false, newfriendvisible: false, collapsed: true
                            }, () => {
                                // console.log('updated:', this.state.friendlist);
                            });

                            // 提示用户操作成功
                            message.success("成功删除好友【" + name + "】");
                            // 在日志中记录操作成功
                            // console.log("用户成功删除和" + name + "的好友关系");

                        }
                        // 失败响应
                        else {
                            // 在日志中记录用户登陆失败
                            // console.log("没能成功删除和" + name + "的好友关系：" + DeleteFriend(code, info));
                            // 提示用户登录失败
                            message.warning("没能成功删除和" + name + "的好友关系：" + DeleteFriend(code, info));
                        }
                    })
                    .catch(error => {
                        // 打印错误信息到控制台
                        // console.error("删除好友的http协议和后端没能成功建立连接，消息无法传到后端");
                        // 提示用户失败
                        // message.error("删除好友的http协议和后端没能成功建立连接，消息无法传到后端");
                    });
            });
    }


    // 向后端请求邀请好友进群
    // name是被邀请的好友的名字，id是聊天的id
    addMem = (name) => {
        // 构建请求体
        const requestData = {
            "conversation_type": "invite",
            "conversation_id": this.state.currentchatid,
            "invitor_name": this.state.curname, // 发出邀请者的名字
            "invited_name": name, // 被邀请者的名字
        }
        // 提醒
        // console.log("向后端请求邀请好友进群：" + JSON.stringify(requestData));
        // 发送
        this.socket_connection.send(JSON.stringify(requestData));
    }

    // 请求添加管理员
    setManager = (id, list) => {
        // 构建请求体
        const requestData = {
            "conversation_type": "choose_group_manager",
            "conversation_id": id,
            "name": this.state.curname,
            "manager_name_list": list,
        }
        // 记录干了什么
        // console.log("向后端发送了指定群管理员的请求，请求体为：" + JSON.stringify(requestData));
        // 发送请求体
        this.socket_connection.send(JSON.stringify(requestData));
        this.setState({ addmanagerlist: [] }, () => {
            // console.log('updated:', this.state.newmanagerlist);
        })
    }


    addFriend = (name) => {
        // 发送好友请求
        //  生成请求体
        const requestData = {
            "request_type": "request_send",
            "sender_name": this.state.curname,
            "receiver_name": name,
        };
        // 向后端发送
        this.friend_request_connection.send(JSON.stringify(requestData));

        // 在日志中记录
        // console.log("向后端发送了：" + JSON.stringify(requestData));
    }

    toggle = () => {
        this.setState({ collapsed: !this.state.collapsed }, () => {
            // console.log('updated:', this.state.collapsed);
        });

    };

    handleMenuSignOutClick = () => {
        this.signOut();
    };




    // 登出按钮
    signOut = () => {
        // 把好友界面的信息发过去
        // const requestData = {
        //     "conversation_type": "log_out",
        //     "user_name": this.state.curname,
        //     "view_order": this.state.chatlist,
        //     "view_id_order": this.state.chatidlist,
        //     "view_ifveri_list": this.state.verilist,
        //     "silent_list": this.state.silent_list,
        //     "need_twice_verification" : this.state.verilist,
        // }

        // // 断开连接
        // this.socket_connection.close()
        // this.friend_request_connection.close()

        // // 发送登出的请求
        // this.socket_connection.send(JSON.stringify(requestData));

        // // 关闭socket连接
        // this.socket_connection.close();
        // this.friend_request_connection.close();

        // // 在日志中记录
        // console.log("向后端发送了：" + JSON.stringify(requestData));
        Router.push({ pathname: '/' })
    }

    handleMenuSettingClick = () => {

    };
    clickView = (name) => {
        this.setState({ ifuserinfo: true }, () => {
            // console.log("离开了nimadlkasjdklj")
            Router.push({ pathname: '/friendinfo', query: { name: name } });;
        });

    }
    handleMenuInfoClick = (key) => {
        this.userInfo();
    };

    userInfo = () => {

        this.setState({ ifuserinfo: true }, () => {
            Router.push({
                pathname: '/userinfo', query: { name: this.state.curname, view_order: this.state.chatlist, view_id_order: this.state.chatidlist, silent_list: this.state.silent_list, need_twice_verification: this.state.verilist, num_of_top: this.state.num_of_top }
            })
        })



    }

    renderChatObject = (name, id) => {
        let r = this.state.chatidlist.indexOf(id);
        let number = this.state.messagenumber[r];
        return (
            <Chatobject
                // 为聊天添加二次验证
                number={number}
                verify=
                {(objectname) => {
                    // 提醒当前操作
                    // console.log("对当前聊天添加二次验证");
                    message.info("正在请求对当前聊天添加二次验证");
                    // 获取当前聊天的编码
                    let r = this.state.chatidlist.findIndex((elem) => elem === id);
                    // 构建请求体
                    const requestData = {
                        "conversation_id": this.state.chatidlist[r],
                        "name": this.state.curname,
                        "password": this.state.password,
                    }
                    // 记录一下干了什么
                    // console.log("向后端发送了：" + JSON.stringify(requestData));
                    // 发送请求
                    fetch('https://Backend-seteamp.app.secoder.net/set_twice_verification', {
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
                                        message.success("成功为当前聊天添加二次验证");
                                        // 在日志中记录操作成功
                                        // console.log("用户成功为当前聊天添加二次验证");
                                        // 添加二次验证
                                        let newlist = [...this.state.verilist];
                                        newlist[r] = true;
                                        this.setState({ verilist: newlist, }, () => {
                                            // console.log('updated:', this.state.verilist);
                                        });

                                    }
                                    // 失败响应
                                    else {
                                        // 在日志中记录用户登陆失败
                                        // console.log("添加二次验证失败：" + VerificationWrong(code, info));
                                        // 提示用户登录失败
                                        message.warning("添加二次验证失败：" + VerificationWrong(code, info));
                                    }
                                })
                                .catch(error => {
                                    // 打印错误信息到控制台
                                    // console.error("set_twice_verification的http协议和后端没能成功建立连接，消息无法传到后端");

                                    // 提示用户失败
                                    // message.error("set_twice_verification的http协议和后端没能成功建立连接，消息无法传到后端");
                                });
                        });
                }}
                handledel={(name) => {
                    let r = this.state.chatidlist.indexOf(id);
                    this.state.chatlist.splice(r, 1),
                        this.state.messagenumber.splice(r, 1),
                        this.state.verilist.splice(r, 1),
                        this.state.silent_list.splice(r, 1),
                        this.state.chatidlist.splice(r, 1)
                    this.setState({
                        chatlist: this.state.chatlist,
                        messagenumber: this.state.messagenumber,
                        verilist: this.state.verilist,
                        silent_list: this.state.silent_list,
                        chatidlist: this.state.chatidlist
                    }, () => {
                        // console.log('updated:', this.state.chatidlist);
                    });
                }}

                // 取消聊天的二次验证
                deleteverify={(objectname) => {
                    // 提醒当前操作
                    // console.log("对当前聊天取消二次验证");
                    message.info("正在请求对当前聊天取消二次验证");

                    // 获得当前聊天的编码
                    let r = this.state.chatidlist.findIndex((elem) => elem === id);

                    // 构建请求体
                    const requestData = {
                        "conversation_id": this.state.chatidlist[r],
                        "name": this.state.curname,
                        "password": this.state.password,
                    }
                    // 记录一下干了什么
                    // console.log("向后端发送了：" + JSON.stringify(requestData));

                    // 发送请求
                    fetch('https://Backend-seteamp.app.secoder.net/set_twice_verification', {
                        method: "DELETE",
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
                                        message.success("成功为当前聊天删除二次验证");
                                        // 在日志中记录操作成功
                                        // console.log("用户成功为当前聊天删除二次验证");
                                        // 取消二次验证
                                        let newlist = [...this.state.verilist];
                                        newlist[r] = false;
                                        this.setState({ verilist: newlist, }, () => {
                                            // console.log('updated:', this.state.verilist);
                                        });
                                    }
                                    // 失败响应
                                    else {
                                        // 在日志中记录用户登陆失败
                                        // console.log("取消二次验证失败：" + CantCancelVerification(code, info));
                                        // 提示用户登录失败
                                        message.warning("取消二次验证失败：" + CantCancelVerification(code, info));
                                    }
                                })
                                .catch(error => {
                                    // 打印错误信息到控制台
                                    // console.error("set_twice_verification的http协议和后端没能成功建立连接，消息无法传到后端");
                                    // 提示用户失败
                                    // message.error("set_twice_verification的http协议和后端没能成功建立连接，消息无法传到后端");
                                });
                        });

                }}
                ifveri={this.state.verilist[this.state.chatidlist.findIndex((elem) => elem === id)]}
                ifsilent={this.state.silent_list[this.state.chatidlist.findIndex((elem) => elem === id)]}
                silent={(name) => {
                    let r = this.state.chatidlist.indexOf(id);
                    let newlist = [...this.state.silent_list];
                    newlist[r] = true;
                    this.setState({ silent_list: newlist, }, () => {
                        // console.log('updated:', this.state.silent_list);
                    });
                }}

                deletesilent={(name) => {
                    let r = this.state.chatidlist.indexOf(id);
                    let newlist = [...this.state.silent_list];
                    newlist[r] = false;
                    this.setState({ silent_list: newlist, }, () => {
                        // console.log('updated:', this.state.silent_list);
                    });
                }}
                objectname={name}
                up={(objectname) => {
                    let r = this.state.chatidlist.findIndex((elem) => elem === id);
                    if (r > this.state.upend) {
                        let newend = this.state.upend;
                        newend++;
                        this.setState({ upend: newend, }, () => {
                            // console.log('updated:', this.state.upend);
                        });

                    }
                    this.state.messagenumber.splice(0, 0, this.state.messagenumber.splice(r, 1)[0]);
                    this.state.chatlist.splice(0, 0, this.state.chatlist.splice(r, 1)[0]);
                    this.state.verilist.splice(0, 0, this.state.verilist.splice(r, 1)[0]);
                    this.state.silent_list.splice(0, 0, this.state.silent_list.splice(r, 1)[0]);
                    this.state.chatidlist.splice(0, 0, this.state.chatidlist.splice(r, 1)[0]);
                    // 更新组件状态
                    this.setState({
                        chatlist: this.state.chatlist,
                        messagenumber: this.state.messagenumber,
                        chatidlist: this.state.chatidlist,
                        verilist: this.state.verilist,
                        silent_list: this.state.silent_list,
                    }, () => {
                        // console.log('updated:', this.state.chatlist);
                    });

                }}
                deleteup={(objectname) => {
                    let r = this.state.chatidlist.findIndex((elem) => elem === id);
                    let newlist = this.state.chatlist;
                    let newidlist = this.state.chatidlist;
                    let newverilist = this.state.verilist;
                    let newsilist = this.state.silent_list;
                    let nnlist = this.state.messagenumber;
                    const item = newlist.splice(r, 1)[0]; // 取出要移动的元素，并从数组中删除
                    newlist.splice(this.state.upend + 1, 0, item); // 将该元素插入到新位置
                    const iditem = newidlist.splice(r, 1)[0]; // 取出要移动的元素，并从数组中删除
                    newidlist.splice(this.state.upend + 1, 0, iditem); // 将该元素插入到新位置
                    const veriitem = newverilist.splice(r, 1)[0]; // 取出要移动的元素，并从数组中删除
                    newverilist.splice(this.state.upend + 1, 0, veriitem); // 将该元素插入到新位置
                    const messageitem = nnlist.splice(r, 1)[0];
                    nnlist.splice(this.state.upend + 1, 0, messageitem);
                    const siitem = newsilist.splice(r, 1)[0];
                    newsilist.splice(this.state.upend + 1, 0, siitem);
                    let newend = this.state.upend;
                    newend--;
                    this.setState({
                        upend: newend,
                        chatlist: newlist,
                        messagenumber: nnlist,
                        chatidlist: newidlist,
                        verilist: newverilist,
                        silent_list: newsilist,
                    }, () => {
                        // console.log('updated:', this.state.chatlist);
                    });

                    // 更新组件状态
                }
                }
                ifup={this.state.upend < this.state.chatidlist.findIndex((elem) => elem === id) ? false : true}
                onClick={() => {
                    let ifve = this.ifveri(id);
                    if (ifve) {
                        this.setState({
                            chat_visible: false,
                            currentchatid: id,
                            veri_visible: true,
                            talkingobject: name
                        }, () => {
                            // console.log('updated:', this.state.talkingobject);
                        });
                    }
                    else {
                        this.setState({ veri_visible: false }, () => {
                            // console.log('updated:', this.state.veri_visible);
                        });

                        this.handleclick(name, id)
                    }
                }} />
        );
    };

    showChatList = () => {
        this.setState({ showchatlist: true, showalllist: false, newfriendvisible: false }, () => {
            // console.log('updated:', this.state.showalllist);
        });

    }
    showAllList = () => {
        const requestData = {
            "name": this.state.curname,
        };
        // 记录一下干了什么
        // console.log("向后端发送了：" + JSON.stringify(requestData));
        // 发送给后端并解析数据
        fetch('https://Backend-seteamp.app.secoder.net/friend', {
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
                        const { code, info, friends_ids, friends_names } = data;
                        // 发过来了成功响应
                        if ((code === 0 && info === "Succeed")) {
                            // 在日志中记录操作成功
                            // console.log("成功请求自己的所有好友的信息" + friends_names);

                            this.setState({ friendlist: friends_names, showchatlist: false, showalllist: true, newfriendvisible: false }, () => {
                                // console.log('updated:', this.state.friendlist);
                            });

                        }
                        // 失败响应
                        else {
                            // 在日志中记录用户搜索失败
                            // console.log("没能成功获取好友列表：" + CheckFriendList(code, info));
                            // 提示用户登录失败
                            message.warning("初始化时获取好友列表失败：" + CheckFriendList(code, info));
                        }
                    })
                    // 压根就没和后端成功建立连接
                    .catch(error => {
                        // 打印错误信息到控制台
                        // console.error("friend的http协议和后端没能成功建立连接" + JSON.stringify(error));

                        // 提示用户失败
                        // message.error("friend的http协议和后端没能成功建立连接" + JSON.stringify(error));
                    });
            });


    }

    // 判断base64字符串的长度是否过大
    isStringSizeExceeded = (str) => {
        const sizeInBytes = Buffer.byteLength(str, 'utf-8');
        const maxSizeInBytes = 4 * 1024 * 1024; // 4MB
        return sizeInBytes > maxSizeInBytes;
    }

    // 文件上传处理函数
    handleUpload = (file) => {
        let type = 0;
        if (file.type == "image/jpeg") type = 1;
        else if (file.type == "audio/mp3") type = 2;
        else if (file.type == "video/mpeg4") type = 3;
        else if (file.type == "text/plain") type = 4;
        else type = 0;

        // chatgpt
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                let base64 = event.target.result;

                if (this.isStringSizeExceeded(base64)) // 如果文件过大
                {
                    const requestData = {
                        "conversation_type": "chat",
                        "name": this.state.curname,
                        "conversation_id": this.state.currentchatid,
                        "msg_body": "【很抱歉，这条多媒体信息大小过大，为了保证网页的运行流畅性，我们将不予显示渲染您发送的内容。】",
                    };
                    // 发送 
                    this.socket_connection.send(JSON.stringify(requestData));
                    resolve("");
                }
                this.sendMediaMessage(base64, type, this.state.currentchatid);
                resolve(base64);
                // console.log("通过upload按钮上传了一张图片：" + base64);
            };
            reader.onerror = (error) => {
                reject(error);
            };
        });
    };
    menu = (
        <Menu >
            <Menu.Item key="1" icon={<UserOutlined />}>
                <Button onClick={this.handleMenuInfoClick}>修改个人信息</Button>
            </Menu.Item>
            {/* <Menu.Item key="2" icon={<SettingOutlined />}>
                <Button onClick={this.handleMenuSettingClick}>设置</Button>
            </Menu.Item> */}
            <Menu.Item key="3" icon={<PoweroffOutlined />} onClick={this.handleSignOut}>
                <Button onClick={this.handleMenuSignOutClick}>退出</Button>
            </Menu.Item>
        </Menu>
    );

    chatList = () => {
        return (
            <div className="chat-list" style={{ width: "230px" }}>
                {/* 渲染好友列表 */}
                <ul style={{ listStyle: "none", paddingLeft: 0 }} >
                    {
                        this.state.chatlist.map((item, index) => {
                            return ((
                                <li key={item + index}>
                                    {this.renderChatObject(item, this.state.chatidlist[index])}
                                </li>)
                            )
                        })
                    }
                </ul>
            </div>
        )
    };

    handleNewFriendClick = () => {
        this.setState({ newfriendvisible: true, showchatlist: false, showalllist: false }, () => {
            // console.log('updated:', this.state.newfriendvisible);
        });

    };
    mark = (msgid) => {
        let msg = "";
        for (var i = 0; i < this.state.historymessageid.length; i++) {
            if (this.state.historymessageid[i] == msgid) {
                let mm = this.state.historymessage[i];
                this.setState({ markmessage: this.state.historymessage[i], markmessageid: msgid }, () => {
                    // console.log('updated:', this.state.markmessage);
                });

                break;
            }
        }

    }
    forward = (msgid) => {
        this.setState({ forwardidlist: this.state.forwardidlist.concat(msgid), ifforward: true }, () => {
            // console.log('updated:', this.state.forwardidlist);
        });


    }
    handleForwardSend = (msgidlist) => {
        this.messageForward(msgidlist);
    }
    handleCheckboxChange = (id) => {
        const { forwardobjectids } = this.state;
        const index = forwardobjectids.indexOf(id);
        if (index === -1) {
            forwardobjectids.push(id);
        } else {
            forwardobjectids.splice(index, 1);
        }
        this.setState({ forwardobjectids: forwardobjectids }, () => {
            // console.log('updated:', this.state.forwardobjectids);
        });

    }
    
    handleForward = (msgidlist) => {
        const options = this.state.chatlist;
        Modal.confirm({
            title: '请选择要发送的对象',
            content: (
                <div>
                    {
                        options.map((option, index) => (
                            <Checkbox
                                key={index}
                                onChange={() => this.handleCheckboxChange(this.state.chatidlist[index])}
                            >
                                <p style={{ width: '100px' }}>{option}</p>
                            </Checkbox>
                        ))
                    }
                </div>
            ),
            onCancel: () => { this.setState({ ifforward: false, forwardidlist: [], forwardobjectids: [], }); Modal.info().destroy(); },
            onOk: () => { this.handleForwardSend(msgidlist); Modal.info().destroy(); this.setState({ ifforward: false }) }
        });
    }

    // 向后端请求某个群的成员列表和当前用户的好友列表
    requestInfo = (id) => {
        // 构建请求体
        const requestData = {
            "conversation_type": "group_member_and_friend",
            "conversation_id": id,
            "name": this.state.curname,
        }
        // 报告
        // console.log("向后端发送了：" + JSON.stringify(requestData));
        // 发送
        this.socket_connection.send(JSON.stringify(requestData));
    }


    // 向后端请求发布群公告的函数
    // id是群聊的id，content是记录群公告的内容的字符串
    sendGroupAnnouncement = (id, content) => {
        // 构建请求体
        const requestData = {
            "conversation_type": "group announcement",
            "conversation_id": id,
            "name": this.state.curname,
            "announcement_content": content,
        }
        // 报告干了什么
        // console.log("向后端请求发布群公告" + JSON.stringify(requestData))
        // 发送
        this.socket_connection.send(JSON.stringify(requestData));
    }


    // 向后端请求创建群聊
    handleGroupSend = (grouplist, group_name) => {

        // 构建请求体
        const requestData = {
            "conversation_type": "public_create",
            "name": this.state.curname,
            "group_name": group_name.join(','),
            "group_member": grouplist,
        }
        // 提醒在干什么
        message.info("向后端请求创建包含【" + JSON.stringify(grouplist) + "】的群聊");
        // console.log("向后端请求创建包含【" + JSON.stringify(grouplist) + "】的群聊：" + JSON.stringify(requestData));

        // 发送请求体
        this.socket_connection.send(JSON.stringify(requestData));

    }

    handleGroupCheckboxChange = (friend) => {
        const { grouplist } = this.state;
        const index = grouplist.indexOf(friend);
        if (index === -1) {
            grouplist.push(friend);
        } else {
            grouplist.splice(index, 1);
        }
        this.setState({ grouplist: grouplist }, () => {
            // console.log('updated:', this.state.grouplist);
        });

    }
    handleManagerCheckboxChange = (friend) => {
        const { addmanagerlist } = this.state;
        const index = addmanagerlist.indexOf(friend);
        if (index === -1) {
            addmanagerlist.push(friend);
        } else {
            addmanagerlist.splice(index, 1);
        }
        this.setState({ addmanagerlist: addmanagerlist }, () => {
            // console.log('updated:', this.state.addmanagerlist);
        });

    }
    // 向后端发送信息请求指定用户的头像
    requestAvatar = (name) => {
        // 提醒当前操作
        // console.log("向后端请求了【" + name + "】用户的头像");

        // 构建请求体
        const requestData = {
            "name": name,
        }

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
                            // avatar是你请求到的Base64位字符串
                            let ava = "data:image/jpeg;base64," + avatar;// 加上头的部分
                            this.setState({ myavatar: ava });
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


    handleindirectGroup = (friend) => {
        const options = this.state.friendlist;
        this.setState({ grouplist: this.state.grouplist.concat(friend) }, () => {
            // console.log('updated:', this.state.grouplist);
        });

        Modal.confirm({
            title: '请选择拉取的成员',
            content: (
                <div>
                    {
                        options.map((option, index) => (
                            option !== friend ?
                                <Checkbox
                                    key={index}
                                    onChange={() => this.handleGroupCheckboxChange(this.state.friendlist[index])}
                                >
                                    <p style={{ width: '100px' }}>{option}</p>
                                </Checkbox> : <></>
                        ))
                    }
                </div>
            ),
            onCancel: () => { this.setState({ grouplist: [] }); Modal.info().destroy(); },
            onOk: () => { this.handleGroupSend(this.state.grouplist, this.state.grouplist.concat(this.state.curname)); Modal.info().destroy(); }
        });
    }
    direct = () => {
        const options = this.state.friendlist;
        Modal.confirm({
            title: '请选择拉取的成员',
            content: (
                <div>
                    {
                        options.map((option, index) => (
                            <Checkbox
                                key={index}
                                onChange={() => this.handleGroupCheckboxChange(this.state.friendlist[index])}
                            >
                                <p style={{ width: '100px' }}>{option}</p>
                            </Checkbox>
                        ))
                    }
                </div>
            ),
            onCancel: () => { this.setState({ grouplist: [] }); Modal.info().destroy(); },
            onOk: () => { this.handleGroupSend(this.state.grouplist, this.state.grouplist.concat(this.state.curname)); Modal.info().destroy(); }
        });
    }
    indirect = () => {
        const options = this.state.friendlist;
        Modal.confirm({
            title: '请选择基础私聊',
            content: (
                <div>
                    {
                        options.map((option, index) => (
                            <Button key={index + option}
                                onClick={() => this.handleindirectGroup(this.state.friendlist[index])}
                            >
                                {option}
                            </Button>
                        ))
                    }
                </div>
            ),
            onOk: () => { Modal.info().destroy(); }
        });
    }
    handleGroupClick = () => {
        const options = this.state.friendlist;

        Modal.confirm({
            title: '请选择创建方式',
            content: (
                <div>
                    <Button onClick={this.direct}>直接拉取</Button><br />
                    <Button onClick={this.indirect}>私聊创建</Button>
                </div>
            ),
            onOk: () => { Modal.info().destroy(); }
        });
    }
    handlechOk = () => {
        // 处理逻辑
        this.setState({ searhisvisible: false, searlist: [], selectedoption: 'time' }, () => {
            // console.log('updated:', this.state.searhisvisible);
        });

    };

    handlechCancel = () => {
        this.setState({ searhisvisible: false, searlist: [], selectedoption: 'time' }, () => {
            // console.log('updated:', this.state.searhisvisible);
        });

    };

    handlechChange = debounce((e) => {
        this.setState({ selectedoption: e.target.value }, () => {
            // console.log('updated checktype:', this.state.selectedoption);
        });

    }, 30);

    handleSearchHistory = () => {
        this.setState({ searhisvisible: true }, () => {
            // console.log('updated:', this.state.searhisvisible);
        });

    };

    handlechinputChange = (e) => {

        const { value } = e.target;

        this.setState((state) => ({
            ...state,
            searchbody: value
        }));
    };
    
    groupNotice = () => {
        Modal.confirm({
            title: '发布群公告',
            icon: null,
            content: (
                <Input.TextArea
                    placeholder="请输入群公告内容"
                    autoSize={{ minRows: 4, maxRows: 6 }}
                    defaultValue={this.state.defaultAnnouncementContent}
                    onChange={(e) => {
                        this.setState({ announcementContent: e.target.value });
                    }}
                />
            ),
            okText: '发布',
            cancelText: '取消',
            onOk: () => {
                const content = this.state.announcementContent;
                this.sendGroupAnnouncement(this.state.currentchatid, content);
            },
            onCancel: () => { },
        });
    };
    transferGroupOwner = () => {
        const options = this.state.curgrouplist;
        Modal.confirm({
            title: '请选择转让对象',
            content: (
                <div>
                    {
                        options.map((option, index) => (
                            <Button key={index + option}
                                onClick={() => { this.transferOwner(option); Modal.info().destroy(); }}
                            >
                                {option}
                            </Button>
                        ))
                    }
                </div>
            ),
            onOk: () => { Modal.info().destroy(); }
        });
    }

    delMem = (name) => {
        //向后端请求去除群成员,群聊名称是this.state.talkingobject,群聊id是this.state.currentchatid
        //请求去除成员是name，请求人是this.state.curname
        // 构建请求体
        const requestData = {
            "conversation_type": "member_remove",
            "conversation_id": this.state.currentchatid,
            "operator_name": this.state.curname, // 发出移除成员动作的用户
            "remove_name": name, // 要被移除的用户
        }
        // 向后端发送
        this.socket_connection.send(JSON.stringify(requestData));
        // 提醒
        // console.log("向后端请求移除群成员" + JSON.stringify(requestData));
    }


    addGroupMem = () => {
        const options = this.state.friendlist;
        Modal.confirm({
            title: '请选择拉取对象',
            content: (
                <div>
                    {
                        options.map((option, index) => (this.state.curgrouplist.includes(option) ? <></> :
                            <Button key={index + option}
                                onClick={() => { this.addMem(option); Modal.info().destroy(); }}
                            >
                                {option}
                            </Button>
                        ))
                    }
                </div>
            ),
            onOk: () => { Modal.info().destroy(); }
        });
    }
    delGroupMem = () => {
        const options = this.state.curgrouplist;
        Modal.confirm({
            title: '请选择去除对象',
            content: (
                <div>
                    {
                        options.map((option, index) => (
                            <Button key={index + option}
                                onClick={() => { this.delMem(option); Modal.info().destroy(); }}
                            >
                                {option}
                            </Button>
                        ))
                    }
                </div>
            ),
            onOk: () => { Modal.info().destroy(); }
        });
    }

    addManager = () => {
        const options = this.state.curgrouplist;
        Modal.confirm({
            title: '请选择要添加的管理员',
            content: (
                <div>
                    {
                        options.map((option, index) => (
                            <Checkbox
                                key={index}
                                onChange={() => this.handleManagerCheckboxChange(option)}
                            >
                                <p style={{ width: '100px' }}>{option}</p>
                            </Checkbox>
                        ))
                    }
                </div>
            ),
            onCancel: () => { this.setState({ addmanagerlist: [] }); Modal.info().destroy(); },
            onOk: () => { this.setManager(this.state.currentchatid, this.state.addmanagerlist); Modal.info().destroy(); }
        });
    }
    memberManage = () => {
        Modal.confirm({
            title: '管理成员',
            content: (
                <>
                    <Button type="primary" block style={{ marginBottom: 10 }} onClick={this.addGroupMem}>邀请成员</Button>
                    <Button type="danger" block style={{ marginBottom: 10 }} onClick={this.delGroupMem}>移除成员</Button>
                    <Button type="danger" block style={{ marginBottom: 10 }} onClick={this.transferGroupOwner}>转让群主</Button>
                    <Button type="danger" block style={{ marginBottom: 10 }} onClick={this.addManager}>添加管理员</Button>
                    <Button type="danger" block style={{ marginBottom: 10 }} onClick={this.groupRequest}>查看申请</Button>
                    <Button type="danger" block style={{ marginBottom: 10 }} onClick={this.groupWithidraw}>退出群聊</Button>
                </>
            ),
            onOk: () => { Modal.destroyAll(); },
            onCancel: () => { Modal.destroyAll(); },
        });
    };
    handleGroupProps = () => {
        this.requestInfo(this.state.currentchatid);
    }

    // 向后端请求tag为tag的好友列表
    tagfriend = (tag) => {
        // 构建请求体
        const requestData = {
            "name": this.state.curname, // 用户自己的名字
            "tag": tag, // 标签的具体内容
        }
        // 报告一下
        // console.log("向后端请求分组下的所有好友：" + JSON.stringify(requestData));
        // 发送到后端
        fetch('https://Backend-seteamp.app.secoder.net/get_friend_tag', {
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
                        const { code, info, user_list = null } = data;
                        // 发过来了成功响应
                        if (code === 0 && info === "Succeed" && user_list !== null) {
                            // 提醒一下
                            // console.log("成功获取这组中的所有好友：");
                            Modal.confirm({
                                title: '该tag下的好友有',
                                content: (
                                    <div>
                                        {
                                            user_list.map((option) => (
                                                <p style={{ width: '100px' }} key={option}>{option}</p>
                                            ))
                                        }
                                    </div>
                                ),
                                onOk: () => { Modal.info().destroy(); }
                            });
                        }
                        // 失败响应
                        else {
                            // 在日志中记录用户登陆失败
                            // console.log("没能成功获取分组下的所有好友：" + FriendGroup(code, info));
                            // 提示用户登录失败
                            message.warning("没能成功获取分组下的所有好友：" + FriendGroup(code, info));
                        }
                    })
                    .catch(error => {
                        // 打印错误信息到控制台
                        // console.error("好友分组的http协议抛出问题");
                        // 提示用户失败
                        // message.error("好友分组的http协议抛出问题");
                    });
            });
    }


    handleTag = () => {
        const { taglist } = this.state;
        if (taglist.length === 0) {
            Modal.info({
                title: '您当前未设置过标签',

                onOk() { },
            });
            return;
        }
        Modal.info({
            title: '您已设置的标签',
            content: (
                <div>
                    {taglist.map(tag => (
                        <Button key={tag} onClick={() => this.tagfriend(tag)}>{tag}</Button>
                    ))}
                </div>
            ),
            onOk() { },
        });
    };

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

    // 识别消息的发送人
    senderName = (base64) => {
        const colonIndex = base64.indexOf(':');
        if (colonIndex !== -1) {
            return base64.substring(0, colonIndex);
        }
        return 'None';
    }

    tra = (item) => {
        let base = this.setBase64Format(item);
        let name = this.senderName(item);
        if (item.indexOf("data:") === -1) // 是文本信息
        {
            return <p>{item}</p>
        }
        else // 是多媒体信息
        {
            if (base.startsWith("data:image/jpeg")) // 图片
            {
                return <div>{name + ":"}<Image src={base} style={{ width: '300px', height: '200px' }}></Image></div>;
            }
            else if (base.startsWith("data:audio/wav")) // 音频
            {
                // 在线播放音频
                return (<audio controls="controls" autobuffer="autobuffer" autoplay="autoplay">
                    {name + ":"}<source src={base} />
                </audio>);
            }
            else if (base.startsWith("data:video/mp4")) // 视频
            {
                // 在线播放视频
                return (<video controls style={{ width: '300px', height: '200px' }}>
                    {name + ":"}<source src={base} />
                </video>);
            }
            else // pdf
            {
                // 返回对应的结果
                return (<div>{name + ":"}<object data={base} type="application/pdf"
                    width="100%"
                    height="500px"></object></div>);
            }
        }



    }
    render() {
        const { searhisvisible, selectedoption } = this.state;
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.toggle}>
                    <div className="logo" />
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1" icon={<MessageOutlined />} onClick={() => { this.showChatList() }}>
                            <span>聊天</span>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<MessageOutlined />} onClick={() => { this.showAllList() }}>
                            <span>通讯录</span>
                        </Menu.Item>
                        <Menu.Item key="3" icon={<MessageOutlined />} onClick={this.handleNewFriendClick}>
                            <span>添加好友</span>
                        </Menu.Item>
                        <Menu.Item key="4" icon={<MessageOutlined />} onClick={() => this.handleGroupClick()}>
                            <span>创建群聊</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <div>
                        {this.state.newfriendvisible &&
                            <NewFriendModal ifvisible={this.state.newfriendvisible}
                                addvisible={this.state.addvisible}
                                clickView={this.clickView}
                                setclose={() => this.setState({ addvisible: false }, () => {
                                    // console.log('updated:', this.state.addvisible);
                                })}
                                requestlist={this.state.requestlist}
                                AcceptFriendRequest={this.AcceptFriendRequest}
                                RefuseFriendRequest={this.RefuseFriendRequest}

                                onClose={() => this.setState({ newfriendvisible: false }, () => {
                                    // console.log('updated:', this.state.newfriendvisible);
                                })}
                                addFriend={this.addFriend}

                                onClick={() => this.setState({ addvisible: true }, () => {
                                    // console.log('updated:', this.state.addvisible);
                                })}
                                name={this.state.curname}
                            />}
                    </div>
                    <Header className="site-layout-background" style={{ padding: 0 }}>
                        <Avatar size={40} src={this.state.myavatar} />
                        <Dropdown overlay={this.menu}>
                            <Button style={{ marginLeft: '20px' }}>{this.state.curname}</Button>
                        </Dropdown>
                    </Header>
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                        }}
                    >
                        <Row>
                            <Col span={6}>
                                <div className="chat-box">
                                    {/* 渲染聊天列表 */}
                                    {this.state.showchatlist && <ChatList chatList={this.chatList} />}
                                    {this.state.showalllist && <><Button onClick={this.handleTag}>标签化</Button><Showfriendlist pushChat={this.pushChat}
                                        del={this.deleteFriend} friendlist={this.state.friendlist} len={this.state.friendlist.length}
                                        tagAdd={this.friendGroup} tagDel={this.friendGroupDel}
                                    /></>}
                                </div>
                            </Col>
                            <Col span={18}>
                                <div className="chat-box">
                                    {/* 渲染聊天框 */}
                                    {this.state.veri_visible ?
                                        <ChatVerification name={this.state.talkingobject} set={() => this.setState({ veri_visible: false })} id={this.state.currentchatid}
                                            visible={this.state.veri_visible} permit={this.permit} curname={this.state.curname} /> : <></>}
                                    {this.state.chat_visible ?
                                        <div>
                                            <Button onClick={this.handleSearchHistory} style={{
                                                position:
                                                    "relative", top: "-35px",
                                            }}>筛选记录</Button>
                                            {this.state.ifgroup && <Button onClick={this.handleGroupProps} style={{
                                                position:
                                                    "relative", top: "-35px",
                                            }}>群聊功能</Button>}
                                            <div>
                                                <Modal
                                                    title="筛选聊天记录"
                                                    open={searhisvisible}
                                                    onOk={this.handlechOk}
                                                    onCancel={this.handlechCancel}
                                                >
                                                    <Radio.Group onChange={this.handlechChange} value={selectedoption}>
                                                        <Radio value={"time"}>时间</Radio>
                                                        <Radio value={"sender_name"}>发送者</Radio>
                                                        <Radio value={"message_type"}>消息类型</Radio>
                                                    </Radio.Group>
                                                    <Input
                                                        value={this.state.searchbody}
                                                        onChange={this.handlechinputChange}
                                                    />
                                                    <p>
                                                        请在选择搜索类型之后按照规定的格式搜索<br />
                                                        按时间搜索接受这四种格式：xxxx.xx.xx、xxxx/xx/xx、xxxx_xx_xx和xxxx-xx-xx<br />
                                                        按信息类型搜索接受这些内容：text、image、wav、mp4、pdf<br />
                                                        按发送人搜索请输入用户名：
                                                    </p>

                                                    <Button onClick={() => {
                                                        this.searchChatHistory(this.state.selectedoption,
                                                            this.state.searchbody)
                                                    }}>开始搜索</Button>
                                                    {selectedoption !== '' && this.state.searlist !== [] && (
                                                        <div>
                                                            <ul style={{ listStyle: "none", paddingLeft: 0 }}>
                                                                {this.state.searlist.map((item, index) => {
                                                                    return (
                                                                        <li key={item + index}>
                                                                            {this.tra(item)}
                                                                        </li>
                                                                    );
                                                                })}
                                                            </ul>
                                                        </div>
                                                    )}
                                                </Modal>
                                            </div>
                                            {this.state.ifgroup ? <Chatbox
                                                onDeleteClick={(msg) => this.deletemessage(msg)}
                                                onWithdrawClick={(msg) => this.withdrawGroupMessage(msg)}
                                                historymessage={this.state.historymessage}
                                                historymessageid={this.state.historymessageid}
                                                historymessagetype={this.state.historymessagetype}
                                                timelist={this.state.messagetimelist}
                                                avatarlist={this.state.messageavatarlist}
                                                markmessage={this.state.markmessagelist}
                                                visible={this.state.chat_visible}
                                                name={this.state.curname}
                                                talkingobject={this.state.talkingobject}
                                                mark={this.mark}
                                                forward={this.forward}
                                                mentionUserInfo={this.mentionUserInfo}
                                                tijilist={this.state.curgrouplist}
                                                readlist={this.state.readlist}
                                            /> :
                                                <Chatbox
                                                    onDeleteClick={(msg) => this.deletemessage(msg)}
                                                    onWithdrawClick={(msg) => this.withdrawmessage(msg)}
                                                    historymessage={this.state.historymessage}
                                                    historymessageid={this.state.historymessageid}
                                                    historymessagetype={this.state.historymessagetype}
                                                    markmessage={this.state.markmessagelist}
                                                    timelist={this.state.messagetimelist}
                                                    avatarlist={this.state.messageavatarlist}
                                                    visible={this.state.chat_visible}
                                                    name={this.state.curname}
                                                    talkingobject={this.state.talkingobject}
                                                    mark={this.mark}
                                                    forward={this.forward}
                                                    tijilist={this.state.curgrouplist}
                                                    mentionUserInfo={this.mentionUserInfo}
                                                    readlist={this.state.readlist}
                                                />}

                                            <div style={{ width: '500px' }}>
                                                <Mentions ref={this.mymsg}
                                                    style={{ width: '100%', position: "absolute", top: "575px", left: "-35px", height: "50px" }}
                                                    defaultValue={''}
                                                    prefix={['@']}

                                                    onBlur={this.messageChange} // 添加 onBlur 事件
                                                >
                                                    {this.state.curgrouplist.map((member, index) => {
                                                        return (
                                                            <Option key={index} value={member}>
                                                                {member}
                                                            </Option>
                                                        );
                                                    })}
                                                    {this.state.ifgroup ? <Option key="all" value="所有人">
                                                        所有人
                                                    </Option> : <></>}
                                                </Mentions>
                                            </div>
                                            {/*  */}
                                            <Upload
                                                accept=".jpg,.wav,.mp4,.pdf" beforeUpload={this.handleUpload} showUploadList={false}>
                                                <Button style={{ position: "relative", top: "550px", left: "-170px", }} icon={<UploadOutlined />}>Upload</Button>
                                            </Upload>
                                            {/*  */}
                                            {this.state.ifforward ? <Button style={{ backgroundColor: "green", position: "absolute", top: "575px", left: "838px", height: "50px", width: "60px" }}
                                                onClick={() => this.handleForward(this.state.forwardidlist)}>{"转发"}</Button>
                                                : <Button style={{ backgroundColor: "green", position: "absolute", top: "575px", left: "838px", height: "50px", width: "60px" }}
                                                    onClick={() => this.sendMessage(this.state.message)}>{"发送"}</Button>}

                                        </div>
                                        : <></>}
                                </div>
                            </Col>
                        </Row>
                    </Content>
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                        }}
                    >
                    </Content>
                </Layout>
            </Layout>
        );
    };
}
reportWebVitals();
export default withRouter(PersonalPage)
