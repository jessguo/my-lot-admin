import { useState, useEffect } from 'react';
import { Table, TablePaginationConfig, Space, Modal } from 'antd';
import { Filters } from '@/api/user';
import type { ColumnsType } from 'antd/es/table';
import { ExclamationCircleFilled } from '@ant-design/icons';

import Header from './Filter';
import { initPagination } from '../../config';
import { initFilter, useUserList, useRoleList, useResetPassword } from './hooks';
import { columns } from './columns';
import AddModal from './AddModal';
import AuthButton from '@/components/AuthButton';

const { confirm } = Modal;

const getRoleOptions = (list: any[]) => {
  if (!list || !list.length) return [];
  return list.map((v: any) => ({
    label: v.name,
    value: v.id,
  }));
};
const Index = () => {
  const [filterData, setFilterData] = useState<Filters>(initFilter); // 过滤条件
  // 分页
  const [pagination, setPagination] = useState<TablePaginationConfig>(initPagination);
  const { trigger, isMutating, data } = useUserList();
  const { trigger: resetPassword } = useResetPassword();
  const { data: res, trigger: getSelect } = useRoleList();
  const options = getRoleOptions(res?.data);

  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState(null);

  // 条件查询
  const handleFilterChange = (values: Filters) => {
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
    userId ? getData() : initData();
    setOpen(false);
  };

  const initData = () => {
    const query = {
      current: initPagination.current,
      filters: initFilter,
    };
    setPagination(initPagination);
    setFilterData(initFilter);
    trigger(query);
  };

  const getData = () => {
    const query = {
      current: pagination.current || 1,
      filters: filterData,
    };
    trigger(query);
  };

  useEffect(() => {
    initData();
    getSelect();
  }, []);

  const handleDetail = (record: any) => {
    setUserId(record.id);
    setOpen(true);
  };

  const handleCreate = () => {
    setOpen(true);
    setUserId(null);
  };

  // const handleDel = (record: any) => {
  //   confirm({
  //     title: '确定删除',
  //     icon: <ExclamationCircleFilled />,
  //     content: '请谨慎操作',
  //     async onOk() {
  //       const respose = await remove({ id: record.id });
  //       if (respose?.isSuccess) {
  //         trigger({
  //           current: pagination.current!,
  //           filters: filterData,
  //         });
  //       }
  //     },
  //   });
  // };

  const handleRest = (record: any) => {
    confirm({
      title: '确定重置密码',
      icon: <ExclamationCircleFilled />,
      content: '请谨慎操作',
      async onOk() {
        const respose = await resetPassword({ id: record.id });
        if (respose?.isSuccess) {
          getData();
        }
      },
    });
  };
  const Actions: ColumnsType<any> = [
    {
      title: '操作',
      key: 'id',
      width: 240,
      align: 'center',
      fixed: 'right',
      render: (_: string, record: any) => {
        return (
          <Space>
            <AuthButton auth="account-management:read" type="link" onClick={() => handleDetail(record)}>
              编辑用户
            </AuthButton>
            <AuthButton auth="account-management:edit" type="link" onClick={() => handleRest(record)}>
              重置密码
            </AuthButton>
            {/* <AuthButton auth="account-management:delete" type="link" danger onClick={() => handleDel(record)}>
              删除用户
            </AuthButton> */}
          </Space>
        );
      },
    },
  ];

  const ListView = (
    <>
      <Header filter={filterData} onRest={initData} roleOptions={options} onFinish={handleFilterChange} onAdd={handleCreate} />
      <Table rowKey={'id'} scroll={{ x: 1600 }} loading={isMutating} onChange={handleTableChange} dataSource={data?.data.records} columns={[...columns, ...Actions]} pagination={{ ...pagination, total: data?.data?.total }} />
      <AddModal roleOptions={options} userId={userId} open={open} onFinish={handleAfterAdd} onCancel={() => setOpen(false)} />
    </>
  );
  return ListView;
};
export default Index;
