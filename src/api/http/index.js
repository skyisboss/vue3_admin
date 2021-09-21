//对 axios 封装
import axios from "axios";

// 创建一个axios实例
const http = axios.create({
  //process.env.VUE_APP_API, api接口前缀
  baseURL: import.meta.env.VITE_APP_API + "/api",
  // 请求超时时间
  timeout: 5000,
  headers: {
    get: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      // 在开发中，一般还需要单点登录或者其他功能的通用请求头，可以一并配置进来
    },
    post: {
      "Content-Type": "application/json;charset=utf-8",
      // 在开发中，一般还需要单点登录或者其他功能的通用请求头，可以一并配置进来
    },
  },
});

// 请求拦截器
http.interceptors.request.use(
  (config) => {
    // 在请求发送之前做一些处理 // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    // config.headers["X-Token"] = "fox2021";
    return config;
  },
  (err) => {
    console.log(err);
  }
);

// 响应拦截器
http.interceptors.response.use(
  (response) => {
    let res = {};
    res.status = response.status;
    res.data = response.data;
    return res;
  },
  (error) => {
    switch (error.response.status) {
      case 400:
        error.message = "请求错误";
        break;
      case 401:
        error.message = "未授权，请登录";
        break;
      case 403:
        error.message = "拒绝访问";
        break;
      case 404:
        error.message = "请求地址404出错"; //`请求地址出错: ${error.response.config.url}`;
        break;
      case 408:
        error.message = "请求超时";
        break;
      case 500:
        error.message = "服务器内部错误";
        break;
      case 501:
        error.message = "服务未实现";
        break;
      case 502:
        error.message = "网关错误";
        break;
      case 503:
        error.message = "服务不可用";
        break;
      case 504:
        error.message = "网关超时";
        break;
      case 505:
        error.message = "HTTP版本不受支持";
        break;
      default:
        error.message = `连接出错(${status})!`;
        break;
    }

    console.log(error);
  }
);

// 封装axios的get请求
export function get(url, data) {
  return new Promise((resolve, reject) => {
    http
      .get(url)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
// 封装axios的post请求
export function post(url, params) {
  return new Promise((resolve, reject) => {
    http
      .post(url, params)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export default http;
