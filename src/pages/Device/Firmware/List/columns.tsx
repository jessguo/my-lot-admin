import type { ColumnsType } from 'antd/es/table';
import { Statistic } from 'antd';
import { EllipText } from '@/components/index';

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
    width: 260,
  },
  {
    title: '类型',
    dataIndex: 'type',
    key: 'type',
    width: 80,
    align: 'center',
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
    title: '固件版本',
    dataIndex: 'version',
    key: 'version',
    width: 120,
    align: 'center',
  },

  {
    title: '固件序号',
    dataIndex: 'versionNumber',
    key: 'versionNumber',
    width: 120,
    align: 'center',
  },
  {
    title: '固件大小（KB）',
    dataIndex: 'size',
    key: 'size',
    align: 'center',
    width: 180,

    render: (text: number) => <Statistic precision={1} valueStyle={{ fontSize: 12, fontWeight: 'normal' }} value={text / 1024} />,
  },
  {
    title: '固件md5',
    dataIndex: 'md5',
    key: 'md5',
    align: 'center',
    render: (text: string) => <EllipText text={text} />,
    width: 120,
  },
  {
    title: '固件sha256',
    dataIndex: 'sha256',
    key: 'sha256',
    align: 'center',
    width: 120,

    render: (text: string) => <EllipText text={text} />,
  },
  {
    title: '备注信息',
    dataIndex: 'remark',
    key: 'remark',
    width: 220,
    align: 'center',
  },
];
