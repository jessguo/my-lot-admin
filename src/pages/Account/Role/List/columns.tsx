import type { ColumnsType } from 'antd/es/table';

const formatStr = 'YYYY-MM-DD HH:mm';

import dayjs from 'dayjs';

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
    title: '角色名称',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
  },

  {
    title: '创建时间',
    dataIndex: 'createdAt',
    key: 'createdAt',
    align: 'center',
    width: 180,
    render: (_: string, record: any) => dayjs(record['createdAt']).format(formatStr),
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
