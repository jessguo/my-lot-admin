import { message } from 'antd';
import { v4 as uuidV4 } from 'uuid';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosRequestHeaders } from 'axios';
import useUser from '@/store/index';
export type { AxiosInstance, AxiosResponse, AxiosRequestHeaders };

// axios 工厂函数
const creatInstaceRequest = (baseURL: string, head = {}) => {
  // 创建axios实例
  const instance = axios.create({
    baseURL,
  });
  // axios请求拦截
  const requstInterceptors = (request: any) => {
    // 获取token
    const token = useUser.getState().token;
    const appId = import.meta.env.VITE_APPID;
    let clientId = localStorage.getItem('clientId');
    if (!clientId) {
      clientId = uuidV4();
      localStorage.setItem('clientId', clientId);
    }

    // 自定义头部
    request.headers = {
      ...request.headers,
      ...head,
      'client-id': clientId,
      'app-id': appId || '',
      token: token || '',
    };
    return request;
  };

  // axios返回拦截
  const responestInterceptors = (response: AxiosResponse) => {
    if (response.config.responseType === 'blob') {
      return response;
    }
    const res = response.data;
    if (res.status !== 0) {
      message.error(res.message);
    }
    return {
      ...res,
      // 自定义新增isSuccess
      isSuccess: res.status === 0,
    };
  };

  const errorInterceptors = (error: any) => {
    if (error.response.status === 401) {
      message.error(error.response?.data.message);
      useUser.getState().logout();
      // 重定向到登陆页面
      window.location.href = '/login';
    }
  };
  // 全局统一拦截
  instance.interceptors.request.use(requstInterceptors);
  instance.interceptors.response.use(responestInterceptors, errorInterceptors);
  // 封装请求
  const request = <T>(reqConfig: AxiosRequestConfig): Promise<T> => {
    return instance.request<T, T>(reqConfig);
  };
  return request;
};

// 创建 account instance
const accountURL = import.meta.env.VITE_ACCOUNT_URL;
const accountRequest = creatInstaceRequest(accountURL);

// 创建 device instance
const deviceURL = import.meta.env.VITE_DEVICE_URL;
const deviceRequest = creatInstaceRequest(deviceURL);

// 创建 web-admin instance
const adminURL = import.meta.env.VITE_ADMIN_URL;
const adminRequest = creatInstaceRequest(adminURL);

export { accountRequest, deviceRequest, adminRequest };
