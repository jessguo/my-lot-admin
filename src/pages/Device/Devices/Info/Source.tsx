import { FC, useEffect, useState } from 'react';
import { Table, TablePaginationConfig, Space, Drawer, Input, Button, Row, Col, Form, DatePicker, Spin } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import locale from 'antd/es/date-picker/locale/zh_CN';

import { sourceColumns } from './columns';
import { useDeviceSourceList, useSourceData } from './hooks';
export const initPagination: TablePaginationConfig = Object.freeze({ current: 1, pageSize: 10, total: 0, showSizeChanger: false });
const { RangePicker } = DatePicker;

interface SProps {
  sn: string;
  tab: string;
}

const Index: FC<SProps> = ({ sn, tab }) => {
  const [form] = Form.useForm();

  const [pagination, setPagination] = useState<TablePaginationConfig>(initPagination);
  const { trigger, isMutating, data } = useDeviceSourceList();
  const { trigger: getSourceData, isMutating: loading } = useSourceData();
  const [decodeOpen, setDecodeOpen] = useState(false);
  const [record, setRecord] = useState('');
  const [darwerTitle, setDarwerTitle] = useState('');

  const handleTableChange = (p: TablePaginationConfig) => {
    const values = form.getFieldsValue();
    const palylod = {
      current: p.current!,
      size: p.pageSize,
      sn: sn!,
      filters: {
        startTime: values.time ? values.time?.[0]?.format('YYYY-MM-DD HH:mm:ss.SSS') + ' +00:00' : null,
        endTime: values.time ? values.time?.[1]?.format('YYYY-MM-DD HH:mm:ss.SSS') + ' +00:00' : null,
      },
    };
    setPagination(p);
    trigger(palylod);
  };

  const handleDrawer = async (record: any, type: string) => {
    if (type === 'decode') {
      const response = await getSourceData({
        id: record.id,
      });
      setRecord(JSON.stringify(response!.data, null, 4));
      setDarwerTitle('解析数据');
    } else if (type === 'rowData') {
      setRecord(JSON.stringify(record?.decodeDataSource, null, 4));
      setDarwerTitle('原始数据');
    }
    setDecodeOpen(true);
  };

  const initData = () => {
    const palylod = {
      current: 1,
      size: initPagination.pageSize,
      sn: sn!,
      filters: {},
    };
    setPagination(initPagination);
    trigger(palylod);
  };
  useEffect(() => {
    if (tab === '2') {
      initData();
    }
  }, [tab]);
  const header = (
    <>
      <Space>
        <span> 操作</span>
      </Space>
    </>
  );

  const handleSubmit = () => {
    const values = form.getFieldsValue();
    const palylod = {
      current: pagination.current,
      size: pagination.pageSize,
      sn: sn!,
      filters: {
        startTime: values.time ? values.time?.[0]?.format('YYYY-MM-DD HH:mm:ss.SSS') + ' +00:00' : null,
        endTime: values.time ? values.time?.[1]?.format('YYYY-MM-DD HH:mm:ss.SSS') + ' +00:00' : null,
      },
    };
    trigger(palylod);
  };

  const handleReset = () => {
    form.resetFields();
    initData();
  };

  const Actions: ColumnsType<any> = [
    {
      title: header,
      width: 200,
      align: 'center',
      fixed: 'right',
      render: (_: string, record: any) => {
        return (
          <Space>
            <a onClick={() => handleDrawer(record, 'decode')}> 解析数据</a>
            <a onClick={() => handleDrawer(record, 'rowData')}>原始数据</a>
          </Space>
        );
      },
    },
  ];
  const FilterHeader = (
    <Row justify={'space-between'}>
      <Col flex={1}>
        <Form form={form} onFinish={handleSubmit}>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name="time">
                <RangePicker showTime locale={locale} />
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
      <Spin spinning={loading}>
        <Table rowKey={'id'} scroll={{}} loading={isMutating} onChange={handleTableChange} dataSource={data?.data.records} columns={[...sourceColumns, ...Actions]} pagination={{ ...pagination, total: data?.data?.total, showQuickJumper: true, showSizeChanger: true }} />
      </Spin>
      <Drawer width="40%" title={darwerTitle} placement="right" onClose={() => setDecodeOpen(false)} open={decodeOpen}>
        <Input.TextArea rows={32} value={record} />
      </Drawer>
    </>
  );
};
export default Index;
