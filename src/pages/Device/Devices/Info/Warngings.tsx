import { FC, useEffect, useState } from 'react';
import { Table, TablePaginationConfig, Space, Button, Row, Col, Form, DatePicker, Input } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import locale from 'antd/es/date-picker/locale/zh_CN';

import { errorColunms } from './columns';
import { userErrorList } from './hooks';
export const initPagination: TablePaginationConfig = Object.freeze({ current: 1, pageSize: 10, total: 0, showSizeChanger: false });
const { RangePicker } = DatePicker;

interface SProps {
  sn?: string;
  tab: string;
  id: string;
}

const Index: FC<SProps> = ({ tab, id }) => {
  const [form] = Form.useForm();

  const [pagination, setPagination] = useState<TablePaginationConfig>(initPagination);
  const { trigger, isMutating, data } = userErrorList();

  const handleTableChange = (p: TablePaginationConfig) => {
    const values = form.getFieldsValue();
    const palylod = {
      current: p.current!,
      size: p.pageSize,
      id: id,
      filters: {
        ...values,
        startTime: values.time ? values.time?.[0]?.format('YYYY-MM-DD HH:mm:ss') : null,
        endTime: values.time ? values.time?.[1]?.format('YYYY-MM-DD HH:mm:ss') : null,
      },
    };
    setPagination(p);
    trigger(palylod);
  };

  const initData = () => {
    const palylod = {
      current: 1,
      size: initPagination.pageSize,
      filters: {},
      id: id,
    };
    setPagination(initPagination);
    trigger(palylod);
  };
  useEffect(() => {
    if (tab === '6') {
      initData();
    }
  }, [tab]);

  const handleSubmit = () => {
    const values = form.getFieldsValue();
    const palylod = {
      current: pagination.current,
      size: pagination.pageSize,
      id: id,
      filters: {
        ...values,
        startTime: values.time ? values.time?.[0]?.format('YYYY-MM-DD HH:mm:ss') : null,
        endTime: values.time ? values.time?.[1]?.format('YYYY-MM-DD HH:mm:ss') : null,
      },
    };
    trigger(palylod);
  };

  const handleReset = () => {
    form.resetFields();
    initData();
  };

  const Actions: ColumnsType<any> = [];
  const FilterHeader = (
    <Row justify={'space-between'}>
      <Col flex={1}>
        <Form form={form} onFinish={handleSubmit}>
          <Row gutter={16}>
            <Col span={5}>
              <Form.Item name="time">
                <RangePicker showTime locale={locale} />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name="code">
                <Input placeholder="请输入code" />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name="content">
                <Input placeholder="请输入content" />
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
      </Col>
    </Row>
  );

  return (
    <>
      {FilterHeader}
      <Table rowKey={'id'} scroll={{}} loading={isMutating} onChange={handleTableChange} dataSource={data?.data.records} columns={[...errorColunms, ...Actions]} pagination={{ ...pagination, total: data?.data?.total, showQuickJumper: true }} />
    </>
  );
};
export default Index;
