/* eslint-disable no-unused-vars */
import { deviceRequest } from '@/api/request';

export enum Api {
  DEVICE_SENDCMD = '/device/send-cmd',
  DEVICE_FIRMWAREUPGRADE = '/device/firmware-upgrade',
  COLLECTOR_FIRMWAREUPGRADE = 'collector/firmware-upgrade',
  COLLECTOR_SEND_CMD = '/collector/send-cmd',
  MPM_SEND_CMD = '/mpm/send-cmd',
  MPM_SEND_MODEL = 'mpm/send-model',
  MPM_MODBUS = '/mpm/modbus',
  COLLECTOR_LOG_QUERY = '/mpm/log-query',
}
export interface UpgradeFirmwarePaylod {
  firmwareId: string;
  sn: string;
}
// Login user接口

export interface Paylod {
  id: string | null;
  cmd: string;
  state?: string;
  key?: string;
}
export const sendCMD = (data: Paylod): Promise<ResProps> => deviceRequest({ url: Api.DEVICE_SENDCMD, method: 'post', data });
export const sendMPMCMD = (data: any): Promise<ResProps> => deviceRequest({ url: Api.MPM_SEND_CMD, method: 'post', data });
export const upgradeFirmware = (url: Api, data: UpgradeFirmwarePaylod): Promise<ResProps> => deviceRequest({ url, method: 'post', data });
export const upgradeCollectorFirmware = (url: Api, data: any): Promise<ResProps> => deviceRequest({ url, method: 'post', data });
export const post = (url: Api, data?: any): Promise<ResProps> => deviceRequest({ url, method: 'post', data: data });
export const sendMpmMode = (data?: any): Promise<ResProps> => deviceRequest({ url: Api.MPM_SEND_MODEL, method: 'post', data: data });
export const sendModeBus = (data?: any): Promise<ResProps> => deviceRequest({ url: Api.MPM_MODBUS, method: 'post', data: data });

export default {
  sendCMD,
  sendMPMCMD,
  upgradeFirmware,
  upgradeCollectorFirmware,
  sendMpmMode,
  post,
  sendModeBus,
};
