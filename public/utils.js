// 注册和登录部分的报错信息
export function WhyErrorInUserInfo(code, info) {
    // 用户名格式不符合要求
    if (code === -2 && info === "Missing or error type of [name]") {
        return "用户名为空或者不是字符串类型。";
    }
    else if (code === -2 && info === "Invalid char in [name]") {
        return "用户名不是只由大小写字母、数字和下划线构成。";
    }
    else if (code === -2 && info === "Bad length of [name]") {
        return "用户名长度多于20或者为空";
    }

    // 内容不符合要求
    else if (code === -2 && info === "[name] has been registered") {
        return "这个用户名之前被注册过了。";
    }
    else if (code === 1 && info === "User not found") {
        return "您输入的用户名密码无对应用户。";
    }

    // 密码格式不符合要求
    else if (code === -2 && info === "Missing or error type of [password]") {
        return "密码是空的或者不是字符串类型。";
    }
    else if (code === -2 && info === "Invalid char in [password]") {
        return "密码不是只由大小写字母、数字和下划线构成。";
    }
    else if (code === -2 && info === "Bad length of [password]") {
        return "密码的长度不符合要求。";
    }

    // 用户名密码不匹配
    else if (code === 1 && info === "Wrong password") {
        return "用户名密码不匹配";
    }

    // 请求体格式不符合要求
    else if (code === -2 && info === "Invalid request [type]") {
        return "请求体的type字段不是规定好的值，请联系开发团队处理这一问题。";
    }

    // 邮箱相关的问题
    else if (code === -2 && info === "Missing or error type of [email]") {
        return "您没有输入邮箱或邮箱不是字符串类型";
    }
    else if (code === -2 && info === "[email] has been registered") {
        return "这个邮箱已被别的用户注册过";
    }
    else if (code === -2 && info === "Incorrect verification code") {
        return "您输入的验证码和我们最后一次发送的验证码不一致";
    }
    else if (code === 1 && info === "[email] is not a valid email address"){
        return "您输入的邮箱并不存在，无法发送验证码";
    }
    
    else if (code === -2 && info === "User is online now"){
        return "这个账号已经被登录，目前是在线状态，您不可以登录";
    }
    else if (code === 1 && info === "you haven't asked for verification code"){
        return "您还没有请求验证码就要求注册";
    }

    // 其他问题
    else if (code === -4 && info === "An error occured when accessing data") {
        return "读写数据中途抛出错误，请刷新页面后重新尝试。如果依然报错，请联系开发团队处理这一问题。";
    }

    else {
        return info;
    }
};


export function WhyCantEmail(code, info) {
    if (code === -2 && info === "Missing or error type of [email]") {
        return "请求体中邮箱字段缺失或非字符串类型";
    }

    else if (code === -2 && info === "Missing or error type of [verification]") {
        return "请求体中验证码字段缺失或非字符串类型";
    }

    else if (code === -2 && info === "Invalid char in [verification]") {
        return "您输入的验证码不是只含有数字";
    }

    else if (code === -2 && info === "Incorrect verification code") {
        return "您输入的验证码和我们最后一次发送的验证码不一致";
    }

    else if (code === -2 && info === "Bad length of [verification]") {
        return "您输入的验证码长度不是六位";
    }

    else if (code === 1 && info === "User not found") {
        return "找不到邮箱对应的用户";
    }

    else if (code === -4 && info === "An error occured when accessing data") {
        return "读写数据中途抛出错误";
    }

    else if (code === -2 && info === "User is online now"){
        return "这个账号已经被登录，目前是在线状态，您不可以登录";
    }

    else {
        return info;
    }
};

