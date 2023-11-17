import API, { Api } from '@/api/user';
import AdminAPI, { Api as URLApi } from '@/api/admin';
import { notification } from 'antd';
import useSWRMutation from 'swr/mutation';

export const useGetCaptrue = () => {
  const submit = async (url: any, { arg }: { arg: any }) => {
    const response = await API.post(url, arg);
    if (response.isSuccess) {
      notification.success({
        message: '验证码已发送至您的邮箱，请注意查收！',
        description: response.message,
      });
    }
    return response;
  };

  return useSWRMutation(Api.ACCOUNT_GET_CAPTCHA, submit);
};

export const useLogin = () => {
  const submit = async (url: any, { arg }: { arg: any }): Promise<ResProps> => {
    const response = await AdminAPI.post(url, arg);
    if (response.isSuccess) {
      notification.success({
        message: '登录成功',
        description: response.message,
      });
    }
    return response;
  };

  return useSWRMutation(URLApi.ACCOUNT_LOING, submit);
};

export const useReset = () => {
  const submit = async (url: any, { arg }: { arg: any }) => {
    const response = await API.post(url, arg);
    if (response.isSuccess) {
      notification.success({
        message: '重制密码成功',
        description: response.message,
      });
    }
    return response;
  };

  return useSWRMutation(Api.ACCOUNT_RESET_PASSWORD, submit);
};
