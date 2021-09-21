import { get, post } from "./http";

//获取验证码
export const initRouter = () => {
  return get("/menu");
};