// 聊天相关的ws所有报错
export function ChatWrongResponse(code, info) {
    // 搜索部分的错误
    if (code === -2 && info === "Missing or error type of [key_word]") {
        return "没有输入搜索的关键词";
    }
    else if (code === 1 && info === "Can't find relative user") {
        return "无法搜索到对应的用户";
    }

    // 免打扰
    else if (code === 1 && info === "Missing or error type of [silent_list]"){
        return "silent_list字段缺失或不是list";
    }

    // 撤回信息部分的错误
    else if (code === -2 && info === "Missing or error type of [msg_body]") {
        return "msg_body字段字段缺失或非字符串类型";
    }
    else if (code === -2 && info === "Missing or error type of [message_id]") {
        return "message_id字段字段缺失或非整数类型";
    }
    else if (code === 1 && info === "Message not found") {
        return "根据message_id和 msg_body查找的信息不存在";
    }
    else if (code === 2 && info === "fail to withdraw message due to time limit") {
        return "该消息已经超过了三分钟的期限，无法撤回";
    }
    else if (code === 2 && info === "fail to withdraw message due to limits of authority"){
        return "该消息不是本人发的，无法撤回";
    }

    // 发送申请部分的错误
    else if (code === -2 && info === "Missing or error type of [sender_name]") {
        return "sender_name字段字段缺失或非字符串类型";
    }
    else if (code === -2 && info === "Invalid char in [sender_name]") {
        return "sender_name字段不符合“只含有大小写字母、数字、下划线”的要求";
    }
    else if (code === -2 && info === "Bad length of [sender_name]") {
        return "sender_name字段长度不合要求";
    }
    else if (code === -2 && info === "Missing or error type of [receiver_name]") {
        return "receiver_name字段字段缺失或非字符串类型";
    }
    else if (code === -2 && info === "Invalid char in [receiver_name]") {
        return "receiver_name字段不符合“只含有大小写字母、数字、下划线”的要求";
    }
    else if (code === -2 && info === "Bad length of [receiver_name]") {
        return "receiver_name字段长度不合要求";
    }
    else if (code === -2 && info === "Application has existed") {
        return "已经存在name对应的用户和 receiver_name对应的用户之间的好友申请";
    }
    else if (code === 1 && info === "Sender not found") {
        return "根据sender_name查找的用户不存在";
    }
    else if (code === 1 && info === "Receiver not found") {
        return "根据receiver_name查找的用户不存在";
    }
    else if (code === 1 && info === "Request not found") {
        return "sender和reciever代表的用户之间没有好友请求";
    }
    else if (code === -2 && info === "Can't send friend request to a friend"){
        return "您已经和对方是好友关系";
    }

    // 登出部分的错误
    else if (code === -4 && info === "An error occured when accessing data") {
        return "读写数据过程抛出错误";
    }
    else if (code === -2 && info === "Missing or error type of [view_order]") {
        return "view_order字段缺失或者不是list";
    }
    else if (code === -2 && info === "Missing or error type of [view_id_order]") {
        return "view_id_order字段缺失或者不是list";
    }
    else if (code === -2 && info === "Missing or error type of [user_name]") {
        return "user_name字段字段缺失或非字符串类型";
    }
    else if (code === -2 && info === "Invalid char in [user_name]") {
        return "user_name字段不符合“只含有大小写字母、数字、下划线”的要求";
    }
    else if (code === -2 && info === "Bad length of [user_name]") {
        return "user_name字段长度不合要求";
    }

    // 回复信息部分的错误
    else if (code === -2 && info === "Missing or error type of [current_user_name]") {
        return "current_user_name字段字段缺失或非字符串类型";
    }
    else if (code === -2 && info === "Invalid char in [current_user_name]") {
        return "current_user_name字段不符合“只含有大小写字母、数字、下划线”的要求";
    }
    else if (code === -2 && info === "Bad length of [current_user_name]") {
        return "current_user_name字段长度不合要求";
    }
    else if (code === -2 && info === "Missing or error type of [message_sender]") {
        return "message_sender字段字段缺失或非字符串类型";
    }
    else if (code === -2 && info === "Invalid char in [message_sender]") {
        return "message_sender字段不符合“只含有大小写字母、数字、下划线”的要求";
    }
    else if (code === -2 && info === "Bad length of [message_sender]") {
        return "message_sender字段长度不合要求";
    }
    else if (code === -2 && info === "Missing or error type of [msg_body]") {
        return "msg_body字段字段缺失或非字符串类型";
    }
    else if (code === -2 && info === "Missing or error type of [reply_msg_body]") {
        return "reply_msg_body字段字段缺失或非字符串类型";
    }
    else if (code === 1 && info === "User not found") {
        return "查找的用户不存在";
    }
    else if (code === 1 && info === "message not found") {
        return "message_id对应的那条信息不存在于数据库中";
    }

    // 转发信息部分的错误
    else if (code === -2 && info === "Missing or error type of [sender_name]") {
        return "sender_name字段字段缺失或非字符串类型";
    }
    else if (code === -2 && info === "Invalid char in [sender_name]") {
        return "sender_name字段不符合“只含有大小写字母、数字、下划线”的要求";
    }
    else if (code === -2 && info === "Bad length of [sender_name]") {
        return "sender_name字段长度不合要求";
    }
    else if (code === -2 && info === "Missing or error type of [current_conversation_id]") {
        return "current_conversation_id字段字段缺失或非整数类型";
    }
    else if (code === -2 && info === "Missing or error type of [target_conversation_id]") {
        return "target_conversation_id字段字段缺失或非整数类型";
    }
    else if (code === 1 && info === "current_conversation not found") {
        return "根据 current_conversation_id找不到对应的聊天对象";
    }
    else if (code === 1 && info === "target_conversation not found") {
        return "根据 target_conversation_id找不到对应的聊天对象";
    }

    // 删除信息部分的错误
    else if (code === -2 && info === "Missing or error type of [conversation_type]") {
        return "conversation_type字段字段缺失或非字符串类型";
    }
    else if (code === -2 && info === "Missing or error type of [current_user_name]") {
        return "current_user_name字段字段缺失或非字符串类型";
    }
    else if (code === -2 && info === "Missing or error type of [message_id]") {
        return "message_id字段字段缺失或非字符串类型";
    }
    else if (code === 1 && info === "User not found") {
        return "查找的用户不存在";
    }
    else if (code === 1 && info === "message not found") {
        return "message_id对应的那条信息不存在于数据库中";
    }

    // 创建群聊部分的错误响应
    else if (code === 1 && info === "User not found") {
        return "查找的用户不存在";
    }
    else if (code === -2 && info === "You should invite more than 2 people excluding you to create a group.") {
        return "创建群聊的时候只邀请了1个人或没邀请人";
    }
    else if (code === -2 && info === "Missing or error type of [name]") {
        return "name字段字段缺失或非字符串类型";
    }
    else if (code === -2 && info === "Invalid char in [name]") {
        return "name字段不符合“只含有大小写字母、数字、下划线”的要求";
    }
    else if (code === -2 && info === "Bad length of [name]") {
        return "name字段长度不合要求";
    }
    else if (code === -2 && info === "Missing or error type of [group_member]") {
        return "group_member字段内容确实或非list类型";
    }
    else if (code === -2 && info === "Maybe users invited all can't join in the group.") {
        return "前端发来group_member有不少于2个人，但是所有被邀请者都没能进群";
    }

    // 请求群聊的初始渲染部分的错误响应
    else if (code === -2 && info === "Missing or error type of [name]") {
        return "name字段缺失或非字符串类型";
    }
    else if (code === -2 && info === "Invalid char in [name]") {
        return "name字段不符合“只含有大小写字母、数字、下划线”的要求";
    }
    else if (code === -2 && info === "Bad length of [name]") {
        return "name字段长度不合要求";
    }
    else if (code === -2 && info === "Missing or error type of [msg_list]") {
        return "msg_list字段内容缺失或非list类型";
    }
    else if (code === 1 && info === "User not found") {
        return "查找的用户不存在";
    }
    else if (code === 1 && info === "Friend to delete not found") {
        return "根据 conversation_id对应的群聊不存在";
    }
    else if (code === 1 && info === "Receiver is not your friend") {
        return "name对应的用户和receiver_name对应的用户之间没有好友关系";
    }

    // 获取聊天排序时的错误
    else if (code === -2 && info === "Missing or error type of [conversation_type]") {
        return "conversation_type字段字段缺失或非字符串类型";
    }
    else if (code === -2 && info === "Missing or error type of [name]") {
        return "name字段字段缺失或非字符串类型";
    }
    else if (code === -2 && info === "Missing or error type of [view_order]") {
        return "view_order字段字段缺失或非字符串类型";
    }
    else if (code === -2 && info === "Missing or error type of [view_id_order]") {
        return "view_id_order字段字段缺失或非字符串类型";
    }

    // 设定群管理员部分的错误
    else if (code === 1 && info === "group chat not found") {
        return "根据conversation_id查找的群聊不存在";
    }
    else if (code === 1 && info === "User not found") {
        return "查找的用户不存在";
    }
    else if (code === 1 && info === "User corresponding to manager_name not found") {
        return "根据`manager_name_list`查找的某个用户不存在";
    }
    else if (code === 1 && info === "User corresponding to manager_name not in the group") {
        return "根据`manager_name_list`查找的某个用户不在当前群里";
    }
    else if (code === 1 && info === "User selected is already a manager"){
        return "根据manager_name_list查找的某个用户已经是管理员";
    }
    else if (code === 1 && info === "User selected is owner, thus can't be a manager"){
        return "对方已经是群主，不能成为管理员";
    }
    else if (code === -2 && info === "Invalid char in [name]") {
        return "name字段不符合“只含有大小写字母、数字、下划线”的要求";
    }
    else if (code === -2 && info === "Bad length of [name]") {
        return "name字段长度不合要求";
    }
    else if (code === -2 && info === "Missing or error type of [name]") {
        return "name字段缺失或非字符串类型";
    }
    else if (code === -2 && info === "User is not owner") {
        return "您不是群主";
    }
    else if (code === -2 && info === "Missing or error type of [conversation_id]") {
        return "conversation_id字段缺失或非数字类型";
    }

    // 发送信息
    else if (code === 1 && info === "you have been removed from the group chat"){
        return "您已经被从群聊中移除";
    }

    // 转让群主部分的报错
    else if (code === 1 && info === "group chat not found") {
        return "根据conversation_id查找的群聊不存在";
    }
    else if (code === 1 && info === "User not found") {
        return "用户不存在";
    }
    else if (code === 1 && info === "new owner not found") {
        return "根据new_owner_name查找的用户不存在";
    }
    else if (code === 1 && info === "new owner not in the group") {
        return "根据new_owner_name查找的用户不在当前群里";
    }
    else if (code === 1 && info === "you can't transfer ownership to yourself"){
        return "你不能把群主转让给你自己";
    }
    else if (code === -2 && info === "Missing or error type of [name]") {
        return "name字段缺失或非字符串类型";
    }
    else if (code === -2 && info === "Invalid char in [name]") {
        return "name字段不符合“只含有大小写字母、数字、下划线”的要求";
    }
    else if (code === -2 && info === "Bad length of [name]") {
        return "name字段长度不合要求";
    }
    else if (code === -2 && info === "Missing or error type of [conversation_id]") {
        return "conversation_id字段缺失或非数字类型";
    }
    else if (code === -2 && info === "Missing or error type of [new_owner_name]") {
        return "new_owner_name字段缺失或非字符串类型";
    }
    else if (code === -2 && info === "Invalid char in [new_owner_name]") {
        return "new_owner_name字段不符合“只含有大小写字母、数字、下划线”的要求";
    }
    else if (code === -2 && info === "Bad length of [new_owner_name]") {
        return "new_owner_name字段长度不合要求";
    }
    else if (code === -1 && info === "you don't have the access to transfer ownership since you are not the owner") {
        return "您不是群主，不能转让群主";
    }

    // 发布群公告相关的报错
    else if (code === 1 && info === "group chat not found") {
        return "根据conversation_id查找的群聊不存在";
    }
    else if (code === 1 && info === "User not found") {
        return "用户不存在";
    }
    else if (code === -2 && info === "Missing or error type of [name]") {
        return "name字段缺失或非字符串类型";
    }
    else if (code === -2 && info === "Invalid char in [name]") {
        return "name字段不符合“只含有大小写字母、数字、下划线”的要求";
    }
    else if (code === -2 && info === "Bad length of [name]") {
        return "name字段长度不合要求";
    }
    else if (code === -2 && info === "Missing or error type of [conversation_id]") {
        return "conversation_id字段缺失或非数字类型";
    }
    else if (code === -1 && info === "you don't have the access to post announcement") {
        return "name对应的用户既不是群主又不是管理员，不能发表公告";
    }

    // 获取群的信息的报错
    else if (code === -2 && info === "Missing or error type of [conversation_id]") {
        return "conversation_id字段缺失或非数字类型";
    }
    else if (code === 1 && info === "group chat not found") {
        return "根据conversation_id查找的群聊不存在";
    }

    // 邀请别人入群的错误响应
    else if (code === 1 && info === "group chat not found") {
        return "根据conversation_id查找的群聊不存在";
    }
    else if (code === 1 && info === "User not found") {
        return "根据 invitor_name或invited_name查找的用户不存在";
    }
    else if (code === 1 && info === "Invited user is not your friend") {
        return "邀请方和被邀请方之间没有好友关系";
    }
    else if (code === -2 && info === "Missing or error type of [invitor_name]") {
        return "invitor_name字段缺失或非字符串类型";
    }
    else if (code === -2 && info === "Invalid char in [invitor_name]") {
        return "invitor_name字段不符合“只含有大小写字母、数字、下划线”的要求";
    }
    else if (code === -2 && info === "Bad length of [invitor_name]") {
        return "invitor_name字段长度不合要求";
    }
    else if (code === -2 && info === "Missing or error type of [invited_name]") {
        return "invited_name字段缺失或非字符串类型";
    }
    else if (code === -2 && info === "Invalid char in [invited_name]") {
        return "invited_name字段不符合“只含有大小写字母、数字、下划线”的要求";
    }
    else if (code === -2 && info === "Bad length of [invited_name]") {
        return "invited_name字段长度不合要求";
    }
    else if (code === -2 && info === "Missing or error type of [conversation_id]") {
        return "conversation_id字段缺失或非数字类型";
    }
    else if (code === -2 && info === "Missing or error type of [conversation_type]") {
        return "请求体中conversation_type字段缺失或非字符串类型";
    }
    else if (code === -2 && info === "Invitation exists") {
        return "已经向对方发送了入群邀请";
    }
    else if (code === -2 && info === "Invited user has been in the group") {
        return "被邀请者已经在该群聊里了";
    }

    // 查看审批入群申请部分的报错 
    else if (code === 1 && info === "group chat not found") {
        return "根据请求体中conversation_id查找的群聊不存在";
    }
    else if (code === 1 && info === "User not found") {
        return "根据用户名查找的用户不存在";
    }
    else if (code === 1 && info === "Application not found") {
        return "不存在由invitor_name对应用户向invited_name对应用户发送的入群邀请";
    }
    else if (code === 1 && info === "You are not owner or manager"){
        return "您没有操作权限";
    }
    else if (code === -2 && info === "Missing or error type of [invitor_name") {
        return "invitor_name字段缺失或非字符串类型";
    }
    else if (code === -2 && info === "Invalid char in [invitor_name]") {
        return "invitor_name字段不符合“只含有大小写字母、数字、下划线”的要求";
    }
    else if (code === -2 && info === "Bad length of [invitor_name]") {
        return "invitor_name字段长度不合要求";
    }
    else if (code === -2 && info === "Missing or error type of [invited_name]") {
        return "invited_name字段缺失或非字符串类型";
    }
    else if (code === -2 && info === "Invalid char in [invited_name]") {
        return "invited_name字段不符合“只含有大小写字母、数字、下划线”的要求";
    }
    else if (code === -2 && info === "Bad length of [invited_name]") {
        return "invited_name字段长度不合要求";
    }
    else if (code === -2 && info === "Missing or error type of [conversation_id]") {
        return "conversation_id字段缺失或非数字类型";
    }
    else if (code === -2 && info === "Missing or error type of [conversation_type]") {
        return "conversation_type字段缺失或非字符串类型";
    }

    // 退群的错误响应
    else if (code === 1 && info === "group chat not found") {
        return "根据conversation_id查找的群聊不存在";
    }
    else if (code === 1 && info === "User not found") {
        return "根据 name查找的用户不存在";
    }
    else if (code === 1 && info === "Not in the group") {
        return "name对应的用户不在conversation_id对应的群聊中";
    }
    else if (code === -2 && info === "Missing or error type of [name]") {
        return "name字段缺失或非字符串类型";
    }
    else if (code === -2 && info === "Invalid char in [name]") {
        return "name字段不符合“只含有大小写字母、数字、下划线”的要求";
    }
    else if (code === -2 && info === "Bad length of [name]") {
        return "name字段长度不合要求";
    }
    else if (code === -2 && info === "Missing or error type of [conversation_id]") {
        return "conversation_id字段缺失或非数字类型";
    }
    else if (code === -2 && info === "Missing or error type of [conversation_type]") {
        return "conversation_type字段缺失或非字符串类型";
    }

    // 在群里撤回消息部分的报错
    else if (code === 1 && info === "group chat not found") {
        return "根据conversation_id查找的群聊不存在";
    }
    else if (code === 1 && info === "User not found") {
        return "数据库中没有对应的用户";
    }
    else if (code === 1 && info === "message not found") {
        return "无法根据message_id找到对应消息";
    }
    else if (code === -2 && info === "Missing or error type of [name]") {
        return "name字段缺失或非字符串类型";
    }
    else if (code === -2 && info === "Invalid char in [name]") {
        return "name字段不符合“只含有大小写字母、数字、下划线”的要求";
    }
    else if (code === -2 && info === "Bad length of [name]") {
        return "name字段长度不合要求";
    }
    else if (code === -2 && info === "Missing or error type of [conversation_id]") {
        return "conversation_id字段缺失或非数字类型";
    }
    else if (code === -2 && info === "Missing or error type of [message_id]") {
        return "message_id字段缺失或非数字类型";
    }
    else if (code === -1 && info === "fail to withdraw message due to time limit") {
        return "您既不是群主又不是管理员，不能撤回自己在3分钟之前发的消息";
    }
    else if (code === -1 && info === "fail to withdraw message due to your identity as normal member") {
        return "您既不是群主又不是管理员，不能撤回其他人发的消息";
    }
    else if (code === -1 && info === "fail to withdraw message due to your identity as manager") {
        return "您是管理员，但不是群主，不可以撤回群主或者管理员发的消息";
    }

    // 发送多媒体信息部分的报错
    else if (code === -2 && info === "Missing or error type of [multimedia_info]") {
        return "multimedia_info字段字段缺失或非字符串类型";
    }
    else if (code === -2 && info === "Missing or error type of [multimedia_type]") {
        return "multimedia_type字段字段缺失或非字符串类型";
    }
    else if (code === -2 && info === "Missing or error type of [sender_name]") {
        return "sender_name字段字段缺失或非字符串类型";
    }
    else if (code === -2 && info === "Invalid char in [sender_name]") {
        return "sender_name字段不符合“只含有大小写字母、数字、下划线”的要求";
    }
    else if (code === -2 && info === "Bad length of [sender_name]") {
        return "sender_name字段长度不合要求";
    }
    else if (code === -2 && info === "Missing or error type of [conversation_id]") {
        return "conversation_id字段字段缺失或非整数类型";
    }
    else if (code === 1 && info === "conversation not found") {
        return "根据conversation_id找不到对应的聊天对象";
    }
    else if (code === 1 && info === "user not found") {
        return "根据sender_name找不到对应的用户";
    }

    // 请求群聊列表部分的报错
    else if (code === -2 && info === "Missing or error type of [conversation_id]"){
        return "conversation_id字段字段缺失或非整数类型";
    }
    else if (code === 1 && info === "conversation not found"){
        return "根据conversation_id不能找到对应的聊天";
    }
    else if (code === -2 && info === "Missing or error type of [selected_user_name]"){
        return "selected_user_name字段字段缺失或非字符串类型";
    }
    else if (code === -2 && info === "Invalid char in [selected_user_name]"){
        return "selected_user_name字段不符合“只含有大小写字母、数字、下划线”的要求";
    }
    else if (code === -2 && info === "Bad length of [selected_user_name]"){
        return "selected_user_name字段长度不合要求";
    }
    else if (code === 1 && info === "User not found"){
        return "根据selected_user_name不能找到对应的用户";
    }

    // // 请求提及的人的个人信息部分的错误响应
    // else if (code === -2 && info === "Missing or error type of [selected_user_name]"){
    //     return "selected_user_name字段字段缺失或非字符串类型";
    // }
    // else if (code === -2 && info === "Invalid char in [selected_user_name]"){
    //     return "selected_user_name字段不符合“只含有大小写字母、数字、下划线”的要求";
    // }
    // else if (code === -2 && info === "Bad length of [selected_user_name]"){
    //     return "selected_user_name字段长度不合要求";
    // }
    // else if (code === 1 && info === "User not found"){
    //     return "根据selected_user_name不能找到对应的用户";
    // }
    
    // 提及部分的错误响应
    else if (code === -2 && info === "Missing or error type of [selected_user_name_list]"){
        return "selected_user_name_list字段缺失或非字符串类型";
    }
    else if (code === -2 && info === "Missing or error type of [select_user_name]"){
        return "select_user_name字段字段缺失或非字符串类型";
    }
    else if (code === -2 && info === "Invalid char in [select_user_name]"){
        return "select_user_name字段不符合“只含有大小写字母、数字、下划线”的要求";
    }
    else if (code === -2 && info === "Bad length of [select_user_name]"){
        return "select_user_name字段长度不合要求";
    }
    else if (code === -2 && info === "Missing or error type of [covnersation_id]"){
        return "covnersation_id字段缺失或非整数类型";
    }
    else if (code === 1 && info === "User not found"){
        return "根据 selected_user_name_list或select_user_name不能找到对应的用户";
    }
    else if (code === 1 && info === "Conversation not found"){
        return "根据 conversation_id不能找到对应的聊天";
    }

    // 未读计数的部分
    else if (code === -2 && info === "Missing or error type of [user_name]"){
        return "user_name字段字段缺失或非字符串类型";
    }
    else if (code === -2 && info === "Invalid char in [user_name]"){
        return "user_name字段不符合“只含有大小写字母、数字、下划线”的要求";
    }
    else if (code === -2 && info === "Bad length of [user_name]"){
        return "user_name字段长度不合要求";
    }
    else if (code === -2 && info === "Missing or error type of [latest_message_id]"){
        return "latest_message_id字段字段缺失或非整数类型";
    }
    else if (code === -2 && info === "Missing or error type of [conversation_id]"){
        return "conversation_id字段字段缺失或非整数类型";
    }
    else if (code === 1 && info === "conversation not found"){
        return "根据 conversation_id找不到对应的聊天对象";
    }
    else if (code === 1 && info === "user not found"){
        return "根据 user_name找不到对应的用户";
    }
    else if (code === 1 && info === "message not found"){
        return "根据 message_id找不到对应的消息";
    }

    // 移除群成员的部分
    else if (code === 1 && info === "group chat not found"){
        return "根据conversation_id查找的群聊不存在";
    }
    else if (code === 1 && info === "User not found"){
        return "根据operator_name或remove_name查找的用户不存在";
    }
    else if (code === -2 && info === "Missing or error type of [operator_name]"){
        return "operator_name字段缺失或非字符串类型";
    }
    else if (code === -2 && info === "Invalid char in [operator_name]"){
        return "operator_name字段不符合“只含有大小写字母、数字、下划线”的要求";
    }
    else if (code === -2 && info === "Bad length of [operator_name]"){
        return "operator_name字段长度不合要求";
    }
    else if (code === -2 && info === "Missing or error type of [remove_name]"){
        return "remove_name字段缺失或非字符串类型";
    }
    else if (code === -2 && info === "Invalid char in [remove_name]"){
        return "remove_name字段不符合“只含有大小写字母、数字、下划线”的要求";
    }
    else if (code === -2 && info === "Bad length of [remove_name]"){
        return "remove_name字段长度不合要求";
    }
    else if (code === -2 && info === "Missing or error type of [conversation_id]"){
        return "conversation_id字段缺失或非数字类型";
    }
    else if (code === -2 && info === "Missing or error type of [conversation_type]"){
        return "conversation_type字段缺失或非字符串类型";
    }
    else if (code === -1 && info === "You may want to exit the group"){
        return "你不可以自己尝试移除自己";
    }
    else if (code === -1 && info === "You are not owner or manager"){
        return "您既不是群主又不是管理员，不可以移除别人";
    }
    else if (code === -1 && info === "Target is owner or manager"){
        return "您是管理员，但对方是群主或群管理员，无法将对方从群中移除";
    }

    else if (code === -2 && info === "Missing or error type of [num_of_top]"){
        return "num_of_top字段缺失或不是整数";
    }

    // 添加聊天部分
    else if (code === -2 && info === "Missing or error type of [conversation_type]"){
        return "conversation_type字段字段缺失或非字符串类型";
    }
    else if (code === -2 && info === "Missing or error type of [my_name]"){
        return "my_name字段字段缺失或非字符串类型";
    }
    else if (code === -2 && info === "Invalid char in [my_name]"){
        return "my_name字段不符合“只含有大小写字母、数字、下划线”的要求";
    }
    else if (code === -2 && info === "Bad length of [my_name]"){
        return "my_name字段长度不合要求";
    }
    else if (code === -2 && info === "Missing or error type of [friend_name]"){
        return "friend_name字段字段缺失或非字符串类型";
    }
    else if (code === -2 && info === "Invalid char in [friend_name]"){
        return "friend_name字段不符合“只含有大小写字母、数字、下划线”的要求";
    }
    else if (code === -2 && info === "Bad length of [friend_name]"){
        return "friend_name字段长度不合要求";
    }
    else if (code === 1 && info === "User not found"){
        return "根据 my_name查找的用户不存在";
    }
    else if (code === 1 && info === "User not found"){
        return "根据 friend_name查找的用户不存在";
    }
    else if (code === 1 && info === "Conversation not found"){
        return "根据两个name找不到对应的私聊";
    }

    // 请求好友列表和群聊成员列表
    else if (code === -2 && info === "Missing or error type of [conversation_id]"){
        return "conversation_id字段字段缺失或非整数类型";
    }
    else if (code === -2 && info === "Missing or error type of [name]"){
        return "name字段字段缺失或非字符串类型";
    }
    else if (code === -2 && info === "Invalid char in [name]"){
        return "name字段不符合“只含有大小写字母、数字、下划线”的要求";
    }
    else if (code === 1 && info === "User not found"){
        return "根据 name查找的用户不存在";
    }
    else if (code === 1 && info === "Conversation not found"){
        return "根据 conversation_id查找的群聊不存在";
    }

    // 其他情况
    else {
        return info;
    }
};


