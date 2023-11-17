import { useState, useEffect } from 'react';
import { Table, TablePaginationConfig } from 'antd';

import Header from './Filter';
import { initPagination } from '../../config';
import { useNoticeList, initFilters } from './hooks';
import { columns } from './columns';

const Index = () => {
  const [filterData, setFilterData] = useState<any>(initFilters); // 过滤条件
  // 分页
  const [pagination, setPagination] = useState<TablePaginationConfig>(initPagination);
  const { trigger, isMutating, data } = useNoticeList();

  // 条件查询
  const handleFilterChange = (values: any) => {
    const palylod = {
      current: 1,
      filters: values || {},
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

  const initData = () => {
    const query = {
      current: initPagination.current,
      filters: {},
    };
    setPagination(initPagination);
    trigger(query);
  };

  useEffect(() => {
    initData();
  }, []);

  const ListView = (
    <>
      <Header onRest={initData} onFinish={handleFilterChange} />
      <Table scroll={{ x: 1800 }} rowKey={'id'} loading={isMutating} onChange={handleTableChange} dataSource={data?.data.records ?? []} columns={[...columns]} pagination={{ ...pagination, total: data?.data?.total }} />
    </>
  );
  return ListView;
};
export default Index;
