import API, { ListPaylod, Api } from '@/api/admin';
import useSWRMutation from 'swr/mutation';

export interface SendRequestArgs {
  arg: ListPaylod;
}

export const useFirmwareList = () => {
  const fetch = async (url: Api, { arg }: SendRequestArgs): Promise<ResProps> => {
    return API.post(url, { ...arg, size: 10, filters: {} });
  };
  return useSWRMutation(Api.FIRMWARE_LIST, fetch);
};

export const useFilrmwareUpload = () => {
  const submit = async (url: Api, { arg }: { arg: any }): Promise<ResProps> => {
    return API.post(url, arg);
  };
  return useSWRMutation(Api.FIRMWARE_UPLOAD, submit);
};