export function CheckFriendList(code, info) {
    // 请求体中name有问题
    if (code === -2 && info === "Missing or error type of [name]") {
        return "请求体中name字段缺失或非字符串类型。";
    }
    else if (code === -2 && info === "Invalid char in [name]") {
        return "请求体中name字段不符合“只含有大小写字母、数字、下划线”的要求";
    }
    else if (code === -2 && info === "Bad length of [name]") {
        return "请求体中name字段长度不符合要求";
    }


    // 搜索不到需要查找的用户
    else if (code === 1 && info === "User not found") {
        return "根据用户名查找的用户不存在";
    }
    else if (code === 1 && info === "No friend") {
        return "用户没有好友";
    }


    // 其他情况
    else {
        return info;
    }
};

export function SentAddFriendRequest(code, info) {
    // 请求体中name有问题
    if (code === -2 && info === "Missing or error type of [name]") {
        return "请求体中您的用户名字段缺失或非字符串类型。";
    }
    else if (code === -2 && info === "Invalid char in [name]") {
        return "请求体中您的用户名字段不符合“只含有大小写字母、数字、下划线”的要求";
    }
    else if (code === -2 && info === "Bad length of [name]") {
        return "请求体中您的用户名字段长度不符合要求";
    }

    // receiver_name的问题
    if (code === -2 && info === "Missing or error type of [receiver_name]") {
        return "请求体中接收好友申请的用户名字段缺失或非字符串类型。";
    }
    else if (code === -2 && info === "Invalid char in [receiver_name]") {
        return "请求体中接收好友申请的用户名字段不符合“只含有大小写字母、数字、下划线”的要求";
    }
    else if (code === -2 && info === "Bad length of [receiver_name]") {
        return "请求体中接收好友申请的用户名字段长度不符合要求";
    }

    else if (code === 1 && info === "Sender not found") {
        return "根据sender_name查找的用户不存在";
    }
    else if (code === 1 && info === "Receiver not found") {
        return "根据receiver_name查找的用户不存在";
    }
    else if (code === 1 && info === "Request not found") {
        return "sender和reciever代表的用户之间没有好友请求";
    }

    // 已经有好友申请了
    else if (code === -2 && info === "Application has existed") {
        return "您已经给对方发送了好友申请，或者对方已经给您发送了好友申请";
    }
    else if (code === -2 && info === "Can't send friend request to a friend"){
        return "您和对方已经是好友关系";
    }
    else if (code === -2 && info === "Can't send friend request to yourself"){
        return "不能给自己发送好友申请";
    }

    // 无法找到对应的用户
    else if (code === 1 && info === "User not found") {
        return "查找的用户不存在";
    }
    else if (code === 1 && info === "Receiver not found") {
        return "根据您输入的用户名无法找到对应用户";
    }

    // 发送人信息的问题
    if (code === -2 && info ==="Missing or error type of [sender_name]"){
        return "请求体中发送人的用户名字段缺失或非字符串类型";
    }
    if (code === -2 && info ==="Invalid char in [sender_name]"){
        return "请求体中发送人的用户名字段不符合“只含有大小写字母、数字、下划线”的要求";
    }
    if (code === -2 && info ==="Bad length of [sender_name]"){
        return "请求体中发送人的用户名字段长度不合要求";
    }

    // refused_name的问题
    if (code === -2 && info === "Missing or error type of [refused_name]") {
        return "请求体中refused_name字段缺失或非字符串类型。";
    }
    else if (code === -2 && info === "Invalid char in [refused_name]") {
        return "请求体中refused_name字段不符合“只含有大小写字母、数字、下划线”的要求";
    }
    else if (code === -2 && info === "Bad length of [refused_name]") {
        return "请求体中refused_name字段长度不符合要求";
    }

    // 无法找到对应的用户
    else if (code === 1 && info === "User not found") {
        return "根据name查找的用户不存在";
    }
    else if (code === 1 && info === "User to refuse not found") {
        return "根据receiver_name查找的用户不存在";
    }
    else if (code === 1 && info === "Friend application not exist") {
        return "不存在对应的好友申请";
    }

    // accepted_name的问题
    if (code === -2 && info === "Missing or error type of [accepted_name]") {
        return "请求体中accepted_name字段缺失或非字符串类型。";
    }
    else if (code === -2 && info === "Invalid char in [accepted_name]") {
        return "请求体中accepted_name字段不符合“只含有大小写字母、数字、下划线”的要求";
    }
    else if (code === -2 && info === "Bad length of [accepted_name]") {
        return "请求体中accepted_name字段长度不符合要求";
    }

    // 无法找到对应的用户
    else if (code === 1 && info === "User not found") {
        return "根据name查找的用户不存在";
    }
    else if (code === 1 && info === "Friend to accept not found") {
        return "根据accepted_name查找的用户不存在";
    }
    else if (code === 1 && info === "Friend application not exist") {
        return "不存在对应的好友申请";
    }

    // 其他情况
    else {
        return info;
    }
};

