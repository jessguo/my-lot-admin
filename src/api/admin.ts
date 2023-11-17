/* eslint-disable no-unused-vars */
import { adminRequest } from '@/api/request';
import { OnlineStatus } from '@/constants/enums';

export interface Filters {
  sn: number | null | string;
  status: OnlineStatus | null | string;
}
export interface ListPaylod {
  current: number | undefined;
  pageSize?: number;
  size?: number;
  filters?: Filters | any;
  sn?: string;
  id?: string;
}

export enum Api {
  DEVICE_LIST = '/device/list',
  DEVICE_INFO = '/device/info',
  DEVICE_SOURCE_DATA_LIST = '/device/source-data-list',
  DEVICE_UNBIND_DEVICE = '/device/unbind-device',
  DEVICE_MODEL_SELECT_LIST = '/device-model/select-list',
  DEVICE_CREATE = '/device/create',
  DEVICE_FIRMWARE_SELECT_LIST = '/device-firmware/select-list',
  DEVICE_MODEL_LIST = 'device-model/list',
  DEVICE_MODEL_UNLOAD_FIRMWARE = '/device-model/unload-firmware',
  DEVICE_MODEL_UPGRADE_FIRMWARE = '/device-model/upgrade-firmware',
  DEVICE_FIRMWARE_LIST = '/device-firmware/list',
  DEVICE_FIRMWARE_CHANGE_ENABLE = '/device-firmware/change-enable',
  DEVICE_FIRMWARE_UPLOAD = '/device-firmware/upload',
  COLLECTOR_LIST = '/collector/list',
  COLLECTOR_IMPORT = '/collector/import',
  COLLECTOR_SOURCE_DATA_LIST = '/collector/source-data-list',
  FIRMWARE_SELECT_LIST = '/firmware/select-list',
  COLLECTOR_MODEL_LIST = '/collector-model/list',
  LIST = '/device/list',
  INFO = '/device/info',
  SOURCED_ATA_LIST = '/source-data-list',
  DEVICE_TASK_LIST = '/device/task-list',
  UNBIND_DEVICE = '/device/unbind-device',
  FIRMWARE_LIST = '/firmware/list',
  FIRMWARE_CHANGE_ENABLE = '/firmware/change-enable',
  FIRMWARE_UPLOAD = '/firmware/upload',
  COLLECTOR_MODEL_SELECT_LIST = '/collector-model/select-list',
  COLLECTOR_CREATE = '/collector/create',
  COLLECTOR_MODEL_UNLOAD_FIRMWARE = '/collector-model/unload-firmware',
  COLLECTOR_MODEL_UPGRADE_FIRMWARE = '/collector-model/upgrade-firmware',
  DEVICE_EXPORT = '/device/export',
  COLLECTOR_EXPORT = '/collector/export',
  DEVICE_IMPORT = '/device/import',
  DEVICE_WARRANTY_EFFECTIVE = '/device/warranty-effective',
  BATTERY_LIST = '/battery/list',
  BATTERY_IMPORT = '/battery/import',
  BATTERY_UNBIND_DEVICE = '/battery/unbind-device',
  BATTERY_BIND_DEVICE = '/battery/bind-device',
  BATTERY_WARRANTY_PERIOD = '/battery/warranty-period',
  DEVICE_MODBUS_TASK_LIST = '/device/modbus-task-list',
  COLLECTOR_LOG_LIST = '/collector/log-list',
  COLLECTOR_LOG_EXPORT = '/collector/log-export',
  DEVICE_SOURCE_DATA = '/device/source-data',
  COLLECTOR_SOURCE_DATA = '/collector/source-data',
  DEVICE_SOURCE_DETAIL_LIST = '/device/source-detail-list',
  COLLECTOR_INFO = '/collector/info',
  ///
  ACCOUNT_LOING = '/account/login',
  ACCOUNT_USER = '/account/user',
  ACCOUNT_MANAGEMENT_CREATE = '/account-management/create',
  ACCOUNT_MANAGEMENT_READ = '/account-management/read',
  ACCOUNT_MANAGEMENT_UPDATE = '/account-management/update',
  ACCOUNT_MANAGEMENT_DELETE = '/account-management/delete',
  ACCOUNT_MANAGEMENT_BIND_ROLE = '/account-management/bind-role',
  ACCOUNT_MANAGEMENT_LIST = '/account-management/list',
  ROLE_CREATE = '/role/create',
  ROLE_READ = '/role/read',
  ROLE_LIST = '/role/list',
  ROLE_SELECT_LIST = '/role/select-list',
  ROLE_UPDATE = '/role/update',
  ROLE_DELETE = '/role/delete',
  PERMISSION_SELECT_LIST = '/permission/select-list',
  DEVICE_ERRORINFOLIST = '/device/errorInfo-List',
}

// Login user接口

export interface InfoPalod {
  id: string;
}

export interface UnbindPalyod {
  id: string | null;
}

export const post = (url: Api, data?: any): Promise<ResProps> => {
  return adminRequest({ url, method: 'post', data: data });
};
const customHeaders = {
  Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  responseType: 'blob',
};
export const downLoad = (url: Api, data?: any): Promise<ResProps> => {
  return adminRequest({ url, method: 'post', data: data, responseType: 'blob', headers: customHeaders });
};
export const login = (data: any): Promise<ResProps> => adminRequest({ url: Api.ACCOUNT_LOING, method: 'POST', data });

export const getUserInfo = () => adminRequest({ url: Api.ACCOUNT_LOING, method: 'GET' });

export default {
  post,
  downLoad,
  login,
  getUserInfo,
};
