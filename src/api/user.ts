/* eslint-disable no-unused-vars */
import { accountRequest } from '@/api/request';
import { OnlineStatus } from '@/constants/enums';

export enum Api {
  ACCOUNT_GET_CAPTCHA = '/account/get-captcha',
  ACCOUNT_RESET_PASSWORD = '/account/reset-password',
  SYS_ACCOUNT_STATUS_EDIT = '/account/status/edit',
  ACCOUNT_MANAGEMENT_RESET_PASSWORD = '/account-management/reset-password',
  APP_VERSION = '/app/version',
  NOTIFICATION_LIST = '/notification/list',
}

export interface Filters {
  sn: number | null | string;
  status: OnlineStatus | null | string;
}
export interface Filters {
  sn: number | null | string;
  status: OnlineStatus | null | string;
}
export interface ListPaylod {
  current: number | undefined;
  pageSize?: number;
  filters?: Filters | any;
  sn?: string;
  id?: string;
}

export const post = (url: Api, data?: any): Promise<ResProps> => accountRequest({ url, method: 'post', data: data });

export default {
  post,
};
