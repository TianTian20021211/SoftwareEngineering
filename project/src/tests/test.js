import { WhyCantEmail } from '../../public/utils';

const testFunc = (code, info) => {
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
}

const code_list = [-2, -2, -2, -2, 1, 1, -4, 0]
const info_list = ["Missing or error type of [email]", "Missing or error type of [verification]", "Invalid char in [verification]", "Incorrect verification code", "Bad length of [verification]", "User not found", "An error occured when accessing data", "exp"]

it("[单元测试] 检查报错的函数", () => {
  for (let test = 0; test < code_list.length; ++test) {
      let expect_answer = testFunc(code_list[test], info_list[test]);
      let ans = WhyCantEmail(code_list[test], info_list[test]);
      // Check equality
      expect(expect_answer === ans).toBeTruthy();
    }
  }
);