// 处理邮箱验证的报错，完成检查
export function EmailWrong(code, info) {
    if (code === -2 && info === "Missing or error type of [email]") {
        return "邮箱字段缺失或非字符串类型";
    }
    else if (code === -2 && info === "[email] has not been registered") {
        return "email字段未被注册过，从而无法关联到某个特定用户";
    }
    else if (code === -2 && info === "[email] has been registered by others, so it can't be used") {
        return "email字段已经被注册过，不能再将它作为你的注册邮箱";
    }
    else if (code === 1 && info === "[email] is not a valid email address") {
        return "邮箱不是一个真实存在的邮箱，验证码无法成功发送";
    }

    // 其他情况
    else {
        return info;
    }
};

// 搜索聊天记录的报错
export function SearchChatHistory(code, info) {
    if (code === -2) {
        if (info === "Missing or error type of [check_type]") {
            return "请求体中查找类型字段缺失或非字符串类型。";
        }
        else if (info === "Illegal content of [check_type]") {
            return "请求体中查找的类型对应字段不是合法内容";
        }
        else if (info === "Illegal content of [check_body]") {
            return "您输入的搜索内容不符合规定";
        }
        else if (info === "Missing or error type of [conversation_id]"){
            return "请求体中搜索的聊天id字段缺失或非字符串类型";
        }
        else if (info === "Invalid char in [name]"){
            return "输入的发送人用户名不符合只含有大小写字母、数字、下划线的要求";
        }
        else if (info === "Bad length of [name]"){
            return "输入的发送人用户名长度不符合要求";
        }
        else if (info.startsWith("cannot access local")){
            return "您输入的时间为空或不符合要求";
        }
        
        else {
            return info;
        }
    }
    else if (code === 1 && info === "Conversation not found"){
        return "无法根据请求体中的聊天id找到对应的聊天";
    }
    else if (info === "User not found"){
        return "无法找到对应的用户";
    }
    else if (info === "not enough values to unpack (expected 2, got 1)"){
        return "请输入搜索的内容";
    }
    else if (code === -2 && info.startsWith("cannot access local")){
        return "您输入的时间为空或不符合要求";
    }
    else {
        // return info;
        return "您没有输入内容或者输入的内容不符合规范";
    }
};


