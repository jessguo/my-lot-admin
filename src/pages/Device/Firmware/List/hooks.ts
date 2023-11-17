import API, { ListPaylod, Api } from '@/api/admin';
import { notification } from 'antd';
import useSWRMutation from 'swr/mutation';

export interface SendRequestArgs {
  arg: ListPaylod;
}

export const useFirmwareList = () => {
  const fetch = async (url: Api, { arg }: SendRequestArgs): Promise<ResProps> => {
    return API.post(url, { ...arg, size: 10, filters: {} });
  };
  return useSWRMutation(Api.DEVICE_FIRMWARE_LIST, fetch);
};

export const useFilrmwareUpload = () => {
  const submit = async (url: Api, { arg }: { arg: any }): Promise<ResProps> => {
    const response = await API.post(url, arg);
    if (response?.isSuccess) {
      notification.success({
        message: '固件上传成功',
        description: response?.message,
      });
    }
    return response;
  };
  return useSWRMutation(Api.DEVICE_FIRMWARE_UPLOAD, submit);
};

export const useFirmwareChangeAble = () => {
  const submit = async (url: Api, { arg }: { arg: any }): Promise<ResProps> => {
    const response = await API.post(url, arg);
    if (response?.isSuccess) {
      notification.success({
        message: '操作成功',
        description: response?.message,
      });
    }
    return response;
  };
  return useSWRMutation(Api.DEVICE_FIRMWARE_CHANGE_ENABLE, submit);
};
