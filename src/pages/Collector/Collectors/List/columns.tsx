import type { ColumnsType } from 'antd/es/table';
import { Tag } from 'antd';

const formatStr = 'YYYY-MM-DD HH:mm';

import dayjs from 'dayjs';
import { isBoolean } from 'lodash';

export interface Recod {
  model: any;
  collector: any;
  firmware: any;
}

export const columns: ColumnsType<Recod> = [
  {
    title: '序号',
    dataIndex: 'id',
    width: 80,
    align: 'center',
    render: (_: string, __: any, index: number) => index + 1,
  },
  {
    title: 'SN',
    dataIndex: 'sn',
    key: 'sn',
    align: 'center',
    width: 180,
  },
  {
    title: '设备型号',
    dataIndex: 'model.name',
    width: 180,
    key: 'model.name',
    align: 'center',
    render: (_: string, { model }) => (model ? model['name'] : ''),
  },
  {
    title: '设备状态',
    dataIndex: 'status',
    width: 120,
    key: '.status',
    align: 'center',
    render: (text: number, _: any) => {
      const status = text;
      if (status === 1) return <Tag color="success">在线</Tag>;
      if (status === 2) return <Tag color="warning">离线</Tag>;
      return <Tag>--</Tag>;
    },
  },

  {
    title: '固件版本',
    dataIndex: 'firmwareVersion',
    key: 'firmwareVersion',
    align: 'center',
    width: 120,
  },
  {
    title: '升级固件',
    dataIndex: 'firmware.name',
    key: 'firmware.name',
    align: 'center',
    width: 120,
    render: (_: string, { firmware }) => (firmware ? firmware['name'] : ''),
  },
  {
    title: '强制升级',
    dataIndex: 'targetFirmwareUpdateForce',
    key: 'targetFirmwareUpdateForce',
    align: 'center',
    width: 120,
    render: (text: any) => {
      return isBoolean(text) ? (text ? '是' : '否') : '--';
    },
  },
  {
    title: 'MAC地址',
    dataIndex: 'macAddress',
    key: 'macAddress',
    align: 'center',
  },

  {
    title: '创建时间',
    dataIndex: 'createdAt',
    key: 'createdAt',
    align: 'center',
    width: 180,
    render: (text: string) => (text ? dayjs(text).format(formatStr) : '--'),
  },

  {
    title: '上次活跃',
    dataIndex: 'lastActiveAt',
    key: 'lastActiveAt',
    align: 'center',
    width: 180,
    render: (text: string) => (text ? dayjs(text).format(formatStr) : '--'),
  },
  {
    title: '上线时间',
    dataIndex: 'lastOnlineAt',
    key: 'lastOnlineAt',
    align: 'center',
    width: 180,
    render: (text: string) => (text ? dayjs(text).format(formatStr) : '--'),
  },
  {
    title: '离线时间',
    dataIndex: 'lastOfflineAt',
    key: 'lastOfflineAt',
    align: 'center',
    width: 180,
    render: (text: string) => (text ? dayjs(text).format(formatStr) : '--'),
  },
  {
    title: '备注信息',
    dataIndex: 'remark',
    key: 'remark',
    align: 'center',
    width: 120,
    render: (text) => <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>{text}</div>,
  },
];
