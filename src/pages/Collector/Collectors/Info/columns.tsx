import type { ColumnsType } from 'antd/es/table';
import { dayFormart } from '../config';
import { Tooltip } from 'antd';
import dayjs from 'dayjs';
// import JsonViewer from 'react-json-view';

export interface Recod {
  model: any;
  collector: any;
}

export const sourceColumns: ColumnsType<Recod> = [
  {
    title: '序号',
    width: 80,
    align: 'center',
    render: (_: string, __: any, index: number) => index + 1,
  },

  {
    title: '创建时间',
    dataIndex: 'createdAt',
    key: 'createdAt',
    align: 'center',
    render(text: string) {
      return dayjs(text).format(dayFormart);
    },
  },
  {
    title: 'CMD	',
    dataIndex: 'cmd',
    key: 'cmd',
    align: 'center',
  },
  {
    title: 'mid',
    dataIndex: 'mid',
    key: 'mid',
    align: 'center',
    width: 400,
  },

  {
    title: '时间戳',
    dataIndex: 'timestamp',
    key: 'timestamp',
    align: 'center',
    render(text: string) {
      return dayjs(text).format(dayFormart);
    },
  },
  {
    title: 'Resp',
    dataIndex: 'data.mpmUs',
    key: 'data.mpmUs',
    align: 'center',
    render: (_: string, record: any) => {
      return record?.data?.resp ? 'true' : 'false';
    },
  },
  // {
  //   title: 'Payload',
  //   dataIndex: 'data.payload',
  //   key: 'data.payload',
  //   width: 300,
  //   render(_: any, record: any) {
  //     return record.data?.payload ? <JsonViewer name={null} indentWidth={2} collapsed={1} src={record.data?.payload} /> : '--';
  //   },
  // },
];

export const logColumns: ColumnsType<Recod> = [
  {
    title: '序号',
    width: 80,
    align: 'center',
    render: (_: string, __: any, index: number) => index + 1,
  },
  {
    title: 'index',
    dataIndex: 'index',
    key: 'index',
    align: 'center',
  },
  {
    title: '任务ID',
    dataIndex: 'id',
    key: 'id',
    align: 'center',
    render: (text: string) => <Tooltip title={text}>{`***${text.slice(-5)}`}</Tooltip>,
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    key: 'createdAt',
    align: 'center',
    render(text: string) {
      return text ? dayjs(text).format(dayFormart) : '--';
    },
  },
  {
    title: 'recordName',
    dataIndex: 'recordName',
    key: 'recordName',
    align: 'center',
  },
  {
    title: 'recordValue',
    dataIndex: 'recordValue',
    key: 'recordValue',
    align: 'center',
  },
  {
    title: 'digitalValue',
    dataIndex: 'digitalValue',
    key: 'digitalValue',
    align: 'center',
  },
];
