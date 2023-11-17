import API, { ListPaylod, Api } from '@/api/admin';
import { notification } from 'antd';
import useSWRMutation from 'swr/mutation';

export interface SendRequestArgs {
  arg: ListPaylod;
}

export const usegetDeviceModelList = () => {
  const fetch = async (url: Api, { arg }: SendRequestArgs): Promise<ResProps> => {
    return API.post(url, { ...arg, size: 10, filters: {} });
  };
  return useSWRMutation(Api.DEVICE_MODEL_LIST, fetch);
};

export const useUpgradeFireware = () => {
  const fetch = async (url: Api, { arg }: { arg: any }): Promise<ResProps> => {
    return API.post(url, arg);
  };
  return useSWRMutation(Api.DEVICE_MODEL_UPGRADE_FIRMWARE, fetch);
};

export const useUnloadFimware = () => {
  const fetch = async (url: Api, { arg }: { arg: any }): Promise<ResProps> => {
    const response = await API.post(url, arg);
    if (response.isSuccess) {
      notification.success({
        message: '固件下架成功',
        description: response.message,
      });
    }
    return response;
  };
  return useSWRMutation(Api.DEVICE_MODEL_UNLOAD_FIRMWARE, fetch);
};
