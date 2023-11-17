import API, { ListPaylod, Api } from '@/api/admin';
import { notification } from 'antd';
import useSWRMutation from 'swr/mutation';

export interface SendRequestArgs {
  arg: ListPaylod;
}

export const initFilters: any = Object.freeze({
  sn: null,
});

// 获取电池列表
export const userBatteryList = () => {
  const fetch = async (url: Api, { arg }: SendRequestArgs): Promise<ResProps> => {
    return API.post(url, { ...arg, size: 10 });
  };
  return useSWRMutation(Api.BATTERY_LIST, fetch);
};

// 批量新增设备
export const useAddDeviceBattery = () => {
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
  return useSWRMutation(Api.BATTERY_IMPORT, submit);
};
// 解除电池绑定
export const useUnbindDeviceBattery = () => {
  const submit = async (url: Api, { arg }: { arg: any }) => {
    const data = await API.post(url, arg);
    if (data.isSuccess) {
      notification.success({
        message: '解绑成功',
        description: data.message,
      });
    }
    return data;
  };
  return useSWRMutation(Api.BATTERY_UNBIND_DEVICE, submit);
};
// 绑定电池
export const useBindDeviceBattery = () => {
  const submit = async (url: Api, { arg }: { arg: any }) => {
    const data = await API.post(url, arg);
    if (data.isSuccess) {
      notification.success({
        message: '绑定成功',
        description: data.message,
      });
    }
    return data;
  };
  return useSWRMutation(Api.BATTERY_BIND_DEVICE, submit);
};

type BatteryRes = {
  sn: string;
  warrantyPeriod: number;
};
// 更新延保时间
export const useUpdateWarrantyPeriod = () => {
  const submit = async (url: Api, { arg }: { arg: BatteryRes }) => {
    const data = await API.post(url, arg);
    if (data.isSuccess) {
      notification.success({
        message: '更新成功',
        description: data.message,
      });
    }
    return data;
  };
  return useSWRMutation(Api.BATTERY_WARRANTY_PERIOD, submit);
};
