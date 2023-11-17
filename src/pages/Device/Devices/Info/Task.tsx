import { FC, useEffect, useState } from 'react';
import { Table, TablePaginationConfig, Space, Drawer, Input, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { UndoOutlined } from '@ant-design/icons';

import { taskColumns } from './columns';
import { useTaskList } from './hooks';
export const initPagination: TablePaginationConfig = Object.freeze({ current: 1, pageSize: 10, total: 0, showSizeChanger: false });

interface IProps {
  id: string;
  tab: string;
}

const Index: FC<IProps> = ({ id, tab }) => {
  const [pagination, setPagination] = useState<TablePaginationConfig>(initPagination);
  const { trigger, isMutating, data } = useTaskList(); // 被动拉去数据
  const [decodeOpen, setDecodeOpen] = useState(false); // 解码弹窗
  const [record, setRecord] = useState('');
  const [darwerTitle, setDarwerTitle] = useState('');

  // 换页
  const handleTableChange = (p: TablePaginationConfig) => {
    const palylod = {
      current: p.current!,
      size: p.pageSize,
      id: id,
    };
    setPagination(p);
    trigger(palylod);
  };

  // 操作
  const handleAciton = (record: any, type: string) => {
    setDecodeOpen(true);
    if (type === 'source') {
      setDarwerTitle('下发数据');
      setRecord(JSON.stringify(record.sourceData, null, 4));
    } else {
      setDarwerTitle('结果数据');
      setRecord(JSON.stringify(record?.resultData, null, 4));
    }
  };

  const initData = () => {
    const palylod = {
      id: id,
      size: initPagination.pageSize,
      current: initPagination.current,
    };
    setPagination((p) => ({ ...p, current: 1 }));
    trigger(palylod);
  };
  const handleRefresh = () => {
    const palylod = {
      id: id,
      size: pagination.pageSize,
      current: initPagination.current,
    };
    setPagination((p) => ({ ...p, current: 1 }));
    trigger(palylod);
  };
  useEffect(() => {
    if (tab === '3') {
      initData();
    }
  }, [tab]);

  const header = (
    <>
      <Space>
        <span> 操作</span>
        <Button onClick={handleRefresh} icon={<UndoOutlined />}></Button>
      </Space>
    </>
  );

  const Actions: ColumnsType<any> = [
    {
      title: header,
      width: 200,
      align: 'center',
      fixed: 'right',
      render: (_: string, record: any) => {
        return (
          <Space>
            <a onClick={() => handleAciton(record, 'source')}>下发数据</a>
            <a onClick={() => handleAciton(record, 'result')}>结果数据</a>
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <Table rowKey={'id'} scroll={{}} loading={isMutating} onChange={handleTableChange} dataSource={data?.data.records} columns={[...taskColumns, ...Actions]} pagination={{ ...pagination, total: data?.data?.total, showQuickJumper: true, showSizeChanger: true }} />
      <Drawer width="40%" title={darwerTitle} placement="right" onClose={() => setDecodeOpen(false)} open={decodeOpen}>
        <Input.TextArea rows={32} value={record} />
      </Drawer>
    </>
  );
};
export default Index;
