import type { ColumnsType } from 'antd/es/table';

const formatStr = 'YYYY-MM-DD HH:mm';
import JsonViewer from 'react-json-view';
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
    title: 'messageData',
    dataIndex: 'messageData',
    key: 'messageData',
    render(text: any) {
      return text ? <JsonViewer name={null} indentWidth={2} collapsed={0} src={text} /> : '--';
    },
  },
  {
    title: 'clientType',
    dataIndex: 'clientType',
    key: 'clientType',
    align: 'center',
  },
  {
    title: 'status',
    dataIndex: 'status',
    key: 'status',
    align: 'center',
  },
  {
    title: 'messageType',
    dataIndex: 'messageType',
    key: 'messageType',
    align: 'center',
  },
  {
    title: 'responseData',
    dataIndex: 'responseData',
    key: 'responseData',
    width: 160,
    render(text: any) {
      return text ? text : '--';
    },
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
    title: '更新时间',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    align: 'center',
    width: 180,
    render: (_: string, record: any) => dayjs(record['createdAt']).format(formatStr),
  },
];
