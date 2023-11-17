import API, { ListPaylod, Api } from '@/api/admin';
import { notification } from 'antd';
import useSWRMutation from 'swr/mutation';
import useSWRImmutable from 'swr/immutable';

export const initFilters: any = Object.freeze({
  name: '',
});
export interface SendRequestArgs {
  arg: ListPaylod;
}

export interface SendPostRequestArgs {
  arg: any;
}
// 获取角色列表(分页)
export const useRoleList = () => {
  const fetch = async (url: Api, { arg }: SendRequestArgs): Promise<ResProps> => {
    return API.post(url, arg);
  };
  return useSWRMutation(Api.ROLE_LIST, fetch);
};
// 获取角色信息
export const useRoleInfo = () => {
  const fetch = async (url: Api, { arg }: SendPostRequestArgs): Promise<ResProps> => {
    return API.post(url, { id: arg.id });
  };
  return useSWRMutation(Api.ROLE_READ, fetch);
};

// 创建角色
export const useAddRole = () => {
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
  return useSWRMutation(Api.ROLE_CREATE, fetch);
};

// 编辑角色
export const userEditRole = () => {
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
  return useSWRMutation(Api.ROLE_UPDATE, fetch);
};

// 删除角色
export const useDeleteRole = () => {
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
  return useSWRMutation(Api.ROLE_DELETE, fetch);
};
// 获取权限列表
export const usePermissionList = () => {
  const fetcher = async (url: Api) => {
    return API.post(url);
  };

  return useSWRImmutable(Api.PERMISSION_SELECT_LIST, fetcher);
};
