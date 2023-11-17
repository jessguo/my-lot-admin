import { FC, useEffect, useState } from 'react';
import { Table, TablePaginationConfig } from 'antd';

import { orderColumns_mpu, orderColumns_mpe } from './columns';
import { useSourceDetailList } from './hooks';
import _ from 'lodash';
export const initPagination: TablePaginationConfig = Object.freeze({ current: 1, pageSize: 10, total: 0, showSizeChanger: false });
import dayjs from 'dayjs';
import { dayFormart } from '../config';

interface SProps {
  sn: string;
  tab: string;
  info: any;
}

const tabMap = new Map([
  ['mpu', orderColumns_mpu],
  ['mpe', orderColumns_mpe],
  ['mpm', []],
]);
const Index: FC<SProps> = ({ sn, tab, info }) => {
  const [pagination, setPagination] = useState<TablePaginationConfig>(initPagination);
  const { trigger, isMutating, data } = useSourceDetailList();
  const deviceType = info?.data?.model?.name;
  const columns = tabMap.get(deviceType) || [];
  if (deviceType === 'mpm') {
    const realtimeData = _.get(info, 'data.shadow.shadow.state.realtimeData');
    if (realtimeData) {
      const mpmColumns = Object.keys(realtimeData).map((key) => {
        return {
          title: key,
          dataIndex: ['data', 'mpmUs', 'realtimeData', key],
          key: key,
          align: 'center',
          render(text: string) {
            return text ?? '-';
          },
        };
      });
      tabMap.set('mpm', [
        {
          title: '时间',
          dataIndex: 'timestamp',
          key: 'timestamp',
          align: 'center',
          width: 300,
          render: (text: string) => <span style={{ whiteSpace: 'nowrap' }}>{text && dayjs(text).format(dayFormart)}</span>,
        },
        ...mpmColumns,
      ]);
    }
  }
  if (!tabMap.has(deviceType)) return <div>设备类型不支持</div>;
  const handleTableChange = (p: TablePaginationConfig) => {
    const palylod = {
      current: p.current!,
      size: p.pageSize,
      sn: sn!,
    };
    setPagination(p);
    trigger(palylod);
  };

  const initData = () => {
    const palylod = {
      current: 1,
      size: initPagination.pageSize,
      sn: sn!,
    };
    setPagination(initPagination);
    trigger(palylod);
  };

  useEffect(() => {
    if (tab === '4') {
      initData();
    }
  }, [tab]);

  return (
    <>
      <Table rowKey={'id'} scroll={{ x: 3200 }} loading={isMutating} onChange={handleTableChange} dataSource={data?.data.records} columns={[...columns]} pagination={{ ...pagination, total: data?.data?.total, showQuickJumper: true, showSizeChanger: true }} />
    </>
  );
};
export default Index;
