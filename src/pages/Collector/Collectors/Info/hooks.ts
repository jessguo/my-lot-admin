import API, { ListPaylod, Filters, Api } from '@/api/admin';
import DevcieAPI, { Api as URL } from '@/api/devcie';
import { notification } from 'antd';
import useSWRMutation from 'swr/mutation';

export const filters: Filters = {
  sn: null,
  status: null,
};
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

export const useCollectorSourceList = () => {
  const fetch = async (url: Api, { arg }: SendRequestArgs): Promise<ResProps> => {
    return API.post(url, {
      ...arg,
    });
  };
  return useSWRMutation(Api.COLLECTOR_SOURCE_DATA_LIST, fetch);
};

export const useSendRowCMD = () => {
  const submit = async (url: URL, { arg }: { arg: any }) => {
    const data = await DevcieAPI.post(url, arg);
    if (data.isSuccess) {
      notification.success({
        message: '操作成功',
        description: data.message,
      });
    }
    return data;
  };

  return useSWRMutation(URL.COLLECTOR_SEND_CMD, submit);
};

// 获取日志列表
export const useCollectorLogList = () => {
  const fetch = async (url: Api, { arg }: SendRequestArgs): Promise<ResProps> => {
    return API.post(url, {
      ...arg,
    });
  };
  return useSWRMutation(Api.COLLECTOR_LOG_LIST, fetch);
};

export const useDownload = () => {
  const submit = async (url: Api, { arg }: { arg: any }) => {
    const response = (await API.downLoad(url, arg)) as any;
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
    const xlx = response?.headers['custom-format-header'];
    link.setAttribute('download', `日志.${xlx}`);
    // 将该隐藏的`<a>`标签添加到DOM，模拟点击，之后再移除它
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return useSWRMutation(Api.COLLECTOR_LOG_EXPORT, submit);
};
// 获取原始消息
interface CollectorSourceDataPayload {
  id: string;
}

export const useCollectorSourceData = () => {
  const fetch = async (url: Api, { arg }: { arg: CollectorSourceDataPayload }): Promise<ResProps> => {
    return API.post(url, {
      ...arg,
    });
  };
  return useSWRMutation(Api.COLLECTOR_SOURCE_DATA, fetch);
};
// 获取设备详情

export const userCollectorInfo = () => {
  const fetch = async (url: Api, { arg }: { arg: CollectorSourceDataPayload }): Promise<ResProps> => {
    return API.post(url, {
      ...arg,
    });
  };
  return useSWRMutation(Api.COLLECTOR_INFO, fetch);
};
