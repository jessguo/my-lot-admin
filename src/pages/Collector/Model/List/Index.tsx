import { useState, useEffect } from 'react';
import { Table, TablePaginationConfig, Space, Modal } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ExclamationCircleFilled } from '@ant-design/icons';

import Header from './Filter';
import { initPagination } from '../config';
import { useCollectorModalList, useUnloadFimware } from './hooks';
import { columns } from './columns';
import Push from './Push';
import AuthButton from '@/components/AuthButton';

const { confirm } = Modal;

const Index = () => {
  const [pagination, setPagination] = useState<TablePaginationConfig>(initPagination);
  const [show, setShow] = useState(false);
  const [info, setInfo] = useState({});

  const { trigger, isMutating, data } = useCollectorModalList();
  const { trigger: unlaod } = useUnloadFimware();
  // 分页
  const handleTableChange = (p: TablePaginationConfig) => {
    const palylod = {
      current: p.current!,
    };
    setPagination(p);
    trigger(palylod);
  };

  const handleAfterAdd = async () => {
    setShow(false);
    initData();
  };

  const initData = () => {
    const query = {
      current: 1,
    };
    setPagination(initPagination);
    trigger(query);
  };

  useEffect(() => {
    initData();
  }, []);

  const handleAdd = (record: any) => {
    setInfo(record);
    setShow(true);
  };

  const handleRemove = (record: any) => {
    confirm({
      title: '确定要下架该固件吗?',
      icon: <ExclamationCircleFilled />,
      async onOk() {
        const response = await unlaod({ id: record.id });
        if (response?.isSuccess) {
          initData();
        }
      },
    });
  };
  const Actions: ColumnsType<any> = [
    {
      title: '操作',
      key: 'id',
      width: 200,
      align: 'center',
      fixed: 'right',
      render: (_: string, record: any) => {
        return (
          <Space>
            <AuthButton auth="collector-model:upgrade-firmware:update" type="link" onClick={() => handleAdd(record)}>
              固件上架
            </AuthButton>
            <AuthButton auth="collector-model:unload-firmware:update" type="link" onClick={() => handleRemove(record)}>
              固件下架
            </AuthButton>
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <Header onFinish={initData} />
      <Table rowKey={'id'} scroll={{}} loading={isMutating} onChange={handleTableChange} dataSource={data?.data.records} columns={[...columns, ...Actions]} pagination={{ ...pagination, total: data?.data?.total }} />
      <Push open={show} onFinish={handleAfterAdd} onCancel={() => setShow(false)} info={info} />
    </>
  );
};
export default Index;