// 删除好友相关的报错
export function DeleteFriend(code, info) {
    // 请求体中数据格式不满足格式规定
    if (code === -2 && info === "Missing or error type of [name]") {
        return "请求体中用户名字段字段缺失或非字符串类型";
    }
    else if (code === -2 && info === "Invalid char in [name]") {
        return "请求体中用户名字段不符合“只含有大小写字母、数字、下划线”的要求";
    }
    else if (code === -2 && info === "Bad length of [name]") {
        return "请求体中用户名字段长度不合要求";
    }
    else if (code === -2 && info === "Missing or error type of [deleted_name]") {
        return "请求删除的好友用户名字段缺失或非字符串类型";
    }
    else if (code === -2 && info === "Invalid char in [deleted_name]") {
        return "请求删除的好友用户名字段不符合“只含有大小写字母、数字、下划线”的要求";
    }
    else if (code === -2 && info === "Bad length of [deleted_name]") {
        return "请求删除的好友用户名字段长度不合要求";
    }

    // 服务器无法根据请求体找到对应的资源
    else if (code === 1 && info === "User not found") {
        return "根据name查找的用户不存在";
    }
    else if (code === 1 && info === "Friend to delete not found") {
        return "根据 deleted_name查找的用户不存在";
    }
    else if (code === 1 && info === "Receiver is not your friend") {
        return "您和对方没有好友关系";
    }

    // 其他情况
    else {
        return info;
    }
};

