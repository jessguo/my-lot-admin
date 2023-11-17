import API, { ListPaylod, Filters, Api } from '@/api/admin';
import DevcieAPI, { Api as URL } from '@/api/devcie';
import { notification } from 'antd';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

type FetchPaylod = [Api, string];

export const initFilter: Filters = Object.freeze({
  sn: null,
  status: null,
});
export interface SendRequestArgs {
  arg: ListPaylod;
}
// 获取设备列表
export const useCollectorList = () => {
  const fetch = async (url: Api, { arg }: SendRequestArgs): Promise<ResProps> => {
    return API.post(url, {
      ...arg,
      pageSize: 10,
    });
  };
  return useSWRMutation(Api.COLLECTOR_LIST, fetch);
};

// 获取原始数据列表
export const useDeviceSourceList = () => {
  const fetch = async (url: Api, { arg }: SendRequestArgs): Promise<ResProps> => {
    return API.post(url, { ...arg, pageSize: 10, filters: {} });
  };
  return useSWRMutation(Api.DEVICE_SOURCE_DATA_LIST, fetch);
};

// 获取设备信息
export const userDeviceInfo = (id: string) => {
  const fetch = ([url, id]: FetchPaylod): Promise<ResProps> => {
    return API.post(url, { id });
  };
  return useSWR([Api.DEVICE_INFO, id], fetch);
};

// 固件升级
export const useCollectorUpdateFirmwarge = () => {
  const submit = async (url: any, { arg }: { arg: any }) => {
    const data = await DevcieAPI.upgradeCollectorFirmware(url, arg);
    if (data.isSuccess) {
      notification.success({
        message: '操作成功',
        description: '请等待数采器升级完成',
      });
    }
    return data;
  };
  return useSWRMutation(URL.COLLECTOR_FIRMWAREUPGRADE, submit);
};

export const useAddDevice = () => {
  const submit = async (url: Api, { arg }: any) => {
    const data = await API.post(url, arg);
    if (data.isSuccess) {
      notification.success({
        message: '新增成功',
        description: data.message,
      });
    }
    return data;
  };
  return useSWRMutation(Api.COLLECTOR_CREATE, submit);
};

// 批量新增模组
export const useAddDeviceBatch = () => {
  const submit = async (url: Api, { arg }: any) => {
    const data = await API.post(url, arg);
    if (data.isSuccess) {
      notification.success({
        message: '新增成功',
        description: data.message,
      });
    }
    return data;
  };
  return useSWRMutation(Api.COLLECTOR_IMPORT, submit);
};

export const useCollectortSelectList = () => {
  const fetch = async (url: Api): Promise<ResProps> => {
    return API.post(url, {});
  };

  return useSWR(Api.COLLECTOR_MODEL_SELECT_LIST, fetch);
};

export const useFirmwareSelectList = (info: any) => {
  const fetch = async (url: Api, {}: any): Promise<ResProps> => {
    return API.post(url, {
      sn: info.sn,
      size: 999,
    });
  };

  return useSWR(Api.FIRMWARE_SELECT_LIST, fetch);
};

export const useDownload = () => {
  const submit = async (url: Api, { arg }: { arg: any }) => {
    const response = (await API.downLoad(url, arg)) as any;
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
    const xlx = response?.headers['custom-format-header'];
    link.setAttribute('download', `模组列表.${xlx}`);
    // 将该隐藏的`<a>`标签添加到DOM，模拟点击，之后再移除它
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return useSWRMutation(Api.COLLECTOR_EXPORT, submit);
};
