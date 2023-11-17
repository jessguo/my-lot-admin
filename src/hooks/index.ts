import useSWR from 'swr';
import API, { Api } from '@/api/admin';
import useSWRMutation from 'swr/mutation';
export interface Arg {
  arg: any;
}
const getOptiosn = (list: any[]) => {
  if (!list || list.length === 0) return [];
  return list.map((item) => ({
    value: item.id,
    label: item.name,
  }));
};

const getModelOptiosn = (list: any[]) => {
  if (!list || list.length === 0) return [];
  return list.map((item) => ({
    value: item.id,
    label: `${item.name} 版本:${item.remark}`,
  }));
};

function useDeviceSelectModelList() {
  const fetchModel = async (url: Api) => API.post(url);
  const { data, isLoading } = useSWR(Api.DEVICE_MODEL_SELECT_LIST, fetchModel, {
    keepPreviousData: true,
  });
  const options = getModelOptiosn(data?.data);
  return {
    data,
    options,
    isLoading,
  };
}

function useDeviceFirmawreList() {
  const fetchFirmware = async (url: Api) => API.post(url);
  const { data, isMutating, trigger } = useSWRMutation(Api.DEVICE_FIRMWARE_SELECT_LIST, fetchFirmware);
  const options = getOptiosn(data?.data);
  return {
    data,
    isLoading: isMutating,
    trigger,
    options,
  };
}

function useFirmwareSelectList() {
  const fetchFirmware = async (url: Api) => API.post(url);
  const { data, isMutating, trigger } = useSWRMutation(Api.FIRMWARE_SELECT_LIST, fetchFirmware);
  const options = getOptiosn(data?.data);
  return {
    data,
    isLoading: isMutating,
    trigger,
    options,
  };
}
export { useDeviceSelectModelList, useDeviceFirmawreList, useFirmwareSelectList };
