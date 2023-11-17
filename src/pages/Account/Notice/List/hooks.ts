import API, { ListPaylod, Api } from '@/api/user';
import useSWRMutation from 'swr/mutation';

export const initFilters: any = Object.freeze({
  name: '',
});
export interface SendRequestArgs {
  arg: ListPaylod;
}

export interface SendPostRequestArgs {
  arg: any;
}
export const useNoticeList = () => {
  const fetch = async (url: Api, { arg }: SendRequestArgs): Promise<ResProps> => {
    return API.post(url, { size: 10, ...arg });
  };
  return useSWRMutation(Api.NOTIFICATION_LIST, fetch);
};
