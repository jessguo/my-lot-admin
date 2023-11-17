import API, { ListPaylod, Filters, Api } from '@/api/admin';
import { notification } from 'antd';
import useSWRMutation from 'swr/mutation';

export const initFilters: Filters = Object.freeze({
  sn: null,
  status: null,
});
export interface SendRequestArgs {
  arg: ListPaylod;
}

// 获取设备列表
export const useDeviceList = () => {
  const fetch = async (url: Api, { arg }: SendRequestArgs): Promise<ResProps> => {
    return API.post(url, {
      ...arg,
      pageSize: 10,
    });
  };
  return useSWRMutation(Api.DEVICE_LIST, fetch);
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
  return useSWRMutation(Api.DEVICE_CREATE, submit);
};

// 批量新增设备
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
  return useSWRMutation(Api.DEVICE_IMPORT, submit);
};

// 下载文件
export const useDownload = () => {
  const submit = async (url: Api, { arg }: { arg: any }) => {
    const response = (await API.downLoad(url, arg)) as any;
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
    const xlx = response?.headers['custom-format-header'];
    link.setAttribute('download', `设备列表.${xlx}`);
    // 将该隐藏的`<a>`标签添加到DOM，模拟点击，之后再移除它
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return useSWRMutation(Api.DEVICE_EXPORT, submit);
};
