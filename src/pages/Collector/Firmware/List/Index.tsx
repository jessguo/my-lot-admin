import { useState, useEffect } from 'react';
import { Table, TablePaginationConfig, Space, message, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import AuthSwitch from '@/components/AuthSwitch';
import API, { Api } from '@/api/admin';
import Header from './Filter';
import { initPagination } from '../config';
import { useFirmwareList } from '../hooks';
import { columns } from './columns';
import Upload from './Upload';

const Index = () => {
  const [pagination, setPagination] = useState<TablePaginationConfig>(initPagination);
  const [show, setShow] = useState(false);

  const { trigger, isMutating, data } = useFirmwareList();
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

  const handleAbleChange = async (record: any) => {
    const response = await API.post(Api.FIRMWARE_CHANGE_ENABLE, { enable: !record.enable, id: record.id });
    if (response.isSuccess) {
      message.success('修改成功');
      const palylod = {
        current: pagination.current!,
      };
      trigger(palylod);
    }
  };

  const handleUpload = () => {
    setShow(true);
  };

  const Actions: ColumnsType<any> = [
    {
      title: '启用状态',
      key: 'enable',
      width: 90,
      align: 'center',
      fixed: 'right',
      render: (text: any, record: any) => {
        return (
          <Space>
            <AuthSwitch auth="firmware:change-enable:update" checkedChildren="开启" unCheckedChildren="关闭" checked={text.enable} onChange={() => handleAbleChange(record)} />
          </Space>
        );
      },
    },
    {
      title: '操作',
      key: 'id',
      width: 90,
      align: 'center',
      fixed: 'right',
      render: (_: string, record: any) => {
        return (
          <Space>
            <Button type="link" href={record.url}>
              下载
            </Button>
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <Header onFinish={initData} onUpload={handleUpload} />
      <Table rowKey={'id'} scroll={{ x: 1200 }} loading={isMutating} onChange={handleTableChange} dataSource={data?.data.records} columns={[...columns, ...Actions]} pagination={{ ...pagination, total: data?.data?.total }} />
      <Upload open={show} onFinish={handleAfterAdd} onCancel={() => setShow(false)} />
    </>
  );
};
export default Index;
