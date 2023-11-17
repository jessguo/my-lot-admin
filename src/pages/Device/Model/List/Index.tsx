import { useState, useEffect } from 'react';
import { Table, TablePaginationConfig, Space, Modal } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ExclamationCircleFilled } from '@ant-design/icons';
import AuthButton from '@/components/AuthButton';

import Header from './Filter';
import { initPagination } from '../config';
import { usegetDeviceModelList, useUnloadFimware } from './hooks';
import { columns } from './columns';
import Push from './PushModal';

const { confirm } = Modal;

const Index = () => {
  const [pagination, setPagination] = useState<TablePaginationConfig>(initPagination);
  const [show, setShow] = useState(false);
  const [info, setInfo] = useState({});

  const { trigger, isMutating, data } = usegetDeviceModelList();
  const { trigger: unload } = useUnloadFimware();
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
        await unload({ id: record.id });
        initData();
      },
    });
  };
  const Actions: ColumnsType<any> = [
    {
      title: '操作',
      key: 'id',
      width: 180,
      align: 'center',
      fixed: 'right',
      render: (_: string, record: any) => {
        return (
          <Space>
            <AuthButton auth="device-model:upgrade-firmware:update" onClick={() => handleAdd(record)} type="link">
              固件上架
            </AuthButton>
            <AuthButton auth="device-model:unload-firmware:update" onClick={() => handleRemove(record)} type="link">
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