// 处理翻译报错的部分
export function TranslationWrong(code, info) {
    if (code === 1 && info === "failed to translate due to unexpected error") {
        return "后端调用接口失败，没能完成翻译";
    }

    // 其他情况
    else {
        return info;
    }
};


// 无法通过二次验证
export function VerificationWrong(code, info) {
    if (code === -2 && info === "Missing or error type of [name]") {
        return "name字段字段缺失或非字符串类型";
    }
    else if (code === -2 && info === "Invalid char in [name]") {
        return "name字段不符合“只含有大小写字母、数字、下划线”的要求";
    }
    else if (code === -2 && info === "Bad length of [name]") {
        return "name字段长度不合要求";
    }
    else if (code === -2 && info === "Missing or error type of [password]") {
        return "password字段字段缺失或非字符串类型";
    }
    else if (code === -2 && info === "Invalid char in [password]") {
        return "password字段不符合“只含有大小写字母、数字、下划线”的要求";
    }
    else if (code === -2 && info === "Bad length of [password]") {
        return "password字段长度不合要求";
    }

    else if (code === -2 && info === "Missing or error type of [conversation_id]") {
        return "conversation_id字段字段缺失或非整数类型";
    }
    else if (code === 1 && info === "User not found") {
        return "根据请求体中的用户名找不到用户";
    }
    else if (code === 1 && info === "Wrong password") {
        return "请求体中的用户名密码无法匹配";
    }
    else if (code === 1 && info === "Already set") {
        return "该聊天已经是需要二次验证的聊天";
    }

    // 其他情况
    else {
        return info;
    }

};

