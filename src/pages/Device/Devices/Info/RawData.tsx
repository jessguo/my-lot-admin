import { FC, useEffect, useState } from 'react';
import { Table, TablePaginationConfig, Drawer, Button, Row, Col, Form, Input, Switch, message, Space } from 'antd';
import _ from 'lodash';
import Auth from '@/components/Auth';
import { modbusColumns } from './columns';
import { useModbusTaskList } from './hooks';
import API from '@/api/devcie';
import { UndoOutlined } from '@ant-design/icons';

interface SProps {
  id: string;
  tab: string;
  info: any;
}

export const initPagination: TablePaginationConfig = Object.freeze({ current: 1, pageSize: 10, total: 0, showSizeChanger: false });

const Index: FC<SProps> = ({ id, tab }) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [pagination, setPagination] = useState<TablePaginationConfig>(initPagination);
  const { trigger, isMutating, data } = useModbusTaskList();
  const [loading, setLoading] = useState(false);

  const columns = modbusColumns;

  const handleTableChange = (p: TablePaginationConfig) => {
    const palylod = {
      current: p.current!,
      size: p.pageSize,
      id: id,
    };
    setPagination(p);
    trigger(palylod);
  };

  const initData = () => {
    const palylod = {
      current: 1,
      size: initPagination.pageSize,
      id: id!,
    };
    setPagination(initPagination);
    trigger(palylod);
  };

  const onClose = () => {
    form.resetFields();
    setOpen(false);
  };
  const onFinish = async (values: any) => {
    console.log('values', values);
    setLoading(true);
    const response = await API.sendModeBus({
      id: id,
      sendData: values?.sendData?.trim(),
      transparentMode: values?.transparentMode,
    });
    setLoading(false);
    if (response.isSuccess) {
      message.success('发送成功');
      onClose();
    } else {
      message.error('发送失败');
    }
    initData();
  };

  const handleRefresh = () => {
    initData();
  };

  useEffect(() => {
    if (tab === '5') {
      initData();
    }
  }, [tab]);

  return (
    <div>
      <h2>
        <Row justify={'space-between'}>
          <Col>
            <Space>
              <span>透传指令</span>
              <Button onClick={handleRefresh} icon={<UndoOutlined />}></Button>
            </Space>
          </Col>
          <Col>
            <Space>
              <Auth auth="device:modbus:create">
                <div onClick={() => setOpen(true)}>
                  <svg viewBox="64 64 896 896" focusable="false" data-icon="code" width="2em" height="2em" fill="currentColor" aria-hidden="true">
                    <path d="M516 673c0 4.4 3.4 8 7.5 8h185c4.1 0 7.5-3.6 7.5-8v-48c0-4.4-3.4-8-7.5-8h-185c-4.1 0-7.5 3.6-7.5 8v48zm-194.9 6.1l192-161c3.8-3.2 3.8-9.1 0-12.3l-192-160.9A7.95 7.95 0 00308 351v62.7c0 2.4 1 4.6 2.9 6.1L420.7 512l-109.8 92.2a8.1 8.1 0 00-2.9 6.1V673c0 6.8 7.9 10.5 13.1 6.1zM880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z"></path>
                  </svg>
                </div>
              </Auth>
            </Space>
          </Col>
        </Row>
      </h2>
      <Table scroll={{ y: 500 }} rowKey={'id'} loading={isMutating} onChange={handleTableChange} dataSource={data?.data.records} columns={[...columns]} pagination={{ ...pagination, total: data?.data?.total, showQuickJumper: true, showSizeChanger: true }} />
      <Drawer title="modbus 协议透传" placement={'right'} width={400} onClose={onClose} open={open} maskClosable={true}>
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item label="transparentMode" name="transparentMode">
            <Switch />
          </Form.Item>
          <Form.Item name="sendData" label="sendData" rules={[{ required: true }]}>
            <Input.TextArea showCount rows={6} maxLength={256} />
          </Form.Item>
          <Form.Item>
            <Button block type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};
export default Index;
