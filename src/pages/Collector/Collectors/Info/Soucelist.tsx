import { FC, useEffect, useState } from 'react';
import { Table, TablePaginationConfig, Space, Drawer, Input, Row, Col, Button, Form, DatePicker, Spin } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import AuthButton from '@/components/AuthButton';
import locale from 'antd/es/date-picker/locale/zh_CN';

import { sourceColumns } from './columns';
import { initPagination } from '../config';
import { useCollectorSourceList, useCollectorSourceData } from './hooks';
import RowModal from './RowModal';

import { TabsEnum } from './Index';

const { RangePicker } = DatePicker;

interface SProps {
  sn: string | null;
  tab: any;
}

const Index: FC<SProps> = ({ sn, tab }) => {
  const [form] = Form.useForm();

  const [pagination, setPagination] = useState<TablePaginationConfig>(initPagination);
  const { trigger, isMutating, data } = useCollectorSourceList();
  const { trigger: getCollectorSourceData, isMutating: spanning } = useCollectorSourceData();
  const [decodeOpen, setDecodeOpen] = useState(false);
  const [record, setRecord] = useState('');
  const [darwerTitle, setDarwerTitle] = useState('');
  const [rawModelOPen, setRawModelOPen] = useState(false);

  const handleTableChange = (p: TablePaginationConfig) => {
    const values = form.getFieldsValue();

    const palylod = {
      current: p.current!,
      sn: sn!,
      filters: {
        startTime: values.time ? values.time?.[0]?.format('YYYY-MM-DD HH:mm:ss.SSS') + ' +00:00' : null,
        endTime: values.time ? values.time?.[1]?.format('YYYY-MM-DD HH:mm:ss.SSS') + ' +00:00' : null,
        cmd: values.cmd,
      },
    };
    setPagination(p);
    trigger(palylod);
  };

  const handleDrawer = async (record: any) => {
    const response = await getCollectorSourceData({
      id: record.id,
    });
    setDecodeOpen(true);
    setRecord(JSON.stringify(response!.data, null, 4));
    setDarwerTitle('解析数据');
  };

  const initData = () => {
    const query = {
      current: 1,
      size: 10,
      sn: sn!,
      filters: {},
    };
    setPagination(initPagination);
    trigger(query);
  };

  const handleAfterFinish = () => {
    initData();
    setRawModelOPen(false);
  };
  useEffect(() => {
    if (tab == TabsEnum.souce && sn) {
      initData();
    }
  }, [sn, tab]);

  const handleSubmit = () => {
    const values = form.getFieldsValue();
    const palylod = {
      current: initPagination.current,
      size: initPagination.pageSize,
      sn: sn!,
      filters: {
        startTime: values.time ? values.time?.[0]?.format('YYYY-MM-DD HH:mm:ss.SSS') + ' +00:00' : null,
        endTime: values.time ? values.time?.[1]?.format('YYYY-MM-DD HH:mm:ss.SSS') + ' +00:00' : null,
        cmd: values.cmd,
      },
    };
    setPagination(initPagination);
    trigger(palylod);
  };

  const handleReset = () => {
    form.resetFields();
    initData();
  };
  const Actions: ColumnsType<any> = [
    {
      title: '操作',
      width: 100,
      align: 'center',
      fixed: 'right',
      render: (_: string, record: any) => {
        return (
          <Space>
            <a onClick={() => handleDrawer(record)}>原始消息</a>
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <Row justify="space-between">
        <Col>
          <Space>
            <Form form={form} onFinish={handleSubmit}>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="time">
                    <RangePicker showTime locale={locale} />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="cmd">
                    <Input placeholder="请输入cmd" />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item shouldUpdate>
                    {() => (
                      <Space>
                        <Button type="primary" htmlType="submit">
                          查找
                        </Button>
                        <Button onClick={handleReset}>重置</Button>
                      </Space>
                    )}
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Space>
        </Col>
        <Col>
          <Space>
            <AuthButton auth="collector:send-cmd:create" onClick={() => setRawModelOPen(true)} type="link">
              透传命令
            </AuthButton>
          </Space>
        </Col>
      </Row>
      <Spin spinning={spanning}>
        <Table rowKey={'id'} scroll={{}} loading={isMutating} onChange={handleTableChange} dataSource={data?.data.records} columns={[...sourceColumns, ...Actions]} pagination={{ ...pagination, total: data?.data?.total, showQuickJumper: true }} />
      </Spin>
      <Drawer width="40%" title={darwerTitle} placement="right" onClose={() => setDecodeOpen(false)} open={decodeOpen}>
        <Input.TextArea rows={32} value={record} />
      </Drawer>
      <RowModal onFinish={handleAfterFinish} open={rawModelOPen} onCancel={() => setRawModelOPen(false)} sn={sn || ''} />
    </>
  );
};
export default Index;