// 无法修改个人信息
export function CantChangeVerification(code, info) {
    if (code === -2 && info === "Missing or error type of [name]") {
        return "请求体中用户名字段缺失或非字符串类型";
    }
    else if (code === -2 && info === "Invalid char in [name]") {
        return "请求体中用户名字段不符合“只含有大小写字母、数字、下划线”的要求";
    }
    else if (code === -2 && info === "Bad length of [name]") {
        return "请求体中用户名字段长度不合要求";
    }
    else if (code === -2 && info === "[name] has not been registered") {
        return "请求体中用户名字段不是一个现存用户的名字";
    }

    else if (code === -2 && info === "Missing or error type of [new_name]") {
        return "修改的用户名字段缺失或非字符串类型";
    }
    else if (code === -2 && info === "Invalid char in [new_name]") {
        return "修改的用户名字段不符合“只含有大小写字母、数字、下划线”的要求";
    }
    else if (code === -2 && info === "Bad length of [new_name]") {
        return "修改的用户名字段长度不合要求";
    }
    else if (code === -2 && info === "[new_name] has been registered by others") {
        return "修改的用户名字段已被别的用户注册过";
    }
    else if (code === -2 && info === "Your new name is the same as your old name, modification is invalid"){
        return "修改的用户名字段和现在名字一样";
    }

    else if (code === -2 && info === "Missing or error type of [new_password]") {
        return "修改的密码字段缺失或非字符串类型";
    }
    else if (code === -2 && info === "Invalid char in [new_password]") {
        return "修改的密码字段不符合“只含有大小写字母、数字、下划线”的要求";
    }
    else if (code === -2 && info === "Bad length of [new_password]") {
        return "修改的密码字段长度不合要求";
    }
    else if (code === -2 && info === "Your new password is the same as your old password, modification is invalid"){
        return "修改的密码字段和现在密码一样";
    }

    else if (code === -2 && info === "Missing or error type of [new_email]") {
        return "修改的邮箱字段缺失或非字符串类型";
    }
    else if (code === -2 && info === "Your new email is the same as your old email, modification is invalid") {
        return "修改的邮箱和现在邮箱一样";
    }
    else if (code === -2 && info === "[new_email] has been registered by others") {
        return "修改的邮箱字段已被别的用户注册过";
    }



    else if (code === -2 && info === "Invalid type of [info_type]") {
        return "请求体中修改项的类型不正确";
    }

    // 其他情况
    else {
        return info;
    }

};


