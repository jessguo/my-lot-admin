import { useState, useEffect } from 'react';
import { Table, TablePaginationConfig, Space, Modal } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ExclamationCircleFilled } from '@ant-design/icons';

import Header from './Filter';
import { initPagination } from '../../config';
import { useRoleList, initFilters, useDeleteRole } from './hooks';
import { columns } from './columns';
import AddModal from './AddModal';
import AuthButton from '@/components/AuthButton';

const { confirm } = Modal;

const Index = () => {
  const [filterData, setFilterData] = useState<any>(initFilters); // 过滤条件
  // 分页
  const [pagination, setPagination] = useState<TablePaginationConfig>(initPagination);
  const [roleId, setRoleId] = useState(null);
  const { trigger, isMutating, data } = useRoleList();
  const { trigger: remove } = useDeleteRole();

  const [open, setOpen] = useState(false);

  // 条件查询
  const handleFilterChange = (values: any) => {
    const palylod = {
      current: 1,
      filters: values,
    };
    setFilterData(values);
    trigger(palylod);
    setPagination(initPagination);
  };

  // 分页
  const handleTableChange = (p: TablePaginationConfig) => {
    const palylod = {
      current: p.current!,
      filters: filterData,
    };
    setPagination(p);
    trigger(palylod);
  };

  const handleAfterAdd = async () => {
    roleId ? getData() : initData();
    setOpen(false);
    setRoleId(null);
  };

  const getData = () => {
    const query = {
      current: pagination?.current || 1,
      filters: filterData,
    };
    trigger(query);
  };

  const initData = () => {
    const query = {
      current: initPagination.current,
      filters: initData,
    };
    setPagination(initPagination);
    trigger(query);
  };

  useEffect(() => {
    initData();
  }, []);

  const handleDetail = (record: any) => {
    setRoleId(record.id);
    setOpen(true);
  };

  const handleCreate = () => {
    setOpen(true);
    setRoleId(null);
  };

  const handleDel = (record: any) => {
    confirm({
      title: '确定删除',
      icon: <ExclamationCircleFilled />,
      content: '请谨慎操作',
      async onOk() {
        const respose = await remove({ id: record.id });
        if (respose?.isSuccess) {
          trigger({
            current: pagination.current!,
            filters: filterData,
          });
        }
      },
    });
  };

  const Actions: ColumnsType<any> = [
    {
      title: '操作',
      key: 'id',
      width: 120,
      align: 'center',
      fixed: 'right',
      render: (_: string, record: any) => {
        return (
          <Space>
            <AuthButton auth="role:update" type="link" onClick={() => handleDetail(record)}>
              编辑角色
            </AuthButton>
            <AuthButton auth="role:delete" disabled={record.type === 2} type="link" danger onClick={() => handleDel(record)}>
              删除角色
            </AuthButton>
          </Space>
        );
      },
    },
  ];

  const ListView = (
    <>
      <Header onRest={initData} onFinish={handleFilterChange} onAdd={handleCreate} />
      <Table rowKey={'id'} loading={isMutating} onChange={handleTableChange} dataSource={data?.data.records ?? []} columns={[...columns, ...Actions]} pagination={{ ...pagination, total: data?.data?.total }} />
      <AddModal roleId={roleId} open={open} onFinish={handleAfterAdd} onCancel={() => setOpen(false)} />
    </>
  );
  return ListView;
};
export default Index;
