# 软件工程大作业API文档

- 希望前端可以分别实现两个页面（注册/注销；登录）
- **随时更新**



## URL/user

这一部分实现用户的注册和注销。

对应于要求文档一级需求中的*基本管理*

### GET

**TODO**



### POST

使用 POST 方法请求该API ，实现注册。

#### 请求体

请求体的格式为：

```json
{
    "username": "LiHua",
    "password": "wo_shi_Li_Hua111",
    "type": "register"
}
```

- `username`：表示该用户的用户名。对应于后端同名变量。请注意，用户名要求只含有大小写字母、数字、下划线，不得为空。
- `password`：表示该用户的密码。对应于后端同名变量。请注意，密码要求只含有大小写字母、数字、下划线，不得为空，并且长度不得短于8位。

- `type`：表示该请求的类型。为`register`即为注册，为`deregister`即为注销。在POST里面，只能以`register`作为类型，其余要报错。

#### 成功响应

请求成功时，应当设置状态码为 200 OK，成功响应格式为：

```json
{
    "code": 0,
    "info": "Succeed",
}
```

#### 错误响应

所有错误响应的格式均为：

```json
{
    "code": *,
    "info": "[Some message]"
}
```

- 若请求体中数据格式不满足格式规定，错误响应的`code` 字段为 `-2`，状态码为 400 Bad Request，`info` 字段的具体内容根据具体错误确定。
  - `username`字段不符合“只含有大小写字母、数字、下划线”的要求：`info`为`"error type of username"`
  - `password`字段不符合“只含有大小写字母、数字、下划线”的要求：`info`为`"error type of password"`
  - `username`字段长度不合要求：`info`为`"bad length of username"`
  - `password`字段长度不合要求：`info`为`"bad length of password"`
  - `type`字段不是规定好的值：`info`为`"invalid request type"`

- 若读写数据中途抛出错误，错误响应的状态码为 500 Internal Server Error，`code` 字段为 `-4`，`info` 为`"an error occured when accessing data"`

### DELETE

使用 POST 方法请求该API ，实现注销用户。

#### 请求体

**问题**：前端能不能把用户的消息传过来？或者弄成，注销的时候需要用户输入用户名和密码？

**问题：**有没有可能存在用户名和密码完全一样的用户？如果存在，那么后端如果做成了根据用户名密码筛选删除，恐怕就会出问题。

请求体的格式为：

```json
{
    "username": "LiHua",
    "password": "wo_shi_Li_Hua111",
    "type": "deregister"
}
```

- `username`：表示该用户的用户名。对应于后端同名变量。请注意，用户名要求只含有大小写字母、数字、下划线，不得为空。
- `password`：表示该用户的密码。对应于后端同名变量。请注意，密码要求只含有大小写字母、数字、下划线，不得为空，并且长度不得短于8位。

- `type`：表示该请求的类型。为`register`即为注册，为`deregister`即为注销。在DELETE里面，只能以`deregister`作为类型，其余要报错。

#### 成功响应

请求成功时，应当设置状态码为 200 OK，成功响应格式为：

```json
{
    "code": 0,
    "info": "Succeed"
}
```

#### 错误响应

所有错误响应的格式均为：

```json
{
    "code": *,
    "info": "[Some message]"
}
```

- 若请求体中数据格式不满足格式规定，错误响应的`code` 字段为 `-2`，状态码为 400 Bad Request，`info` 字段的具体内容根据具体错误确定。
  - `username`字段不符合“只含有大小写字母、数字、下划线”的要求：`info`为`"error type of username"`
  - `password`字段不符合“只含有大小写字母、数字、下划线”的要求：`info`为`"error type of password"`
  - `username`字段长度不合要求：`info`为`"bad length of username"`
  - `password`字段长度不合要求：`info`为`"bad length of password"`
  - `type`字段不是规定好的值：`info`为`"invalid request type"`
  - 根据用户名密码搜查到的用户不存在：`info`为`"non-existent user"`
