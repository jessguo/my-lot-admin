import type { ColumnsType } from 'antd/es/table';

const formatStr = 'YYYY-MM-DD HH:mm';

import dayjs from 'dayjs';

export interface Recod {
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
    width: 260,
  },

  {
    title: '创建时间',
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 160,
    align: 'center',
    render: (_: string, record: any) => dayjs(record['createdAt']).format(formatStr),
  },
  {
    title: '激活日期',
    dataIndex: 'warrantyEffectiveDate',
    key: 'warrantyEffectiveDate',
    width: 160,
    align: 'center',
    render: (text: string) => (text ? dayjs(text).format('YYYY-MM-DD') : '-'),
  },
  {
    title: '保修时长',
    dataIndex: 'warrantyPeriod',
    key: 'warrantyPeriod',
    width: 160,
    align: 'center',
  },
  {
    title: '关联设备',
    dataIndex: 'deviceSn',
    key: 'deviceSn',
    align: 'center',
    width: 260,
  },
  {
    title: '备注信息',
    dataIndex: 'remark',
    key: 'remark',
    width: 220,
    align: 'center',
  },
];
