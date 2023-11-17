import type { ColumnsType } from 'antd/es/table';

import dayjs from 'dayjs';

export interface Recod {
  model: any;
  collector: any;
  firmware: any;
}
const dayFormart = 'YYYY/MM/DD HH:mm:ss';

export const columns: ColumnsType<Recod> = [
  {
    title: '序号',
    dataIndex: 'id',
    width: 80,
    align: 'center',
    render: (_: string, __: any, index: number) => index + 1,
  },
  {
    title: '用户名称',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
  },
  {
    title: '昵称',
    dataIndex: 'nickname',
    key: 'nickname',
    align: 'center',
  },
  {
    title: '用户账号',
    dataIndex: 'username',
    key: 'username',
    align: 'center',
  },
  {
    title: '用户角色',
    dataIndex: 'roleList',
    key: 'roleList',
    align: 'center',
    render(text: any[]) {
      return text && text.map((v) => v?.name).join(',');
    },
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
    title: '上次登陆',
    dataIndex: 'lastActiveAt',
    key: 'lastActiveAt',
    align: 'center',
    render(text: string) {
      return dayjs(text).format(dayFormart);
    },
  },
  {
    title: '备注信息',
    dataIndex: 'remark',
    key: 'remark',
    align: 'center',
  },
];
