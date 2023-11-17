import type { ColumnsType } from 'antd/es/table';
import { Tag } from 'antd';

const formatStr = 'YYYY-MM-DD HH:mm';

import dayjs from 'dayjs';

export interface Recod {
  model: any;
  collector: any;
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
  },
  {
    title: '设备名称',
    dataIndex: 'name',
    width: 180,
    key: 'name',
    align: 'center',
    ellipsis: true,
  },
  {
    title: '设备型号',
    dataIndex: 'model.name',
    width: 120,
    key: 'model.name',
    align: 'center',
    render: (_: string, { model }) => (model ? model['name'] : ''),
  },
  {
    title: '设备状态',
    dataIndex: 'collector.status',
    width: 120,
    key: 'collector.status',
    align: 'center',
    render: (_: string, { collector }) => {
      const status = collector ? collector['status'] : '';
      if (status === 1) return <Tag color="success">在线</Tag>;
      if (status === 2) return <Tag color="warning">离线</Tag>;
      return <Tag>--</Tag>;
    },
  },
  {
    title: '绑定用户',
    dataIndex: 'username',
    key: 'username',
    align: 'center',
  },
  // {
  //   title: '供应商',
  //   dataIndex: 'supplier',
  //   key: 'supplier',
  //   align: 'center',
  //   width: 120,
  // },
  // {
  //   title: '数采器',
  //   dataIndex: 'collector,sn',
  //   key: 'collector.sm',
  //   align: 'center',
  //   render: (_: string, { collector }) => (collector ? collector['sn'] : ''),
  // },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    key: 'createdAt',
    align: 'center',

    render: (_: string, record: any) => dayjs(record['createdAt']).format(formatStr),
  },
  {
    title: '备注信息',
    dataIndex: 'remark',
    key: 'remark',
    align: 'center',
    ellipsis: true,
    render: (text) => <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>{text}</div>,
  },
];
