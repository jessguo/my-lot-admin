import { FC, useEffect, useState } from 'react';
import { Table, TablePaginationConfig, Space, Row, Col, Button, Form, DatePicker, message } from 'antd';
import { post, Api } from '@/api/devcie';
import type { ColumnsType } from 'antd/es/table';
import AuthButton from '@/components/AuthButton';

import locale from 'antd/es/date-picker/locale/zh_CN';
import { logColumns } from './columns';
import { initPagination } from '../config';
import { useCollectorLogList, useDownload } from './hooks';

import { TabsEnum } from './Index';

const { RangePicker } = DatePicker;

interface SProps {
  sn: string | null;
  tab: any;
  id: string | null;
}

const Index: FC<SProps> = ({ sn, tab, id }) => {
  const [form] = Form.useForm();

  const [pagination, setPagination] = useState<TablePaginationConfig>(initPagination);
  const { trigger, isMutating, data } = useCollectorLogList();
  const { trigger: donwload, isMutating: downging } = useDownload();
  const [loading, setLoading] = useState(false);

  const handleTableChange = (p: TablePaginationConfig) => {
    const values = form.getFieldsValue();

    const palylod = {
      current: p.current!,
      sn: sn!,
      filters: {
        startTime: values.time ? values.time?.[0]?.format('YYYY-MM-DD HH:mm:ss') : null,
        endTime: values.time ? values.time?.[1]?.format('YYYY-MM-DD HH:mm::ss') : null,
        cmd: values.cmd,
      },
    };
    setPagination(p);
    trigger(palylod);
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

  const handleSendLog = async () => {
    setLoading(true);
    const response = await post(Api.COLLECTOR_LOG_QUERY, {
      id: id,
    });
    setLoading(false);
    if (response.isSuccess) {
      initData();
      message.success(response.message);
    } else {
      message.error(response.message);
    }
  };
  const handleDownload = async () => {
    const values = form.getFieldsValue();
    donwload({
      filters: values,
      sn,
    });
  };

  const handleSubmit = () => {
    const values = form.getFieldsValue();
    const palylod = {
      current: initPagination.current,
      size: initPagination.pageSize,
      sn: sn!,
      filters: {
        startTime: values.time ? values.time?.[0]?.format('YYYY-MM-DD HH:mm:ss') : null,
        endTime: values.time ? values.time?.[1]?.format('YYYY-MM-DD HH:mm:ss') : null,
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
  useEffect(() => {
    if (tab == TabsEnum.log && sn) {
      initData();
    }
  }, [sn, tab]);
  const Actions: ColumnsType<any> = [];

  return (
    <>
      <Row justify="space-between">
        <Col>
          <Space>
            <Form form={form} onFinish={handleSubmit}>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="time">
                    <RangePicker showTime locale={locale} format={'YYYY-MM-DD: HH:mm'} />
                  </Form.Item>
                </Col>
                {/* <Col span={6}>
                  <Form.Item name="cmd">
                    <Input placeholder="请输入cmd" />
                  </Form.Item>
                </Col> */}
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
            <AuthButton loading={loading} onClick={handleSendLog} auth="collector:log-list:read" type="link">
              drop日志
            </AuthButton>
            <AuthButton loading={downging} onClick={handleDownload} auth="collector:log-export:read" type="link">
              下载
            </AuthButton>
          </Space>
        </Col>
      </Row>
      <Table rowKey={'id'} scroll={{}} loading={isMutating} onChange={handleTableChange} dataSource={data?.data.records} columns={[...logColumns, ...Actions]} pagination={{ ...pagination, total: data?.data?.total, showQuickJumper: true }} />
    </>
  );
};
export default Index;