- 若读写数据中途抛出错误，错误响应的状态码为 500 Internal Server Error，`code` 字段为 `-4`，`info` 为`"an error occured when accessing data"`



## URL/user_login/username_password

这一段实现用户的用户名-密码登录，对应于文档一级需求中*用户认证*下的*登录登出*、*验证手段*。

### POST

使用POST方法请求该API。

通过用户名密码登录。

#### 请求体

请求体的格式为：

```json
{
    "username": "LiHua",
    "password": "wo_shi_Li_Hua111",
}
```

- `username`和`password`字段的要求和注册时一样。

#### 成功响应

请求成功时，应当设置状态码为 200 OK，成功响应格式为：

```json
{
    "code": 0,
    "info": "Succeed"
}
```

#### 错误响应

所有错误响应的格式均为：

```json
{
    "code": *,
    "info": "[Some message]"
}
```

- 若请求体中数据格式不满足格式规定，错误响应的`code` 字段为 `-2`，状态码为 400 Bad Request，`info` 字段的具体内容根据具体错误确定。
  - `username`字段不符合“只含有大小写字母、数字、下划线”的要求：`info`为`"error type of username"`
  - `password`字段不符合“只含有大小写字母、数字、下划线”的要求：`info`为`"error type of password"`
  - `username`字段长度不合要求：`info`为`"bad length of username"`
  - `password`字段长度不合要求：`info`为`"bad length of password"`
  - 根据用户名密码搜查到的用户不存在：`info`为`"non-existent user"`
- 若读写数据中途抛出错误，错误响应的状态码为 500 Internal Server Error，`code` 字段为 `-4`，`info` 为`"an error occured when accessing data"`



### URL/user_login/phone_verification

这一段实现用户的手机号-验证码登录，对应于文档一级需求中*用户认证*下的*登录登出*、*验证手段*。

### POST

使用POST方法请求该API。

通过手机号验证登录。

#### 请求体

我们设定只有两种登录认证手段，即

1. 通过用户名、密码
2. 通过手机号、验证码（**这意味着也许模型要稍作修改？也可以之后再做**）

请求体的格式为：

```json
{
    "phone": "13311445511",
    "verification": "649801"
}
```

- `phone`和`verification`要求只含有数字。
- `verification`要求长度必须为6。

#### 成功响应

请求成功时，应当设置状态码为 200 OK，成功响应格式为：

```json
{
    "code": 0,
    "info": "Succeed"
}
```

#### 错误响应

所有错误响应的格式均为：

```json
{
    "code": *,
    "info": "[Some message]"
}
```

- 若请求体中数据格式不满足格式规定，错误响应的`code` 字段为 `-2`，状态码为 400 Bad Request，`info` 字段的具体内容根据具体错误确定。
  - `phone`字段不满足只含有数字的要求：`info`为`"error type of phone number"`
  - `verification`字段不满足只含有数字的要求：`info`为`"error type of verification code"`
  - `verification`字段不满足长度为6的限制：`info`为`"bad length of verification code"`
  - 根据手机验证码搜查到的用户不存在：`info`为`"non-existent user"`
- 若读写数据中途抛出错误，错误响应的状态码为 500 Internal Server Error，`code` 字段为 `-4`，`info` 为`"an error occured when accessing data"`



## URL/user_logout

这一段实现用户的登出，对应于文档一级需求中*用户认证*下的*登录登出*。

### POST

使用POST方法请求该API。

单纯地登出系统。

#### 请求体

本方法不需要提供任何请求体。

#### 成功响应

请求成功时，应当设置状态码为 200 OK，成功响应格式为：

```json
{
    "code": 0,
    "info": "Succeed"
}
```

#### 错误响应

所有错误响应的格式均为：

```json
{
    "code": *,
    "info": "[Some message]"
}
```

- 若读写数据中途抛出错误，错误响应的状态码为 500 Internal Server Error，`code` 字段为 `-4`，`info` 为`"an error occured when accessing data"`
- **TODO**：其他可能的错误？
