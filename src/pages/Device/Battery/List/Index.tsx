import { useState, useEffect } from 'react';
import { Table, TablePaginationConfig, Space, Modal, Input, Form, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import AuthButton from '@/components/AuthButton';
import { ExclamationCircleFilled } from '@ant-design/icons';
import Header from './Filter';
import { initPagination } from '../config';
import { userBatteryList, initFilters, useUnbindDeviceBattery, useBindDeviceBattery, useUpdateWarrantyPeriod } from './hooks';
import { columns } from './columns';
import Upload from './Upload';
const { confirm } = Modal;

interface Filters {
  sn: string;
}

const Index = () => {
  const [pagination, setPagination] = useState<TablePaginationConfig>(initPagination);
  const [show, setShow] = useState(false);
  const [filterData, setFilterData] = useState<Filters>(initFilters); // 过滤条件
  const { trigger, isMutating, data } = userBatteryList();
  const { trigger: unBind } = useUnbindDeviceBattery();
  const { trigger: bind } = useBindDeviceBattery();
  const { trigger: update } = useUpdateWarrantyPeriod();
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
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
    setShow(false);
    initData();
  };

  const initData = () => {
    const query = {
      current: 1,
      filters: initFilters,
    };
    setPagination(initPagination);
    setFilterData(initFilters);
    trigger(query);
  };
  const handleFilterChange = (values: Filters) => {
    const palylod = {
      current: 1,
      filters: values,
    };
    setFilterData(values);
    trigger(palylod);
    setPagination(initPagination);
  };

  useEffect(() => {
    initData();
  }, []);

  const handleUpload = () => {
    setShow(true);
  };

  const handleUnbild = (record: any) => {
    confirm({
      title: '该操作会解绑设备和电池?',
      icon: <ExclamationCircleFilled />,
      async onOk() {
        const response = await unBind({
          sn: record.sn,
        });
        if (response?.isSuccess) {
          const palylod = {
            current: pagination.current,
            filters: filterData,
          };
          trigger(palylod);
        }
      },
    });
  };

  const openBind = (record: any) => {
    setOpen(true);
    setSelectedItem(record);
  };

  const handleFinish = async (values: any) => {
    if (!selectedItem) return;
    const response = await bind({
      sn: values.sn,
      email: values.email,
      batterySNs: [selectedItem.sn],
    });
    if (response?.isSuccess) {
      const palylod = {
        current: pagination.current,
        filters: filterData,
      };
      trigger(palylod);
      setOpen(false);
    }
  };

  const handleCancel = () => {
    setOpen(false);
    selectedItem(null);
  };

  const extendDay = (record: any) => {
    confirm({
      title: '电池将延长质保时间为15年!',
      icon: <ExclamationCircleFilled />,
      async onOk() {
        const response = await update({
          sn: record.sn,
          warrantyPeriod: 15,
        });
        if (response?.isSuccess) {
          const palylod = {
            current: pagination.current,
            filters: filterData,
          };
          trigger(palylod);
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
            {record.deviceSn ? (
              <AuthButton auth="battery:bind-device:create" onClick={() => handleUnbild(record)} type="link">
                解绑设备
              </AuthButton>
            ) : (
              <AuthButton auth="battery:unbind-device:create" onClick={() => openBind(record)} type="link">
                绑定设备
              </AuthButton>
            )}
            {record.warrantyPeriod === 10 ? (
              <AuthButton auth="battery:unbind-device:create" onClick={() => extendDay(record)} type="link">
                延长质保
              </AuthButton>
            ) : (
              <Button disabled={true} type="link">
                {record.warrantyPeriod > 10 ? '已经延保' : '未激活'}
              </Button>
            )}
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <Header onRest={() => initData()} onFinish={handleFilterChange} onUpload={handleUpload} />
      <Table scroll={{}} rowKey={'id'} loading={isMutating} onChange={handleTableChange} dataSource={data?.data.records} columns={[...columns, ...Actions]} pagination={{ ...pagination, total: data?.data?.total }} />
      <Upload open={show} onFinish={handleAfterAdd} onCancel={() => setShow(false)} />
      <Modal
        title="绑定电池"
        open={open}
        onCancel={handleCancel}
        destroyOnClose={true}
        footer={[
          <Button key={'1'} onClick={handleCancel}>
            取消
          </Button>,
          <Button key={'2'} type="primary" loading={isMutating} form="bindSn" htmlType="submit">
            提交
          </Button>,
        ]}>
        <Form preserve={false} name="bindSn" onFinish={handleFinish}>
          <Form.Item
            name="email"
            label="用户邮箱"
            rules={[
              { required: true, message: '请输入用户邮箱' },
              { type: 'email', message: '邮箱格式有误' },
            ]}>
            <Input placeholder="请输入邮箱" />
          </Form.Item>
          <Form.Item
            name="sn"
            label="逆变器sn"
            rules={[
              { required: true, message: 'SN不能为空' },
              {
                pattern: /^[A-Za-z\d]{16}$/,
                message: 'SN格式有误',
              },
            ]}>
            <Input placeholder="请输入16位SN" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default Index;
