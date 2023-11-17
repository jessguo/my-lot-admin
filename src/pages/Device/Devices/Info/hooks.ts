import API, { ListPaylod, Filters, Api } from '@/api/admin';
import DevcieAPI, { Api as URL, UpgradeFirmwarePaylod } from '@/api/devcie';
import { notification } from 'antd';
import useSWRMutation from 'swr/mutation';

export const filters: Filters = {
  sn: null,
  status: null,
};
export interface SendRequestArgs {
  arg: ListPaylod;
}

export interface SendInfoArgs {
  id: string;
}

// 获取设备列表
export const useDeviceList = () => {
  const fetch = async (url: Api, { arg }: SendRequestArgs): Promise<ResProps> => {
    return API.post(url, {
      ...arg,
      size: 10,
    });
  };
  return useSWRMutation(Api.DEVICE_LIST, fetch);
};

// 获取原始数据列表
export const useDeviceSourceList = () => {
  const fetch = (url: Api, { arg }: SendRequestArgs): Promise<ResProps> => {
    return API.post(url, { size: 10, ...arg });
  };
  return useSWRMutation(Api.DEVICE_SOURCE_DATA_LIST, fetch);
};

// 获取设备信息
export const userDeviceInfo = () => {
  const fetch = (url: Api, { arg }: { arg: SendInfoArgs }): Promise<ResProps> => {
    return API.post(url, { ...arg });
  };
  return useSWRMutation(Api.DEVICE_INFO, fetch);
};

// 固件升级
export const useUpdateFirmwarge = () => {
  const submit = async (url: URL, { arg }: { arg: UpgradeFirmwarePaylod }) => {
    const data = await DevcieAPI.upgradeFirmware(url, arg);
    if (data.isSuccess) {
      notification.success({
        message: '新增成功',
        description: data.message,
      });
    }
    return data;
  };
  return useSWRMutation(URL.DEVICE_FIRMWAREUPGRADE, submit);
};

// 获取任务列表
export const useTaskList = () => {
  const fetch = async (url: Api, { arg }: SendRequestArgs): Promise<ResProps> => {
    return API.post(url, { size: 10, ...arg, filters: {} });
  };

  return useSWRMutation(Api.DEVICE_TASK_LIST, fetch);
};

// 新增设备
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
  return useSWRMutation(Api.DEVICE_CREATE, submit);
};
// 更新时间
export const useUpdateDeviceEffective = () => {
  const submit = async (url: Api, { arg }: any) => {
    const data = await API.post(url, arg);
    if (data.isSuccess) {
      notification.success({
        message: '更新成功',
        description: data.message,
      });
    }
    return data;
  };
  return useSWRMutation(Api.DEVICE_WARRANTY_EFFECTIVE, submit);
};

// 获取modalbustasklist
export const useModbusTaskList = () => {
  const fetch = async (url: Api, { arg }: SendRequestArgs): Promise<ResProps> => {
    return API.post(url, { size: 10, ...arg, filters: {} });
  };

  return useSWRMutation(Api.DEVICE_MODBUS_TASK_LIST, fetch);
};
// 获取解析数据详情
interface SourceDataPayload {
  id: string;
}
export const useSourceData = () => {
  const fetch = async (url: Api, { arg }: { arg: SourceDataPayload }): Promise<ResProps> => {
    return API.post(url, { ...arg });
  };

  return useSWRMutation(Api.DEVICE_SOURCE_DATA, fetch);
};

//获取数据soruce详情列表
export const useSourceDetailList = () => {
  const fetch = async (url: Api, { arg }: SendRequestArgs): Promise<ResProps> => {
    return API.post(url, { size: 10, ...arg, filters: {} });
  };

  return useSWRMutation(Api.DEVICE_SOURCE_DETAIL_LIST, fetch);
};
// 获取告警列表

export const userErrorList = () => {
  const fetch = async (url: Api, { arg }: SendRequestArgs): Promise<ResProps> => {
    return API.post(url, { size: 10, ...arg });
  };
  return useSWRMutation(Api.DEVICE_ERRORINFOLIST, fetch);
};
