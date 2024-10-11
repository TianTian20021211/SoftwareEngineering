import React, { useState, useEffect } from 'react'
import { Avatar, Typography } from 'antd';

const { Title, Text } = Typography;
export const Showrequestlist = (props) => {
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])
  if (isMounted) {
    const node = document.createElement('div');
    document.body.appendChild(node);
    return (
      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        {
          props.requestlist.map((item, index) => {
            return (
              <div className="friend-info" key={item + index}>
                <li key={item + index}>
                  <div className="friend-info">
                    <Avatar src="..." />
                    <Title level={5}>{item}</Title>
                    <Text type="secondary">{item}请求成为您的好友</Text>
                  </div>

                  <button style={{ backgroundColor: "green", }} onClick={() => { props.AcceptFriendRequest(item) }}>接受</button>
                  <button style={{ backgroundColor: "green", }} onClick={() => { props.RefuseFriendRequest(item) }}>拒绝</button>
                  <br></br>
                </li>
              </div>
            )
          })
        }
      </ul>
    )
  }
}
export default Showrequestlist
