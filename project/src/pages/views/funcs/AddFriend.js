import React, { useState, useEffect } from 'react'
import { Menu, Dropdown, Button, Modal, Input } from 'antd';
export const Addfriend = (props) => {
  const [name, setName] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  function nameChange(event) {
    setName(event.target.value);
  }
  function viewFriend() {
      props.clickView(name)
  }
  useEffect(() => {
    setIsMounted(true)
  }, [])
  if (isMounted) {
    const node = document.createElement('div');
    document.body.appendChild(node);
    return (<>
      <Modal
        open={props.visible}
        onCancel={props.onCancel}
        title="搜索新朋友"
        footer={[
          <Button key="close" onClick={() => props.onCancel()}>
            关闭
          </Button>
        ]}>
        <div className='container'>
          <p >用户名</p>
          <input type="text" name="text" onChange={nameChange} /><br />
          <br></br>
          <Button type="primary" onClick={() => viewFriend()}>点击查看</Button>
          <Button type="primary" onClick={() => props.addFriend(name)}>请求添加</Button>
        </div>
      </Modal>
      <Button onClick={props.onClick}>{"添加好友"}</Button></>
    )
  }
}

class Friend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.item,
      visible: false,
      inputValue: '',
    }
  }
  handletagAdd=(name)=>{
    Modal.confirm({
      title: '新增标签',
      content: (
        <Input
          placeholder="输入标签名称"
          onChange={(e) => this.setState({ inputValue: e.target.value })}
        />
      ),
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        // 输入框内容获取成功后，可以对其进行进一步操作
        const { inputValue } = this.state;
        this.props.tagAdd(name,inputValue);
      },
      onCancel: () => {
        // console.log('取消新增标签');
        this.setState({ inputValue: "" })
      },
    });
  }
  handletagDel=(name)=>{
    Modal.confirm({
      title: '去除标签',
      content: (
        <Input
          placeholder="输入标签名称"
          onChange={(e) => this.setState({ inputValue: e.target.value })}
        />
      ),
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        // 输入框内容获取成功后，可以对其进行进一步操作
        const { inputValue } = this.state;
        this.props.tagDel(name,inputValue);
      },
      onCancel: () => {
        // console.log('取消去除标签');
        this.setState({ inputValue: "" })
      },
    });
  }
  friendmenu = (
    <Menu>
      <Menu.Item key="1" onClick={() => { this.props.del(this.props.item) }}>删除好友</Menu.Item>
      <Menu.Item key="2" onClick={() => { this.props.pushChat(this.props.item) }}>添加聊天</Menu.Item>
      <Menu.Item key="3" onClick={() => { this.handletagAdd(this.props.item) }}>添加标签</Menu.Item>
      <Menu.Item key="4" onClick={() => { this.handletagDel(this.props.item) }}>删除标签</Menu.Item>
    </Menu>
  );

  render() {
    return (
      <>
        <Dropdown overlay={this.friendmenu} trigger={['contextMenu']} onOpenChange={(visible) => console.log(visible)}>
          <Button type="primary" style={{ color: "green", width: "150px", backgroundColor: "rgb(200,100,300)", }}>{this.state.name}</Button>
        </Dropdown>
        <br /><br />
      </>
    )
  }
}
class Friendlist extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    scrollTop: 0,
    list: this.props.friendlist,
    displayedItems: [],
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.scrollTop !== this.state.scrollTop) {
      this.updateDisplayedItems();
    }
  }

  updateDisplayedItems = () => {
    const { list, scrollTop } = this.state;
    const listLength = list.length * 30;
    const scrollPos = Math.max(0, Math.min(scrollTop, listLength - 380));
    const newDisplayedItems = list.slice(Math.floor(scrollPos / 30), Math.floor(scrollPos / 30) + this.props.friendlist.length);
    if (this.state.displayedItems !== newDisplayedItems || this.state.scrollTop !== scrollPos) {
      this.setState({ displayedItems: newDisplayedItems });
    }
  };
  componentDidMount() {

    this.updateDisplayedItems();
  }
  handleScroll = (event) => {
    const container = event.target;
    const { scrollTop, scrollHeight, clientHeight } = container;
    // 如果距离底部小于 2px，直接滚动到底部
    if (scrollHeight - scrollTop - clientHeight < 2) {
      container.scrollTop = scrollHeight;
    } else {
      // 否则先更新滚动位置和消息列表，再进行滚动
      this.setState({ scrollTop }, () => {
        this.updateDisplayedItems();
      });
    }
  };

  render() {
    const { scrollTop, displayedItems } = this.state;
    return (
      (
        <div style={{ width: "230px", height: "120px", backgroundColor: "white", }}>
          <div className="scroll-container" onScroll={this.handleScroll} style={{ height: "600px", overflow: "auto" }}>
            <ul id="scroll-content" className="scroll-content" style={{ listStyle: "none", paddingLeft: 0 }}>
              {displayedItems.map((item, index) => {
                return (
                  <li key={item + index}>
                    <Friend item={item} del={this.props.del} pushChat={this.props.pushChat} tagAdd={this.props.tagAdd} tagDel={this.props.tagDel}/>
                  </li>
                );
              })}
            </ul>
            <div className="scroll-indicator" style={{ height: `${scrollTop / 10}%`, display: 'none' }} />
          </div>
        </div>
      )
    )
  }
}
export const Showfriendlist = (props) => {
 
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true)
  }, [props.len]);
  if (isMounted) {
    return (
      <div>
        <Friendlist friendlist={props.friendlist} pushChat={props.pushChat} del={props.del} tagAdd={props.tagAdd} tagDel={props.tagDel}/>
      </div>
    )
  }
}

export default Addfriend;