// 无法修改头像
export function WhyCantChangeAvatar(code, info) {
    if (code === -2 && info === "Missing or error type of [name]") {
        return "请求头像的用户名缺失或非字符串类型";
    }
    else if (code === -2 && info === "Invalid char in [name]") {
        return "请求头像的用户名不符合“只含有大小写字母、数字、下划线”的要求";
    }
    else if (code === -2 && info === "Bad length of [name]") {
        return "请求头像的用户名字段长度不合要求";
    }
    else if (code === -2 && info === "[name] has not been registered") {
        return "请求头像的用户名字段不是一个现存用户的名字";
    }

    else if (code === -2 && info === "Missing or error type of [new_avatar]") {
        return "您没有上传新的头像";
    }

    else if (code === -4 && info === "failed to get avatar") {
        return "后端没能成功读取用户的头像，或者根据该头像没能成功获取到base64字符串";
    }

    else if (info === "Request body exceeded settings.DATA_UPLOAD_MAX_MEMORY_SIZE."){
        return "您上传的图片大小过大，超过了我们要求的大小，请压缩或选取别的图片";
    }

    // 其他情况
    else {
        return info;
    }
};

// 二次验证无法取消
export function CantCancelVerification(code, info) {
    if (code === -2 && info === "Missing or error type of [name]") {
        return "name字段字段缺失或非字符串类型";
    }
    else if (code === -2 && info === "Invalid char in [name]") {
        return "name字段不符合“只含有大小写字母、数字、下划线”的要求";
    }
    else if (code === -2 && info === "Bad length of [name]") {
        return "name字段长度不合要求";
    }
    else if (code === -2 && info === "Missing or error type of [password]") {
        return "password字段字段缺失或非字符串类型";
    }
    else if (code === -2 && info === "Invalid char in [password]") {
        return "password字段不符合“只含有大小写字母、数字、下划线”的要求";
    }
    else if (code === -2 && info === "Bad length of [password]") {
        return "password字段长度不合要求";
    }

    else if (code === -2 && info === "Missing or error type of [conversation_id]") {
        return "conversation_id字段字段缺失或非整数类型";
    }
    else if (code === 1 && info === "User not found") {
        return "根据请求体中的用户名找不到用户";
    }
    else if (code === 1 && info === "Wrong password") {
        return "请求体中的用户名密码无法匹配";
    }
    else if (code === 1 && info === "Already set") {
        return "该聊天并不是二次验证的聊天";
    }

    // 其他情况
    else {
        return info;
    }

};

// 语音转文字报错
export function VoiceToTextError(code, info) {
    if (code === -2 && info === "Missing or error type of [voice_info]") {
        return "voice_info字段字段缺失或非字符串类型";
    }
    else if (code === -2 && info === "failed to convert due to unexpected error") {
        return "服务器调用接口失败，没能完成转换";
    }
    // 其他情况
    else {
        return info;
    }

};

// 好友分组相关
export function FriendGroup(code, info) {
    if (code === -2 && info === "Missing or error type of [name]") {
        return "请求体中您的用户名字段缺失或非字符串类型";
    }
    else if (code === -2 && info === "Invalid char in [name]"){
        return "请求体中您的用户名不符合“只含有大小写字母、数字、下划线”的要求";
    }
    else if (code === -2 && info === "Bad length of [name]"){
        return "请求体中您的用户名字段长度不合要求";
    }
    else if (code === -2 && info === "Missing or error type of [friend_name]"){
        return "请求体中被分组的好友的用户名字段缺失或非字符串类型";
    }
    else if (code === -2 && info === "Invalid char in [friend_name]"){
        return "请求体中被分组的好友的用户名字段不符合“只含有大小写字母、数字、下划线”的要求";
    }
    else if (code === -2 && info === "Bad length of [friend_name]"){
        return "请求体中被分组的好友的用户名字段长度不合要求";
    }
    else if (code === -2 && info === "Missing or error type of [tag]"){
        return "请求体中分组字段缺失或非字符串类型";
    }
    else if (code === -2 && info === "You are not friends"){
        return "您和被分组的用户不是好友关系，对方可能将您删除了";
    }
    else if (code === 1 && info === "User not found"){
        return "根据请求体中用户名查找的用户不存在";
    }
    else if (code === 1 && info === "Friend may have deregistered"){
        return "根据请求体中被分组的好友名称查找的用户不存在";
    }
    else if (code === 1 && info === "Friend is not in the tag"){
        return "用户不在这个分组中";
    }

    // 其他情况
    else {
        return info;
    }
};