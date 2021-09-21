//基于 mockjs 的演示数据
import Mock from "mockjs";

Mock.setup({
  timeout: 100, // 设置延迟响应，模拟向后端请求数据
});

// 使用方法
// Mock.mock("/api/get", {
// 	err: 0,
// 	msg: "",
// 	data: {},
// })
// Mock.mock("/api/post", "post",(opt) => {
// 	return {
// 		err: 0,
// 		msg: "",
// 		data: {},
// 	}
// })

//获取菜单
import "./menu.js";

//获取验证码
Mock.mock("/api/user/captcha", {
  err: 0,
  msg: "",
  data: "@dataImage('100x40', '5888')",
});

//用户登录
Mock.mock("/api/user/login", "post", (opt) => {
  return Mock.mock({
    err: 0,
    msg: "",
    data: {
      token: "@word()",
    },
  });
});
