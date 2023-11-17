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
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    key: 'createdAt',
    align: 'center',
    // width: 240,

    render: (_: string, record: any) => dayjs(record['createdAt']).format(formatStr),
  },
  {
    title: '活跃固件',
    dataIndex: 'firmware.name',
    key: 'firmware.name',
    align: 'center',
    render: (_: string, { firmware }) => (firmware ? firmware['name'] : ''),
  },
  {
    title: '固件版本',
    dataIndex: 'collector.status',
    width: 120,
    key: 'collector.status',
    align: 'center',
    render: (_: string, { firmware }) => (firmware ? firmware['version'] : ''),
  },
  {
    title: '备注信息',
    dataIndex: 'remark',
    key: 'remark',
    align: 'center',
    width: 120,
  },
];
