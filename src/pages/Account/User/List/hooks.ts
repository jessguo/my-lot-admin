import API, { ListPaylod, Filters, Api } from '@/api/admin';
import AccountAPI, { Api as AccountApi } from '@/api/user';
import { message, notification } from 'antd';
import useSWRMutation from 'swr/mutation';

export const initFilter: Filters = Object.freeze({
  sn: null,
  status: null,
});
export interface SendRequestArgs {
  arg: ListPaylod;
}

export interface SendPostRequestArgs {
  arg: any;
}
// 获取用户列表
export const useUserList = () => {
  const fetch = async (url: Api, { arg }: SendRequestArgs): Promise<ResProps> => {
    return API.post(url, {
      ...arg,
      size: 10,
    });
  };
  return useSWRMutation(Api.ACCOUNT_MANAGEMENT_LIST, fetch);
};
// 编辑用户info
export const useEditUser = () => {
  const fetch = async (url: Api, { arg }: SendPostRequestArgs): Promise<ResProps> => {
    const response = await API.post(url, arg);
    if (response.isSuccess) {
      notification.success({
        message: '编辑成功',
        description: response.message,
      });
    }
    return response;
  };
  return useSWRMutation(Api.ACCOUNT_MANAGEMENT_UPDATE, fetch);
};

// 创建用户
export const userCreateUser = () => {
  const fetch = async (url: Api, { arg }: SendPostRequestArgs): Promise<ResProps> => {
    const response = await API.post(url, arg);
    if (response.isSuccess) {
      notification.success({
        message: '创建成功',
        description: response.message,
      });
    }
    return response;
  };
  return useSWRMutation(Api.ACCOUNT_MANAGEMENT_CREATE, fetch);
};
// 删除用户
export const userDelete = () => {
  const fetch = async (url: Api, { arg }: SendPostRequestArgs): Promise<ResProps> => {
    const response = await API.post(url, arg);
    if (response.isSuccess) {
      notification.success({
        message: '删除成功',
        description: response.message,
      });
    }
    return response;
  };
  return useSWRMutation(Api.ACCOUNT_MANAGEMENT_DELETE, fetch);
};
// 获取用户信息
export const useUserInfo = (userId: string) => {
  const fetch = (_: string, { arg }: SendPostRequestArgs): Promise<ResProps> => {
    return API.post(Api.ACCOUNT_MANAGEMENT_READ, { id: arg.id });
  };
  return useSWRMutation(Api.ACCOUNT_MANAGEMENT_READ + userId, fetch);
};

// 开启禁用用户
export const useEnableUser = () => {
  const fetch = async (url: AccountApi, { arg }: SendPostRequestArgs): Promise<ResProps> => {
    const response = await AccountAPI.post(url, arg);
    if (response.isSuccess) {
      message.success('操作成功');
    }
    return response;
  };
  return useSWRMutation(AccountApi.SYS_ACCOUNT_STATUS_EDIT, fetch);
};

//  获取角色列表(selelct)
export const useRoleList = () => {
  const fetch = async (url: Api): Promise<ResProps> => {
    return API.post(url, {});
  };
  return useSWRMutation(Api.ROLE_SELECT_LIST, fetch);
};

// 用户重置密码
export const useResetPassword = () => {
  const fetch = async (url: AccountApi, { arg }: SendPostRequestArgs): Promise<ResProps> => {
    const response = await AccountAPI.post(url, arg);
    if (response.isSuccess) {
      notification.success({
        message: '重置成功',
        description: response.message,
      });
    }
    return response;
  };
  return useSWRMutation(AccountApi.ACCOUNT_MANAGEMENT_RESET_PASSWORD, fetch);
};
