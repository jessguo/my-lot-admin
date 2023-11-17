import { useState, useEffect } from 'react';
import { Table, TablePaginationConfig, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Filters } from '@/api/admin';
import type { ColumnsType } from 'antd/es/table';
import Header from './Filter';
import { initPagination } from '../config';
import { initFilter, useCollectorList } from './hooks';
import { columns } from './columns';
import Info from '../Info/Index';
import Add from './AddModal';
import Upgreade from './Upgreade';
import { useSearchParams } from 'react-router-dom';
import AuthButton from '@/components/AuthButton';
import AddList from './AddListModal';

const Index = () => {
  const navigate = useNavigate();

  const [filterData, setFilterData] = useState<Filters>(initFilter); // 过滤条件
  const [searchParams] = useSearchParams();
  const collectorSn = searchParams.get('collectorSn');
  const collectorId = searchParams.get('collectorId');

  // 分页
  const [pagination, setPagination] = useState<TablePaginationConfig>(initPagination);
  const [show, setShow] = useState(false);
  const [info, setInfo] = useState(null);
  const [sn, setSn] = useState(null) as any;
  const [id, setId] = useState(null) as any;

  const { trigger, isMutating, data } = useCollectorList();

  const [open, setOpen] = useState(false);
  const [openUpgrade, setOpenUpgrade] = useState(false);
  const [showListModal, setShowListModal] = useState(false);

  // 条件查询
  const handleFilterChange = (values: Filters) => {
    const palylod = {
      current: initPagination.current,
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
      current: initPagination.current,
      filters: initFilter,
    };
    setFilterData(initFilter);
    setPagination(initPagination);
    trigger(query);
  };

  useEffect(() => {
    initData();
  }, []);

  useEffect(() => {
    if (collectorSn || collectorId) {
      setSn(collectorSn);
      setId(collectorId);
      setShow(true);
    }
  }, [collectorSn, collectorId]);
  const handleDetail = (record: any) => {
    setInfo(record);
    setSn(record.sn);
    setId(record.id);
    setShow(true);
  };

  const handleUpgreade = (record: any) => {
    setInfo(record);
    setOpenUpgrade(true);
  };

  const handleFaterUpgreade = () => {
    setOpenUpgrade(false);
    initData();
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
            {/* <a >详情</a> */}
            <AuthButton auth="collector:source-detail-list:read" type="link" onClick={() => handleDetail(record)}>
              详情
            </AuthButton>
            <AuthButton auth="collector:firmware-upgrade:create" type="link" onClick={() => handleUpgreade(record)}>
              固件升级
            </AuthButton>
          </Space>
        );
      },
    },
  ];

  const ListView = (
    <>
      <Header onAddList={() => setShowListModal(true)} show={show} filter={filterData} onRest={initData} onFinish={handleFilterChange} onAdd={() => setOpen(true)} />
      <Table rowKey={'id'} scroll={{ x: 2200 }} loading={isMutating} onChange={handleTableChange} dataSource={data?.data.records} columns={[...columns, ...Actions]} pagination={{ ...pagination, total: data?.data?.total }} />
      <Add open={open} onFinish={handleAfterAdd} onCancel={() => setOpen(false)} />
      <Upgreade onFinish={handleFaterUpgreade} open={openUpgrade} info={info} onCancel={() => setOpenUpgrade(false)} />
      <AddList open={showListModal} onFinish={handleAfterAdd} onCancel={() => setShowListModal(false)} />
    </>
  );

  return (
    <>
      {!show ? (
        ListView
      ) : (
        <Info
          onBack={() => {
            setShow(false);
            setSn(null);
            setId(null);
            navigate('/collector/list');
          }}
          sn={sn}
          id={id}
        />
      )}
    </>
  );
};
export default Index;
