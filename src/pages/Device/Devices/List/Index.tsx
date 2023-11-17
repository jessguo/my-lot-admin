import { useState, useEffect } from 'react';
import { Table, TablePaginationConfig, Space } from 'antd';
import { Filters } from '@/api/admin';
import type { ColumnsType } from 'antd/es/table';
import Header from './Filter';
import { initPagination } from '../config';
import { initFilters, useDeviceList } from './hooks';
import { columns } from './columns';
import Info from '../Info/Index';
import Add from './AddModal';
import AddList from './AddListModal';
import AuthButton from '@/components/AuthButton';

const Index = () => {
  const [filterData, setFilterData] = useState<Filters>(initFilters); // 过滤条件
  // 分页
  const [pagination, setPagination] = useState<TablePaginationConfig>(initPagination);
  const [show, setShow] = useState(false);
  const [showListModal, setShowListModal] = useState(false);
  const [info, setInfo] = useState({});
  const { trigger, isMutating, data } = useDeviceList();

  const [open, setOpen] = useState(false);

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
    setOpen(false);
    setShowListModal(false);
    initData();
  };

  const initData = () => {
    const query = {
      current: 1,
      filters: initFilters,
    };
    setFilterData(initFilters);
    setPagination(initPagination);
    trigger(query);
  };

  useEffect(() => {
    initData();
  }, []);
  const handleDetail = (record: any) => {
    setInfo(record);
    setShow(true);
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
            <AuthButton auth="device:create" onClick={() => handleDetail(record)} type="link">
              详情
            </AuthButton>
          </Space>
        );
      },
    },
  ];

  const ListView = (
    <>
      <Header show={show} filter={filterData} onAddList={() => setShowListModal(true)} onRest={() => initData()} onFinish={handleFilterChange} onAdd={() => setOpen(true)} />
      <Table rowKey={'id'} scroll={{}} loading={isMutating} onChange={handleTableChange} dataSource={data?.data.records} columns={[...columns, ...Actions]} pagination={{ ...pagination, total: data?.data?.total }} />
      <Add open={open} onFinish={handleAfterAdd} onCancel={() => setOpen(false)} />
      <AddList open={showListModal} onFinish={handleAfterAdd} onCancel={() => setShowListModal(false)} />
    </>
  );

  return <>{!show ? ListView : <Info onBack={() => setShow(false)} info={info} />}</>;
};
export default Index;
